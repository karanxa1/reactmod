import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import TelegramBenefits from './TelegramBenefits';
import AppCard from './AppCard';
import Footer from './Footer';
import { apps } from '../data/apps';
import './LandingPage.css';

const LandingPage = () => {
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
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
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