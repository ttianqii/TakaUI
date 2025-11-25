import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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
  renderToolbar?: () => React.ReactNode;
  variant?: 'default' | 'clean';
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
  renderToolbar,
  variant = 'default',
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [searchQuery, setSearchQuery] = useState('');

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

  const paginatedData = useMemo(() => {
    if (!showPagination) return filteredData;
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, showPagination]);

  React.useEffect(() => setCurrentPage(1), [searchQuery]);

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
                    className="px-3 py-4 text-xs font-normal text-gray-500 uppercase tracking-widest"
                  >
                    {column.header}
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
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} className="px-3 py-4">
                        {getCellValue(row, column, rowIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 font-light">
            Showing {paginatedData.length} of {filteredData.length} row(s)
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-light">
              Page {currentPage} of {Math.ceil(filteredData.length / pageSize)}
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
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredData.length / pageSize), p + 1))}
                disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
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
