import { useState, type CSSProperties, type MouseEvent } from "react";
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

type CursorStyle = CSSProperties & {
  "--work-card-cursor-bg"?: string;
  "--work-card-cursor-color"?: string;
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

  function updateCursorPosition(event: MouseEvent<HTMLElement>) {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  const cursorStyle: CursorStyle | undefined = cursorPosition
    ? {
        left: cursorPosition.x,
        top: cursorPosition.y,
        "--work-card-cursor-bg": item.cursorColor,
        "--work-card-cursor-color": item.cursorTextColor,
      }
    : undefined;
  const cardStyle: CardStyle = {
    "--work-card-project-bg": item.cursorColor,
    "--work-card-project-color": item.cursorTextColor,
  };
  const marqueeTags = [...item.tags, ...item.tags];

  return (
    <Link
      to={`/work/${item.slug}`}
      className={`work-card${cursorPosition ? " work-card--cursor-active" : ""}`}
      style={cardStyle}
      onMouseEnter={updateCursorPosition}
      onMouseLeave={() => setCursorPosition(null)}
      onMouseMove={updateCursorPosition}
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

      {cursorPosition && (
        <span
          className="work-card__cursor"
          style={cursorStyle}
          aria-hidden="true"
        >
          VIEW CASE STUDY
        </span>
      )}
    </Link>
  );
}

export default WorkCard;
