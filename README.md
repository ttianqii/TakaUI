# TakaUI

Modern, accessible React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

[![npm version](https://img.shields.io/npm/v/@ttianqii/takaui.svg)](https://www.npmjs.com/package/@ttianqii/takaui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

- **[Getting Started Guide](./GETTING_STARTED.md)** - Complete installation and setup instructions
- **[Components Reference](./COMPONENTS.md)** - Detailed component documentation with examples
- **[GitHub Repository](https://github.com/ttianqii/takaui)** - Source code and issues

## ✨ Features

- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🎨 **Tailwind CSS** - Utility-first styling, fully customizable
- ♿ **Accessible** - Built with Radix UI primitives for accessibility
- 📦 **Tree-shakeable** - Only bundle what you use
- 🚀 **No dependencies** - Core components work standalone (DataTable, DataGrid)
- 📅 **Rich Components** - Calendar, DatePicker, TimePicker, Schedule, and more

## 🚀 Quick Start

### Installation

```bash
npm install @ttianqii/takaui
```

**All package managers supported:** npm, yarn, pnpm, bun

👉 For complete setup instructions, see the **[Getting Started Guide](./GETTING_STARTED.md)**

### Basic Example

```tsx
import { Button, DatePicker, Card } from '@ttianqii/takaui'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to TakaUI</h1>
      <DatePicker selected={date} onSelect={setDate} />
      <Button className="mt-4">Submit</Button>
    </Card>
  )
}
```

## 📦 Available Components

### 📅 Date & Time
- **Calendar** - Interactive calendar with holiday support
- **DatePicker** - Dropdown date selector
- **TimePicker** - Time selection input
- **WeekNavigator** - Week-based navigation
- **Schedule** - Weekly schedule view with events

### 📊 Data Display
- **DataTable** - Powerful table with sorting and pagination (no dependencies!)
- **DataGrid** - Advanced grid system with modular components

### 🎨 UI Components
- **Button** - Multiple variants and sizes
- **Card** - Container with header, content, footer
- **Input** - Form text input
- **Checkbox** - Accessible checkbox
- **Select** - Dropdown select
- **Modal** - Dialog overlay
- **DropdownMenu** - Accessible dropdown menu
- **Table** - Basic table components
- **Popover** - Floating content
- **Label** - Form labels
- **Separator** - Visual divider

👉 See **[Components Reference](./COMPONENTS.md)** for detailed documentation

## 💡 Component Examples

### Calendar with Holidays

```tsx
import { Calendar } from '@ttianqii/takaui'

<Calendar
  selected={date}
  onSelect={setDate}
  holidays={['US', 'GB']}
/>
```

### Data Table

```tsx
import { DataTable, DataTableColumn } from '@ttianqii/takaui'

const columns: DataTableColumn<User>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name' },
  { id: 'email', accessorKey: 'email', header: 'Email' },
]

<DataTable columns={columns} data={users} />
```

### Time Picker

```tsx
import { TimePicker } from '@ttianqii/takaui'

<TimePicker value="14:30" onChange={setTime} />
```

### Button Variants

```tsx
import { Button } from '@ttianqii/takaui'

<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

## 🛠️ Requirements

- React 18.x or 19.x
- Tailwind CSS 3.x
- TypeScript (optional but recommended)

## 🎨 Customization

All components accept `className` for custom styling:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Style
</Button>
```

## 📝 TypeScript Support

TakaUI is built with TypeScript and includes full type definitions:

```tsx
import type {
  ButtonProps,
  DatePickerProps,
  DataTableColumn,
} from '@ttianqii/takaui'
```

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR on [GitHub](https://github.com/ttianqii/takaui).

## 📄 License

MIT © [ttianqii](https://github.com/ttianqii)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@ttianqii/takaui)
- [GitHub Repository](https://github.com/ttianqii/takaui)
- [Report Issues](https://github.com/ttianqii/takaui/issues)

---

Made with ❤️ using React, TypeScript, and Tailwind CSS
