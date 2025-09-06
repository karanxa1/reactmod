import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Check } from 'lucide-react';
import SocialShare from './SocialShare';
import { getAppUrl } from '../config/domain';
import './TelegramPopup.css';

const TelegramPopup = ({ isOpen, onClose, app }) => {
  const [visitedChannels, setVisitedChannels] = useState(new Set());
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [pendingChannelVisit, setPendingChannelVisit] = useState(null);
  const [lastChannelClickTime, setLastChannelClickTime] = useState(null);
  const [isSocialSharingActive, setIsSocialSharingActive] = useState(false);

  // Multiple Telegram channels configuration - memoized to prevent re-creation
  const telegramChannels = useMemo(() => [
    {
      id: 'main',
      name: 'MODZY Main Channel',
      url: 'https://t.me/keyisheremybaby',
      icon: '📱',
      description: 'Main channel for app updates and announcements'
    },
    {
      id: 'apps',
      name: 'MODZY Apps',
      url: 'https://t.me/ModzyApps',
      icon: '🛠️',
      description: 'Latest app releases and technical updates'
    },
    {
      id: 'monetization',
      name: 'MODZY Partners',
      url: 'https://youtube.com/@thetemplatefactory?si=JlZfbk4MH1HsKjqT',
      icon: '⭐',
      description: 'Exclusive partnerships and premium content'
    }
  ], []);

  // Check if all required channels are visited
  const allChannelsVisited = telegramChannels.length === visitedChannels.size;




  // Reset states when popup opens and manage body scroll
  useEffect(() => {
    if (isOpen && app) {
      setVisitedChannels(new Set());
      setIsCheckboxChecked(false);
      setImageError(false);
      setPendingChannelVisit(null);
      setLastChannelClickTime(null);
      setIsSocialSharingActive(false);
      
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
  }, [isOpen, app]);

  // Handle window focus to detect return from external links
  useEffect(() => {
    let focusTimeoutId;
    
    const handleWindowFocus = () => {
      if (isOpen && pendingChannelVisit && !isSocialSharingActive) {
        // Only process if we have a pending channel visit, no social sharing is active, and enough time has passed
        const now = Date.now();
        const timeSinceClick = lastChannelClickTime ? now - lastChannelClickTime : 0;
        
        // Require at least 2 seconds to have passed since the click
        // This prevents false positives from quick window focus changes
        if (timeSinceClick > 2000) {
          focusTimeoutId = setTimeout(() => {
            setVisitedChannels(prev => {
              const newSet = new Set(prev);
              newSet.add(pendingChannelVisit);
              return newSet;
            });
            
            // Clear pending visit
            setPendingChannelVisit(null);
            setLastChannelClickTime(null);
            
            // Optional: Add haptic feedback if available
            if (window.hapticFeedback) {
              window.hapticFeedback('light');
            }
            
            console.log(`Marked channel ${pendingChannelVisit} as visited`);
          }, 500); // Additional delay to ensure user actually visited the link
        }
      }
    };
    
    const handleWindowBlur = () => {
      // Clear any pending focus timeout when window loses focus
      if (focusTimeoutId) {
        clearTimeout(focusTimeoutId);
      }
    };

    if (isOpen) {
      window.addEventListener('focus', handleWindowFocus, { passive: true });
      window.addEventListener('blur', handleWindowBlur, { passive: true });
    }

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      if (focusTimeoutId) {
        clearTimeout(focusTimeoutId);
      }
    };
  }, [isOpen, pendingChannelVisit, lastChannelClickTime, isSocialSharingActive]);

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

  const handleTelegramClick = useCallback((channelUrl, channelId) => {
    // Set pending channel visit and timestamp
    setPendingChannelVisit(channelId);
    setLastChannelClickTime(Date.now());
    
    // Open link in new tab
    const newWindow = window.open(channelUrl, '_blank', 'noopener,noreferrer');
    
    // Focus the new window if it was successfully opened
    if (newWindow) {
      newWindow.focus();
    }
    
    // Log the click for debugging
    console.log(`Opening channel: ${channelId} - ${channelUrl} at ${new Date().toISOString()}`);
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    setIsCheckboxChecked(e.target.checked);
  }, []);

  const handleDownload = useCallback(() => {
    if (allChannelsVisited && isCheckboxChecked && app?.downloadLink) {
      window.open(app.downloadLink, '_blank');
      onClose();
    }
  }, [allChannelsVisited, isCheckboxChecked, app?.downloadLink, onClose]);

  const generateShareUrl = useCallback(() => {
    if (!app) return '';
    const appId = app.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return getAppUrl(appId);
  }, [app]);

  // Handle social share actions to prevent false positive channel visits
  const handleSocialShareOpen = useCallback(() => {
    setIsSocialSharingActive(true);
    
    // Reset the social sharing flag after a delay
    // This accounts for the time it takes for share dialogs to open and close
    setTimeout(() => {
      setIsSocialSharingActive(false);
    }, 3000); // 3 seconds should be enough for most share operations
  }, []);







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
                <h3>Visit Our Required Links ({visitedChannels.size}/{telegramChannels.length})</h3>
                {app?.description ? (
                  <div className="app-description-block">
                    <h4 className="app-description-title">App Description</h4>
                    <p className="app-description-text">{app.description}</p>
                  </div>
                ) : (
                  <p>Visit all {telegramChannels.length} required links to unlock the download.</p>
                )}
                
                <div className="telegram-channels-list">
                  {telegramChannels.map((channel, index) => {
                    const isVisited = visitedChannels.has(channel.id);
                    const isAccessible = index === 0 || visitedChannels.has(telegramChannels[index - 1].id);
                    
                    return (
                      <div key={channel.id} className={`channel-item ${
                        isVisited ? 'completed' : isAccessible ? 'accessible' : 'locked'
                      }`}>
                        <div className="channel-info">
                          <span className="channel-icon">{channel.icon}</span>
                          <div className="channel-details">
                            <h4>{channel.name}</h4>
                            <p>{channel.description}</p>
                          </div>
                          <div className="channel-status">
                            {isVisited ? (
                              <Check size={20} className="status-icon completed" />
                            ) : isAccessible ? (
                              <ExternalLink size={16} className="status-icon accessible" />
                            ) : (
                              <span className="status-icon locked">🔒</span>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          className={`telegram-btn ${
                            isVisited ? 'completed' : isAccessible ? '' : 'disabled'
                          }`}
                          onClick={() => isAccessible && !isVisited ? handleTelegramClick(channel.url, channel.id) : null}
                          disabled={!isAccessible || isVisited}
                        >
                          {isVisited ? (
                            <>✅ Visited!</>
                          ) : isAccessible ? (
                            <>🔗 Visit {channel.id === 'monetization' ? 'Partner Site' : 'Channel'} {index + 1}</>
                          ) : (
                            <>🔒 Complete Previous Steps</>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {allChannelsVisited && (
                  <div className="all-channels-success">
                    <p className="success-message">
                      <Check size={16} />
                      🎉 All required links visited successfully! You can now download the app.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="confirmation-section">
                <label className={`checkbox-container ${!allChannelsVisited ? 'disabled' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                    disabled={!allChannelsVisited}
                  />
                  <span className="checkmark">
                    {isCheckboxChecked && <Check size={12} />}
                  </span>
                  I confirm that I have visited all {telegramChannels.length} required links
                </label>
                
                {!allChannelsVisited && (
                  <p className="hint-message">
                    Please visit all {telegramChannels.length} required links first 
                    ({visitedChannels.size}/{telegramChannels.length} completed)
                  </p>
                )}
              </div>
              
              {/* Social Share Component */}
              <div className="social-share-section">
                <div className="social-share-wrapper">
                  <SocialShare 
                    url={generateShareUrl()}
                    title={`${app.name} - ${app.category} App`}
                    description={app.description || `Download ${app.name} - Premium ${app.category} application from MODZY marketplace`}
                    image={app.logo}
                    hashtags={`${app.category},ModApk,AndroidApp,MODZY`}
                    variant="compact"
                    size="small"
                    showLabel={true}
                    className="popup-social-share"
                    onShareOpen={handleSocialShareOpen}
                  />
                </div>
              </div>
              
              <div className="popup-actions">
                 <button 
                   className="cancel-btn"
                   onClick={onClose}
                 >
                   Cancel
                 </button>
                 <button 
                   className={`download-btn ${!allChannelsVisited || !isCheckboxChecked ? 'disabled' : ''}`}
                   onClick={handleDownload}
                   disabled={!allChannelsVisited || !isCheckboxChecked}
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

