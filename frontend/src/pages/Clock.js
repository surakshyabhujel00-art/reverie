import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [times, setTimes] = useState({});

  const timeZones = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles' },
    { name: 'Singapore', zone: 'Asia/Singapore' },
    { name: 'Mumbai', zone: 'Asia/Kolkata' }
  ];

  useEffect(() => {
    const updateTime = () => {
      const newTimes = {};
      timeZones.forEach(tz => {
        const time = new Date().toLocaleString('en-US', {
          timeZone: tz.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        newTimes[tz.name] = time;
      });
      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-container">
      <h1>🌍 World Clock</h1>
      <div className="clock-grid">
        {timeZones.map((tz) => (
          <div key={tz.name} className="clock-card">
            <h2>{tz.name}</h2>
            <div className="digital-time">{times[tz.name] || '--:--:--'}</div>
            <p className="timezone-label">{tz.zone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clock;
