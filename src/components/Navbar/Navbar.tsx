import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  const { pathname } = useLocation()
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsCompact(pathname !== '/' || window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

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
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
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
        <a href="#cv">CV</a>
      </div>
    </nav>
  )
}

export default Navbar
