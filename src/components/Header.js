import React from 'react';
import { Smartphone } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Smartphone className="logo-icon" />
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