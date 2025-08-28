import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// Register service worker for caching and offline functionality
// Removed duplicate service worker registration (kept a single robust block below)

// Enhanced Mobile Viewport and Touch Optimizations
const addMobileOptimizations = () => {
  // Remove existing viewport meta tag
  const existingViewport = document.querySelector('meta[name="viewport"]');
  if (existingViewport) {
    existingViewport.remove();
  }
  
  // Add optimized viewport meta tag
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';
  document.head.appendChild(viewport);
  
  // Add smooth scrolling CSS
  const smoothScrollStyle = document.createElement('style');
  smoothScrollStyle.textContent = `
    html, body {
      scroll-behavior: smooth !important;
      -webkit-overflow-scrolling: touch !important;
    }
    * {
      scroll-behavior: smooth;
    }
  `;
  document.head.appendChild(smoothScrollStyle);

  // Add meta tags for mobile optimization
  const metaTags = [
    { name: 'theme-color', content: '#667eea' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'MODZY' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'msapplication-tap-highlight', content: 'no' }
  ];

  metaTags.forEach(tag => {
    const existing = document.querySelector(`meta[name="${tag.name}"]`);
    if (existing) existing.remove();
    
    const meta = document.createElement('meta');
    meta.name = tag.name;
    meta.content = tag.content;
    document.head.appendChild(meta);
  });
};

// Prevent horizontal scrolling and width expansion
const preventHorizontalScroll = () => {
  // Prevent elastic bounce on iOS
  // Avoid blocking scrolling with non-passive listeners
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: true });

  // Prevent zoom on input focus
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Fix viewport on orientation change
  const handleOrientationChange = () => {
    setTimeout(() => {
      // Force viewport recalculation
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';
      }
      
      // Reset body styles
      document.body.style.width = '100vw';
      document.body.style.maxWidth = '100vw';
      document.body.style.overflowX = 'hidden';
      
      // Reset root styles  
      const root = document.getElementById('root');
      if (root) {
        root.style.width = '100vw';
        root.style.maxWidth = '100vw';
        root.style.overflowX = 'hidden';
      }
    }, 500);
  };

  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
};

// Enhanced haptic feedback function
window.hapticFeedback = (type = 'light') => {
  if ('vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(50);
        break;
      case 'heavy':
        navigator.vibrate([100, 30, 100]);
        break;
      default:
        navigator.vibrate(10);
    }
  }
};

// Service Worker Registration - Temporarily disabled for debugging
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              const shouldUpdate = window.confirm('New version available! Refresh to update?');
              if (shouldUpdate) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
*/

// Enhanced console error interception for ad network errors
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Filter out ad network related errors
    const isAdError = (
      message.includes('Z3 is not a function') ||
      message.includes('Z5 is not a function') ||
      message.includes('Z4 is not a function') ||
      message.includes('Z2 is not a function') ||
      message.includes('Z1 is not a function') ||
      message.includes('invoke.js') ||
      message.includes('Content Security Policy') ||
      message.includes('Refused to connect') ||
      message.includes('Fetch API cannot load') ||
      // Generic ad-related patterns
      /\b[A-Z]\d+ is not a function\b/.test(message) ||
      // Any CSP violation
      message.includes('violates the following Content Security Policy')
    );
    
    if (isAdError) {
      // Silently log ad errors with a different prefix
      console.warn('⚠️ [AD ERROR FILTERED]', ...args);
      return;
    }
    
    // Call original console.error for legitimate errors
    originalConsoleError.apply(console, args);
  };
}

// Global error handler for unhandled script errors
window.addEventListener('error', (event) => {
  // Enhanced ad network error filtering
  const isAdNetworkError = (
    event.message && (
      event.message.includes('Z3 is not a function') ||
      event.message.includes('Z5 is not a function') ||
      event.message.includes('Z4 is not a function') ||
      event.message.includes('Z2 is not a function') ||
      event.message.includes('Z1 is not a function') ||
      event.message.includes('invoke.js') ||
      event.message.includes('ad network') ||
      event.message.includes('script error') ||
      event.message.includes('Content Security Policy') ||
      event.message.includes('Refused to connect') ||
      // Generic ad function error pattern
      /\b[A-Z]\d+ is not a function\b/.test(event.message)
    )
  ) || (
    event.filename && (
      event.filename.includes('invoke.js') ||
      // Generic ad domain pattern
      /\.com\/.*invoke\.js/.test(event.filename)
    )
  );
  
  if (isAdNetworkError) {
    console.warn('⚠️ [AD ERROR SUPPRESSED] Ad network error filtered:', {
      message: event.message,
      filename: event.filename,
      source: 'Ad Network'
    });
    
    // Prevent error from propagating
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return true; // Prevent default error handling
  }
  
  // Log non-ad errors normally
  console.error('🚨 Global Error Handler - Unhandled Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
    stack: event.error?.stack,
    timestamp: new Date().toISOString()
  });
  
  // Don't prevent default error handling for legitimate errors
  return false;
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  // Check if the rejection is related to ad networks
  const reason = event.reason;
  const isAdNetworkRejection = (
    reason && (
      (typeof reason === 'string' && (
        reason.includes('Z3 is not a function') ||
        reason.includes('Z5 is not a function') ||
        reason.includes('Z4 is not a function') ||
        reason.includes('Z2 is not a function') ||
        reason.includes('Z1 is not a function') ||
        reason.includes('invoke.js') ||
        reason.includes('Content Security Policy') ||
        reason.includes('Refused to connect') ||
        // Generic ad function error pattern
        /\b[A-Z]\d+ is not a function\b/.test(reason)
      )) ||
      (reason.message && (
        reason.message.includes('Z3 is not a function') ||
        reason.message.includes('Z5 is not a function') ||
        reason.message.includes('Z4 is not a function') ||
        reason.message.includes('Z2 is not a function') ||
        reason.message.includes('Z1 is not a function') ||
        reason.message.includes('invoke.js') ||
        reason.message.includes('Content Security Policy') ||
        reason.message.includes('Refused to connect') ||
        // Generic ad function error pattern
        /\b[A-Z]\d+ is not a function\b/.test(reason.message)
      )) ||
      (reason.stack && (
        reason.stack.includes('invoke.js') ||
        // Generic ad domain pattern in stack
        /\.com\/.*invoke\.js/.test(reason.stack)
      ))
    )
  );
  
  if (isAdNetworkRejection) {
    console.warn('⚠️ [AD PROMISE REJECTION SUPPRESSED] Ad network promise rejection filtered:', {
      reason: typeof reason === 'string' ? reason : reason?.message || 'Unknown',
      source: 'Ad Network'
    });
    
    // Prevent unhandled rejection
    event.preventDefault();
    return true;
  }
  
  // Log non-ad promise rejections normally
  console.error('🚨 Global Error Handler - Unhandled Promise Rejection:', {
    reason: event.reason,
    promise: event.promise,
    timestamp: new Date().toISOString()
  });
  
  // Don't prevent default error handling for legitimate rejections
  return false;
});

// Initialize mobile optimizations after all functions are defined
addMobileOptimizations();
preventHorizontalScroll();
