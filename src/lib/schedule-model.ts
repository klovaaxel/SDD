import type { PersistedState, Session, Slot } from '../schedule/types';
import {
  ALL_BREAKS,
  ALL_SLOTS,
  FRIDAY_WORKSHOP_SLOT,
  MONDAY_WORKSHOP_SLOT,
} from '../schedule/slots';

const SESSION_INDEX: Map<string, Session> = new Map();

function indexSessions(slots: Slot[]): void {
  for (const slot of slots) {
    for (const s of slot.sessions) {
      SESSION_INDEX.set(s.id, s);
    }
  }
}

indexSessions(ALL_SLOTS);
indexSessions([MONDAY_WORKSHOP_SLOT, FRIDAY_WORKSHOP_SLOT]);

export function getSessionById(id: string): Session | undefined {
  return SESSION_INDEX.get(id);
}

export function getSlotById(id: string): Slot | undefined {
  if (id === MONDAY_WORKSHOP_SLOT.id) return MONDAY_WORKSHOP_SLOT;
  if (id === FRIDAY_WORKSHOP_SLOT.id) return FRIDAY_WORKSHOP_SLOT;
  return ALL_SLOTS.find((s) => s.id === id);
}

/** Slots that should appear in pickers / reminders for current plan */
export function applicableSlots(state: PersistedState): Slot[] {
  const list: Slot[] = [];
  if (state.mondayMode === 'workshop') {
    list.push(MONDAY_WORKSHOP_SLOT);
  } else {
    for (const s of ALL_SLOTS) {
      if (s.date === '2026-05-11' && s.id.startsWith('mon-conf')) {
        list.push(s);
      }
    }
  }

  for (const s of ALL_SLOTS) {
    if (
      s.date === '2026-05-12' ||
      s.date === '2026-05-13' ||
      s.date === '2026-05-14'
    ) {
      list.push(s);
    }
  }

  if (state.fridayWorkshop) {
    list.push(FRIDAY_WORKSHOP_SLOT);
  }

  return list;
}

export interface TimelineEntry {
  sortKey: number;
  kind: 'session' | 'break';
  date: string;
  start: string;
  end: string;
  title: string;
  subtitle?: string;
  room?: string;
  slotId?: string;
  sessionId?: string;
}

export function buildTimeline(state: PersistedState): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const choices = state.choices;

  const addSessionFromChoice = (slot: Slot) => {
    const sid = choices[slot.id];
    if (!sid) return;
    const session = getSessionById(sid);
    if (!session) return;
    entries.push({
      sortKey: dateTimeSort(slot.date, slot.start),
      kind: 'session',
      date: slot.date,
      start: slot.start,
      end: slot.end,
      title: session.title,
      subtitle: session.speaker,
      room: session.room,
      slotId: slot.id,
      sessionId: session.id,
    });
  };

  if (state.mondayMode === 'workshop') {
    addSessionFromChoice(MONDAY_WORKSHOP_SLOT);
  } else {
    for (const slot of ALL_SLOTS) {
      if (slot.date === '2026-05-11' && slot.id.startsWith('mon-conf')) {
        if (slot.requiresChoice) {
          addSessionFromChoice(slot);
        } else {
          const kn = slot.sessions[0];
          entries.push({
            sortKey: dateTimeSort(slot.date, slot.start),
            kind: 'session',
            date: slot.date,
            start: slot.start,
            end: slot.end,
            title: kn.title,
            subtitle: kn.speaker,
            room: kn.room,
            slotId: slot.id,
            sessionId: kn.id,
          });
        }
      }
    }
  }

  for (const slot of ALL_SLOTS) {
    if (
      slot.date === '2026-05-12' ||
      slot.date === '2026-05-13' ||
      slot.date === '2026-05-14'
    ) {
      addSessionFromChoice(slot);
    }
  }

  if (state.fridayWorkshop) {
    addSessionFromChoice(FRIDAY_WORKSHOP_SLOT);
  }

  const useBreaks =
    state.mondayMode === 'conference'
      ? ALL_BREAKS
      : ALL_BREAKS.filter((b) => b.date !== '2026-05-11');

  for (const b of useBreaks) {
    entries.push({
      sortKey: dateTimeSort(b.date, b.start),
      kind: 'break',
      date: b.date,
      start: b.start,
      end: b.end,
      title: b.title,
    });
  }

  entries.sort((a, b) => a.sortKey - b.sortKey);
  return entries;
}

function dateTimeSort(date: string, time: string): number {
  return new Date(`${date}T${time}:00`).getTime();
}
