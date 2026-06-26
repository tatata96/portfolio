import { useState, type PointerEvent } from "react";
import cursorTextImage from "../../assets/cursor1.png";
import cursorImage from "../../assets/cursor2.png";
import phoneImage from "../../assets/contact/phone.png";
import me2Image from "../../assets/me2.png";
import "./contact_page.css";

function ContactPage() {
  const [isTextPreviewVisible, setIsTextPreviewVisible] = useState(false);
  const [isTextCursorVisible, setIsTextCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function showTextPreview() {
    setIsTextPreviewVisible(true);
    setIsTextCursorVisible(true);
  }

  function hideTextPreview() {
    setIsTextPreviewVisible(false);
    setIsTextCursorVisible(false);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;

    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return (
    <section
      className={[
        "contact-page",
        cursorPosition ? "contact-page--cursor-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="contact"
      aria-label="Contact"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCursorPosition(null)}
    >
      <div className="contact-page__copy">
        <p className="contact-page__eyebrow">contact</p>
        <h1
          tabIndex={0}
          onFocus={showTextPreview}
          onBlur={hideTextPreview}
        >
          <span
            className="contact-page__headline-line contact-page__preview-trigger"
            onPointerEnter={showTextPreview}
            onPointerLeave={hideTextPreview}
          >
            Write me,
          </span>
          <span
            className="contact-page__headline-line contact-page__preview-trigger"
            onPointerEnter={showTextPreview}
            onPointerLeave={hideTextPreview}
          >
            maybe?
          </span>
        </h1>
        <a
          href="mailto:tamarakozok@gmail.com"
          className="contact-page__email contact-page__preview-trigger"
          onFocus={showTextPreview}
          onBlur={hideTextPreview}
          onPointerEnter={showTextPreview}
          onPointerLeave={hideTextPreview}
        >
          tamarakozok@gmail.com
        </a>
      </div>

      <img
        className="contact-page__phone"
        src={phoneImage}
        alt="Red cord phone"
        loading="eager"
      />

      <div className="contact-page__links" aria-label="Social links">
        <a
          href="https://github.com/tatata96"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a
          href="https://www.linkedin.com/in/tamara-kozok/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>
        <a href="mailto:tamarakozok@gmail.com">email</a>
      </div>

      <img
        className={[
          "contact-page__text-preview",
          isTextPreviewVisible ? "contact-page__text-preview--visible" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        src={me2Image}
        alt=""
        aria-hidden="true"
      />

      {cursorPosition ? (
        <img
          className={[
            "contact-page__cursor",
            isTextCursorVisible ? "contact-page__cursor--text" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          src={isTextCursorVisible ? cursorTextImage : cursorImage}
          alt=""
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
          aria-hidden="true"
        />
      ) : null}
    </section>
  );
}

export default ContactPage;
