'use no memo';

import * as React from "react"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  onRowClick?: (row: TData) => void
  className?: string
  showPagination?: boolean
  showSearch?: boolean
  pageSize?: number
  renderToolbar?: () => React.ReactNode
  variant?: "default" | "clean"
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  onRowClick,
  className,
  showPagination = true,
  showSearch = true,
  pageSize = 10,
  renderToolbar,
  variant = "default",
}: DataTableProps<TData, TValue>) {
  "use no memo"
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  })

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Search and Toolbar */}
      {(showSearch || renderToolbar) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {showSearch && (
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(event.target.value)}
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
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-3 py-2 text-xs font-normal text-gray-500 uppercase tracking-widest"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-3 py-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500 font-light"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Selection count and Pagination */}
      {showPagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 font-light">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <>
                Selected {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s)
              </>
            )}
            {table.getFilteredSelectedRowModel().rows.length === 0 && (
              <>
                Showing {table.getRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s)
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-light">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
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
