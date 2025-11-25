# DataTable - Modular Structure

The DataTable component suite uses a clean, modular architecture inspired by modern component libraries. Each component has a single responsibility and they compose together beautifully.

## Architecture Overview

```
DataTable (Context Provider)
└── Your Layout Container
    ├── DataTableContainer (Styled wrapper)
    │   └── DataTableView (Table renderer)
    └── DataTablePagination (Controls)
```

## Components

### 1. DataTable

**Purpose:** Context provider that shares table instance across child components

**Props:**
- `table: Table<TData>` - TanStack table instance
- `recordCount: number` - Total number of records
- `children: ReactNode` - Child components

**Usage:**
```tsx
<DataTable table={table} recordCount={data.length}>
  {/* Child components */}
</DataTable>
```

### 2. DataTableContainer

**Purpose:** Provides consistent styling wrapper for the table

**Props:**
- `children: ReactNode` - Table content
- `className?: string` - Additional CSS classes

**Features:**
- Rounded borders
- Shadow
- White background
- Responsive

**Usage:**
```tsx
<DataTableContainer>
  <DataTableView />
</DataTableContainer>
```

### 3. DataTableView

**Purpose:** Renders the table structure with headers and rows

**Props:** None (uses context)

**Features:**
- Auto-renders header groups
- Handles empty states
- Flexible cell rendering
- Selection support

**Usage:**
```tsx
<DataTableView />
```

### 4. DataTablePagination

**Purpose:** Pagination controls with page size selector

**Props:**
- `pageSizeOptions?: number[]` - Default: `[5, 10, 20, 30, 50]`
- `showRowsPerPage?: boolean` - Default: `true`
- `showPageInfo?: boolean` - Default: `true`
- `showNavigationButtons?: boolean` - Default: `true`

**Features:**
- Rows per page selector
- First/Previous/Next/Last navigation
- Page info display
- Responsive layout

**Usage:**
```tsx
<DataTablePagination 
  pageSizeOptions={[10, 25, 50]}
/>
```

### 5. DataTableColumnHeader

**Purpose:** Sortable column header with icons

**Props:**
- `column: Column<TData, TValue>` - Table column
- `title: string` - Header text
- `align?: "left" | "center" | "right"` - Default: `"left"`

**Features:**
- Auto-detects sortable columns
- Dynamic sort icons (ChevronDown/Up/ChevronsUpDown)
- Click to toggle sort
- Custom alignment

**Usage:**
```tsx
{
  header: ({ column }) => (
    <DataTableColumnHeader 
      column={column} 
      title="Product Name"
      align="left"
    />
  ),
}
```

## Complete Example

```tsx
import { useState, useMemo } from 'react'
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'
import {
  DataTable,
  DataTableContainer,
  DataTableView,
  DataTablePagination,
  DataTableColumnHeader,
} from '@takaui/components'

interface Product {
  id: string
  name: string
  price: number
}

export default function ProductTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const data: Product[] = [
    { id: '1', name: 'Widget', price: 29.99 },
    { id: '2', name: 'Gadget', price: 49.99 },
  ]

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

## Why This Structure?

### ✅ Benefits

1. **No Prop Drilling** - Context eliminates passing `table` prop everywhere
2. **Composition** - Mix and match components as needed
3. **Clean API** - Each component has minimal, focused props
4. **Extensible** - Easy to add custom components between layers
5. **Consistent** - Built-in styling, no manual customization needed
6. **Type Safe** - Full TypeScript support with generics

### 🎯 Comparison with Other Libraries

**shadcn/ui DataGrid:**
```tsx
<DataGrid table={table} recordCount={data.length}>
  <DataGridContainer>
    <DataGridTable />
  </DataGridContainer>
  <DataGridPagination />
</DataGrid>
```

**TakaUI DataTable:**
```tsx
<DataTable table={table} recordCount={data.length}>
  <DataTableContainer>
    <DataTableView />
  </DataTableContainer>
  <DataTablePagination />
</DataTable>
```

Nearly identical API! The pattern is proven and familiar.

## Advanced Patterns

### Custom Layout

```tsx
<DataTable table={table} recordCount={data.length}>
  <div className="grid grid-cols-2 gap-4">
    <DataTableContainer className="col-span-2">
      <DataTableView />
    </DataTableContainer>
    <div className="col-span-1">
      <DataTablePagination showNavigationButtons={false} />
    </div>
    <div className="col-span-1">
      {/* Custom stats or filters */}
    </div>
  </div>
</DataTable>
```

### With ScrollArea

```tsx
import { ScrollArea, ScrollBar } from '@takaui/components'

<DataTableContainer>
  <ScrollArea>
    <DataTableView />
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</DataTableContainer>
```

### Custom Header Without Sorting

```tsx
{
  header: "Status", // Plain string - no sort button
  cell: (info) => <StatusBadge status={info.getValue()} />
}
```

### Custom Header With Sorting

```tsx
{
  header: ({ column }) => (
    <DataTableColumnHeader 
      column={column} 
      title="Created At"
      align="right"
    />
  ),
}
```

## File Locations

```text
src/components/ui/
├── data-table.tsx                  # Context provider
├── data-table-container.tsx        # Styled wrapper
├── data-table-view.tsx             # Table renderer
├── data-table-pagination.tsx       # Pagination controls
└── data-table-column-header.tsx    # Sortable headers
```

## Dependencies

- `@tanstack/react-table` - Table state management
- `lucide-react` - Icons
- Base components: `button`, `table`, `select`

## See Also

- [Installation Guide](./DATATABLE_INSTALL.md)
- [CLI Install](./CLI_INSTALL.md)
- [Example](../src/examples/DataTableExample.tsx)
- [Legacy Usage](./DATATABLE_USAGE.md)
