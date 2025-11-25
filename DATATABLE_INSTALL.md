# DataTable Installation Guide

Install the DataTable component suite for TakaUI.

## Installation

```bash
# Install via npm (future)
npm install @takaui/data-table

# Or using bun
bun add @takaui/data-table
```

## Manual Installation

If you're installing manually, you'll need the following files in your `src/components/ui/` folder:

### Required Files

1. `data-table.tsx` - Context provider
2. `data-table-container.tsx` - Container wrapper
3. `data-table-view.tsx` - Table renderer
4. `data-table-pagination.tsx` - Pagination controls
5. `data-table-column-header.tsx` - Sortable column headers

### Dependencies

Make sure you have these dependencies installed:

```bash
bun add @tanstack/react-table lucide-react
```

### Base UI Components

The DataTable also requires these base components from TakaUI:

- `button.tsx`
- `table.tsx`
- `select.tsx`

## Quick Start

```tsx
import { useState, useMemo } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { DataTableContainer } from '@/components/ui/data-table-container'
import { DataTableView } from '@/components/ui/data-table-view'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'

interface Product {
  id: string
  name: string
  price: number
}

const data: Product[] = [
  { id: '1', name: 'Product A', price: 29.99 },
  { id: '2', name: 'Product B', price: 49.99 },
]

export default function MyTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" align="right" />
        ),
        cell: (info) => `$${info.getValue()}`,
      },
    ],
    []
  )

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

  return (
    <DataTable table={table} recordCount={data.length}>
      <div className="space-y-4">
        <DataTableContainer>
          <DataTableView />
        </DataTableContainer>
        <DataTablePagination />
      </div>
    </DataTable>
  )
}
```

## Component Structure

The DataTable suite uses a modular composition pattern:

1. **DataTable** - Context provider that shares table instance
2. **DataTableContainer** - Styled wrapper for the table
3. **DataTableView** - Renders the actual table with rows/cells
4. **DataTablePagination** - Pagination controls
5. **DataTableColumnHeader** - Sortable column headers with icons

## Features

- ✅ Clean, modular API (no prop drilling)
- ✅ Built-in sorting with visual indicators
- ✅ Pagination with customizable page sizes
- ✅ Responsive design
- ✅ Minimal, modern styling
- ✅ Column alignment support (left, center, right)
- ✅ TypeScript support
- ✅ Accessible keyboard navigation

## Advanced Usage

### Custom Pagination Options

```tsx
<DataTablePagination 
  pageSizeOptions={[10, 25, 50, 100]}
  showRowsPerPage={true}
  showPageInfo={true}
  showNavigationButtons={true}
/>
```

### Column Alignment

```tsx
{
  accessorKey: 'price',
  header: ({ column }) => (
    <DataTableColumnHeader 
      column={column} 
      title="Price" 
      align="right" // left, center, or right
    />
  ),
}
```

### Wrapping with ScrollArea

For horizontal scrolling on small screens:

```tsx
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

<DataTableContainer>
  <ScrollArea>
    <DataTableView />
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</DataTableContainer>
```

## API Reference

### DataTable Props

| Prop | Type | Description |
|------|------|-------------|
| `table` | `Table<TData>` | TanStack table instance |
| `recordCount` | `number` | Total number of records |
| `children` | `ReactNode` | Child components |

### DataTablePagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pageSizeOptions` | `number[]` | `[5, 10, 20, 30, 50]` | Page size options |
| `showRowsPerPage` | `boolean` | `true` | Show rows per page selector |
| `showPageInfo` | `boolean` | `true` | Show "Showing X to Y of Z" text |
| `showNavigationButtons` | `boolean` | `true` | Show navigation buttons |

### DataTableColumnHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `column` | `Column<TData, TValue>` | - | Table column instance |
| `title` | `string` | - | Column header text |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |

## Styling

All components use Tailwind CSS and follow TakaUI's design system:

- Minimal, clean aesthetic
- Gray-50 header backgrounds
- Subtle borders and shadows
- Responsive spacing
- Consistent font weights

## Examples

See `src/examples/DataTableExample.tsx` for a complete working example with:

- Product catalog demo
- Custom cell rendering
- Status badges
- Conditional styling
- Stock indicators
