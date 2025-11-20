# Schedule Component

A weekly schedule component with customizable fields, recurrence support, and flexible time slot management.

## Import

```tsx
import { Schedule } from '@ttianqii/takaui'
import type { ScheduleEvent, CustomField } from '@ttianqii/takaui'
```

## Basic Usage

```tsx
import { Schedule } from '@ttianqii/takaui'
import { useState } from 'react'
import type { ScheduleEvent } from '@ttianqii/takaui'

function MySchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])

  const handleEventAdd = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
    }
    setEvents([...events, newEvent])
  }

  return (
    <Schedule
      events={events}
      onEventAdd={handleEventAdd}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `ScheduleEvent[]` | **required** | Array of schedule events |
| `onEventAdd` | `(event) => void` | - | Callback when event is added |
| `onEventUpdate` | `(event) => void` | - | Callback when event is updated |
| `onEventDelete` | `(eventId) => void` | - | Callback when event is deleted |
| `title` | `string` | `'Weekly Schedule'` | Schedule title |
| `subtitle` | `string` | - | Schedule subtitle |
| `className` | `string` | - | Additional CSS classes |
| `timeSlots` | `string[]` | `['08:00'...'16:00']` | Array of time slots |
| `daysOfWeek` | `string[]` | `['Monday'...'Friday']` | Days to display |
| `showAddButton` | `boolean` | `true` | Show add event button |
| `eventColors` | `{name, value}[]` | Default colors | Available event colors |
| `customFields` | `CustomField[]` | `[]` | Custom form fields |
| `showWeekNavigation` | `boolean` | `false` | Enable week navigation |
| `showHalfHourLines` | `boolean` | `true` | Show :30 separator lines |
| `showCurrentTimeIndicator` | `boolean` | `true` | Show current time line |
| `slotHeight` | `number` | `85` | Height per hour slot (px) |

## Event Type

```tsx
type ScheduleEvent = {
  id: string
  title: string
  day: string  // e.g., "Monday"
  startTime: string  // e.g., "09:00"
  endTime: string  // e.g., "10:30"
  color: string  // e.g., "bg-blue-500"
  description?: string
  recurrenceType?: 'none' | 'weekly' | 'monthly' | 'yearly'
  specificDate?: string  // For date-based events
  [key: string]: string | number | boolean | undefined  // Custom fields
}
```

## Examples

### Full CRUD Operations

```tsx
function InteractiveSchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])

  const handleAdd = (event: Omit<ScheduleEvent, 'id'>) => {
    setEvents([...events, { ...event, id: crypto.randomUUID() }])
  }

  const handleUpdate = (updatedEvent: ScheduleEvent) => {
    setEvents(events.map(e => 
      e.id === updatedEvent.id ? updatedEvent : e
    ))
  }

  const handleDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId))
  }

  return (
    <Schedule
      events={events}
      onEventAdd={handleAdd}
      onEventUpdate={handleUpdate}
      onEventDelete={handleDelete}
    />
  )
}
```

### Custom Time Slots

```tsx
<Schedule
  events={events}
  onEventAdd={handleAdd}
  timeSlots={[
    '06:00', '07:00', '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
  ]}
/>
```

### Custom Days

```tsx
<Schedule
  events={events}
  onEventAdd={handleAdd}
  daysOfWeek={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
/>
```

### With Custom Fields

```tsx
import type { CustomField } from '@ttianqii/takaui'

const customFields: CustomField[] = [
  {
    key: 'room',
    label: 'Room',
    type: 'select',
    options: [
      { label: 'Room A', value: 'room-a' },
      { label: 'Room B', value: 'room-b' },
    ],
    required: true,
    showInCard: true,
  },
  {
    key: 'instructor',
    label: 'Instructor',
    type: 'text',
    placeholder: 'Enter instructor name',
    showInCard: true,
  },
  {
    key: 'capacity',
    label: 'Max Capacity',
    type: 'number',
    placeholder: '0',
  },
]

function ClassSchedule() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])

  return (
    <Schedule
      title="Class Schedule"
      events={events}
      onEventAdd={handleAdd}
      customFields={customFields}
    />
  )
}
```

### With Week Navigation

```tsx
<Schedule
  events={events}
  onEventAdd={handleAdd}
  showWeekNavigation={true}
  title="My Calendar"
/>
```

### Custom Colors

```tsx
const customColors = [
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Purple', value: 'bg-purple-500' },
]

<Schedule
  events={events}
  onEventAdd={handleAdd}
  eventColors={customColors}
/>
```

### Read-Only Schedule

```tsx
<Schedule
  events={events}
  showAddButton={false}
  // No onEventAdd, onEventUpdate, onEventDelete
/>
```

## Custom Field Configuration

```tsx
type CustomField = {
  key: string  // Unique identifier
  label: string  // Display label
  type: 'text' | 'number' | 'select'  // Input type
  placeholder?: string  // Input placeholder
  options?: { label: string; value: string }[]  // For select type
  icon?: React.ReactNode  // Optional icon
  showInCard?: boolean  // Show in event card
  required?: boolean  // Required field
}
```

### Custom Field Examples

```tsx
const customFields: CustomField[] = [
  // Text field
  {
    key: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'Enter location',
    showInCard: true,
  },
  
  // Number field
  {
    key: 'participants',
    label: 'Participants',
    type: 'number',
    placeholder: '0',
  },
  
  // Select field
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Confirmed', value: 'confirmed' },
      { label: 'Pending', value: 'pending' },
      { label: 'Cancelled', value: 'cancelled' },
    ],
    required: true,
    showInCard: true,
  },
]
```

## Recurrence

Events support recurrence patterns:

```tsx
const recurringEvent = {
  title: 'Weekly Meeting',
  day: 'Monday',
  startTime: '10:00',
  endTime: '11:00',
  color: 'bg-blue-500',
  recurrenceType: 'weekly', // Repeats every week
}
```

Recurrence types:
- `'none'` - One-time event
- `'weekly'` - Repeats every week on the same day
- `'monthly'` - Repeats every month on the same date
- `'yearly'` - Repeats every year on the same date

## Features

- ✅ **Drag & Drop** - Visual time slot selection
- ✅ **CRUD Operations** - Add, edit, delete events
- ✅ **Custom Fields** - Extensible event metadata
- ✅ **Recurrence** - Weekly, monthly, yearly patterns
- ✅ **Week Navigation** - Browse different weeks
- ✅ **Time Indicators** - Current time line and half-hour marks
- ✅ **Responsive** - Mobile-friendly grid layout
- ✅ **Customizable** - Colors, slots, days, fields

## Customization

### Styling

```tsx
<Schedule
  events={events}
  onEventAdd={handleAdd}
  className="rounded-lg shadow-xl"
  slotHeight={100} // Taller slots
/>
```

### Custom Slot Height

```tsx
<Schedule
  events={events}
  onEventAdd={handleAdd}
  slotHeight={120} // Larger slots for more detail
/>
```

## Real-World Examples

### Course Schedule

```tsx
const courseFields: CustomField[] = [
  {
    key: 'courseCode',
    label: 'Course Code',
    type: 'text',
    required: true,
    showInCard: true,
  },
  {
    key: 'professor',
    label: 'Professor',
    type: 'text',
    showInCard: true,
  },
  {
    key: 'room',
    label: 'Room',
    type: 'select',
    options: [
      { label: 'Room 101', value: 'r101' },
      { label: 'Room 202', value: 'r202' },
    ],
    showInCard: true,
  },
]

<Schedule
  title="Fall 2024 Course Schedule"
  events={courses}
  onEventAdd={handleAdd}
  customFields={courseFields}
  timeSlots={['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']}
/>
```

### Meeting Scheduler

```tsx
const meetingFields: CustomField[] = [
  {
    key: 'attendees',
    label: 'Attendees',
    type: 'number',
    showInCard: true,
  },
  {
    key: 'meetingLink',
    label: 'Meeting Link',
    type: 'text',
  },
]

<Schedule
  title="Team Meetings"
  subtitle="Week of Jan 15-19"
  events={meetings}
  onEventAdd={handleAdd}
  customFields={meetingFields}
  showWeekNavigation={true}
/>
```

## TypeScript

```tsx
import type { ScheduleEvent, CustomField, ScheduleProps } from '@ttianqii/takaui'

// Extend ScheduleEvent for your use case
type CourseEvent = ScheduleEvent & {
  courseCode: string
  professor: string
  room: string
}
```

## Related Components

- [WeekNavigator](./WEEKNAVIGATOR.md) - Week navigation component
- [TimePicker](./TIMEPICKER.md) - Time selection
- [Calendar](./CALENDAR.md) - Date selection
