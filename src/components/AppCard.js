import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Zap, HardDriveDownload } from 'lucide-react';
import TelegramOverlay from './TelegramOverlay';
import useTilt from '../hooks/useTilt';
import './AppCard.css';

const AppCard = ({ app, index }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const tiltRef = useTilt({
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.1,
    perspective: 1000,
  });

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
      <div 
        className="app-card" 
        onClick={handleAppClick} 
        ref={tiltRef}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="app-card-image">
          <LazyLoadImage
            alt={app.name}
            src={app.logo}
            effect="blur"
            width="100%"
            height="100%"
            style={{ objectFit: 'cover' }}
          />
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
              <Zap size={16} className="detail-icon" />
              <span>{app.version}</span>
            </div>
            <div className="app-size">
              <HardDriveDownload size={16} className="detail-icon" />
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