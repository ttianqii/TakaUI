import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DataGrid,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
  type DataGridColumn,
} from '../components';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { ArrowLeft, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface Product extends Record<string, unknown> {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive';
}

const sampleData: Product[] = [
  { id: '1', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150, status: 'Active' },
  { id: '2', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 45, status: 'Active' },
  { id: '3', name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 8, status: 'Active' },
  { id: '4', name: 'Monitor Stand', category: 'Furniture', price: 49.99, stock: 0, status: 'Inactive' },
  { id: '5', name: 'Laptop Bag', category: 'Accessories', price: 39.99, stock: 67, status: 'Active' },
  { id: '6', name: 'Webcam HD', category: 'Electronics', price: 59.99, stock: 23, status: 'Active' },
  { id: '7', name: 'Phone Stand', category: 'Accessories', price: 15.99, stock: 89, status: 'Active' },
  { id: '8', name: 'LED Desk Lamp', category: 'Furniture', price: 34.99, stock: 12, status: 'Active' },
  { id: '9', name: 'Bluetooth Speaker', category: 'Electronics', price: 49.99, stock: 33, status: 'Active' },
  { id: '10', name: 'Portable Charger', category: 'Electronics', price: 25.99, stock: 0, status: 'Inactive' },
];

export default function TablePage() {
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  // Example 1: Basic Table
  const basicColumns: DataGridColumn<Product>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: <DataGridColumnHeader id="name" title="Product" />,
      enableSorting: true,
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: <DataGridColumnHeader id="category" title="Category" />,
      enableSorting: true,
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: <DataGridColumnHeader id="price" title="Price" />,
      cell: (row) => `$${(row.price as number).toFixed(2)}`,
      enableSorting: true,
    },
    {
      id: 'stock',
      accessorKey: 'stock',
      header: <DataGridColumnHeader id="stock" title="Stock" />,
      enableSorting: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.status as React.ReactNode}
        </span>
      ),
    },
  ];

  // Example 2: With Row Selection
  const selectionColumns: DataGridColumn<Product>[] = [
    {
      id: 'select',
      header: <DataGridTableRowSelectAll />,
      cell: (row) => <DataGridTableRowSelect row={row} />,
      size: 50,
      align: 'center',
    },
    ...basicColumns,
  ];

  // Example 3: Advanced with Actions
  const advancedColumns: DataGridColumn<Product>[] = [
    {
      id: 'select',
      header: <DataGridTableRowSelectAll />,
      cell: (row) => <DataGridTableRowSelect row={row} />,
      size: 50,
      align: 'center',
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: <DataGridColumnHeader id="name" title="Product" />,
      enableSorting: true,
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: <DataGridColumnHeader id="category" title="Category" />,
      enableSorting: true,
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: <DataGridColumnHeader id="price" title="Price" />,
      cell: (row) => (
        <span className="font-mono text-green-600 font-medium">
          ${(row.price as number).toFixed(2)}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: 'stock',
      accessorKey: 'stock',
      header: <DataGridColumnHeader id="stock" title="Stock" />,
      cell: (row) => {
        const stock = row.stock as number;
        return (
          <span className={stock === 0 ? 'text-red-600 font-semibold' : ''}>
            {stock}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.status as React.ReactNode}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 80,
      align: 'center',
    },
  ];

  const code1 = `import {
  DataGrid,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
} from '@/components';

const columns = [
  {
    id: 'name',
    accessorKey: 'name',
    header: <DataGridColumnHeader id="name" title="Product" />,
    enableSorting: true,
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: <DataGridColumnHeader id="category" title="Category" />,
    enableSorting: true,
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: <DataGridColumnHeader id="price" title="Price" />,
    cell: (row) => \`$\${row.price.toFixed(2)}\`,
    enableSorting: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => (
      <span className={\`px-2 py-1 text-xs rounded \${
        row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
      }\`}>
        {row.status}
      </span>
    ),
  },
];

<DataGrid
  columns={columns}
  data={data}
  getRowId={(row) => row.id}
  recordCount={data.length}
>
  <DataGridTable />
  <div className="mt-4">
    <DataGridPagination />
  </div>
</DataGrid>`;

  const code2 = `import {
  DataGrid,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components';

const columns = [
  {
    id: 'select',
    header: <DataGridTableRowSelectAll />,
    cell: (row) => <DataGridTableRowSelect row={row} />,
    size: 50,
    align: 'center',
  },
  // ... other columns
];

<DataGrid
  columns={columns}
  data={data}
  getRowId={(row) => row.id}
  recordCount={data.length}
>
  <DataGridTable />
  <div className="mt-4">
    <DataGridPagination />
  </div>
</DataGrid>`;

  const code3 = `import {
  DataGrid,
  DataGridTable,
  DataGridPagination,
  DataGridColumnHeader,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components';

const columns = [
  {
    id: 'select',
    header: <DataGridTableRowSelectAll />,
    cell: (row) => <DataGridTableRowSelect row={row} />,
    size: 50,
    align: 'center',
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: <DataGridColumnHeader id="name" title="Product" />,
    enableSorting: true,
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: <DataGridColumnHeader id="price" title="Price" />,
    cell: (row) => (
      <span className="font-mono text-green-600 font-medium">
        \${row.price.toFixed(2)}
      </span>
    ),
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 80,
    align: 'center',
  },
];`;

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">DataGrid</h1>
        <p className="text-gray-600 text-lg">
          A powerful, composable data grid component with built-in sorting, pagination, and row selection.
        </p>
      </div>

      {/* Example 1: Basic Table */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Basic Table</h2>
            <p className="text-gray-600">Simple table with sorting and pagination</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode1(!showCode1)}
            className="gap-2"
          >
            {showCode1 ? 'Hide' : 'View'} Code
          </Button>
        </div>

        <DataGrid<Product>
          columns={basicColumns}
          data={sampleData}
          getRowId={(row) => row.id}
          recordCount={sampleData.length}
        >
          <DataGridTable />
          <div className="mt-4">
            <DataGridPagination />
          </div>
        </DataGrid>

        {showCode1 && (
          <div className="mt-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code1}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Example 2: With Row Selection */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">With Row Selection</h2>
            <p className="text-gray-600">Enable row selection with checkboxes</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode2(!showCode2)}
            className="gap-2"
          >
            {showCode2 ? 'Hide' : 'View'} Code
          </Button>
        </div>

        <DataGrid<Product>
          columns={selectionColumns}
          data={sampleData}
          getRowId={(row) => row.id}
          recordCount={sampleData.length}
        >
          <DataGridTable />
          <div className="mt-4">
            <DataGridPagination />
          </div>
        </DataGrid>

        {showCode2 && (
          <div className="mt-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code2}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Example 3: Advanced with Actions */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Advanced with Actions</h2>
            <p className="text-gray-600">Complete example with selection, sorting, custom cells, and action menus</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode3(!showCode3)}
            className="gap-2"
          >
            {showCode3 ? 'Hide' : 'View'} Code
          </Button>
        </div>

        <DataGrid<Product>
          columns={advancedColumns}
          data={sampleData}
          getRowId={(row) => row.id}
          recordCount={sampleData.length}
        >
          <DataGridTable />
          <div className="mt-4">
            <DataGridPagination />
          </div>
        </DataGrid>

        {showCode3 && (
          <div className="mt-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code3}</code>
            </pre>
          </div>
        )}
      </div>

      {/* API Reference */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-3xl font-bold mb-8">API Reference</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">DataGrid Props</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Prop</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">columns</td>
                    <td className="px-4 py-3 text-sm font-mono">DataGridColumn[]</td>
                    <td className="px-4 py-3 text-sm">Column definitions</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">data</td>
                    <td className="px-4 py-3 text-sm font-mono">T[]</td>
                    <td className="px-4 py-3 text-sm">Data array to display</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">getRowId</td>
                    <td className="px-4 py-3 text-sm font-mono">(row: T) =&gt; string</td>
                    <td className="px-4 py-3 text-sm">Function to get unique row ID</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">recordCount</td>
                    <td className="px-4 py-3 text-sm font-mono">number</td>
                    <td className="px-4 py-3 text-sm">Total number of records</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">onRowClick</td>
                    <td className="px-4 py-3 text-sm font-mono">(row: T) =&gt; void</td>
                    <td className="px-4 py-3 text-sm">Optional row click handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">DataGridColumn</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Property</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold border-b">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">id</td>
                    <td className="px-4 py-3 text-sm font-mono">string</td>
                    <td className="px-4 py-3 text-sm">Unique column identifier</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">accessorKey</td>
                    <td className="px-4 py-3 text-sm font-mono">keyof T</td>
                    <td className="px-4 py-3 text-sm">Key to access data in row object</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">header</td>
                    <td className="px-4 py-3 text-sm font-mono">string | ReactNode</td>
                    <td className="px-4 py-3 text-sm">Column header content</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">cell</td>
                    <td className="px-4 py-3 text-sm font-mono">(row: T, index: number) =&gt; ReactNode</td>
                    <td className="px-4 py-3 text-sm">Custom cell renderer</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">size</td>
                    <td className="px-4 py-3 text-sm font-mono">number</td>
                    <td className="px-4 py-3 text-sm">Column width in pixels</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">enableSorting</td>
                    <td className="px-4 py-3 text-sm font-mono">boolean</td>
                    <td className="px-4 py-3 text-sm">Enable sorting for column</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm font-mono">align</td>
                    <td className="px-4 py-3 text-sm font-mono">'left' | 'center' | 'right'</td>
                    <td className="px-4 py-3 text-sm">Column alignment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Components</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGrid</h4>
                <p className="text-sm text-gray-600">Main container component that provides context and state management</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGridTable</h4>
                <p className="text-sm text-gray-600">Renders the table with rows and columns</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGridPagination</h4>
                <p className="text-sm text-gray-600">Pagination controls for navigating pages</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGridColumnHeader</h4>
                <p className="text-sm text-gray-600">Sortable column header with sort indicators</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGridTableRowSelect</h4>
                <p className="text-sm text-gray-600">Checkbox for individual row selection</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-mono text-sm font-semibold mb-2">DataGridTableRowSelectAll</h4>
                <p className="text-sm text-gray-600">Checkbox for selecting all rows on current page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
