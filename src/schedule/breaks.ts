import type { BreakBlock } from './types';

/** Shared break pattern for main conference days (Tue–Thu) */
export const CONFERENCE_DAY_BREAKS: Omit<BreakBlock, 'date'>[] = [
  { id: 'coffee-morning', start: '11:00', end: '11:30', title: 'Coffee break' },
  { id: 'lunch', start: '13:00', end: '14:00', title: 'Lunch break' },
  { id: 'coffee-afternoon', start: '15:30', end: '16:00', title: 'Coffee break' },
];

export function breaksForDate(date: string, suffix: string): BreakBlock[] {
  return CONFERENCE_DAY_BREAKS.map((b) => ({
    ...b,
    id: `${date}-${b.id}-${suffix}`,
    date,
  }));
}
