import type { MondayMode, PersistedState } from '../schedule/types';

const KEY = 'sdd2026-schedule-v1';

export const DEFAULT_STATE: PersistedState = {
  version: 1,
  choices: {},
  mondayMode: 'skip',
  fridayWorkshop: false,
  wednesdayNote: '',
};

/** Strip legacy fields (e.g. removed notification toggles) */
export function normalizeState(
  input: Partial<PersistedState> & Record<string, unknown>,
): PersistedState {
  const mondayMode: MondayMode =
    (input.mondayMode as MondayMode | 'conference' | undefined) === 'conference'
      ? 'skip'
      : (input.mondayMode as MondayMode | undefined) ?? DEFAULT_STATE.mondayMode;
  return {
    version: 1,
    choices: input.choices ?? {},
    mondayMode,
    fridayWorkshop: input.fridayWorkshop ?? false,
    wednesdayNote: input.wednesdayNote ?? '',
  };
}

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<PersistedState> &
      Record<string, unknown>;
    if (parsed.version !== 1) return { ...DEFAULT_STATE };
    return normalizeState({ ...DEFAULT_STATE, ...parsed });
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
    const parsed = JSON.parse(text) as Partial<PersistedState> &
      Record<string, unknown>;
    if (parsed.version !== 1) return null;
    return normalizeState({ ...DEFAULT_STATE, ...parsed });
  } catch {
    return null;
  }
}
