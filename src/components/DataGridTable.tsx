import { useDataGrid } from './DataGrid';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function DataGridTable() {
  const { columns, paginatedData, getRowId, onRowClick } = useDataGrid();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.id}
              className="h-10 px-0 py-0"
              style={{ width: column.size ? `${column.size}px` : undefined }}
            >
              {typeof column.header === 'string' ? (
                <div className={`h-10 flex items-center text-xs font-normal text-gray-500 uppercase tracking-widest ${column.align === 'center' ? 'justify-center' : ''}`}>
                  <span className="px-3">{column.header}</span>
                </div>
              ) : (
                <div className={`h-10 flex items-center ${column.align === 'center' ? 'justify-center' : ''}`}>
                  {column.header}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
              No results found.
            </TableCell>
          </TableRow>
        ) : (
          paginatedData.map((row, rowIndex) => (
            <TableRow
              key={getRowId(row)}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => {
                const shouldCenter = column.align === 'center' || (!column.align && typeof column.header !== 'string');
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
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default DataGridTable;
