import { useEffect, useRef } from 'react';
import type { PersistedState } from '../schedule/types';
import { applicableSlots, getSessionById } from '../lib/schedule-model';
import { londonWallToDate } from '../lib/time';

export function useSlotReminders(
  state: PersistedState,
  enabled: boolean,
  leadMinutes: number,
  warnUnsetSlots: boolean,
): void {
  const warnedRef = useRef(new Set<string>());

  useEffect(() => {
    warnedRef.current.clear();
  }, [state.choices, state.mondayMode, state.fridayWorkshop]);

  useEffect(() => {
    if (!enabled || typeof Notification === 'undefined') return;
    if (Notification.permission !== 'granted') return;

    const leadMs = leadMinutes * 60 * 1000;

    const tick = (): void => {
      const now = Date.now();
      const slots = applicableSlots(state);

      for (const slot of slots) {
        const startMs = londonWallToDate(slot.date, slot.start).getTime();
        const delta = startMs - now;
        const choiceId = state.choices[slot.id];
        const session = choiceId ? getSessionById(choiceId) : undefined;

        if (delta > 0 && delta <= leadMs) {
          const startKey = `start:${slot.id}`;
          if (!warnedRef.current.has(startKey)) {
            warnedRef.current.add(startKey);
            if (session) {
              new Notification(session.title, {
                body: `${slot.start} · ${session.room}${session.speaker ? ` · ${session.speaker}` : ''}`,
                tag: startKey,
              });
            } else if (slot.requiresChoice && warnUnsetSlots) {
              new Notification('Pick a session', {
                body: `${slot.label} starts at ${slot.start} — choose a track in SDD Picker`,
                tag: startKey,
              });
            } else if (!slot.requiresChoice && slot.sessions[0]) {
              const kn = slot.sessions[0];
              new Notification(kn.title, {
                body: `${slot.start} · ${kn.room}`,
                tag: startKey,
              });
            }
          }
        }

      }
    };

    const id = window.setInterval(tick, 20_000);
    tick();
    return () => window.clearInterval(id);
  }, [enabled, leadMinutes, state, warnUnsetSlots]);
}
