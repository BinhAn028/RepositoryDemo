export interface TimeZoneData {
  id: string;
  name: string;
  city: string;
  utcOffset: string;
  timeZone: string;
}

export interface ClockTime {
  time: string;
  date: string;
  period: string;
  is24Hour: boolean;
}

export interface DigitalClockProps {
  timeZone: TimeZoneData;
  is24Hour?: boolean;
  className?: string;
}

export const TIME_ZONES: TimeZoneData[] = [
  {
    id: 'utc',
    name: 'UTC',
    city: 'Coordinated Universal Time',
    utcOffset: '+0:00',
    timeZone: 'UTC'
  },
  {
    id: 'est',
    name: 'EST/EDT',
    city: 'New York',
    utcOffset: '-5:00/-4:00',
    timeZone: 'America/New_York'
  },
  {
    id: 'pst',
    name: 'PST/PDT',
    city: 'Los Angeles',
    utcOffset: '-8:00/-7:00',
    timeZone: 'America/Los_Angeles'
  },
  {
    id: 'jst',
    name: 'JST',
    city: 'Tokyo',
    utcOffset: '+9:00',
    timeZone: 'Asia/Tokyo'
  },
  {
    id: 'vn',
    name: 'GMT+7',
    city: 'Ho Chi Minh City',
    utcOffset: '+7:00',
    timeZone: 'Asia/Ho_Chi_Minh'
  }
];