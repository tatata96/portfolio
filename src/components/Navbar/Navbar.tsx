import { Link, NavLink, useLocation } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  const { pathname } = useLocation()

  function handleWorkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/') return

    event.preventDefault()
    document.getElementById('work')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="nav">
      <NavLink className="nav-name" to="/">
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
