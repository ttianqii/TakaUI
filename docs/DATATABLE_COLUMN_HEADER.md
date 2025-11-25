# DataTableColumnHeader Usage Guide

The `DataTableColumnHeader` component provides a pre-styled, consistent header for your DataTable columns with built-in sorting functionality.

## Features

- Built-in sort icons (ChevronsUpDown, ChevronUp, ChevronDown)
- Consistent styling across all tables
- Support for left, center, and right alignment
- Automatic handling of sortable and non-sortable columns
- No need to manually style each header

## Installation

The component is already included in TakaUI. Import it along with DataTable:

```tsx
import { DataTable, DataTableColumnHeader } from 'takaui'
import type { ColumnDef } from '@tanstack/react-table'
```

## Basic Usage

```tsx
const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" align="right" />
    ),
    cell: ({ row }) => <div className="text-right">${row.getValue('price')}</div>,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
]
```

## Props

### DataTableColumnHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `column` | `Column<TData, TValue>` | required | The tanstack table column object |
| `title` | `string` | required | The header title to display |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |
| `className` | `string` | - | Additional CSS classes |

## Alignment Examples

### Left Aligned (Default)
```tsx
<DataTableColumnHeader column={column} title="Name" />
```

### Center Aligned
```tsx
<DataTableColumnHeader column={column} title="Quantity" align="center" />
```

### Right Aligned
```tsx
<DataTableColumnHeader column={column} title="Total Cost" align="right" />
```

## Non-Sortable Columns

If a column is not sortable (when `enableSorting: false`), the header will automatically render without the sort button:

```tsx
{
  accessorKey: 'actions',
  enableSorting: false,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Actions" />
  ),
}
```

## Complete Example

```tsx
import { useMemo } from 'react'
import { DataTable, DataTableColumnHeader } from 'takaui'
import type { ColumnDef } from '@tanstack/react-table'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

const data: Product[] = [
  { id: '1', name: 'Laptop', category: 'Electronics', price: 999, stock: 50 },
  { id: '2', name: 'Mouse', category: 'Accessories', price: 29, stock: 200 },
]

export function ProductTable() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Product Name" />
        ),
      },
      {
        accessorKey: 'category',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
      },
      {
        accessorKey: 'stock',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Stock" align="center" />
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue('stock')}</div>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" align="right" />
        ),
        cell: ({ row }) => {
          const price = row.getValue('price') as number
          return <div className="text-right">${price.toFixed(2)}</div>
        },
      },
    ],
    []
  )

  return <DataTable columns={columns} data={data} />
}
```

## Styling

The DataTableColumnHeader comes with pre-defined styling:
- Header background: `bg-gray-50`
- Font weight: `font-normal`
- Padding: `px-2 py-1` for buttons, `px-2 py-1` for non-sortable
- Hover: `hover:bg-transparent hover:text-gray-900`

All styling is built-in and consistent across your application. No need to manually add classes to each header!

## Migration from Custom Headers

**Before (Manual styling):**
```tsx
header: ({ column }) => (
  <Button
    variant="ghost"
    className="h-auto px-2 py-1 font-normal hover:bg-transparent hover:text-gray-900"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    Product Name
    {column.getIsSorted() === 'asc' ? (
      <ChevronDown className="h-4 w-4" />
    ) : column.getIsSorted() === 'desc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronsUpDown className="h-4 w-4" />
    )}
  </Button>
)
```

**After (Using DataTableColumnHeader):**
```tsx
header: ({ column }) => (
  <DataTableColumnHeader column={column} title="Product Name" />
)
```

Much cleaner and consistent!
