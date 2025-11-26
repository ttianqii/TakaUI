import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDataGrid } from './DataGrid';
import { Button } from './ui/button';

export function DataGridPagination() {
  const {
    paginatedData,
    sortedData,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageCount,
    pagination,
  } = useDataGrid();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-gray-500 font-light">
        Showing {paginatedData.length} of {sortedData.length} row(s)
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 font-light">
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

export default DataGridPagination;
