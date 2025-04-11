import React from 'react'
import "../index.css"; 

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg link-navy  px-4">
    <span className="navbar-brand">Carpooling App</span>

    <div className="ms-auto">
      <Link to ="/profile" className="btn btn-outline-light">Profile</Link>
    </div>
  </nav>

  )
}

export default Navbar
