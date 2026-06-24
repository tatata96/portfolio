import './home_page.css'
import WorkPage from '../work/WorkPage'

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-heading">
        <h1 id="home-heading">
          hi, i'm <em>tamara.</em>
        </h1>
        <div className="home-hero__copy" aria-label="Introduction">
          <p className="home-hero__copy-left">
            Trained in Computer Science, I have spent the last six years working
            as a frontend engineer, translating ideas into products used by
            thousands of people across web and mobile platforms.
          </p>
          <p className="home-hero__copy-right">
            Too curious to stay in one discipline. What started as a career in
            frontend development gradually expanded into an interest in design,
            visual storytelling, and creating experiences that connect
            technology with people.
          </p>
        </div>
      </section>
      <WorkPage />
    </main>
  )
}

export default HomePage
