import { useEffect, useRef, useState, type CSSProperties } from "react";
import LazyHoverVideo from "../../components/LazyHoverVideo/LazyHoverVideo";
import { dumpAssets, type DumpAsset } from "../../assets/dump/dumpAssets";
import "./personal_explorations_page.css";

const playgroundSoundModules = import.meta.glob("../../assets/sound/*.{mp3,wav,ogg,m4a}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const playgroundSoundSources = Object.entries(playgroundSoundModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const HOVER_SOUND_MOVE_INTERVAL_MS = 180;

// ── Scramble text ────────────────────────────────────────────────────────────

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#@$%&";

function rChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(() =>
    text.split("").map((c) => (c === " " ? " " : rChar())).join("")
  );

  useEffect(() => {
    const DURATION = 900;
    let raf: ReturnType<typeof setTimeout>;

    const start = setTimeout(() => {
      const t0 = Date.now();

      function tick() {
        const elapsed = Date.now() - t0;
        const progress = Math.min(elapsed / DURATION, 1);
        const revealed = Math.floor(progress * text.length);

        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              return i < revealed ? c : rChar();
            })
            .join("")
        );

        if (progress < 1) raf = setTimeout(tick, 30);
      }

      tick();
    }, delay);

    return () => {
      clearTimeout(start);
      clearTimeout(raf);
    };
  }, [text, delay]);

  return <>{display}</>;
}

// ── Live clock ────────────────────────────────────────────────────────────────

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function LiveClock() {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return <>{time}</>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPrimaryTag(asset: DumpAsset) {
  return asset.tags[0] ?? asset.type;
}

function renderDescription(description: string) {
  return description.split("\n").map((line) => {
    const markdownLink = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (!markdownLink) return <p key={line}>{line}</p>;
    const [rawLink, label, href] = markdownLink;
    const [before, after] = line.split(rawLink);
    return (
      <p key={line}>
        {before}
        <a href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
        {after}
      </p>
    );
  });
}

// ── Media preview ─────────────────────────────────────────────────────────────

function MediaPreview({ asset }: { asset: DumpAsset }) {
  if (asset.type === "video") {
    return (
      <LazyHoverVideo
        src={asset.src}
        poster={asset.coverSrc}
        aria-label={asset.title}
      />
    );
  }
  return (
    <img
      src={asset.coverSrc ?? asset.src}
      alt={asset.alt ?? asset.title}
      loading="lazy"
    />
  );
}

function getStatusLabel(asset: DumpAsset) {
  if (asset.websiteUrl) return "live";
  if (asset.type === "pdf") return `${asset.pageCount} pages`;
  return "archive";
}

type ProjectStyle = CSSProperties & {
  "--project-color": string;
};

function getProjectColor(index: number) {
  const colors = ["#3451d1", "#ff4a12", "#171717", "#ebe7dc", "#7a5cff"];
  return colors[index % colors.length];
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function AssetModal({
  asset,
  onClose,
}: {
  asset: DumpAsset;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.classList.add("personal-modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("personal-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="personal-modal" role="dialog" aria-modal="true">
      <button
        className="personal-modal__backdrop"
        type="button"
        aria-label="Close modal"
        onClick={onClose}
      />
      <article className="personal-modal__panel">
        <button
          className="personal-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="personal-modal__media">
          {asset.websiteUrl ? (
            <a href={asset.websiteUrl} target="_blank" rel="noreferrer" className="personal-modal__media-link">
              {asset.type === "video" ? (
                <LazyHoverVideo
                  src={asset.src}
                  poster={asset.coverSrc}
                  aria-label={asset.title}
                  loadImmediately
                  playImmediately
                  playOnHover={false}
                  playOnVisibleTouch={false}
                />
              ) : (
                <img src={asset.src} alt={asset.alt ?? asset.title} />
              )}
            </a>
          ) : asset.type === "video" ? (
            <LazyHoverVideo
              src={asset.src}
              poster={asset.coverSrc}
              aria-label={asset.title}
              loadImmediately
              playImmediately
              playOnHover={false}
              playOnVisibleTouch={false}
            />
          ) : asset.type === "pdf" ? (
            <iframe src={asset.src} title={asset.title} />
          ) : (
            <img src={asset.src} alt={asset.alt ?? asset.title} />
          )}
        </div>
        <div className="personal-modal__copy">
          <p>{getPrimaryTag(asset)}</p>
          <h2>{asset.title}</h2>
          <div>{renderDescription(asset.description)}</div>
          {asset.websiteUrl ? (
            <a href={asset.websiteUrl} target="_blank" rel="noreferrer" className="personal-modal__visit-btn">
              Visit site ↗
            </a>
          ) : null}
        </div>
      </article>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function PersonalExplorationsPage() {
  const [selectedAsset, setSelectedAsset] = useState<DumpAsset | null>(null);
  const [isChromeVisible, setIsChromeVisible] = useState(false);
  const [visibleProjectIds, setVisibleProjectIds] = useState<Set<string>>(
    () => new Set()
  );
  const pageRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const projectRefs = useRef<Map<string, HTMLElement>>(new Map());
  const soundRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentSoundRef = useRef<HTMLAudioElement | null>(null);
  const lastMoveSoundTimesRef = useRef<Map<string, number>>(new Map());
  const nextSoundIndexRef = useRef(0);

  useEffect(() => {
    let frameId = 0;

    function updateChromeVisibility() {
      const page = pageRef.current;
      if (!page) return;

      const rect = page.getBoundingClientRect();
      setIsChromeVisible(rect.top <= 0 && rect.bottom > 0);
    }

    function scheduleChromeVisibilityUpdate() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateChromeVisibility);
    }

    updateChromeVisibility();
    window.addEventListener("scroll", scheduleChromeVisibilityUpdate, { passive: true });
    window.addEventListener("resize", scheduleChromeVisibilityUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleChromeVisibilityUpdate);
      window.removeEventListener("resize", scheduleChromeVisibilityUpdate);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleProjectIds((currentIds) => {
          const nextIds = new Set(currentIds);

          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.projectId;
            if (!id) return;

            if (entry.isIntersecting) {
              nextIds.add(id);
            } else {
              nextIds.delete(id);
            }
          });

          return nextIds;
        });
      },
      { rootMargin: "-18% 0px -22% 0px", threshold: 0.16 }
    );

    projectRefs.current.forEach((project) => observer.observe(project));
    return () => observer.disconnect();
  }, []);

  function handleAssetClick(asset: DumpAsset) {
    setSelectedAsset(asset);
  }

  function getNextHoverSoundSrc(asset: DumpAsset) {
    if (asset.hoverSoundSrc) return asset.hoverSoundSrc;
    if (!playgroundSoundSources.length) return undefined;

    const soundSrc =
      playgroundSoundSources[
        nextSoundIndexRef.current % playgroundSoundSources.length
      ];

    nextSoundIndexRef.current =
      (nextSoundIndexRef.current + 1) % playgroundSoundSources.length;

    return soundSrc;
  }

  function playAssetHoverSound(asset: DumpAsset) {
    const currentSound = currentSoundRef.current;
    if (currentSound && !currentSound.paused && !currentSound.ended) return;

    const soundSrc = getNextHoverSoundSrc(asset);
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
  }

  function playAssetMoveSound(asset: DumpAsset) {
    const now = window.performance.now();
    const lastSoundTime = lastMoveSoundTimesRef.current.get(asset.id) ?? 0;

    if (now - lastSoundTime < HOVER_SOUND_MOVE_INTERVAL_MS) return;

    lastMoveSoundTimesRef.current.set(asset.id, now);
    playAssetHoverSound(asset);
  }

  return (
    <section
      className={[
        "personal-page",
        isChromeVisible ? "personal-page--chrome-visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="playground"
      aria-label="Playground"
      ref={pageRef}
    >
      <div className="personal-curtain" aria-hidden="true" />
      <h1 className="personal-bg-title">
        <span>play</span>
        <span>ground</span>
      </h1>
      <div className="personal-fixed-marks" aria-hidden="true">
        <span className="personal-fixed-mark personal-fixed-mark--tr" />
        <span className="personal-fixed-mark personal-fixed-mark--ml" />
        <span className="personal-fixed-mark personal-fixed-mark--mr" />
        <span className="personal-fixed-mark personal-fixed-mark--center" />
        <span className="personal-fixed-mark personal-fixed-mark--bc" />
        <span className="personal-fixed-mark personal-fixed-mark--br" />
      </div>
      <div className="personal-fixed-copy personal-fixed-copy--tl">
        <span>The Curious Archive</span>
        <span>Personal experiments, motion, interfaces</span>
      </div>
      <div className="personal-fixed-copy personal-fixed-copy--bl">
        <span>Tamara</span>
        <span>Playground</span>
        <span>Design & development</span>
      </div>
      <div className="personal-fixed-time">
        <ScrambleText text="ISTANBUL, (TR)" delay={1050} />
        <span className="personal-fixed-time__sep"> • </span>
        <span className="personal-fixed-time__clock"><LiveClock /></span>
      </div>

      <header className="personal-hero">
        <div className="personal-enter">
          <ScrambleText text="ENTER PLAYGROUND" delay={350} />
        </div>
        <div className="personal-scroll-hint" aria-hidden="true">
          <span>scroll to explore</span>
          <span className="personal-scroll-hint__arrow" />
        </div>
      </header>

      <main
        className="personal-projects"
        aria-label="Playground projects"
        ref={projectsRef}
      >
        {dumpAssets.map((asset, index) => (
          <article
            className={[
              "personal-project",
              `personal-project--layout-${(index % 6) + 1}`,
              visibleProjectIds.has(asset.id) ? "personal-project--visible" : "",
              index % 2 ? "personal-project--reverse" : "",
              getProjectColor(index) === "#ebe7dc" ? "personal-project--light" : "",
              getProjectColor(index) === "#121212" ? "personal-project--dark" : "",
              asset.websiteUrl ? "personal-project--live" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={asset.id}
            data-project-id={asset.id}
            ref={(node) => {
              if (node) {
                projectRefs.current.set(asset.id, node);
              } else {
                projectRefs.current.delete(asset.id);
              }
            }}
            style={{ "--project-color": getProjectColor(index) } as ProjectStyle}
          >
            <button
              className="personal-project__media"
              type="button"
              onClick={() => handleAssetClick(asset)}
              onMouseEnter={() => playAssetHoverSound(asset)}
              onMouseMove={() => playAssetMoveSound(asset)}
              onFocus={() => playAssetHoverSound(asset)}
              aria-label={`Open ${asset.title}`}
            >
              <MediaPreview asset={asset} />
            </button>

            <button
              className="personal-project__scroll-meta"
              type="button"
              onClick={() => handleAssetClick(asset)}
              aria-label={`Open ${asset.title}`}
            >
              <span>{String(index + 1).padStart(2, "0")} / {getPrimaryTag(asset)}</span>
              <span>{asset.title}</span>
              <span>{getStatusLabel(asset)}</span>
              <span>{asset.tags.join(" / ")}</span>
              <span>Open project</span>
            </button>
          </article>
        ))}
      </main>

      {/* ── Modal ── */}
      {selectedAsset ? (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      ) : null}
    </section>
  );
}

export default PersonalExplorationsPage;
