import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Carpool</h4>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard">🏠 Home</Link></li>
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/create-ride">🚗 Post Ride</Link></li>
        <li><Link  to ="/available-rides"> Available Rides</Link></li>
        <li><Link  to ="/my-rides"> My Rides</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
