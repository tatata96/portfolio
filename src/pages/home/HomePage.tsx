import { useState, type PointerEvent } from 'react'
import './home_page.css'
import meImage from '../../assets/me.png'
import WorkPage from '../work/WorkPage'

function HomePage() {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  function handleHeroPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return

    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  return (
    <main className="home-page">
      <section
        className={`home-hero${cursorPosition ? ' home-hero--cursor-active' : ''}`}
        aria-labelledby="home-heading"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setCursorPosition(null)}
      >
        <div className="home-hero__inner">
          <h1 id="home-heading">
            hi, i'm <em>tamara.</em>
          </h1>
          <img className="home-hero__portrait" src={meImage} alt="" />
          <div className="home-hero__copy" aria-label="Introduction">
            <p className="home-hero__copy-left">
              Trained in Computer Science, I have spent the last six years
              working as a frontend engineer, translating ideas into products
              used by thousands of people across web and mobile platforms.
            </p>
            <p className="home-hero__copy-right">
              Too curious to stay in one discipline. What started as a career in
              frontend development gradually expanded into an interest in
              design, visual storytelling, and creating experiences that connect
              technology with people.
            </p>
          </div>
        </div>
        {cursorPosition && (
          <div
            className="home-cursor"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
            aria-hidden="true"
          />
        )}
      </section>
      <WorkPage />
    </main>
  )
}

export default HomePage
