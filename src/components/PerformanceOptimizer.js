import React, { useEffect, useState } from 'react';

const PerformanceOptimizer = ({ children }) => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Detect low-end devices
    const checkDevicePerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      // Check for WebGL support and basic performance indicators
      const hasWebGL = !!gl;
      const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      // Consider it low-end if:
      // - No WebGL support
      // - Less than 4GB RAM
      // - Less than 4 CPU cores
      // - Slow connection (2G or slow 3G)
      const isLowEnd = !hasWebGL || memory < 4 || cores < 4;
      const isSlow = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      
      setIsLowEndDevice(isLowEnd);
      setIsSlowConnection(isSlow);
      
      // Add performance class to body
      if (isLowEnd || isSlow) {
        document.body.classList.add('low-performance');
      } else {
        document.body.classList.remove('low-performance');
      }
    };

    checkDevicePerformance();

    // Listen for connection changes
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const handleConnectionChange = () => {
        const isSlow = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
        setIsSlowConnection(isSlow);
        
        if (isSlow) {
          document.body.classList.add('low-performance');
        } else {
          document.body.classList.remove('low-performance');
        }
      };

      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  return (
    <div className={`performance-optimizer ${isLowEndDevice ? 'low-end-device' : ''} ${isSlowConnection ? 'slow-connection' : ''}`}>
      {children}
    </div>
  );
};

export default PerformanceOptimizer;

