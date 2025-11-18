# Quick Start Guide - TakaUI DataTable

Get started with TakaUI DataTable in under 5 minutes!

## Step 1: Install the Package

```bash
npm install @ttianqii/takaui
```

## Step 2: Install Peer Dependencies

TakaUI requires React and TanStack Table:

```bash
npm install react react-dom @tanstack/react-table
```

## Step 3: Import Styles

In your main entry file (e.g., `main.tsx` or `App.tsx`), import the CSS:

```tsx
import '@ttianqii/takaui/styles.css'
```

## Step 4: Set Up Tailwind CSS

TakaUI uses Tailwind CSS. Add this to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ttianqii/takaui/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Step 5: Create Your First Table

```tsx
import { DataTable } from '@ttianqii/takaui'
import type { ColumnDef } from '@tanstack/react-table'

// 1. Define your data type
type Product = {
  id: string
  name: string
  price: number
  stock: number
}

// 2. Create sample data
const products: Product[] = [
  { id: '1', name: 'Laptop', price: 999, stock: 25 },
  { id: '2', name: 'Mouse', price: 29, stock: 100 },
  { id: '3', name: 'Keyboard', price: 79, stock: 50 },
]

// 3. Define columns
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$${row.getValue('price')}`,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
]

// 4. Use the DataTable
function App() {
  return (
    <div className="p-8">
      <DataTable data={products} columns={columns} />
    </div>
  )
}

export default App
```

## Step 6: Run Your App

```bash
npm run dev
```

That's it! 🎉 You now have a working data table.

## Common Features (Optional)

### Add Search

```tsx
<DataTable 
  data={products} 
  columns={columns} 
  searchable 
  searchPlaceholder="Search products..."
/>
```

### Add Row Selection

```tsx
<DataTable 
  data={products} 
  columns={columns} 
  enableRowSelection
/>
```

### Add Custom Toolbar

```tsx
<DataTable 
  data={products} 
  columns={columns} 
  toolbar={
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      Add Product
    </button>
  }
/>
```

## Next Steps

- See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for advanced customization
- Check out examples in the [documentation](./README.md)

## Troubleshooting

**Styles not loading?**
- Make sure you imported `@ttianqii/takaui/styles.css`
- Check that Tailwind is configured correctly

**TypeScript errors?**
- Install `@types/react` and `@types/react-dom`
- Make sure TypeScript version is >= 5.0

**Need help?**
- Open an issue on GitHub
- Check the full documentation
