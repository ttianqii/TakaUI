import * as React from "react"
import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SimpleModal } from "./ui/modal"
import { cn } from "@/lib/utils"
import { WeekNavigator, weekNavigatorUtils } from "./WeekNavigator"

export interface ScheduleEvent {
  id: string
  title: string
  day: string
  startTime: string
  endTime: string
  color: string
  description?: string
  // Recurrence options
  recurrenceType?: 'none' | 'weekly' | 'monthly' | 'yearly'
  specificDate?: string // For monthly/yearly recurrence
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
  showHalfHourLines?: boolean // Show separator line at :30 mark
  showCurrentTimeIndicator?: boolean // Show red line for current time
  slotHeight?: number // Height in pixels for each hour slot (default 85)
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
  showHalfHourLines = true,
  showCurrentTimeIndicator = true,
  slotHeight = 85,
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
    recurrenceType: "none",
    specificDate: "",
    scheduleMode: "day", // "day" or "date"
  })

  // Week navigation state - simplified to just track current week
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const currentWeekDates = showWeekNavigation ? weekNavigatorUtils.calculateWeekDates(currentWeekStart) : []

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
        recurrenceType: event.recurrenceType || "none",
        specificDate: event.specificDate || "",
        scheduleMode: event.specificDate ? "date" : "day",
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
        recurrenceType: "none",
        specificDate: "",
        scheduleMode: "day",
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
    return duration * slotHeight - 8 // slotHeight px per hour, minus padding
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
                <WeekNavigator
                  onWeekChange={setCurrentWeekStart}
                  initialDate={currentWeekStart}
                />
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
              <div className={`grid border-b border-gray-200`} style={{ gridTemplateColumns: `80px repeat(${daysOfWeek.length}, 1fr)` }}>
                <div className="p-3 bg-gray-50 border-r border-gray-200">
                  <span className="text-xs font-medium text-gray-500">
                    {showWeekNavigation ? `Week ${weekNavigatorUtils.getWeekNumber(currentWeekStart)}` : 'Time'}
                  </span>
                </div>
                {daysOfWeek.map((day, index) => {
                  const today = new Date()
                  const dateForDay = showWeekNavigation && currentWeekDates[index]
                  const isToday = dateForDay && dateForDay.getDate() === today.getDate() && dateForDay.getMonth() === today.getMonth() && dateForDay.getFullYear() === today.getFullYear()

                  return (
                    <div key={day} className="p-4 text-center border-r border-gray-200 last:border-r-0 bg-gray-50 hover:bg-white/50 transition-colors">
                      <div className={`font-semibold text-sm ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>{day}</div>
                      {showWeekNavigation && dateForDay && (
                        <div className={`text-xs mt-1 font-medium ${isToday ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                          {weekNavigatorUtils.formatDateDisplay(dateForDay)}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Time Slots */}
              {timeSlots.map((time, timeIndex) => {
                // Calculate current time indicator position for this slot
                const now = new Date()
                const currentHour = now.getHours()
                const currentMinute = now.getMinutes()
                const [slotHour, slotMinuteRaw] = time.split(":")
                const slotMinute = parseInt(slotMinuteRaw || "0")
                const slotHourNum = parseInt(slotHour || "0")
                const slotStart = slotHourNum * 60 + slotMinute
                const slotEnd = slotStart + 60
                const nowMinutes = currentHour * 60 + currentMinute
                const isCurrentTimeSlot = nowMinutes >= slotStart && nowMinutes < slotEnd
                const elapsedMinutes = nowMinutes - slotStart
                const progressRatio = elapsedMinutes / 60
                const indicatorTop = progressRatio * slotHeight

                return (
                  <div key={time} className="grid border-b border-gray-100 last:border-b-0" style={{ gridTemplateColumns: `80px repeat(${daysOfWeek.length}, 1fr)` }}>
                    <div className="p-2 bg-gray-50/50 border-r border-gray-200">
                      <span className="text-xs text-gray-600">{time}</span>
                    </div>
                    {daysOfWeek.map((day, dayIndex) => {
                      const dayEvents = getEventsForSlot(day, time)
                      const today = new Date()
                      const dateForDay = showWeekNavigation && currentWeekDates[dayIndex]
                      const isToday = dateForDay ? 
                        dateForDay.getDate() === today.getDate() && 
                        dateForDay.getMonth() === today.getMonth() && 
                        dateForDay.getFullYear() === today.getFullYear() 
                        : false

                      return (
                        <div
                          key={`${day}-${time}`}
                          className="relative border-r border-gray-200 last:border-r-0 hover:bg-blue-50/30 cursor-pointer transition-colors"
                          style={{ minHeight: `${slotHeight}px` }}
                          onClick={() => !dayEvents.length && handleOpenModal(day, time)}
                        >
                          {/* Half-hour separator line */}
                          {showHalfHourLines && (
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200/60 z-[5]" />
                          )}

                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              className={cn(
                                "absolute inset-1 rounded-md p-2 text-white cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden",
                                event.color
                              )}
                              style={{ height: `${getEventHeight(event)}px`, zIndex: 10 }}
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

                          {/* Current Time Indicator */}
                          {showCurrentTimeIndicator && isToday && isCurrentTimeSlot && (
                            <div className="absolute left-0 right-0 flex items-center z-20" style={{ top: `${indicatorTop}px` }}>
                              <div className="h-[3px] bg-red-500 absolute left-0 right-0" />
                              <div className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap relative z-30">
                                {now.getHours().toString().padStart(2, '0')}:{now.getMinutes().toString().padStart(2, '0')}
                              </div>
                            </div>
                          )}

                          {!dayEvents.length && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Plus className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
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
          {/* Schedule Mode Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Schedule Type</Label>
            <Select
              value={formData.scheduleMode}
              onValueChange={(value) => setFormData({ ...formData, scheduleMode: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select schedule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">By Day (Monday, Tuesday, etc.)</SelectItem>
                <SelectItem value="date">By Date (Specific date)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              {formData.scheduleMode === "day"
                ? "Schedule by day of the week (e.g., every Monday)"
                : "Schedule by specific date (e.g., January 15, 2025)"}
            </p>
          </div>

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

          {/* Day/Date and Time Fields */}
          <div className="grid grid-cols-3 gap-4">
            {formData.scheduleMode === "day" ? (
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
            ) : (
              <div className="space-y-2">
                <Label htmlFor="specificDate">Date *</Label>
                <Input
                  id="specificDate"
                  type="date"
                  value={formData.specificDate}
                  onChange={(e) => setFormData({ ...formData, specificDate: e.target.value })}
                />
              </div>
            )}
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

          {/* Recurrence Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isRecurring"
              checked={formData.recurrenceType !== "none"}
              onChange={(e) => {
                if (e.target.checked) {
                  // Enable recurrence based on schedule mode
                  setFormData({
                    ...formData,
                    recurrenceType: formData.scheduleMode === "day" ? "weekly" : "monthly"
                  })
                } else {
                  // Disable recurrence
                  setFormData({ ...formData, recurrenceType: "none" })
                }
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <Label htmlFor="isRecurring" className="text-sm font-medium text-gray-700 cursor-pointer">
              {formData.scheduleMode === "day"
                ? "Repeat every week on this day"
                : "Repeat every month on this date"}
            </Label>
          </div>

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
