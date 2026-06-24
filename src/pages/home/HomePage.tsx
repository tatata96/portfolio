import { useEffect, useRef, useState, type PointerEvent } from 'react'
import './home_page.css'
import meImage from '../../assets/me.png'
import birdVideo from '../../assets/home/bird.mp4'
import scribbleVideo from '../../assets/home/scribble.mp4'
import WorkPage from '../work/WorkPage'

function HomePage() {
  const scribbleDelayRef = useRef<number | null>(null)
  const [showBird, setShowBird] = useState(false)
  const [showScribble, setShowScribble] = useState(false)
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotionQuery.matches) {
      const scribbleTimeoutId = window.setTimeout(() => {
        setShowScribble(true)
      }, 1500)

      return () => window.clearTimeout(scribbleTimeoutId)
    }

    const birdTimeoutId = window.setTimeout(() => {
      setShowBird(true)
    }, 960)

    return () => {
      window.clearTimeout(birdTimeoutId)
      if (scribbleDelayRef.current) {
        window.clearTimeout(scribbleDelayRef.current)
      }
    }
  }, [])

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
            <span className="home-hero__title-word">hi,</span>{' '}
            <span className="home-hero__title-word">i'm</span>{' '}
            <em className="home-hero__title-word">tamara.</em>
          </h1>
          {showBird && (
            <video
              className="home-hero__bird"
              src={birdVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              onAnimationEnd={() => {
                setShowBird(false)
                scribbleDelayRef.current = window.setTimeout(() => {
                  setShowScribble(true)
                }, 350)
              }}
              aria-hidden="true"
            />
          )}
          {showScribble && (
            <video
              className="home-hero__scribble"
              src={scribbleVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          )}
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
