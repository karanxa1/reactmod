import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Database, Lock, Users, Globe, AlertCircle } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="privacy-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="privacy-bg-effects">
        <div className="privacy-gradient"></div>
        <div className="privacy-particles"></div>
      </div>

      <div className="container">
        <motion.div
          className="privacy-header"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="privacy-icon">
            <Shield size={48} />
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Your privacy is important to us. Learn how we protect your data on MODZY.
          </p>
          <div className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </motion.div>

        <div className="privacy-content">
          {/* Privacy Overview */}
          <motion.section
            className="privacy-section privacy-overview"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Eye className="section-icon" size={24} />
              <h2>Privacy Overview</h2>
            </div>
            <div className="privacy-highlight">
              <AlertCircle className="highlight-icon" size={20} />
              <div className="highlight-content">
                <h3>Our Commitment</h3>
                <p>
                  MODZY is committed to protecting your privacy and ensuring transparency 
                  about our data practices. This policy explains how we collect, use, and 
                  safeguard your information when you use our educational platform.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Information Collection */}
          <motion.section
            className="privacy-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Database className="section-icon" size={24} />
              <h2>Information We Collect</h2>
            </div>
            <div className="privacy-text">
              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device information (type, operating system, browser)</li>
                <li>Usage analytics (pages visited, time spent, interactions)</li>
                <li>Technical data (IP address, cookies, session data)</li>
                <li>Performance metrics for platform optimization</li>
              </ul>
              
              <h3>Information You Provide</h3>
              <ul>
                <li>Contact information when you reach out to us</li>
                <li>Feedback and suggestions you submit</li>
                <li>Communication preferences</li>
              </ul>
              
              <h3>Third-Party Services</h3>
              <p>
                We use Firebase for analytics and performance monitoring. Firebase may 
                collect additional data as outlined in Google's Privacy Policy.
              </p>
            </div>
          </motion.section>

          {/* How We Use Information */}
          <motion.section
            className="privacy-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Globe className="section-icon" size={24} />
              <h2>How We Use Your Information</h2>
            </div>
            <div className="privacy-text">
              <p>We use collected information to:</p>
              <ul>
                <li>Provide and maintain the MODZY platform</li>
                <li>Improve user experience and platform functionality</li>
                <li>Analyze usage patterns for educational insights</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Respond to user inquiries and provide support</li>
                <li>Comply with legal obligations and protect rights</li>
              </ul>
              
              <h3>Educational Purpose Alignment</h3>
              <p>
                All data usage aligns with our educational mission. We do not use 
                personal information for commercial advertising or sell data to third parties.
              </p>
            </div>
          </motion.section>

          {/* Data Protection */}
          <motion.section
            className="privacy-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Lock className="section-icon" size={24} />
              <h2>Data Protection & Security</h2>
            </div>
            <div className="privacy-text">
              <h3>Security Measures</h3>
              <ul>
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure cloud infrastructure with Firebase</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication protocols</li>
              </ul>
              
              <h3>Data Retention</h3>
              <p>
                We retain data only as long as necessary for educational purposes and 
                legal compliance. Analytics data is anonymized and aggregated for insights.
              </p>
              
              <h3>International Transfers</h3>
              <p>
                Data may be processed in countries where our service providers operate. 
                We ensure appropriate safeguards are in place for international transfers.
              </p>
            </div>
          </motion.section>

          {/* User Rights */}
          <motion.section
            className="privacy-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Users className="section-icon" size={24} />
              <h2>Your Rights & Choices</h2>
            </div>
            <div className="privacy-text">
              <h3>Your Privacy Rights</h3>
              <ul>
                <li>Access information about data we collect</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (where legally permissible)</li>
                <li>Opt-out of certain data collection practices</li>
                <li>Receive information about data sharing</li>
              </ul>
              
              <h3>Cookie Management</h3>
              <p>
                You can control cookies through your browser settings. Note that 
                disabling cookies may affect platform functionality.
              </p>
              
              <h3>Analytics Opt-Out</h3>
              <p>
                You can opt-out of analytics tracking through your browser's 
                "Do Not Track" setting or by contacting us directly.
              </p>
            </div>
          </motion.section>

          {/* Third-Party Services */}
          <motion.section
            className="privacy-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Globe className="section-icon" size={24} />
              <h2>Third-Party Services</h2>
            </div>
            <div className="privacy-text">
              <h3>Firebase (Google)</h3>
              <p>
                We use Firebase for hosting, analytics, and performance monitoring. 
                Google's privacy practices are governed by their Privacy Policy.
              </p>
              
              <h3>Telegram Integration</h3>
              <p>
                Our platform includes links to Telegram channels. Telegram's privacy 
                practices are governed by their Privacy Policy.
              </p>
              
              <h3>External Links</h3>
              <p>
                Our platform may contain links to external websites. We are not 
                responsible for the privacy practices of these external sites.
              </p>
            </div>
          </motion.section>

          {/* Contact & Updates */}
          <motion.section
            className="privacy-section contact-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="contact-box">
              <h3>Privacy Questions & Updates</h3>
              <p>
                If you have questions about this Privacy Policy or want to exercise 
                your privacy rights, please contact us through our official channels.
              </p>
              
              <div className="policy-updates">
                <h4>Policy Updates</h4>
                <p>
                  We may update this Privacy Policy periodically. Significant changes 
                  will be communicated through our platform or official channels.
                </p>
              </div>
              
              <div className="contact-links">
                <a href="https://t.me/keyisheremybaby" target="_blank" rel="noopener noreferrer">
                  Contact via Telegram
                </a>
                <a href="https://github.com/karanxa1" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;