import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Rocket, Zap, ShieldCheck, Gift, MessageSquare } from 'lucide-react';
import AnimatedText from './AnimatedText';
import './HeroSection.css';

const HeroSection = () => {
  const [stats, setStats] = useState({
    totalDownloads: 0,
    activeUsers: 0,
    appsAvailable: 0,
    telegramMembers: 0
  });

  // Animate counters on component mount
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    // Animate all counters
    animateCounter(50000, 'totalDownloads');
    animateCounter(15000, 'activeUsers');
    animateCounter(2, 'appsAvailable');
    animateCounter(145783, 'telegramMembers');
  }, []);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const yStats = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);


  const { ref: buttonsRef, inView: buttonsInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 400 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleJoinTelegram = () => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  };

  const handleBrowseApps = () => {
    document.getElementById('apps-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const buttonVariants = {
    hover: {
      scale: 1.05
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section className="hero-section" ref={sectionRef}>
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
              splitBy="letter"
            />
            <AnimatedText 
              text="Mobile Apps"
              el="span"
              className="title-highlight gradient-text"
              splitBy="letter"
            />
          </h1>
          
          <AnimatedText 
            text="Join our exclusive Telegram community and get access to premium mobile applications, early releases, and exclusive content. Your gateway to the best mobile experience."
            el="p"
            className="hero-description"
          />
          
          <div className={`hero-buttons ${buttonsInView ? 'animate-fade-in-up' : ''}`} ref={buttonsRef}>
            <motion.button 
              className="btn-primary" 
              onClick={handleJoinTelegram}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Send size={18} />
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
              <Rocket size={18} />
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
      
      <div className={`hero-features ${featuresInView ? 'animate-fade-in' : ''}`} ref={featuresRef}>
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