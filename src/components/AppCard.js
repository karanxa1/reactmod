import React, { useState, useEffect } from 'react';
import { Zap, HardDriveDownload, Smartphone, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import './AppCard.css';

const AppCard = ({ app, index, onOpenTelegramPopup }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [imageLoadProgress, setImageLoadProgress] = useState(0);
  const [isImageCached, setIsImageCached] = useState(false);

  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = (e) => {
    e.stopPropagation(); // Prevent card click event
    onOpenTelegramPopup(app);
  };

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    onOpenTelegramPopup(app);
  };

  const handleCardClick = () => {
    // All card clicks now open telegram popup
    onOpenTelegramPopup(app);
  };

  // Enhanced image loading with caching detection
  useEffect(() => {
    if (app.logo) {
      // Check if image is already cached
      const img = new Image();
      img.onload = () => {
        setIsImageCached(true);
        setIsImageLoaded(true);
        setImageLoadProgress(100);
      };
      img.onerror = () => {
        setIsImageError(true);
        setIsImageLoaded(true);
      };
      
      // Preload image for instant display
      img.src = app.logo;
      
      // Simulate progressive loading for better UX
      if (!isImageCached) {
        const progressInterval = setInterval(() => {
          setImageLoadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + Math.random() * 20;
          });
        }, 100);
        
        return () => clearInterval(progressInterval);
      }
    }
  }, [app.logo, isImageCached]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setImageLoadProgress(100);
  };

  const handleImageError = () => {
    setIsImageError(true);
    setIsImageLoaded(true);
  };

  // Optimized animation variants for better performance
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        delay: index * 0.03,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.99,
      transition: {
        duration: 0.08
      }
    }
  };

  const ImageFallback = () => (
    <div className="app-image-fallback">
      <Smartphone size={32} />
      <span>No Image</span>
    </div>
  );

  return (
    <motion.div 
      className={`app-card ${isMobile ? 'mobile' : 'desktop'}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={!isMobile ? "hover" : undefined}
      whileTap="tap"
      onClick={handleCardClick}
      {...hoverVariants}
    >
      <div className="app-card-image" onClick={handleImageClick}>
        {!isImageError ? (
          <img
            src={app.logo}
            alt={app.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
              opacity: isImageLoaded ? 1 : 0,
              filter: isImageLoaded ? 'blur(0px)' : 'blur(5px)',
              transform: isImageLoaded ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease'
            }}
          />
        ) : (
          <ImageFallback />
        )}
        
        {/* Click indicator for image */}
        <div className="image-click-indicator">
          <span>ℹ️</span>
        </div>
        
        {!isImageLoaded && !isImageError && (
          <div className="image-placeholder">
            <div className="placeholder-shimmer" />
            <div className="loading-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${imageLoadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="app-card-content">
        <h3 className="app-name">{app.name}</h3>
        <p className="app-category">{app.category}</p>
        
        {/* Description removed from card; shown in Telegram popup instead */}
        
        <div className="app-details">
          <div className="app-detail-item">
            <Zap size={14} />
            <span>v{app.version || '1.0'}</span>
          </div>
          <div className="app-detail-item">
            <HardDriveDownload size={14} />
            <span>{app.fileSize || 'N/A'} MB</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default AppCard;