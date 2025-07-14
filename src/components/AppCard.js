import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Zap, HardDriveDownload } from 'lucide-react';
import { motion } from 'framer-motion';
import TelegramOverlay from './TelegramOverlay';
import useTilt from '../hooks/useTilt';
import './AppCard.css';

const AppCard = ({ app, index }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const badgeVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.div 
        className="app-card" 
        onClick={handleAppClick} 
        ref={tiltRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <div className="app-card-image">
          <motion.div
            variants={imageVariants}
            style={{ width: '100%', height: '100%' }}
          >
            <LazyLoadImage
              alt={app.name}
              src={app.logo}
              effect="blur"
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          {app.badge && (
            <motion.div 
              className={`app-badge ${getBadgeClass(app.badgeColor)}`}
              variants={badgeVariants}
            >
              {app.badge}
            </motion.div>
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
      </motion.div>

      <TelegramOverlay
        app={app}
        isVisible={showOverlay}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default AppCard; 