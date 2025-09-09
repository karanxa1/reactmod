import React, { useEffect, useState, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseFollowerRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Listen for reduced motion changes
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (isReducedMotion || isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (mouseFollowerRef.current) {
        mouseFollowerRef.current.style.left = `${e.clientX - 150}px`;
        mouseFollowerRef.current.style.top = `${e.clientY - 150}px`;
        mouseFollowerRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (mouseFollowerRef.current) {
        mouseFollowerRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion, isMobile]);

  // Don't render complex animations on mobile or if reduced motion is preferred
  if (isReducedMotion || isMobile) {
    return (
      <div className="animated-background">
        <div className="gradient-mesh"></div>
        <div className="static-glow"></div>
      </div>
    );
  }

  return (
    <div className="animated-background">
      {/* Enhanced Gradient Mesh Background */}
      <div className="gradient-mesh"></div>
      <div className="gradient-mesh-secondary"></div>
      
      {/* Floating Particles with enhanced effects */}
      <div className="floating-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      {/* Interactive Background Elements */}
      <div className="interactive-bg">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>
      
      {/* Enhanced Mouse Follower Effect */}
      <div ref={mouseFollowerRef} className="mouse-follower"></div>
      
      {/* Animated Grid Lines */}
      <div className="grid-lines"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      {/* Pulsing Energy Orbs */}
      <div className="energy-orbs">
        <div className="energy-orb energy-orb-1"></div>
        <div className="energy-orb energy-orb-2"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
