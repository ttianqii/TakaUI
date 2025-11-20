# Calendar Component

A flexible and customizable calendar component with multiple selection modes.

## Import

```tsx
import { Calendar } from '@ttianqii/takaui'
```

## Basic Usage

### Single Date Selection

```tsx
import { Calendar } from '@ttianqii/takaui'
import { useState } from 'react'

function MyCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}
```

### Multiple Date Selection

```tsx
function MultiDateCalendar() {
  const [dates, setDates] = useState<Date[] | undefined>([])

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
    />
  )
}
```

### Date Range Selection

```tsx
import type { DateRange } from 'react-day-picker'

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection mode |
| `selected` | `Date \| Date[] \| DateRange \| undefined` | - | Selected date(s) |
| `onSelect` | `(date) => void` | - | Callback when date is selected |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `Date[] \| (date: Date) => boolean` | - | Disable specific dates |
| `fromDate` | `Date` | - | Minimum selectable date |
| `toDate` | `Date` | - | Maximum selectable date |
| `weekStartsOn` | `0-6` | `0` (Sunday) | First day of week |
| `showOutsideDays` | `boolean` | `true` | Show days from adjacent months |

## Examples

### Disable Past Dates

```tsx
function FutureOnlyCalendar() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={{ before: new Date() }}
    />
  )
}
```

### Disable Weekends

```tsx
function NoWeekendsCalendar() {
  const [date, setDate] = useState<Date | undefined>()

  const disableWeekends = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disableWeekends}
    />
  )
}
```

### Date Range with Min/Max

```tsx
function BookingCalendar() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      fromDate={new Date(2024, 0, 1)}
      toDate={new Date(2024, 11, 31)}
    />
  )
}
```

### Custom Styling

```tsx
function StyledCalendar() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg shadow-xl border-2 border-blue-500"
    />
  )
}
```

### Week Starts on Monday

```tsx
function EuropeanCalendar() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      weekStartsOn={1} // Monday
    />
  )
}
```

## Customization

### CSS Variables

The Calendar component uses these CSS variables for theming:

```css
.calendar {
  --rdp-cell-size: 40px;
  --rdp-accent-color: #3b82f6;
  --rdp-background-color: #fff;
  --rdp-outline: 2px solid var(--rdp-accent-color);
}
```

### Tailwind Classes

You can override styles using Tailwind classes:

```tsx
<Calendar
  className="
    bg-gray-50 
    rounded-2xl 
    shadow-2xl 
    p-6
    [&_.rdp-day_button]:rounded-full
    [&_.rdp-day_button:hover]:bg-blue-100
  "
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

## TypeScript

### Types

```tsx
import type { CalendarProps, DateRange } from '@ttianqii/takaui'

// Single mode
type SingleCalendarProps = CalendarProps & {
  mode: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

// Multiple mode
type MultipleCalendarProps = CalendarProps & {
  mode: 'multiple'
  selected?: Date[]
  onSelect?: (dates: Date[] | undefined) => void
}

// Range mode
type RangeCalendarProps = CalendarProps & {
  mode: 'range'
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}
```

## Accessibility

The Calendar component is fully accessible:

- ✅ Keyboard navigation (Arrow keys, Tab, Enter)
- ✅ ARIA labels and roles
- ✅ Screen reader support
- ✅ Focus management

## Dependencies

The Calendar component is built on top of:

- [react-day-picker](https://react-day-picker.js.org/) - Date picker library
- [date-fns](https://date-fns.org/) - Date utility library

## Related Components

- [DatePicker](./DATEPICKER.md) - Calendar with input trigger
- [TimePicker](./TIMEPICKER.md) - Time selection component
