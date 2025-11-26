import { useDataGrid } from './DataGrid';
import { Checkbox } from './ui/checkbox';

export function DataGridTableRowSelectAll() {
  const { toggleAllRows, isAllRowsSelected } = useDataGrid();

  return <Checkbox checked={isAllRowsSelected} onCheckedChange={toggleAllRows} />;
}

interface DataGridTableRowSelectProps<T = Record<string, unknown>> {
  row: T;
}

export function DataGridTableRowSelect<T = Record<string, unknown>>({
  row,
}: DataGridTableRowSelectProps<T>) {
  const { selectedRows, toggleRow, getRowId } = useDataGrid<T>();
  const rowId = getRowId(row);

  return <Checkbox checked={selectedRows.has(rowId)} onCheckedChange={() => toggleRow(rowId)} />;
}

export default DataGridTableRowSelect;
