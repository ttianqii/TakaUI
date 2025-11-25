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
  striped = false,
  hoverable = true,
  bordered = true,
  compact = false,
  emptyMessage = 'No results found.',
  loading = false,
  loadingRows = 5,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const column = columns.find(col => col.key === sortKey);
      if (column?.sortable === false) return 0;
      let aVal = column?.accessor ? column.accessor(a) : (a as Record<string, unknown>)[sortKey];
      let bVal = column?.accessor ? column.accessor(b) : (b as Record<string, unknown>)[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if ((aVal as string | number) < (bVal as string | number)) return sortOrder === 'asc' ? -1 : 1;
      if ((aVal as string | number) > (bVal as string | number)) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder, columns]);

  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  React.useEffect(() => setCurrentPage(1), [searchQuery]);

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (column?.sortable === false) return;
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getCellValue = (row: T, column: DataTableColumn<T>, rowIndex: number): React.ReactNode => {
    const value = column.accessor ? column.accessor(row) : (row as Record<string, unknown>)[column.key];
    return column.cell ? column.cell(value, row, rowIndex) : (value as React.ReactNode);
  };

  const getRowClass = (row: T, index: number) => {
    const classes = [];
    if (striped && index % 2 === 1) classes.push('bg-slate-50');
    if (hoverable) classes.push('hover:bg-slate-100 transition-colors');
    if (onRowClick) classes.push('cursor-pointer');
    return classes.join(' ');
  };

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {(showSearch || renderToolbar) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {showSearch && (
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
              />
            </div>
          )}
          {renderToolbar && <div className="w-full sm:w-auto">{renderToolbar()}</div>}
        </div>
      )}

      <div className={`w-full ${bordered ? 'border border-slate-200 rounded-lg overflow-hidden' : ''}`}>
        <div className="overflow-x-auto">
          <table className={variant === 'clean' ? 'w-full' : 'w-full border-collapse'}>
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    style={{ width: column.width }}
                    className={`
                      ${compact ? 'px-3 py-2' : 'px-6 py-3'}
                      text-left text-xs font-medium text-slate-700 uppercase tracking-wider
                      ${column.sortable !== false ? 'cursor-pointer select-none hover:bg-slate-200' : ''}
                      ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {column.sortable !== false && sortKey === column.key && (
                        sortOrder === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {loading ? (
                Array.from({ length: loadingRows }).map((_, i) => (
                  <tr key={`loading-${i}`}>
                    {columns.map((col) => (
                      <td key={col.key} className={compact ? 'px-3 py-2' : 'px-6 py-4'}>
                        <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => onRowClick?.(row, rowIndex)}
                    className={getRowClass(row, rowIndex)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`
                          ${compact ? 'px-3 py-2' : 'px-6 py-4'}
                          text-sm text-slate-900
                          ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'}
                        `}
                      >
                        {getCellValue(row, column, rowIndex)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPagination && !loading && sortedData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span>of {sortedData.length} {sortedData.length === 1 ? 'entry' : 'entries'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-600 px-4">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
