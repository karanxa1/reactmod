import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navLinkVariants = {
    hover: {
      y: -2,
      color: "#667eea"
    }
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
              <h1>MODZY</h1>
              <p>Download & enjoy</p>
            </div>
          </Link>
          
          <nav className="nav">
            <motion.div variants={navLinkVariants} whileHover="hover">
              <Link to="/" className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}>
                Home
                {isActiveLink('/') && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.div>
            <motion.div variants={navLinkVariants} whileHover="hover">
              <Link to="/games" className={`nav-link ${isActiveLink('/games') ? 'active' : ''}`}>
                Games
                {isActiveLink('/games') && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.div>
            <motion.div variants={navLinkVariants} whileHover="hover">
              <Link to="/apps" className={`nav-link ${isActiveLink('/apps') ? 'active' : ''}`}>
                Apps
                {isActiveLink('/apps') && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.div>
            <motion.div variants={navLinkVariants} whileHover="hover">
              <Link to="/blog" className={`nav-link ${isActiveLink('/blog') ? 'active' : ''}`}>
                Blog
                {isActiveLink('/blog') && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.div>
            <motion.div variants={navLinkVariants} whileHover="hover">
              <Link to="/faq" className={`nav-link ${isActiveLink('/faq') ? 'active' : ''}`}>
                FAQ
                {isActiveLink('/faq') && <motion.div className="active-indicator" layoutId="activeIndicator" />}
              </Link>
            </motion.div>
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