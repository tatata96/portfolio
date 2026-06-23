import "./work_card.css";

export type WorkCardData = {
  title: string;
  description: string;
  role: string;
  time: string;
  image: string;
  tags: string[];
};

type WorkCardProps = {
  item: WorkCardData;
  number: number;
};

function WorkCard({ item, number }: WorkCardProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <article className="work-card">
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
    </article>
  );
}

export default WorkCard;
