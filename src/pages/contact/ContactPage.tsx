import "./contact_page.css";

function ContactPage() {
  return (
    <section
      className="contact-page"
      id="contact"
      aria-label="Contact"
    >
      <div className="contact-page__marks" aria-hidden="true">
        <span className="contact-page__mark contact-page__mark--tr" />
        <span className="contact-page__mark contact-page__mark--ml" />
        <span className="contact-page__mark contact-page__mark--mr" />
        <span className="contact-page__mark contact-page__mark--bc" />
        <span className="contact-page__mark contact-page__mark--br" />
      </div>
      <div className="contact-page__inner">
        <div className="contact-page__intro">
          <p className="contact-page__eyebrow">Contact</p>
          <p className="contact-page__text">
            Thanks for stopping by.
            <br />
            I live for genuine human
            connection—don't hesitate to reach out.
          </p>
        </div>
        <div className="contact-page__links" aria-label="Contact links">
          <a
            className="contact-page__card contact-page__card--email"
            href="mailto:tamarakozok@gmail.com"
          >
            <span className="contact-page__card-title">tamarakozok@gmail.com</span>
          </a>
          <a
            className="contact-page__card contact-page__card--github"
            href="https://github.com/tatata96"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-page__card-title">GitHub</span>
          </a>
          <a
            className="contact-page__card contact-page__card--linkedin"
            href="https://www.linkedin.com/in/tamara-kozok/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-page__card-title">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
