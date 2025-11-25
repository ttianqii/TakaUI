import * as React from "react"
import { cn } from "@/lib/utils"

interface TableWrapperProps {
  children: React.ReactNode
  className?: string
}

export function TableWrapper({ children, className }: TableWrapperProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white overflow-hidden", className)}>
      {children}
    </div>
  )
}
