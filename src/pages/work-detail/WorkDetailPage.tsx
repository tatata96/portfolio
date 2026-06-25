import {useEffect, useState, type CSSProperties} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {workItems} from "../work/workItems";
import {
  caseStudies,
  type CaseStudySection,
  type RoleSection,
  type SnapshotItem,
} from "./caseStudies";
import FeatureWalkthrough from "./FeatureWalkthrough";
import "./work_detail_page.css";

type ProjectAccentStyle = CSSProperties & {
  "--project-accent": string;
  "--project-accent-soft": string;
  "--project-accent-text": string;
  "--project-accent-rgb": string;
  "--project-collage-bg": string;
  "--project-shadow-rgb": string;
};

const emptySections: CaseStudySection[] = [];

function renderParagraphs(body: string) {
  return body
    .split("\n\n")
    .filter(Boolean)
    .map((paragraph) => <p key={paragraph}>{paragraph}</p>);
}

function renderSnapshotItem(item: SnapshotItem) {
  return (
    <div className="work-detail-snapshot__item" key={item.label}>
      <h3>{item.label}</h3>
      {item.value ? <p>{item.value}</p> : null}
      {item.bullets ? (
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {item.tags ? (
        <div className="work-detail-snapshot__tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function renderRoleSubsections(roleSections: RoleSection[]) {
  if (roleSections.length === 0) {
    return null;
  }

  return (
    <div className="role-subsections">
      {roleSections.map((roleSection, roleSectionIndex) => {
        const hasContent =
          roleSection.paragraphs.length > 0 ||
          roleSection.bullets.length > 0 ||
          Boolean(roleSection.callout) ||
          Boolean(roleSection.insight);

        return (
          <div className="role-subsection" key={roleSection.title}>
            <h3>
              <span className="role-subsection__pill">
                <span>{roleSectionIndex + 1}</span>
                {roleSection.title}
              </span>
            </h3>
            {hasContent ? (
              <div className="role-subsection__content">
                {roleSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {roleSection.bullets.length > 0 ? (
                  <ul>
                    {roleSection.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {roleSection.callout ? (
                  <p className="role-subsection__callout">
                    {roleSection.callout}
                  </p>
                ) : null}
                {roleSection.insight ? (
                  <aside className="role-subsection__insight">
                    <h4>{roleSection.insight.title}</h4>
                    <div>{roleSection.insight.body}</div>
                  </aside>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function renderSectionImage(section: CaseStudySection) {
  if (!section.images || section.images.length === 0) {
    return null;
  }

  return (
    <div className="work-detail-section__image-grid">
      {section.images.map((image) => (
        <figure
          className={
            image.size === "compact"
              ? "work-detail-section__image work-detail-section__image--compact"
              : "work-detail-section__image"
          }
          key={image.src}
        >
          <img src={image.src} alt={image.alt} />
        </figure>
      ))}
    </div>
  );
}

function renderSolutionPolaroids(
  polaroids?: {
    src: string;
    alt: string;
  }[],
) {
  if (!polaroids || polaroids.length === 0) {
    return null;
  }

  return (
    <div className="solution-polaroids" aria-label="Photify visual gallery">
      {polaroids.map((polaroid) => (
        <figure className="solution-polaroid" key={polaroid.src}>
          <img src={polaroid.src} alt={polaroid.alt} />
        </figure>
      ))}
    </div>
  );
}

function WorkDetailPage() {
  const {slug} = useParams();
  const workItem = workItems.find((item) => item.slug === slug);
  const caseStudy = slug ? caseStudies[slug] : undefined;
  const sections = caseStudy?.sections ?? emptySections;
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");
  const [composedSectionId, setComposedSectionId] = useState("");
  const [floatingVisualVisible, setFloatingVisualVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "instant"});
  }, [slug]);

  useEffect(() => {
    let animationFrameId = 0;

    function updateActiveSection() {
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter((element): element is HTMLElement => Boolean(element));

      const activationLine = window.innerHeight * 0.36;
      const activeElement =
        sectionElements
          .filter(
            (element) => element.getBoundingClientRect().top <= activationLine,
          )
          .at(-1) ?? sectionElements[0];
      const compositionLine = Math.min(120, window.innerHeight * 0.16);
      const composedElement = sectionElements.find((element) => {
        const rect = element.getBoundingClientRect();

        return rect.top <= compositionLine && rect.bottom > compositionLine;
      });

      if (activeElement) {
        setActiveSectionId(activeElement.id);
      }

      setComposedSectionId(composedElement?.id ?? "");
    }

    function requestActiveSectionUpdate() {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", requestActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestActiveSectionUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
    };
  }, [sections]);

  useEffect(() => {
    const revealSectionId = caseStudy?.floatingVisual?.revealSectionId;
    let animationFrameId = 0;

    function updateFloatingVisualVisible(visible: boolean) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(() => {
        setFloatingVisualVisible(visible);
      });
    }

    if (!revealSectionId) {
      updateFloatingVisualVisible(false);

      return () => window.cancelAnimationFrame(animationFrameId);
    }

    const revealSection = document.getElementById(revealSectionId);

    if (!revealSection) {
      updateFloatingVisualVisible(false);

      return () => window.cancelAnimationFrame(animationFrameId);
    }

    if (!("IntersectionObserver" in window)) {
      updateFloatingVisualVisible(true);

      return () => window.cancelAnimationFrame(animationFrameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFloatingVisualVisible(entry.isIntersecting),
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(revealSection);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [caseStudy?.floatingVisual?.revealSectionId, slug]);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  if (!workItem || !caseStudy) {
    return <Navigate to="/#work" replace />;
  }

  const accentStyle: ProjectAccentStyle = {
    "--project-accent": caseStudy.accent.color,
    "--project-accent-soft": caseStudy.accent.soft,
    "--project-accent-text": caseStudy.accent.text,
    "--project-accent-rgb": caseStudy.accent.rgb,
    "--project-collage-bg": caseStudy.accent.collageBackground,
    "--project-shadow-rgb": caseStudy.accent.shadow,
  };

  return (
    <main className="work-detail-page" style={accentStyle}>
      <aside className="work-detail-sidebar" aria-label="Case study navigation">
        <Link className="work-detail-sidebar__home" to="/#work">
          {"← WORK"}
        </Link>

        <nav className="work-detail-toc" aria-label="Table of contents">
          <ol>
            {sections.map((section, index) => (
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
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
          ↑ TOP
        </button>
      </aside>

      <div className="work-detail-content">
        <section className="work-detail-snapshot" aria-label="Project snapshot">
          <header className="work-detail-snapshot__header">
            <h2>Project Snapshot</h2>
          </header>

          <div className="work-detail-snapshot__body">
            <div className="work-detail-snapshot__column">
              {caseStudy.snapshot.left.map(renderSnapshotItem)}
            </div>

            <div className="work-detail-snapshot__column">
              {caseStudy.snapshot.right.map(renderSnapshotItem)}
            </div>
          </div>
        </section>

        <div className="work-detail-sections">
          {sections.map((section, index) => (
            <section
              className={
                section.id === composedSectionId
                  ? "work-detail-section work-detail-section--composed"
                  : "work-detail-section"
              }
              id={section.id}
              key={section.id}
            >
              <p className="work-detail-section__eyebrow">
                {String(index + 1).padStart(2, "0")}. {section.title}
              </p>
              <h2>{section.heading}</h2>
              {caseStudy.floatingVisual?.revealSectionId === section.id ? (
                <div
                  className={
                    floatingVisualVisible
                      ? "work-detail-section__floating-visual work-detail-section__floating-visual--visible"
                      : "work-detail-section__floating-visual"
                  }
                  aria-hidden="true"
                >
                  <img
                    src={caseStudy.floatingVisual.image}
                    alt={caseStudy.floatingVisual.imageAlt}
                  />
                </div>
              ) : null}
              {section.variant === "walkthrough" && caseStudy.walkthrough ? (
                <FeatureWalkthrough walkthrough={caseStudy.walkthrough} />
              ) : section.variant === "overview" ? (
                <div className="solution-overview">
                  {renderParagraphs(section.body)}

                  {renderSolutionPolaroids(caseStudy.solutionPolaroids)}

                  {caseStudy.solutionOverview ? (
                    <figure className="solution-collage">
                      <img
                        src={caseStudy.solutionOverview.image}
                        alt={caseStudy.solutionOverview.imageAlt}
                      />
                      <figcaption className="solution-collage__copy">
                        <span>{caseStudy.solutionOverview.captionKicker}</span>
                        <strong>
                          {caseStudy.solutionOverview.captionTitle}
                        </strong>
                      </figcaption>
                    </figure>
                  ) : null}
                </div>
              ) : section.variant === "role" && caseStudy.roleSections ? (
                <div className="role-section-list">
                  {renderParagraphs(section.body)}
                  {renderSectionImage(section)}

                  {renderRoleSubsections(
                    section.subsections ?? caseStudy.roleSections,
                  )}
                </div>
              ) : section.variant === "reflection" &&
                caseStudy.reflectionCards ? (
                <div className="reflection-card-grid">
                  {caseStudy.reflectionCards.map((card) => (
                    <article className="reflection-card" key={card.title}>
                      <h3>{card.title}</h3>
                      {renderParagraphs(card.body)}
                    </article>
                  ))}
                </div>
              ) : (
                renderParagraphs(section.body)
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default WorkDetailPage;
