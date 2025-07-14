import React, { useState, useEffect, useRef } from 'react';
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
    showToast.success('Redirecting to Telegram...', 'Welcome!', { duration: 3000 });
  };

  const handleBrowseApps = () => {
    document.getElementById('apps-section')?.scrollIntoView({ behavior: 'smooth' });
    showToast.info('Scrolling to apps section', 'Explore Apps', { duration: 2000 });
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 1.1
    }
  };

  const arrowVariants = {
    hover: {
      x: 8,
      rotate: 45,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
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
              splitBy="letter"
            />
            <TypewriterText 
              texts={["Mobile Apps", "Gaming Tools", "Exclusive Content", "Premium Features"]}
              className="title-highlight gradient-text typewriter-gradient"
              speed={150}
              deleteSpeed={100}
              pauseTime={2000}
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
              <motion.div variants={iconVariants}>
                <Send size={18} />
              </motion.div>
              Join Telegram Channel
              <motion.span className="btn-arrow" variants={arrowVariants}>
                →
              </motion.span>
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