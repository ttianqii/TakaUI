# DataTable Component Usage Guide

## Installation

First, make sure you have all dependencies installed:

```bash
npm install @tanstack/react-table lucide-react
```

## Basic Usage

### 1. Import the Components

```tsx
import { DataTable } from '@your-org/ui-library'
import type { ColumnDef } from '@tanstack/react-table'
```

### 2. Define Your Data Type

```tsx
type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}
```

### 3. Create Your Data

```tsx
const data: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
  // ... more data
]
```

### 4. Define Your Columns

```tsx
import { useMemo } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button, Checkbox } from '@your-org/ui-library'

const columns = useMemo<ColumnDef<User>[]>(
  () => [
    // Selection column
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => 
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // Name column with sorting
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
    // Email column
    {
      accessorKey: 'email',
      header: 'Email',
    },
    // Role column
    {
      accessorKey: 'role',
      header: 'Role',
    },
    // Status column with custom cell
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
              status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        )
      },
    },
  ],
  []
)
```

### 5. Render the DataTable

```tsx
function MyComponent() {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search users..."
    />
  )
}
```

## Advanced Usage

### With Custom Toolbar

```tsx
import { Plus } from 'lucide-react'
import { Button } from '@your-org/ui-library'

<DataTable
  columns={columns}
  data={data}
  searchPlaceholder="Search users..."
  renderToolbar={() => (
    <Button onClick={() => console.log('Add new')}>
      <Plus className="mr-2 h-4 w-4" />
      Add User
    </Button>
  )}
/>
```

### With Row Click Handler

```tsx
<DataTable
  columns={columns}
  data={data}
  onRowClick={(row) => {
    console.log('Clicked row:', row)
    // Navigate or open modal
  }}
/>
```

### With Custom Page Size

```tsx
<DataTable
  columns={columns}
  data={data}
  pageSize={20}
/>
```

### Without Search or Pagination

```tsx
<DataTable
  columns={columns}
  data={data}
  showSearch={false}
  showPagination={false}
/>
```

### With Actions Menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@your-org/ui-library'
import { MoreHorizontal, Edit, Trash } from 'lucide-react'

// Add this as the last column
{
  id: 'actions',
  header: () => <div className="text-center">Actions</div>,
  cell: ({ row }) => {
    const user = row.original

    return (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDelete(user)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | **required** | Column definitions |
| `data` | `TData[]` | **required** | Data array |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `onRowClick` | `(row: TData) => void` | `undefined` | Row click handler |
| `className` | `string` | `undefined` | Additional CSS classes |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `showSearch` | `boolean` | `true` | Show search input |
| `pageSize` | `number` | `10` | Rows per page |
| `renderToolbar` | `() => ReactNode` | `undefined` | Custom toolbar component |

## Column Definition Options

```tsx
{
  accessorKey: 'fieldName',        // Data field to access
  id: 'uniqueId',                  // Unique column ID
  header: 'Column Title',          // Header text or component
  cell: ({ row }) => <div />,      // Custom cell renderer
  enableSorting: true,             // Enable sorting (default: true)
  enableHiding: true,              // Can be hidden (default: true)
}
```

## Styling

The DataTable uses Tailwind CSS classes. You can customize by:

1. Overriding with `className` prop
2. Modifying Tailwind config
3. Using custom cell renderers

## Tips

1. **Always use `useMemo`** for columns to prevent re-renders
2. **Type your data** for better TypeScript support
3. **Use `row.original`** to access full row data in cell renderers
4. **Add `enableSorting: false`** for columns like checkboxes or actions
5. **Use custom cells** for badges, images, or complex content

## Complete Example

See `src/App.tsx` for a full working example with all features!
