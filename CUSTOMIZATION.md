# Customization Guide - TakaUI DataTable

Advanced customization options for the TakaUI DataTable component.

## Table of Contents

1. [Column Customization](#column-customization)
2. [Cell Rendering](#cell-rendering)
3. [Styling](#styling)
4. [Sorting](#sorting)
5. [Filtering](#filtering)
6. [Pagination](#pagination)
7. [Row Selection](#row-selection)
8. [Toolbar Customization](#toolbar-customization)

---

## Column Customization

### Basic Column Definition

```tsx
const columns: ColumnDef<YourType>[] = [
  {
    accessorKey: 'fieldName',  // The field in your data
    header: 'Display Name',     // Column header text
  },
]
```

### Custom Column Header

```tsx
{
  accessorKey: 'price',
  header: () => (
    <div className="flex items-center gap-2">
      <DollarSign className="h-4 w-4" />
      <span>Price</span>
    </div>
  ),
}
```

### Column Alignment

```tsx
// Center aligned
{
  accessorKey: 'quantity',
  header: () => <div className="text-center">Quantity</div>,
  cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>,
}

// Right aligned
{
  accessorKey: 'price',
  header: () => <div className="text-right">Price</div>,
  cell: ({ row }) => <div className="text-right">${row.getValue('price')}</div>,
}
```

### Disable Sorting

```tsx
{
  accessorKey: 'actions',
  header: 'Actions',
  enableSorting: false,
}
```

---

## Cell Rendering

### Custom Cell Content

```tsx
{
  accessorKey: 'price',
  header: 'Price',
  cell: ({ row }) => {
    const amount = parseFloat(row.getValue('price'))
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
    return <div className="text-right font-medium">{formatted}</div>
  },
}
```

### Badge/Status Cell

```tsx
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.getValue('status') as string
    return (
      <div className="flex justify-center">
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
          status === 'Active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
    )
  },
}
```

### Image Cell

```tsx
{
  accessorKey: 'avatar',
  header: 'Avatar',
  cell: ({ row }) => (
    <img 
      src={row.getValue('avatar')} 
      alt="Avatar" 
      className="h-10 w-10 rounded-full"
    />
  ),
}
```

### Action Buttons Cell

```tsx
{
  id: 'actions',
  header: () => <div className="text-center">Actions</div>,
  cell: ({ row }) => (
    <div className="flex justify-center gap-2">
      <button 
        onClick={() => handleEdit(row.original)}
        className="text-blue-600 hover:text-blue-800"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button 
        onClick={() => handleDelete(row.original)}
        className="text-red-600 hover:text-red-800"
      >
        <Trash className="h-4 w-4" />
      </button>
    </div>
  ),
  enableSorting: false,
}
```

### Link Cell

```tsx
{
  accessorKey: 'name',
  header: 'Name',
  cell: ({ row }) => (
    <a 
      href={`/users/${row.original.id}`}
      className="text-blue-600 hover:underline"
    >
      {row.getValue('name')}
    </a>
  ),
}
```

---

## Styling

### Dark Theme Table

```tsx
<div className="bg-gray-900 p-6 rounded-lg">
  <DataTable 
    data={data} 
    columns={columns}
    className="[&_th]:bg-gray-800 [&_th]:text-gray-100 [&_td]:text-gray-300"
  />
</div>
```

### Custom Row Styling

```tsx
const columns: ColumnDef<Product>[] = [
  // ... your columns
]

// Add custom className to rows based on data
<DataTable 
  data={data} 
  columns={columns}
  rowClassName={(row) => 
    row.original.stock < 10 ? 'bg-red-50' : ''
  }
/>
```

### Striped Rows

```tsx
<DataTable 
  data={data} 
  columns={columns}
  className="[&_tbody_tr:nth-child(even)]:bg-gray-50"
/>
```

### Compact Table

```tsx
<DataTable 
  data={data} 
  columns={columns}
  className="[&_td]:py-2 [&_th]:py-2"
/>
```

---

## Sorting

### Default Sort

```tsx
import { useState } from 'react'
import { SortingState } from '@tanstack/react-table'

function MyTable() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false }  // Sort by name ascending by default
  ])

  return (
    <DataTable 
      data={data} 
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  )
}
```

### Multiple Column Sorting

```tsx
const [sorting, setSorting] = useState<SortingState>([
  { id: 'category', desc: false },
  { id: 'price', desc: true }
])
```

---

## Filtering

### Column-Specific Filter

```tsx
{
  accessorKey: 'category',
  header: 'Category',
  filterFn: (row, id, value) => {
    return value.includes(row.getValue(id))
  },
}
```

### Custom Search Function

```tsx
<DataTable 
  data={data} 
  columns={columns}
  searchable
  searchKey="name"  // Only search in the 'name' field
/>
```

---

## Pagination

### Custom Page Size

```tsx
<DataTable 
  data={data} 
  columns={columns}
  pageSize={20}  // Default is 10
/>
```

### Disable Pagination

```tsx
<DataTable 
  data={data} 
  columns={columns}
  pagination={false}
/>
```

---

## Row Selection

### Enable Row Selection

```tsx
<DataTable 
  data={data} 
  columns={columns}
  enableRowSelection
/>
```

### Get Selected Rows

```tsx
import { RowSelectionState } from '@tanstack/react-table'

function MyTable() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const handleAction = () => {
    console.log('Selected rows:', rowSelection)
  }

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      <button onClick={handleAction}>Process Selected</button>
    </>
  )
}
```

### Conditional Row Selection

```tsx
<DataTable 
  data={data} 
  columns={columns}
  enableRowSelection={(row) => row.original.selectable === true}
/>
```

---

## Toolbar Customization

### Basic Toolbar with Button

```tsx
<DataTable 
  data={data} 
  columns={columns}
  toolbar={
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Add New
    </button>
  }
/>
```

### Toolbar with Multiple Actions

```tsx
<DataTable 
  data={data} 
  columns={columns}
  toolbar={
    <div className="flex items-center gap-2">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Add New
      </button>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
        Export
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
        Delete Selected
      </button>
    </div>
  }
/>
```

### Toolbar with Filters

```tsx
<DataTable 
  data={data} 
  columns={columns}
  toolbar={
    <div className="flex items-center gap-2">
      <select className="px-3 py-2 border rounded-lg">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Clothing</option>
      </select>
      <input 
        type="date" 
        className="px-3 py-2 border rounded-lg"
      />
    </div>
  }
/>
```

---

## Complete Advanced Example

```tsx
import { DataTable } from '@ttianqii/takaui'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { Edit, Trash, Plus } from 'lucide-react'

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      return (
        <div className="text-right font-medium">
          ${amount.toFixed(2)}
        </div>
      )
    },
  },
  {
    accessorKey: 'stock',
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('stock')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <div className="flex justify-center">
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            status === 'In Stock' ? 'bg-green-100 text-green-800' :
            status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button className="text-blue-600 hover:text-blue-800">
          <Edit className="h-4 w-4" />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash className="h-4 w-4" />
        </button>
      </div>
    ),
    enableSorting: false,
  },
]

function App() {
  const [data, setData] = useState<Product[]>([/* your data */])

  return (
    <div className="p-8">
      <DataTable 
        data={data}
        columns={columns}
        searchable
        searchPlaceholder="Search products..."
        enableRowSelection
        toolbar={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        }
      />
    </div>
  )
}

export default App
```

---

## Tips & Best Practices

1. **Performance**: For large datasets (1000+ rows), consider implementing server-side pagination
2. **Accessibility**: Always provide meaningful header text for screen readers
3. **Mobile**: Use responsive classes for better mobile experience
4. **TypeScript**: Define proper types for type-safe column definitions
5. **Memoization**: Memoize column definitions to prevent unnecessary re-renders

```tsx
import { useMemo } from 'react'

function MyTable() {
  const columns = useMemo(() => [
    // your columns
  ], [])

  return <DataTable data={data} columns={columns} />
}
```

---

For more examples, check the [examples folder](./examples) or visit the [GitHub repository](https://github.com/yourusername/takaui).
