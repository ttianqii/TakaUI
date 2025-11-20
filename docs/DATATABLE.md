# DataTable Component

A powerful, feature-rich data table component with sorting, filtering, pagination, and row selection.

## Import

```tsx
import { DataTable } from '@ttianqii/takaui'
import type { ColumnDef } from '@tanstack/react-table'
```

## Basic Usage

```tsx
import { DataTable } from '@ttianqii/takaui'
import type { ColumnDef } from '@tanstack/react-table'

type Product = {
  id: string
  name: string
  price: number
  category: string
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: 'Product Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'price', header: 'Price' },
]

const data: Product[] = [
  { id: '1', name: 'Laptop', price: 999, category: 'Electronics' },
  { id: '2', name: 'Mouse', price: 29, category: 'Accessories' },
]

function ProductTable() {
  return <DataTable data={data} columns={columns} />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | **required** | Array of data objects |
| `columns` | `ColumnDef<TData>[]` | **required** | Column definitions |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `onRowClick` | `(row: TData) => void` | - | Callback when row is clicked |
| `className` | `string` | - | Additional CSS classes |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `showSearch` | `boolean` | `true` | Show search input |
| `pageSize` | `number` | `10` | Number of rows per page |
| `renderToolbar` | `() => React.ReactNode` | - | Custom toolbar component |
| `variant` | `'default' \| 'clean'` | `'default'` | Table style variant |

## Column Definitions

### Basic Columns

```tsx
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
]
```

### Custom Cell Rendering

```tsx
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
]
```

### Sortable Columns

```tsx
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@ttianqii/takaui'

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
```

### Actions Column

```tsx
import { MoreHorizontal, Edit, Trash } from 'lucide-react'
import { Button, DropdownMenu } from '@ttianqii/takaui'

const columns: ColumnDef<Product>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(product)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(product)}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
```

### Checkbox Column

```tsx
import { Checkbox } from '@ttianqii/takaui'

const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
]
```

## Examples

### With Row Click

```tsx
function ClickableTable() {
  const handleRowClick = (product: Product) => {
    console.log('Clicked:', product)
    // Navigate or show details
  }

  return (
    <DataTable
      data={products}
      columns={columns}
      onRowClick={handleRowClick}
    />
  )
}
```

### Without Pagination

```tsx
<DataTable
  data={products}
  columns={columns}
  showPagination={false}
/>
```

### Without Search

```tsx
<DataTable
  data={products}
  columns={columns}
  showSearch={false}
/>
```

### Custom Page Size

```tsx
<DataTable
  data={products}
  columns={columns}
  pageSize={20}
/>
```

### Clean Variant

```tsx
<DataTable
  data={products}
  columns={columns}
  variant="clean"
/>
```

### With Custom Toolbar

```tsx
function TableWithToolbar() {
  const toolbar = () => (
    <div className="flex gap-2">
      <Button onClick={handleExport}>
        Export
      </Button>
      <Button onClick={handleImport}>
        Import
      </Button>
    </div>
  )

  return (
    <DataTable
      data={products}
      columns={columns}
      renderToolbar={toolbar}
    />
  )
}
```

### Full Featured Table

```tsx
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button, Checkbox, DropdownMenu } from '@ttianqii/takaui'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        )}>
          {status}
        </span>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function UserTable() {
  const [users, setUsers] = useState<User[]>([])

  return (
    <DataTable
      data={users}
      columns={columns}
      searchPlaceholder="Search users..."
      pageSize={15}
    />
  )
}
```

## Features

- ✅ **Sorting** - Click column headers to sort (single/multi-column)
- ✅ **Global Search** - Search across all columns
- ✅ **Pagination** - Navigate through pages with controls
- ✅ **Row Selection** - Select single or multiple rows
- ✅ **Custom Rendering** - Full control over cell rendering
- ✅ **Responsive** - Mobile-friendly design
- ✅ **TypeScript** - Full type safety
- ✅ **Customizable** - Variants, toolbars, and styling

## Customization

### Styling

```tsx
<DataTable
  data={data}
  columns={columns}
  className="rounded-lg shadow-lg"
/>
```

### Custom Table Styles

The DataTable uses Tailwind classes. You can override styles:

```tsx
<DataTable
  data={data}
  columns={columns}
  className="
    [&_thead]:bg-blue-500
    [&_thead_th]:text-white
    [&_tbody_tr:hover]:bg-blue-50
    [&_tbody_td]:py-4
  "
/>
```

## TypeScript

### Generic Type Safety

```tsx
import type { ColumnDef } from '@tanstack/react-table'

type Product = {
  id: string
  name: string
  price: number
}

// Columns are fully typed
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name', // Autocomplete works!
    header: 'Name',
    cell: ({ row }) => {
      // row.original is typed as Product
      return row.original.name
    }
  }
]

// Data is typed
const data: Product[] = []

// Component is type-safe
<DataTable<Product, any>
  data={data}
  columns={columns}
/>
```

## Dependencies

The DataTable component is built on:

- [@tanstack/react-table](https://tanstack.com/table) - Headless table library
- [lucide-react](https://lucide.dev/) - Icon library

## Related Components

- [Schedule](./SCHEDULE.md) - Weekly schedule table
- [Button](https://ui.shadcn.com/docs/components/button) - Button component
- [Input](https://ui.shadcn.com/docs/components/input) - Input component
- [DropdownMenu](./DROPDOWN.md) - Dropdown menu
