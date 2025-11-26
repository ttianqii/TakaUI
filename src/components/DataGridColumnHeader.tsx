import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useDataGrid } from './DataGrid';
import { Button } from './ui/button';

interface DataGridColumnHeaderProps {
  id: string;
  title: string;
}

export function DataGridColumnHeader({ id, title }: DataGridColumnHeaderProps) {
  const { sorting, setSorting } = useDataGrid();

  const sortState = sorting.find((s) => s.id === id);
  const isSorted = !!sortState;
  const isDesc = sortState?.desc ?? false;

  const handleSort = () => {
    setSorting((prev) => {
      const existing = prev.find((s) => s.id === id);
      if (!existing) {
        return [{ id, desc: false }];
      }
      if (!existing.desc) {
        return [{ id, desc: true }];
      }
      return [];
    });
  };

  return (
    <Button
      variant="ghost"
      className="h-auto px-3 py-1.5 font-normal hover:bg-transparent hover:text-gray-900"
      onClick={handleSort}
    >
      {title}
      {isSorted && isDesc ? (
        <ChevronDown className="h-4 w-4" />
      ) : isSorted ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronsUpDown className="h-4 w-4" />
      )}
    </Button>
  );
}

export default DataGridColumnHeader;
