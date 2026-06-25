import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { Link } from "react-router-dom";
import { dumpAssets, type DumpAsset } from "../../assets/dump/dumpAssets";
import me2Image from "../../assets/me2.png";
import "./personal_explorations_page.css";

// Reference viewport — all asset x/y/width are in this coordinate space
const STAGE_W = 1440;
const STAGE_H = 900;

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

// ── Types ─────────────────────────────────────────────────────────────────────

type FloatingStyle = CSSProperties & {
  "--asset-left": string;
  "--asset-top": string;
  "--asset-width": string;
  "--asset-parallax-x": string;
  "--asset-parallax-y": string;
  "--asset-float-x": string;
  "--asset-float-y": string;
  "--asset-rotate": string;
};

type CursorStyle = CSSProperties & {
  "--cursor-x": string;
  "--cursor-y": string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getAssetStyle(
  asset: DumpAsset,
  index: number,
  isActive: boolean,
  stageFloat: { x: number; y: number }
): FloatingStyle {
  const depth = 10 + (index % 5) * 4;

  return {
    "--asset-left": `${((asset.x / STAGE_W) * 100).toFixed(2)}%`,
    "--asset-top": `${((asset.y / STAGE_H) * 100).toFixed(2)}%`,
    "--asset-width": `${((asset.width / STAGE_W) * 100).toFixed(2)}%`,
    "--asset-parallax-x": `${(stageFloat.x * depth).toFixed(2)}px`,
    "--asset-parallax-y": `${(stageFloat.y * depth).toFixed(2)}px`,
    "--asset-float-x": isActive ? "var(--active-float-x)" : "0px",
    "--asset-float-y": isActive ? "var(--active-float-y)" : "0px",
    "--asset-rotate": isActive ? "var(--active-rotate)" : "0deg",
  };
}

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
      <video
        src={asset.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
                <video src={asset.src} autoPlay muted loop playsInline />
              ) : (
                <img src={asset.src} alt={asset.alt ?? asset.title} />
              )}
            </a>
          ) : asset.type === "video" ? (
            <video src={asset.src} autoPlay muted loop playsInline />
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
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<DumpAsset | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isTextPreviewVisible, setIsTextPreviewVisible] = useState(false);
  const [stageFloat, setStageFloat] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement | null>(null);

  function handleStagePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setStageFloat({ x, y });
  }

  function handlePointerMove(asset: DumpAsset, event: PointerEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const rx = (event.clientX - rect.left) / rect.width - 0.5;
    const ry = (event.clientY - rect.top) / rect.height - 0.5;
    target.style.setProperty("--active-float-x", `${rx * 28}px`);
    target.style.setProperty("--active-float-y", `${ry * 22}px`);
    target.style.setProperty("--active-rotate", `${rx * 2.2}deg`);
    target.style.setProperty("--asset-meta-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--asset-meta-y", `${event.clientY - rect.top}px`);
    setActiveAssetId(asset.id);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  }

  function handleAssetClick(asset: DumpAsset) {
    setSelectedAsset(asset);
  }

  function handleTextPreviewPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    setIsTextPreviewVisible(true);
  }

  return (
    <main className="personal-page">
      <div className="personal-curtain" aria-hidden="true" />

      <div
        className="personal-stage"
        ref={stageRef}
        onPointerMove={handleStagePointerMove}
        onPointerLeave={() => setStageFloat({ x: 0, y: 0 })}
      >

        {/* ── Top-left: back link ── */}
        <Link className="personal-corner personal-corner--tl" to="/#work">
          <ScrambleText text="← WORK" delay={1050} />
        </Link>

        {/* ── Top-right: location + live clock ── */}
        <div className="personal-corner personal-corner--tr">
          <ScrambleText text="ISTANBUL, (TR)" delay={1050} />
          <span className="personal-corner__sep"> • </span>
          <span className="personal-corner__time"><LiveClock /></span>
        </div>

        {/* ── Assets ── */}
        {dumpAssets.map((asset, index) => {
          const isActive = activeAssetId === asset.id;

          return (
            <button
              key={asset.id}
              className={[
                "personal-asset",
                asset.className ?? "",
                asset.websiteUrl ? "personal-asset--live" : "",
                isActive ? "personal-asset--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              style={getAssetStyle(asset, index, isActive, stageFloat)}
              onClick={() => handleAssetClick(asset)}
              onPointerEnter={(e) => handlePointerMove(asset, e)}
              onPointerMove={(e) => handlePointerMove(asset, e)}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty("--active-float-x", "0px");
                e.currentTarget.style.setProperty("--active-float-y", "0px");
                e.currentTarget.style.setProperty("--active-rotate", "0deg");
                setActiveAssetId(null);
              }}
            >
              <span className="personal-asset__float-wrapper">
                <span className="personal-asset__media">
                  <MediaPreview asset={asset} />
                </span>
                <span
                  className="personal-asset__meta"
                  aria-hidden={!isActive}
                >
                  <span>{getPrimaryTag(asset)}</span>
                  <span>{asset.title}</span>
                  <span>
                    {asset.websiteUrl
                      ? "↗ live"
                      : asset.type === "pdf"
                      ? `${asset.pageCount} pages`
                      : "archived"}
                  </span>
                </span>
              </span>
            </button>
          );
        })}

        {/* ── Center title ── */}
        <div
          className="personal-title personal-text-preview-trigger"
          onPointerEnter={handleTextPreviewPointerMove}
          onPointerMove={handleTextPreviewPointerMove}
          onPointerLeave={() => setIsTextPreviewVisible(false)}
        >
          <h1 className="personal-title__line">
            <ScrambleText text="Personal" delay={1100} />
          </h1>
          <h1 className="personal-title__line">
            <ScrambleText text="Explorations" delay={1250} />
          </h1>
        </div>

        {/* ── Bottom-left: studio info ── */}
        <div
          className="personal-corner personal-corner--bl personal-text-preview-trigger"
          onPointerEnter={handleTextPreviewPointerMove}
          onPointerMove={handleTextPreviewPointerMove}
          onPointerLeave={() => setIsTextPreviewVisible(false)}
        >
          <span>— TAMARA</span>
          <span>— PERSONAL EXPLORATIONS</span>
          <span>— DESIGN & DEVELOPMENT</span>
        </div>

        {/* ── Bottom-center: count ── */}
        <div className="personal-count">
          <span>({dumpAssets.length})</span>
        </div>

      </div>

      {/* ── Hover cursor ── */}
      {activeAssetId ? (
        <span
          className="personal-cursor"
          style={
            {
              "--cursor-x": `${cursorPosition.x}px`,
              "--cursor-y": `${cursorPosition.y}px`,
            } as CursorStyle
          }
          aria-hidden="true"
        />
      ) : null}

      {isTextPreviewVisible ? (
        <img
          className="personal-text-preview"
          src={me2Image}
          alt=""
          aria-hidden="true"
        />
      ) : null}

      {/* ── Modal ── */}
      {selectedAsset ? (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      ) : null}
    </main>
  );
}

export default PersonalExplorationsPage;
