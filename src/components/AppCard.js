import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Zap, HardDriveDownload, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import TelegramOverlay from './TelegramOverlay';
import useTilt from '../hooks/useTilt';
import './AppCard.css';

const AppCard = React.memo(({ app, index }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  
  // Detect mobile devices with more comprehensive check
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
                   'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0 ||
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
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

  const handleAppClick = useCallback(() => {
    setShowOverlay(true);
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setShowOverlay(false);
  }, []);

  // Touch gesture handling for mobile
  const handleTouchStart = useCallback((e) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [isMobile]);

  const handleTouchMove = useCallback((e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Add haptic feedback if available
    if (window.navigator && window.navigator.vibrate && (isLeftSwipe || isRightSwipe)) {
      window.navigator.vibrate(50);
    }
  }, [isMobile, touchStart, touchEnd]);

  // Optimized image loading with error handling
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setIsImageError(true);
    setIsImageLoaded(true);
  }, []);

  // Generate responsive image sizes for mobile optimization
  const getImageSizes = useMemo(() => {
    if (isMobile) {
      return {
        src: app.logo,
        // Add srcSet for responsive images if available
        sizes: "(max-width: 480px) 320px, (max-width: 768px) 400px, 280px"
      };
    }
    return { src: app.logo };
  }, [app.logo, isMobile]);

  // Memoize animation variants to prevent recreation with mobile optimizations
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 30,
      scale: isMobile ? 1 : 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.25 : 0.4,
        delay: index * (isMobile ? 0.02 : 0.05),
        ease: "easeOut"
      }
    },
    hover: {
      y: isMobile ? -3 : -8,
      scale: isMobile ? 1.005 : 1.02,
      transition: {
        duration: isMobile ? 0.1 : 0.2,
        ease: "easeOut"
      }
    }
  }), [index, isMobile]);

  // Simplified variants for mobile
  const imageVariants = useMemo(() => {
    if (isMobile) {
      return {
        hover: {
          scale: 1.01,
          transition: { duration: 0.15 }
        }
      };
    }
    return {
      hover: {
        scale: 1.05,
        transition: { duration: 0.3 }
      }
    };
  }, [isMobile]);

  const badgeVariants = useMemo(() => {
    if (isMobile) return {};
    return {
      hover: {
        scale: 1.05,
        transition: { duration: 0.2 }
      }
    };
  }, [isMobile]);

  // Create fallback image component
  const ImageFallback = () => (
    <div className="app-image-fallback">
      <div className="fallback-icon">
        <Smartphone size={isMobile ? 32 : 40} />
      </div>
      <span className="fallback-text">Image unavailable</span>
    </div>
  );

  return (
    <>
      <motion.div 
        className={`app-card ${isMobile ? 'mobile-optimized' : ''} ${!isImageLoaded ? 'loading' : ''}`}
        onClick={handleAppClick} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={isMobile ? null : tiltRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={isMobile ? { scale: 0.995 } : {}}
        style={{ 
          willChange: isMobile ? 'auto' : 'transform',
          // Optimize for mobile performance
          ...(isMobile && {
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          })
        }}
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
            {!isImageError ? (
              <LazyLoadImage
                alt={app.name}
                {...getImageSizes}
                effect={isMobile ? "opacity" : "blur"}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
                placeholder={
                  <div className="image-placeholder">
                    <div className="placeholder-shimmer" />
                  </div>
                }
                // Add intersection options for mobile performance
                threshold={isMobile ? 10 : 100}
                // Reduce quality on mobile to improve loading
                {...(isMobile && {
                  beforeLoad: () => setIsImageLoaded(false)
                })}
              />
            ) : (
              <ImageFallback />
            )}
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
            <div className="app-detail-item">
              <Zap size={isMobile ? 14 : 16} />
              <span className="app-version">v{app.version}</span>
            </div>
            <div className="app-detail-item">
              <HardDriveDownload size={isMobile ? 14 : 16} />
              <span className="app-size">{app.size}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <TelegramOverlay 
        isVisible={showOverlay} 
        onClose={handleCloseOverlay} 
        app={app}
      />
    </>
  );
});

AppCard.displayName = 'AppCard';

export default AppCard; 