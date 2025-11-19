# Holiday Feature Guide

## Overview
The DatePicker and Calendar components now support displaying national holidays with customizable styling. Holidays are displayed in red color to make them easily distinguishable from regular dates.

## Features
- ✅ Holiday display with red text color
- ✅ Red background on hover for holidays
- ✅ Customizable holiday data per country
- ✅ Works with both DatePicker and Calendar components
- ✅ Compatible with single date and range picker modes
- ✅ Example implementation with Thai national holidays for 2025

## Holiday Interface

```typescript
export interface Holiday {
  date: Date
  name: string
  country?: string
}
```

## Usage

### 1. Define Your Holidays

```typescript
import { Holiday } from './components/DatePicker'

const thaiHolidays: Holiday[] = [
  { date: new Date(2025, 0, 1), name: 'New Year\'s Day', country: 'TH' },
  { date: new Date(2025, 1, 12), name: 'Makha Bucha Day', country: 'TH' },
  { date: new Date(2025, 3, 6), name: 'Chakri Memorial Day', country: 'TH' },
  // ... more holidays
]
```

### 2. DatePicker with Holidays

#### Single Date Picker
```tsx
<DatePicker
  date={date}
  onDateChange={setDate}
  holidays={thaiHolidays}
  placeholder="Pick a date"
/>
```

#### Range Picker
```tsx
<DatePicker
  mode="range"
  dateRange={dateRange}
  onDateRangeChange={setDateRange}
  numberOfMonths={2}
  holidays={thaiHolidays}
  placeholder="Pick a date range"
/>
```

### 3. Calendar with Holidays

```tsx
<Calendar
  selected={selectedDate}
  onSelect={setSelectedDate}
  events={events}
  holidays={thaiHolidays}
/>
```

## Styling

Holidays are styled with:
- **Text Color**: `text-red-600` - Red text for visibility
- **Font Weight**: `font-medium` - Medium weight for emphasis
- **Hover Effect**: `hover:bg-red-50` - Light red background on hover

## Thai Holidays 2025 (Included)

The example implementation includes all major Thai national holidays for 2025:

| Date | Holiday |
|------|---------|
| Jan 1 | New Year's Day |
| Feb 12 | Makha Bucha Day |
| Apr 6 | Chakri Memorial Day |
| Apr 13-15 | Songkran Festival |
| May 1 | Labour Day |
| May 5 | Coronation Day |
| May 11 | Visakha Bucha Day |
| Jun 3 | Queen Suthida's Birthday |
| Jul 28 | King Vajiralongkorn's Birthday |
| Jul 29 | Asanha Bucha Day |
| Aug 12 | Queen Sirikit's Birthday |
| Oct 13 | King Bhumibol Memorial Day |
| Oct 23 | Chulalongkorn Day |
| Dec 5 | King Bhumibol's Birthday |
| Dec 10 | Constitution Day |
| Dec 31 | New Year's Eve |

## Adding Other Countries

You can easily add holidays for other countries:

```typescript
const usHolidays: Holiday[] = [
  { date: new Date(2025, 0, 1), name: 'New Year\'s Day', country: 'US' },
  { date: new Date(2025, 0, 20), name: 'Martin Luther King Jr. Day', country: 'US' },
  { date: new Date(2025, 6, 4), name: 'Independence Day', country: 'US' },
  { date: new Date(2025, 10, 27), name: 'Thanksgiving Day', country: 'US' },
  { date: new Date(2025, 11, 25), name: 'Christmas Day', country: 'US' },
]

const ukHolidays: Holiday[] = [
  { date: new Date(2025, 0, 1), name: 'New Year\'s Day', country: 'UK' },
  { date: new Date(2025, 3, 18), name: 'Good Friday', country: 'UK' },
  { date: new Date(2025, 3, 21), name: 'Easter Monday', country: 'UK' },
  { date: new Date(2025, 4, 5), name: 'Early May Bank Holiday', country: 'UK' },
  { date: new Date(2025, 11, 25), name: 'Christmas Day', country: 'UK' },
]
```

## Multi-Country Support

You can combine holidays from multiple countries:

```typescript
const allHolidays: Holiday[] = [
  ...thaiHolidays,
  ...usHolidays,
  ...ukHolidays,
]

// Or filter by country
const getHolidaysByCountry = (holidays: Holiday[], country: string) => {
  return holidays.filter(h => h.country === country)
}

<DatePicker
  holidays={getHolidaysByCountry(allHolidays, 'TH')}
  // ...
/>
```

## Implementation Details

### DatePicker Component
- Added `Holiday` interface export
- Added `holidays` prop to `DatePickerProps`
- Added `isHoliday()` helper function to check if a date is a holiday
- Updated calendar grid rendering to apply red styling to holidays
- Works with both single and 2-month views

### Calendar Component
- Imported `Holiday` type from DatePicker
- Added `holidays` prop to `CalendarProps`
- Added `isHoliday()` helper function
- Updated day rendering to style holidays in red

## Notes

- Holidays use `isSameDay()` comparison to match dates
- Holiday styling takes precedence over regular day styling but not selected/today
- When a holiday is selected, it uses the selection styling (bg-gray-900)
- Holidays work seamlessly with range selection mode
- The `country` field in Holiday interface is optional and can be used for filtering

## Future Enhancements

Potential additions:
- Import holidays from external APIs
- Different colors for different holiday types
- Holiday tooltips showing the holiday name
- Filter to show/hide specific country holidays
- Load holidays from JSON files
- Support for recurring holidays (e.g., "first Monday of May")
