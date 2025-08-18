import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, AlertTriangle, Scale, Users, Lock } from 'lucide-react';
import './TermsConditions.css';

const TermsConditions = () => {
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
      className="terms-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="terms-bg-effects">
        <div className="terms-gradient"></div>
        <div className="terms-particles"></div>
      </div>

      <div className="container">
        <motion.div
          className="terms-header"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="terms-icon">
            <Scale size={48} />
          </div>
          <h1 className="terms-title">Terms and Conditions</h1>
          <p className="terms-subtitle">
            Please read these terms carefully before using MODZY platform
          </p>
          <div className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </motion.div>

        <div className="terms-content">
          {/* Educational Purpose Disclaimer */}
          <motion.section
            className="terms-section educational-disclaimer"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <BookOpen className="section-icon" size={24} />
              <h2>Educational Purpose Disclaimer</h2>
            </div>
            <div className="disclaimer-box">
              <AlertTriangle className="warning-icon" size={20} />
              <div className="disclaimer-content">
                <h3>Important Notice</h3>
                <p>
                  All modified applications ("modded apps") provided on the MODZY platform are 
                  <strong> strictly for educational and research purposes only</strong>. These applications 
                  are intended to help users understand software functionality, learn about mobile 
                  application development, and explore educational content.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Copyright Non-Infringement */}
          <motion.section
            className="terms-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Shield className="section-icon" size={24} />
              <h2>Copyright and Intellectual Property</h2>
            </div>
            <div className="terms-text">
              <p>
                MODZY respects intellectual property rights and does not intend to infringe 
                upon existing copyrights. All applications and content provided are:
              </p>
              <ul>
                <li>Used under fair use principles for educational purposes</li>
                <li>Not intended for commercial distribution or profit</li>
                <li>Provided to enhance learning and understanding of mobile technologies</li>
                <li>Subject to removal upon legitimate copyright holder requests</li>
              </ul>
              <p>
                If you are a copyright holder and believe your rights have been infringed, 
                please contact us immediately for prompt resolution.
              </p>
            </div>
          </motion.section>

          {/* User Responsibilities */}
          <motion.section
            className="terms-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Users className="section-icon" size={24} />
              <h2>User Responsibilities</h2>
            </div>
            <div className="terms-text">
              <p>By using MODZY, you agree to:</p>
              <ul>
                <li>Use all applications solely for educational and learning purposes</li>
                <li>Not redistribute, sell, or commercialize any downloaded content</li>
                <li>Respect the intellectual property rights of original developers</li>
                <li>Comply with all applicable local, national, and international laws</li>
                <li>Not use the platform for any illegal or unauthorized activities</li>
              </ul>
            </div>
          </motion.section>

          {/* Platform Usage */}
          <motion.section
            className="terms-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="section-header">
              <Lock className="section-icon" size={24} />
              <h2>Platform Usage Guidelines</h2>
            </div>
            <div className="terms-text">
              <h3>Acceptable Use</h3>
              <p>
                MODZY is designed as an educational platform. Users must ensure their 
                activities align with educational objectives and legal requirements.
              </p>
              
              <h3>Prohibited Activities</h3>
              <ul>
                <li>Commercial use or redistribution of applications</li>
                <li>Reverse engineering for malicious purposes</li>
                <li>Violation of original software licenses</li>
                <li>Any activity that infringes on third-party rights</li>
              </ul>

              <h3>Disclaimer of Warranties</h3>
              <p>
                MODZY provides applications "as is" for educational purposes. We make no 
                warranties regarding functionality, security, or fitness for any particular purpose.
              </p>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            className="terms-section contact-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="contact-box">
              <h3>Questions or Concerns?</h3>
              <p>
                If you have any questions about these Terms and Conditions or need to 
                report copyright concerns, please contact us through our official channels.
              </p>
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

export default TermsConditions;