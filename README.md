# TakaUI

Modern, accessible React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.

## Installation

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
bunm install react react-dom

# yarn
yarn add react react-dom

# pnpm
pnpm add react react-dom

# bun
bun add react react-dom
```

## Setup

TakaUI uses Tailwind CSS. Configure your project:

### 1. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind

Update your `tailwind.config.js`:

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

### 3. Add Tailwind Directives

In your main CSS file (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Components

### Calendar

Interactive calendar with holiday support and customizable styling.

```tsx
import { Calendar } from '@ttianqii/takaui'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState(new Date())

  return (
    <Calendar
      selectedDate={date}
      onDateChange={setDate}
      holidays={['US']}
      showWeekNumbers
    />
  )
}
```

**Props:**
- `selectedDate`: Current selected date
- `onDateChange`: Callback when date changes
- `holidays`: Array of country codes for holiday display
- `showWeekNumbers`: Show week numbers (default: false)

---

### DatePicker

Dropdown date selector with calendar popup.

```tsx
import { DatePicker } from '@ttianqii/takaui'

function App() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      placeholder="Select a date"
    />
  )
}
```

**Props:**
- `selected`: Selected date
- `onSelect`: Callback when date is selected
- `placeholder`: Input placeholder text

---

### TimePicker

Time selection input with hour/minute controls.

```tsx
import { TimePicker } from '@ttianqii/takaui'

function App() {
  const [time, setTime] = useState('09:00')

  return (
    <TimePicker
      value={time}
      onChange={setTime}
    />
  )
}
```

**Props:**
- `value`: Time string in HH:MM format
- `onChange`: Callback when time changes

---

### WeekNavigator

Week-based navigation component.

```tsx
import { WeekNavigator } from '@ttianqii/takaui'

function App() {
  const [date, setDate] = useState(new Date())

  return (
    <WeekNavigator
      currentDate={date}
      onDateChange={setDate}
      onWeekChange={(start, end) => {
        console.log('Week:', start, 'to', end)
      }}
    />
  )
}
```

**Props:**
- `currentDate`: Current date in view
- `onDateChange`: Callback when date changes
- `onWeekChange`: Callback with week start/end dates

---

### Schedule

Weekly schedule view with time slots.

```tsx
import { Schedule } from '@ttianqii/takaui'

function App() {
  return (
    <Schedule
      events={[
        {
          id: '1',
          title: 'Meeting',
          start: new Date('2024-01-15T10:00:00'),
          end: new Date('2024-01-15T11:00:00'),
        }
      ]}
      onEventClick={(event) => console.log(event)}
    />
  )
}
```

**Props:**
- `events`: Array of event objects
- `onEventClick`: Callback when event is clicked

---

### DataTable

Powerful data table with sorting, filtering, and pagination.

```tsx
import { DataTable } from '@ttianqii/takaui'
import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: string
  name: string
  email: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

function App() {
  const data: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ]

  return <DataTable columns={columns} data={data} />
}
```

**Required peer dependency:**
```bash
npm install @tanstack/react-table
```

**Props:**
- `columns`: Column definitions (TanStack Table format)
- `data`: Array of data objects
- `enableSorting`: Enable column sorting (default: true)
- `enableFiltering`: Enable filtering (default: true)

---

### DropdownMenu

Accessible dropdown menu component.

```tsx
import { DropdownMenu } from '@ttianqii/takaui'

function App() {
  return (
    <DropdownMenu
      trigger={<button>Options</button>}
      items={[
        { label: 'Edit', onClick: () => console.log('Edit') },
        { label: 'Delete', onClick: () => console.log('Delete') },
        { type: 'separator' },
        { label: 'Archive', onClick: () => console.log('Archive') },
      ]}
    />
  )
}
```

**Props:**
- `trigger`: Trigger element
- `items`: Array of menu items

---

## UI Components

TakaUI also exports low-level UI primitives:

```tsx
import {
  Button,
  Card,
  Checkbox,
  Input,
  Label,
  Modal,
  Popover,
  Select,
  Separator,
  Table,
} from '@ttianqii/takaui'
```

### Button

```tsx
<Button variant="default" size="default">
  Click me
</Button>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes:** `default`, `sm`, `lg`, `icon`

### Card

```tsx
<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Content goes here
  </Card.Content>
</Card>
```

### Input

```tsx
<Input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Modal

```tsx
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Modal Title"
>
  <p>Modal content</p>
</Modal>
```

## Utilities

```tsx
import { cn } from '@ttianqii/takaui'

// Merge Tailwind classes
const className = cn('text-red-500', isActive && 'font-bold')
```

## TypeScript

TakaUI is built with TypeScript and includes full type definitions.

## License

MIT

## Support

For issues and questions, visit [GitHub](https://github.com/ttianqii/takaui)
