import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash, MoreHorizontal } from 'lucide-react'

import {
  Button,
  Checkbox,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../components'

// Define your data type
type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'available' | 'out-of-stock'
}

// Sample data
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 150,
    status: 'available',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 89.99,
    stock: 75,
    status: 'available',
  },
  {
    id: '3',
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 12.99,
    stock: 0,
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 45.99,
    stock: 30,
    status: 'available',
  },
  {
    id: '5',
    name: 'Webcam HD',
    category: 'Electronics',
    price: 59.99,
    stock: 20,
    status: 'available',
  },
]

export function SimpleDataTableExample() {
  // Define columns
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      // Selection checkbox
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
      // Product name
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      // Category
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
          const category = row.getValue('category') as string
          return (
            <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs">
              {category}
            </span>
          )
        },
      },
      // Price
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="h-auto p-0 hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const price = row.getValue('price') as number
          return <div className="font-medium">${price.toFixed(2)}</div>
        },
      },
      // Stock
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
          const stock = row.getValue('stock') as number
          return (
            <div className={stock === 0 ? 'text-red-600' : 'text-gray-900'}>
              {stock} units
            </div>
          )
        },
      },
      // Status
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                status === 'available'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {status === 'available' ? 'Available' : 'Out of Stock'}
            </span>
          )
        },
      },
      // Actions
      {
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
          const product = row.original

          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => console.log('Edit product:', product.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log('Delete product:', product.id)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Inventory</h1>
          <p className="text-gray-600 mt-1">
            Simple example of DataTable component usage
          </p>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-lg shadow p-6">
          <DataTable
            columns={columns}
            data={products}
            searchPlaceholder="Search products..."
            renderToolbar={() => (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Product
              </Button>
            )}
          />
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">How to use:</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
              <code>{`import { DataTable } from '@your-org/ui-library'

<DataTable
  columns={columns}
  data={products}
  searchPlaceholder="Search products..."
  renderToolbar={() => (
    <Button>Add Product</Button>
  )}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleDataTableExample
