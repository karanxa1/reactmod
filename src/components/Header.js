import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkVariants = {
    hover: {
      y: -2,
      color: "#667eea"
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const mobileMenuItemVariants = {
    closed: {
      x: 50,
      opacity: 0
    },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const navigationItems = [
    { path: '/apps', label: 'Apps' },
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' }
  ];

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
          
          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            {navigationItems.map((item) => (
              <motion.div key={item.path} variants={navLinkVariants} whileHover="hover">
                <Link to={item.path} className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}>
                  {item.label}
                  {isActiveLink(item.path) && <motion.div className="active-indicator" layoutId="activeIndicator" />}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          <div className="header-actions">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                className="mobile-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.nav
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mobile-menu-content">
                <div className="mobile-menu-header">
                  <div className="mobile-menu-logo">
                    <Smartphone size={20} />
                    <span>MODZY</span>
                  </div>
                  <button
                    className="mobile-menu-close"
                    onClick={toggleMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mobile-menu-user">
                  <div className="user-avatar">
                    <span className="avatar-icon">👤</span>
                  </div>
                  <div className="user-info">
                    <span className="user-name">Welcome!</span>
                    <span className="user-status">Explore premium apps</span>
                  </div>
                </div>
                
                <div className="mobile-menu-links">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      custom={index}
                      variants={mobileMenuItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                      >
                        <div className="nav-link-content">
                          <div className="nav-link-icon">
                            {item.path === '/apps' && '📱'}
                            {item.path === '/' && '🏠'}
                            {item.path === '/games' && '🎮'}
                            {item.path === '/blog' && '📝'}
                            {item.path === '/faq' && '❓'}
                          </div>
                          <div className="nav-link-text">
                            <span className="nav-link-title">{item.label}</span>
                            <span className="nav-link-subtitle">
                              {item.path === '/apps' && 'Browse premium apps'}
                              {item.path === '/' && 'Back to homepage'}
                              {item.path === '/games' && 'Discover games'}
                              {item.path === '/blog' && 'Latest updates'}
                              {item.path === '/faq' && 'Get help & support'}
                            </span>
                          </div>
                        </div>
                        {isActiveLink(item.path) && (
                          <motion.div 
                            className="mobile-active-indicator"
                            layoutId="mobileActiveIndicator"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mobile-menu-extra">
                  <div className="menu-stats">
                    <div className="stat-item">
                      <span className="stat-number">50K+</span>
                      <span className="stat-label">Downloads</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">2+</span>
                      <span className="stat-label">Premium Apps</span>
                    </div>
                  </div>

                  <button
                    className="telegram-cta-button"
                    onClick={() => {
                      window.open('https://t.me/keyisheremybaby', '_blank');
                      toggleMobileMenu();
                    }}
                  >
                    <div className="telegram-icon">📱</div>
                    <div className="telegram-text">
                      <span className="cta-title">Join Telegram</span>
                      <span className="cta-subtitle">Get instant access</span>
                    </div>
                  </button>
                </div>
                
                <div className="mobile-menu-footer">
                  <div className="footer-links">
                    <button
                      className="footer-link"
                      onClick={() => {
                        window.open('https://t.me/keyisheremybaby', '_blank');
                        toggleMobileMenu();
                      }}
                    >
                      Support
                    </button>
                    <button
                      className="footer-link"
                      onClick={() => {
                        alert('Privacy Policy - Coming Soon!');
                        toggleMobileMenu();
                      }}
                    >
                      Privacy
                    </button>
                    <button
                      className="footer-link"
                      onClick={() => {
                        alert('Terms of Service - Coming Soon!');
                        toggleMobileMenu();
                      }}
                    >
                      Terms
                    </button>
                  </div>
                  <p className="footer-tagline">Download & enjoy premium apps</p>
                  <p className="footer-version">v1.0.0</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 