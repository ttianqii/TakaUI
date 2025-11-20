# DatePicker Component

A date picker component with popover trigger and customizable formatting.

## Import

```tsx
import { DatePicker } from '@ttianqii/takaui'
```

## Basic Usage

```tsx
import { DatePicker } from '@ttianqii/takaui'
import { useState } from 'react'

function MyDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `date` | `Date \| undefined` | - | Selected date |
| `onDateChange` | `(date: Date \| undefined) => void` | - | Callback when date changes |
| `placeholder` | `string` | `'Pick a date'` | Placeholder text |
| `format` | `string` | `'PPP'` | Date format (date-fns format) |
| `disabled` | `Date[] \| (date: Date) => boolean` | - | Disable specific dates |
| `fromDate` | `Date` | - | Minimum selectable date |
| `toDate` | `Date` | - | Maximum selectable date |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'outline'` | Button variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Button size |
| `className` | `string` | - | Additional CSS classes |

## Examples

### With Custom Format

```tsx
function FormattedDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      format="yyyy-MM-dd" // ISO format
    />
  )
}
```

### With Date Range Limits

```tsx
function LimitedDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      fromDate={new Date(2024, 0, 1)}
      toDate={new Date(2024, 11, 31)}
      placeholder="Select date in 2024"
    />
  )
}
```

### Disable Past Dates

```tsx
function FutureDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      disabled={{ before: new Date() }}
      placeholder="Select future date"
    />
  )
}
```

### Different Sizes

```tsx
function SizedDatePickers() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="space-y-4">
      <DatePicker
        date={date}
        onDateChange={setDate}
        size="sm"
      />
      <DatePicker
        date={date}
        onDateChange={setDate}
        size="default"
      />
      <DatePicker
        date={date}
        onDateChange={setDate}
        size="lg"
      />
    </div>
  )
}
```

### Different Variants

```tsx
function VariantDatePickers() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="space-y-4">
      <DatePicker
        date={date}
        onDateChange={setDate}
        variant="default"
      />
      <DatePicker
        date={date}
        onDateChange={setDate}
        variant="outline"
      />
      <DatePicker
        date={date}
        onDateChange={setDate}
        variant="ghost"
      />
    </div>
  )
}
```

### Custom Styling

```tsx
function StyledDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      className="w-full"
      variant="outline"
    />
  )
}
```

## Date Format Options

The `format` prop uses [date-fns formatting](https://date-fns.org/docs/format):

| Format | Example Output |
|--------|----------------|
| `'PPP'` | `Apr 29, 2024` (default) |
| `'PP'` | `Apr 29, 2024` |
| `'P'` | `04/29/2024` |
| `'yyyy-MM-dd'` | `2024-04-29` |
| `'dd/MM/yyyy'` | `29/04/2024` |
| `'MMMM d, yyyy'` | `April 29, 2024` |
| `'MMM d'` | `Apr 29` |
| `'EEEE, MMMM d'` | `Monday, April 29` |

### Custom Format Examples

```tsx
// ISO Format (YYYY-MM-DD)
<DatePicker
  date={date}
  onDateChange={setDate}
  format="yyyy-MM-dd"
/>

// European Format (DD/MM/YYYY)
<DatePicker
  date={date}
  onDateChange={setDate}
  format="dd/MM/yyyy"
/>

// Long Format
<DatePicker
  date={date}
  onDateChange={setDate}
  format="EEEE, MMMM d, yyyy"
/>

// Short Format
<DatePicker
  date={date}
  onDateChange={setDate}
  format="MMM d, yy"
/>
```

## Form Integration

### React Hook Form

```tsx
import { DatePicker } from '@ttianqii/takaui'
import { useForm, Controller } from 'react-hook-form'

type FormData = {
  birthDate: Date
}

function DateForm() {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data.birthDate)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            date={field.value}
            onDateChange={field.onChange}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### With Validation

```tsx
function ValidatedDatePicker() {
  const [date, setDate] = useState<Date | undefined>()
  const [error, setError] = useState('')

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    
    if (!newDate) {
      setError('Date is required')
    } else if (newDate < new Date()) {
      setError('Date must be in the future')
    } else {
      setError('')
    }
  }

  return (
    <div>
      <DatePicker
        date={date}
        onDateChange={handleDateChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
```

## TypeScript

### Type Definitions

```tsx
import type { DatePickerProps } from '@ttianqii/takaui'

const MyDatePicker: React.FC<DatePickerProps> = (props) => {
  return <DatePicker {...props} />
}
```

## Accessibility

The DatePicker component is fully accessible:

- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Screen reader support
- ✅ Focus management
- ✅ Popover auto-positioning

## Customization

### Button Customization

```tsx
<DatePicker
  date={date}
  onDateChange={setDate}
  variant="outline"
  size="lg"
  className="
    border-2 
    border-blue-500 
    hover:bg-blue-50
    rounded-lg
  "
/>
```

### Calendar Customization

The calendar inside the popover inherits Calendar component styling. See [Calendar docs](./CALENDAR.md) for more customization options.

## Related Components

- [Calendar](./CALENDAR.md) - Standalone calendar component
- [TimePicker](./TIMEPICKER.md) - Time selection component
