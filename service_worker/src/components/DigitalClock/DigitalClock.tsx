'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClockTime, DigitalClockProps } from '@/types/timezone';
import './DigitalClock.css';

export default function DigitalClock({ timeZone, is24Hour = false, className = '' }: DigitalClockProps) {
  const [currentTime, setCurrentTime] = useState<ClockTime>({
    time: '',
    date: '',
    period: '',
    is24Hour
  });

  const formatTime = useCallback((date: Date, timeZoneId: string, use24Hour: boolean): ClockTime => {
    try {
      // Format time
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZoneId,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24Hour
      });

      // Format date
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZoneId,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const timeString = timeFormatter.format(date);
      const dateString = dateFormatter.format(date);
      
      // Extract AM/PM if in 12-hour format
      let period = '';
      let cleanTime = timeString;
      
      if (!use24Hour) {
        const match = timeString.match(/(\d{1,2}:\d{2}:\d{2})\s*(AM|PM)/i);
        if (match) {
          cleanTime = match[1];
          period = match[2];
        }
      }

      return {
        time: cleanTime,
        date: dateString,
        period,
        is24Hour: use24Hour
      };
    } catch (error) {
      console.error(`Error formatting time for timezone ${timeZoneId}:`, error);
      return {
        time: 'Error',
        date: 'Error',
        period: '',
        is24Hour: use24Hour
      };
    }
  }, []);

  const updateTime = useCallback(() => {
    const now = new Date();
    const formattedTime = formatTime(now, timeZone.timeZone, is24Hour);
    setCurrentTime(formattedTime);
  }, [timeZone.timeZone, is24Hour, formatTime]);

  useEffect(() => {
    // Update immediately
    updateTime();
    
    // Set up interval to update every second
    const interval = setInterval(updateTime, 1000);
    
    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, [updateTime]);

  return (
    <div className={`digital-clock ${className}`} role="region" aria-label={`Clock for ${timeZone.city}`}>
      <div className="timezone-header">
        <div className="timezone-name" aria-label={`Time zone: ${timeZone.name}`}>
          {timeZone.name}
        </div>
        <div className="timezone-city" aria-label={`City: ${timeZone.city}`}>
          {timeZone.city}
        </div>
        <div className="timezone-offset" aria-label={`UTC offset: ${timeZone.utcOffset}`}>
          UTC {timeZone.utcOffset}
        </div>
      </div>
      
      <div className="time-display" aria-label={`Current time: ${currentTime.time} ${currentTime.period}`}>
        {currentTime.time}
        {!is24Hour && currentTime.period && (
          <span className="time-period">{currentTime.period}</span>
        )}
      </div>
      
      <div className="date-display" aria-label={`Current date: ${currentTime.date}`}>
        {currentTime.date}
      </div>
    </div>
  );
}