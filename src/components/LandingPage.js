import React, { useState, useEffect, useRef, lazy } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import HeroSection from './HeroSection';
import InfiniteTicker from './InfiniteTicker';
import AppCard from './AppCard';
import SkeletonCard from './SkeletonCard';
import Footer from './Footer';
import TelegramBenefits from './TelegramBenefits';
import BentoGrid from './BentoGrid';
import Timeline from './Timeline';
import SectionDivider from './SectionDivider';
import ParallaxBackground from './ParallaxBackground';
import { AnimatedProgressBar, CircularProgress } from './AnimatedProgressBar';
import { apps as initialApps } from '../data/apps';
import './LandingPage.css';

const LazyAppCard = lazy(() => import('./AppCard'));

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="landing-page">
      <Header />
      <ParallaxBackground>
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={sectionVariants}>
            <HeroSection />
          </motion.div>
          
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
          
          <motion.section 
            id="apps-section" 
            className="apps-section"
            variants={sectionVariants}
          >
            <div className="container">
              <h2 className="section-title gradient-text">Premium Mobile Apps</h2>
              <p className="section-subtitle">
                Discover our carefully curated collection of premium mobile applications
              </p>
              
              {/* Progress indicators for loading */}
              {isLoading && (
                <div className="loading-stats">
                  <AnimatedProgressBar
                    percentage={85}
                    label="Apps Verified"
                    color="#10b981"
                    height={6}
                    gradient={true}
                    pulse={true}
                  />
                  <AnimatedProgressBar
                    percentage={92}
                    label="Security Scan"
                    color="#3b82f6"
                    height={6}
                    delay={0.5}
                    gradient={true}
                    pulse={true}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress
                      percentage={75}
                      size={100}
                      color="#667eea"
                      label="Loading"
                    />
                  </div>
                </div>
              )}
              
              <motion.div 
                className="apps-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isLoading ? "hidden" : "visible"}
              >
                {isLoading
                  ? Array.from({ length: initialApps.length }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  : initialApps.map((app, index) => (
                      <motion.div key={app.id} variants={sectionVariants}>
                        <AppCard app={app} index={index} />
                      </motion.div>
                    ))}
              </motion.div>
            </div>
          </motion.section>
        </motion.main>
      </ParallaxBackground>
      
      <Footer />
    </div>
  );
};

export default LandingPage; 