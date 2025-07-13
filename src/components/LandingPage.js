import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import TelegramBenefits from './TelegramBenefits';
import AppCard from './AppCard';
import SkeletonCard from './SkeletonCard';
import Footer from './Footer';
import { apps } from '../data/apps';
import './LandingPage.css';

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
      <HeroSection />
      <TelegramBenefits />
      
      <main className="main-content">
        <div className="container">
          <section className="apps-section" id="apps-section">
            <h2 className="section-title">Premium Mobile Apps</h2>
            <p className="section-subtitle">
              Discover our carefully curated collection of premium mobile applications
            </p>
            <div className="apps-grid">
              {isLoading
                ? Array.from({ length: apps.length }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
                : apps.map((app, index) => (
                    <AppCard key={app.id} app={app} index={index} />
                  ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage; 