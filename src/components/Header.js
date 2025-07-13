import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>📱</span>
            </div>
            <div className="logo-text">
              <h1>Jar MOD</h1>
              <p>Download & enjoy</p>
            </div>
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/games" className="nav-link">Games</Link>
            <Link to="/apps" className="nav-link">Apps</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
          </nav>
          
          <div className="header-actions">
            <button className="theme-toggle">🌙</button>
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 