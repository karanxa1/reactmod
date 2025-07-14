import React, { useState, useEffect, useRef, lazy } from 'react';
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
import { apps as initialApps } from '../data/apps';
import './LandingPage.css';

const LazyAppCard = lazy(() => import('./AppCard'));

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate a 1.5 second loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <main>
        <HeroSection />
        <InfiniteTicker />
        <BentoGrid />
        <Timeline />
        <SectionDivider />
        <TelegramBenefits />
        <section id="apps-section" className="apps-section">
          <div className="container">
            <h2 className="section-title">Premium Mobile Apps</h2>
            <p className="section-subtitle">
              Discover our carefully curated collection of premium mobile applications
            </p>
            <div className="apps-grid">
              {isLoading
                ? Array.from({ length: initialApps.length }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : initialApps.map((app, index) => (
                    <AppCard key={app.id} app={app} index={index} />
                  ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage; 