export type SessionKind = 'talk' | 'keynote' | 'workshop' | 'break' | 'social' | 'info';

export interface Session {
  id: string;
  /** Track column 1–7 when parallel; null for single-track */
  track: number | null;
  title: string;
  speaker?: string;
  room: string;
  kind: SessionKind;
}

export interface Slot {
  id: string;
  date: string;
  start: string;
  end: string;
  label: string;
  sessions: Session[];
  /** False for keynote-only or info-only slots */
  requiresChoice: boolean;
}

export interface BreakBlock {
  id: string;
  date: string;
  start: string;
  end: string;
  title: string;
}

export type MondayMode = 'conference' | 'workshop';

export interface PersistedState {
  version: 1;
  choices: Record<string, string>;
  mondayMode: MondayMode;
  fridayWorkshop: boolean;
  wednesdayNote: string;
  notifyEnabled: boolean;
  notifyLeadMinutes: number;
  /** Notify when a selectable slot starts soon and nothing is chosen */
  notifyUnsetSlots: boolean;
}
