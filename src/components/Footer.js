import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleTelegramClick = () => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:support@modz.com', '_blank');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // For now, just show success message
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (href, linkName) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      alert(`${linkName} - Coming Soon! Join our Telegram channel for updates.`);
    }
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Bug Reports', href: '#bugs' },
      { name: 'Feature Requests', href: '#features' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'DMCA', href: '#dmca' }
    ],
    community: [
      { name: 'Telegram Channel', href: 'https://t.me/keyisheremybaby' },
      { name: 'Discord Server', href: '#discord' },
      { name: 'Reddit Community', href: '#reddit' },
      { name: 'Developer Forum', href: '#forum' }
    ]
  };

  const socialLinks = [
    { name: 'Telegram', icon: '📱', href: 'https://t.me/keyisheremybaby', color: '#0088cc' },
    { name: 'Twitter', icon: '🐦', href: '#twitter', color: '#1da1f2' },
    { name: 'Instagram', icon: '📷', href: '#instagram', color: '#e4405f' },
    { name: 'YouTube', icon: '📺', href: '#youtube', color: '#ff0000' },
    { name: 'GitHub', icon: '💻', href: '#github', color: '#333' }
  ];

  const stats = [
    { number: '145K+', label: 'Community Members' },
    { number: '50K+', label: 'Daily Downloads' },
    { number: '99%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-particles"></div>
        <div className="footer-gradient"></div>
      </div>

      <div className="footer-content">
        {/* Stats Section */}
        <div className="footer-stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              {/* Brand Section */}
              <div className="footer-brand">
                <div className="brand-logo">
                  <span className="logo-icon">📱</span>
                  <span className="logo-text">MODZ</span>
                </div>
                <p className="brand-description">
                  Your premium destination for mobile applications. Join our exclusive 
                  community and discover the best apps with early access and exclusive content.
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="social-link"
                      style={{ '--social-color': social.color }}
                      onClick={social.name === 'Telegram' ? handleTelegramClick : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <div className="footer-section">
                <h3 className="section-title">Company</h3>
                <ul className="footer-links">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => handleFooterLinkClick(link.href, link.name)}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div className="footer-section">
                <h3 className="section-title">Support</h3>
                <ul className="footer-links">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => handleFooterLinkClick(link.href, link.name)}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div className="footer-section">
                <h3 className="section-title">Legal</h3>
                <ul className="footer-links">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => handleFooterLinkClick(link.href, link.name)}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Links */}
              <div className="footer-section">
                <h3 className="section-title">Community</h3>
                <ul className="footer-links">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => handleFooterLinkClick(link.href, link.name)}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="container">
            <div className="newsletter-content">
              <div className="newsletter-info">
                <h3 className="newsletter-title">Stay Updated</h3>
                <p className="newsletter-description">
                  Get the latest app releases, exclusive content, and community updates 
                  delivered directly to your inbox.
                </p>
              </div>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    <span className="button-text">
                      {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                    </span>
                    <span className="button-icon">📧</span>
                  </button>
                </div>
                {isSubscribed && (
                  <div className="newsletter-success">
                    Thank you for subscribing! You'll receive updates about new apps and exclusive content.
                  </div>
                )}
                <p className="newsletter-note">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="container">
            <div className="bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} MODZ. All rights reserved.</p>
              </div>
              <div className="bottom-links">
                <button onClick={() => handleFooterLinkClick('#privacy', 'Privacy Policy')} className="bottom-link">Privacy</button>
                <button onClick={() => handleFooterLinkClick('#terms', 'Terms of Service')} className="bottom-link">Terms</button>
                <button onClick={() => handleFooterLinkClick('#cookies', 'Cookie Policy')} className="bottom-link">Cookies</button>
                <button onClick={() => handleFooterLinkClick('#sitemap', 'Sitemap')} className="bottom-link">Sitemap</button>
              </div>
              <div className="footer-badge">
                <span className="badge-text">Made with</span>
                <span className="badge-heart">❤️</span>
                <span className="badge-text">for the community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 