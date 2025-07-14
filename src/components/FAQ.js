import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I download apps from MODZY?",
      answer: "Simply browse our app collection, click on any app card, and you'll be prompted to join our Telegram channel. Once you've joined, you can download the app directly."
    },
    {
      question: "Are the apps safe to download?",
      answer: "Yes! All our apps are thoroughly scanned for malware and viruses. We prioritize your security and only provide safe, tested applications."
    },
    {
      question: "Do I need to pay for the apps?",
              answer: "No, all apps on MODZY are completely free! Just join our Telegram channel and get instant access to premium applications."
    },
    {
      question: "How often do you add new apps?",
      answer: "We regularly update our collection with new apps. Join our Telegram channel to get notified immediately when new apps are available."
    },
    {
      question: "Can I request specific apps?",
      answer: "Absolutely! You can request apps in our Telegram channel, and our team will do their best to add them to our collection."
    },
    {
      question: "What devices are supported?",
      answer: "Currently, we focus on Android applications. All our apps are compatible with Android devices running version 5.0 and above."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  return (
    <div className="faq-page">
      <Header />
      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title gradient-text">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about MODZY and our apps
          </p>
        </motion.div>
        
        <motion.div 
          className="faq-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(102, 126, 234, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <span>{faq.question}</span>
                <motion.span 
                  className="faq-icon"
                  variants={iconVariants}
                  animate={activeIndex === index ? "open" : "closed"}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="faq-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="faq-cta-content">
            <h3>Still have questions?</h3>
            <p>Join our Telegram channel for instant support and community help</p>
            <motion.button 
              className="btn-primary"
              onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Telegram Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 