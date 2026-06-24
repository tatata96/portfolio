import './home_page.css'
import WorkPage from '../work/WorkPage'

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <h1>Homepage</h1>
        <p>Welcome to my portfolio.</p>
      </section>
      <WorkPage />
    </main>
  )
}

export default HomePage
