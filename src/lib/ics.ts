import { formatInTimeZone } from 'date-fns-tz';
import type { PersistedState } from '../schedule/types';
import { buildTimeline } from './schedule-model';
import { icsLocalTimestamp } from './time';
import { TZ } from './time';

function foldIcsLine(line: string): string {
  if (line.length <= 75) return line;
  let rest = line;
  const out: string[] = [];
  out.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 0) {
    out.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  return out.join('\r\n');
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Build RFC 5545 calendar with TZID London for session + break blocks */
export function buildCalendarIcs(state: PersistedState): string {
  const rows: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SDD 2026 Picker//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-TIMEZONE:Europe/London',
  ];

  const stamp = formatInTimeZone(new Date(), 'UTC', "yyyyMMdd'T'HHmmss'Z'");
  const entries = buildTimeline(state);

  entries.forEach((e, i) => {
    rows.push('BEGIN:VEVENT');
    rows.push(`UID:sdd2026-${e.date}-${i}-${e.kind}@static`);
    rows.push(`DTSTAMP:${stamp}`);
    rows.push(
      `DTSTART;TZID=${TZ}:${icsLocalTimestamp(e.date, e.start)}`,
    );
    rows.push(`DTEND;TZID=${TZ}:${icsLocalTimestamp(e.date, e.end)}`);
    const summary =
      e.kind === 'break' ? e.title : `${e.title}${e.room ? ` — ${e.room}` : ''}`;
    rows.push(foldIcsLine(`SUMMARY:${escapeText(summary)}`));
    if (e.kind === 'session' && e.subtitle) {
      rows.push(foldIcsLine(`DESCRIPTION:${escapeText(e.subtitle)}`));
    }
    if (e.kind === 'session' && e.room) {
      rows.push(foldIcsLine(`LOCATION:${escapeText(e.room)}`));
    }
    rows.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder',
      'TRIGGER:-PT15M',
      'END:VALARM',
    );
    rows.push('END:VEVENT');
  });

  rows.push('END:VCALENDAR');
  return rows.join('\r\n');
}

export function downloadTextFile(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
