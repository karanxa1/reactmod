import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxBackground.css';

const ParallaxBackground = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Disable parallax transforms on mobile for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -60]);

  if (isMobile) {
    // Simplified version for mobile - no parallax effects
    return (
      <div className="parallax-container mobile-optimized">
        <div className="parallax-content">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="parallax-container">
      {/* Reduced background layers for better performance */}
      <motion.div 
        className="parallax-layer parallax-layer-1"
        style={{ y: y1 }}
      >
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </motion.div>
      
      <motion.div 
        className="parallax-layer parallax-layer-2"
        style={{ y: y2 }}
      >
        <div className="floating-shape shape-3"></div>
      </motion.div>
      
      {/* Content */}
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground; 