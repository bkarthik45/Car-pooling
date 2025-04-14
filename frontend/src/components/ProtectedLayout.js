import React from 'react';
import Navbar from './Navbar'; // Assuming you have Navbar.js
import Sidebar from './Sidebar';
import './ProtectedLayout.css'; // Create and use this CSS file

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
