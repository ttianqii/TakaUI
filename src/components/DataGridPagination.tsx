import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDataGrid } from './DataGrid';
import { Button } from './ui/button';

export function DataGridPagination() {
  const { pagination, setPagination, totalPages, paginatedData, recordCount } = useDataGrid();

  const startRecord = pagination.pageIndex * pagination.pageSize + 1;
  const endRecord = Math.min((pagination.pageIndex + 1) * pagination.pageSize, recordCount);

  const canPreviousPage = pagination.pageIndex > 0;
  const canNextPage = pagination.pageIndex < totalPages - 1;

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="text-sm font-light text-gray-600">
        Showing {paginatedData.length > 0 ? startRecord : 0} to {endRecord} of {recordCount} entries
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
          disabled={!canPreviousPage}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-light text-gray-600">
          Page {pagination.pageIndex + 1} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
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
