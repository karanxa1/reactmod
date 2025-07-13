import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Rocket, Zap, ShieldCheck, Gift, MessageSquare } from 'lucide-react';
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

  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: descRef, inView: descInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 });
  const { ref: buttonsRef, inView: buttonsInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 400 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleJoinTelegram = () => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  };

  const handleBrowseApps = () => {
    document.getElementById('apps-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-particles"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className={`hero-title ${titleInView ? 'animate-fade-in-up' : ''}`} ref={titleRef}>
            <span className="title-main">Discover Premium</span>
            <span className="title-highlight">Mobile Apps</span>
          </h1>
          
          <p className={`hero-description ${descInView ? 'animate-fade-in-up' : ''}`} ref={descRef}>
            Join our exclusive Telegram community and get access to premium mobile applications, 
            early releases, and exclusive content. Your gateway to the best mobile experience.
          </p>
          
          <div className={`hero-buttons ${buttonsInView ? 'animate-fade-in-up' : ''}`} ref={buttonsRef}>
            <button className="btn-primary" onClick={handleJoinTelegram}>
              <Send size={18} />
              Join Telegram Channel
              <span className="btn-arrow">→</span>
            </button>
            
            <button className="btn-secondary" onClick={handleBrowseApps}>
              <Rocket size={18} />
              Browse Apps
            </button>
          </div>
        </div>
        
        <div className={`stats-grid ${statsInView ? 'animate-fade-in' : ''}`} ref={statsRef}>
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
        </div>
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