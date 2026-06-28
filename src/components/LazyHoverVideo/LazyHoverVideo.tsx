import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type VideoHTMLAttributes,
} from "react";

type LazyHoverVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "children" | "loop" | "muted" | "playsInline" | "preload" | "src"
> & {
  src: string;
  poster?: string;
  aspectRatio?: CSSProperties["aspectRatio"];
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
  rootMargin = "600px",
  playOnVisibleTouch = true,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  style,
  ...videoProps
}: LazyHoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    if (!video || !shouldLoad) return;

    void video.play().catch(() => {
      // Browsers can reject play() when user activation rules change.
    });
  }, [shouldLoad]);

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
    const video = videoRef.current;
    const parent = video?.parentElement;
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
  }, [pauseAndReset, play]);

  useEffect(() => {
    if (
      !shouldLoad ||
      !playOnVisibleTouch ||
      !isVisible ||
      !isTouchPreferred()
    ) {
      if (!isVisible) pauseAndReset();
      return;
    }

    play();
  }, [isVisible, pauseAndReset, play, playOnVisibleTouch, shouldLoad]);

  useEffect(() => pauseAndReset, [pauseAndReset]);

  return (
    <video
      {...videoProps}
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      style={aspectRatio ? {...style, aspectRatio} : style}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        play();
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        pauseAndReset();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        play();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        pauseAndReset();
      }}
    />
  );
}

export default LazyHoverVideo;
