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

function renderSectionCallout(callout?: string) {
  if (!callout) {
    return null;
  }

  const [intro, ...items] = callout.split("\n").filter(Boolean);

  return (
    <aside className="work-detail-section__callout">
      <p>{intro}</p>
      {items.length > 0 ? (
        <div className="work-detail-section__callout-items">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
    </aside>
  );
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

function renderInsightParagraphs(body: string) {
  const paragraphs = body.split("\n\n").filter(Boolean);
  const bodyParagraphs = paragraphs.slice(0, -1);

  return (
    <ol className="product-design-insight__list">
      {bodyParagraphs.map((paragraph) => (
        <li key={paragraph}>{paragraph}</li>
      ))}
    </ol>
  );
}

function renderInsightStandalone(body: string) {
  const paragraphs = body.split("\n\n").filter(Boolean);
  if (paragraphs.length === 0) return null;
  const last = paragraphs[paragraphs.length - 1];
  return (
    <p className="product-design-insight__standalone" key={last}>
      {last}
    </p>
  );
}

function renderDevelopmentRoleCard(
  roleSection: RoleSection,
  includeVisual = true,
) {
  return (
    <div
      className={
        includeVisual && roleSection.visual
          ? "development-role-card development-role-card--with-visual"
          : "development-role-card"
      }
    >
      <div className="development-role-card__copy">
        {roleSection.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {roleSection.bullets.length > 0 ? (
          <div
            className="development-role-card__tasks"
            aria-label={`${roleSection.title} responsibilities`}
          >
            {roleSection.bullets.map((bullet) => (
              <span key={bullet}>{bullet}</span>
            ))}
          </div>
        ) : null}

        {roleSection.callout ? (
          <p className="development-role-card__callout">
            {roleSection.callout}
          </p>
        ) : null}
      </div>

      {includeVisual && roleSection.visual ? (
        <figure className="development-role-card__visual">
          <img src={roleSection.visual.src} alt={roleSection.visual.alt} />
          <figcaption>{roleSection.visual.label}</figcaption>
        </figure>
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
        const nextRoleSection = roleSections[roleSectionIndex + 1];
        const previousRoleSection = roleSections[roleSectionIndex - 1];
        const isFrontendSection = roleSection.title === "Frontend Development";
        const isBackendSection =
          roleSection.title === "Backend & Infrastructure";
        const isDevelopmentPairStart =
          isFrontendSection &&
          nextRoleSection?.title === "Backend & Infrastructure";
        const isDevelopmentPairContinuation =
          isBackendSection &&
          previousRoleSection?.title === "Frontend Development";
        const hasContent =
          roleSection.paragraphs.length > 0 ||
          roleSection.bullets.length > 0 ||
          Boolean(roleSection.callout) ||
          Boolean(roleSection.insight);
        const isProductDesignSection = roleSection.title === "Product & Design";
        const isDevelopmentSection =
          roleSection.title === "Frontend Development" ||
          roleSection.title === "Backend & Infrastructure";
        const isProjectRoleSection = roleSection.title === "My Role";
        const isTakeawaySection = roleSection.title === "Key Takeaway";
        const introParagraphs = isProductDesignSection
          ? roleSection.paragraphs.slice(0, 2)
          : roleSection.paragraphs;
        const principleParagraphs = isProductDesignSection
          ? roleSection.paragraphs.slice(2)
          : [];

        if (isDevelopmentPairContinuation) {
          return null;
        }

        if (isDevelopmentPairStart && nextRoleSection) {
          const developmentVisuals =
            roleSection.visuals ??
            nextRoleSection.visuals ??
            [roleSection.visual ?? nextRoleSection.visual].filter(
              (visual): visual is NonNullable<RoleSection["visual"]> =>
                Boolean(visual),
            );

          return (
            <div
              className="role-subsection role-subsection--development-group"
              key="development-role-group"
            >
              <div className="development-role-pair">
                <div className="development-role-pair__content">
                  {[roleSection, nextRoleSection].map(
                    (developmentSection, developmentIndex) => (
                      <div
                        className="role-subsection role-subsection--development"
                        key={developmentSection.title}
                      >
                        <h3>
                          <span className="role-subsection__pill">
                            <span>{roleSectionIndex + developmentIndex + 1}</span>
                            {developmentSection.title}
                          </span>
                        </h3>
                        <div className="role-subsection__content">
                          {renderDevelopmentRoleCard(developmentSection, false)}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {developmentVisuals.length > 0 ? (
                  <div className="development-role-pair__visuals">
                    {developmentVisuals.map((visual) => (
                      <figure
                        className="development-role-pair__visual"
                        key={visual.src}
                      >
                        <img src={visual.src} alt={visual.alt} />
                        <figcaption>{visual.label}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        }

        return (
          <div
            className={
              isProductDesignSection
                ? "role-subsection role-subsection--product-design"
                : isDevelopmentSection
                  ? "role-subsection role-subsection--development"
                  : isProjectRoleSection
                    ? "role-subsection role-subsection--project-role"
                    : isTakeawaySection
                      ? "role-subsection role-subsection--takeaway"
                : "role-subsection"
            }
            key={roleSection.title}
          >
            <h3>
              <span className="role-subsection__pill">
                <span>{roleSectionIndex + 1}</span>
                {roleSection.title}
              </span>
            </h3>
            {hasContent ? (
              <div className="role-subsection__content">
                {isProductDesignSection ? (
                  <div className="product-design-layout">
                    <div className="product-design-layout__intro">
                      {introParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {roleSection.callout ? (
                      <p className="product-design-layout__callout">
                        {roleSection.callout}
                      </p>
                    ) : null}

                    {principleParagraphs.length > 0 ? (
                      <div
                        className="product-design-principles"
                        aria-label="Product and design principles"
                      >
                        {principleParagraphs.map((paragraph, index) => (
                          <article
                            className="product-design-principle"
                            key={paragraph}
                          >
                            <span>{index === 0 ? "Principle" : "Identity"}</span>
                            <p>{paragraph}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}

                    {roleSection.bullets.length > 0 ? (
                      <div
                        className="product-design-actions"
                        aria-label="Product and design responsibilities"
                      >
                        {roleSection.bullets.map((bullet, index) => (
                          <article
                            className="product-design-action"
                            key={bullet}
                          >
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <p>{bullet}</p>
                          </article>
                        ))}
                      </div>
                    ) : null}

                    {roleSection.insight ? (
                      <aside className="role-subsection__insight product-design-layout__insight">
                        <div className="product-design-insight__copy">
                          <span>Process note</span>
                          <h4>{roleSection.insight.title}</h4>
                          <div className="product-design-insight__body">
                            {renderInsightParagraphs(roleSection.insight.body)}
                          </div>
                        </div>

                        {roleSection.insight.images ? (
                          <div
                            className="product-design-insight__visuals"
                            aria-label="Design and implementation artifacts"
                          >
                            {roleSection.insight.images.map((image) => (
                              <figure
                                className="product-design-insight__visual"
                                key={image.src}
                              >
                                <img src={image.src} alt={image.alt} />
                                <figcaption>{image.label}</figcaption>
                              </figure>
                            ))}
                          </div>
                        ) : null}

                        {renderInsightStandalone(roleSection.insight.body)}
                      </aside>
                    ) : null}
                  </div>
                ) : isDevelopmentSection ? (
                  renderDevelopmentRoleCard(roleSection)
                ) : isProjectRoleSection ? (
                  renderDevelopmentRoleCard(roleSection, false)
                ) : isTakeawaySection ? (
                  <aside className="project-role-takeaway">
                    {introParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </aside>
                ) : (
                  <>
                    {introParagraphs.map((paragraph) => (
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
                  </>
                )}
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

function renderSolutionBadges(
  badges?: {
    src: string;
    alt: string;
  }[],
) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className="solution-badges" aria-label="Brik achievement badges">
      <div className="solution-badges__track">
        <div className="solution-badges__group">
          {badges.map((badge) => (
            <figure className="solution-badge" key={badge.src}>
              <img src={badge.src} alt={badge.alt} />
            </figure>
          ))}
        </div>
        <div className="solution-badges__group" aria-hidden="true">
          {badges.map((badge) => (
            <figure className="solution-badge" key={`repeat-${badge.src}`}>
              <img src={badge.src} alt="" />
            </figure>
          ))}
        </div>
      </div>
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
        <button
          className="work-detail-print-btn"
          type="button"
          onClick={() => window.print()}
        >
          Print / Save as PDF
        </button>

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

                  {renderSolutionBadges(caseStudy.solutionBadges)}

                  {caseStudy.solutionOverview && !caseStudy.solutionBadges ? (
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
                  {section.callout ? (
                    <div className="role-section-list__intro">
                      <div>{renderParagraphs(section.body)}</div>
                      {renderSectionCallout(section.callout)}
                    </div>
                  ) : (
                    renderParagraphs(section.body)
                  )}
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
                <>
                  {renderParagraphs(section.body)}
                  {renderSectionImage(section)}
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default WorkDetailPage;
