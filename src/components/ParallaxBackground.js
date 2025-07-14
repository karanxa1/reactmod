import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxBackground.css';

const ParallaxBackground = ({ children }) => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="parallax-container">
      {/* Background layers */}
      <motion.div 
        className="parallax-layer parallax-layer-1"
        style={{ y: y1 }}
      >
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
      </motion.div>
      
      <motion.div 
        className="parallax-layer parallax-layer-2"
        style={{ y: y2, rotate }}
      >
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </motion.div>
      
      <motion.div 
        className="parallax-layer parallax-layer-3"
        style={{ y: y3, scale }}
      >
        <div className="floating-shape shape-5"></div>
        <div className="floating-shape shape-6"></div>
      </motion.div>
      
      {/* Content */}
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground; 