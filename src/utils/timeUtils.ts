// Timezone definitions
export const TIMEZONES = [
  { label: 'UTC', offset: 0 },
  { label: 'EST', offset: -5 },
  { label: 'CST', offset: -6 },
  { label: 'MST', offset: -7 },
  { label: 'PST', offset: -8 },
  { label: 'GMT', offset: 0 },
  { label: 'CET', offset: 1 },
  { label: 'EET', offset: 2 },
  { label: 'IST', offset: 5.5 },
  { label: 'CST (China)', offset: 8 },
  { label: 'JST', offset: 9 },
  { label: 'AEST', offset: 10 },
  { label: 'NZST', offset: 12 },
  { label: 'HST', offset: -10 },
  { label: 'AKST', offset: -9 },
  { label: 'Asia/Bangkok', offset: 7 },
];

// Utility function to convert time between timezones
export const convertTimezone = (date: Date, fromTz: string, toTz: string): Date => {
  const fromOffset = TIMEZONES.find(tz => tz.label === fromTz)?.offset || 0;
  const toOffset = TIMEZONES.find(tz => tz.label === toTz)?.offset || 0;
  
  const converted = new Date(date);
  converted.setHours(converted.getHours() + (toOffset - fromOffset));
  
  return converted;
};

// Utility function to format time with timezone
export const formatTimeWithTimezone = (
  date: Date,
  timezone: string,
  format: '12h' | '24h' = '24h',
  showSeconds: boolean = false
): string => {
  const h = format === '12h' ? (date.getHours() % 12 || 12) : date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  const period = date.getHours() >= 12 ? 'PM' : 'AM';
  
  let timeStr = `${h.toString().padStart(2, '0')}:${m}`;
  if (showSeconds) timeStr += `:${s}`;
  if (format === '12h') timeStr += ` ${period}`;
  timeStr += ` ${timezone}`;
  
  return timeStr;
};
