import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Github, MessageCircle, Mail, Heart, Download, Users, Shield } from 'lucide-react';

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
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
      <div className="footer-container">
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
                <Smartphone className="stat-icon" size={24} />
                <span className="stat-number">8+</span>
                <span className="stat-label">Mod Apps</span>
              </div>
              <div className="stat-item">
                <Download className="stat-icon" size={24} />
                <span className="stat-number">50K+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat-item">
                <Users className="stat-icon" size={24} />
                <span className="stat-number">200K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-item">
                <Shield className="stat-icon" size={24} />
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleSmoothScroll('apps')} className="footer-link">Browse Apps</button></li>
              <li><button onClick={() => handleSmoothScroll('categories')} className="footer-link">Categories</button></li>
              <li><button onClick={() => handleSmoothScroll('featured')} className="footer-link">Featured</button></li>
              <li><button onClick={() => handleSmoothScroll('new')} className="footer-link">New Releases</button></li>
              <li><button onClick={() => handleSmoothScroll('popular')} className="footer-link">Most Popular</button></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleSmoothScroll('help')} className="footer-link">Help Center</button></li>
              <li><button onClick={() => handleSmoothScroll('faq')} className="footer-link">FAQ</button></li>
              <li><button onClick={() => handleSmoothScroll('contact')} className="footer-link">Contact Us</button></li>
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
                className="social-link"
              >
                <MessageCircle size={20} />
                <span>Telegram</span>
              </a>
              <a 
                href="https://github.com/karanxa1" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a 
                href="mailto:support@modzy.in" 
                className="social-link"
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