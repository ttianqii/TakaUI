import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addMonths, subMonths } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

export interface DatePickerProps {
  /** The selected date */
  date?: Date
  /** Callback when date changes */
  onDateChange?: (date: Date | undefined) => void
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
}

export function DatePicker({
  date,
  onDateChange,
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
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date())
  const [view, setView] = React.useState<'calendar' | 'months' | 'years'>('calendar')

  const handleSelect = (selectedDate: Date) => {
    onDateChange?.(selectedDate)
    setOpen(false)
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

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const formatDate = (date: Date, formatStr: string) => {
    return format(date, formatStr)
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
        !date && "text-gray-500",
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
    >
      {showIcon && (icon || <CalendarIcon className="mr-2 h-4 w-4" />)}
      {date ? format(date, dateFormat) : <span>{placeholder}</span>}
    </Button>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-gray-200" align={align} sideOffset={4} avoidCollisions={true} collisionPadding={8}>
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

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView('months')}
                className="h-9 px-4 font-semibold text-lg hover:bg-gray-50"
              >
                {formatDate(currentMonth, "MMMM yyyy")}
              </Button>

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
              <>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {dayNames.map((day, index) => (
                <div key={index} className="h-8 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-400 uppercase">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="h-10" />
              ))}
              {days.map((day) => {
                const isSelectedDay = date && isSameDay(day, date)
                const isTodayDay = isToday(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isDisabled = isDateDisabledCheck(day)

                return (
                  <div key={day.toISOString()} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isDisabled || disabled}
                      className={cn(
                        "h-10 w-full p-0 text-sm relative rounded transition-all duration-200",
                        !isCurrentMonth && "text-gray-300",
                        isCurrentMonth && !isSelectedDay && !isTodayDay && "text-gray-700 hover:bg-gray-50",
                        isTodayDay && !isSelectedDay && "bg-gray-100 text-gray-900 font-medium border border-gray-200",
                        isSelectedDay && "bg-gray-900 text-white font-medium shadow-sm",
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
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
