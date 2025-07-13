import React, { useState } from 'react';
import { Smartphone, Check, Download, X } from 'lucide-react';
import './TelegramOverlay.css';

const TelegramOverlay = ({ app, isVisible, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  };

  const handleDownload = () => {
    if (isChecked) {
      window.open(app.downloadLink, '_blank');
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('telegram-overlay')) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="telegram-overlay" onClick={handleOverlayClick}>
      <div className="telegram-overlay-content">
        <button className="close-button" onClick={onClose}><X size={24} /></button>
        
        <div className="overlay-header">
          <img src={app.logo} alt={app.name} className="overlay-app-logo" />
          <h2>{app.name}</h2>
          <p className="overlay-app-size">{app.fileSize}</p>
        </div>

        <div className="telegram-section">
          <div className="telegram-icon"><Smartphone size={40} /></div>
          <h3>Join Our Telegram Channel</h3>
          <p>To download this app, please join our Telegram channel for updates and support.</p>
          
          <button className="telegram-button" onClick={handleJoinTelegram}>
            Join Telegram Channel
          </button>
        </div>

        <div className="checkbox-section">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"><Check size={16} /></span>
            I have joined the Telegram channel
          </label>
        </div>

        <div className="download-section">
          <button
            className={`download-button ${isChecked ? 'enabled' : 'disabled'}`}
            onClick={handleDownload}
            disabled={!isChecked}
          >
            <Download size={20} />
            {isChecked ? 'Download Now' : 'Join Telegram First'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramOverlay; 