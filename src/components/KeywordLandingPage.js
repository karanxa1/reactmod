import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Download, Shield, Star, Users, Zap, Smartphone } from 'lucide-react';

const KeywordLandingPage = () => {
  const { keyword } = useParams();
  
  // Keyword-specific content mapping
  const keywordContent = {
    'instagram-mod-apk': {
      title: 'Instagram Mod APK Download 2025 - Latest Version Free',
      description: 'Download Instagram Mod APK latest version 2025 with premium features unlocked. Story downloader, no ads, reels download, hide online status, and more features.',
      keywords: 'Instagram mod apk, Instagram mod apk download, Instagram mod 2025, Instagram premium mod',
      hero: {
        title: 'Instagram Mod APK 2025',
        subtitle: 'Download Latest Version with Premium Features',
        description: 'Get Instagram Mod APK with story downloader, reels download, no ads, hide online status, copy captions, and premium themes. Updated for 2025 with latest features.'
      },
      features: [
        { icon: Download, title: 'Story & Reels Download', desc: 'Download stories, reels, and IGTV videos directly' },
        { icon: Shield, title: 'No Ads Experience', desc: 'Enjoy Instagram without any advertisements' },
        { icon: Star, title: 'Premium Themes', desc: 'Access exclusive themes and customization options' },
        { icon: Users, title: 'Privacy Features', desc: 'Hide online status, read receipts, and typing indicators' }
      ],
      relatedApps: ['Telegram Mod APK', 'WhatsApp Mod APK', 'Facebook Mod APK']
    },
    'telegram-mod-apk': {
      title: 'Telegram Mod APK Download 2025 - Premium Features Unlocked',
      description: 'Download Telegram Mod APK 2025 with multiple accounts, premium themes, privacy lock, unlimited file sharing, and advanced messaging features.',
      keywords: 'Telegram mod apk, Telegram mod apk download, Telegram premium mod, Telegram mod 2025',
      hero: {
        title: 'Telegram Mod APK 2025',
        subtitle: 'Advanced Messaging with Premium Features',
        description: 'Download Telegram Mod APK with multiple account support, premium themes, privacy lock, unlimited file sharing, and enhanced messaging features.'
      },
      features: [
        { icon: Users, title: 'Multiple Accounts', desc: 'Use multiple Telegram accounts simultaneously' },
        { icon: Shield, title: 'Privacy Lock', desc: 'Fingerprint/PIN lock for enhanced security' },
        { icon: Zap, title: 'Unlimited Sharing', desc: 'Share large files without size restrictions' },
        { icon: Star, title: 'Premium Themes', desc: 'Access to exclusive themes and customizations' }
      ],
      relatedApps: ['Instagram Mod APK', 'WhatsApp Mod APK', 'Discord Mod APK']
    },
    'educational-mod-apps': {
      title: 'Educational Mod Apps 2025 - Premium Learning Apps Free',
      description: 'Download best educational mod apps 2025 including Brainly mod apk, Photomath mod apk, Duolingo mod apk with premium features unlocked for free.',
      keywords: 'educational mod apps, Brainly mod apk, Photomath mod apk, Duolingo mod apk, learning apps mod',
      hero: {
        title: 'Educational Mod Apps 2025',
        subtitle: 'Premium Learning Apps with Features Unlocked',
        description: 'Access premium educational apps for free. Download Brainly mod apk, Photomath mod apk, Duolingo mod apk, and more with all premium features unlocked.'
      },
      features: [
        { icon: Smartphone, title: 'Brainly Premium', desc: 'Unlimited questions and expert answers' },
        { icon: Zap, title: 'Photomath Pro', desc: 'Step-by-step math solutions without limits' },
        { icon: Star, title: 'Duolingo Plus', desc: 'Unlimited hearts and offline lessons' },
        { icon: Download, title: 'Khan Academy Pro', desc: 'Ad-free learning with premium content' }
      ],
      relatedApps: ['Study Apps', 'Language Learning Apps', 'Math Solver Apps']
    },
    'safe-mod-apk-download': {
      title: 'Safe Mod APK Download 2025 - Trusted Mod Apps Site',
      description: 'Download safe mod apk files from trusted source. Virus-free Instagram mod apk, Telegram mod apk, educational mod apps with security verification.',
      keywords: 'safe mod apk download, trusted mod apps, virus free mod apk, secure mod apps download',
      hero: {
        title: 'Safe Mod APK Downloads',
        subtitle: 'Trusted Source for Virus-Free Mod Apps',
        description: 'Download mod apk files safely from our verified collection. All apps are scanned for malware and tested for security before upload.'
      },
      features: [
        { icon: Shield, title: 'Virus Scanned', desc: 'All mod apk files scanned for malware' },
        { icon: Star, title: 'Verified Source', desc: 'Trusted developers and verified uploads' },
        { icon: Users, title: 'Community Tested', desc: 'Apps tested by our user community' },
        { icon: Zap, title: 'Regular Updates', desc: 'Latest versions with security patches' }
      ],
      relatedApps: ['Antivirus Apps', 'Security Apps', 'Privacy Apps']
    }
  };

  const content = keywordContent[keyword] || keywordContent['instagram-mod-apk'];

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta name="keywords" content={content.keywords} />
        <link rel="canonical" href={`https://modzy.in/${keyword}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:url" content={`https://modzy.in/${keyword}`} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": content.title,
            "description": content.description,
            "url": `https://modzy.in/${keyword}`,
            "isPartOf": {
              "@type": "WebSite",
              "name": "MODZY",
              "url": "https://modzy.in"
            }
          })}
        </script>
      </Helmet>

      <div className="keyword-landing-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-title">{content.hero.title}</h1>
              <p className="hero-subtitle">{content.hero.subtitle}</p>
              <p className="hero-description">{content.hero.description}</p>
              
              <div className="hero-cta">
                <Link to="/#apps" className="cta-button primary">
                  <Download size={20} />
                  Browse Apps
                </Link>
                <Link to="/#faq" className="cta-button secondary">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              {content.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="feature-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="feature-icon">
                      <IconComponent size={32} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Apps Section */}
        <section className="related-section">
          <div className="container">
            <h2 className="section-title">Related Apps</h2>
            <div className="related-grid">
              {content.relatedApps.map((app, index) => (
                <Link
                  key={index}
                  to="/#apps"
                  className="related-app-card"
                >
                  <span>{app}</span>
                  <Download size={16} />
                </Link>
              ))}
            </div>
            
            <div className="cta-section">
              <h3>Ready to Download?</h3>
              <p>Join thousands of users who trust MODZY for safe mod app downloads</p>
              <Link to="/#apps" className="cta-button primary large">
                <Download size={24} />
                Browse All Apps
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default KeywordLandingPage;