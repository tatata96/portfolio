const PLAYGROUND_SOUND_MUTED_KEY = "playgroundSoundMuted";

export const PLAYGROUND_SOUND_MUTED_EVENT = "playground-sound-muted-change";

export function getPlaygroundSoundMuted() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PLAYGROUND_SOUND_MUTED_KEY) === "true";
}

export function setPlaygroundSoundMuted(isMuted: boolean) {
  window.localStorage.setItem(PLAYGROUND_SOUND_MUTED_KEY, String(isMuted));
  window.dispatchEvent(
    new CustomEvent(PLAYGROUND_SOUND_MUTED_EVENT, { detail: isMuted }),
  );
}
