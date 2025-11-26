import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
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
    // Check if date is in disabled dates array
    if (disabledDates?.some(d => d.toDateString() === checkDate.toDateString())) {
      return true
    }

    // Check min/max dates
    if (minDate && checkDate < minDate) return true
    if (maxDate && checkDate > maxDate) return true

    // Check custom disabled function
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

  // Next month data
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
    // Show hover preview when selecting range
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

  const triggerContent = customTrigger || (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "justify-start text-left font-normal",
        !date && !rangeStart && "text-gray-500",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
    >
      {showIcon && (icon || <CalendarIcon className="mr-2 h-4 w-4" />)}
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent className={cn("p-0 border-gray-200", numberOfMonths === 2 ? "w-[640px]" : "w-[320px]")} align={align} side="bottom" sideOffset={4} collisionPadding={8}>
        <div className="bg-white rounded-lg">
          {/* Calendar Header */}
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={previousMonth}
                className="h-9 w-9 p-0 border-gray-200 rounded"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {numberOfMonths === 2 ? (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    className="h-9 px-3 font-semibold text-base hover:bg-gray-50"
                  >
                    {formatDate(currentMonth, "MMMM")}
                  </Button>
                  <span className="text-gray-400 text-sm">-</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    className="h-9 px-3 font-semibold text-base hover:bg-gray-50"
                  >
                    {formatDate(nextMonthDate, "MMMM yyyy")}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView('months')}
                  className="h-9 px-4 font-semibold text-lg hover:bg-gray-50"
                >
                  {formatDate(currentMonth, "MMMM yyyy")}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={nextMonth}
                className="h-9 w-9 p-0 border-gray-200 rounded"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Body */}
          <div className="p-6">
            {view === 'years' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('months')}
                    className="h-9 px-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
                  >
                    ← Back
                  </Button>
                  <h3 className="text-lg font-semibold text-gray-900">Select Year</h3>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant="ghost"
                      size="sm"
                      onClick={() => selectYear(year)}
                      className={cn(
                        "h-11 w-full text-sm font-medium rounded transition-all duration-200",
                        year === currentYear
                          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {view === 'months' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView('calendar')}
                    className="h-9 px-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
                  >
                    ← Back
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousYear}
                      className="h-9 w-9 p-0 border-gray-200 rounded"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => setView('years')}
                      className="h-9 px-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 rounded"
                    >
                      {currentYear}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextYear}
                      className="h-9 w-9 p-0 border-gray-200 rounded"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {monthNames.map((month, index) => (
                    <Button
                      key={month}
                      variant="ghost"
                      size="sm"
                      onClick={() => selectMonth(index)}
                      className={cn(
                        "h-11 w-full text-sm font-medium rounded transition-all duration-200",
                        index === currentMonth.getMonth()
                          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {view === 'calendar' && (
              <div className={cn("flex", numberOfMonths === 2 && "gap-6")}>
                {/* Current Month */}
                <div className="flex-1">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day, index) => (
                      <div key={index} className="h-8 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-400 uppercase">
                          {day}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7">
                    {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-10" />
                    ))}
                    {days.map((day) => {
                      const isSelectedDay = mode === 'single' ? (date && isSameDay(day, date)) : (isRangeStart(day) || isRangeEnd(day))
                      const isTodayDay = isToday(day)
                      const isCurrentMonth = isSameMonth(day, currentMonth)
                      const isDisabled = isDateDisabledCheck(day)
                      const inRange = mode === 'range' && isInRange(day)
                      const isHolidayDay = isHoliday(day)
                      const dayOfWeek = day.getDay() // 0 = Sunday, 6 = Saturday
                      const isRangeStartDay = isRangeStart(day)
                      const isRangeEndDay = isRangeEnd(day)

                      return (
                        <div 
                          key={day.toISOString()} 
                          className={cn(
                            "relative p-0.5",
                            inRange && "bg-gray-100",
                            inRange && dayOfWeek === 0 && "rounded-l", // Sunday - left rounded
                            inRange && dayOfWeek === 6 && "rounded-r", // Saturday - right rounded
                            inRange && isRangeStartDay && "rounded-l", // Range start - left rounded
                            inRange && isRangeEndDay && "rounded-r"    // Range end - right rounded
                          )}
                          onMouseEnter={() => mode === 'range' && rangeStart && !rangeEnd && setHoverDate(day)}
                          onMouseLeave={() => setHoverDate(undefined)}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isDisabled || disabled}
                            className={cn(
                              "h-10 w-full p-0 text-sm relative transition-all duration-200",
                              !isCurrentMonth && "text-gray-300",
                              isCurrentMonth && !isSelectedDay && !isTodayDay && !inRange && !isHolidayDay && "text-gray-700 hover:bg-gray-50 rounded",
                              isHolidayDay && !isSelectedDay && "text-red-600 font-medium hover:bg-red-50 rounded",
                              isTodayDay && !isSelectedDay && !inRange && "bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded",
                              isSelectedDay && "bg-gray-900 text-white font-medium shadow-sm z-10 rounded hover:bg-gray-500",
                              inRange && !isSelectedDay && "text-gray-900 hover:bg-gray-200",
                              isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent"
                            )}
                            onClick={() => !isDisabled && handleSelect(day)}
                          >
                            {formatDate(day, "d")}
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Next Month */}
                {numberOfMonths === 2 && (
                <div className="flex-1">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day, index) => (
                      <div key={index} className="h-8 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-400 uppercase">
                          {day}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7">
                    {Array.from({ length: nextMonthStart.getDay() }).map((_, index) => (
                      <div key={`next-empty-${index}`} className="h-10" />
                    ))}
                    {nextMonthDays.map((day) => {
                      const isSelectedDay = mode === 'single' ? (date && isSameDay(day, date)) : (isRangeStart(day) || isRangeEnd(day))
                      const isTodayDay = isToday(day)
                      const isCurrentMonth = isSameMonth(day, nextMonthDate)
                      const isDisabled = isDateDisabledCheck(day)
                      const inRange = mode === 'range' && isInRange(day)
                      const isHolidayDay = isHoliday(day)
                      const dayOfWeek = day.getDay() // 0 = Sunday, 6 = Saturday
                      const isRangeStartDay = isRangeStart(day)
                      const isRangeEndDay = isRangeEnd(day)

                      return (
                        <div 
                          key={day.toISOString()} 
                          className={cn(
                            "relative p-0.5",
                            inRange && "bg-gray-100",
                            inRange && dayOfWeek === 0 && "rounded-l", // Sunday - left rounded
                            inRange && dayOfWeek === 6 && "rounded-r", // Saturday - right rounded
                            inRange && isRangeStartDay && "rounded-l", // Range start - left rounded
                            inRange && isRangeEndDay && "rounded-r"    // Range end - right rounded
                          )}
                          onMouseEnter={() => mode === 'range' && rangeStart && !rangeEnd && setHoverDate(day)}
                          onMouseLeave={() => setHoverDate(undefined)}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isDisabled || disabled}
                            className={cn(
                              "h-10 w-full p-0 text-sm relative transition-all duration-200",
                              !isCurrentMonth && "text-gray-300",
                              isCurrentMonth && !isSelectedDay && !isTodayDay && !inRange && !isHolidayDay && "text-gray-700 hover:bg-gray-50 rounded",
                              isHolidayDay && !isSelectedDay && "text-red-600 font-medium hover:bg-red-50 rounded",
                              isTodayDay && !isSelectedDay && !inRange && "bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded",
                              isSelectedDay && "bg-gray-900 text-white font-medium shadow-sm z-10 rounded hover:bg-gray-500",
                              inRange && !isSelectedDay && "text-gray-900 hover:bg-gray-200",
                              isDisabled && "opacity-40 cursor-not-allowed hover:bg-transparent"
                            )}
                            onClick={() => !isDisabled && handleSelect(day)}
                          >
                            {formatDate(day, "d")}
                          </Button>
                        </div>
                      )
                    })}
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
