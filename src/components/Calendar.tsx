import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import type { Holiday } from "./DatePicker"

export interface CalendarEvent {
  date: Date
  title: string
  type?: string
  time?: string
  id?: string
  location?: string
}

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  events?: CalendarEvent[]
  holidays?: Holiday[]
  className?: string
}

// Utility functions for date manipulation
const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

const eachDayOfInterval = (start: Date, end: Date): Date[] => {
  const days: Date[] = []
  const current = new Date(start)
  while (current <= end) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return days
}

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() && 
         date1.getMonth() === date2.getMonth() && 
         date1.getFullYear() === date2.getFullYear()
}

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return isSameDay(date, tomorrow)
}

const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

const formatDate = (date: Date, format: string): string => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const monthNamesShort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  
  if (format === "MMMM yyyy") {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }
  if (format === "MMM d, yyyy") {
    return `${monthNamesShort[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
  if (format === "d") {
    return date.getDate().toString()
  }
  return date.toLocaleDateString()
}

export function Calendar({
  selected,
  onSelect,
  events = [],
  holidays = [],
  className,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [view, setView] = React.useState<'calendar' | 'months' | 'years'>('calendar')

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval(monthStart, monthEnd)

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const currentYear = currentMonth.getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  const previousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
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
    const newDate = new Date(currentMonth)
    newDate.setMonth(monthIndex)
    setCurrentMonth(newDate)
    setView('calendar')
  }

  const selectYear = (year: number) => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)
    setView('calendar')
  }

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day))
  }

  const isHoliday = (checkDate: Date) => {
    return holidays.some(h => isSameDay(h.date, checkDate))
  }

  // Month picker view
  if (view === 'months') {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 w-full", className)} {...props}>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
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
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <Button
                key={month}
                variant="ghost"
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
        </div>
      </div>
    )
  }

  // Year picker view
  if (view === 'years') {
    return (
      <div className={cn("bg-white rounded-lg border border-gray-200 w-full", className)} {...props}>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
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
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {years.map((year) => (
              <Button
                key={year}
                variant="ghost"
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
        </div>
      </div>
    )
  }

  // Default calendar view
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 w-full", className)} {...props}>
      {/* Month/Year Navigation */}
      <div className="px-6 py-4 border-b border-gray-100">
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
            onClick={() => setView('months')}
            className="h-9 px-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 rounded"
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
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={index} className="h-10 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-400 uppercase">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-12" />
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isSelectedDay = selected && isSameDay(day, selected)
            const isTodayDay = isToday(day)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const isHolidayDay = isHoliday(day)

            return (
              <div key={day.toISOString()} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-12 w-full p-0 text-sm relative rounded transition-all duration-200",
                    !isCurrentMonth && "text-gray-300",
                    isCurrentMonth && !isSelectedDay && !isTodayDay && !isHolidayDay && "text-gray-700 hover:bg-gray-50",
                    isHolidayDay && !isSelectedDay && "text-red-600 font-medium hover:bg-red-50",
                    isTodayDay && !isSelectedDay && "bg-gray-100 text-gray-900 font-medium border border-gray-200",
                    isSelectedDay && "bg-gray-900 text-white font-medium shadow-sm",
                  )}
                  onClick={() => onSelect?.(day)}
                >
                  {formatDate(day, "d")}
                  
                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                      {dayEvents.slice(0, 3).map((event, idx) => {
                        const getEventColor = (type?: string) => {
                          if (isSelectedDay) return "bg-white/80"
                          switch (type) {
                            case "class": return "bg-blue-500"
                            case "meeting": return "bg-green-500"
                            case "appointment": return "bg-orange-500"
                            case "deadline": return "bg-red-500"
                            default: return "bg-gray-500"
                          }
                        }
                        
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "w-1 h-1 rounded-full",
                              getEventColor(event.type)
                            )}
                          />
                        )
                      })}
                      {dayEvents.length > 3 && (
                        <div className={cn(
                          "w-1 h-1 rounded-full",
                          isSelectedDay ? "bg-white/60" : "bg-gray-400"
                        )} />
                      )}
                    </div>
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Events Section */}
      {selected && (
        <div className="border-t border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-900">
                {isToday(selected) 
                  ? "Today"
                  : isTomorrow(selected) 
                  ? "Tomorrow"
                  : formatDate(selected, "MMM d, yyyy")
                }
              </h4>
            </div>
            
            {(() => {
              const dayEvents = events.filter(event => isSameDay(event.date, selected))
              
              return (
                <div className="space-y-3">
                  {dayEvents.length > 0 && dayEvents.map((event) => {
                    const getEventTypeStyles = (type?: string) => {
                      switch (type) {
                        case "class": return { bg: "bg-blue-50", border: "border-blue-100", dot: "bg-blue-500", text: "text-blue-900", subtext: "text-blue-600" }
                        case "meeting": return { bg: "bg-green-50", border: "border-green-100", dot: "bg-green-500", text: "text-green-900", subtext: "text-green-600" }
                        case "appointment": return { bg: "bg-orange-50", border: "border-orange-100", dot: "bg-orange-500", text: "text-orange-900", subtext: "text-orange-600" }
                        case "deadline": return { bg: "bg-red-50", border: "border-red-100", dot: "bg-red-500", text: "text-red-900", subtext: "text-red-600" }
                        default: return { bg: "bg-gray-50", border: "border-gray-100", dot: "bg-gray-500", text: "text-gray-900", subtext: "text-gray-600" }
                      }
                    }
                    
                    const styles = getEventTypeStyles(event.type)
                    
                    return (
                      <div key={event.id || event.title} className={`flex items-center space-x-3 p-3 ${styles.bg} rounded border ${styles.border} hover:shadow-sm transition-shadow cursor-pointer`}>
                        <div className={`w-2 h-2 rounded-full ${styles.dot} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${styles.text} truncate`}>{event.title}</p>
                          {(event.time || event.location) && (
                            <p className={`text-xs ${styles.subtext} truncate`}>
                              {event.time}
                              {event.time && event.location && ' • '}
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  
                  {dayEvents.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">No events scheduled</p>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Footer with today button */}
      {!isSameMonth(currentMonth, new Date()) && (
        <div className="p-6 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const today = new Date()
              setCurrentMonth(today)
              onSelect?.(today)
              setView('calendar')
            }}
            className="w-full h-10 text-sm font-medium border-gray-200 hover:bg-gray-50 rounded"
          >
            Today
          </Button>
        </div>
      )}
    </div>
  )
}
