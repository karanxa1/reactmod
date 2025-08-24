import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Github, MessageCircle, Mail, Heart, Download, Users, Shield } from 'lucide-react';


import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState({ apps: 0, downloads: 0, users: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Animated counter effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 } // Reduced threshold for better triggering
    );

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const footerElement = document.querySelector('.footer');
      if (footerElement) {
        observer.observe(footerElement);
      } else {
        // Fallback: trigger animation after 2 seconds if footer not found
        setTimeout(() => {
          if (!isVisible) {
            setIsVisible(true);
            animateCounters();
          }
        }, 2000);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isVisible]);

  const animateCounters = () => {
    const targets = {
      apps: 8,
      downloads: 50000,
      users: 200000
    };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setStats({
        apps: Math.floor(targets.apps * easeOut),
        downloads: Math.floor(targets.downloads * easeOut),
        users: Math.floor(targets.users * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, stepTime);
  };



  const handleSmoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Account for any fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-bg-effects">
        <div className="footer-gradient"></div>
        <div className="footer-particles"></div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <Smartphone className="footer-logo-icon" />
              <span className="footer-logo-text">MODZY</span>
            </div>
            <p className="footer-description">
              Your ultimate destination for premium mobile applications. 
              Discover, download, and enjoy the best apps curated just for you.
            </p>
            <div className="footer-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <Smartphone size={24} />
                </div>
                <span className="stat-number">{stats.apps}+</span>
                <span className="stat-label">Mod Apps</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Download size={24} />
                </div>
                <span className="stat-number">{(stats.downloads / 1000).toFixed(1)}K+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <span className="stat-number">{(stats.users / 1000).toFixed(1)}K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Shield size={24} />
                </div>
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleSmoothScroll('apps')} className="footer-link footer-link-button">Browse Apps</button></li>
              <li><button onClick={() => handleSmoothScroll('categories')} className="footer-link footer-link-button">Categories</button></li>
              <li><button onClick={() => handleSmoothScroll('featured')} className="footer-link footer-link-button">Featured</button></li>
              <li><button onClick={() => handleSmoothScroll('new')} className="footer-link footer-link-button">New Releases</button></li>
              <li><button onClick={() => handleSmoothScroll('popular')} className="footer-link footer-link-button">Most Popular</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleSmoothScroll('help')} className="footer-link footer-link-button">  Help Center</button></li>
              <li><button onClick={() => handleSmoothScroll('faq')} className="footer-link footer-link-button">  FAQ</button></li>
              <li><button onClick={() => handleSmoothScroll('contact')} className="footer-link footer-link-button">Contact Us</button></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <a 
                href="https://t.me/keyisheremybaby" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link telegram"
              >
                <MessageCircle size={20} />
                <span>Telegram</span>
              </a>
              <a 
                href="https://github.com/karanxa1" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a 
                href="#email" 
                className="social-link email"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
            </div>
            
            <div className="newsletter">
              <h4 className="newsletter-title">🔔 Get Mod Updates</h4>
              <p className="newsletter-text">Never miss new mod releases</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <Mail size={16} />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} MODZY. Made with <Heart size={16} className="heart-icon" /> for mobile enthusiasts.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms</Link>
              <a href="#cookies" className="footer-bottom-link">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;