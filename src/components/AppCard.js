import React, { useState, memo, useMemo, useEffect } from 'react';
import { Zap, HardDriveDownload, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import './AppCard.css';

const AppCard = ({ app, index, onOpenTelegramPopup, isMobile, isHighlighted, onHighlightComplete }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);
  const optimizedLogoUrl = useMemo(() => {
    const url = app.logo || '';
    try {
      const u = new URL(url);
      if (u.hostname === 'github.com' && u.pathname.includes('/blob/')) {
        const parts = u.pathname.split('/');
        // ['', owner, repo, 'blob', branch, ...path]
        const owner = parts[1];
        const repo = parts[2];
        const branch = parts[4];
        const path = parts.slice(5).join('/');
        return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
      }
      return url;
    } catch {
      return url;
    }
  }, [app.logo]);

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

  // Handle highlighting and scrolling
  useEffect(() => {
    if (isHighlighted && !shouldScrollIntoView) {
      setShouldScrollIntoView(true);
      
      // Scroll to highlighted app after a short delay
      const scrollTimeout = setTimeout(() => {
        const cardElement = document.querySelector(`[data-app-id="${app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}"]`);
        if (cardElement) {
          cardElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 500);
      
      // Remove highlighting after animation
      const highlightTimeout = setTimeout(() => {
        if (onHighlightComplete) {
          onHighlightComplete();
        }
        setShouldScrollIntoView(false);
      }, 4000);
      
      return () => {
        clearTimeout(scrollTimeout);
        clearTimeout(highlightTimeout);
      };
    }
  }, [isHighlighted, shouldScrollIntoView, app.name, onHighlightComplete]);

  // Avoid manual preloading to let browser lazy-load and reduce main-thread work

  const handleImageLoad = () => {
    setIsImageLoaded(true);
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

  // Generate app ID for data attribute
  const appId = app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <motion.div 
      className={`app-card ${isMobile ? 'mobile' : 'desktop'} ${isHighlighted ? 'highlighted' : ''}`}
      data-app-id={appId}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={!isMobile ? "hover" : undefined}
      whileTap="tap"
      onClick={handleCardClick}
      animate={isHighlighted ? {
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 4px 20px rgba(102, 126, 234, 0.3)',
          '0 8px 40px rgba(102, 126, 234, 0.6)',
          '0 4px 20px rgba(102, 126, 234, 0.3)'
        ]
      } : {}}
      transition={isHighlighted ? {
        duration: 2,
        repeat: 1,
        repeatType: 'reverse'
      } : hoverVariants.transition}
      {...(isHighlighted ? {} : hoverVariants)}
    >
      <div className="app-card-image" onClick={handleImageClick}>
        {!isImageError ? (
          <img
            src={optimizedLogoUrl}
            alt={`${app.name} - ${app.category} mobile app icon. Download premium ${app.name} app from MODZY marketplace`}
            title={`${app.name} v${app.version || '1.0'} - ${app.category} app`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index < 2 ? "high" : "auto"}
            referrerPolicy="no-referrer"
            width={512}
            height={512}
            className={`app-card-image ${isImageLoaded ? 'loaded' : 'loading'}`}
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

export default memo(AppCard);