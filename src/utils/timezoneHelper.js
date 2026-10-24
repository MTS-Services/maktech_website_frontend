/**
 * Timezone & Meeting Slots Utility for Maktech Worldwide Booking System
 * 
 * Company Office Working Hours:
 * 09:00 AM - 06:00 PM Bangladesh Standard Time (BST, UTC+6 / Asia/Dhaka)
 */

export const BST_TIMEZONE = 'Asia/Dhaka';
export const BST_START_HOUR = 9;  // 09:00 AM BST
export const BST_END_HOUR = 18;  // 06:00 PM BST
export const SLOT_DURATION_MINUTES = 60; // 1-hour slots

export const POPULAR_TIMEZONES = [
  { value: 'Asia/Dhaka', label: 'Dhaka, Bangladesh (BST, UTC+6)' },
  { value: 'America/New_York', label: 'New York / Eastern Time (EDT/EST, UTC-4/-5)' },
  { value: 'America/Chicago', label: 'Chicago / Central Time (CDT/CST, UTC-5/-6)' },
  { value: 'America/Denver', label: 'Denver / Mountain Time (MDT/MST, UTC-6/-7)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles / Pacific Time (PDT/PST, UTC-7/-8)' },
  { value: 'Europe/London', label: 'London, United Kingdom (BST/GMT, UTC+1/0)' },
  { value: 'Europe/Paris', label: 'Paris / Berlin / Rome (CEST/CET, UTC+2/+1)' },
  { value: 'Asia/Dubai', label: 'Dubai, UAE (GST, UTC+4)' },
  { value: 'Asia/Kolkata', label: 'New Delhi / India (IST, UTC+5:30)' },
  { value: 'Asia/Singapore', label: 'Singapore / Malaysia (SGT, UTC+8)' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Japan (JST, UTC+9)' },
  { value: 'Australia/Sydney', label: 'Sydney, Australia (AEST/AEDT, UTC+10/+11)' },
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
];

/**
 * Curated mapping of IANA timezones to friendly "City, Country" locations
 */
export const TIMEZONE_LOCATION_MAP = {
  // Asia
  'Asia/Dhaka': 'Dhaka, Bangladesh',
  'Asia/Kolkata': 'New Delhi / Kolkata, India',
  'Asia/Calcutta': 'New Delhi / Kolkata, India',
  'Asia/Dubai': 'Dubai, UAE',
  'Asia/Riyadh': 'Riyadh, Saudi Arabia',
  'Asia/Singapore': 'Singapore',
  'Asia/Tokyo': 'Tokyo, Japan',
  'Asia/Seoul': 'Seoul, South Korea',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Shanghai': 'Shanghai, China',
  'Asia/Bangkok': 'Bangkok, Thailand',
  'Asia/Jakarta': 'Jakarta, Indonesia',
  'Asia/Kuala_Lumpur': 'Kuala Lumpur, Malaysia',
  'Asia/Manila': 'Manila, Philippines',
  'Asia/Karachi': 'Karachi, Pakistan',
  'Asia/Colombo': 'Colombo, Sri Lanka',
  'Asia/Kathmandu': 'Kathmandu, Nepal',
  'Asia/Doha': 'Doha, Qatar',
  'Asia/Qatar': 'Doha, Qatar',
  'Asia/Kuwait': 'Kuwait City, Kuwait',
  'Asia/Bahrain': 'Manama, Bahrain',
  'Asia/Muscat': 'Muscat, Oman',
  'Asia/Taipei': 'Taipei, Taiwan',
  'Asia/Ho_Chi_Minh': 'Ho Chi Minh City, Vietnam',

  // Americas (US / Canada / Latin America)
  'America/New_York': 'New York, United States',
  'America/Chicago': 'Chicago, United States',
  'America/Denver': 'Denver, United States',
  'America/Los_Angeles': 'Los Angeles, United States',
  'America/Phoenix': 'Phoenix, United States',
  'America/Detroit': 'Detroit, United States',
  'America/Indianapolis': 'Indianapolis, United States',
  'America/Indiana/Indianapolis': 'Indianapolis, United States',
  'America/Anchorage': 'Anchorage, United States',
  'Pacific/Honolulu': 'Honolulu, United States',
  'America/Toronto': 'Toronto, Canada',
  'America/Vancouver': 'Vancouver, Canada',
  'America/Montreal': 'Montreal, Canada',
  'America/Edmonton': 'Edmonton, Canada',
  'America/Calgary': 'Calgary, Canada',
  'America/Winnipeg': 'Winnipeg, Canada',
  'America/Halifax': 'Halifax, Canada',
  'America/Mexico_City': 'Mexico City, Mexico',
  'America/Sao_Paulo': 'São Paulo, Brazil',
  'America/Buenos_Aires': 'Buenos Aires, Argentina',
  'America/Bogota': 'Bogotá, Colombia',
  'America/Santiago': 'Santiago, Chile',
  'America/Lima': 'Lima, Peru',

  // Europe
  'Europe/London': 'London, United Kingdom',
  'Europe/Dublin': 'Dublin, Ireland',
  'Europe/Paris': 'Paris, France',
  'Europe/Berlin': 'Berlin, Germany',
  'Europe/Rome': 'Rome, Italy',
  'Europe/Madrid': 'Madrid, Spain',
  'Europe/Amsterdam': 'Amsterdam, Netherlands',
  'Europe/Brussels': 'Brussels, Belgium',
  'Europe/Vienna': 'Vienna, Austria',
  'Europe/Stockholm': 'Stockholm, Sweden',
  'Europe/Oslo': 'Oslo, Norway',
  'Europe/Copenhagen': 'Copenhagen, Denmark',
  'Europe/Helsinki': 'Helsinki, Finland',
  'Europe/Zurich': 'Zurich, Switzerland',
  'Europe/Warsaw': 'Warsaw, Poland',
  'Europe/Prague': 'Prague, Czech Republic',
  'Europe/Budapest': 'Budapest, Hungary',
  'Europe/Bucharest': 'Bucharest, Romania',
  'Europe/Athens': 'Athens, Greece',
  'Europe/Lisbon': 'Lisbon, Portugal',
  'Europe/Istanbul': 'Istanbul, Turkey',
  'Europe/Kiev': 'Kyiv, Ukraine',
  'Europe/Kyiv': 'Kyiv, Ukraine',

  // Oceania
  'Australia/Sydney': 'Sydney, Australia',
  'Australia/Melbourne': 'Melbourne, Australia',
  'Australia/Brisbane': 'Brisbane, Australia',
  'Australia/Perth': 'Perth, Australia',
  'Australia/Adelaide': 'Adelaide, Australia',
  'Australia/Hobart': 'Hobart, Australia',
  'Australia/Darwin': 'Darwin, Australia',
  'Pacific/Auckland': 'Auckland, New Zealand',

  // Africa
  'Africa/Cairo': 'Cairo, Egypt',
  'Africa/Johannesburg': 'Johannesburg, South Africa',
  'Africa/Lagos': 'Lagos, Nigeria',
  'Africa/Nairobi': 'Nairobi, Kenya',
  'Africa/Casablanca': 'Casablanca, Morocco',
  'Africa/Accra': 'Accra, Ghana',
};

/**
 * Convert any IANA timezone (e.g. "Asia/Dhaka", "America/New_York") into
 * a clean, human-readable "City, Country/Region" string.
 */
export function getLocationFromTimezone(tz) {
  if (!tz || typeof tz !== 'string') return null;
  const cleanTz = tz.trim();
  if (!cleanTz) return null;

  // Direct map match
  if (TIMEZONE_LOCATION_MAP[cleanTz]) {
    return TIMEZONE_LOCATION_MAP[cleanTz];
  }

  // Handle UTC / GMT
  if (cleanTz === 'UTC' || cleanTz === 'Etc/UTC' || cleanTz === 'GMT') {
    return 'UTC (Global)';
  }

  // Fallback for any IANA timezone: Continent/City or Continent/Region/City
  if (cleanTz.includes('/')) {
    const parts = cleanTz.split('/');
    const city = parts[parts.length - 1].replace(/_/g, ' ');
    const region = parts[0].replace(/_/g, ' ');
    
    // Friendly regional naming
    const regionNames = {
      America: 'Americas',
      Europe: 'Europe',
      Asia: 'Asia',
      Australia: 'Australia',
      Africa: 'Africa',
      Pacific: 'Pacific',
      Atlantic: 'Atlantic',
      Indian: 'Indian Ocean',
    };

    const friendlyRegion = regionNames[region] || region;
    return `${city}, ${friendlyRegion}`;
  }

  return cleanTz.replace(/_/g, ' ');
}

/**
 * Get client's auto-detected location from their browser timezone
 */
export function getClientLocation() {
  return getLocationFromTimezone(getUserTimezone());
}

/**
 * Get user local browser timezone safely
 */
export function getUserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || BST_TIMEZONE;
  } catch {
    return BST_TIMEZONE;
  }
}

/**
 * Get human-readable timezone summary and GMT offset for auto-detection badges
 * e.g. "New York (GMT-4)" or "Dhaka (GMT+6)"
 */
export function getTimezoneSummary(tz) {
  try {
    const timezone = tz || getUserTimezone();
    const now = new Date();
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    });
    const offsetPart = dtf.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value || '';
    const cityName = timezone.includes('/')
      ? timezone.split('/').pop().replace(/_/g, ' ')
      : timezone;

    return {
      timezone,
      cityName,
      offsetPart,
      label: offsetPart ? `${cityName} (${offsetPart})` : cityName,
    };
  } catch {
    return {
      timezone: tz || BST_TIMEZONE,
      cityName: tz || BST_TIMEZONE,
      offsetPart: '',
      label: tz || BST_TIMEZONE,
    };
  }
}

/**
 * Generate all meeting slots for a selected date in Bangladesh (BST).
 * Converts and formats each slot to the visitor's local timezone.
 *
 * @param {string} selectedDateStr - "YYYY-MM-DD"
 * @param {string} visitorTimezone - e.g. "America/New_York"
 * @param {string[]} bookedIsoList - Array of booked slot ISO strings
 * @returns {Array} List of slot objects
 */
export function generateMeetingSlots(selectedDateStr, visitorTimezone, bookedIsoList = []) {
  if (!selectedDateStr) return [];
  const tz = visitorTimezone || getUserTimezone();

  const [year, month, day] = selectedDateStr.split('-').map(Number);
  if (!year || !month || !day) return [];

  const slots = [];
  const now = Date.now();

  const localTimeFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const localDateFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const bstTimeFormat = new Intl.DateTimeFormat('en-US', {
    timeZone: BST_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // BST working hours: 9 AM to 6 PM (9 slots: 9, 10, 11, 12, 13, 14, 15, 16, 17)
  for (let bstHour = BST_START_HOUR; bstHour < BST_END_HOUR; bstHour++) {
    // 09:00 BST is 03:00 UTC (BST is UTC+6)
    const utcHour = bstHour - 6;
    const slotStartUtc = new Date(Date.UTC(year, month - 1, day, utcHour, 0, 0));
    const slotEndUtc = new Date(slotStartUtc.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

    const iso = slotStartUtc.toISOString();
    const isPast = slotStartUtc.getTime() < now + 15 * 60 * 1000; // 15 mins buffer
    const isBooked = bookedIsoList.some((booked) => {
      if (!booked) return false;
      // Match exact ISO or within the slot window
      const bookedTime = new Date(booked).getTime();
      return Math.abs(bookedTime - slotStartUtc.getTime()) < 30 * 60 * 1000;
    });

    const localStart = localTimeFormat.format(slotStartUtc);
    const localEnd = localTimeFormat.format(slotEndUtc);
    const localDate = localDateFormat.format(slotStartUtc);

    const bstStart = bstTimeFormat.format(slotStartUtc);
    const bstEnd = bstTimeFormat.format(slotEndUtc);

    slots.push({
      id: `slot-${bstHour}-${iso}`,
      iso,
      bstHour,
      localTimeLabel: `${localStart} – ${localEnd}`,
      localDateLabel: localDate,
      bstTimeLabel: `${bstStart} – ${bstEnd} BST`,
      isBooked,
      isPast,
      isAvailable: !isBooked && !isPast,
    });
  }

  return slots;
}

function getZoneParts(timestamp, tz) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(timestamp));
  const get = (type) => Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

function getZoneOffsetMs(timestamp, tz) {
  const p = getZoneParts(timestamp, tz);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - timestamp;
}

/**
 * Convert a wall-clock "YYYY-MM-DDTHH:mm" value in the given timezone to a UTC ISO string
 */
export function zonedDateTimeToIso(localValue, tz) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(localValue || '');
  if (!match) return null;
  const [, y, mo, d, h, mi] = match.map(Number);
  const timezone = tz || getUserTimezone();
  try {
    const wallClockAsUtc = Date.UTC(y, mo - 1, d, h, mi);
    let ts = wallClockAsUtc - getZoneOffsetMs(wallClockAsUtc, timezone);
    // Second pass corrects the offset when the first guess crossed a DST boundary
    ts = wallClockAsUtc - getZoneOffsetMs(ts, timezone);
    return new Date(ts).toISOString();
  } catch {
    return null;
  }
}

/**
 * Current time in the given timezone as a "YYYY-MM-DDTHH:mm" value (for datetime-local min)
 */
export function getNowInputValue(tz) {
  try {
    const p = getZoneParts(Date.now(), tz || getUserTimezone());
    const pad = (n) => String(n).padStart(2, '0');
    return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
  } catch {
    return '';
  }
}

/**
 * Format a saved meeting ISO date for admin or user display
 */
export function formatMeetingDisplay(isoDateString, clientTimezone) {
  if (!isoDateString) return null;
  const dateObj = new Date(isoDateString);
  if (isNaN(dateObj.getTime())) return isoDateString;

  // Format in Bangladesh Time
  const bstDate = new Intl.DateTimeFormat('en-US', {
    timeZone: BST_TIMEZONE,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(dateObj);

  // Format in Client Time
  let clientDate = null;
  if (clientTimezone) {
    try {
      clientDate = new Intl.DateTimeFormat('en-US', {
        timeZone: clientTimezone,
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(dateObj);
    } catch {
      clientDate = null;
    }
  }

  return {
    bstFormatted: `${bstDate} (BST)`,
    clientFormatted: clientDate ? `${clientDate} (${clientTimezone})` : null,
    iso: isoDateString,
  };
}
