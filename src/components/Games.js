import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  return (
    <div className="games-page">
      <Header />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Games</h1>
          <p className="page-subtitle">Premium mobile games coming soon</p>
        </div>
        
        <div className="coming-soon">
          <div className="coming-soon-content">
            <div className="coming-soon-icon">🎮</div>
            <h2>Games Coming Soon</h2>
            <p>We're working on bringing you the best mobile games. Stay tuned for exciting updates!</p>
            <div className="coming-soon-actions">
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
              <button className="btn-secondary" onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}>
                Join Telegram for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games; 