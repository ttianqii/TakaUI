import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Generate page numbers to display
  const getPageNumbers = () => {
    const current = pagination.pageIndex;
    const total = pageCount;
    const delta = 2; // Number of pages to show on each side of current page
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Show all pages if total is small
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);

      if (current > delta + 1) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(1, current - delta);
      const end = Math.min(total - 2, current + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - delta - 2) {
        pages.push('...');
      }

      // Always show last page
      if (total > 1) {
        pages.push(total - 1);
      }
    }

    return pages;
  };

  if (mode === 'simple') {
    return (
      <div className="flex items-center justify-end px-2 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">
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
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
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
        
        <div className="flex gap-1">
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
