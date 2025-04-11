import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      {/* Top navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">Carpooling App</span>

        <div className="ms-auto">
          <Link to="/profile" className="btn btn-outline-light">
            Profile
          </Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mt-4">
        <h2>Welcome to your Dashboard!</h2>
        <p>This is where your dashboard content will go.</p>
      </div>
    </div>
  );
};

export default Dashboard;
