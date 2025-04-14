import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Create and use this CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";   // ✅ Force full reload to reset state
};

  return (
    <nav className="navbar">
  <div className="container-fluid">
    <span className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
      🚗 Carpooling
    </span>
    <div className="d-flex">
      <button className="btn btn-outline-light me-2" onClick={() => navigate('/profile')}>
        Profile
      </button>
      <button className="btn btn-outline-light" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
