import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';

export const TZ = 'Europe/London';

/** Wall-clock time in London → absolute `Date` */
export function londonWallToDate(dateStr: string, hhmm: string): Date {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [h, m] = hhmm.split(':').map(Number);
  return fromZonedTime(new Date(y, mo - 1, d, h, m, 0, 0), TZ);
}

export function formatLondonRange(
  dateStr: string,
  startHhmm: string,
  endHhmm: string,
): string {
  const s = londonWallToDate(dateStr, startHhmm);
  const e = londonWallToDate(dateStr, endHhmm);
  return `${formatInTimeZone(s, TZ, 'EEE d MMM')} · ${formatInTimeZone(s, TZ, 'HH:mm')}–${formatInTimeZone(e, TZ, 'HH:mm')}`;
}

/** ICS DTSTART local wall time string with TZID Europe/London */
export function icsLocalTimestamp(dateStr: string, hhmm: string): string {
  const d = londonWallToDate(dateStr, hhmm);
  return formatInTimeZone(d, TZ, "yyyyMMdd'T'HHmmss");
}
