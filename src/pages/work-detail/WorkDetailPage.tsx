import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { workItems } from "../work/workItems";
import "./work_detail_page.css";

const caseStudySections = [
  {
    id: "context",
    title: "Context",
    heading: "A portfolio system built around project clarity",
    body: "The project started as a way to make selected work easier to scan without losing the story behind each decision. The page gives each project a clear hierarchy: what it is, what I did, when it happened, and why it matters.",
  },
  {
    id: "solution",
    title: "The solution",
    heading: "A reusable case study template",
    body: "The work page and detail page share a single project record, so the listing card and the case study stay aligned. This keeps the system simple while leaving space for deeper sections, imagery, and links later.",
  },
  {
    id: "features",
    title: "Features",
    heading: "Designed for scanning and reading",
    body: "The layout uses a sticky table of contents, active section tracking, and click-to-scroll navigation. Readers can jump to the parts they care about while still understanding the full structure of the case study.",
  },
  {
    id: "interaction-design",
    title: "Interaction design",
    heading: "The page responds as the reader moves",
    body: "As each section reaches the reading zone, the table of contents updates the active item. Clicking a title scrolls directly to the matching section, making the left index feel connected to the content.",
  },
  {
    id: "reflection",
    title: "Reflection",
    heading: "A foundation for richer project pages",
    body: "This version keeps the content lightweight, but the structure can support image grids, process notes, launch links, and final results without changing the core interaction model.",
  },
];

function WorkDetailPage() {
  const { slug } = useParams();
  const workItem = workItems.find((item) => item.slug === slug);
  const [activeSectionId, setActiveSectionId] = useState(caseStudySections[0].id);
  const activeSection = useMemo(
    () =>
      caseStudySections.find((section) => section.id === activeSectionId) ??
      caseStudySections[0],
    [activeSectionId],
  );

  useEffect(() => {
    const sectionElements = caseStudySections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.12, 0.32, 0.58],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (!workItem) {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="work-detail-page">
      <aside className="work-detail-sidebar" aria-label="Case study navigation">
        <Link className="work-detail-sidebar__home" to="/work">
          {"<- Work"}
        </Link>

        <nav className="work-detail-toc" aria-label="Table of contents">
          <p>Table of contents</p>
          <ol>
            {caseStudySections.map((section, index) => (
              <li key={section.id}>
                <button
                  className={
                    section.id === activeSectionId
                      ? "work-detail-toc__item work-detail-toc__item--active"
                      : "work-detail-toc__item"
                  }
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                >
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <button
          className="work-detail-sidebar__top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ^ Back to top
        </button>
      </aside>

      <div className="work-detail-content">
        <section className="work-detail-hero" aria-labelledby="case-study-title">
          <img src={workItem.image} alt="" />
          <div className="work-detail-kicker">
            <span>Case study</span>
            <span>{workItem.time}</span>
          </div>
          <h1 id="case-study-title">{workItem.title}</h1>
          <p>{workItem.description}</p>
        </section>

        <section className="work-detail-summary" aria-label="Project summary">
          <div>
            <h2>Role</h2>
            <p>{workItem.role}</p>
          </div>
          <div>
            <h2>Timeline</h2>
            <p>{workItem.time}</p>
          </div>
          <div>
            <h2>Skills</h2>
            <p>{workItem.tags.join(", ")}</p>
          </div>
          <div>
            <h2>Active section</h2>
            <p>{activeSection.title}</p>
          </div>
        </section>

        <div className="work-detail-sections">
          {caseStudySections.map((section, index) => (
            <section
              className="work-detail-section"
              id={section.id}
              key={section.id}
            >
              <p className="work-detail-section__eyebrow">
                {String(index + 1).padStart(2, "0")}. {section.title}
              </p>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default WorkDetailPage;
