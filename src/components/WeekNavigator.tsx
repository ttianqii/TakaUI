import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const monthNames: string[] = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

export interface WeekNavigatorProps {
  onWeekChange?: (weekStart: Date) => void
  initialDate?: Date
  className?: string
  compact?: boolean
}

export function WeekNavigator({
  onWeekChange,
  initialDate = new Date(),
  className,
  compact = false
}: WeekNavigatorProps) {
  const [currentWeekStart, setCurrentWeekStart] = React.useState(initialDate)
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [showMonthGrid, setShowMonthGrid] = React.useState(false)
  const [showYearGrid, setShowYearGrid] = React.useState(false)
  const [calendarYear, setCalendarYear] = React.useState(initialDate.getFullYear())
  const [calendarMonth, setCalendarMonth] = React.useState(initialDate.getMonth())
  const [selectedWeekIndex, setSelectedWeekIndex] = React.useState(0)
  const calendarDropdownRef = React.useRef<HTMLDivElement>(null)
  const calendarButtonRef = React.useRef<HTMLDivElement>(null)

  // Calculate week dates from a start date
  const calculateWeekDates = (startDate: Date): Date[] => {
    const dates = []
    const start = new Date(startDate)
    const dayOfWeek = start.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    start.setDate(start.getDate() + diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  // Get weeks in a month
  const getWeeksInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7))
    const weeks = []
    const currentWeekStart = new Date(startDate)
    while (currentWeekStart <= lastDay || currentWeekStart.getMonth() === month) {
      const weekEnd = new Date(currentWeekStart)
      weekEnd.setDate(currentWeekStart.getDate() + 6)
      weeks.push({ start: new Date(currentWeekStart), end: new Date(weekEnd) })
      currentWeekStart.setDate(currentWeekStart.getDate() + 7)
      if (weeks.length > 6) break
    }
    return weeks
  }

  const formatWeekRange = (start: Date, end: Date) => {
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' })
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' })
    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()}-${end.getDate()}`
    } else {
      return `${startMonth} ${start.getDate()}-${endMonth} ${end.getDate()}`
    }
  }

  const currentWeekDates = calculateWeekDates(currentWeekStart)
  const yearOptions = Array.from({ length: 10 }, (_, i) => calendarYear - 5 + i)

  // Handle week navigation
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentWeekStart(newWeekStart)
    setCalendarYear(newWeekStart.getFullYear())
    setCalendarMonth(newWeekStart.getMonth())
    onWeekChange?.(newWeekStart)
  }

  const handleWeekSelectorClick = (week: { start: Date; end: Date }, index: number) => {
    setSelectedWeekIndex(index)
    setShowCalendar(false)
    setCurrentWeekStart(week.start)
    onWeekChange?.(week.start)
  }

  // Click outside handler for calendar dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarDropdownRef.current &&
        !calendarDropdownRef.current.contains(event.target as Node) &&
        calendarButtonRef.current &&
        !calendarButtonRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false)
        setShowMonthGrid(false)
        setShowYearGrid(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  // Update selected week index when currentWeekStart changes
  React.useEffect(() => {
    const weeks = getWeeksInMonth(calendarYear, calendarMonth)
    const currentWeekIndex = weeks.findIndex(week =>
      currentWeekStart >= week.start && currentWeekStart <= week.end
    )
    if (currentWeekIndex !== -1) {
      setSelectedWeekIndex(currentWeekIndex)
    }
  }, [currentWeekStart, calendarYear, calendarMonth])

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateWeek('prev')}
        className={cn(
          "rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50",
          compact ? "h-8 w-8 p-0" : "h-9 w-9 p-0"
        )}
      >
        <ChevronLeft className={cn(compact ? "h-3 w-3" : "h-4 w-4", "text-gray-600")} />
      </Button>

      {/* Month/Year/Week Selector Dropdown */}
      <div className="relative">
        <div
          ref={calendarButtonRef}
          className={cn(
            "flex items-center gap-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
            compact ? "px-2 py-1" : "px-3 py-2"
          )}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <Calendar className={cn(compact ? "h-3 w-3" : "h-4 w-4", "text-gray-500")} />
          <span className={cn(compact ? "text-xs" : "text-sm", "font-medium text-gray-700")}>
            {currentWeekDates.length >= 7 && currentWeekDates[0] && currentWeekDates[6] &&
              `${currentWeekDates[0].getDate()}-${currentWeekDates[6].getDate()} ${monthNames[currentWeekDates[0].getMonth()]} ${currentWeekDates[0].getFullYear()}`
            }
          </span>
          <ChevronRight className={cn(
            compact ? "h-2 w-2" : "h-3 w-3",
            "text-gray-400 transition-transform",
            showCalendar && "rotate-90"
          )} />
        </div>

        {showCalendar && (
          <div ref={calendarDropdownRef} className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80 sm:w-96">
            {/* Year and Month Selector at Top */}
            {!showMonthGrid && !showYearGrid && (
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newMonth = calendarMonth === 0 ? 11 : calendarMonth - 1
                    const newYear = calendarMonth === 0 ? calendarYear - 1 : calendarYear
                    setCalendarMonth(newMonth)
                    setCalendarYear(newYear)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <button
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={() => setShowMonthGrid(!showMonthGrid)}
                  >
                    {monthNames[calendarMonth]}
                  </button>
                  <button
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={() => setShowYearGrid(!showYearGrid)}
                  >
                    {calendarYear}
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newMonth = calendarMonth === 11 ? 0 : calendarMonth + 1
                    const newYear = calendarMonth === 11 ? calendarYear + 1 : calendarYear
                    setCalendarMonth(newMonth)
                    setCalendarYear(newYear)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Month Grid View */}
            {showMonthGrid ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMonthGrid(false)}
                    className="h-9 px-3 text-sm font-medium"
                  >
                    ← Back
                  </Button>
                  <span className="text-lg font-semibold">{calendarYear}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {monthNames.map((month, idx) => (
                    <button
                      key={month}
                      className={cn(
                        "h-11 w-full text-sm font-medium rounded-xl transition-all",
                        calendarMonth === idx
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                      onClick={() => {
                        setCalendarMonth(idx)
                        setShowMonthGrid(false)
                      }}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            ) : showYearGrid ? (
              <div className="p-6">
                <div className="flex items-center justify-start mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowYearGrid(false)}
                    className="h-9 px-3 text-sm font-medium"
                  >
                    ← Back
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                  {yearOptions.map((year) => (
                    <button
                      key={year}
                      className={cn(
                        "h-11 w-full text-sm font-medium rounded-xl transition-all",
                        calendarYear === year
                          ? "bg-blue-500 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                      onClick={() => {
                        setCalendarYear(year)
                        setShowYearGrid(false)
                        setShowMonthGrid(true)
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Week Selector View */
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {getWeeksInMonth(calendarYear, calendarMonth).map((week, index) => {
                  const isCurrentWeek = new Date() >= week.start && new Date() <= week.end
                  const isSelected = selectedWeekIndex === index
                  return (
                    <button
                      key={index}
                      className={cn(
                        "w-full p-3 text-left rounded-lg border transition-all",
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500"
                          : isCurrentWeek
                            ? "bg-white text-blue-600 border-blue-500"
                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"
                      )}
                      onClick={() => handleWeekSelectorClick(week, index)}
                    >
                      <div className="flex flex-col">
                        <div className={cn(
                          "font-medium text-sm",
                          isSelected ? "text-white" : "text-gray-800"
                        )}>
                          Week {index + 1}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isSelected ? "text-blue-100" : "text-gray-500"
                        )}>
                          {formatWeekRange(week.start, week.end)}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex gap-2 pt-3 border-t border-gray-100 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const today = new Date()
                  setCurrentWeekStart(today)
                  setShowCalendar(false)
                  setShowMonthGrid(false)
                  setShowYearGrid(false)
                  onWeekChange?.(today)
                }}
              >
                This Week
              </Button>
            </div>
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateWeek('next')}
        className={cn(
          "rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50",
          compact ? "h-8 w-8 p-0" : "h-9 w-9 p-0"
        )}
      >
        <ChevronRight className={cn(compact ? "h-3 w-3" : "h-4 w-4", "text-gray-600")} />
      </Button>
    </div>
  )
}

// Export utility functions for external use
export const weekNavigatorUtils = {
  calculateWeekDates: (startDate: Date): Date[] => {
    const dates = []
    const start = new Date(startDate)
    const dayOfWeek = start.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    start.setDate(start.getDate() + diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    return dates
  },

  formatDateDisplay: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  },

  getWeekNumber: (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  },

  getWeekOfMonth: (date: Date): number => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const offsetDate = date.getDate() + firstDayOfWeek - 1
    return Math.ceil(offsetDate / 7)
  }
}
