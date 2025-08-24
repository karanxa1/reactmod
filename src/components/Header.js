import React from 'react';
import logo from '../logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img 
              src={logo} 
              className="logo-icon" 
              alt="MODZY - Premium Mobile Apps Marketplace Logo" 
              title="MODZY - Your destination for premium mobile apps"
              width={28} 
              height={28}
              loading="eager"
            />
            <span className="logo-text">MODZY</span>
          </div>
          
          <div className="header-actions">
            <button 
              className="telegram-btn"
              onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}
            >
              Join Telegram
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;