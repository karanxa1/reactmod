import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Check } from 'lucide-react';
import './TelegramPopup.css';

const TelegramPopup = ({ isOpen, onClose, app }) => {
  const [hasVisitedTelegram, setHasVisitedTelegram] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Reset states when popup opens and manage body scroll
  useEffect(() => {
    if (isOpen && app) {
      // Capture current scroll position
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollPosition(currentScrollY);
      
      setHasVisitedTelegram(false);
      setIsCheckboxChecked(false);
      setImageError(false);
      
      // Don't prevent body scroll - let user scroll naturally
      // Just add a class for styling purposes
      document.body.classList.add('popup-open');
    } else if (!isOpen) {
      // Remove popup class when closed
      document.body.classList.remove('popup-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [isOpen, app?.id]);

  // Handle window focus to detect return from Telegram
  useEffect(() => {
    let timeoutId;
    
    const handleWindowFocus = () => {
      if (isOpen && !hasVisitedTelegram) {
        // Add a small delay to ensure user actually visited Telegram
        timeoutId = setTimeout(() => {
          setHasVisitedTelegram(true);
        }, 1000);
      }
    };

    if (isOpen) {
      window.addEventListener('focus', handleWindowFocus, { passive: true });
    }

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen, hasVisitedTelegram]);

  // Ensure focus is trapped within popup for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const popupEl = document.querySelector('.telegram-popup');
    const focusables = popupEl ? Array.from(popupEl.querySelectorAll(focusable)) : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const onKeyDown = (e) => {
      if (e.key === 'Tab' && focusables.length) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    if (first) first.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleTelegramClick = useCallback(() => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    setIsCheckboxChecked(e.target.checked);
  }, []);

  const handleDownload = useCallback(() => {
    if (hasVisitedTelegram && isCheckboxChecked && app?.downloadLink) {
      window.open(app.downloadLink, '_blank');
      onClose();
    }
  }, [hasVisitedTelegram, isCheckboxChecked, app?.downloadLink, onClose]);

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.15 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.1 }
    }
  };

  if (!app) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="telegram-popup-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="telegram-popup"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <div className="popup-app-info">
                <div className="popup-app-logo-container">
                  {!imageError ? (
                    <img 
                      src={app.logo} 
                      alt={app.name} 
                      className="popup-app-logo" 
                      onError={() => setImageError(true)}
                      onLoad={() => setImageError(false)}
                    />
                  ) : (
                    <div className="popup-app-logo-fallback">
                      <span className="logo-text">{app.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="popup-app-details">
                  <h2 className="popup-app-name">{app.name}</h2>
                  <p className="popup-app-category">{app.category}</p>
                </div>
              </div>
              <button className="popup-close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="popup-content">
              <div className="telegram-section">
                <div className="telegram-icon">
                  <span>📱</span>
                </div>
                <h3>Join Our Telegram Channel</h3>
                {app?.description ? (
                  <div className="app-description-block">
                    <h4 className="app-description-title">App Description</h4>
                    <p className="app-description-text">{app.description}</p>
                  </div>
                ) : (
                  <p>Join our Telegram channel to get access, support and updates.</p>
                )}
                
                <button 
                  className={`telegram-btn ${hasVisitedTelegram ? 'completed' : ''}`}
                  onClick={handleTelegramClick}
                  disabled={hasVisitedTelegram}
                >
                  <ExternalLink size={16} />
                  {hasVisitedTelegram ? 'Channel Joined!' : 'Join Telegram Channel'}
                </button>
                
                {hasVisitedTelegram && (
                  <p className="success-message">
                    <Check size={14} />
                    Successfully joined Telegram channel
                  </p>
                )}
              </div>
              
              <div className="confirmation-section">
                <label className={`checkbox-container ${!hasVisitedTelegram ? 'disabled' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                    disabled={!hasVisitedTelegram}
                  />
                  <span className="checkmark">
                    {isCheckboxChecked && <Check size={12} />}
                  </span>
                  I confirm that I have joined the Telegram channel
                </label>
                
                {!hasVisitedTelegram && (
                  <p className="hint-message">Please join the Telegram channel first</p>
                )}
              </div>
              
                             <div className="popup-actions">
                 <button 
                   className="cancel-btn"
                   onClick={onClose}
                 >
                   Cancel
                 </button>
                 <button 
                   className={`download-btn ${!hasVisitedTelegram || !isCheckboxChecked ? 'disabled' : ''}`}
                   onClick={handleDownload}
                   disabled={!hasVisitedTelegram || !isCheckboxChecked}
                 >
                   Download App
                 </button>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TelegramPopup;

