import type { MondayMode, PersistedState } from '../schedule/types';

const KEY = 'sdd2026-schedule-v1';

export const DEFAULT_STATE: PersistedState = {
  version: 1,
  choices: {},
  mondayMode: 'skip',
  fridayWorkshop: false,
  wednesdayNote: '',
  notifyEnabled: false,
  notifyLeadMinutes: 10,
  notifyUnsetSlots: true,
};

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (parsed.version !== 1) return { ...DEFAULT_STATE };
    const mondayMode: MondayMode =
      (parsed.mondayMode as MondayMode | 'conference' | undefined) === 'conference'
        ? 'skip'
        : (parsed.mondayMode as MondayMode | undefined) ?? DEFAULT_STATE.mondayMode;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      mondayMode,
      choices: { ...DEFAULT_STATE.choices, ...parsed.choices },
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: PersistedState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function exportJson(state: PersistedState): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(text: string): PersistedState | null {
  try {
    const parsed = JSON.parse(text) as Partial<PersistedState>;
    if (parsed.version !== 1) return null;
    const mondayMode: MondayMode =
      (parsed.mondayMode as MondayMode | 'conference' | undefined) === 'conference'
        ? 'skip'
        : (parsed.mondayMode as MondayMode | undefined) ?? DEFAULT_STATE.mondayMode;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      mondayMode,
      choices: { ...DEFAULT_STATE.choices, ...parsed.choices },
    };
  } catch {
    return null;
  }
}
