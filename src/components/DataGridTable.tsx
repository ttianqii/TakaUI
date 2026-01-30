import { useDataGrid } from './DataGrid';
import { DataGridLoadingSpinner } from './DataGridLoadingSpinner';
import { DataGridEmptyState } from './DataGridEmptyState';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function DataGridTable() {
  const { columns, paginatedData, getRowId, onRowClick, loading, emptyMessage } = useDataGrid();

  // Show loading state when loading and no data
  if (loading && paginatedData.length === 0) {
    return <DataGridLoadingSpinner />;
  }

  // Show empty state only when NOT loading and no data
  if (!loading && paginatedData.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <DataGridEmptyState message={emptyMessage} />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="h-10 px-0 py-0"
                  style={{ width: column.size ? `${column.size}px` : undefined }}
                >
                  {column.align === 'center' ? (
                    <div className="h-10 flex items-center justify-center">
                      {typeof column.header !== 'string' ? (
                        column.header
                      ) : (
                        <span className="text-xs font-normal text-gray-500 uppercase tracking-widest">{column.header}</span>
                      )}
                    </div>
                  ) : (
                    <div className="h-10 flex items-center text-xs font-normal text-gray-500 uppercase tracking-widest">
                      {typeof column.header !== 'string' ? (
                        <div>{column.header}</div>
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
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={getRowId(row)}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => {
                  const shouldCenter = column.align === 'center';
                  const cellValue = column.cell
                    ? column.cell(row, rowIndex)
                    : column.accessorKey
                    ? row[column.accessorKey]
                    : null;

                  return (
                    <TableCell
                      key={column.id}
                      className={shouldCenter ? 'px-0 py-4' : 'px-3 py-4'}
                      style={{ width: column.size ? `${column.size}px` : undefined }}
                    >
                      {shouldCenter ? (
                        <div className="flex items-center justify-center h-full">{cellValue as React.ReactNode}</div>
                      ) : (
                        (cellValue as React.ReactNode)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataGridTable;
