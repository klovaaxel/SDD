import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PersistedState } from './schedule/types';
import {
  ALL_SLOTS,
  FRIDAY_WORKSHOP_SLOT,
  MONDAY_WORKSHOP_SLOT,
} from './schedule/slots';
import {
  applicableSlots,
  buildTimeline,
  getSlotById,
} from './lib/schedule-model';
import { formatLondonRange } from './lib/time';
import { exportJson, importJson, loadState, saveState } from './lib/persist';
import {
  consumeShareHashIfPresent,
  copyShareUrl,
  encodeSharePayload,
} from './lib/share';
import { buildCalendarIcs, downloadTextFile } from './lib/ics';
import { useSlotReminders } from './hooks/useReminders';

type DayTab = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

function SlotPicker(props: {
  slotId: string;
  state: PersistedState;
  setState: Dispatch<SetStateAction<PersistedState>>;
}) {
  const { slotId, state, setState } = props;
  const slot = getSlotById(slotId);
  if (!slot) return null;
  const selected = state.choices[slotId];

  const pick = (sessionId: string): void => {
    setState((prev) => ({
      ...prev,
      choices: { ...prev.choices, [slotId]: sessionId },
    }));
  };

  if (!slot.requiresChoice) {
    const s = slot.sessions[0];
    return (
      <section className="slot-card slot-card--fixed">
        <header>
          <span className="slot-time">
            {formatLondonRange(slot.date, slot.start, slot.end)}
          </span>
          <span className="slot-label">{slot.label}</span>
        </header>
        <div className="session-block">
          <h3>{s.title}</h3>
          <p className="meta">
            {s.speaker && <>{s.speaker} · </>}
            {s.room}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="slot-card">
      <header>
        <span className="slot-time">
          {formatLondonRange(slot.date, slot.start, slot.end)}
        </span>
        <span className="slot-label">{slot.label}</span>
      </header>
      <div className="track-grid" role="radiogroup" aria-label={slot.label}>
        {slot.sessions.map((s) => (
          <label
            key={s.id}
            className={
              selected === s.id ? 'track-pill is-selected' : 'track-pill'
            }
          >
            <input
              className="sr-only"
              type="radio"
              name={slot.id}
              checked={selected === s.id}
              onChange={() => pick(s.id)}
            />
            <span className="track-num">
              {s.track != null ? `T${s.track}` : 'WS'}
            </span>
            <span className="track-body">
              <strong>{s.title}</strong>
              <span className="meta">
                {s.speaker && <>{s.speaker} · </>}
                {s.room}
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [state, setState] = useState<PersistedState>(() => {
    const shared = consumeShareHashIfPresent();
    return shared ?? loadState();
  });
  const [tab, setTab] = useState<DayTab>('mon');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useSlotReminders(
    state,
    state.notifyEnabled,
    state.notifyLeadMinutes,
    state.notifyUnsetSlots,
  );

  const requestNotify = useCallback(async () => {
    if (!('Notification' in window)) {
      setToast('Notifications are not supported in this browser');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setState((s) => ({ ...s, notifyEnabled: true }));
      setToast('Reminders enabled — keep this tab open or use calendar export');
    } else {
      setToast('Permission denied — use Export ICS for reliable alarms');
    }
    window.setTimeout(() => setToast(null), 5000);
  }, []);

  const share = useCallback(async () => {
    const hash = encodeSharePayload(state);
    await copyShareUrl(hash);
    setToast('Share link copied — send it to teammates');
    window.setTimeout(() => setToast(null), 4000);
  }, [state]);

  const exportIcs = useCallback(() => {
    const ics = buildCalendarIcs(state);
    downloadTextFile('sdd-2026-my-schedule.ics', ics);
    setToast('Downloaded calendar file — open it to add reminders in your calendar app');
    window.setTimeout(() => setToast(null), 5000);
  }, [state]);

  const timeline = useMemo(() => buildTimeline(state), [state]);

  const mondaySlots = useMemo(() => {
    if (state.mondayMode === 'workshop') {
      return [MONDAY_WORKSHOP_SLOT.id];
    }
    return [];
  }, [state.mondayMode]);

  const tuesdaySlotIds = ALL_SLOTS.filter((s) => s.date === '2026-05-12').map(
    (s) => s.id,
  );
  const wednesdaySlotIds = ALL_SLOTS.filter((s) => s.date === '2026-05-13').map(
    (s) => s.id,
  );
  const thursdaySlotIds = ALL_SLOTS.filter((s) => s.date === '2026-05-14').map(
    (s) => s.id,
  );

  const missingCount = useMemo(() => {
    let n = 0;
    for (const slot of applicableSlots(state)) {
      if (!slot.requiresChoice) continue;
      if (!state.choices[slot.id]) n += 1;
    }
    return n;
  }, [state]);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Barbican · Europe/London</p>
        <h1>SDD 2026 schedule picker</h1>
        <p className="lede">
          Choose parallel sessions, see a simple timeline, export a calendar file
          for reliable alarms, or turn on browser reminders while this page stays
          open.
        </p>
      </header>

      <section className="toolbar card">
        <div className="toolbar-row">
          <label className="field-inline">
            <input
              type="checkbox"
              checked={state.mondayMode === 'workshop'}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  mondayMode: e.target.checked ? 'workshop' : 'skip',
                }))
              }
            />
            <span>Monday pre-conference workshop</span>
          </label>
          <label className="field-inline">
            <input
              type="checkbox"
              checked={state.fridayWorkshop}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  fridayWorkshop: e.target.checked,
                }))
              }
            />
            <span>Friday post-conference workshop</span>
          </label>
        </div>
        <div className="toolbar-row">
          {!state.notifyEnabled ? (
            <button type="button" className="btn primary" onClick={requestNotify}>
              Enable browser reminders
            </button>
          ) : (
            <label className="field-inline">
              <input
                type="checkbox"
                checked={state.notifyEnabled}
                onChange={(e) =>
                  setState((s) => ({ ...s, notifyEnabled: e.target.checked }))
                }
              />
              <span>Reminders on</span>
            </label>
          )}
          <label className="field-inline">
            <span>Lead time</span>
            <select
              value={state.notifyLeadMinutes}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  notifyLeadMinutes: Number(e.target.value),
                }))
              }
            >
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
            </select>
          </label>
          <label className="field-inline">
            <input
              type="checkbox"
              checked={state.notifyUnsetSlots}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  notifyUnsetSlots: e.target.checked,
                }))
              }
            />
            <span>Nudge if a slot is still empty</span>
          </label>
          <button type="button" className="btn" onClick={exportIcs}>
            Export .ics (calendar)
          </button>
          <button type="button" className="btn" onClick={share}>
            Copy share link
          </button>
          <label className="btn file-btn">
            Import JSON
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                file.text().then((txt) => {
                  const next = importJson(txt);
                  if (next) setState(next);
                  else setToast('Could not import file');
                });
              }}
            />
          </label>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              downloadTextFile(
                'sdd-2026-plan.json',
                exportJson(state),
              );
            }}
          >
            Download JSON
          </button>
        </div>
        <p className="hint">
          GitHub Pages cannot wake your phone when the site is closed. For alarms
          without keeping a tab open, import the .ics file into Apple Calendar,
          Google Calendar, or Outlook.
        </p>
      </section>

      {toast && <div className="toast">{toast}</div>}

      <nav className="day-tabs" aria-label="Conference days">
        {(
          [
            ['mon', 'Mon 11'],
            ['tue', 'Tue 12'],
            ['wed', 'Wed 13'],
            ['thu', 'Thu 14'],
            ['fri', 'Fri 15'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? 'tab is-active' : 'tab'}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="layout">
        <main className="main-col">
          {tab === 'mon' && (
            <div className="stack">
              <section className="card pdf-note" role="note">
                <strong>Monday 11 May</strong>
                <p>
                  Matches{' '}
                  <a
                    href="https://sddconf.com/agenda"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sddconf.com/agenda
                  </a>
                  : full-day pre-conference workshops only. Tick “Monday
                  pre-conference workshop” above to choose WK01–WK07; the main
                  parallel programme runs Tuesday–Thursday.
                </p>
              </section>
              {mondaySlots.map((id) => (
                <SlotPicker
                  key={id}
                  slotId={id}
                  state={state}
                  setState={setState}
                />
              ))}
            </div>
          )}
          {tab === 'tue' && (
            <div className="stack">
              {tuesdaySlotIds.map((id) => (
                <SlotPicker
                  key={id}
                  slotId={id}
                  state={state}
                  setState={setState}
                />
              ))}
            </div>
          )}
          {tab === 'wed' && (
            <div className="stack">
              <section className="card pdf-note" role="note">
                <strong>Wednesday 13 May</strong>
                <p>
                  Session titles follow the{' '}
                  <a
                    href="https://sddconf.com/agenda"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    official online agenda
                  </a>
                  .
                </p>
              </section>
              {wednesdaySlotIds.map((id) => (
                <SlotPicker
                  key={id}
                  slotId={id}
                  state={state}
                  setState={setState}
                />
              ))}
              <label className="field-block wed-extra-note">
                <span>Extra note for Wednesday (optional)</span>
                <textarea
                  rows={3}
                  value={state.wednesdayNote}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      wednesdayNote: e.target.value,
                    }))
                  }
                  placeholder="e.g. dinner plans, BOF sessions…"
                />
              </label>
            </div>
          )}
          {tab === 'thu' && (
            <div className="stack">
              {thursdaySlotIds.map((id) => (
                <SlotPicker
                  key={id}
                  slotId={id}
                  state={state}
                  setState={setState}
                />
              ))}
            </div>
          )}
          {tab === 'fri' && (
            <div className="stack">
              {state.fridayWorkshop ? (
                <SlotPicker
                  slotId={FRIDAY_WORKSHOP_SLOT.id}
                  state={state}
                  setState={setState}
                />
              ) : (
                <p className="card muted">
                  Enable “Friday post-conference workshop” above to pick WK08–WK14.
                </p>
              )}
            </div>
          )}
        </main>

        <aside className="side-col card">
          <h2>My timeline</h2>
          <p className="muted small">
            {missingCount === 0
              ? 'Every required slot has a pick.'
              : `${missingCount} required slot(s) still open.`}
          </p>
          <ol className="timeline">
            {timeline.map((row) => (
              <li
                key={`${row.kind}-${row.date}-${row.start}-${row.title}`}
                className={row.kind === 'break' ? 'tl-break' : 'tl-talk'}
              >
                <span className="tl-time">
                  {row.date.slice(5)} {row.start}–{row.end}
                </span>
                <span className="tl-title">{row.title}</span>
                {row.room && <span className="tl-room">{row.room}</span>}
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <footer className="footer">
        <p>
          Schedule data follows{' '}
          <a href="https://sddconf.com/agenda">sddconf.com/agenda</a>. Confirm last‑minute
          room changes on site. Plans stay on this device unless you share or export.
        </p>
      </footer>
    </div>
  );
}
