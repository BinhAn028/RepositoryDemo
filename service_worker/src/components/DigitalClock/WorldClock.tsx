'use client';

import { useState } from 'react';
import DigitalClock from './DigitalClock';
import { TIME_ZONES } from '@/types/timezone';
import './DigitalClock.css';

export default function WorldClock() {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  const toggleFormat = () => {
    setIs24Hour(!is24Hour);
  };

  return (
    <div className="world-clock-container">
      <h1 className="main-title">World Digital Clocks</h1>
      
      <div className="clock-controls">
        <button 
          className="format-toggle"
          onClick={toggleFormat}
          aria-label={`Switch to ${is24Hour ? '12-hour' : '24-hour'} format`}
        >
          {is24Hour ? 'Switch to 12-Hour Format' : 'Switch to 24-Hour Format'}
        </button>
      </div>

      <div className="clock-container">
        {TIME_ZONES.map((timeZone) => (
          <DigitalClock
            key={timeZone.id}
            timeZone={timeZone}
            is24Hour={is24Hour}
          />
        ))}
      </div>
    </div>
  );
}