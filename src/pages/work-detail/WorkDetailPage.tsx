import {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import photifyScreen1 from "../../assets/photify/photify_screen_1.jpeg";
import photifyScreen2 from "../../assets/photify/photify_screen_2.jpeg";
import photifyScreen3 from "../../assets/photify/photify_screen_3.jpeg";
import photifyScreen4 from "../../assets/photify/photify_screen_4.jpeg";
import photifyScreen5 from "../../assets/photify/photify_screen_5.jpeg";
import {workItems} from "../work/workItems";
import "./work_detail_page.css";

const caseStudySections = [
  {
    id: "context",
    title: "Context",
    heading: "Event photography creates thousands of photos.",
    body: "At concerts, festivals, conferences, and social events, photographers capture countless moments that participants may never see again.\n\nA familiar experience inspired this project: noticing a photographer take your photo, then never knowing where that image ended up. Even when galleries are published, attendees are often expected to manually search through hundreds or thousands of photos to find themselves.",
  },
  {
    id: "solution",
    title: "Solution",
    heading: "A selfie becomes the search query.",
    body: "Photify transforms a complex image-matching process into a simple user experience. Attendees join an event, upload a selfie, and receive a personalized gallery of photos in which they appear.\n\nThe goal was to make photo discovery effortless while maintaining transparency and trust around the use of facial recognition technology.",
  },
  {
    id: "solution-walkthrough",
    title: "Features",
    heading: "Designed to make photo discovery effortless",
    body: "",
  },
  {
    id: "interaction-design",
    title: "My Role",
    heading: "Co-founder, product designer, and technical lead",
    body: "Phoütify was built from the ground up with a former college classmate. As co-founders, we collaborated closely on the product vision and strategy, while taking ownership of different areas of the business.\n\nMy co-founder led marketing, sales, and partnership efforts, while I was responsible for product design, user experience, and technical implementation from concept through launch.",
  },
  {
    id: "reflection",
    title: "Reflection",
    heading: "A foundation for richer project pages",
    body: "This version keeps the content lightweight, but the structure can support image grids, process notes, launch links, and final results without changing the core interaction model.",
  },
];

const solutionSteps = [
  {
    number: "1",
    label: "Phone Verification",
    screenTitle: "Phone Verification",
    screenBody:
      "Users create an account using their phone number and a one-time verification code, providing a simple and secure onboarding experience.",
    image: photifyScreen1,
  },
  {
    number: "2",
    label: "Upload Selfie",
    screenTitle: "Upload Selfie",
    screenBody:
      "Users upload a selfie that serves as their visual identifier. This image is used to match them with photos captured during events.",
    image: photifyScreen2,
  },
  {
    number: "3",
    label: "Scan QR",
    screenTitle: "Scan QR",
    screenBody:
      "Attendees can quickly access an event by scanning a QR code provided by the organizer, removing the need for manual event searches.",
    image: photifyScreen3,
  },
  {
    number: "4",
    label: "Join Event",
    screenTitle: "Join Event",
    screenBody:
      "After joining, users can view all events they are participating in and track the status of photo processing and matching.",
    image: photifyScreen4,
  },
  {
    number: "5",
    label: "Personal Gallery",
    screenTitle: "Personal Gallery",
    screenBody:
      "Once matching is complete, users receive a personalized gallery containing only the photos in which they appear, making photo discovery effortless.",
    image: photifyScreen5,
  },
];

const roleSections = [
  {
    title: "Product & Design",
    paragraphs: [
      "I led the product and design process from concept to launch, marking the first time I was fully responsible for designing an entire product experience from scratch.",
      "Our goal was to create a product that could be comfortably used by a wide range of event attendees, regardless of age or technical familiarity.",
      "Every design decision was guided by simplicity, clarity, and trust.",
      "I tried to develop a visual identity that felt warm, and energetic. This direction influenced everything from the logo and branding to the interface language and interaction patterns.",
    ],
    bullets: [
      "Defined the end-to-end user journey",
      "Established the visual identity, design language, and component patterns",
      "Iterated on flows based on testing and real-world feedback",
    ],
    callout:
      "The primary challenge was not the matching technology itself, but creating an experience that felt simple, trustworthy, and accessible to first-time users.",
    insight: {
      title: "Designing Through Prototyping",
      body: "Rather than following a traditional workflow of fully designing screens in Figma before implementation, I adopted a more iterative approach. Leveraging AI-assisted development tools and my experience building reusable design systems, I was able to rapidly prototype ideas directly in code and evaluate them in a real environment. Because our component system, typography scales, spacing tokens, and color foundations were designed to be reusable, visual exploration could happen simultaneously with implementation. This significantly shortened feedback loops and allowed design decisions to be validated through working prototypes rather than static mockups.",
    },
  },
  {
    title: "Frontend Development",
    paragraphs: [
      "Because frontend development is already my area of expertise, implementation became an extension of the design process. Familiar tools, reusable systems, and AI-assisted development allowed ideas to move quickly from concept to working prototype, creating a tighter feedback loop between design and execution. I was responsible for all frontend development across both the mobile application and marketing website.",
    ],
    bullets: [
      "Mobile application development",
      "Marketing website design and development",
      "User onboarding and event flows",
      "API integrations",
      "App Store deployment",
    ],
  },
  {
    title: "Backend & Infrastructure",
    paragraphs: [
      "Having worked alongside backend engineers throughout my career, I was already familiar with many backend concepts and system design discussions. However, building and maintaining the backend myself required a much deeper understanding of how these systems operate in practice.",
      "Using Django, I designed and implemented the backend powering the application. AI tools, particularly Claude, played an important role throughout this process—not only as coding assistants, but as learning tools that helped me understand unfamiliar concepts, evaluate architectural decisions, and deepen my understanding of backend development.",
    ],
    bullets: [
      "Built backend services using Django",
      "Designed user, event, and photo management systems",
      "Implemented APIs supporting the mobile application",
      "Managed authentication, storage, and media workflows",
      "Integrated facial recognition and photo matching processes",
    ],
    callout:
      "This experience transformed backend development from something I collaborated with into something I could confidently design, build, and reason about myself.",
  },
];

function WorkDetailPage() {
  const {slug} = useParams();
  const workItem = workItems.find((item) => item.slug === slug);
  const [activeSectionId, setActiveSectionId] = useState(
    caseStudySections[0].id,
  );
  const [activeSolutionStep, setActiveSolutionStep] = useState(0);
  const currentSolutionStep = solutionSteps[activeSolutionStep];

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
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
          ^ Back to top
        </button>
      </aside>

      <div className="work-detail-content">
        <section className="work-detail-snapshot" aria-label="Project snapshot">
          <header className="work-detail-snapshot__header">
            <h2>Project Snapshot</h2>
          </header>

          <div className="work-detail-snapshot__body">
            <div className="work-detail-snapshot__column">
              <div className="work-detail-snapshot__item">
                <h3>Client</h3>
                <p>Self-initiated startup project</p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Product</h3>
                <p>Photify - AI-powered event photo discovery platform</p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Duration</h3>
                <p>2026</p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Capacity</h3>
                <p>Product Design, Frontend Development, Backend Development</p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Team Model</h3>
                <p>Built with one collaborator</p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Status</h3>
                <p>Launched MVP</p>
              </div>
            </div>

            <div className="work-detail-snapshot__column">
              <div className="work-detail-snapshot__item">
                <h3>In a Nutshell</h3>
                <p>
                  Photify helps event attendees instantly find photos of
                  themselves using facial recognition. Instead of manually
                  searching through hundreds of event photos, users upload a
                  selfie and receive a personalized gallery of matched images.
                </p>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Impact</h3>
                <ul>
                  <li>
                    Reduced photo discovery from hundreds of images to a
                    personalized selection
                  </li>
                  <li>
                    Released a production-ready mobile application on the App
                    Store
                  </li>
                  <li>
                    Shipped and owned a complete product from concept to
                    deployment
                  </li>
                </ul>
              </div>
              <div className="work-detail-snapshot__item">
                <h3>Tags</h3>
                <div className="work-detail-snapshot__tags">
                  {[
                    "Product Design",
                    "Mobile App",
                    "AI",
                    "Facial Recognition",
                    "React Native",
                    "Django",
                    "UX Design",
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
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
              {section.id === "solution-walkthrough" ? (
                <div className="solution-walkthrough">
                  <p className="solution-walkthrough__intro">
                    The goal was to create a flow simple enough for any event
                    attendee to complete in under a minute. Each step was
                    designed to reduce friction while building trust around the
                    use of facial recognition technology.
                  </p>

                  <div
                    className="solution-walkthrough__steps"
                    aria-label="Photify solution steps"
                  >
                    {solutionSteps.map((step, stepIndex) => (
                      <button
                        className={
                          stepIndex === activeSolutionStep
                            ? "solution-step solution-step--active"
                            : "solution-step"
                        }
                        key={step.number}
                        type="button"
                        onClick={() => setActiveSolutionStep(stepIndex)}
                      >
                        <span>{step.number}</span>
                        <div>
                          <strong>{step.label}</strong>
                          <p>{step.screenBody}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="solution-phone" aria-live="polite">
                    <div className="solution-phone__device">
                      <div className="solution-phone__screen">
                        <div className="solution-phone__island" />
                        <img
                          src={currentSolutionStep.image}
                          alt={`${currentSolutionStep.screenTitle} screen`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === "interaction-design" ? (
                <div className="role-section-list">
                  {section.body
                    .split("\n\n")
                    .map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

                  <div className="role-subsections">
                    {roleSections.map((roleSection, roleSectionIndex) => (
                      <div
                        className="role-subsection"
                        key={
                          typeof roleSection === "string"
                            ? roleSection
                            : roleSection.title
                        }
                      >
                        <h3>
                          <span className="role-subsection__pill">
                            <span>{roleSectionIndex + 1}</span>
                            {typeof roleSection === "string"
                              ? roleSection
                              : roleSection.title}
                          </span>
                        </h3>
                        {typeof roleSection !== "string" ? (
                          <div className="role-subsection__content">
                            {roleSection.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                            <ul>
                              {roleSection.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
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
                    ))}
                  </div>
                </div>
              ) : (
                section.body
                  .split("\n\n")
                  .map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default WorkDetailPage;
