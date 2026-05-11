import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { PersistedState } from '../schedule/types';
import { DEFAULT_STATE, normalizeState } from './persist';

const HASH_PREFIX = 's=';

export function encodeSharePayload(state: PersistedState): string {
  const payload = JSON.stringify(state);
  return HASH_PREFIX + compressToEncodedURIComponent(payload);
}

export function decodeSharePayload(hash: string): PersistedState | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const compressed = hash.slice(HASH_PREFIX.length);
  const json = decompressFromEncodedURIComponent(compressed);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as Record<string, unknown>;
    if (parsed.version !== 1) return null;
    const choices = {
      ...DEFAULT_STATE.choices,
      ...(parsed.choices as Record<string, string> | undefined),
    };
    return normalizeState({
      ...DEFAULT_STATE,
      ...parsed,
      choices,
    });
  } catch {
    return null;
  }
}

export function copyShareUrl(encodedHash: string): Promise<void> {
  const url = new URL(window.location.href);
  url.hash = encodedHash;
  return navigator.clipboard.writeText(url.toString());
}

/** If the URL hash holds a compressed plan, parse it once and strip the hash */
export function consumeShareHashIfPresent(): PersistedState | null {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return null;
  const merged = decodeSharePayload(raw);
  if (!merged) return null;
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`,
  );
  return merged;
}
