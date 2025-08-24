import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Smartphone, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const popularApps = [
    { name: 'Instagram Mod APK', path: '/instagram-mods' },
    { name: 'WhatsApp Mod APK', path: '/whatsapp-mods' },
    { name: 'Telegram Mod APK', path: '/telegram-mods' },
    { name: 'Educational Mod Apps', path: '/educational-mods' }
  ];

  return (
    <motion.div 
      className="not-found-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="not-found-content">
        {/* 404 Hero Section */}
        <div className="not-found-hero">
          <motion.div 
            className="error-code"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            404
          </motion.div>
          
          <motion.h1 
            className="error-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Oops! Page Not Found
          </motion.h1>
          
          <motion.p 
            className="error-description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            The page you're looking for doesn't exist or has been moved.
            <br />Don't worry, let's get you back to discovering amazing mod apps!
          </motion.p>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/" className="action-button primary">
            <Home size={20} />
            Back to Home
          </Link>
          
          <button 
            className="action-button secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </motion.div>

        {/* Popular Categories */}
        <motion.section 
          className="popular-section"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <h2 className="section-title">
            <Smartphone size={24} />
            Popular Mod Categories
          </h2>
          
          <div className="popular-grid">
            {popularApps.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 + (index * 0.1), duration: 0.4 }}
              >
                <Link to={app.path} className="popular-card">
                  <Download size={20} />
                  <span>{app.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Help Section */}
        <motion.div 
          className="help-section"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <h3>Need Help?</h3>
          <p>
            If you believe this is an error, please contact us through our 
            <a href="https://t.me/keyisheremybaby" target="_blank" rel="noopener noreferrer">
              Telegram channel
            </a>
            . We're here to help!
          </p>
        </motion.div>

        {/* SEO-friendly content */}
        <div className="seo-content">
          <h4>What you can do on MODZY:</h4>
          <ul>
            <li>Download premium Instagram mod APK files</li>
            <li>Get the latest WhatsApp mod applications</li>
            <li>Explore Telegram mod APK downloads</li>
            <li>Discover educational and utility mod apps</li>
            <li>Access safe and verified mod app downloads</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;