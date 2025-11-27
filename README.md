# TakaUI

[![npm version](https://img.shields.io/npm/v/@ttianqii/takaui.svg)](https://www.npmjs.com/package/@ttianqii/takaui)
[![npm downloads](https://img.shields.io/npm/dm/@ttianqii/takaui.svg)](https://www.npmjs.com/package/@ttianqii/takaui)
[![license](https://img.shields.io/npm/l/@ttianqii/takaui.svg)](https://github.com/ttianqii/takaui/blob/main/LICENSE)

A modern, customizable React UI component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

**Current Version:** 0.0.6

## ✨ What's New in 0.0.6

- 🎯 **DatePicker Range Selection** - Select date ranges with 1 or 2 month views
- 🎨 **Enhanced Hover States** - Improved visual feedback for range selection
- 🔧 **DataGrid System** - New modular table components for better composition
- 📅 **Schedule Component** - Now supports Date type in custom metadata fields
- 🐛 **Bug Fixes** - Text alignment and various improvements

## 📦 Installation

### Quick Setup (Recommended)

Run the automatic setup wizard:

```bash
npm install @ttianqii/takaui
npx takaui-setup
```

This will:
- ✅ Configure your Tailwind config automatically
- ✅ Add CSS import to your main file
- ✅ Verify your setup is correct

### Manual Installation

If you prefer manual setup:

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

### Peer Dependencies

TakaUI requires React 18+ or React 19+:

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

### Tailwind CSS Setup

**Important:** TakaUI uses Tailwind CSS for styling (no CSS imports needed!). You must have Tailwind CSS configured in your project.

#### 1. Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 2. Configure Tailwind

Add TakaUI to your `tailwind.config.js` content paths:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ttianqii/takaui/dist/**/*.{js,mjs,cjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### 3. Add Tailwind directives

In your main CSS file (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**That's it!** No CSS imports needed from TakaUI. 🎉

## 🚀 Quick Start

```tsx
import { DatePicker, TimePicker, DataTable } from '@ttianqii/takaui'
import '@ttianqii/takaui/styles.css'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>()
  
  // DataTable example - No TanStack required!
  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Status',
      cell: (value) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
          {value}
        </span>
      )
    },
  ]
  
  const data = [
    { id: 1, name: 'John', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane', email: 'jane@example.com', status: 'Active' },
  ]
  
  return (
    <div>
      {/* Single Date Picker */}
      <DatePicker
        date={date}
        onDateChange={setDate}
      />
      
      {/* Date Range Picker - NEW! */}
      <DatePicker
        mode="range"
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        numberOfMonths={2}
      />
      
      <DataTable 
        data={data} 
        columns={columns}
        showSearch
        searchPlaceholder="Search users..."
      />
    </div>
  )
}
```

## 📚 Components

TakaUI includes the following components:

### Form & Input Components

- **[Calendar](./docs/CALENDAR.md)** - Flexible date picker with multiple selection modes
- **[DatePicker](./docs/DATEPICKER.md)** - Date picker with popover and custom formatting
  - ✨ **NEW:** Range selection with dual month view
  - ✨ **NEW:** Enhanced hover states for better UX
- **[TimePicker](./docs/TIMEPICKER.md)** - Time picker with 12h/24h formats and timezone support
- **[DropdownMenu](./docs/DROPDOWN.md)** - Accessible dropdown menu component

### Data Display Components

- **[DataTable](./docs/DATATABLE_NEW.md)** - Independent table with sorting, filtering, and pagination (No TanStack!)
  - ✅ Zero external dependencies (except icons)
  - ✅ Built-in sorting, pagination, search
  - ✅ Custom cell rendering
  - ✅ Loading states
  - [Quick Reference](./DATATABLE_QUICKREF.md) - Cheat sheet
- **DataGrid System** - ✨ **NEW!** Modular table components for custom layouts
  - DataGrid, DataGridTable, DataGridPagination
  - DataGridColumnHeader, DataGridRowSelect
  - Perfect for complex table compositions
- **[Schedule](./docs/SCHEDULE.md)** - Weekly schedule component with custom fields
  - ✨ **NEW:** Supports Date type in metadata
- **[WeekNavigator](./docs/WEEKNAVIGATOR.md)** - Week navigation with date range display

### Advanced Table System (Optional)

For advanced users who need TanStack Table features:

- **[TableRoot, TableContent, TableNavigator](./docs/DATATABLE.md)** - Modular table components
  - Requires: `npm install @tanstack/react-table`
  - [Modular Structure](./docs/DATATABLE_MODULAR.md)
  - [Architecture](./DATATABLE_ARCHITECTURE.md)

### Base UI Components

All components are built on top of shadcn/ui primitives:

- Button
- Input
- Label
- Select
- Popover
- Dialog/Modal
- Checkbox
- Card

## 📖 Documentation

Detailed documentation for each component:

- [Calendar Documentation](./docs/CALENDAR.md)
- [DatePicker Documentation](./docs/DATEPICKER.md)
- [TimePicker Documentation](./docs/TIMEPICKER.md)
- [DataTable Documentation](./docs/DATATABLE.md)
- [Schedule Documentation](./docs/SCHEDULE.md)
- [WeekNavigator Documentation](./docs/WEEKNAVIGATOR.md)
- [DropdownMenu Documentation](./docs/DROPDOWN.md)

## 🎨 Customization

### Styling with Tailwind

All components accept a `className` prop for custom styling:

```tsx
<Calendar 
  className="rounded-lg shadow-lg border-2 border-blue-500"
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

### Theming

TakaUI components use CSS variables for theming. You can customize colors in your global CSS:

```css
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  /* Add more custom variables */
}
```

## 🔧 TypeScript Support

TakaUI is built with TypeScript and includes full type definitions. All props are fully typed for excellent IDE support.

```tsx
import type { CalendarProps, DatePickerProps } from '@ttianqii/takaui'
```

## 📦 Tree Shaking

TakaUI supports tree shaking. Import only the components you need:

```tsx
// Good - Only imports Calendar
import { Calendar } from '@ttianqii/takaui'

// Also works - Named imports
import { Calendar, TimePicker, DataTable } from '@ttianqii/takaui'
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [GitHub Repository](https://github.com/ttianqii/takaui)
- [npm Package](https://www.npmjs.com/package/@ttianqii/takaui)

## 📞 Support

For issues and questions:

- Open an issue on [GitHub](https://github.com/ttianqii/takaui/issues)
- Check the [documentation](./docs/)

## 🎯 Roadmap

- [ ] Additional form components (Switch, Radio, Slider)
- [ ] Chart components
- [ ] Toast notifications
- [ ] Command palette
- [ ] Theme switcher
- [ ] More data display components

---

Made with ❤️ by [@ttianqii](https://github.com/ttianqii)
