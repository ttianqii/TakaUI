/**
 * TakaUI Inline Styles System
 * 
 * This approach ensures:
 * 1. No CSS imports needed by users
 * 2. Won't conflict with user's existing styles
 * 3. Fully self-contained styling
 * 4. Supports theming via CSS variables (optional)
 */

export type StyleObject = React.CSSProperties

// Color palette
export const colors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
}

// Base styles for all TakaUI components
export const baseStyles: StyleObject = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  fontFamily: 'inherit',
}

// Common style patterns
export const commonStyles = {
  // Flexbox utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as StyleObject,
  
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as StyleObject,
  
  flexStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  } as StyleObject,

  // Text utilities
  textSm: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  } as StyleObject,
  
  textBase: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  } as StyleObject,
  
  textLg: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  } as StyleObject,

  // Border radius
  roundedSm: {
    borderRadius: '0.125rem',
  } as StyleObject,
  
  roundedMd: {
    borderRadius: '0.375rem',
  } as StyleObject,
  
  roundedLg: {
    borderRadius: '0.5rem',
  } as StyleObject,

  // Shadows
  shadowSm: {
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  } as StyleObject,
  
  shadowMd: {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  } as StyleObject,
  
  shadowLg: {
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  } as StyleObject,

  // Transitions
  transition: {
    transition: 'all 0.15s ease-in-out',
  } as StyleObject,

  // Disabled state
  disabled: {
    pointerEvents: 'none' as const,
    opacity: 0.5,
  } as StyleObject,
}

// Button variant styles
export const buttonStyles = {
  base: {
    ...baseStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap' as const,
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.15s ease-in-out',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  } as StyleObject,

  variants: {
    default: {
      backgroundColor: colors.blue[600],
      color: colors.white,
    } as StyleObject,
    defaultHover: {
      backgroundColor: colors.blue[700],
    } as StyleObject,
    defaultActive: {
      backgroundColor: colors.blue[800],
      transform: 'scale(0.95)',
    } as StyleObject,

    destructive: {
      backgroundColor: colors.red[600],
      color: colors.white,
    } as StyleObject,
    destructiveHover: {
      backgroundColor: colors.red[700],
    } as StyleObject,
    destructiveActive: {
      backgroundColor: colors.red[800],
      transform: 'scale(0.95)',
    } as StyleObject,

    outline: {
      border: `1px solid ${colors.gray[300]}`,
      backgroundColor: colors.white,
      color: colors.gray[900],
    } as StyleObject,
    outlineHover: {
      backgroundColor: colors.gray[50],
    } as StyleObject,
    outlineActive: {
      backgroundColor: colors.gray[100],
      transform: 'scale(0.95)',
    } as StyleObject,

    secondary: {
      backgroundColor: colors.gray[200],
      color: colors.gray[900],
    } as StyleObject,
    secondaryHover: {
      backgroundColor: colors.gray[300],
    } as StyleObject,
    secondaryActive: {
      backgroundColor: colors.gray[400],
      transform: 'scale(0.95)',
    } as StyleObject,

    ghost: {
      backgroundColor: colors.transparent,
      color: colors.gray[900],
    } as StyleObject,
    ghostHover: {
      backgroundColor: colors.gray[100],
    } as StyleObject,
    ghostActive: {
      backgroundColor: colors.gray[200],
      transform: 'scale(0.95)',
    } as StyleObject,

    link: {
      color: colors.blue[600],
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      backgroundColor: colors.transparent,
    } as StyleObject,
    linkHover: {
      color: colors.blue[700],
    } as StyleObject,
    linkActive: {
      color: colors.blue[800],
    } as StyleObject,
  },

  sizes: {
    default: {
      height: '2.25rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    } as StyleObject,
    sm: {
      height: '2rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      fontSize: '0.75rem',
      gap: '0.375rem',
    } as StyleObject,
    lg: {
      height: '2.5rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    } as StyleObject,
    icon: {
      height: '2.25rem',
      width: '2.25rem',
      padding: 0,
    } as StyleObject,
    'icon-sm': {
      height: '2rem',
      width: '2rem',
      padding: 0,
    } as StyleObject,
    'icon-lg': {
      height: '2.5rem',
      width: '2.5rem',
      padding: 0,
    } as StyleObject,
  },
}

// Input styles
export const inputStyles = {
  base: {
    ...baseStyles,
    display: 'flex',
    width: '100%',
    height: '2.25rem',
    borderRadius: '0.375rem',
    border: `1px solid ${colors.gray[300]}`,
    backgroundColor: colors.white,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    outline: 'none',
    transition: 'all 0.15s ease-in-out',
  } as StyleObject,
  
  focus: {
    borderColor: colors.blue[500],
    boxShadow: `0 0 0 3px ${colors.blue[100]}`,
  } as StyleObject,
  
  disabled: {
    ...commonStyles.disabled,
    backgroundColor: colors.gray[100],
  } as StyleObject,
}

// Popover styles
export const popoverStyles = {
  content: {
    ...baseStyles,
    zIndex: 50,
    minWidth: '8rem',
    overflow: 'hidden',
    borderRadius: '0.375rem',
    border: `1px solid ${colors.gray[200]}`,
    backgroundColor: colors.white,
    padding: '1rem',
    color: colors.gray[900],
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    outline: 'none',
  } as StyleObject,
}

// Calendar/DatePicker specific styles
export const calendarStyles = {
  container: {
    ...baseStyles,
    padding: '0.75rem',
  } as StyleObject,

  header: {
    ...commonStyles.flexBetween,
    marginBottom: '0.75rem',
  } as StyleObject,

  monthYear: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: colors.gray[900],
  } as StyleObject,

  navButton: {
    ...baseStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
    width: '2rem',
    borderRadius: '0.375rem',
    border: 'none',
    backgroundColor: colors.transparent,
    color: colors.gray[700],
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
  } as StyleObject,

  navButtonHover: {
    backgroundColor: colors.gray[100],
  } as StyleObject,

  weekDaysRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
    marginBottom: '0.5rem',
  } as StyleObject,

  weekDayCell: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: colors.gray[500],
    textAlign: 'center' as const,
    padding: '0.5rem',
  } as StyleObject,

  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
  } as StyleObject,

  dayCell: {
    ...baseStyles,
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.25rem',
    width: '2.25rem',
    fontSize: '0.875rem',
    borderRadius: '0.375rem',
    border: 'none',
    backgroundColor: colors.transparent,
    color: colors.gray[900],
    cursor: 'pointer',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
  } as StyleObject,

  dayCellHover: {
    backgroundColor: colors.gray[100],
  } as StyleObject,

  dayCellSelected: {
    backgroundColor: colors.blue[600],
    color: colors.white,
  } as StyleObject,

  dayCellToday: {
    border: `2px solid ${colors.blue[600]}`,
  } as StyleObject,

  dayCellDisabled: {
    color: colors.gray[300],
    cursor: 'not-allowed',
    pointerEvents: 'none' as const,
  } as StyleObject,

  dayCellOutsideMonth: {
    color: colors.gray[400],
  } as StyleObject,

  dayCellInRange: {
    backgroundColor: colors.blue[100],
    color: colors.blue[900],
  } as StyleObject,

  holidayIndicator: {
    position: 'absolute' as const,
    bottom: '2px',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: colors.red[500],
  } as StyleObject,
}

// Helper function to merge styles
export function mergeStyles(...styles: (StyleObject | undefined)[]): StyleObject {
  return Object.assign({}, ...styles.filter(Boolean))
}
