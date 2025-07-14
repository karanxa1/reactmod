import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Rocket, Zap, ShieldCheck, Gift, MessageSquare } from 'lucide-react';
import AnimatedText from './AnimatedText';
import TypewriterText from './TypewriterText';
import ToastContainer, { showToast } from './ToastNotification';
import './HeroSection.css';

const HeroSection = () => {
  const [stats, setStats] = useState({
    totalDownloads: 0,
    activeUsers: 0,
    appsAvailable: 0,
    telegramMembers: 0
  });

  // Optimized counter animation using requestAnimationFrame
  const animateCounter = useCallback((target, key, duration = 1500) => {
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      setStats(prev => ({ ...prev, [key]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter(50000, 'totalDownloads');
      animateCounter(15000, 'activeUsers');
      animateCounter(2, 'appsAvailable');
      animateCounter(145783, 'telegramMembers');
    }, 500);

    return () => clearTimeout(timer);
  }, [animateCounter]);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yStats = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const { ref: buttonsRef, inView: buttonsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleJoinTelegram = useCallback(() => {
    window.open('https://t.me/keyisheremybaby', '_blank');
    showToast.success('Redirecting to Telegram...', 'Welcome!', { duration: 3000 });
  }, []);

  const handleBrowseApps = useCallback(() => {
    document.getElementById('apps-section')?.scrollIntoView({ behavior: 'smooth' });
    showToast.info('Scrolling to apps section', 'Explore Apps', { duration: 2000 });
  }, []);

  // Simplified animation variants
  const buttonVariants = {
    hover: {
      scale: 1.03,
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    hover: {
      rotate: 180,
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="hero-section" ref={sectionRef}>
      <ToastContainer position="top-right" />
      <motion.div className="hero-background" style={{ y: yBg }}>
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </motion.div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <AnimatedText 
              text="Discover Premium"
              el="span"
              className="title-main"
              splitBy="word"
            />
            <TypewriterText 
              texts={["Mobile Apps", "Gaming Tools", "Premium Features"]}
              className="title-highlight gradient-text typewriter-gradient"
              speed={120}
              deleteSpeed={80}
              pauseTime={2000}
            />
          </h1>
          
          <AnimatedText 
            text="Join our exclusive Telegram community and get access to premium mobile applications, early releases, and exclusive content."
            el="p"
            className="hero-description"
            splitBy="word"
          />
          
          <div className={`hero-buttons ${buttonsInView ? 'animate-fade-in-up' : ''}`} ref={buttonsRef}>
            <motion.button 
              className="btn-primary" 
              onClick={handleJoinTelegram}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div variants={iconVariants}>
                <Send size={18} />
              </motion.div>
              Join Telegram Channel
              <span className="btn-arrow">→</span>
            </motion.button>
            
            <motion.button 
              className="btn-secondary" 
              onClick={handleBrowseApps}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div variants={iconVariants}>
                <Rocket size={18} />
              </motion.div>
              Browse Apps
            </motion.button>
          </div>
        </div>
        
        <motion.div className={`stats-grid ${statsInView ? 'animate-fade-in' : ''}`} ref={statsRef} style={{ y: yStats }}>
          <div className="stat-item">
            <div className="stat-number">{stats.totalDownloads.toLocaleString()}+</div>
            <div className="stat-label">Total Downloads</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">{stats.activeUsers.toLocaleString()}+</div>
            <div className="stat-label">Active Users</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">{stats.appsAvailable}</div>
            <div className="stat-label">Premium Apps</div>
          </div>
          
          <div className="stat-item telegram-stat">
            <div className="stat-number">{stats.telegramMembers.toLocaleString()}+</div>
            <div className="stat-label">Telegram Members</div>
            <div className="stat-badge">Active Community</div>
          </div>
        </motion.div>
      </div>
      
      <div className={`hero-features ${statsInView ? 'animate-fade-in' : ''}`}>
        <div className="feature-item">
          <div className="feature-icon"><Zap size={24} /></div>
          <div className="feature-text">Instant Access</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon"><ShieldCheck size={24} /></div>
          <div className="feature-text">Secure Downloads</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon"><Gift size={24} /></div>
          <div className="feature-text">Exclusive Content</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon"><MessageSquare size={24} /></div>
          <div className="feature-text">24/7 Support</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 