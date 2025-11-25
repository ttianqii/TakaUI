import type { Column } from "@tanstack/react-table"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export interface SortableHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  align?: "left" | "center" | "right"
}

export function SortableHeader<TData, TValue>({
  column,
  title,
  align = "left",
  className,
}: SortableHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort()
  const sortDirection = column.getIsSorted()

  const alignmentClasses = {
    left: "",
    center: "text-center",
    right: "text-right",
  }

  const getSortIcon = () => {
    if (sortDirection === "asc") return <ChevronDown className="h-4 w-4" />
    if (sortDirection === "desc") return <ChevronUp className="h-4 w-4" />
    return <ChevronsUpDown className="h-4 w-4" />
  }

  if (!canSort) {
    return (
      <div className={cn("px-2 py-1", className)}>
        {title}
      </div>
    )
  }

  return (
    <div className={cn(alignmentClasses[align])}>
      <Button
        variant="ghost"
        className="h-auto px-2 py-1 font-normal hover:bg-transparent hover:text-gray-900"
        onClick={() => column.toggleSorting(sortDirection === "asc")}
      >
        {title}
        {getSortIcon()}
      </Button>
    </div>
  )
}
