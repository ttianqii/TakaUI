# WeekNavigator Component

A week navigation component with date range display and navigation controls.

## Import

```tsx
import { WeekNavigator } from '@ttianqii/takaui'
```

## Basic Usage

```tsx
import { WeekNavigator } from '@ttianqii/takaui'
import { useState } from 'react'

function MyWeekNavigator() {
  const [weekStart, setWeekStart] = useState(new Date())

  return (
    <WeekNavigator
      currentWeekStart={weekStart}
      onWeekChange={setWeekStart}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentWeekStart` | `Date` | **required** | Start date of current week |
| `onWeekChange` | `(date: Date) => void` | **required** | Callback when week changes |
| `className` | `string` | - | Additional CSS classes |
| `showWeekNumber` | `boolean` | `false` | Show ISO week number |
| `weekStartsOn` | `0-6` | `0` (Sunday) | First day of week |

## Examples

### Basic Navigation

```tsx
function WeeklyView() {
  const [weekStart, setWeekStart] = useState(new Date())

  return (
    <div>
      <WeekNavigator
        currentWeekStart={weekStart}
        onWeekChange={setWeekStart}
      />
      <p>Week starting: {weekStart.toDateString()}</p>
    </div>
  )
}
```

### With Week Number

```tsx
<WeekNavigator
  currentWeekStart={weekStart}
  onWeekChange={setWeekStart}
  showWeekNumber={true}
/>
```

### Week Starts on Monday

```tsx
<WeekNavigator
  currentWeekStart={weekStart}
  onWeekChange={setWeekStart}
  weekStartsOn={1} // Monday
/>
```

### With Schedule Component

```tsx
import { WeekNavigator, Schedule } from '@ttianqii/takaui'

function WeeklySchedule() {
  const [weekStart, setWeekStart] = useState(new Date())
  const [events, setEvents] = useState([])

  return (
    <div className="space-y-4">
      <WeekNavigator
        currentWeekStart={weekStart}
        onWeekChange={setWeekStart}
      />
      <Schedule
        events={events}
        onEventAdd={handleAdd}
        showWeekNavigation={false} // Use external navigator
      />
    </div>
  )
}
```

### Custom Styling

```tsx
<WeekNavigator
  currentWeekStart={weekStart}
  onWeekChange={setWeekStart}
  className="bg-blue-50 rounded-lg p-4 shadow-md"
/>
```

## Features

- ✅ **Previous/Next Navigation** - Arrow buttons to navigate weeks
- ✅ **Current Week** - Button to jump to current week
- ✅ **Date Range Display** - Shows week date range
- ✅ **Week Number** - Optional ISO week number
- ✅ **Customizable** - First day of week configuration
- ✅ **Keyboard Support** - Arrow key navigation

## Utility Functions

The WeekNavigator uses utility functions available in `weekNavigatorUtils`:

```tsx
import { weekNavigatorUtils } from '@ttianqii/takaui'

// Calculate week dates
const dates = weekNavigatorUtils.calculateWeekDates(new Date())

// Get start of week
const startOfWeek = weekNavigatorUtils.getStartOfWeek(new Date())

// Get week number
const weekNumber = weekNavigatorUtils.getWeekNumber(new Date())
```

## Integration Examples

### With Data Filtering

```tsx
function FilteredWeekView() {
  const [weekStart, setWeekStart] = useState(new Date())
  const [allEvents, setAllEvents] = useState([])

  // Filter events for current week
  const weekEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)
    
    return eventDate >= weekStart && eventDate < weekEnd
  })

  return (
    <div>
      <WeekNavigator
        currentWeekStart={weekStart}
        onWeekChange={setWeekStart}
      />
      <div>
        {weekEvents.map(event => (
          <div key={event.id}>{event.title}</div>
        ))}
      </div>
    </div>
  )
}
```

### With API Calls

```tsx
function WeeklyDataView() {
  const [weekStart, setWeekStart] = useState(new Date())
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchWeekData = async () => {
      setLoading(true)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 7)

      const response = await fetch(`/api/data?start=${weekStart.toISOString()}&end=${weekEnd.toISOString()}`)
      const json = await response.json()
      setData(json)
      setLoading(false)
    }

    fetchWeekData()
  }, [weekStart])

  return (
    <div>
      <WeekNavigator
        currentWeekStart={weekStart}
        onWeekChange={setWeekStart}
      />
      {loading ? <p>Loading...</p> : <DataDisplay data={data} />}
    </div>
  )
}
```

## Customization

### Custom Date Format

```tsx
function CustomFormattedNavigator() {
  const [weekStart, setWeekStart] = useState(new Date())

  const formatWeekRange = (start: Date) => {
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  return (
    <div>
      <WeekNavigator
        currentWeekStart={weekStart}
        onWeekChange={setWeekStart}
      />
      <p>{formatWeekRange(weekStart)}</p>
    </div>
  )
}
```

## TypeScript

```tsx
import type { WeekNavigatorProps } from '@ttianqii/takaui'

const MyNavigator: React.FC<WeekNavigatorProps> = (props) => {
  return <WeekNavigator {...props} />
}
```

## Accessibility

The WeekNavigator component is fully accessible:

- ✅ Keyboard navigation (Arrow keys, Enter, Tab)
- ✅ ARIA labels
- ✅ Screen reader support
- ✅ Focus management

## Related Components

- [Schedule](./SCHEDULE.md) - Weekly schedule component
- [Calendar](./CALENDAR.md) - Calendar component
- [DatePicker](./DATEPICKER.md) - Date picker component
