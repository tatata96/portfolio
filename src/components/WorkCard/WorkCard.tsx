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
  number: number;
};

type CursorStyle = CSSProperties & {
  "--work-card-cursor-bg"?: string;
  "--work-card-cursor-color"?: string;
};

function WorkCard({ item, number }: WorkCardProps) {
  const formattedNumber = String(number).padStart(2, "0");
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

  return (
    <Link
      to={`/work/${item.slug}`}
      className={`work-card${cursorPosition ? " work-card--cursor-active" : ""}`}
      onMouseEnter={updateCursorPosition}
      onMouseLeave={() => setCursorPosition(null)}
      onMouseMove={updateCursorPosition}
    >
      <span className="work-card__hole" aria-hidden="true" />
      <span className="work-card__number" aria-label={`Project ${number}`}>
        {formattedNumber}
      </span>

      <div className="work-card__content">
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>

        <dl className="work-card__meta">
          <div>
            <dt>Role</dt>
            <dd>{item.role}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{item.time}</dd>
          </div>
        </dl>

        <div className="work-card__tags" aria-label={`${item.title} tags`}>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="work-card__image">
        <img src={item.image} alt="" />
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
