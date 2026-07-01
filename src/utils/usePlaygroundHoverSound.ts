import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPlaygroundSoundMuted,
  PLAYGROUND_SOUND_MUTED_EVENT,
} from "./playgroundSoundPreference";

const playgroundSoundModules = import.meta.glob("../assets/sound/*.{mp3,wav,ogg,m4a}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const playgroundSoundSources = Object.entries(playgroundSoundModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const HOVER_SOUND_MOVE_INTERVAL_MS = 180;

export function usePlaygroundHoverSound() {
  const [isPlaygroundSoundMuted, setIsPlaygroundSoundMuted] = useState(
    getPlaygroundSoundMuted,
  );
  const soundRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentSoundRef = useRef<HTMLAudioElement | null>(null);
  const lastMoveSoundTimesRef = useRef<Map<string, number>>(new Map());
  const nextSoundIndexRef = useRef(0);

  const stopCurrentSound = useCallback(() => {
    const currentSound = currentSoundRef.current;
    if (!currentSound) return;

    currentSound.pause();
    currentSound.currentTime = 0;
    currentSoundRef.current = null;
  }, []);

  useEffect(() => {
    function handleSoundMutedChange(event: Event) {
      const isMuted = (event as CustomEvent<boolean>).detail;
      setIsPlaygroundSoundMuted(isMuted);

      if (isMuted) {
        stopCurrentSound();
      }
    }

    if (isPlaygroundSoundMuted) {
      stopCurrentSound();
    }

    window.addEventListener(PLAYGROUND_SOUND_MUTED_EVENT, handleSoundMutedChange);
    return () => {
      window.removeEventListener(
        PLAYGROUND_SOUND_MUTED_EVENT,
        handleSoundMutedChange,
      );
      stopCurrentSound();
    };
  }, [isPlaygroundSoundMuted, stopCurrentSound]);

  const getNextHoverSoundSrc = useCallback((hoverSoundSrc?: string) => {
    if (hoverSoundSrc) return hoverSoundSrc;
    if (!playgroundSoundSources.length) return undefined;

    const soundSrc =
      playgroundSoundSources[
        nextSoundIndexRef.current % playgroundSoundSources.length
      ];

    nextSoundIndexRef.current =
      (nextSoundIndexRef.current + 1) % playgroundSoundSources.length;

    return soundSrc;
  }, []);

  const playHoverSound = useCallback(
    (hoverSoundSrc?: string) => {
      if (isPlaygroundSoundMuted) return;

      const currentSound = currentSoundRef.current;
      if (currentSound && !currentSound.paused && !currentSound.ended) return;

      const soundSrc = getNextHoverSoundSrc(hoverSoundSrc);
      if (!soundSrc) return;

      let audio = soundRefs.current.get(soundSrc);
      if (!audio) {
        audio = new Audio(soundSrc);
        audio.preload = "auto";
        audio.volume = 0.42;
        soundRefs.current.set(soundSrc, audio);
      }

      audio.currentTime = 0;
      currentSoundRef.current = audio;

      audio.addEventListener(
        "ended",
        () => {
          if (currentSoundRef.current === audio) {
            currentSoundRef.current = null;
          }
        },
        { once: true },
      );

      void audio.play().catch(() => {
        if (currentSoundRef.current === audio) {
          currentSoundRef.current = null;
        }
      });
    },
    [getNextHoverSoundSrc, isPlaygroundSoundMuted],
  );

  const playMoveSound = useCallback(
    (id: string, hoverSoundSrc?: string) => {
      const now = window.performance.now();
      const lastSoundTime = lastMoveSoundTimesRef.current.get(id) ?? 0;

      if (now - lastSoundTime < HOVER_SOUND_MOVE_INTERVAL_MS) return;

      lastMoveSoundTimesRef.current.set(id, now);
      playHoverSound(hoverSoundSrc);
    },
    [playHoverSound],
  );

  return { playHoverSound, playMoveSound };
}
