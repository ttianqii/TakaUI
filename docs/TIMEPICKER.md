# TimePicker Component

A time picker component with 12h/24h formats, timezone support, and scrollable column interface.

## Import

```tsx
import { TimePicker } from '@ttianqii/takaui'
```

## Basic Usage

```tsx
import { TimePicker } from '@ttianqii/takaui'
import { useState } from 'react'

function MyTimePicker() {
  const [time, setTime] = useState<Date | undefined>(new Date())

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `time` | `Date \| undefined` | - | Selected time |
| `onTimeChange` | `(time: Date \| undefined) => void` | - | Callback when time changes |
| `format` | `'12h' \| '24h'` | `'24h'` | Time format |
| `timezone` | `string` | `'UTC'` | Timezone identifier (for backend use) |
| `showTimezone` | `boolean` | `false` | Show timezone label |
| `showSeconds` | `boolean` | `false` | Show seconds selector |
| `minuteStep` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Minute increment step |
| `showClockFace` | `boolean` | `false` | Show analog clock face |
| `placeholder` | `string` | `'Select time'` | Placeholder text |
| `variant` | `'default' \| 'outline' \| 'ghost'` | `'outline'` | Button variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Button size |
| `className` | `string` | - | Additional CSS classes |

## Examples

### 12-Hour Format

```tsx
function TwelveHourPicker() {
  const [time, setTime] = useState<Date | undefined>()

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
      format="12h"
    />
  )
}
```

### 24-Hour Format

```tsx
function TwentyFourHourPicker() {
  const [time, setTime] = useState<Date | undefined>()

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
      format="24h"
    />
  )
}
```

### With Seconds

```tsx
function TimePickerWithSeconds() {
  const [time, setTime] = useState<Date | undefined>()

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
      showSeconds={true}
    />
  )
}
```

### With Minute Steps

```tsx
function FiveMinuteSteps() {
  const [time, setTime] = useState<Date | undefined>()

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
      minuteStep={5} // Only allow :00, :05, :10, etc.
    />
  )
}
```

### With Timezone (Backend Use)

**Important**: The timezone prop is for programmatic use, not UI selection. Set it in your code to send to your backend.

```tsx
function TimePickerWithTimezone() {
  const [time, setTime] = useState<Date | undefined>()
  const userTimezone = 'Asia/Bangkok' // Set programmatically based on user location

  const handleTimeChange = (newTime: Date | undefined) => {
    setTime(newTime)
    
    // Send to backend with timezone
    if (newTime) {
      const payload = {
        time: newTime.toISOString(),
        timezone: userTimezone
      }
      // api.post('/schedule', payload)
    }
  }

  return (
    <TimePicker
      time={time}
      onTimeChange={handleTimeChange}
      timezone={userTimezone}
      showTimezone={true} // Display timezone label
    />
  )
}
```

### Clock Face View

```tsx
function ClockFaceTimePicker() {
  const [time, setTime] = useState<Date | undefined>()

  return (
    <TimePicker
      time={time}
      onTimeChange={setTime}
      showClockFace={true}
    />
  )
}
```

### Meeting Scheduler

```tsx
function MeetingScheduler() {
  const [startTime, setStartTime] = useState<Date | undefined>()
  const [endTime, setEndTime] = useState<Date | undefined>()

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Start Time</label>
        <TimePicker
          time={startTime}
          onTimeChange={setStartTime}
          format="12h"
          minuteStep={15}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">End Time</label>
        <TimePicker
          time={endTime}
          onTimeChange={setEndTime}
          format="12h"
          minuteStep={15}
        />
      </div>
    </div>
  )
}
```

## Timezone Handling

The `timezone` prop is designed for backend integration, not UI selection. Here's how to use it properly:

### Get User's Timezone

```tsx
// Get user's browser timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
// Example: "America/New_York", "Asia/Bangkok", etc.

<TimePicker
  time={time}
  onTimeChange={setTime}
  timezone={userTimezone}
  showTimezone={true}
/>
```

### Set Timezone in Code

```tsx
function InternationalTimePicker() {
  const [time, setTime] = useState<Date | undefined>()
  
  // Set timezone based on your app logic
  const meetingTimezone = 'Asia/Bangkok'
  
  const handleSubmit = () => {
    if (time) {
      // Send to backend
      const data = {
        time: time.toISOString(),
        timezone: meetingTimezone,
        // Backend will handle timezone conversion
      }
      console.log(data)
    }
  }

  return (
    <div>
      <TimePicker
        time={time}
        onTimeChange={setTime}
        timezone={meetingTimezone}
        showTimezone={true}
      />
      <button onClick={handleSubmit}>Schedule Meeting</button>
    </div>
  )
}
```

## Form Integration

### React Hook Form

```tsx
import { TimePicker } from '@ttianqii/takaui'
import { useForm, Controller } from 'react-hook-form'

type FormData = {
  appointmentTime: Date
}

function TimeForm() {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log('Selected time:', data.appointmentTime)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="appointmentTime"
        control={control}
        render={({ field }) => (
          <TimePicker
            time={field.value}
            onTimeChange={field.onChange}
            format="12h"
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
function ValidatedTimePicker() {
  const [time, setTime] = useState<Date | undefined>()
  const [error, setError] = useState('')

  const handleTimeChange = (newTime: Date | undefined) => {
    setTime(newTime)
    
    if (!newTime) {
      setError('Time is required')
      return
    }

    // Validate business hours (9 AM - 5 PM)
    const hours = newTime.getHours()
    if (hours < 9 || hours >= 17) {
      setError('Please select a time during business hours (9 AM - 5 PM)')
    } else {
      setError('')
    }
  }

  return (
    <div>
      <TimePicker
        time={time}
        onTimeChange={handleTimeChange}
        format="12h"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
```

## Customization

### Styling

```tsx
<TimePicker
  time={time}
  onTimeChange={setTime}
  className="w-full"
  variant="outline"
  size="lg"
/>
```

### Custom Time Display

The time picker displays a large digital clock face with scrollable columns for selecting hours, minutes, and optionally seconds.

## Features

- ✅ **12h/24h formats** - Switch between formats
- ✅ **Scrollable columns** - Smooth scrolling hour/minute/second selection
- ✅ **Large digital display** - Easy-to-read time display
- ✅ **AM/PM toggle** - Buttons for 12-hour format
- ✅ **Minute steps** - 1, 5, 10, 15, or 30-minute increments
- ✅ **Seconds support** - Optional seconds column
- ✅ **Analog clock** - Optional clock face view
- ✅ **Timezone support** - For backend integration
- ✅ **Now button** - Quick select current time
- ✅ **Keyboard navigation** - Full keyboard support

## TypeScript

### Type Definitions

```tsx
import type { TimePickerProps } from '@ttianqii/takaui'

const MyTimePicker: React.FC<TimePickerProps> = (props) => {
  return <TimePicker {...props} />
}
```

## Accessibility

The TimePicker component is fully accessible:

- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Screen reader support
- ✅ Focus management
- ✅ Scrollable with keyboard

## Related Components

- [DatePicker](./DATEPICKER.md) - Date selection component
- [Calendar](./CALENDAR.md) - Calendar component
- [Schedule](./SCHEDULE.md) - Schedule component with time slots
