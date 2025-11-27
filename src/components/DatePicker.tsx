import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { mergeStyles } from "@/lib/mergeStyles"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export interface Holiday {
  date: Date
  name: string
  country?: string
}

export interface DatePickerProps {
  /** The selected date */
  date?: Date
  /** Callback when date changes */
  onDateChange?: (date: Date | undefined) => void
  /** Mode: single date or range */
  mode?: 'single' | 'range'
  /** Selected date range (for range mode) */
  dateRange?: { from?: Date; to?: Date }
  /** Callback when date range changes (for range mode) */
  onDateRangeChange?: (range: { from?: Date; to?: Date } | undefined) => void
  /** Placeholder text when no date is selected */
  placeholder?: string
  /** Date format string (default: "PPP") */
  dateFormat?: string
  /** Disabled state */
  disabled?: boolean
  /** Custom className for the trigger button */
  className?: string
  /** Button variant */
  variant?: "default" | "outline" | "ghost"
  /** Button size */
  size?: "default" | "sm" | "lg"
  /** Alignment of the popover */
  align?: "start" | "center" | "end"
  /** Show icon in button */
  showIcon?: boolean
  /** Custom icon */
  icon?: React.ReactNode
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Array of disabled dates */
  disabledDates?: Date[]
  /** Function to determine if a date should be disabled */
  isDateDisabled?: (date: Date) => boolean
  /** Full width button */
  fullWidth?: boolean
  /** Custom trigger element */
  customTrigger?: React.ReactNode
  /** Number of months to display (1 or 2) */
  numberOfMonths?: 1 | 2
  /** Array of holidays to display */
  holidays?: Holiday[]
}

export function DatePicker({
  date,
  onDateChange,
  mode = 'single',
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  disabled = false,
  className,
  variant = "outline",
  size = "default",
  align = "start",
  showIcon = true,
  icon,
  minDate,
  maxDate,
  disabledDates,
  isDateDisabled,
  fullWidth = false,
  customTrigger,
  numberOfMonths = 1,
  holidays = [],
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date())
  const [view, setView] = React.useState<'calendar' | 'months' | 'years'>('calendar')
  const [rangeStart, setRangeStart] = React.useState<Date | undefined>(dateRange?.from)
  const [rangeEnd, setRangeEnd] = React.useState<Date | undefined>(dateRange?.to)
  const [hoverDate, setHoverDate] = React.useState<Date | undefined>()

  // Sync range state with prop changes
  React.useEffect(() => {
    setRangeStart(dateRange?.from)
    setRangeEnd(dateRange?.to)
  }, [dateRange])

  // Sync currentMonth with date prop and reset view when opening
  React.useEffect(() => {
    if (open) {
      setView('calendar')
      if (mode === 'single' && date) {
        setCurrentMonth(date)
      } else if (mode === 'range' && dateRange?.from) {
        setCurrentMonth(dateRange.from)
      }
    }
  }, [open, date, dateRange, mode])

  const handleSelect = (selectedDate: Date) => {
    if (mode === 'range') {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Start new range
        setRangeStart(selectedDate)
        setRangeEnd(undefined)
        onDateRangeChange?.({ from: selectedDate, to: undefined })
      } else {
        // Complete the range
        const from = rangeStart < selectedDate ? rangeStart : selectedDate
        const to = rangeStart < selectedDate ? selectedDate : rangeStart
        setRangeStart(from)
        setRangeEnd(to)
        onDateRangeChange?.({ from, to })
        setOpen(false)
      }
    } else {
      onDateChange?.(selectedDate)
      setOpen(false)
    }
  }

  const isDateDisabledCheck = (checkDate: Date) => {
    if (disabledDates?.some(d => d.toDateString() === checkDate.toDateString())) {
      return true
    }
    if (minDate && checkDate < minDate) return true
    if (maxDate && checkDate > maxDate) return true
    if (isDateDisabled?.(checkDate)) return true
    return false
  }

  const isHoliday = (checkDate: Date) => {
    return holidays.some(h => isSameDay(h.date, checkDate))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const nextMonthDate = addMonths(currentMonth, 1)
  const nextMonthStart = startOfMonth(nextMonthDate)
  const nextMonthEnd = endOfMonth(nextMonthDate)
  const nextMonthDays = eachDayOfInterval({ start: nextMonthStart, end: nextMonthEnd })

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const formatDate = (date: Date, formatStr: string) => {
    return format(date, formatStr)
  }

  const isInRange = (day: Date) => {
    if (rangeStart && rangeEnd) {
      return day >= rangeStart && day <= rangeEnd
    }
    if (rangeStart && !rangeEnd && hoverDate) {
      const start = rangeStart < hoverDate ? rangeStart : hoverDate
      const end = rangeStart < hoverDate ? hoverDate : rangeStart
      return day >= start && day <= end
    }
    return false
  }

  const isRangeStart = (day: Date) => {
    return rangeStart && isSameDay(day, rangeStart)
  }

  const isRangeEnd = (day: Date) => {
    return rangeEnd && isSameDay(day, rangeEnd)
  }

  const previousYear = () => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(currentYear - 1)
    setCurrentMonth(newDate)
  }

  const nextYear = () => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(currentYear + 1)
    setCurrentMonth(newDate)
  }

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentMonth.getFullYear(), monthIndex, 1)
    setCurrentMonth(newDate)
    setView('calendar')
  }

  const selectYear = (year: number) => {
    const newDate = new Date(year, currentMonth.getMonth(), 1)
    setCurrentMonth(newDate)
    setView('calendar')
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = currentMonth.getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  // Inline Styles
  const triggerButtonStyle: React.CSSProperties = mergeStyles(
    {
      justifyContent: 'flex-start',
      textAlign: 'left',
      fontWeight: 'normal',
    },
    !date && !rangeStart ? { color: '#6b7280' } : undefined,
    fullWidth ? { width: '100%' } : undefined
  )

  const iconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
    height: '1rem',
    width: '1rem',
  }

  const popoverContentStyle: React.CSSProperties = {
    padding: 0,
    borderColor: '#e5e7eb',
    width: numberOfMonths === 2 ? '640px' : '320px',
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
  }

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #f3f4f6',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  }

  const headerFlexStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const navButtonStyle: React.CSSProperties = {
    height: '2.25rem',
    width: '2.25rem',
    padding: 0,
  }

  const monthHeaderFlexStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  }

  const monthButtonStyle: React.CSSProperties = {
    height: '2.25rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
  }

  const monthButtonLargeStyle: React.CSSProperties = {
    height: '2.25rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    fontWeight: '600',
    fontSize: '1.125rem',
  }

  const separatorStyle: React.CSSProperties = {
    color: '#9ca3af',
    fontSize: '0.875rem',
  }

  const bodyStyle: React.CSSProperties = {
    padding: '1.5rem',
  }

  const backButtonStyle: React.CSSProperties = {
    height: '2.25rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
  }

  const viewTitleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
  }

  const yearGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.5rem',
    maxHeight: '16rem',
    overflowY: 'auto',
  }

  const monthGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
  }

  const yearControlFlexStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  }

  const yearButtonStyle: React.CSSProperties = {
    height: '2.25rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
  }

  const monthsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: numberOfMonths === 2 ? '1.5rem' : '0',
  }

  const monthContainerStyle: React.CSSProperties = {
    flex: 1,
  }

  const weekHeaderStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
    marginBottom: '0.5rem',
  }

  const weekDayStyle: React.CSSProperties = {
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const weekDayTextStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#9ca3af',
    textTransform: 'uppercase',
  }

  const daysGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
  }

  const emptyDayStyle: React.CSSProperties = {
    height: '2.5rem',
  }

  const triggerContent = customTrigger || (
    <Button
      variant={variant}
      size={size}
      style={triggerButtonStyle}
      className={className}
      disabled={disabled}
    >
      {showIcon && (icon || <CalendarIcon style={iconStyle} />)}
      {mode === 'range' ? (
        rangeStart && rangeEnd ? (
          <span>{format(rangeStart, dateFormat)} - {format(rangeEnd, dateFormat)}</span>
        ) : rangeStart ? (
          <span>{format(rangeStart, dateFormat)} - ...</span>
        ) : (
          <span>{placeholder}</span>
        )
      ) : (
        date ? format(date, dateFormat) : <span>{placeholder}</span>
      )}
    </Button>
  )

  const renderDayCell = (day: Date, isCurrentMonth: boolean) => {
    const isSelectedDay = mode === 'single' ? (date && isSameDay(day, date)) : (isRangeStart(day) || isRangeEnd(day))
    const isTodayDay = isToday(day)
    const isDisabled = isDateDisabledCheck(day)
    const inRange = mode === 'range' && isInRange(day)
    const isHolidayDay = isHoliday(day)
    const dayOfWeek = day.getDay()
    const isRangeStartDay = isRangeStart(day)
    const isRangeEndDay = isRangeEnd(day)

    const cellContainerStyle: React.CSSProperties = mergeStyles(
      { position: 'relative', padding: '0.125rem' },
      inRange ? { backgroundColor: '#f3f4f6' } : undefined,
      inRange && dayOfWeek === 0 ? { borderTopLeftRadius: '0.375rem', borderBottomLeftRadius: '0.375rem' } : undefined,
      inRange && dayOfWeek === 6 ? { borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' } : undefined,
      inRange && isRangeStartDay ? { borderTopLeftRadius: '0.375rem', borderBottomLeftRadius: '0.375rem' } : undefined,
      inRange && isRangeEndDay ? { borderTopRightRadius: '0.375rem', borderBottomRightRadius: '0.375rem' } : undefined
    )

    const dayCellButtonStyle: React.CSSProperties = mergeStyles(
      {
        height: '2.5rem',
        width: '100%',
        padding: 0,
        fontSize: '0.875rem',
        position: 'relative',
        transition: 'all 0.2s ease',
        borderRadius: '0.375rem',
      },
      !isCurrentMonth ? { color: '#d1d5db' } : undefined,
      isHolidayDay && !isSelectedDay ? {
        color: '#dc2626',
        fontWeight: '500',
      } : undefined,
      isTodayDay && !isSelectedDay && !inRange ? {
        backgroundColor: '#f9fafb',
        color: '#111827',
        fontWeight: '500',
        border: '1px solid #e5e7eb',
      } : undefined,
      isSelectedDay ? {
        backgroundColor: '#111827',
        color: '#ffffff',
        fontWeight: '500',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        zIndex: 10,
      } : undefined,
      inRange && !isSelectedDay ? {
        color: '#111827',
      } : undefined,
      isDisabled ? {
        opacity: 0.4,
        cursor: 'not-allowed',
      } : undefined
    )

    return (
      <div
        key={day.toISOString()}
        style={cellContainerStyle}
        onMouseEnter={() => mode === 'range' && rangeStart && !rangeEnd && setHoverDate(day)}
        onMouseLeave={() => setHoverDate(undefined)}
      >
        <Button
          variant="ghost"
          size="sm"
          disabled={isDisabled || disabled}
          style={dayCellButtonStyle}
          onClick={() => !isDisabled && handleSelect(day)}
        >
          {formatDate(day, "d")}
        </Button>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent style={popoverContentStyle} align={align} side="bottom" sideOffset={4} collisionPadding={8}>
        <div style={containerStyle} data-takaui="datepicker">
          {/* Calendar Header */}
          <div style={headerStyle}>
            <div style={headerFlexStyle}>
              <Button
                variant="outline"
                size="sm"
                onClick={previousMonth}
                style={navButtonStyle}
              >
                <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
              </Button>

              {numberOfMonths === 2 ? (
                <div style={monthHeaderFlexStyle}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    style={monthButtonStyle}
                  >
                    {formatDate(currentMonth, "MMMM")}
                  </Button>
                  <span style={separatorStyle}>-</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    style={monthButtonStyle}
                  >
                    {formatDate(nextMonthDate, "MMMM yyyy")}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView('months')}
                  style={monthButtonLargeStyle}
                >
                  {formatDate(currentMonth, "MMMM yyyy")}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={nextMonth}
                style={navButtonStyle}
              >
                <ChevronRight style={{ height: '1rem', width: '1rem' }} />
              </Button>
            </div>
          </div>

          {/* Calendar Body */}
          <div style={bodyStyle}>
            {view === 'years' && (
              <>
                <div style={headerFlexStyle}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    style={backButtonStyle}
                  >
                    ← Back
                  </Button>
                  <h3 style={viewTitleStyle}>Select Year</h3>
                </div>
                <div style={yearGridStyle}>
                  {years.map((year) => {
                    const yearButtonStyle: React.CSSProperties = mergeStyles(
                      {
                        height: '2.75rem',
                        width: '100%',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0.375rem',
                        transition: 'all 0.2s ease',
                      },
                      year === currentYear ? {
                        backgroundColor: '#111827',
                        color: '#ffffff',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                      } : {
                        color: '#4b5563',
                      }
                    )
                    
                    return (
                      <Button
                        key={year}
                        variant="ghost"
                        size="sm"
                        onClick={() => selectYear(year)}
                        style={yearButtonStyle}
                      >
                        {year}
                      </Button>
                    )
                  })}
                </div>
              </>
            )}

            {view === 'months' && (
              <>
                <div style={headerFlexStyle}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('calendar')}
                    style={backButtonStyle}
                  >
                    ← Back
                  </Button>
                  
                  <div style={yearControlFlexStyle}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousYear}
                      style={navButtonStyle}
                    >
                      <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => setView('years')}
                      style={yearButtonStyle}
                    >
                      {currentYear}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextYear}
                      style={navButtonStyle}
                    >
                      <ChevronRight style={{ height: '1rem', width: '1rem' }} />
                    </Button>
                  </div>
                </div>
                <div style={monthGridStyle}>
                  {monthNames.map((month, index) => {
                    const monthButtonSelStyle: React.CSSProperties = mergeStyles(
                      {
                        height: '2.75rem',
                        width: '100%',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0.375rem',
                        transition: 'all 0.2s ease',
                      },
                      index === currentMonth.getMonth() ? {
                        backgroundColor: '#111827',
                        color: '#ffffff',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                      } : {
                        color: '#4b5563',
                      }
                    )
                    
                    return (
                      <Button
                        key={month}
                        variant="ghost"
                        size="sm"
                        onClick={() => selectMonth(index)}
                        style={monthButtonSelStyle}
                      >
                        {month}
                      </Button>
                    )
                  })}
                </div>
              </>
            )}

            {view === 'calendar' && (
              <div style={monthsContainerStyle}>
                {/* Current Month */}
                <div style={monthContainerStyle}>
                  {/* Weekday headers */}
                  <div style={weekHeaderStyle}>
                    {dayNames.map((day, index) => (
                      <div key={index} style={weekDayStyle}>
                        <span style={weekDayTextStyle}>
                          {day}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div style={daysGridStyle}>
                    {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                      <div key={`empty-${index}`} style={emptyDayStyle} />
                    ))}
                    {days.map((day) => renderDayCell(day, isSameMonth(day, currentMonth)))}
                  </div>
                </div>

                {/* Next Month */}
                {numberOfMonths === 2 && (
                  <div style={monthContainerStyle}>
                    {/* Weekday headers */}
                    <div style={weekHeaderStyle}>
                      {dayNames.map((day, index) => (
                        <div key={index} style={weekDayStyle}>
                          <span style={weekDayTextStyle}>
                            {day}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid */}
                    <div style={daysGridStyle}>
                      {Array.from({ length: nextMonthStart.getDay() }).map((_, index) => (
                        <div key={`next-empty-${index}`} style={emptyDayStyle} />
                      ))}
                      {nextMonthDays.map((day) => renderDayCell(day, isSameMonth(day, nextMonthDate)))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
