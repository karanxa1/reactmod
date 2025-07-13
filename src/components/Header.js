import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just alert the search query
      alert(`Searching for: ${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>📱</span>
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
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button className="search-btn" onClick={toggleSearch} title="Search">
              🔍
            </button>
          </div>
        </div>
        
        {showSearch && (
          <div className="search-overlay">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search apps, games, or blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-submit">Search</button>
              <button type="button" onClick={toggleSearch} className="search-close">×</button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 