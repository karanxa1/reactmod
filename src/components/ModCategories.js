import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, CreditCard, GraduationCap, Smartphone, Shield, Download, Star } from 'lucide-react';
import './ModCategories.css';

const ModCategories = () => {
  const modCategories = [
    {
      id: 'instagram-mods',
      title: 'Instagram Mod APK',
      description: 'Download Instagram mod apk with premium features, story downloader, no ads, and privacy controls.',
      icon: Instagram,
      features: ['Story Downloader', 'No Ads', 'Privacy Mode', 'Copy Captions'],
      keywords: 'Instagram mod apk, Instagram mod 2025, Instagram mod premium unlocked',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'telegram-mods',
      title: 'Telegram Mod APK',
      description: 'Get Telegram mod apk with multiple accounts, extra themes, privacy lock, and premium features.',
      icon: MessageCircle,
      features: ['Multiple Accounts', 'Extra Themes', 'Privacy Lock', 'Secret Chat'],
      keywords: 'Telegram mod apk, Telegram mod latest version, Telegram mod premium',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'payment-mods',
      title: 'Payment App Mods',
      description: 'Download PhonePe mod apk, PayTM mod, and other payment app mods with enhanced features.',
      icon: CreditCard,
      features: ['Enhanced UI', 'Extra Features', 'Custom Themes', 'Premium Access'],
      keywords: 'PhonePe mod apk, PayTM mod apk, payment app mods',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'educational-mods',
      title: 'Educational Mod Apps',
      description: 'Get mod educational apps like Brainly mod apk, Photomath mod, Duolingo premium unlocked.',
      icon: GraduationCap,
      features: ['Premium Unlocked', 'Ad-Free Learning', 'Offline Access', 'All Features'],
      keywords: 'Brainly mod apk, Photomath mod apk, Duolingo mod premium',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'utility-mods',
      title: 'Utility Mod Apps',
      description: 'Download utility mod apps including VPN mod apk, cleaner apps, and productivity tools.',
      icon: Smartphone,
      features: ['Premium Features', 'No Ads', 'Enhanced Performance', 'Extra Tools'],
      keywords: 'VPN mod apk, utility mod apps, productivity mod apk',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'security-mods',
      title: 'Security Mod Apps',
      description: 'Safe mod apk downloads with antivirus mod, security apps, and privacy protection tools.',
      icon: Shield,
      features: ['Enhanced Security', 'Privacy Protection', 'Safe Downloads', 'Verified Apps'],
      keywords: 'safe mod apk sites, security mod apps, antivirus mod apk',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="mod-categories" className="mod-categories-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-title">
            <Download className="title-icon" />
            Best Mod Apps Download Categories
          </h2>
          <p className="section-subtitle">
            Discover premium mod apk files across different categories. Download Instagram mod apk, 
            Telegram mod apk, educational mod apps, and more with safe, verified downloads.
          </p>
        </motion.div>

        <motion.div
          className="mod-categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {modCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                className="mod-category-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`category-gradient bg-gradient-to-br ${category.color}`}></div>
                <div className="category-content">
                  <div className="category-header">
                    <div className="category-icon">
                      <IconComponent size={32} />
                    </div>
                    <div className="category-rating">
                      <Star size={16} className="star-icon" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                  
                  <div className="category-features">
                    {category.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="category-keywords">
                    <small>{category.keywords}</small>
                  </div>
                  
                  <button className="category-btn">
                    <Download size={18} />
                    Browse {category.title}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Popular Mod Apps Section */}
        <motion.div
          className="popular-mods-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="popular-title">🔥 Most Downloaded Mod Apps 2025</h3>
          <div className="popular-tags">
            <span className="popular-tag">Instagram Mod APK Latest Version</span>
            <span className="popular-tag">Telegram Mod APK Premium</span>
            <span className="popular-tag">WhatsApp Mod APK</span>
            <span className="popular-tag">YouTube Mod APK</span>
            <span className="popular-tag">Brainly Mod APK Premium Unlocked</span>
            <span className="popular-tag">Photomath Mod APK</span>
            <span className="popular-tag">Duolingo Mod APK</span>
            <span className="popular-tag">Netflix Mod APK</span>
          </div>
        </motion.div>

        {/* SEO Content Section */}
        <motion.div
          className="seo-content-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <div className="seo-content">
            <h4>Why Choose MODZY for Mod Apps Download?</h4>
            <p>
              MODZY is your trusted source for <strong>mod apps download</strong> and <strong>mod apk download</strong>. 
              We provide the latest <strong>Instagram mod apk</strong>, <strong>Telegram mod apk</strong>, and other 
              premium mod applications with regular updates and safe downloads.
            </p>
            <ul>
              <li>✅ Safe and verified mod apk files</li>
              <li>✅ Regular updates for all mod apps</li>
              <li>✅ No malware or harmful content</li>
              <li>✅ Fast download speeds</li>
              <li>✅ 24/7 community support</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModCategories;