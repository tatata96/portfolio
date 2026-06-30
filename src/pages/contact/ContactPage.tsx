import singleTImage from "../../assets/personal/t-single.png";
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
        <div className="contact-page__panel">
          <img
            className="contact-page__single-t"
            src={singleTImage}
            alt=""
            aria-hidden="true"
          />
          <p className="contact-page__eyebrow">Contact</p>
          <a className="contact-page__email" href="mailto:tamarakozok@gmail.com">
            tamarakozok@gmail.com
          </a>
          <div className="contact-page__links" aria-label="Social links">
            <a
              href="https://github.com/tatata96"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tamara-kozok/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
