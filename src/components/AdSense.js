import React, { useEffect, useRef, useState } from 'react';
import './AdSense.css';

// Bottom Banner Ad Component - 320x50 Banner Ads
const NativeBanner = () => {
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Gate ad loading behind environment flag to avoid automatic redirects in production
    const shouldLoadAds = String(process.env.REACT_APP_ENABLE_ADS || '').toLowerCase() === 'true';
    if (!shouldLoadAds) {
      return;
    }
    // Initialize bottom banner ad when component mounts
    const initializeBottomBanner = () => {
      try {
        console.log('🚀 [BOTTOM BANNER] Initializing 320x50 banner ad...');
        
        const container = containerRef.current;
        if (!container) {
          console.error('❌ [BOTTOM BANNER] Container not found!');
          return;
        }

        // Clear any existing content
        container.innerHTML = '';
        
        // Create the container div that the ad script expects
        const adContainer = document.createElement('div');
        adContainer.id = 'container-bottom-banner-ad';
        adContainer.className = 'ad-container';
        
        // Append the ad container to our main container
        container.appendChild(adContainer);
        
        // Use the same legitimate ad network as top banner
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.setAttribute('data-cfasync', 'false');
        adScript.setAttribute('data-ad-client', 'bottom-banner');
        // Use only the legitimate profitableratecpm.com ad network
        adScript.src = 'https://pl27491390.profitableratecpm.com/6c60b3df6dc253ab9508ae6ced4c8836/invoke.js';
        
        // Add load success handler
        adScript.onload = () => {
          console.log('✅ [BOTTOM BANNER] Banner ad script loaded successfully!');
          
          // Create the container that the script expects
          const scriptContainer = document.createElement('div');
          scriptContainer.id = 'container-6c60b3df6dc253ab9508ae6ced4c8836';
          scriptContainer.style.width = '320px';
          scriptContainer.style.height = '50px';
          scriptContainer.style.margin = '0 auto';
          scriptContainer.style.display = 'inline-block';
          scriptContainer.style.overflow = 'hidden';
          
          // Append to our ad container
          adContainer.appendChild(scriptContainer);
          
          console.log('📝 [BOTTOM BANNER] Script container created and appended');
          
          // Check if ads load after a delay
          setTimeout(() => {
            const hasContent = scriptContainer.innerHTML.trim() !== '';
            const hasChildren = scriptContainer.children.length > 0;
            
            console.log('📊 [BOTTOM BANNER] Banner ad content check:', {
              hasContent,
              hasChildren,
              contentLength: adContainer.innerHTML.length,
              childrenCount: adContainer.children.length
            });
            
            if (!hasContent && !hasChildren) {
              console.log('⚠️ [BOTTOM BANNER] No ad content detected, showing fallback');
              setAdLoaded(false);
            } else {
              console.log('✅ [BOTTOM BANNER] Ad content loaded successfully!');
              setAdLoaded(true);
            }
          }, 3000);
        };
        
        // Add error handler
        adScript.onerror = (error) => {
          console.error('❌ [BOTTOM BANNER] Failed to load banner ad script:', error);
          setAdLoaded(false);
        };
        
        // Add global error handler for script execution errors
        const originalOnError = window.onerror;
        window.onerror = function(msg, url, lineNo, columnNo, error) {
          // Check if the error is related to our ad script
          if (url && url.includes('profitableratecpm.com')) {
            console.error('❌ [BOTTOM BANNER] Script execution error:', { msg, url, lineNo, columnNo });
            setAdLoaded(false);
            return true; // Prevent the error from being logged as unhandled
          }
          // Call original error handler for other errors
          if (originalOnError) {
            return originalOnError.apply(this, arguments);
          }
          return false;
        };
        
        // Append script to document head
        document.head.appendChild(adScript);
        
      } catch (error) {
        console.error('💥 [BOTTOM BANNER] Critical error in initialization:', error);
        setAdLoaded(false);
        console.log('💥 [BOTTOM BANNER] Hiding ad space due to critical error');
      }
    };

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(initializeBottomBanner, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // If there's an error, don't render anything to prevent crashes
  if (!containerRef.current && !adLoaded) {
    return null;
  }

  return (
    <div className={`native-banner-container ${adLoaded ? 'ad-visible' : 'ad-hidden'}`}>
      <div ref={containerRef} id="container-bottom-banner">
        {/* Container for 320x50 banner ad */}
      </div>
    </div>
  );
};

// Export the bottom banner component
export default NativeBanner;
export { NativeBanner };

// Note: Bottom banner now uses actual banner ad script (320x50)