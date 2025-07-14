import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, Zap, Lock, BarChart, Users, Camera } from 'lucide-react';
import AnimatedText from './AnimatedText';
import './BentoGrid.css';

const bentoItems = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Unmatched Security',
    description: 'Every app is scanned and verified to be free of malware. Your safety is our priority.',
    className: 'bento-item-large',
  },
  {
    icon: <Zap size={32} />,
    title: 'Blazing Fast Speeds',
    description: 'Get the fastest download speeds available, with no throttling.',
    className: 'bento-item-small',
  },
  {
    icon: <Lock size={32} />,
    title: 'Privacy Focused',
    description: 'Enjoy apps without intrusive trackers or unnecessary permissions.',
    className: 'bento-item-small',
  },
  {
    icon: <BarChart size={32} />,
    title: 'Real-time Growth',
    description: 'Watch your stats grow with our exclusive social media tools.',
    className: 'bento-item-medium',
  },
  {
    icon: <Users size={32} />,
    title: 'Community Support',
    description: 'Join our active Telegram community for 24/7 help and feedback.',
    className: 'bento-item-medium',
  },
   {
    icon: <Camera size={32} />,
    title: 'Live Capture MOD',
    description: 'Unlock all pro features for free in our modified Live Capture app.',
    className: 'bento-item-large',
  },
];

const BentoGridItem = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      className={`bento-item ${item.className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bento-item-icon">{item.icon}</div>
      <h3 className="bento-item-title">{item.title}</h3>
      <p className="bento-item-description">{item.description}</p>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <section className="bento-section">
      <div className="container">
        <h2 className="bento-title gradient-text">Why Choose MODZ?</h2>
        <AnimatedText
          text="We provide more than just apps. We offer a premium, secure, and community-driven experience."
          el="p"
          className="bento-subtitle"
        />
        <div className="bento-grid">
          {bentoItems.map((item, index) => (
            <BentoGridItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid; 