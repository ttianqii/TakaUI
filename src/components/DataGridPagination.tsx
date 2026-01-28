import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { useDataGrid } from './DataGrid';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export interface DataGridPaginationProps {
  mode?: 'simple' | 'advanced';
  pageSizeOptions?: number[];
}

export function DataGridPagination({ 
  mode = 'simple',
  pageSizeOptions = [5, 10, 15, 20]
}: DataGridPaginationProps) {
  const {
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageCount,
    pagination,
    setPageSize,
    goToPage,
  } = useDataGrid();

  // Set initial page size to first option if current size is not in options
  React.useEffect(() => {
    if (!pageSizeOptions.includes(pagination.pageSize)) {
      setPageSize(pageSizeOptions[0]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate page numbers to display
  const getPageNumbers = () => {
    const current = pagination.pageIndex;
    const total = pageCount;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if total is small (1 2 3 4 5 6 7)
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        // Near the beginning (1 2 3 4 5 ... 10)
        for (let i = 0; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total - 1);
      } else if (current >= total - 4) {
        // Near the end (1 ... 6 7 8 9 10)
        pages.push(0);
        pages.push('...');
        for (let i = total - 5; i < total; i++) {
          pages.push(i);
        }
      } else {
        // In the middle (1 ... 5 6 7 ... 10)
        pages.push(0);
        pages.push('...');
        pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
        pages.push('...');
        pages.push(total - 1);
      }
    }

    return pages;
  };

  if (mode === 'simple') {
    return (
      <div className="flex items-center justify-end px-2 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 hidden sm:block">
            Page {pagination.pageIndex + 1} of {pageCount}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!canNextPage}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Advanced mode
  return (
    <div className="flex items-center justify-between gap-3 px-2 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:inline">Rows per page:</span>
        <Select
          value={String(pagination.pageSize)}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className="h-8 w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Show page count on mobile */}
        <span className="text-sm text-gray-700 sm:hidden px-2">
          {pagination.pageIndex + 1} / {pageCount}
        </span>
        
        {/* Show page numbers on desktop */}
        <div className="hidden sm:flex gap-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <Button
                key={index}
                variant={pagination.pageIndex === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToPage(page)}
                className="h-8 w-8 p-0"
              >
                {page + 1}
              </Button>
            ) : (
              <span key={index} className="flex h-8 w-8 items-center justify-center text-gray-400">
                {page}
              </span>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={!canNextPage}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default DataGridPagination;
