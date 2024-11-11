import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar({ isLoggedIn, handleLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleExternalLink = (url) => {
    window.location.href = url;
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="C:\Users\nvs20\Desktop\JFST\reactunit3\typroject1\my-app\public\assets\logo .png" alt="Logo" />
      </div>

      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          Menu
        </button>
        {dropdownOpen && (
          <ul className="dropdown-content">
            <li><Link to="/">Home</Link></li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
            <li onClick={() => handleExternalLink("https://cumminscollege.org/placements/placement-statistics/")}>
              Placement Statistics
            </li>
            <li><Link to="/aboutus">About Us</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
