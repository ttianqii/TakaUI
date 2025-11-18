# TakaUI

A modern, fully-featured React component library for building beautiful data tables.

## Features

✨ **DataTable Component** - Feature-rich table with sorting, filtering, pagination  
🎨 **Tailwind CSS** - Beautiful, customizable styling  
📦 **TypeScript** - Full type safety  
🔍 **Search & Filter** - Built-in global search  
✅ **Row Selection** - Multi-row selection support  
📱 **Responsive** - Mobile-friendly design  
⚡ **Fast** - Optimized with TanStack Table  

## Installation

```bash
npm install @ttianqii/takaui
```

### Install Peer Dependencies

```bash
npm install react react-dom @tanstack/react-table
```

### Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Quick Start

1. **Import the CSS** in your main file (`main.tsx` or `App.tsx`):

```tsx
import '@ttianqii/takaui/styles.css'
```

2. **Configure Tailwind** (`tailwind.config.js`):

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ttianqii/takaui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. **Use the DataTable**:

```tsx
import { DataTable } from '@ttianqii/takaui'
import type { ColumnDef } from '@tanstack/react-table'

type Product = {
  id: string
  name: string
  price: number
}

const columns: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: 'Product Name' },
  { accessorKey: 'price', header: 'Price' },
]

const data: Product[] = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Mouse', price: 29 },
]

function App() {
  return <DataTable data={data} columns={columns} searchable />
}
```

## Documentation

📖 **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes  
🎨 **[Customization Guide](./CUSTOMIZATION.md)** - Advanced customization options  

## Components

### DataTable

Full-featured data table with:
- ✅ Sorting (single/multi-column)
- 🔍 Global search
- ✅ Row selection
- 📄 Pagination
- 🎨 Custom toolbar
- 🎯 Custom cell rendering
- 📱 Responsive design

### Other Components

- `Button` - Styled button with variants
- `Input` - Form input component
- `Checkbox` - Checkbox component
- `Table` - Base table primitives
- `DropdownMenu` - Dropdown menu system

## Examples

Check out the [examples](./src/App.tsx) in the source code for:
- Basic table
- Dark theme table
- Table with row selection
- Table with custom toolbar
- Table with actions

## License

MIT

## Links

- 📦 [npm package](https://www.npmjs.com/package/@ttianqii/takaui)
- 📚 [Documentation](./QUICK_START.md)
- 🐛 [Report Issues](https://github.com/yourusername/takaui/issues)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
