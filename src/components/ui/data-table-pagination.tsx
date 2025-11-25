import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useTableContext } from "./data-table"
import { Button } from "./button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export interface TableNavigatorProps {
  rowsPerPageOptions?: number[]
  showPageSelector?: boolean
  showRecordInfo?: boolean
  showControls?: boolean
}

export function TableNavigator({
  rowsPerPageOptions = [5, 10, 20, 30, 50],
  showPageSelector = true,
  showRecordInfo = true,
  showControls = true,
}: TableNavigatorProps = {}) {
  const { tableInstance, totalRecords } = useTableContext()
  
  const currentPage = tableInstance.getState().pagination.pageIndex + 1
  const totalPages = tableInstance.getPageCount()
  const pageSize = tableInstance.getState().pagination.pageSize
  const startRecord = currentPage === 1 ? 1 : (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalRecords)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-3 py-4">
      {/* Page size selector */}
      {showPageSelector && (
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-gray-700 font-medium">Items per page:</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              tableInstance.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-9 w-[75px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {rowsPerPageOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Record info */}
      {showRecordInfo && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>
            {startRecord}–{endRecord} of {totalRecords}
          </span>
        </div>
      )}

      {/* Navigation controls */}
      {showControls && (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
            className="h-9 w-9 p-0"
          >
            <span className="sr-only">First page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
            className="h-9 w-9 p-0"
          >
            <span className="sr-only">Previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium min-w-[110px]">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
            className="h-9 w-9 p-0"
          >
            <span className="sr-only">Next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}
            disabled={!tableInstance.getCanNextPage()}
            className="h-9 w-9 p-0"
          >
            <span className="sr-only">Last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
