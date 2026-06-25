import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  const { pathname } = useLocation()
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsCompact(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleWorkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    document.getElementById('work')?.scrollIntoView({
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
        <a href="#cv">CV</a>
        <Link to="/#work" onClick={handleWorkClick}>Work</Link>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
