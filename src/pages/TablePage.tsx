'use no memo';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, type DataTableColumn } from '../components';
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
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode4, setShowCode4] = useState(false);

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

  // Example 1: Basic Table Columns
  const basicColumns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Product',
    },
    {
      key: 'category',
      header: 'Category',
    },
    {
      key: 'price',
      header: 'Price',
      cell: (value) => `$${(value as number).toFixed(2)}`,
    },
  ];

  // Example 2: Styled Columns
  const styledColumns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Product Name',
      cell: (value) => <span className="font-semibold text-slate-900">{value}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      cell: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      cell: (value) => (
        <span className="font-mono text-green-600 font-medium">
          ${(value as number).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (value) => {
        const status = value as string;
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

  // Example 3: All Columns with Search
  const searchColumns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Product',
    },
    {
      key: 'category',
      header: 'Category',
    },
    {
      key: 'price',
      header: 'Price',
      cell: (value) => `$${(value as number).toFixed(2)}`,
    },
    {
      key: 'stock',
      header: 'Stock',
      cell: (value) => {
        const stock = value as number;
        return (
          <span className={stock < 10 ? 'text-red-600 font-medium' : ''}>
            {stock} units
          </span>
        );
      },
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
            <h1 className="text-5xl font-bold mb-3">DataTable</h1>
            <p className="text-xl text-indigo-100">Independent data table with built-in sorting, pagination, and search</p>
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
                  npm install takaui
                </code>
                <button
                  onClick={() => handleCopy('npm install takaui', 'install')}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copiedInstall ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Import the component:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-900 text-slate-100 px-4 py-3 rounded-lg text-sm">
                  import &#123; DataTable &#125; from 'takaui';
                </code>
                <button
                  onClick={() => handleCopy("import { DataTable } from 'takaui';", 'import')}
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
              
              <DataTable
                columns={basicColumns}
                data={sampleData.slice(0, 4)}
                showPagination={false}
                showSearch={false}
              />

              {showCode1 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataTableColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'name'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Product'</span>,</div>
                    <div>  {'}'},</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'category'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Category'</span>,</div>
                    <div>  {'}'},</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'price'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Price'</span>,</div>
                    <div>    <span className="text-blue-400">cell</span>: (<span className="text-blue-300">value</span>) =&gt; `$${'{'}(<span className="text-blue-300">value</span> <span className="text-purple-400">as</span> <span className="text-blue-400">number</span>).<span className="text-yellow-400">toFixed</span>(<span className="text-orange-400">2</span>){'}'}`,</div>
                    <div>  {'}'},</div>
                    <div>];</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DataTable</span></div>
                    <div>  <span className="text-blue-400">columns</span>={'{'}columns{'}'}</div>
                    <div>  <span className="text-blue-400">data</span>={'{'}data{'}'}</div>
                    <div>  <span className="text-blue-400">showPagination</span>={'{'}false{'}'}</div>
                    <div>  <span className="text-blue-400">showSearch</span>={'{'}false{'}'}</div>
                    <div>/&gt;</div>
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
              
              <DataTable
                columns={styledColumns}
                data={sampleData}
                showPagination={true}
                pageSize={5}
                showSearch={false}
              />

              {showCode2 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataTableColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'name'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Product Name'</span>,</div>
                    <div>    <span className="text-blue-400">cell</span>: (<span className="text-blue-300">value</span>) =&gt; (</div>
                    <div>      &lt;<span className="text-green-400">span</span> <span className="text-blue-400">className</span>=<span className="text-green-400">"font-semibold text-slate-900"</span>&gt;</div>
                    <div>        {'{'}value{'}'}</div>
                    <div>      &lt;/<span className="text-green-400">span</span>&gt;</div>
                    <div>    ),</div>
                    <div>  {'}'},</div>
                    <div>  {'{'}</div>
                    <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'status'</span>,</div>
                    <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Status'</span>,</div>
                    <div>    <span className="text-blue-400">cell</span>: (<span className="text-blue-300">value</span>) =&gt; (</div>
                    <div>      &lt;<span className="text-green-400">span</span> <span className="text-blue-400">className</span>=<span className="text-green-400">"px-2.5 py-0.5 rounded-full text-xs"</span>&gt;</div>
                    <div>        {'{'}value{'}'}</div>
                    <div>      &lt;/<span className="text-green-400">span</span>&gt;</div>
                    <div>    ),</div>
                    <div>  {'}'},</div>
                    <div>];</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DataTable</span></div>
                    <div>  <span className="text-blue-400">columns</span>={'{'}columns{'}'}</div>
                    <div>  <span className="text-blue-400">data</span>={'{'}data{'}'}</div>
                    <div>  <span className="text-blue-400">showPagination</span>={'{'}true{'}'}</div>
                    <div>  <span className="text-blue-400">pageSize</span>={'{'}5{'}'}</div>
                    <div>  <span className="text-blue-400">showSearch</span>={'{'}false{'}'}</div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Example 3: With Search */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">With Search & Pagination</h3>
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
              
              <DataTable
                columns={searchColumns}
                data={sampleData}
                showPagination={true}
                showSearch={true}
                pageSize={4}
                searchPlaceholder="Search products..."
              />

              {showCode3 && (
                <div className="mt-6 rounded-lg overflow-hidden border border-slate-200">
                  <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                    <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataTable</span>, <span className="text-purple-400">type</span> <span className="text-blue-300">DataTableColumn</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'takaui'</span>;</div>
                    <div className="h-4"></div>
                    <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataTableColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                    <div>  {'{'} <span className="text-blue-400">key</span>: <span className="text-green-400">'name'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Product'</span> {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">key</span>: <span className="text-green-400">'category'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Category'</span> {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">key</span>: <span className="text-green-400">'price'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Price'</span> {'}'},</div>
                    <div>  {'{'} <span className="text-blue-400">key</span>: <span className="text-green-400">'stock'</span>, <span className="text-blue-400">header</span>: <span className="text-green-400">'Stock'</span> {'}'},</div>
                    <div>];</div>
                    <div className="h-4"></div>
                    <div>&lt;<span className="text-green-400">DataTable</span></div>
                    <div>  <span className="text-blue-400">columns</span>={'{'}columns{'}'}</div>
                    <div>  <span className="text-blue-400">data</span>={'{'}data{'}'}</div>
                    <div>  <span className="text-blue-400">showPagination</span>={'{'}true{'}'}</div>
                    <div>  <span className="text-blue-400">showSearch</span>={'{'}true{'}'}</div>
                    <div>  <span className="text-blue-400">pageSize</span>={'{'}4{'}'}</div>
                    <div>  <span className="text-blue-400">searchPlaceholder</span>=<span className="text-green-400">"Search products..."</span></div>
                    <div>/&gt;</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Example 4: Clean Table (No Row Borders) */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Clean Table (No Row Borders)</h2>
            <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">Minimal</span>
          </div>
          <p className="text-slate-600 mb-6">
            A cleaner table style without row separators, keeping only the header separator for a minimal look.
          </p>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCode4(!showCode4)}
                  className="flex items-center gap-2 text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  <Code className="w-4 h-4" />
                  {showCode4 ? 'Hide' : 'View'} Code
                </button>
                <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">Clean</span>
              </div>
            </div>
            
            <DataTable
              columns={styledColumns}
              data={sampleData}
              variant="clean"
              showPagination={true}
              pageSize={4}
            />
          </div>

          {showCode4 && (
            <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
              <div className="bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto leading-relaxed font-mono">
                <div><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">DataTable</span>, <span className="text-purple-400">type</span> <span className="text-blue-300">DataTableColumn</span> {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'takaui'</span>;</div>
                <div className="h-4"></div>
                <div><span className="text-purple-400">const</span> <span className="text-blue-300">columns</span>: <span className="text-blue-400">DataTableColumn</span>&lt;<span className="text-blue-400">Product</span>&gt;[] = [</div>
                <div>  {'{'}</div>
                <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'name'</span>,</div>
                <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Product'</span>,</div>
                <div>    <span className="text-blue-400">sortable</span>: <span className="text-yellow-400">true</span></div>
                <div>  {'}'},</div>
                <div>  {'{'}</div>
                <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'category'</span>,</div>
                <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Category'</span>,</div>
                <div>    <span className="text-blue-400">sortable</span>: <span className="text-yellow-400">true</span></div>
                <div>  {'}'},</div>
                <div>  {'{'}</div>
                <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'price'</span>,</div>
                <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Price'</span>,</div>
                <div>    <span className="text-blue-400">sortable</span>: <span className="text-yellow-400">true</span></div>
                <div>  {'}'},</div>
                <div>  {'{'}</div>
                <div>    <span className="text-blue-400">key</span>: <span className="text-green-400">'stock'</span>,</div>
                <div>    <span className="text-blue-400">header</span>: <span className="text-green-400">'Stock'</span></div>
                <div>  {'}'}</div>
                <div>];</div>
                <div className="h-4"></div>
                <div>&lt;<span className="text-blue-300">DataTable</span></div>
                <div>  <span className="text-blue-400">columns</span>={'{'}columns{'}'}</div>
                <div>  <span className="text-blue-400">data</span>={'{'}data{'}'}</div>
                <div>  <span className="text-blue-400">variant</span>=<span className="text-green-400">"clean"</span></div>
                <div>  <span className="text-blue-400">showPagination</span>={'{'}true{'}'}</div>
                <div>  <span className="text-blue-400">pageSize</span>={'{'}4{'}'}</div>
                <div>/&gt;</div>
              </div>
            </div>
          )}
        </div>

        {/* API Reference */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Reference</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">DataTable Props</h3>
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
                    <td className="py-3 px-4 font-mono text-xs">DataTableColumn[]</td>
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
                    <td className="py-3 px-4 font-mono text-purple-600">showPagination</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">true</td>
                    <td className="py-3 px-4 text-slate-600">Show pagination controls</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">showSearch</td>
                    <td className="py-3 px-4 font-mono text-xs">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">true</td>
                    <td className="py-3 px-4 text-slate-600">Show search input</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">pageSize</td>
                    <td className="py-3 px-4 font-mono text-xs">number</td>
                    <td className="py-3 px-4 font-mono text-xs">10</td>
                    <td className="py-3 px-4 text-slate-600">Rows per page</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">searchPlaceholder</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4 font-mono text-xs">"Search..."</td>
                    <td className="py-3 px-4 text-slate-600">Search input placeholder</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">variant</td>
                    <td className="py-3 px-4 font-mono text-xs">"default" | "clean"</td>
                    <td className="py-3 px-4 font-mono text-xs">"default"</td>
                    <td className="py-3 px-4 text-slate-600">Table style variant</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">onRowClick</td>
                    <td className="py-3 px-4 font-mono text-xs">(row: T) =&gt; void</td>
                    <td className="py-3 px-4 text-slate-500">-</td>
                    <td className="py-3 px-4 text-slate-600">Callback when row is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">DataTableColumn Interface</h3>
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
                    <td className="py-3 px-4 font-mono text-purple-600">key</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-slate-600">Unique key for the column (matches data property)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">header</td>
                    <td className="py-3 px-4 font-mono text-xs">string</td>
                    <td className="py-3 px-4 text-slate-600">Column header text</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">cell</td>
                    <td className="py-3 px-4 font-mono text-xs">(value, row, index) =&gt; ReactNode</td>
                    <td className="py-3 px-4 text-slate-600">Optional custom cell renderer</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-purple-600">accessor</td>
                    <td className="py-3 px-4 font-mono text-xs">(row: T) =&gt; any</td>
                    <td className="py-3 px-4 text-slate-600">Optional custom accessor function</td>
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
