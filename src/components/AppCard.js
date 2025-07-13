import React, { useState } from 'react';
import TelegramOverlay from './TelegramOverlay';
import './AppCard.css';

const AppCard = ({ app }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const getBadgeClass = (badgeColor) => {
    return badgeColor === 'blue' ? 'badge-new' : 'badge-mod';
  };

  const handleAppClick = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <div className="app-card" onClick={handleAppClick}>
        <div className="app-card-image">
          <img src={app.logo} alt={app.name} />
          {app.badge && (
            <div className={`app-badge ${getBadgeClass(app.badgeColor)}`}>
              {app.badge}
            </div>
          )}
        </div>
        
        <div className="app-card-content">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-category">{app.category}</p>
          
          <div className="app-details">
            <div className="app-version">
              <span className="version-icon">⚡</span>
              <span>{app.version}</span>
            </div>
            <div className="app-size">
              <span className="size-icon">📥</span>
              <span>{app.fileSize}</span>
            </div>
          </div>
        </div>
      </div>

      <TelegramOverlay
        app={app}
        isVisible={showOverlay}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default AppCard; 