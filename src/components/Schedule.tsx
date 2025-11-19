import * as React from "react"
import { Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users, Trash2, Edit, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SimpleModal } from "./ui/modal"
import { cn } from "@/lib/utils"

const monthNames: string[] = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

export interface ScheduleEvent {
  id: string
  title: string
  day: string
  startTime: string
  endTime: string
  color: string
  description?: string
  // Flexible metadata - can be anything
  [key: string]: any
}

export interface CustomField {
  key: string
  label: string
  type: "text" | "number" | "select"
  placeholder?: string
  options?: { label: string; value: string }[]
  icon?: React.ReactNode
  showInCard?: boolean
  required?: boolean
}

export interface ScheduleProps {
  title?: string
  subtitle?: string
  events: ScheduleEvent[]
  onEventAdd?: (event: Omit<ScheduleEvent, "id">) => void
  onEventUpdate?: (event: ScheduleEvent) => void
  onEventDelete?: (eventId: string) => void
  className?: string
  timeSlots?: string[]
  daysOfWeek?: string[]
  showAddButton?: boolean
  eventColors?: { name: string; value: string }[]
  customFields?: CustomField[]
  showWeekNavigation?: boolean
}

const defaultTimeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00"
]

const defaultDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const defaultColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-emerald-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Pink", value: "bg-pink-500" },
]

export function Schedule({
  title = "Weekly Schedule",
  subtitle,
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  className,
  timeSlots = defaultTimeSlots,
  daysOfWeek = defaultDays,
  showAddButton = true,
  eventColors = defaultColors,
  customFields = [],
  showWeekNavigation = false,
}: ScheduleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({
    title: "",
    day: "",
    startTime: "",
    endTime: "",
    color: "bg-blue-500",
    description: "",
  })

  // Week navigation state
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [showMonthGrid, setShowMonthGrid] = useState(false)
  const [showYearGrid, setShowYearGrid] = useState(false)
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0)
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
    let currentWeekStart = new Date(startDate)
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

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const currentWeekDates = showWeekNavigation ? calculateWeekDates(currentWeekStart) : []
  const yearOptions = Array.from({ length: 10 }, (_, i) => calendarYear - 5 + i)

  // Handle week navigation
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentWeekStart(newWeekStart)
    setCalendarYear(newWeekStart.getFullYear())
    setCalendarMonth(newWeekStart.getMonth())
  }

  const handleWeekSelectorClick = (week: { start: Date; end: Date }, index: number) => {
    setSelectedWeekIndex(index)
    setShowCalendar(false)
    setCurrentWeekStart(week.start)
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

  const handleOpenModal = (day?: string, time?: string, event?: ScheduleEvent) => {
    if (event) {
      setSelectedEvent(event)
      // Populate form with all event data including custom fields
      const data: Record<string, any> = {
        title: event.title,
        day: event.day,
        startTime: event.startTime,
        endTime: event.endTime,
        color: event.color,
        description: event.description || "",
      }
      // Add custom field values
      customFields.forEach(field => {
        data[field.key] = event[field.key] || (field.type === "number" ? 0 : "")
      })
      setFormData(data)
    } else {
      setSelectedEvent(null)
      // Initialize form with empty values
      const data: Record<string, any> = {
        title: "",
        day: day || "",
        startTime: time || "",
        endTime: "",
        color: "bg-blue-500",
        description: "",
      }
      // Initialize custom fields with default values
      customFields.forEach(field => {
        data[field.key] = field.type === "number" ? 0 : ""
      })
      setFormData(data)
    }
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.title || !formData.day || !formData.startTime || !formData.endTime) {
      return
    }

    const eventData = {
      ...formData,
      id: selectedEvent?.id || Date.now().toString(),
    }

    if (selectedEvent) {
      onEventUpdate?.(eventData as ScheduleEvent)
    } else {
      onEventAdd?.(formData)
    }

    setIsModalOpen(false)
  }

  const handleDelete = () => {
    if (selectedEvent) {
      onEventDelete?.(selectedEvent.id)
      setIsModalOpen(false)
    }
  }

  const getEventsForSlot = (day: string, time: string) => {
    return events.filter(event => {
      if (event.day !== day) return false
      const eventStart = parseInt(event.startTime.replace(":", ""))
      const slotTime = parseInt(time.replace(":", ""))
      return eventStart === slotTime
    })
  }

  const getEventHeight = (event: ScheduleEvent) => {
    const start = parseInt(event.startTime.replace(":", ""))
    const end = parseInt(event.endTime.replace(":", ""))
    const duration = (end - start) / 100
    return duration * 85 - 8 // 85px per hour, minus padding
  }

  return (
    <>
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {/* Week Navigation */}
              {showWeekNavigation && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek('prev')}
                    className="h-9 w-9 p-0 rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </Button>

                  {/* Month/Year/Week Selector Dropdown */}
                  <div className="relative">
                    <div
                      ref={calendarButtonRef}
                      className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {currentWeekDates.length >= 7 && currentWeekDates[0] && currentWeekDates[6] &&
                          `${currentWeekDates[0].getDate()}-${currentWeekDates[6].getDate()} ${monthNames[currentWeekDates[0].getMonth()]} ${currentWeekDates[0].getFullYear()}`
                        }
                      </span>
                      <ChevronRight className={`h-3 w-3 text-gray-400 transition-transform ${showCalendar ? 'rotate-90' : ''}`} />
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
                                  className={`h-11 w-full text-sm font-medium rounded-xl transition-all ${
                                    calendarMonth === idx
                                      ? 'bg-blue-500 text-white'
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
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
                                  className={`h-11 w-full text-sm font-medium rounded-xl transition-all ${
                                    calendarYear === year
                                      ? 'bg-blue-500 text-white'
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
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
                                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                                    isSelected
                                      ? 'bg-blue-500 text-white border-blue-500'
                                      : isCurrentWeek
                                        ? 'bg-white text-blue-600 border-blue-500'
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                                  }`}
                                  onClick={() => handleWeekSelectorClick(week, index)}
                                >
                                  <div className="flex flex-col">
                                    <div className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                                      Week {index + 1}
                                    </div>
                                    <div className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
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
                              setCurrentWeekStart(new Date())
                              setShowCalendar(false)
                              setShowMonthGrid(false)
                              setShowYearGrid(false)
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
                    className="h-9 w-9 p-0 rounded-lg border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              )}

              {showAddButton && (
                <Button onClick={() => handleOpenModal()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-gray-200">
                <div className="p-3 bg-gray-50 border-r border-gray-200">
                  <span className="text-xs font-medium text-gray-500">{showWeekNavigation ? `Week ${selectedWeekIndex + 1}` : 'Time'}</span>
                </div>
                {daysOfWeek.map((day, index) => {
                  const today = new Date()
                  const dateForDay = showWeekNavigation && currentWeekDates[index]
                  const isToday = dateForDay && dateForDay.getDate() === today.getDate() && dateForDay.getMonth() === today.getMonth() && dateForDay.getFullYear() === today.getFullYear()

                  return (
                    <div key={day} className="p-3 text-center border-r border-gray-200 last:border-r-0 bg-gray-50 hover:bg-white/50 transition-colors">
                      <div className={`font-semibold text-sm ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>{day}</div>
                      {showWeekNavigation && dateForDay && (
                        <div className={`text-xs mt-1 font-medium ${isToday ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                          {formatDateDisplay(dateForDay)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Time Slots */}
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-gray-100 last:border-b-0">
                  <div className="p-2 bg-gray-50/50 border-r border-gray-200">
                    <span className="text-xs text-gray-600">{time}</span>
                  </div>
                  {daysOfWeek.map(day => {
                    const dayEvents = getEventsForSlot(day, time)
                    return (
                      <div
                        key={`${day}-${time}`}
                        className="relative min-h-[85px] border-r border-gray-200 last:border-r-0 hover:bg-blue-50/30 cursor-pointer transition-colors"
                        onClick={() => !dayEvents.length && handleOpenModal(day, time)}
                      >
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={cn(
                              "absolute inset-1 rounded-md p-2 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden",
                              event.color
                            )}
                            style={{ height: `${getEventHeight(event)}px` }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenModal(undefined, undefined, event)
                            }}
                          >
                            <div className="text-xs font-semibold truncate">{event.title}</div>

                            {/* Display custom fields with showInCard: true */}
                            {customFields
                              .filter(field => field.showInCard && event[field.key])
                              .map(field => (
                                <div key={field.key} className="text-xs opacity-90 flex items-center gap-1 mt-1">
                                  {field.icon}
                                  <span className="truncate">{event[field.key]}</span>
                                </div>
                              ))}

                            <div className="text-xs opacity-80 mt-1">
                              <span>{event.startTime}-{event.endTime}</span>
                            </div>
                          </div>
                        ))}
                        {!dayEvents.length && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Plus className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Modal */}
      <SimpleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent ? "Edit Event" : "Add New Event"}
      >
        <div className="space-y-4 p-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Event title"
            />
          </div>

          {/* Day and Time Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Day *</Label>
              <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          {/* Custom Fields - Dynamic Rendering */}
          {customFields.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {customFields.map(field => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>
                    {field.label} {field.required && "*"}
                  </Label>
                  {field.type === "select" ? (
                    <Select
                      value={formData[field.key] || ""}
                      onValueChange={(value) => setFormData({ ...formData, [field.key]: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        [field.key]: field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value
                      })}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Color</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventColors.map(color => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-4 h-4 rounded", color.value)} />
                      {color.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>

          <div className="flex gap-2 pt-4">
            {selectedEvent && (
              <Button variant="destructive" onClick={handleDelete} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
            <div className="flex-1" />
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedEvent ? "Update" : "Add"} Event
            </Button>
          </div>
        </div>
      </SimpleModal>
    </>
  )
}

// Import useState at top
const { useState } = React
