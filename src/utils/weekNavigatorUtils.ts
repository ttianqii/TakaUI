// Utility functions for WeekNavigator component

export const weekNavigatorUtils = {
  calculateWeekDates: (startDate: Date): Date[] => {
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
  },

  formatDateDisplay: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  },

  getWeekNumber: (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  },

  getWeekOfMonth: (date: Date): number => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    const offsetDate = date.getDate() + firstDayOfWeek - 1
    return Math.ceil(offsetDate / 7)
  }
}
