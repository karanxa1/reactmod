import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedButton.css';

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  animation = 'default',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
    outline: 'btn-outline'
  };

  const animationClasses = {
    default: 'btn-animation-default',
    bounce: 'btn-animation-bounce',
    pulse: 'btn-animation-pulse',
    glow: 'btn-animation-glow',
    slide: 'btn-animation-slide',
    rotate: 'btn-animation-rotate'
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    hover: {
      rotate: iconPosition === 'left' ? -10 : 10,
      transition: { duration: 0.2 }
    }
  };

  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.6
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={`
        animated-button 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${animationClasses[animation]}
        ${disabled ? 'btn-disabled' : ''}
        ${loading ? 'btn-loading' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      variants={buttonVariants}
      whileHover={!disabled && !loading ? "hover" : {}}
      whileTap={!disabled && !loading ? "tap" : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Ripple Effect */}
      <motion.div
        className="btn-ripple"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />

      {/* Button Content */}
      <div className="btn-content">
        {icon && iconPosition === 'left' && (
          <motion.div
            className="btn-icon btn-icon-left"
            variants={iconVariants}
          >
            {icon}
          </motion.div>
        )}
        
        <span className="btn-text">
          {loading ? 'Loading...' : children}
        </span>
        
        {icon && iconPosition === 'right' && (
          <motion.div
            className="btn-icon btn-icon-right"
            variants={iconVariants}
          >
            {icon}
          </motion.div>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <motion.div
          className="btn-spinner"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div
            className="spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Glow Effect */}
      <div className="btn-glow" />
    </motion.button>
  );
};

export default AnimatedButton;


