import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  getPlaygroundSoundMuted,
  PLAYGROUND_SOUND_MUTED_EVENT,
  setPlaygroundSoundMuted,
} from '../../utils/playgroundSoundPreference'
import './navbar.css'

function SoundOnIcon() {
  return (
    <svg
      className="nav-sound-button__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 16V8h3l5-4v16l-5-4H3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 9s2 .5 2 3-2 3-2 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7s3 .83 3 5-3 5-3 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 5s4 1.17 4 7-4 7-4 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SoundOffIcon() {
  return (
    <svg
      className="nav-sound-button__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 16V8h3l5-4v16l-5-4H3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14.5 15 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m14.5 9 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Navbar() {
  const { pathname } = useLocation()
  const [isCompact, setIsCompact] = useState(false)
  const [isPlaygroundSoundMuted, setIsPlaygroundSoundMuted] = useState(
    getPlaygroundSoundMuted,
  )

  useEffect(() => {
    function handleScroll() {
      setIsCompact(pathname !== '/' || window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    function handleSoundMutedChange(event: Event) {
      setIsPlaygroundSoundMuted((event as CustomEvent<boolean>).detail)
    }

    window.addEventListener(PLAYGROUND_SOUND_MUTED_EVENT, handleSoundMutedChange)
    return () => {
      window.removeEventListener(
        PLAYGROUND_SOUND_MUTED_EVENT,
        handleSoundMutedChange,
      )
    }
  }, [])

  function handleSoundToggle() {
    setPlaygroundSoundMuted(!isPlaygroundSoundMuted)
  }

  function handleWorkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    document.getElementById('work')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function handlePlaygroundClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    document.getElementById('playground')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function handleContactClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }

  function handleNameClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <nav className={`nav${isCompact ? ' nav--compact' : ''}`}>
      <NavLink className="nav-name" to="/" onClick={handleNameClick}>
        Tamara Kozok
      </NavLink>
      <div className="nav-links" aria-label="Primary navigation">
        <Link to="/#work" onClick={handleWorkClick}>Work</Link>
        <Link to="/#playground" onClick={handlePlaygroundClick}>Playground</Link>
        <Link to="/#contact" onClick={handleContactClick}>Contact</Link>
        <button
          type="button"
          className="nav-sound-button"
          onClick={handleSoundToggle}
          aria-pressed={isPlaygroundSoundMuted}
          aria-label={
            isPlaygroundSoundMuted
              ? "Turn playground sounds on"
              : "Silence playground sounds"
          }
        >
          {isPlaygroundSoundMuted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
