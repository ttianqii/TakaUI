# Component Library Usage Guide

## Installation

After publishing your library to npm, users can install it:

```bash
npm install @your-org/ui-library
# or
yarn add @your-org/ui-library
# or
pnpm add @your-org/ui-library
```

## Setup Required Dependencies

Your library has peer dependencies that users need to install:

```bash
npm install react react-dom @tanstack/react-table lucide-react
```

## Import Styles

Users need to import the CSS file in their main app file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@your-org/ui-library/dist/style.css'
```

## Using DataTable Component

### Simple Example (No Search, No Pagination)

```tsx
import { DataTable } from '@your-org/ui-library'
import type { ColumnDef } from '@tanstack/react-table'

type Employee = {
  id: string
  name: string
  department: string
  position: string
  email: string
}

function MyApp() {
  const data: Employee[] = [
    {
      id: '1',
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      email: 'john.smith@company.com',
    },
    // ... more data
  ]

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'position',
      header: 'Position',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      showSearch={false}
      showPagination={false}
    />
  )
}
```

### Full Featured Example (With Search, Sorting, Pagination)

```tsx
import { DataTable, Button, Checkbox } from '@your-org/ui-library'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

type Product = {
  id: string
  product: string
  category: string
  quantity: number
  price: number
}

function MyApp() {
  const data: Product[] = [
    // your data here
  ]

  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'product',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('product')}</div>,
    },
    {
      accessorKey: 'quantity',
      header: () => <div className="text-center">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('quantity')}</div>
      ),
    },
    // ... more columns
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search products..."
      showSearch={true}
      showPagination={true}
      pageSize={10}
    />
  )
}
```

## Available Components

### DataTable
- `columns` (required): Column definitions
- `data` (required): Array of data
- `searchPlaceholder`: Placeholder text for search input
- `showSearch`: Show/hide search box (default: true)
- `showPagination`: Show/hide pagination (default: true)
- `pageSize`: Items per page (default: 10)
- `onRowClick`: Callback when row is clicked
- `renderToolbar`: Custom toolbar component

### Button
```tsx
import { Button } from '@your-org/ui-library'

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Checkbox
```tsx
import { Checkbox } from '@your-org/ui-library'

<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
```

### Input
```tsx
import { Input } from '@your-org/ui-library'

<Input type="text" placeholder="Enter text..." />
```

### Table Components
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@your-org/ui-library'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Before Publishing

1. Update `package.json`:
   - Change `@your-org/ui-library` to your actual npm organization/package name
   - Update version, description, author, repository, etc.

2. Build the library:
   ```bash
   npm run build
   ```

3. Publish to npm:
   ```bash
   npm publish --access public
   ```

## TypeScript Support

All components are fully typed. Import types as needed:

```tsx
import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableProps } from '@your-org/ui-library'
```
