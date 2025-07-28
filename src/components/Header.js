import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinkVariants = {
    hover: {
      y: -2,
      color: "#667eea"
    }
  };

  const navigationItems = [
    { path: '/apps', label: 'Apps' },
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <div className="logo-glow"></div>
              <Smartphone size={24} />
            </div>
            <div className="logo-text">
              <h1>MODZY</h1>
              <p>Download & enjoy</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <div className="nav-wrapper">
              {navigationItems.map((item) => (
                <motion.div key={item.path} variants={navLinkVariants} whileHover="hover">
                  <Link to={item.path} className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}>
                    <div className="nav-icon">
                      {item.path === '/apps' && '📱'}
                      {item.path === '/' && '🏠'}
                      {item.path === '/games' && '🎮'}
                      {item.path === '/blog' && '📝'}
                      {item.path === '/faq' && '❓'}
                    </div>
                    <span className="nav-text">{item.label}</span>
                    {isActiveLink(item.path) && <motion.div className="active-indicator" layoutId="activeIndicator" />}
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;