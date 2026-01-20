import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { cn } from '@/lib/utils';

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string | React.ReactNode;
  accessor?: (row: T) => unknown;
  cell?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  showPagination?: boolean;
  showSearch?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  renderToolbar?: () => React.ReactNode;
  variant?: 'default' | 'clean';
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: string, order: 'asc' | 'desc') => void;
}

export function DataTable<T = Record<string, unknown>>({
  data = [],
  columns,
  searchPlaceholder = 'Search...',
  onRowClick,
  className = '',
  showPagination = true,
  showSearch = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  renderToolbar,
  variant = 'default',
  onPaginationChange,
  onSearchChange,
  onSortChange,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredData = useMemo(() => {
    if (!showSearch || !searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) => {
      return columns.some(column => {
        const value = column.accessor ? column.accessor(row) : (row as Record<string, unknown>)[column.key];
        return value?.toString().toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, showSearch, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const column = columns.find(col => col.key === sortKey);
      if (!column) return 0;
      
      const aVal = column.accessor ? column.accessor(a) : (a as Record<string, unknown>)[column.key];
      const bVal = column.accessor ? column.accessor(b) : (b as Record<string, unknown>)[column.key];
      
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortOrder, columns]);

  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, showPagination]);

  // Notify parent component when pagination changes
  React.useEffect(() => {
    if (onPaginationChange) {
      const totalPages = Math.ceil(sortedData.length / pageSize);
      onPaginationChange({
        page: currentPage,
        limit: pageSize,
        total: sortedData.length,
        totalPages: totalPages,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, sortedData.length]);

  React.useEffect(() => {
    setCurrentPage(1);
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSort = (columnKey: string) => {
    let newOrder: 'asc' | 'desc' = 'asc';
    if (sortKey === columnKey) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newOrder);
    } else {
      setSortKey(columnKey);
      setSortOrder('asc');
    }
    
    if (onSortChange) {
      onSortChange(columnKey, sortKey === columnKey ? newOrder : 'asc');
    }
  };

  const getCellValue = (row: T, column: DataTableColumn<T>, rowIndex: number): React.ReactNode => {
    const value = column.accessor ? column.accessor(row) : (row as Record<string, unknown>)[column.key];
    return column.cell ? column.cell(value, row, rowIndex) : (value as React.ReactNode);
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Search and Toolbar */}
      {(showSearch || renderToolbar) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {showSearch && (
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[300px] bg-gray-50 border-gray-300"
              />
            </div>
          )}
          {renderToolbar && <div className="w-full sm:w-auto">{renderToolbar()}</div>}
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table variant={variant}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="h-10 px-0 py-0"
                    style={{ width: column.width }}
                  >
                    {column.align === 'center' || (!column.align && typeof column.header !== 'string') ? (
                      <div className="h-10 flex items-center justify-center">
                        {typeof column.header !== 'string' ? (
                          column.header
                        ) : (
                          <span className={cn("text-xs font-normal text-gray-500 uppercase tracking-widest", column.headerClassName)}>{column.header}</span>
                        )}
                      </div>
                    ) : (
                      <div className={cn("h-10 flex items-center text-xs font-normal text-gray-500 uppercase tracking-widest", column.headerClassName)}>
                        {typeof column.header !== 'string' ? (
                          <div>{column.header}</div>
                        ) : column.sortable !== false ? (
                          <Button
                            variant="ghost"
                            className={cn("h-auto px-3 py-1.5 text-xs font-normal hover:bg-transparent hover:text-gray-900", column.headerClassName)}
                            onClick={() => handleSort(column.key)}
                          >
                            {column.header}
                            {sortKey === column.key && sortOrder === 'desc' ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : sortKey === column.key && sortOrder === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronsUpDown className="h-4 w-4" />
                            )}
                          </Button>
                        ) : (
                          <span className="px-3">{column.header}</span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column) => {
                      const shouldCenter = column.align === 'center' || (!column.align && typeof column.header !== 'string');
                      return (
                        <TableCell 
                          key={column.key} 
                          className={shouldCenter ? "px-0 py-4" : "px-3 py-4"}
                          style={{ width: column.width }}
                        >
                          {shouldCenter ? (
                            <div className="flex items-center justify-center h-full">
                              {getCellValue(row, column, rowIndex)}
                            </div>
                          ) : (
                            getCellValue(row, column, rowIndex)
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing {paginatedData.length} of {sortedData.length} row(s)
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {Math.ceil(sortedData.length / pageSize)}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(sortedData.length / pageSize), p + 1))}
                disabled={currentPage === Math.ceil(sortedData.length / pageSize)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
