import React, { useState, useMemo, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Zap, HardDriveDownload } from 'lucide-react';
import { motion } from 'framer-motion';
import TelegramOverlay from './TelegramOverlay';
import useTilt from '../hooks/useTilt';
import './AppCard.css';

const AppCard = React.memo(({ app, index }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Only use tilt on desktop
  const tiltRef = useTilt({
    max: isMobile ? 0 : 4,
    speed: 300,
    glare: false,
    perspective: 1000,
    disabled: isMobile
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

  // Memoize animation variants to prevent recreation
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: isMobile ? 20 : 30,
      scale: isMobile ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        delay: index * (isMobile ? 0.03 : 0.05),
        ease: "easeOut"
      }
    },
    hover: {
      y: isMobile ? -4 : -8,
      scale: isMobile ? 1.01 : 1.02,
      transition: {
        duration: isMobile ? 0.15 : 0.2,
        ease: "easeOut"
      }
    }
  }), [index, isMobile]);

  const imageVariants = useMemo(() => ({
    hover: {
      scale: isMobile ? 1.02 : 1.05,
      transition: { duration: isMobile ? 0.15 : 0.2 }
    }
  }), [isMobile]);

  const badgeVariants = useMemo(() => ({
    hover: {
      scale: isMobile ? 1.05 : 1.1,
      transition: { duration: isMobile ? 0.15 : 0.2 }
    }
  }), [isMobile]);

  // Touch feedback for mobile
  const handleTouchStart = () => {
    if (isMobile) {
      // Add touch feedback class
      const element = document.activeElement;
      if (element) {
        element.classList.add('touch-feedback');
      }
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      // Remove touch feedback class
      setTimeout(() => {
        const element = document.activeElement;
        if (element) {
          element.classList.remove('touch-feedback');
        }
      }, 100);
    }
  };

  return (
    <>
      <motion.div 
        className={`app-card ${isMobile ? 'mobile-optimized' : ''}`}
        onClick={handleAppClick} 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={isMobile ? null : tiltRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={isMobile ? { scale: 0.98 } : {}}
        style={{ willChange: isMobile ? 'auto' : 'transform' }}
      >
        <div className="app-card-image">
          <motion.div
            variants={imageVariants}
            style={{ 
              width: '100%', 
              height: '100%', 
              willChange: isMobile ? 'auto' : 'transform' 
            }}
          >
            <LazyLoadImage
              alt={app.name}
              src={app.logo}
              effect={isMobile ? "opacity" : "blur"} // Simpler effect on mobile
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
              loading="lazy"
              placeholder={
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #333 0%, #444 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}
                >
                  Loading...
                </div>
              }
            />
          </motion.div>
          {app.badge && (
            <motion.div 
              className={`app-badge ${getBadgeClass(app.badgeColor)}`}
              variants={isMobile ? {} : badgeVariants}
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
              <Zap size={isMobile ? 14 : 16} className="detail-icon" />
              <span>{app.version}</span>
            </div>
            <div className="app-size">
              <HardDriveDownload size={isMobile ? 14 : 16} className="detail-icon" />
              <span>{app.fileSize}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {showOverlay && (
        <TelegramOverlay
          app={app}
          isVisible={showOverlay}
          onClose={handleCloseOverlay}
        />
      )}
    </>
  );
});

AppCard.displayName = 'AppCard';

export default AppCard; 