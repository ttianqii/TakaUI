import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker, type DayPickerProps } from "react-day-picker"
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
  /** Month/year selection mode */
  captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label"
  /** Show outside days */
  showOutsideDays?: boolean
  /** Number of months to display */
  numberOfMonths?: number
  /** Additional DayPicker props */
  dayPickerProps?: Partial<DayPickerProps>
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
  captionLayout = "label",
  showOutsideDays = true,
  numberOfMonths = 1,
  dayPickerProps,
  fullWidth = false,
  customTrigger,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate)
    setOpen(false)
  }

  const disabled_dates = React.useMemo(() => {
    const dates: Date[] = [...(disabledDates || [])]

    return (date: Date) => {
      // Check if date is in disabled dates array
      if (dates.some(d => d.toDateString() === date.toDateString())) {
        return true
      }

      // Check min/max dates
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true

      // Check custom disabled function
      if (isDateDisabled?.(date)) return true

      return false
    }
  }, [disabledDates, minDate, maxDate, isDateDisabled])

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
      <PopoverContent className="w-auto p-0" align={align}>
        <DayPicker
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled_dates}
          captionLayout={captionLayout}
          showOutsideDays={showOutsideDays}
          numberOfMonths={numberOfMonths}
          className={cn("p-3")}
          classNames={{
            months: "flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 sm:gap-y-0",
            month: "space-y-3",
            caption: "flex justify-center pt-1 relative items-center mb-2",
            caption_label: "text-sm font-medium",
            caption_dropdowns: "flex justify-center gap-1",
            nav: "flex items-center justify-between w-full",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-30 border border-gray-300"
            ),
            nav_button_previous: "order-first",
            nav_button_next: "order-last",
            table: "w-full border-collapse",
            head_row: "flex justify-between w-full mb-1",
            head_cell: "text-gray-500 rounded-md w-9 h-9 font-normal text-xs flex items-center justify-center",
            row: "flex justify-between w-full mt-0.5",
            cell: cn(
              "relative text-center text-sm w-9 h-9 p-0"
            ),
            day: cn(
              "h-9 w-9 p-0 font-normal rounded-md hover:bg-gray-100 aria-selected:opacity-100 inline-flex items-center justify-center text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            ),
            day_selected:
              "bg-gray-900 text-white hover:bg-gray-800 hover:text-white focus:bg-gray-900 focus:text-white",
            day_today: "bg-gray-100 text-gray-900 font-semibold",
            day_outside:
              "text-gray-400 opacity-40",
            day_disabled: "text-gray-300 opacity-40 cursor-not-allowed hover:bg-transparent",
            day_range_middle:
              "aria-selected:bg-gray-100 aria-selected:text-gray-900",
            day_hidden: "invisible",
            dropdown: cn(
              "h-7 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-50 focus:outline-none focus:border-gray-500"
            ),
            dropdown_month: "mr-1",
            dropdown_year: "",
            ...dayPickerProps?.classNames,
          }}
          {...dayPickerProps}
        />
      </PopoverContent>
    </Popover>
  )
}
