import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Smartphone size={24} />
            </div>
            <div className="logo-text">
              <h1>MODZ</h1>
              <p>Download & enjoy</p>
            </div>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/games" className={`nav-link ${isActiveLink('/games') ? 'active' : ''}`}>Games</Link>
            <Link to="/apps" className={`nav-link ${isActiveLink('/apps') ? 'active' : ''}`}>Apps</Link>
            <Link to="/blog" className={`nav-link ${isActiveLink('/blog') ? 'active' : ''}`}>Blog</Link>
            <Link to="/faq" className={`nav-link ${isActiveLink('/faq') ? 'active' : ''}`}>FAQ</Link>
          </nav>
          
          <div className="header-actions">
            {/* Theme toggle and search buttons removed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 