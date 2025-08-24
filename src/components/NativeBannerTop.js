import React, { useEffect, useRef, useState } from 'react';
import './AdSense.css';

// Top Banner Ad Component - Alternative Implementation to Avoid Connection Issues
const NativeBannerTop = () => {
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Initialize top banner ad when component mounts
    const initializeTopBanner = () => {
      try {
        console.log('🚀 [TOP BANNER] Initializing alternative top banner ad (400% larger height)...');
        
        const container = containerRef.current;
        if (!container) {
          console.error('❌ [TOP BANNER] Container not found!');
          return;
        }

        // Clear any existing content
        container.innerHTML = '';
        
        // Create a unique container ID for this banner to avoid conflicts
        const uniqueContainerId = 'top-banner-container-' + Math.random().toString(36).substr(2, 9);
        container.id = uniqueContainerId;
        
        // Create the container div that the ad script expects
        const adContainer = document.createElement('div');
        adContainer.id = 'container-top-banner-ad';
        adContainer.className = 'ad-container-top';
        
        // Append the ad container to our main container
        container.appendChild(adContainer);
        
        // Try alternative approach - use the same working script as bottom banner but with different container
        const asyncScript = document.createElement('script');
        asyncScript.async = true;
        asyncScript.setAttribute('data-cfasync', 'false');
        asyncScript.setAttribute('data-ad-client', 'top-banner-alternative');
        // Use HTTPS explicitly to avoid CSP issues with protocol-relative URLs
        asyncScript.src = 'https://pl27491390.profitableratecpm.com/6c60b3df6dc253ab9508ae6ced4c8836/invoke.js';
        
        // Add load success handler
        asyncScript.onload = () => {
          console.log('✅ [TOP BANNER] Alternative script loaded successfully!');
          
          // Create the container that the script expects
          const scriptContainer = document.createElement('div');
          scriptContainer.id = 'container-6c60b3df6dc253ab9508ae6ced4c8836';
          scriptContainer.style.width = '320px';
          scriptContainer.style.height = '200px';
          scriptContainer.style.margin = '0 auto';
          scriptContainer.style.display = 'inline-block';
          scriptContainer.style.overflow = 'hidden';
          scriptContainer.style.borderRadius = '8px';
          
          // Append to our ad container
          adContainer.appendChild(scriptContainer);
          
          console.log('📝 [TOP BANNER] Script container created and appended');
          
          // Check if ads load after a delay
          setTimeout(() => {
            const hasContent = scriptContainer.innerHTML.trim() !== '';
            const hasChildren = scriptContainer.children.length > 0;
            
            console.log('📊 [TOP BANNER] Alternative ad content check:', {
              hasContent,
              hasChildren,
              contentLength: scriptContainer.innerHTML.length,
              childrenCount: scriptContainer.children.length
            });
            
            if (!hasContent && !hasChildren) {
              console.warn('❌ [TOP BANNER] No ads loaded with alternative method, hiding ad space');
              // Hide the entire ad container instead of showing fallback
              setAdLoaded(false);
            } else {
              console.log('✅ [TOP BANNER] Alternative ads loaded successfully!');
              setAdLoaded(true);
            }
          }, 3000);
        };
        
        // Add error handling for script loading
        asyncScript.onerror = (error) => {
          console.error('❌ [TOP BANNER] Alternative script failed to load:', error);
          // Hide the ad space instead of showing fallback content
          setAdLoaded(false);
          console.log('❌ [TOP BANNER] Hiding ad space due to script error');
        };
        
        console.log('📝 [TOP BANNER] Appending alternative script to document head...');
        document.head.appendChild(asyncScript);
        console.log('📝 [TOP BANNER] Alternative script appended successfully');
        
      } catch (error) {
        console.error('💥 [TOP BANNER] Critical error in initialization:', error);
        
        // Hide the ad space on error instead of showing fallback
        setAdLoaded(false);
        console.log('💥 [TOP BANNER] Hiding ad space due to critical error');
      }
    };

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(initializeTopBanner, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`native-banner-top-container ${adLoaded ? 'ad-visible' : 'ad-hidden'}`}>
      <div ref={containerRef} id="container-top-banner">
        {/* Container for 320x200 banner ad (400% larger height) */}
      </div>
    </div>
  );
};

// Export the top banner component
export default NativeBannerTop;
export { NativeBannerTop };