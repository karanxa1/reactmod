import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedLoader.css';

const AnimatedLoader = ({ type = 'spinner', size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large'
  };

  const colorClasses = {
    primary: 'loader-primary',
    secondary: 'loader-secondary',
    accent: 'loader-accent'
  };

  if (type === 'spinner') {
    return (
      <motion.div 
        className={`animated-loader ${sizeClasses[size]} ${colorClasses[color]}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="spinner-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="spinner-ring spinner-ring-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  }

  if (type === 'dots') {
    return (
      <motion.div 
        className={`animated-loader dots-loader ${sizeClasses[size]} ${colorClasses[color]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="dot"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (type === 'pulse') {
    return (
      <motion.div 
        className={`animated-loader pulse-loader ${sizeClasses[size]} ${colorClasses[color]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="pulse-circle"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  }

  if (type === 'wave') {
    return (
      <motion.div 
        className={`animated-loader wave-loader ${sizeClasses[size]} ${colorClasses[color]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="wave-bar"
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (type === 'skeleton') {
    return (
      <motion.div 
        className={`animated-loader skeleton-loader ${sizeClasses[size]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="skeleton-shimmer"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  }

  return null;
};

export default AnimatedLoader;

