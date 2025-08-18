import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AppCard from './components/AppCard';
import Footer from './components/Footer';
import TelegramPopup from './components/TelegramPopup';

import ErrorBoundary from './components/ErrorBoundary';
import { subscribeToApps, preloadApps } from './firebase/appService';
import './App.css';

// Lazy load non-critical components for better performance
const TermsConditions = lazy(() => import('./components/TermsConditions'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

// Home Page Component
const HomePage = ({ apps, isLoading, isMobile, handleOpenTelegramPopup }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.08,
        delayChildren: 0.1
      }
    }
  };

  const LoadingSkeleton = () => (
    <div className="loading-skeleton">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-category"></div>
            <div className="skeleton-details">
              <div className="skeleton-detail"></div>
              <div className="skeleton-detail"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="main-content">
      <div className="container">
        <div className="hero-section">
          <motion.h1 
            className="main-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Premium Mobile Apps
          </motion.h1>
          <motion.p 
            className="main-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            Discover our carefully curated collection of premium mobile applications
          </motion.p>
        </div>
        
        <motion.section 
          id="apps"
          className="apps-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="apps-grid">
              {apps.map((app, index) => (
                <AppCard 
                  key={app.id} 
                  app={app} 
                  index={index} 
                  onOpenTelegramPopup={handleOpenTelegramPopup}
                />
              ))}
            </div>
          )}
        </motion.section>
        
        <motion.div 
          id="featured"
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Downloads</h3>
              <p>Lightning-fast download speeds for all your favorite apps</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>All apps are thoroughly tested and verified for security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Curated Selection</h3>
              <p>Hand-picked premium apps for the best user experience</p>
            </div>
          </div>
        </motion.div>
        
        {/* Additional sections for navigation */}
        <div id="categories" className="section-spacer"></div>
        <div id="new" className="section-spacer"></div>
        <div id="popular" className="section-spacer"></div>
        <div id="help" className="section-spacer"></div>
        <div id="faq" className="section-spacer"></div>
        <div id="contact" className="section-spacer"></div>
      </div>
    </main>
  );
};

function App() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTelegramPopupOpen, setIsTelegramPopupOpen] = useState(false);

  const [selectedApp, setSelectedApp] = useState(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch apps from Firebase with performance optimization
  useEffect(() => {
    // Preload apps for better performance
    preloadApps();
    
    const unsubscribe = subscribeToApps((appsData) => {
      setApps(appsData);
      setIsLoading(false);
      
      // Performance monitoring
      if (window.performance && window.performance.mark) {
        window.performance.mark('apps-loaded');
        window.performance.measure('app-loading-time', 'navigationStart', 'apps-loaded');
      }
    });

    return () => unsubscribe();
  }, []);

  // Modal handlers
  const handleOpenTelegramPopup = (app) => {
    setSelectedApp(app);
    setIsTelegramPopupOpen(true);
  };

  const handleCloseTelegramPopup = () => {
    setIsTelegramPopupOpen(false);
    setSelectedApp(null);
  };



  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <ErrorBoundary>
      <Router>
        <motion.div 
          className={`App ${isMobile ? 'mobile' : 'desktop'}`}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
        <Header />
        
        <Suspense fallback={
          <div className="loading-fallback">
            <div className="spinner"></div>
          </div>
        }>
          <Routes>
            <Route 
               path="/" 
               element={
                 <HomePage 
                   apps={apps}
                   isLoading={isLoading}
                   isMobile={isMobile}
                   handleOpenTelegramPopup={handleOpenTelegramPopup}
                 />
               } 
             />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
        
        {/* Global Telegram Popup */}
        <TelegramPopup 
          isOpen={isTelegramPopupOpen}
          onClose={handleCloseTelegramPopup}
          app={selectedApp}
        />
         

      </motion.div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
