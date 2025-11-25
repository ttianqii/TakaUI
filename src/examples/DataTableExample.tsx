import '../index.css'
import { useMemo, useState } from 'react'
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { TableRoot } from '../components/ui/data-table'
import { TableWrapper } from '../components/ui/data-table-container'
import { TableContent } from '../components/ui/data-table-view'
import { TableNavigator } from '../components/ui/data-table-pagination'
import { SortableHeader } from '../components/ui/data-table-column-header'

interface Product {
  id: string
  name: string
  category: string
  supplier: string
  stock: number
  price: number
  status: 'active' | 'inactive'
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    category: 'Electronics',
    supplier: 'Tech Corp',
    stock: 150,
    price: 29.99,
    status: 'active',
  },
  {
    id: '2',
    name: 'USB-C Cable',
    category: 'Accessories',
    supplier: 'Cable Co',
    stock: 500,
    price: 12.50,
    status: 'active',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    category: 'Furniture',
    supplier: 'Desk Plus',
    stock: 75,
    price: 45.00,
    status: 'active',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    supplier: 'Tech Corp',
    stock: 0,
    price: 89.99,
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Monitor Arm',
    category: 'Furniture',
    supplier: 'Desk Plus',
    stock: 45,
    price: 120.00,
    status: 'active',
  },
  {
    id: '6',
    name: 'Webcam HD',
    category: 'Electronics',
    supplier: 'Vision Tech',
    stock: 200,
    price: 65.99,
    status: 'active',
  },
  {
    id: '7',
    name: 'Headphone Stand',
    category: 'Accessories',
    supplier: 'Audio Plus',
    stock: 120,
    price: 18.50,
    status: 'active',
  },
  {
    id: '8',
    name: 'Desk Lamp',
    category: 'Furniture',
    supplier: 'Light Co',
    stock: 80,
    price: 35.00,
    status: 'active',
  },
  {
    id: '9',
    name: 'External SSD 1TB',
    category: 'Electronics',
    supplier: 'Storage Inc',
    stock: 60,
    price: 149.99,
    status: 'active',
  },
  {
    id: '10',
    name: 'Phone Holder',
    category: 'Accessories',
    supplier: 'Mobile Gear',
    stock: 0,
    price: 9.99,
    status: 'inactive',
  },
]

export default function App() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader column={column} title="Product Name" />,
        cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'category',
        header: ({ column }) => <SortableHeader column={column} title="Category" />,
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'supplier',
        header: ({ column }) => <SortableHeader column={column} title="Supplier" />,
        cell: (info) => <span className="text-gray-600">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'stock',
        header: ({ column }) => <SortableHeader column={column} title="Stock" align="right" />,
        cell: (info) => {
          const stock = info.getValue() as number
          return (
            <span className={stock === 0 ? 'text-red-600 font-medium' : ''}>
              {stock}
            </span>
          )
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => <SortableHeader column={column} title="Price ($)" align="right" />,
        cell: (info) => <span className="font-semibold">${(info.getValue() as number).toFixed(2)}</span>,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <SortableHeader column={column} title="Status" align="center" />,
        cell: (info) => {
          const status = info.getValue() as string
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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

  const table = useReactTable({
    columns,
    data: products,
    pageCount: Math.ceil(products.length / pagination.pageSize),
    getRowId: (row: Product) => row.id,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <p className="mt-2 text-gray-600">
            Manage your inventory with TakaUI Table System
          </p>
        </div>

        <TableRoot table={table} totalRecords={products.length}>
          <div className="space-y-4">
            <TableWrapper>
              <TableContent />
            </TableWrapper>
            <TableNavigator />
          </div>
        </TableRoot>
      </div>
    </div>
  )
}
