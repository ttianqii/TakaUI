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

export interface DataGridProps<T = Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  children: ReactNode;
  recordCount?: number;
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
}: DataGridProps<T>) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
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
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination]);

  const totalPages = Math.ceil(sortedData.length / pagination.pageSize);
  const pageCount = totalPages;

  // Pagination helpers
  const canPreviousPage = pagination.pageIndex > 0;
  const canNextPage = pagination.pageIndex < totalPages - 1;
  const previousPage = () => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  const nextPage = () => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));

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
    recordCount: recordCount ?? data.length,
  };

  return <DataGridContext.Provider value={value as DataGridContextValue}>{children}</DataGridContext.Provider>;
}

export default DataGrid;
