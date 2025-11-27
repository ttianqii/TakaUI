/**
 * Utility to merge multiple React.CSSProperties objects
 * Used throughout TakaUI components for combining inline styles
 */

export function mergeStyles(...styles: (React.CSSProperties | undefined)[]): React.CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean))
}

/**
 * Conditional style helper
 * Returns style if condition is true, otherwise undefined
 */
export function conditionalStyle(
  condition: boolean,
  style: React.CSSProperties
): React.CSSProperties | undefined {
  return condition ? style : undefined
}
