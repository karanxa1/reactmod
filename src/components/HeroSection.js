import React, { useState, useEffect } from 'react';
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
          <h1 className="hero-title">
            <span className="title-main">Discover Premium</span>
            <span className="title-highlight">Mobile Apps</span>
          </h1>
          
          <p className="hero-description">
            Join our exclusive Telegram community and get access to premium mobile applications, 
            early releases, and exclusive content. Your gateway to the best mobile experience.
          </p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleJoinTelegram}>
              <span className="btn-icon">📱</span>
              Join Telegram Channel
              <span className="btn-arrow">→</span>
            </button>
            
            <button className="btn-secondary" onClick={handleBrowseApps}>
              <span className="btn-icon">🚀</span>
              Browse Apps
            </button>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stats-grid">
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
      </div>
      
      <div className="hero-features">
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <div className="feature-text">Instant Access</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <div className="feature-text">Secure Downloads</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🎁</div>
          <div className="feature-text">Exclusive Content</div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">💬</div>
          <div className="feature-text">24/7 Support</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 