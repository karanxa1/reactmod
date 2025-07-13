import React from 'react';
import Header from './Header';
import AppCard from './AppCard';
import { apps } from '../data/apps';
import './Apps.css';

const Apps = () => {
  return (
    <div className="apps-page">
      <Header />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Premium Apps</h1>
          <p className="page-subtitle">
            Discover our carefully curated collection of premium mobile applications
          </p>
        </div>
        
        <div className="apps-grid">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps; 