import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AppCard from './components/AppCard';
import Footer from './components/Footer';
import TelegramPopup from './components/TelegramPopup';
import SEOStructuredData from './components/SEOStructuredData';
import Breadcrumb from './components/Breadcrumb';
import DynamicSEO from './components/DynamicSEO';
import ModAppFAQ from './components/ModAppFAQ';

import NativeBannerTop from './components/NativeBannerTop';

import ErrorBoundary from './components/ErrorBoundary';
import { subscribeToApps, preloadApps } from './firebase/appService';
import './App.css';

// Lazy load non-critical components for better performance
const TermsConditions = lazy(() => import('./components/TermsConditions'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const AdTest = lazy(() => import('./components/AdTest'));
const NotFound = lazy(() => import('./components/NotFound'));
const TelegramPopupDemo = lazy(() => import('./components/TelegramPopupDemo'));

// Home Page Component
const HomePage = ({ apps, isLoading, isMobile, handleOpenTelegramPopup, highlightedAppId, setHighlightedAppId }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreRef = useRef(null);

  // Incrementally render more cards to reduce initial work
  useEffect(() => {
    if (isLoading) return;
    // After first paint, increase a bit more when idle
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(() => setVisibleCount((c) => Math.min(c + 8, apps.length)))
      : setTimeout(() => setVisibleCount((c) => Math.min(c + 8, apps.length)), 300);
    return () => {
      if (typeof idleId === 'number') clearTimeout(idleId);
      else if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
    };
  }, [isLoading, apps.length]);

  // Infinite scroll style load-more on intersection
  useEffect(() => {
    if (!loadMoreRef.current || isLoading) return;
    const target = loadMoreRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleCount((c) => Math.min(c + 12, apps.length));
      }
    }, { rootMargin: '200px 0px' });
    observer.observe(target);
    return () => observer.unobserve(target);
  }, [isLoading, apps.length]);
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
            MODZY - Premium Mobile Apps Marketplace
          </motion.h1>
          <motion.h2 
            className="main-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            Download Best Mod Apps & Premium Android Applications
          </motion.h2>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            Discover and download premium mobile apps including Instagram mod apk, Telegram mod apk, WhatsApp mod, and exclusive Android applications. 
            Safe mod apk downloads with latest versions and regular updates.
          </motion.p>
        </div>
        
        {/* Top Native Banner - Optimized for Mobile */}
        <NativeBannerTop />
        
        <motion.section 
          id="apps"
          className="apps-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="section-title">Featured Mobile Applications</h2>
          <p className="section-description">
            Discover our curated collection of premium mobile apps and games. 
            All applications are thoroughly tested and verified for security.
          </p>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="apps-grid">
              {apps.slice(0, visibleCount).map((app, index) => {
                // Generate app ID for highlighting (same logic as share button)
                const appId = app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const isHighlighted = highlightedAppId === appId;
                
                return (
                  <AppCard 
                    key={app.id}
                    app={app}
                    index={index}
                    isMobile={isMobile}
                    onOpenTelegramPopup={handleOpenTelegramPopup}
                    isHighlighted={isHighlighted}
                    onHighlightComplete={() => setHighlightedAppId(null)}
                  />
                );
              })}
            </div>
          )}
        </motion.section>

        {/* Load-more sentinel */}
        {!isLoading && visibleCount < apps.length && (
          <div ref={loadMoreRef} style={{ height: 1 }} />
        )}
        

        
        <motion.section 
          id="featured"
          className="features-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="section-title">Why Choose MODZY?</h2>
          <p className="section-description">
            Experience the best mobile app marketplace with premium features and secure downloads.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Downloads</h3>
              <p>Lightning-fast download speeds for all your favorite mobile applications</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>All application files are thoroughly tested and verified for security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Curated Selection</h3>
              <p>Hand-picked premium applications for the best user experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Optimized</h3>
              <p>Perfect experience across all devices and screen sizes</p>
            </div>
          </div>
        </motion.section>
        
        {/* App Categories Section */}
        <motion.section 
          id="categories"
          className="categories-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <h2 className="section-title">Popular App Categories</h2>
          <p className="section-description">
            Explore mobile applications organized by categories to find exactly what you need.
          </p>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Social Media Apps</h3>
              <p>Instagram, Telegram, WhatsApp and other social networking applications</p>
              <a href="#apps" className="category-link">Browse Social Apps</a>
            </div>
            <div className="category-card">
              <h3>Educational Apps</h3>
              <p>Learning tools, study apps, and educational content for all ages</p>
              <a href="#apps" className="category-link">Browse Educational Apps</a>
            </div>
            <div className="category-card">
              <h3>Utility Apps</h3>
              <p>Productivity tools, file managers, and utility applications</p>
              <a href="#apps" className="category-link">Browse Utility Apps</a>
            </div>
            <div className="category-card">
              <h3>Entertainment Apps</h3>
              <p>Games, streaming apps, and entertainment content</p>
              <a href="#apps" className="category-link">Browse Entertainment Apps</a>
            </div>
          </div>
        </motion.section>

      </div>
      
      {/* FAQ Section */}
      <ModAppFAQ />
    </main>
  );
};

function App() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTelegramPopupOpen, setIsTelegramPopupOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [highlightedAppId, setHighlightedAppId] = useState(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for shared app URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedAppParam = urlParams.get('app');
    
    if (sharedAppParam && apps.length > 0) {
      // Validate if the shared app ID exists in our apps list
      const appExists = apps.some(app => {
        const appId = app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return appId === sharedAppParam;
      });
      
      if (appExists) {
        setHighlightedAppId(sharedAppParam);
      } else {
        // Log error for invalid app ID but don't break the user experience
        console.warn(`Shared app ID "${sharedAppParam}" not found. Available apps:`, 
          apps.map(app => app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')));
      }
      
      // Clear URL parameter after processing to keep URL clean
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [apps]);

  // Fetch apps from Firebase exclusively
  useEffect(() => {
    // Preload apps for better performance
    preloadApps();
    
    const unsubscribe = subscribeToApps((appsData) => {
      // Use Firebase data exclusively
      if (appsData && appsData.length > 0) {
        setApps(appsData);
        setIsLoading(false);
        
        // Performance monitoring
        if (window.performance && window.performance.mark) {
          window.performance.mark('apps-loaded');
          window.performance.measure('app-loading-time', 'navigationStart', 'apps-loaded');
        }
      } else {
        // If no data from Firestore, show empty state
        setApps([]);
        setIsLoading(false); // Stop loading when no data is available
      }
    });

    return () => {
      unsubscribe();
    };
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
      <HelmetProvider>
        <SEOStructuredData apps={apps} />
        <Router basename={process.env.NODE_ENV === 'production' ? undefined : ''}>
          <DynamicSEO />
          <motion.div 
            className={`App ${isMobile ? 'mobile' : 'desktop'}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
          <Header />
          <Breadcrumb />
        
        <Suspense fallback={
          <div className="loading-fallback">
            <div className="spinner"></div>
          </div>
        }>
          <ErrorBoundary>
            <Routes>
              <Route 
                 path="/" 
                 element={
                   <HomePage 
                     apps={apps}
                     isLoading={isLoading}
                     isMobile={isMobile}
                     handleOpenTelegramPopup={handleOpenTelegramPopup}
                     highlightedAppId={highlightedAppId}
                     setHighlightedAppId={setHighlightedAppId}
                   />
                 } 
               />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/ad-test" element={<AdTest />} />
              <Route path="/telegram-demo" element={<TelegramPopupDemo />} />
              {/* Catch-all route for 404 pages */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
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
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
