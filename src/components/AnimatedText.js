import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './AnimatedText.css';

const AnimatedText = ({ text, el: Wrapper = 'p', className, splitBy = 'word' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === 'word' ? 0.08 : 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        aria-label={text}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="animated-text-container"
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
            variants={itemVariants}
            className={`animated-text-${splitBy}`}
          >
            {item}{splitBy === 'word' ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText; 