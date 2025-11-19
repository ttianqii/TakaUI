import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface TimePickerProps {
  time: Date | undefined;
  onTimeChange: (date: Date | undefined) => void;
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;
  format?: '12h' | '24h';
  showTimezone?: boolean;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  showSeconds?: boolean;
  placeholder?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  showClockFace?: boolean;
}

const TIMEZONES = [
  { label: 'UTC', offset: 0 },
  { label: 'America/New_York', offset: -5 },
  { label: 'America/Chicago', offset: -6 },
  { label: 'America/Denver', offset: -7 },
  { label: 'America/Los_Angeles', offset: -8 },
  { label: 'Europe/London', offset: 0 },
  { label: 'Europe/Paris', offset: 1 },
  { label: 'Europe/Berlin', offset: 1 },
  { label: 'Asia/Dubai', offset: 4 },
  { label: 'Asia/Kolkata', offset: 5.5 },
  { label: 'Asia/Bangkok', offset: 7 },
  { label: 'Asia/Singapore', offset: 8 },
  { label: 'Asia/Tokyo', offset: 9 },
  { label: 'Australia/Sydney', offset: 10 },
  { label: 'Pacific/Auckland', offset: 12 },
  { label: 'Pacific/Honolulu', offset: -10 },
];

export const TimePicker: React.FC<TimePickerProps> = ({
  time,
  onTimeChange,
  timezone = 'UTC',
  onTimezoneChange,
  format = '24h',
  showTimezone = false,
  minuteStep = 1,
  showSeconds = false,
  placeholder = 'Select time',
  variant = 'outline',
  size = 'default',
  showClockFace = false,
}) => {
  const [view, setView] = useState<'time' | 'timezone'>('time');
  const is24Hour = format === '24h';
  const [hours, setHours] = useState<number>(time ? time.getHours() : 0);
  const [minutes, setMinutes] = useState<number>(time ? time.getMinutes() : 0);
  const [seconds, setSeconds] = useState<number>(time ? time.getSeconds() : 0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);
  const secondScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (time) {
      const h = time.getHours();
      setHours(h);
      setMinutes(time.getMinutes());
      setSeconds(time.getSeconds());
      setPeriod(h >= 12 ? 'PM' : 'AM');
    }
  }, [time]);

  useEffect(() => {
    // Scroll to selected values
    if (hourScrollRef.current) {
      const selectedHour = hourScrollRef.current.querySelector('[data-selected="true"]');
      selectedHour?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (minuteScrollRef.current) {
      const selectedMinute = minuteScrollRef.current.querySelector('[data-selected="true"]');
      selectedMinute?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (secondScrollRef.current) {
      const selectedSecond = secondScrollRef.current.querySelector('[data-selected="true"]');
      selectedSecond?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [hours, minutes, seconds, is24Hour]);

  const updateTime = (h: number, m: number, s: number) => {
    const newTime = new Date();
    newTime.setHours(h);
    newTime.setMinutes(m);
    newTime.setSeconds(s);
    onTimeChange(newTime);
  };

  const handleHourChange = (hour: number) => {
    let newHour = hour;
    if (!is24Hour) {
      if (period === 'PM' && hour !== 12) {
        newHour = hour + 12;
      } else if (period === 'AM' && hour === 12) {
        newHour = 0;
      }
    }
    setHours(newHour);
    updateTime(newHour, minutes, seconds);
  };

  const handleMinuteChange = (minute: number) => {
    setMinutes(minute);
    updateTime(hours, minute, seconds);
  };

  const handleSecondChange = (second: number) => {
    setSeconds(second);
    updateTime(hours, minutes, second);
  };

  const handlePeriodToggle = (newPeriod: 'AM' | 'PM') => {
    if (period === newPeriod) return;
    setPeriod(newPeriod);
    const newHour = newPeriod === 'PM' ? 
      (hours % 12) + 12 : 
      hours % 12;
    setHours(newHour);
    updateTime(newHour, minutes, seconds);
  };

  const handleNow = () => {
    const now = new Date();
    setHours(now.getHours());
    setMinutes(now.getMinutes());
    setSeconds(now.getSeconds());
    setPeriod(now.getHours() >= 12 ? 'PM' : 'AM');
    onTimeChange(now);
  };

  const formatTime = () => {
    if (!time) return placeholder;
    
    const h = is24Hour ? hours : (hours % 12 || 12);
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    
    let timeStr = `${h.toString().padStart(2, '0')}:${m}`;
    if (showSeconds) timeStr += `:${s}`;
    if (!is24Hour) timeStr += ` ${period}`;
    if (showTimezone) timeStr += ` ${timezone}`;
    
    return timeStr;
  };

  const generateHours = () => {
    const max = is24Hour ? 23 : 12;
    const start = is24Hour ? 0 : 1;
    return Array.from({ length: max - start + 1 }, (_, i) => start + i);
  };

  const generateMinutes = () => {
    return Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => i * minuteStep);
  };

  const generateSeconds = () => {
    return Array.from({ length: 60 }, (_, i) => i);
  };

  const displayHour = is24Hour ? hours : (hours % 12 || 12);

  // Clock face rendering
  const renderClockFace = () => {
    const size = 200;
    const center = size / 2;
    const hourHandLength = 50;
    const minuteHandLength = 70;
    
    const hourAngle = ((displayHour % 12) * 30 + minutes * 0.5) * (Math.PI / 180) - Math.PI / 2;
    const minuteAngle = (minutes * 6) * (Math.PI / 180) - Math.PI / 2;
    
    const hourX = center + hourHandLength * Math.cos(hourAngle);
    const hourY = center + hourHandLength * Math.sin(hourAngle);
    const minuteX = center + minuteHandLength * Math.cos(minuteAngle);
    const minuteY = center + minuteHandLength * Math.sin(minuteAngle);

    return (
      <svg width={size} height={size} className="mx-auto">
        {/* Clock circle */}
        <circle cx={center} cy={center} r={95} fill="white" stroke="#e5e7eb" strokeWidth="2" />
        
        {/* Hour markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * (Math.PI / 180) - Math.PI / 2;
          const x = center + 80 * Math.cos(angle);
          const y = center + 80 * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm fill-gray-600"
            >
              {i === 0 ? 12 : i}
            </text>
          );
        })}
        
        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={hourX}
          y2={hourY}
          stroke="#374151"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={minuteX}
          y2={minuteY}
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle cx={center} cy={center} r="6" fill="#ef4444" />
      </svg>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            'justify-start text-left font-normal',
            !time && 'text-muted-foreground'
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formatTime()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {view === 'time' ? (
          <div className="p-4 space-y-4 min-w-[280px]">
            {/* Time Display with AM/PM buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-4">
                {/* Time Display */}
                <div className="flex items-center gap-1">
                  <div className="text-5xl font-medium tabular-nums">
                    {displayHour.toString().padStart(2, '0')}
                  </div>
                  <div className="text-5xl font-medium">:</div>
                  <div className="text-5xl font-medium tabular-nums">
                    {minutes.toString().padStart(2, '0')}
                  </div>
                  {showSeconds && (
                    <>
                      <div className="text-5xl font-medium">:</div>
                      <div className="text-5xl font-medium tabular-nums">
                        {seconds.toString().padStart(2, '0')}
                      </div>
                    </>
                  )}
                </div>

                {/* AM/PM Buttons - Right Side */}
                {!is24Hour && (
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant={period === 'AM' ? 'default' : 'outline'}
                      onClick={() => handlePeriodToggle('AM')}
                      className="h-10 w-14 text-sm font-medium"
                    >
                      AM
                    </Button>
                    <Button
                      size="sm"
                      variant={period === 'PM' ? 'default' : 'outline'}
                      onClick={() => handlePeriodToggle('PM')}
                      className="h-10 w-14 text-sm font-medium"
                    >
                      PM
                    </Button>
                  </div>
                )}
              </div>

              {showTimezone && (
                <div className="text-xs text-gray-500 text-center">{timezone}</div>
              )}
            </div>

            {showClockFace ? (
              /* Clock Face View */
              <div className="space-y-4">
                {renderClockFace()}
              </div>
            ) : (
              /* Scrollable Column View */
              <div className="flex gap-2 justify-center items-start">
                {/* Hours Column */}
                <div className="flex-1 max-w-[80px]">
                  <div className="text-xs text-center text-gray-500 mb-2">Hour</div>
                  <div 
                    ref={hourScrollRef}
                    className="h-40 overflow-y-auto border rounded-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {generateHours().map((h) => (
                      <button
                        key={h}
                        data-selected={displayHour === h}
                        onClick={() => handleHourChange(h)}
                        className={cn(
                          "w-full py-2 text-center transition-colors",
                          displayHour === h
                            ? "bg-blue-500 text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        {h.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minutes Column */}
                <div className="flex-1 max-w-[80px]">
                  <div className="text-xs text-center text-gray-500 mb-2">Min</div>
                  <div 
                    ref={minuteScrollRef}
                    className="h-40 overflow-y-auto border rounded-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {generateMinutes().map((m) => (
                      <button
                        key={m}
                        data-selected={minutes === m}
                        onClick={() => handleMinuteChange(m)}
                        className={cn(
                          "w-full py-2 text-center transition-colors",
                          minutes === m
                            ? "bg-blue-500 text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        {m.toString().padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seconds Column */}
                {showSeconds && (
                  <div className="flex-1 max-w-[80px]">
                    <div className="text-xs text-center text-gray-500 mb-2">Sec</div>
                    <div 
                      ref={secondScrollRef}
                      className="h-40 overflow-y-auto border rounded-md scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                    >
                      {generateSeconds().map((s) => (
                        <button
                          key={s}
                          data-selected={seconds === s}
                          onClick={() => handleSecondChange(s)}
                          className={cn(
                            "w-full py-2 text-center transition-colors",
                            seconds === s
                              ? "bg-blue-500 text-white font-medium"
                              : "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          {s.toString().padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 justify-between pt-2 border-t">
              <Button size="sm" variant="outline" onClick={handleNow}>
                Now
              </Button>
              {showTimezone && onTimezoneChange && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setView('timezone')}
                >
                  {timezone}
                </Button>
              )}
              <Button size="sm" onClick={() => onTimeChange(time)}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Select Timezone</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setView('time')}
              >
                Back
              </Button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {TIMEZONES.map((tz) => (
                <Button
                  key={tz.label}
                  variant={timezone === tz.label ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => {
                    onTimezoneChange?.(tz.label);
                    setView('time');
                  }}
                >
                  <span className="flex-1 text-left">{tz.label}</span>
                  <span className="text-xs text-gray-500">
                    UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

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
