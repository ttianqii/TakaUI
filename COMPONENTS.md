# TakaUI Components Reference

Complete reference for all components available in TakaUI.

## 📅 Date & Time Components

### Calendar

Interactive calendar with holiday support.

```tsx
import { Calendar } from '@ttianqii/takaui'

<Calendar
  selected={date}
  onSelect={setDate}
  holidays={['US', 'GB']}
  events={[
    {
      date: new Date('2024-12-25'),
      title: 'Christmas',
      type: 'holiday'
    }
  ]}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Date` | - | Currently selected date |
| `onSelect` | `(date: Date) => void` | - | Callback when date is selected |
| `holidays` | `string[]` | `[]` | Array of country codes (ISO 3166-1) |
| `events` | `CalendarEvent[]` | `[]` | Array of events to display |
| `className` | `string` | - | Additional CSS classes |

---

### DatePicker

Dropdown date selector with calendar popup.

```tsx
import { DatePicker } from '@ttianqii/takaui'

<DatePicker
  selected={date}
  onSelect={setDate}
  placeholder="Pick a date"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `Date` | - | Selected date |
| `onSelect` | `(date: Date) => void` | - | Callback when date is selected |
| `placeholder` | `string` | `"Pick a date"` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the picker |

---

### TimePicker

Time selection input with hour/minute controls.

```tsx
import { TimePicker } from '@ttianqii/takaui'

<TimePicker
  value="14:30"
  onChange={(time) => console.log(time)}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Time in HH:MM format |
| `onChange` | `(time: string) => void` | - | Callback when time changes |
| `disabled` | `boolean` | `false` | Disable the picker |

---

### WeekNavigator

Week-based navigation component.

```tsx
import { WeekNavigator } from '@ttianqii/takaui'

<WeekNavigator
  currentDate={date}
  onDateChange={setDate}
  onWeekChange={(start, end) => {
    console.log('Week:', start, 'to', end)
  }}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentDate` | `Date` | - | Current date in view |
| `onDateChange` | `(date: Date) => void` | - | Callback when date changes |
| `onWeekChange` | `(start: Date, end: Date) => void` | - | Callback with week start/end |

---

### Schedule

Weekly schedule view with time slots and events.

```tsx
import { Schedule } from '@ttianqii/takaui'

<Schedule
  events={[
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T11:00:00'),
      description: 'Weekly sync',
    }
  ]}
  onEventClick={(event) => console.log(event)}
  timeSlotDuration={30}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `ScheduleEvent[]` | - | Array of events |
| `onEventClick` | `(event: ScheduleEvent) => void` | - | Click handler |
| `timeSlotDuration` | `number` | `60` | Minutes per slot |
| `startHour` | `number` | `0` | Starting hour (0-23) |
| `endHour` | `number` | `24` | Ending hour (0-24) |

---

## 📊 Data Display Components

### DataTable

Powerful data table with sorting, filtering, and pagination. **No external dependencies required.**

```tsx
import { DataTable, DataTableColumn } from '@ttianqii/takaui'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

const columns: DataTableColumn<Product>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Product Name',
    enableSorting: true,
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: 'Price',
    cell: (row) => `$${row.price.toFixed(2)}`,
    enableSorting: true,
  },
  {
    id: 'stock',
    accessorKey: 'stock',
    header: 'Stock',
    enableSorting: true,
  },
]

const data: Product[] = [
  { id: '1', name: 'Widget', price: 29.99, stock: 100 },
  { id: '2', name: 'Gadget', price: 49.99, stock: 50 },
]

<DataTable columns={columns} data={data} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn<T>[]` | - | Column definitions |
| `data` | `T[]` | - | Array of data |
| `enableSorting` | `boolean` | `true` | Enable sorting |
| `enableFiltering` | `boolean` | `true` | Enable filtering |
| `pageSize` | `number` | `10` | Rows per page |

---

### DataGrid

Advanced data grid system with modular components. **No external dependencies.**

```tsx
import { 
  DataGrid, 
  DataGridTable,
  DataGridPagination,
  DataGridColumn 
} from '@ttianqii/takaui'

const columns: DataGridColumn<User>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name' },
  { id: 'email', accessorKey: 'email', header: 'Email' },
]

<DataGrid
  columns={columns}
  data={users}
  getRowId={(row) => row.id}
>
  <DataGridTable />
  <DataGridPagination />
</DataGrid>
```

**Components:**
- `DataGrid` - Container component
- `DataGridTable` - Table display
- `DataGridPagination` - Pagination controls
- `DataGridColumnHeader` - Sortable column header
- `DataGridTableRowSelect` - Row selection checkbox
- `DataGridTableRowSelectAll` - Select all checkbox

---

## 🎨 UI Components

### Button

Flexible button component with multiple variants and sizes.

```tsx
import { Button } from '@ttianqii/takaui'

<Button variant="default" size="default">
  Click me
</Button>
```

**Variants:**
- `default` - Primary button (default)
- `destructive` - Destructive action (red)
- `outline` - Outlined button
- `secondary` - Secondary button
- `ghost` - Ghost button (transparent)
- `link` - Link-styled button

**Sizes:**
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Square icon button
- `icon-sm` - Small icon button
- `icon-lg` - Large icon button

```tsx
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="ghost" size="icon">🔍</Button>
```

---

### Card

Container component with header, content, and footer sections.

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent, 
  CardFooter 
} from '@ttianqii/takaui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Input

Text input component with form integration.

```tsx
import { Input, Label } from '@ttianqii/takaui'

<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
```

---

### Checkbox

Accessible checkbox component.

```tsx
import { Checkbox, Label } from '@ttianqii/takaui'

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={accepted}
    onCheckedChange={setAccepted}
  />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

### Select

Dropdown select component.

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@ttianqii/takaui'

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

### Modal (Dialog)

Modal dialog component for overlays.

```tsx
import { Modal } from '@ttianqii/takaui'

<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Modal Title"
  description="Modal description"
>
  <div>
    <p>Modal content goes here</p>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </div>
</Modal>
```

---

### DropdownMenu

Accessible dropdown menu.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@ttianqii/takaui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleEdit}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleDelete}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Popover

Popover component for floating content.

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@ttianqii/takaui'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium">Popover Title</h4>
      <p>Popover content goes here</p>
    </div>
  </PopoverContent>
</Popover>
```

---

### Table

Basic table components for data display.

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@ttianqii/takaui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

### Label

Accessible label component for form fields.

```tsx
import { Label } from '@ttianqii/takaui'

<Label htmlFor="username">Username</Label>
```

---

### Separator

Visual separator line.

```tsx
import { Separator } from '@ttianqii/takaui'

<div>
  <p>Content above</p>
  <Separator className="my-4" />
  <p>Content below</p>
</div>
```

---

## 🛠️ Utilities

### cn

Utility function for merging Tailwind CSS classes.

```tsx
import { cn } from '@ttianqii/takaui'

const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)
```

### Time Utilities

Timezone conversion utilities.

```tsx
import { convertTimezone } from '@ttianqii/takaui'

const utcDate = new Date()
const localDate = convertTimezone(utcDate, 'UTC', 'America/New_York')
```

### Week Navigator Utilities

Helper functions for week navigation.

```tsx
import { weekNavigatorUtils } from '@ttianqii/takaui'

const { startOfWeek, endOfWeek, formatWeekRange } = weekNavigatorUtils
```

---

## 📝 TypeScript Types

All components export their prop types for TypeScript users:

```tsx
import type {
  ButtonProps,
  DatePickerProps,
  CalendarProps,
  DataTableColumn,
  DataTableProps,
  ScheduleEvent,
  ScheduleProps,
} from '@ttianqii/takaui'
```
