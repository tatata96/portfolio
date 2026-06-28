import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
  type VideoHTMLAttributes,
} from "react";
import "./lazy_hover_video.css";

type LazyHoverVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "children" | "loop" | "muted" | "playsInline" | "preload" | "src"
> & {
  src: string;
  poster?: string;
  aspectRatio?: CSSProperties["aspectRatio"];
  loadImmediately?: boolean;
  playImmediately?: boolean;
  playOnHover?: boolean;
  preloadMode?: VideoHTMLAttributes<HTMLVideoElement>["preload"];
  rootMargin?: string;
  playOnVisibleTouch?: boolean;
};

function isTouchPreferred() {
  return (
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function LazyHoverVideo({
  src,
  poster,
  aspectRatio,
  loadImmediately = false,
  playImmediately = false,
  playOnHover = true,
  preloadMode,
  rootMargin = "600px",
  playOnVisibleTouch = true,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onLoadedData,
  onCanPlay,
  onError,
  style,
  ...videoProps
}: LazyHoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const canLoad = loadImmediately || shouldLoad;
  const videoState = hasError
    ? "error"
    : isReady
      ? "ready"
      : canLoad
        ? "loading"
        : "idle";

  const markReady = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      setIsReady(true);
      setHasError(false);
      onLoadedData?.(event);
    },
    [onLoadedData],
  );

  const markCanPlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      setIsReady(true);
      setHasError(false);
      onCanPlay?.(event);
    },
    [onCanPlay],
  );

  const markError = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      setHasError(true);
      onError?.(event);
    },
    [onError],
  );

  const pauseAndReset = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (video.readyState > 0) {
      video.currentTime = 0;
    }
  }, []);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video || !canLoad) return;

    void video.play().catch(() => {
      // Browsers can reject play() when user activation rules change.
    });
  }, [canLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoad(true);
        }

        setIsVisible(entry.isIntersecting);
      },
      {rootMargin, threshold: 0.2},
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!playOnHover) return;

    const video = videoRef.current;
    const parent = video?.closest("button") ?? video?.parentElement;
    if (!parent) return;

    parent.addEventListener("mouseenter", play);
    parent.addEventListener("mouseleave", pauseAndReset);
    parent.addEventListener("focusin", play);
    parent.addEventListener("focusout", pauseAndReset);

    return () => {
      parent.removeEventListener("mouseenter", play);
      parent.removeEventListener("mouseleave", pauseAndReset);
      parent.removeEventListener("focusin", play);
      parent.removeEventListener("focusout", pauseAndReset);
    };
  }, [pauseAndReset, play, playOnHover]);

  useEffect(() => {
    if (!canLoad || !playImmediately) return;
    play();
  }, [canLoad, play, playImmediately]);

  useEffect(() => {
    if (!playImmediately) return;

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, [play, playImmediately]);

  useEffect(() => {
    if (playImmediately) return;

    if (
      !canLoad ||
      !playOnVisibleTouch ||
      !isVisible ||
      !isTouchPreferred()
    ) {
      if (!isVisible) pauseAndReset();
      return;
    }

    play();
  }, [
    canLoad,
    isVisible,
    pauseAndReset,
    play,
    playImmediately,
    playOnVisibleTouch,
  ]);

  useEffect(() => pauseAndReset, [pauseAndReset]);

  return (
    <span
      className="lazy-hover-video"
      data-video-state={videoState}
      style={aspectRatio ? {aspectRatio} : undefined}
    >
      <video
        {...videoProps}
        ref={videoRef}
        src={canLoad ? src : undefined}
        poster={poster}
        muted
        playsInline
        loop
        autoPlay={playImmediately}
        preload={preloadMode ?? (loadImmediately ? "auto" : "none")}
        style={style}
        onLoadedData={markReady}
        onCanPlay={markCanPlay}
        onError={markError}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (playOnHover) play();
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (playOnHover) pauseAndReset();
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (playOnHover) play();
        }}
        onBlur={(event) => {
          onBlur?.(event);
          if (playOnHover) pauseAndReset();
        }}
      />
      <span className="lazy-hover-video__indicator" aria-hidden="true">
        <span className="lazy-hover-video__mark" />
        <span className="lazy-hover-video__label">
          {hasError ? "MEDIA UNAVAILABLE" : "LOADING"}
        </span>
      </span>
    </span>
  );
}

export default LazyHoverVideo;
