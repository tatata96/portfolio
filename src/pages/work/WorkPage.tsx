import "./work_page.css";
import WorkCard, { type WorkCardData } from "../../components/WorkCard/WorkCard";
import projectImage from "../../assets/photify/photify-3d-yellow-bg-logo.jpeg";

const workItems: WorkCardData[] = [
  {
    title: "Editorial Portfolio System",
    description:
      "A flexible portfolio concept for designers to present selected work with quiet structure, clear project context, and image-led storytelling.",
    role: "Product Design, Frontend",
    time: "2026",
    image: projectImage,
    tags: ["Portfolio", "Design System", "React"],
  },
];

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
        {workItems.map((item, index) => (
          <WorkCard item={item} key={item.title} number={index + 1} />
        ))}
      </section>
    </main>
  );
}

export default WorkPage;
