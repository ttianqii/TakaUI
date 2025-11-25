'use no memo';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { TableRoot, TableWrapper, TableContent, TableNavigator, SortableHeader } from '../components';
import { ArrowLeft, Copy, Check, Code } from 'lucide-react';

interface Product {
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

export default function TablePage() {
  const [sorting1, setSorting1] = useState<SortingState>([]);
  const [sorting2, setSorting2] = useState<SortingState>([]);
  const [sorting3, setSorting3] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

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

  // Example 1: Basic Table
  const basicColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Product" />,
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <SortableHeader column={column} title="Price" />,
      cell: ({ row }) => `$${(row.getValue('price') as number).toFixed(2)}`,
    },
  ];

  const table1 = useReactTable({
    data: sampleData.slice(0, 4),
    columns: basicColumns,
    state: { sorting: sorting1 },
    onSortingChange: setSorting1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Example 2: With Custom Cells
  const styledColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Product Name" />,
      cell: ({ row }) => <span className="font-semibold text-slate-900">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.getValue('category')}
        </span>
      ),
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <SortableHeader column={column} title="Price" />,
      cell: ({ row }) => (
        <span className="font-mono text-green-600 font-medium">
          ${(row.getValue('price') as number).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const colors = {
          'In Stock': 'bg-green-100 text-green-800 border-green-200',
          'Low Stock': 'bg-yellow-100 text-yellow-800 border-yellow-200',
          'Out of Stock': 'bg-red-100 text-red-800 border-red-200',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status as keyof typeof colors]}`}>
            {status}
          </span>
        );
      },
    },
  ];

  const table2 = useReactTable({
    data: sampleData,
    columns: styledColumns,
    state: { sorting: sorting2 },
    onSortingChange: setSorting2,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  // Example 3: With Search
  const searchColumns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Product" />,
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: ({ column }) => <SortableHeader column={column} title="Price" />,
      cell: ({ row }) => `$${(row.getValue('price') as number).toFixed(2)}`,
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => <SortableHeader column={column} title="Stock" />,
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number;
        return (
          <span className={stock < 10 ? 'text-red-600 font-medium' : ''}>
            {stock} units
          </span>
        );
      },
    },
  ];

  const table3 = useReactTable({
    data: sampleData,
    columns: searchColumns,
    state: { sorting: sorting3, globalFilter },
    onSortingChange: setSorting3,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

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
            <h1 className="text-5xl font-bold mb-3">Table System</h1>
            <p className="text-xl text-indigo-100">Powerful data tables with sorting, pagination, and custom styling</p>
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Install the package:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  npm install takaui @tanstack/react-table
                </code>
                <button
                  onClick={() => handleCopy('npm install takaui @tanstack/react-table', 'install')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copiedInstall ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Import components:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  import &#123; TableRoot, TableWrapper, TableContent, TableNavigator, SortableHeader &#125; from 'takaui';
                </code>
                <button
                  onClick={() => handleCopy("import { TableRoot, TableWrapper, TableContent, TableNavigator, SortableHeader } from 'takaui';", 'import')}
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
              
              <TableRoot table={table1} totalRecords={sampleData.slice(0, 4).length}>
                <TableWrapper>
                  <TableContent />
                </TableWrapper>
                <TableNavigator rowsPerPageOptions={[5, 10]} showPageSelector={true} />
              </TableRoot>

              {showCode1 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">ColumnDef</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'name'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: ({'{'} <span className="text-blue-300">column</span> {'}'}) =&gt; &lt;<span className="text-green-400">SortableHeader</span> <span className="text-blue-400">column</span>={'{'}column{'}'} <span className="text-blue-400">title</span>=<span className="text-green-400">"Product"</span> /&gt;,</div>
                    <div>  {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'category'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Category'</span> {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'price'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Price'</span> {'}'},</div>
                    <div>];</div>
                    <div className="h-4"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">table</span> = <span className="text-yellow-400">useReactTable</span>({'{'}data, columns{'}'});</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">TableRoot</span>&gt;</div>
                    <div>  &lt;<span className="text-green-400">TableWrapper</span>&gt;</div>
                    <div>    &lt;<span className="text-green-400">TableContent</span> <span className="text-blue-400">table</span>={'{'}table{'}'} <span className="text-blue-400">columns</span>={'{'}columns{'}'} /&gt;</div>
                    <div>  &lt;/<span className="text-green-400">TableWrapper</span>&gt;</div>
                    <div>  &lt;<span className="text-green-400">TableNavigator</span> <span className="text-blue-400">table</span>={'{'}table{'}'} /&gt;</div>
                    <div>&lt;/<span className="text-green-400">TableRoot</span>&gt;</div>
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
              
              <TableRoot table={table2} totalRecords={sampleData.length}>
                <TableWrapper>
                  <TableContent />
                </TableWrapper>
                <TableNavigator rowsPerPageOptions={[5, 10]} showPageSelector={true} />
              </TableRoot>

              {showCode2 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span> = [</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">accessorKey</span>: <span className="text-green-400">'status'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Status'</span>,</div>
                    <div>    <span className="text-blue-400">cell</span>: ({'{'} <span className="text-blue-300">row</span> {'}'}) =&gt; {'{'}</div>
                    <div>      <span className="text-purple-400">const</span> <span className="text-blue-300">status</span> = row.<span className="text-yellow-400">getValue</span>(<span className="text-green-400">'status'</span>);</div>
                    <div>      <span className="text-purple-400">return</span> (</div>
                    <div>        &lt;<span className="text-green-400">span</span> <span className="text-blue-400">className</span>=<span className="text-green-400">"px-2 py-1 rounded-full text-xs"</span>&gt;</div>
                    <div>          {'{'}status{'}'}</div>
                    <div>        &lt;/<span className="text-green-400">span</span>&gt;</div>
                    <div>      );</div>
                    <div>    {'}'},</div>
                    <div>  {'}'},</div>
                    <div>];</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: With Search */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Search Filter</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCode3(!showCode3)}
                    className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    {showCode3 ? 'Hide' : 'View'} Code
                  </button>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Advanced</span>
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <TableRoot table={table3} totalRecords={sampleData.length}>
                <TableWrapper>
                  <TableContent />
                </TableWrapper>
                <TableNavigator rowsPerPageOptions={[4, 8]} showPageSelector={true} />
              </TableRoot>

              {showCode3 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> [<span className="text-blue-300">globalFilter</span>, <span className="text-blue-300">setGlobalFilter</span>] = <span className="text-yellow-400">useState</span>(<span className="text-green-400">''</span>);</div>
                    <div className="h-4"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">table</span> = <span className="text-yellow-400">useReactTable</span>({'{'}</div>
                    <div>  data,</div>
                    <div>  columns,</div>
                    <div>  <span className="text-blue-400">state</span>: {'{'} globalFilter {'}'},</div>
                    <div>  onGlobalFilterChange: setGlobalFilter,</div>
                    <div>  <span className="text-yellow-400">getFilteredRowModel</span>: <span className="text-yellow-400">getFilteredRowModel</span>(),</div>
                    <div>{'}'});</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">input</span></div>
                    <div>  <span className="text-blue-400">value</span>={'{'}globalFilter{'}'}</div>
                    <div>  <span className="text-blue-400">onChange</span>={'{'}(<span className="text-blue-300">e</span>) =&gt; <span className="text-yellow-400">setGlobalFilter</span>(e.target.value){'}'}</div>
                    <div>  <span className="text-blue-400">placeholder</span>=<span className="text-green-400">"Search..."</span></div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* API Reference */}
        <div className="mb-12 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Reference</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">TableRoot</h3>
              <p className="text-sm text-slate-600 mb-2">Wrapper component for the entire table system.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">TableWrapper</h3>
              <p className="text-sm text-slate-600 mb-2">Container for the table with scrolling support.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">TableContent</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Prop</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-mono text-purple-600">table</td>
                      <td className="py-3 px-4 text-sm font-mono text-slate-600">Table&lt;TData&gt;</td>
                      <td className="py-3 px-4 text-sm text-slate-700">TanStack Table instance</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-mono text-purple-600">columns</td>
                      <td className="py-3 px-4 text-sm font-mono text-slate-600">ColumnDef&lt;TData&gt;[]</td>
                      <td className="py-3 px-4 text-sm text-slate-700">Column definitions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">TableNavigator</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Prop</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-mono text-purple-600">table</td>
                      <td className="py-3 px-4 text-sm font-mono text-slate-600">Table&lt;TData&gt;</td>
                      <td className="py-3 px-4 text-sm text-slate-700">TanStack Table instance for pagination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">SortableHeader</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Prop</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Type</th>
                      <th className="py-3 px-4 text-sm font-semibold text-slate-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-mono text-purple-600">column</td>
                      <td className="py-3 px-4 text-sm font-mono text-slate-600">Column&lt;TData&gt;</td>
                      <td className="py-3 px-4 text-sm text-slate-700">Column instance from TanStack Table</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm font-mono text-purple-600">title</td>
                      <td className="py-3 px-4 text-sm font-mono text-slate-600">string</td>
                      <td className="py-3 px-4 text-sm text-slate-700">Header title text</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
