import React from 'react';
import Header from './Header';
import AppCard from './AppCard';
import { apps } from '../data/apps';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <section className="apps-section">
            <h2 className="section-title">Latest MOD APKs</h2>
            <div className="apps-grid">
              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 