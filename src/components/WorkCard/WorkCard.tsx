import { useState, type CSSProperties, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./work_card.css";

export type WorkCardData = {
  slug: string;
  title: string;
  description: string;
  role: string;
  time: string;
  image: string;
  tags: string[];
  cursorColor?: string;
  cursorTextColor?: string;
};

type WorkCardProps = {
  item: WorkCardData;
};

type CardStyle = CSSProperties & {
  "--work-card-project-bg"?: string;
  "--work-card-project-color"?: string;
};

function WorkCard({ item }: WorkCardProps) {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const cursorStyle: CardStyle = {
    "--work-card-project-bg": item.cursorColor,
    "--work-card-project-color": item.cursorTextColor,
  };
  const marqueeTags = [...item.tags, ...item.tags];

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;

    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return (
    <>
      <Link
        to={`/work/${item.slug}`}
        className={`work-card${cursorPosition ? " work-card--cursor-active" : ""}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setCursorPosition(null)}
      >
        <div className="work-card__image">
          <img src={item.image} alt="" />
        </div>

        <div className="work-card__content">
          <h2>{item.title}</h2>
          <p>{item.role}</p>

          <div className="work-card__tags" aria-label={`${item.title} tags`}>
            <div className="work-card__tag-track">
              {marqueeTags.map((tag, index) => (
                <span key={`${tag}-${index}`}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      {cursorPosition &&
        createPortal(
          <div
            className="work-card-cursor"
            style={{
              ...cursorStyle,
              left: cursorPosition.x,
              top: cursorPosition.y,
            }}
            aria-hidden="true"
          >
            View case
          </div>,
          document.body,
        )}
    </>
  );
}

export default WorkCard;
