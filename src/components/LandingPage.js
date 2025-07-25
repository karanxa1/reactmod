import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

import InfiniteTicker from './InfiniteTicker';
import SkeletonCard from './SkeletonCard';
import Footer from './Footer';
import TelegramBenefits from './TelegramBenefits';
import BentoGrid from './BentoGrid';
import Timeline from './Timeline';
import SectionDivider from './SectionDivider';
import { subscribeToApps } from '../firebase/appService';
import './LandingPage.css';

// Lazy load heavy components
const LazyAppCard = lazy(() => import('./AppCard'));
const LazyParallaxBackground = lazy(() => import('./ParallaxBackground'));

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [apps, setApps] = useState([]);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToApps((appsData) => {
      setApps(appsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Faster loading on mobile
    const loadingTime = isMobile ? 500 : 1000;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Optimized animation variants for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.02 : 0.05
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 10 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: "easeOut"
      }
    }
  };

  // Mobile-specific optimized fallback
  const MobileFallback = () => (
    <div className="loading-background mobile-loading">
      <div className="mobile-spinner"></div>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className={`landing-page ${isMobile ? 'mobile-optimized' : ''}`}>
      <Header />
      
      {/* Conditional rendering for mobile optimization */}
      {isMobile ? (
        // Mobile version - no parallax
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section 
            id="apps-section" 
            className="apps-section hero-replacement"
            variants={sectionVariants}
          >
            <div className="container">
              <div className="hero-apps-header">
                <h1 className="main-title gradient-text">Premium Mobile Apps</h1>
                <p className="main-subtitle">
                  Discover our carefully curated collection of premium mobile applications
                </p>
              </div>
              
              <motion.div 
                className="apps-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
              >
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  : apps.map((app, index) => (
                      <Suspense key={app.id} fallback={<SkeletonCard />}>
                        <LazyAppCard app={app} index={index} />
                      </Suspense>
                    ))}
          </motion.div>
            </div>
          </motion.section>
          
          <motion.div variants={sectionVariants}>
            <InfiniteTicker />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <BentoGrid />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <Timeline />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <SectionDivider />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <TelegramBenefits />
          </motion.div>
          

        </motion.main>
      ) : (
        // Desktop version - with parallax
        <Suspense fallback={<div className="loading-background" />}>
          <LazyParallaxBackground>
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.section 
                id="apps-section" 
                className="apps-section hero-replacement"
                variants={sectionVariants}
              >
                <div className="container">
                  <div className="hero-apps-header">
                    <h1 className="main-title gradient-text">Premium Mobile Apps</h1>
                    <p className="main-subtitle">
                      Discover our carefully curated collection of premium mobile applications
                    </p>
                  </div>
                  
                  <motion.div 
                    className="apps-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isLoading ? "hidden" : "visible"}
                  >
                    {isLoading
                      ? Array.from({ length: 6 }).map((_, index) => (
                          <SkeletonCard key={index} />
                        ))
                      : apps.map((app, index) => (
                          <Suspense key={app.id} fallback={<SkeletonCard />}>
                            <LazyAppCard app={app} index={index} />
                          </Suspense>
                        ))}
              </motion.div>
                </div>
              </motion.section>
              
              <motion.div variants={sectionVariants}>
                <InfiniteTicker />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <BentoGrid />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <Timeline />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <SectionDivider />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <TelegramBenefits />
              </motion.div>
              

            </motion.main>
          </LazyParallaxBackground>
        </Suspense>
      )}
      
      <Footer />
    </div>
  );
};

export default LandingPage; 