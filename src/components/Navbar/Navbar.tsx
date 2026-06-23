import { NavLink } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  return (
    <nav className="nav">
      <NavLink className="nav-name" to="/">
        Tamara Kozok
      </NavLink>
      <div className="nav-links" aria-label="Primary navigation">
        <a href="#cv">CV</a>
        <NavLink to="/work">Work</NavLink>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
