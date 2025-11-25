# TakaUI DataTable - Quick Reference

## Installation (Future)

```bash
npx takaui add data-table
```

## Basic Usage

```tsx
import {
  DataTable,
  DataTableContainer,
  DataTableView,
  DataTablePagination,
  DataTableColumnHeader,
} from '@/components'

// In your component:
const table = useReactTable({ ... })

<DataTable table={table} recordCount={data.length}>
  <DataTableContainer>
    <DataTableView />
  </DataTableContainer>
  <DataTablePagination />
</DataTable>
```

## Column Definition

```tsx
const columns: ColumnDef<YourType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Price" 
        align="right"
      />
    ),
    cell: (info) => `$${info.getValue()}`,
  },
]
```

## Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `DataTable` | Context provider | `table`, `recordCount`, `children` |
| `DataTableContainer` | Styled wrapper | `children`, `className?` |
| `DataTableView` | Table renderer | None (uses context) |
| `DataTablePagination` | Pagination UI | `pageSizeOptions?`, `showRowsPerPage?`, etc. |
| `DataTableColumnHeader` | Sortable header | `column`, `title`, `align?` |

## Common Patterns

### With Custom Layout

```tsx
<DataTable table={table} recordCount={data.length}>
  <div className="space-y-4">
    <DataTableContainer>
      <DataTableView />
    </DataTableContainer>
    <div className="flex justify-between">
      <CustomFilters />
      <DataTablePagination showPageInfo={false} />
    </div>
  </div>
</DataTable>
```

### With ScrollArea

```tsx
<DataTableContainer>
  <ScrollArea>
    <DataTableView />
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</DataTableContainer>
```

### Custom Page Sizes

```tsx
<DataTablePagination pageSizeOptions={[10, 25, 50, 100]} />
```

## Alignment Options

```tsx
align="left"   // Default
align="center" // Centered
align="right"  // Right-aligned (common for numbers)
```

## Sort Icons

- **ChevronsUpDown** - Unsorted (default state)
- **ChevronDown** - Ascending (low to high)
- **ChevronUp** - Descending (high to low)

## Table Setup

```tsx
import { useState, useMemo } from 'react'
import type { PaginationState, SortingState } from '@tanstack/react-table'
import { useReactTable, getCoreRowModel, ... } from '@tanstack/react-table'

const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})
const [sorting, setSorting] = useState<SortingState>([])

const table = useReactTable({
  columns,
  data,
  pageCount: Math.ceil(data.length / pagination.pageSize),
  state: { pagination, sorting },
  onPaginationChange: setPagination,
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
```

## File Locations

```text
src/components/ui/
├── data-table.tsx
├── data-table-container.tsx
├── data-table-view.tsx
├── data-table-pagination.tsx
└── data-table-column-header.tsx
```

## Dependencies

```json
{
  "@tanstack/react-table": "^8.x",
  "lucide-react": "latest"
}
```

## Documentation

- [Full Install Guide](./DATATABLE_INSTALL.md)
- [Architecture Docs](./docs/DATATABLE_MODULAR.md)
- [CLI Roadmap](./CLI_INSTALL.md)
- [Example Code](./src/examples/DataTableExample.tsx)
