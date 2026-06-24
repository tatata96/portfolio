import "./work_page.css";
import WorkCard from "../../components/WorkCard/WorkCard";
import { workItems } from "./workItems";

function WorkPage() {
  return (
    <main className="work-page">
      <section className="work-intro" aria-labelledby="work-heading">
        <h1 id="work-heading">Work</h1>
        <p>
          Selected projects across digital products, systems, and visual
          direction.
        </p>
      </section>

      <section className="work-list" aria-label="Selected work">
        {workItems.map((item) => (
          <WorkCard item={item} key={item.title} />
        ))}
      </section>
    </main>
  );
}

export default WorkPage;
