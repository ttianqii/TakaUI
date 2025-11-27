import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variant styles
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 active:scale-95",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 active:scale-95",
          variant === "outline" && "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100 active:scale-95",
          variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 active:scale-95",
          variant === "ghost" && "bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 active:scale-95",
          variant === "link" && "bg-transparent text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline active:text-blue-800",
          // Size styles
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 px-3 text-xs gap-1.5",
          size === "lg" && "h-10 px-6",
          size === "icon" && "h-9 w-9 p-0",
          size === "icon-sm" && "h-8 w-8 p-0",
          size === "icon-lg" && "h-10 w-10 p-0",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
