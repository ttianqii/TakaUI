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
  DataTable,
  type DataTableColumn,
  type PaginationState
} from '../components';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { ArrowLeft, Copy, Check, Code, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface Product extends Record<string, unknown> {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const sampleData: Product[] = [
  { id: '1', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150, status: 'In Stock' },
  { id: '2', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 45, status: 'In Stock' },
  { id: '3', name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 8, status: 'Low Stock' },
  { id: '4', name: 'Monitor Stand', category: 'Furniture', price: 49.99, stock: 0, status: 'Out of Stock' },
  { id: '5', name: 'Laptop Bag', category: 'Accessories', price: 39.99, stock: 67, status: 'In Stock' },
  { id: '6', name: 'Webcam HD', category: 'Electronics', price: 59.99, stock: 23, status: 'In Stock' },
];

// Extended data for advanced pagination demo (50+ items)
const extendedSampleData: Product[] = [
  ...sampleData,
  { id: '7', name: 'Gaming Headset', category: 'Electronics', price: 79.99, stock: 34, status: 'In Stock' },
  { id: '8', name: 'USB Hub', category: 'Accessories', price: 24.99, stock: 89, status: 'In Stock' },
  { id: '9', name: 'Desk Lamp', category: 'Furniture', price: 34.99, stock: 12, status: 'In Stock' },
  { id: '10', name: 'Phone Stand', category: 'Accessories', price: 15.99, stock: 56, status: 'In Stock' },
  { id: '11', name: 'External SSD 1TB', category: 'Electronics', price: 129.99, stock: 28, status: 'In Stock' },
  { id: '12', name: 'HDMI Cable', category: 'Accessories', price: 9.99, stock: 143, status: 'In Stock' },
  { id: '13', name: 'Bluetooth Speaker', category: 'Electronics', price: 49.99, stock: 5, status: 'Low Stock' },
  { id: '14', name: 'Ergonomic Chair', category: 'Furniture', price: 299.99, stock: 0, status: 'Out of Stock' },
  { id: '15', name: 'Mousepad XL', category: 'Accessories', price: 19.99, stock: 78, status: 'In Stock' },
  { id: '16', name: 'Webcam 4K', category: 'Electronics', price: 149.99, stock: 15, status: 'In Stock' },
  { id: '17', name: 'Cable Organizer', category: 'Accessories', price: 12.99, stock: 92, status: 'In Stock' },
  { id: '18', name: 'Standing Desk', category: 'Furniture', price: 399.99, stock: 7, status: 'Low Stock' },
  { id: '19', name: 'Wireless Charger', category: 'Electronics', price: 29.99, stock: 64, status: 'In Stock' },
  { id: '20', name: 'Monitor Arm', category: 'Furniture', price: 89.99, stock: 23, status: 'In Stock' },
  { id: '21', name: 'Laptop Stand', category: 'Furniture', price: 44.99, stock: 41, status: 'In Stock' },
  { id: '22', name: 'USB Microphone', category: 'Electronics', price: 99.99, stock: 18, status: 'In Stock' },
  { id: '23', name: 'Desk Mat', category: 'Accessories', price: 24.99, stock: 55, status: 'In Stock' },
  { id: '24', name: 'LED Strip Lights', category: 'Electronics', price: 19.99, stock: 87, status: 'In Stock' },
  { id: '25', name: 'Footrest', category: 'Furniture', price: 34.99, stock: 29, status: 'In Stock' },
  { id: '26', name: 'Portable SSD 500GB', category: 'Electronics', price: 79.99, stock: 36, status: 'In Stock' },
  { id: '27', name: 'Document Holder', category: 'Accessories', price: 16.99, stock: 44, status: 'In Stock' },
  { id: '28', name: 'Mesh Back Chair', category: 'Furniture', price: 179.99, stock: 12, status: 'In Stock' },
  { id: '29', name: 'Keyboard Wrist Rest', category: 'Accessories', price: 14.99, stock: 68, status: 'In Stock' },
  { id: '30', name: 'Monitor Privacy Screen', category: 'Accessories', price: 39.99, stock: 22, status: 'In Stock' },
  { id: '31', name: 'Surge Protector', category: 'Electronics', price: 24.99, stock: 95, status: 'In Stock' },
  { id: '32', name: 'Cable Sleeve', category: 'Accessories', price: 8.99, stock: 103, status: 'In Stock' },
  { id: '33', name: 'Ring Light', category: 'Electronics', price: 54.99, stock: 31, status: 'In Stock' },
  { id: '34', name: 'Filing Cabinet', category: 'Furniture', price: 149.99, stock: 6, status: 'Low Stock' },
  { id: '35', name: 'USB Fan', category: 'Electronics', price: 12.99, stock: 76, status: 'In Stock' },
  { id: '36', name: 'Pen Holder', category: 'Accessories', price: 9.99, stock: 88, status: 'In Stock' },
  { id: '37', name: 'Bookshelf', category: 'Furniture', price: 129.99, stock: 14, status: 'In Stock' },
  { id: '38', name: 'Graphics Tablet', category: 'Electronics', price: 199.99, stock: 9, status: 'Low Stock' },
  { id: '39', name: 'Stapler', category: 'Accessories', price: 7.99, stock: 112, status: 'In Stock' },
  { id: '40', name: 'Desk Organizer', category: 'Accessories', price: 18.99, stock: 47, status: 'In Stock' },
  { id: '41', name: 'Printer Stand', category: 'Furniture', price: 39.99, stock: 33, status: 'In Stock' },
  { id: '42', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 249.99, stock: 19, status: 'In Stock' },
  { id: '43', name: 'Label Maker', category: 'Electronics', price: 34.99, stock: 25, status: 'In Stock' },
  { id: '44', name: 'Task Light', category: 'Furniture', price: 29.99, stock: 52, status: 'In Stock' },
  { id: '45', name: 'Monitor Mount', category: 'Furniture', price: 119.99, stock: 11, status: 'In Stock' },
  { id: '46', name: 'Paper Shredder', category: 'Electronics', price: 79.99, stock: 8, status: 'Low Stock' },
  { id: '47', name: 'Whiteboard', category: 'Furniture', price: 49.99, stock: 27, status: 'In Stock' },
  { id: '48', name: 'USB Hub 10-Port', category: 'Electronics', price: 44.99, stock: 38, status: 'In Stock' },
  { id: '49', name: 'Desk Calendar', category: 'Accessories', price: 11.99, stock: 71, status: 'In Stock' },
  { id: '50', name: 'Gaming Mouse Pad RGB', category: 'Accessories', price: 29.99, stock: 59, status: 'In Stock' },
];

export default function TablePage() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode5, setShowCode5] = useState(false);
  const [showCode6, setShowCode6] = useState(false);
  const [showCode7, setShowCode7] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<PaginationState | null>(null);

  const handleCopy = (text: string, type: 'install' | 'import') => {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    }
  };

  const handleAction = (action: string, item: Product) => {
    console.log(`${action} action for:`, item);
  };

  // Example 1: Basic Table Columns
  const basicColumns: DataGridColumn<Product>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Product',
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: 'Category',
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: 'Price',
      cell: (row) => `$${row.price.toFixed(2)}`,
    },
  ];

  // Example 2: Styled Columns
  const styledColumns: DataGridColumn<Product>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Product Name',
      cell: (row) => <span className="font-semibold text-slate-900">{row.name}</span>,
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: 'Category',
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.category}
        </span>
      ),
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: 'Price',
      cell: (row) => (
        <span className="font-mono text-green-600 font-medium">
          ${row.price.toFixed(2)}
        </span>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => {
        const colors = {
          'In Stock': 'bg-green-100 text-green-800 border-green-200',
          'Low Stock': 'bg-yellow-100 text-yellow-800 border-yellow-200',
          'Out of Stock': 'bg-red-100 text-red-800 border-red-200',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[row.status]}`}>
            {row.status}
          </span>
        );
      },
    },
  ];

  // Example 3: Sortable Columns
  const sortableColumns: DataGridColumn<Product>[] = [
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
      cell: (row) => `$${row.price.toFixed(2)}`,
      enableSorting: true,
    },
    {
      id: 'stock',
      accessorKey: 'stock',
      header: 'Stock',
      cell: (row) => {
        const stock = row.stock;
        return (
          <span className={stock < 10 ? 'text-red-600 font-medium' : ''}>
            {stock} units
          </span>
        );
      },
    },
  ];

  // DataTable columns for pagination callback example
  const dataTableColumns: DataTableColumn<Product>[] = [
    { key: 'name', header: 'Product', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { 
      key: 'price', 
      header: 'Price', 
      accessor: (row) => row.price,
      cell: (value) => `$${(value as number).toFixed(2)}`,
      sortable: true 
    },
    { 
      key: 'stock', 
      header: 'Stock',
      cell: (value) => `${value} units`
    },
  ];

  // Example 5: With Checkboxes and Actions
  const checkboxColumns: DataGridColumn<Product>[] = [
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
      cell: (row) => `$${row.price.toFixed(2)}`,
      enableSorting: true,
    },
    {
      id: 'stock',
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleAction('edit', row)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('delete', row)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 100,
      align: 'center',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-5xl font-bold mb-3">DataGrid</h1>
            <p className="text-xl text-indigo-100">Advanced modular data grid with composition pattern</p>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Install the package (no extra dependencies needed!):</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  npm install @ttianqii/takaui
                </code>
                <button
                  onClick={() => handleCopy('npm install @ttianqii/takaui', 'install')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copiedInstall ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Import the components:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  import &#123; DataGrid, DataGridTable, DataGridPagination &#125; from '@ttianqii/takaui';
                </code>
                <button
                  onClick={() => handleCopy("import { DataGrid, DataGridTable, DataGridPagination } from '@ttianqii/takaui';", 'import')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copiedImport ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Examples</h2>
          <div className="space-y-8">
            
            {/* Example 1: Basic Table */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Basic Table</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode1(!showCode1)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode1 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Simple</span>
                </div>
              </div>
              
              <DataGrid 
                columns={basicColumns} 
                data={sampleData.slice(0, 4)}
                getRowId={(row) => row.id}
              >
                <DataGridTable />
              </DataGrid>

              {showCode1 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataGridColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-green-400">'Product'</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'price'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'price'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-green-400">'Price'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">cell</span>: (<span className="text-blue-300">row</span>) <span className="text-purple-400">=&gt;</span> <span className="text-orange-300">`</span>$<span className="text-orange-300">${'{'}</span>row.price.<span className="text-yellow-400">toFixed</span>(<span className="text-orange-400">2</span>)<span className="text-orange-300">{'}'}`</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div>];</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span></div>
                    <div className="pl-4"><span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span></div>
                    <div><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 2: Styled Cells */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Custom Cell Styling</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode2(!showCode2)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode2 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Styled</span>
                </div>
              </div>
              
              <DataGrid 
                columns={styledColumns} 
                data={sampleData}
                getRowId={(row) => row.id}
              >
                <DataGridTable />
                <DataGridPagination />
              </DataGrid>

              {showCode2 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataGridColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-green-400">'Product Name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">cell</span>: (<span className="text-blue-300">row</span>) <span className="text-purple-400">=&gt;</span> (</div>
                    <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-green-400">span</span> <span className="text-blue-400">className</span>=<span className="text-orange-300">"font-semibold text-slate-900"</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-orange-300">{'{'}row.name{'}'}</span></div>
                    <div className="pl-12"><span className="text-gray-500">&lt;/</span><span className="text-green-400">span</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-8">),</div>
                    <div className="pl-4">{'}'},</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'status'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'status'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-green-400">'Status'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">cell</span>: (<span className="text-blue-300">row</span>) <span className="text-purple-400">=&gt;</span> (</div>
                    <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-green-400">span</span> <span className="text-blue-400">className</span>=<span className="text-orange-300">"px-2.5 py-0.5 rounded-full text-xs"</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-orange-300">{'{'}row.status{'}'}</span></div>
                    <div className="pl-12"><span className="text-gray-500">&lt;/</span><span className="text-green-400">span</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-8">),</div>
                    <div className="pl-4">{'}'},</div>
                    <div>];</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span></div>
                    <div className="pl-4"><span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span></div>
                    <div><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridPagination</span> <span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: With Sorting */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Sorting & Pagination</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode3 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Full Featured</span>
                </div>
              </div>
              
              <DataGrid 
                columns={sortableColumns} 
                data={sampleData}
                getRowId={(row) => row.id}
              >
                <DataGridTable />
                <DataGridPagination />
              </DataGrid>

              {showCode3 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataGrid</span>, <span className="text-blue-300">DataGridTable</span>, <span className="text-blue-300">DataGridPagination</span>, <span className="text-blue-300">DataGridColumnHeader</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div className="my-3"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataGridColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'name'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-gray-500">&lt;</span><span className="text-blue-300">DataGridColumnHeader</span> <span className="text-blue-400">id</span>=<span className="text-orange-300">"name"</span> <span className="text-blue-400">title</span>=<span className="text-orange-300">"Product"</span> <span className="text-gray-500">/&gt;</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">enableSorting</span>: <span className="text-orange-400">true</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'category'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'category'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-gray-500">&lt;</span><span className="text-blue-300">DataGridColumnHeader</span> <span className="text-blue-400">id</span>=<span className="text-orange-300">"category"</span> <span className="text-blue-400">title</span>=<span className="text-orange-300">"Category"</span> <span className="text-gray-500">/&gt;</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">enableSorting</span>: <span className="text-orange-400">true</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'price'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'price'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-gray-500">&lt;</span><span className="text-blue-300">DataGridColumnHeader</span> <span className="text-blue-400">id</span>=<span className="text-orange-300">"price"</span> <span className="text-blue-400">title</span>=<span className="text-orange-300">"Price"</span> <span className="text-gray-500">/&gt;</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">enableSorting</span>: <span className="text-orange-400">true</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div>];</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span></div>
                    <div className="pl-4"><span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span></div>
                    <div className="pl-4"><span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span></div>
                    <div><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridPagination</span> <span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 5: With Checkboxes and Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-slate-900">With Checkboxes and Actions</h2>
                <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">Interactive</span>
              </div>
              <p className="text-slate-600 mb-6">
                Add row selection with checkboxes and action menus for each row.
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCode5(!showCode5)}
                      className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      {showCode5 ? 'Hide' : 'View'} Code
                    </button>
                    <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">Advanced</span>
                  </div>
                </div>
                
                <DataGrid 
                  columns={checkboxColumns} 
                  data={sampleData}
                  getRowId={(row) => row.id}
                >
                  <DataGridTable />
                  <DataGridPagination />
                </DataGrid>
              </div>

              {showCode5 && (
                <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataGrid</span>, <span className="text-blue-300">DataGridTable</span>, <span className="text-blue-300">DataGridPagination</span>, <span className="text-blue-300">DataGridColumnHeader</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataGridTableRowSelect</span>, <span className="text-blue-300">DataGridTableRowSelectAll</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DropdownMenu</span>, <span className="text-blue-300">DropdownMenuContent</span>, <span className="text-blue-300">DropdownMenuItem</span>, <span className="text-blue-300">DropdownMenuTrigger</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div className="my-3"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataGridColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'select'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTableRowSelectAll</span> <span className="text-gray-500">/&gt;</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">cell</span>: <span className="text-orange-300">{'('}</span><span className="text-blue-300">row</span><span className="text-orange-300">{')'} =&gt;</span> <span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTableRowSelect</span> <span className="text-blue-400">row</span>=<span className="text-orange-300">{'{'}row{'}'}</span> <span className="text-gray-500">/&gt;</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">size</span>: <span className="text-orange-400">50</span>, <span className="text-blue-400">align</span>: <span className="text-green-400">'center'</span>,</div>
                    <div className="pl-4">{'}'},</div>
                    <div className="pl-4">{'{'} <span className="text-blue-400">id</span>: <span className="text-green-400">'name'</span>, <span className="text-blue-400">header</span>: <span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridColumnHeader</span> <span className="text-blue-400">id</span>=<span className="text-orange-300">"name"</span> <span className="text-blue-400">title</span>=<span className="text-orange-300">"Product"</span> <span className="text-gray-500">/&gt;</span>, <span className="text-blue-400">enableSorting</span>: <span className="text-orange-400">true</span> {'}'},</div>
                    <div className="pl-4">{'{'} <span className="text-blue-400">id</span>: <span className="text-green-400">'category'</span>, <span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'category'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Category'</span>, <span className="text-blue-400">enableSorting</span>: <span className="text-orange-400">true</span> {'}'},</div>
                    <div className="pl-4">{'{'}</div>
                    <div className="pl-8"><span className="text-blue-400">id</span>: <span className="text-green-400">'actions'</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">header</span>: <span className="text-green-400">''</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">cell</span>: <span className="text-orange-300">{'('}</span><span className="text-blue-300">row</span><span className="text-orange-300">{')'} =&gt; {'('}</span></div>
                    <div className="pl-12"><span className="text-gray-500">&lt;</span><span className="text-green-400">DropdownMenu</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-gray-500">&lt;</span><span className="text-green-400">DropdownMenuTrigger</span> <span className="text-blue-400">asChild</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-20"><span className="text-gray-500">&lt;</span><span className="text-green-400">Button</span> <span className="text-blue-400">variant</span>=<span className="text-orange-300">"ghost"</span><span className="text-gray-500">&gt;&lt;</span><span className="text-green-400">MoreHorizontal</span> <span className="text-gray-500">/&gt;&lt;/</span><span className="text-green-400">Button</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-gray-500">&lt;/</span><span className="text-green-400">DropdownMenuTrigger</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-gray-500">&lt;</span><span className="text-green-400">DropdownMenuContent</span> <span className="text-blue-400">align</span>=<span className="text-orange-300">"end"</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-20"><span className="text-gray-500">&lt;</span><span className="text-green-400">DropdownMenuItem</span><span className="text-gray-500">&gt;</span>Edit<span className="text-gray-500">&lt;/</span><span className="text-green-400">DropdownMenuItem</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-20"><span className="text-gray-500">&lt;</span><span className="text-green-400">DropdownMenuItem</span> <span className="text-blue-400">className</span>=<span className="text-orange-300">"text-red-600"</span><span className="text-gray-500">&gt;</span>Delete<span className="text-gray-500">&lt;/</span><span className="text-green-400">DropdownMenuItem</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-16"><span className="text-gray-500">&lt;/</span><span className="text-green-400">DropdownMenuContent</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-12"><span className="text-gray-500">&lt;/</span><span className="text-green-400">DropdownMenu</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-8"><span className="text-orange-300">{')'}</span>,</div>
                    <div className="pl-8"><span className="text-blue-400">size</span>: <span className="text-orange-400">100</span>, <span className="text-blue-400">align</span>: <span className="text-green-400">'center'</span>,</div>
                    <div className="pl-4">{'}'}</div>
                    <div>];</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span> <span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span> <span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span> <span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridPagination</span> <span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 6: DataTable with Pagination Callback (NEW) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-slate-900">DataTable with Pagination Callback</h2>
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full">NEW</span>
              </div>
              <p className="text-slate-600 mb-6">
                Get pagination state changes to sync with your API. Perfect for server-side pagination with custom page sizes.
              </p>

              {paginationInfo && (
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-semibold text-slate-800 mb-2">Current Pagination State:</p>
                  <code className="block text-xs bg-white p-3 rounded border border-blue-200">
                    {JSON.stringify(paginationInfo, null, 2)}
                  </code>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCode7(!showCode7)}
                      className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      {showCode7 ? 'Hide' : 'View'} Code
                    </button>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">API Ready</span>
                  </div>
                </div>
                
                <DataTable
                  data={extendedSampleData}
                  columns={dataTableColumns}
                  pageSize={10}
                  pageSizeOptions={[5, 10, 20, 50]}
                  showPagination={true}
                  showSearch={true}
                  onPaginationChange={(pagination) => {
                    setPaginationInfo(pagination);
                    console.log('Pagination changed:', pagination);
                    // Here you would typically fetch data from your API:
                    // fetchData(pagination.page, pagination.limit);
                  }}
                />
              </div>

              {showCode7 && (
                <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataTable</span>, <span className="text-blue-300">PaginationState</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div className="my-3"></div>
                    <div><span className="text-purple-400">function</span> <span className="text-yellow-400">MyTable</span>() {'{'}</div>
                    <div className="pl-4"><span className="text-purple-400">const</span> [<span className="text-blue-300">paginationInfo</span>, <span className="text-blue-300">setPaginationInfo</span>] = <span className="text-yellow-400">useState</span>&lt;<span className="text-blue-400">PaginationState</span>&gt;();</div>
                    <div className="my-3"></div>
                    <div className="pl-4"><span className="text-purple-400">const</span> <span className="text-blue-300">handlePaginationChange</span> = (<span className="text-blue-300">pagination</span>: <span className="text-blue-400">PaginationState</span>) <span className="text-purple-400">=&gt;</span> {'{'}</div>
                    <div className="pl-8"><span className="text-gray-400">// Receives: {`{ page: 1, limit: 10, total: 50, totalPages: 5 }`}</span></div>
                    <div className="pl-8"><span className="text-yellow-400">setPaginationInfo</span>(pagination);</div>
                    <div className="my-3"></div>
                    <div className="pl-8"><span className="text-gray-400">// Send to your API</span></div>
                    <div className="pl-8"><span className="text-yellow-400">fetch</span>(<span className="text-orange-300">`/api/data?page=$</span><span className="text-orange-300">${'{'}</span>pagination.page<span className="text-orange-300">{'}'}</span>&limit=<span className="text-orange-300">${'{'}</span>pagination.limit<span className="text-orange-300">{'}'}`</span>)</div>
                    <div className="pl-12">.<span className="text-yellow-400">then</span>(<span className="text-blue-300">res</span> <span className="text-purple-400">=&gt;</span> res.<span className="text-yellow-400">json</span>())</div>
                    <div className="pl-12">.<span className="text-yellow-400">then</span>(<span className="text-blue-300">data</span> <span className="text-purple-400">=&gt;</span> <span className="text-yellow-400">setTableData</span>(data));</div>
                    <div className="pl-4">{'}'};</div>
                    <div className="my-3"></div>
                    <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                    <div className="pl-8"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataTable</span></div>
                    <div className="pl-12"><span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span></div>
                    <div className="pl-12"><span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span></div>
                    <div className="pl-12"><span className="text-blue-400">pageSize</span>=<span className="text-orange-300">{'{'}10{'}'}</span></div>
                    <div className="pl-12"><span className="text-blue-400">pageSizeOptions</span>=<span className="text-orange-300">{'{'}[5, 10, 20, 50, 100]{'}'}</span></div>
                    <div className="pl-12"><span className="text-blue-400">onPaginationChange</span>=<span className="text-orange-300">{'{'}handlePaginationChange{'}'}</span></div>
                    <div className="pl-8"><span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4">);</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 7: Advanced Pagination */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-slate-900">Advanced Pagination</h2>
                <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">New</span>
              </div>
              <p className="text-slate-600 mb-6">
                Use <code className="px-2 py-1 bg-slate-100 rounded text-sm">mode="advanced"</code> to enable page size selector and numbered page buttons.
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCode6(!showCode6)}
                      className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      {showCode6 ? 'Hide' : 'View'} Code
                    </button>
                    <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Featured</span>
                  </div>
                </div>
                
                <DataGrid 
                  columns={basicColumns} 
                  data={extendedSampleData}
                  getRowId={(row) => row.id}
                >
                  <DataGridTable />
                  <DataGridPagination mode="advanced" />
                </DataGrid>
              </div>

              {showCode6 && (
                <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono" style={{ lineHeight: '1.6' }}>
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataGrid</span>, <span className="text-blue-300">DataGridTable</span>, <span className="text-blue-300">DataGridPagination</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@ttianqii/takaui'</span>;</div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-400">// Simple mode (default)</span></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span> <span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span> <span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span> <span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridPagination</span> <span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                    <div className="my-3"></div>
                    <div><span className="text-gray-400">// Advanced mode with page size selector + numbered pages</span></div>
                    <div><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGrid</span> <span className="text-blue-400">columns</span>=<span className="text-orange-300">{'{'}columns{'}'}</span> <span className="text-blue-400">data</span>=<span className="text-orange-300">{'{'}data{'}'}</span> <span className="text-blue-400">getRowId</span>=<span className="text-orange-300">{'{'}(row) =&gt; row.id{'}'}</span><span className="text-gray-500">&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridTable</span> <span className="text-gray-500">/&gt;</span></div>
                    <div className="pl-4"><span className="text-gray-500">&lt;</span><span className="text-green-400">DataGridPagination</span></div>
                    <div className="pl-8"><span className="text-blue-400">mode</span>=<span className="text-orange-300">"advanced"</span></div>
                    <div className="pl-8"><span className="text-blue-400">pageSizeOptions</span>=<span className="text-orange-300">{'{'}[5, 10, 15, 20, 50]{'}'}</span></div>
                    <div className="pl-4"><span className="text-gray-500">/&gt;</span></div>
                    <div><span className="text-gray-500">&lt;/</span><span className="text-green-400">DataGrid</span><span className="text-gray-500">&gt;</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Reference</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">DataGrid Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Default</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">columns</td>
                    <td className="py-3 px-4 font-mono text-xs">DataGridColumn[]</td>
                    <td className="py-3 px-4 text-slate-500">required</td>
                    <td className="py-3 px-4 text-slate-600">Column definitions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">data</td>
                    <td className="py-3 px-4 font-mono text-xs">T[]</td>
                    <td className="py-3 px-4 text-slate-500">required</td>
                    <td className="py-3 px-4 text-slate-600">Array of data objects</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">getRowId</td>
                    <td className="py-3 px-4 font-mono text-xs">(row: T) =&gt; string</td>
                    <td className="py-3 px-4 text-slate-500">required</td>
                    <td className="py-3 px-4 text-slate-600">Function to get unique row ID</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">onRowClick</td>
                    <td className="py-3 px-4 font-mono text-xs">(row: T) =&gt; void</td>
                    <td className="py-3 px-4 text-slate-500">-</td>
                    <td className="py-3 px-4 text-slate-600">Callback when row is clicked</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">recordCount</td>
                    <td className="py-3 px-4 font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-slate-500">-</td>
                    <td className="py-3 px-4 text-slate-600">Total record count for server-side pagination</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">DataGridPagination Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Default</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">mode</td>
                    <td className="py-3 px-4 font-mono text-xs">'simple' | 'advanced'</td>
                    <td className="py-3 px-4 text-slate-500">'simple'</td>
                    <td className="py-3 px-4 text-slate-600">Pagination mode: simple (prev/next) or advanced (with page size selector and numbered pages)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">pageSizeOptions</td>
                    <td className="py-3 px-4 font-mono text-xs">number[]</td>
                    <td className="py-3 px-4 text-slate-500">[5, 10, 15, 20]</td>
                    <td className="py-3 px-4 text-slate-600">Available page sizes in advanced mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">DataGridColumn Interface</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Property</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">id</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-slate-600">Unique column identifier</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">accessorKey</td>
                    <td className="py-3 px-4 font-mono text-xs">keyof T</td>
                    <td className="py-3 px-4 text-slate-600">Data property key</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">header</td>
                    <td className="py-3 px-4 font-mono text-xs">string | ReactNode</td>
                    <td className="py-3 px-4 text-slate-600">Column header content</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">cell</td>
                    <td className="py-3 px-4 font-mono text-xs">(row: T, index: number) =&gt; ReactNode</td>
                    <td className="py-3 px-4 text-slate-600">Optional custom cell renderer</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">size</td>
                    <td className="py-3 px-4 font-mono text-xs">number</td>
                    <td className="py-3 px-4 text-slate-600">Column width in pixels</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">enableSorting</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 text-slate-600">Enable sorting for this column</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">align</td>
                    <td className="py-3 px-4 font-mono text-xs">'left' | 'center' | 'right'</td>
                    <td className="py-3 px-4 text-slate-600">Column alignment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
