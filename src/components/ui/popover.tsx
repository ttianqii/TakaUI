import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, style, ...props }, ref) => {
  const popoverStyle: React.CSSProperties = {
    zIndex: 50,
    width: 'auto',
    borderRadius: '0.375rem',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    padding: '0.75rem',
    color: '#030712',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    outline: 'none',
    ...style,
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        data-takaui="popover"
        className={className}
        style={popoverStyle}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
