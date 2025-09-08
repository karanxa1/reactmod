import React, { useEffect, useRef, useState } from 'react';
import './AdSense.css';

// Top Banner Ad Component - Simplified and Reliable Implementation
const NativeBannerTop = () => {
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Re-enable ad loading with protection against overlays
    const shouldLoadAds = String(process.env.REACT_APP_ENABLE_ADS || 'true').toLowerCase() === 'true';
    if (!shouldLoadAds) {
      console.log('🚫 [TOP BANNER] Ad loading disabled by environment flag');
      setIsInitialized(true);
      return;
    }
    
    // Only initialize once
    if (isInitialized) return;

    const initializeTopBanner = () => {
      try {
        console.log('🚀 [TOP BANNER] Initializing top banner ad...');
        
        const container = containerRef.current;
        if (!container) {
          console.warn('⚠️ [TOP BANNER] Container not ready, will retry...');
          return false;
        }

        // Clear any existing content
        container.innerHTML = '';
        
        // Create the ad container
        const adContainer = document.createElement('div');
        adContainer.id = 'container-top-banner-ad';
        adContainer.className = 'ad-container-top';
        container.appendChild(adContainer);
        
        // Create the script element
        const asyncScript = document.createElement('script');
        asyncScript.async = true;
        asyncScript.setAttribute('data-cfasync', 'false');
        asyncScript.setAttribute('data-ad-client', 'top-banner');
        asyncScript.src = 'https://pl27491390.profitableratecpm.com/6c60b3df6dc253ab9508ae6ced4c8836/invoke.js';
        
        // Add timeout to prevent hanging
        const scriptTimeout = setTimeout(() => {
          console.warn('⚠️ [TOP BANNER] Script loading timeout, hiding ad space');
          setAdLoaded(false);
          setIsInitialized(true);
        }, 8000);
        
        // Handle script load success
        asyncScript.onload = () => {
          clearTimeout(scriptTimeout);
          console.log('✅ [TOP BANNER] Script loaded successfully!');
          
          // Create the container that the script expects
          const scriptContainer = document.createElement('div');
          scriptContainer.id = 'container-6c60b3df6dc253ab9508ae6ced4c8836';
          scriptContainer.style.width = '320px';
          scriptContainer.style.height = '200px';
          scriptContainer.style.margin = '0 auto';
          scriptContainer.style.display = 'inline-block';
          scriptContainer.style.overflow = 'hidden';
          scriptContainer.style.borderRadius = '8px';
          
          adContainer.appendChild(scriptContainer);
          
          // Check if ads load after a delay
          setTimeout(() => {
            const hasContent = scriptContainer.innerHTML.trim() !== '';
            const hasChildren = scriptContainer.children.length > 0;
            
            if (!hasContent && !hasChildren) {
              console.warn('❌ [TOP BANNER] No ads loaded, hiding ad space');
              setAdLoaded(false);
            } else {
              console.log('✅ [TOP BANNER] Ads loaded successfully!');
              setAdLoaded(true);
            }
            setIsInitialized(true);
          }, 3000);
        };
        
        // Handle script load error
        asyncScript.onerror = (error) => {
          clearTimeout(scriptTimeout);
          console.error('❌ [TOP BANNER] Script failed to load:', error);
          setAdLoaded(false);
          setIsInitialized(true);
        };
        
        // Append script to document
        document.head.appendChild(asyncScript);
        return true;
        
      } catch (error) {
        console.error('💥 [TOP BANNER] Critical error:', error);
        setAdLoaded(false);
        setIsInitialized(true);
        return false;
      }
    };

    // Try to initialize with retry logic
    const tryInitialize = () => {
      if (!initializeTopBanner()) {
        // Retry after a short delay
        setTimeout(tryInitialize, 500);
      }
    };

    // Start initialization after a delay
    const timer = setTimeout(tryInitialize, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isInitialized]);

  // Don't render if there's an error and no container
  if (!containerRef.current && !adLoaded && isInitialized) {
    return null;
  }

  return (
    <div className={`native-banner-top-container ${adLoaded ? 'ad-visible' : 'ad-hidden'}`}>
      <div ref={containerRef} id="container-top-banner">
        {/* Container for 320x200 banner ad */}
      </div>
    </div>
  );
};

export default NativeBannerTop;