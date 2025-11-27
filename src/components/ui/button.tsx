import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  asChild?: boolean
}

function Button({
  variant = "default",
  size = "default",
  asChild = false,
  disabled,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  // Base button styles
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
  }

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    default: {
      height: '2.25rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    sm: {
      height: '2rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      fontSize: '0.75rem',
      gap: '0.375rem',
    },
    lg: {
      height: '2.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    icon: {
      height: '2.25rem',
      width: '2.25rem',
      padding: 0,
    },
    'icon-sm': {
      height: '2rem',
      width: '2rem',
      padding: 0,
    },
    'icon-lg': {
      height: '2.5rem',
      width: '2.5rem',
      padding: 0,
    },
  }

  // Variant styles (normal state)
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
    },
    destructive: {
      backgroundColor: '#dc2626',
      color: '#ffffff',
    },
    outline: {
      border: '1px solid #d1d5db',
      backgroundColor: '#ffffff',
      color: '#111827',
    },
    secondary: {
      backgroundColor: '#e5e7eb',
      color: '#111827',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#111827',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      backgroundColor: 'transparent',
    },
  }

  // Hover styles
  const hoverStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#1d4ed8',
    },
    destructive: {
      backgroundColor: '#b91c1c',
    },
    outline: {
      backgroundColor: '#f9fafb',
    },
    secondary: {
      backgroundColor: '#d1d5db',
    },
    ghost: {
      backgroundColor: '#f3f4f6',
    },
    link: {
      color: '#1d4ed8',
    },
  }

  // Active styles
  const activeStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: '#1e40af',
      transform: 'scale(0.95)',
    },
    destructive: {
      backgroundColor: '#991b1b',
      transform: 'scale(0.95)',
    },
    outline: {
      backgroundColor: '#f3f4f6',
      transform: 'scale(0.95)',
    },
    secondary: {
      backgroundColor: '#9ca3af',
      transform: 'scale(0.95)',
    },
    ghost: {
      backgroundColor: '#e5e7eb',
      transform: 'scale(0.95)',
    },
    link: {
      color: '#1e40af',
    },
  }

  // Combine all styles
  let finalStyle: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }

  if (isHovered && !disabled) {
    finalStyle = { ...finalStyle, ...hoverStyles[variant] }
  }

  if (isActive && !disabled) {
    finalStyle = { ...finalStyle, ...activeStyles[variant] }
  }

  if (disabled) {
    finalStyle = {
      ...finalStyle,
      pointerEvents: 'none',
      opacity: 0.5,
    }
  }

  // Merge with user's custom styles
  finalStyle = { ...finalStyle, ...style }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    setIsActive(false)
    onMouseLeave?.(e)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true)
    onMouseDown?.(e)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(false)
    onMouseUp?.(e)
  }

  return (
    <Comp
      data-takaui="button"
      style={finalStyle}
      className={className}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button }
