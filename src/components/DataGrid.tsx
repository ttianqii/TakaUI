import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface DataGridColumn<T = Record<string, unknown>> {
  id: string;
  accessorKey?: keyof T;
  header: string | React.ReactNode;
  cell?: (row: T, index: number) => React.ReactNode;
  size?: number;
  enableSorting?: boolean;
  enableHiding?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface PaginationState {
  page: number;        // Current page number (1-indexed)
  limit: number;       // Current page size
  total: number;       // Total number of records
  totalPages: number;  // Total number of pages
}

export interface DataGridProps<T = Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  children: ReactNode;
  recordCount?: number;
  currentPage?: number;              // Control current page externally (1-indexed)
  pageSize?: number;                 // Control page size externally
  onPaginationChange?: (pagination: PaginationState) => void;
}

interface DataGridContextValue<T = Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  
  // Pagination
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (size: number) => void;
  goToPage: (page: number) => void;
  pageCount: number;
  
  // Sorting
  sorting: { id: string; desc: boolean }[];
  setSorting: React.Dispatch<React.SetStateAction<{ id: string; desc: boolean }[]>>;
  
  // Selection
  selectedRows: Set<string>;
  toggleRow: (id: string) => void;
  toggleAllRows: () => void;
  isAllRowsSelected: boolean;
  
  // Computed data
  paginatedData: T[];
  sortedData: T[];
  totalPages: number;
  recordCount: number;
}

const DataGridContext = createContext<DataGridContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useDataGrid<T = Record<string, unknown>>() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error('useDataGrid must be used within DataGrid');
  }
  return context as DataGridContextValue<T>;
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  getRowId = (row: T) => (row as { id?: string }).id || String(Math.random()),
  onRowClick,
  children,
  recordCount,
  currentPage: externalPage,
  pageSize: externalPageSize,
  onPaginationChange,
}: DataGridProps<T>) {
  // Internal state for uncontrolled mode
  const [internalPage, setInternalPage] = useState(0); // 0-indexed internally
  // Note: Initial pageSize will be set by DataGridPagination based on pageSizeOptions
  const [internalPageSize, setInternalPageSize] = useState(10);
  
  // Use external values if provided (convert 1-indexed to 0-indexed), otherwise use internal state
  const pageIndex = externalPage !== undefined ? externalPage - 1 : internalPage;
  const pageSize = externalPageSize ?? internalPageSize;
  
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sorting logic
  const sortedData = useMemo(() => {
    if (sorting.length === 0) return data;
    
    const sorted = [...data].sort((a, b) => {
      for (const sort of sorting) {
        const column = columns.find((col) => col.id === sort.id);
        if (!column?.accessorKey) continue;
        
        const aValue = a[column.accessorKey];
        const bValue = b[column.accessorKey];
        
        if (aValue === bValue) continue;
        
        const comparison = aValue < bValue ? -1 : 1;
        return sort.desc ? -comparison : comparison;
      }
      return 0;
    });
    
    return sorted;
  }, [data, sorting, columns]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pageIndex, pageSize]);

  const total = recordCount ?? sortedData.length;
  const totalPages = Math.ceil(total / pageSize);
  const pageCount = totalPages;

  // Notify parent of pagination changes
  const notifyPaginationChange = (newPageIndex: number, newPageSize: number) => {
    const paginationState: PaginationState = {
      page: newPageIndex + 1, // Convert 0-indexed to 1-indexed
      limit: newPageSize,
      total: total,
      totalPages: Math.ceil(total / newPageSize),
    };
    
    onPaginationChange?.(paginationState);
  };

  // Pagination helpers
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;
  
  const previousPage = () => {
    const newPageIndex = pageIndex - 1;
    if (externalPage === undefined) {
      setInternalPage(newPageIndex);
    }
    notifyPaginationChange(newPageIndex, pageSize);
  };
  
  const nextPage = () => {
    const newPageIndex = Math.min(pageIndex + 1, pageCount - 1);
    if (externalPage === undefined) {
      setInternalPage(newPageIndex);
    }
    notifyPaginationChange(newPageIndex, pageSize);
  };

  const setPageSize = (size: number) => {
    if (externalPageSize === undefined) {
      setInternalPageSize(size);
    }
    if (externalPage === undefined) {
      setInternalPage(0);
    }
    notifyPaginationChange(0, size);
  };

  const goToPage = (page: number) => {
    const newPageIndex = Math.max(0, Math.min(page, pageCount - 1));
    if (externalPage === undefined) {
      setInternalPage(newPageIndex);
    }
    notifyPaginationChange(newPageIndex, pageSize);
  };

  // Create pagination object for backward compatibility
  const pagination = { pageIndex, pageSize };
  const setPagination = (updater: React.SetStateAction<{ pageIndex: number; pageSize: number }>) => {
    const newValue = typeof updater === 'function' ? updater(pagination) : updater;
    if (externalPage === undefined) {
      setInternalPage(newValue.pageIndex);
    }
    if (externalPageSize === undefined) {
      setInternalPageSize(newValue.pageSize);
    }
    notifyPaginationChange(newValue.pageIndex, newValue.pageSize);
  };

  // Selection logic
  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllRows = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => getRowId(row))));
    }
  };

  const isAllRowsSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;

  const value: DataGridContextValue<T> = {
    columns,
    data,
    getRowId,
    onRowClick,
    pagination,
    setPagination,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    goToPage,
    pageCount,
    sorting,
    setSorting,
    selectedRows,
    toggleRow,
    toggleAllRows,
    isAllRowsSelected,
    paginatedData,
    sortedData,
    totalPages,
    recordCount: total,
  };

  return <DataGridContext.Provider value={value as unknown as DataGridContextValue}>{children}</DataGridContext.Provider>;
}

export default DataGrid;
