import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import logo from '../logo.png';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 5]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`
      }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img 
              src={logo} 
              className="logo-icon" 
              alt="MODZY - Premium Mobile Apps Marketplace Logo" 
              title="MODZY - Your destination for premium mobile apps"
              width={28} 
              height={28}
              loading="eager"
              variants={logoVariants}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span 
              className="logo-text"
              variants={textVariants}
              whileHover={{ 
                backgroundPosition: "100% center",
                transition: { duration: 0.3 }
              }}
            >
              MODZY
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="header-actions"
            variants={buttonVariants}
          >
            <motion.button 
              className="telegram-btn"
              onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={18} />
              </motion.div>
              <span>Join Telegram</span>
              <motion.div
                className="telegram-btn-glow"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;