'use no memo';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { TableRoot, TableWrapper, TableContent, TableNavigator, SortableHeader } from '../components';
import { ArrowLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const data: Product[] = [
  { id: '1', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150, status: 'In Stock' },
  { id: '2', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 45, status: 'In Stock' },
  { id: '3', name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 8, status: 'Low Stock' },
  { id: '4', name: 'Monitor Stand', category: 'Furniture', price: 49.99, stock: 0, status: 'Out of Stock' },
  { id: '5', name: 'Laptop Bag', category: 'Accessories', price: 39.99, stock: 67, status: 'In Stock' },
  { id: '6', name: 'Webcam HD', category: 'Electronics', price: 59.99, stock: 23, status: 'In Stock' },
  { id: '7', name: 'Desk Lamp', category: 'Furniture', price: 34.99, stock: 5, status: 'Low Stock' },
  { id: '8', name: 'Phone Holder', category: 'Accessories', price: 15.99, stock: 89, status: 'In Stock' },
];

export default function TablePage() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Product Name" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => <SortableHeader column={column} title="Category" />,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <SortableHeader column={column} title="Price" />,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'));
        return <span>${amount.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => <SortableHeader column={column} title="Stock" />,
      cell: ({ row }) => <span className="text-center block">{row.getValue('stock')}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const colors = {
          'In Stock': 'bg-green-100 text-green-800',
          'Low Stock': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
            {status}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Table System</h1>
          <p className="text-slate-600">Powerful data tables with sorting, filtering, and pagination</p>
        </div>

        {/* Example */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Product Inventory</h3>
          <TableRoot table={table} totalRecords={data.length}>
            <TableWrapper>
              <TableContent />
            </TableWrapper>
            <TableNavigator 
              rowsPerPageOptions={[5, 10, 20]}
              showPageSelector={true}
            />
          </TableRoot>
        </div>

        {/* Usage Code */}
        <div className="bg-slate-900 rounded-xl p-6 text-slate-100">
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <pre className="text-sm overflow-x-auto">
{`import { useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { TableRoot, TableWrapper, TableContent, TableNavigator, SortableHeader } from 'takaui';

function Example() {
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
    },
    // ... more columns
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <TableRoot tableInstance={table} totalRecords={data.length}>
      <TableWrapper>
        <TableContent />
      </TableWrapper>
      <TableNavigator rowsPerPageOptions={[10, 20, 50]} />
    </TableRoot>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
