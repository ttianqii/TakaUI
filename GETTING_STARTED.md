# Getting Started with TakaUI

Complete guide to installing and using TakaUI in your React project.

## ✅ Prerequisites

- Node.js 16.x or higher
- React 18.x or 19.x
- Package manager: npm, yarn, pnpm, or bun

## 📦 Installation

### Step 1: Install TakaUI

Choose your preferred package manager:

```bash
# npm
npm install @ttianqii/takaui

# yarn
yarn add @ttianqii/takaui

# pnpm
pnpm add @ttianqii/takaui

# bun
bun add @ttianqii/takaui
```

### Step 2: Install Peer Dependencies

TakaUI requires React and ReactDOM:

```bash
# npm
npm install react react-dom

# yarn
yarn add react react-dom

# pnpm
pnpm add react react-dom

# bun
bun add react react-dom
```

### Step 3: Install Tailwind CSS

TakaUI uses Tailwind CSS for styling. Install it as a dev dependency:

```bash
# npm
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# yarn
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# pnpm
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# bun
bun add -d tailwindcss postcss autoprefixer
bunx tailwindcss init -p
```

### Step 4: Configure Tailwind

Edit your `tailwind.config.js` to include TakaUI components:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ttianqii/takaui/dist/**/*.{js,cjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 5: Add Tailwind Directives

In your main CSS file (e.g., `src/index.css` or `src/App.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 6: Import CSS in Your App

```tsx
// src/main.tsx or src/index.tsx
import './index.css'
```

## 🎯 Quick Start

### Basic Usage

```tsx
import { Button, DatePicker, Card } from '@ttianqii/takaui'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">My App</h1>
      <DatePicker selected={date} onSelect={setDate} />
      <Button className="mt-4">Submit</Button>
    </Card>
  )
}
```

### Using the Calendar

```tsx
import { Calendar } from '@ttianqii/takaui'
import { useState } from 'react'

function MyCalendar() {
  const [selected, setSelected] = useState(new Date())

  return (
    <Calendar
      selected={selected}
      onSelect={setSelected}
      holidays={['US']}
    />
  )
}
```

### Using the DataTable

```tsx
import { DataTable, DataTableColumn } from '@ttianqii/takaui'

interface User {
  id: string
  name: string
  email: string
}

const columns: DataTableColumn<User>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name' },
  { id: 'email', accessorKey: 'email', header: 'Email' },
]

const data: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
]

function UserTable() {
  return <DataTable columns={columns} data={data} />
}
```

## 🔧 TypeScript Support

TakaUI is built with TypeScript and includes full type definitions. No additional setup required!

```tsx
import { DatePickerProps, CalendarProps } from '@ttianqii/takaui'

const MyComponent: React.FC<DatePickerProps> = (props) => {
  // Fully typed!
}
```

## 🎨 Styling & Customization

All TakaUI components accept `className` props for custom styling:

```tsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Button
</Button>

<Card className="shadow-lg border-2 border-blue-200">
  Custom Card
</Card>
```

## 🚀 Next Steps

- [View all components](./README.md#components)
- [Check examples](./README.md)
- [Report issues](https://github.com/ttianqii/takaui/issues)

## 🆘 Troubleshooting

### Styles not applying?

Make sure you:
1. Added Tailwind directives to your CSS
2. Included TakaUI in your `tailwind.config.js` content array
3. Imported your CSS file in your app

### Module not found errors?

Make sure you:
1. Installed all peer dependencies (`react`, `react-dom`)
2. Installed Tailwind CSS
3. Restarted your dev server after installation

### Component not found?

Check the [available exports](./README.md#components) to see all available components.
