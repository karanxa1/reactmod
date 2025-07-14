import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './AnimatedProgressBar.css';

const AnimatedProgressBar = ({ 
  percentage = 0, 
  label = '', 
  color = '#667eea',
  height = 8,
  showPercentage = true,
  animationDuration = 2,
  delay = 0,
  gradient = false,
  pulse = false
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [inView, percentage, delay]);

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${animatedPercentage}%`,
      transition: {
        duration: animationDuration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getBarColor = () => {
    if (gradient) {
      return `linear-gradient(90deg, ${color}, ${color}88)`;
    }
    return color;
  };

  return (
    <motion.div 
      ref={ref}
      className={`progress-container ${pulse ? 'pulse' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          {showPercentage && (
            <motion.span 
              className="progress-percentage"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: animationDuration / 2 }}
            >
              {Math.round(animatedPercentage)}%
            </motion.span>
          )}
        </div>
      )}
      <div 
        className="progress-track"
        style={{ height: `${height}px` }}
      >
        <motion.div
          className="progress-bar"
          variants={barVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            background: getBarColor(),
            height: '100%'
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillBar = ({ skill, percentage, delay = 0 }) => (
  <AnimatedProgressBar
    percentage={percentage}
    label={skill}
    color="#667eea"
    height={10}
    delay={delay}
    gradient={true}
    pulse={true}
  />
);

const CircularProgress = ({ 
  percentage = 0, 
  size = 120, 
  strokeWidth = 8,
  color = '#667eea',
  label = '',
  showPercentage = true
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      setAnimatedPercentage(percentage);
    }
  }, [inView, percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <motion.div 
      ref={ref}
      className="circular-progress"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <svg width={size} height={size}>
        <circle
          className="progress-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          className="progress-ring"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="circular-progress-content">
        {showPercentage && (
          <motion.span 
            className="circular-percentage"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            {Math.round(animatedPercentage)}%
          </motion.span>
        )}
        {label && <span className="circular-label">{label}</span>}
      </div>
    </motion.div>
  );
};

export { AnimatedProgressBar, SkillBar, CircularProgress };
export default AnimatedProgressBar; 