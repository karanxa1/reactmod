import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Download, UserPlus, Star } from 'lucide-react';
import './Timeline.css';

const timelineEvents = [
  {
    icon: <Send />,
    title: 'Join Our Telegram',
    description: 'Click the "Join" button on our site to get an invite to our exclusive Telegram channel.',
    time: 'Step 1',
  },
  {
    icon: <UserPlus />,
    title: 'Become a Member',
    description: 'Once in Telegram, you officially become part of the MODZY community. Welcome!',
    time: 'Step 2',
  },
  {
    icon: <Download />,
    title: 'Browse & Download',
    description: 'Explore our extensive library of premium apps and download anything you want, instantly.',
    time: 'Step 3',
  },
  {
    icon: <Star />,
    title: 'Enjoy Premium Access',
    description: 'Use your new apps with all features unlocked. Get support and updates directly from the community.',
    time: 'Step 4',
  },
];

const TimelineEventItem = ({ event, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isEven ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div ref={ref} className="timeline-item">
      <div className="timeline-content">
        <motion.div
          className="timeline-card"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
        >
          <div className="timeline-card-header">
            <span className="timeline-time">{event.time}</span>
            <h3 className="timeline-title">{event.title}</h3>
          </div>
          <p className="timeline-description">{event.description}</p>
        </motion.div>
      </div>
      <div className="timeline-middle">
        <div className="timeline-circle">{event.icon}</div>
      </div>
      <div className="timeline-empty"></div>
    </div>
  );
};

const Timeline = () => {
  return (
    <section className="timeline-section">
      <div className="container">
        <h2 className="timeline-section-title gradient-text">How It Works</h2>
        <p className="timeline-section-subtitle">Get access to all apps in just a few simple steps.</p>
        <div className="timeline-container">
          {timelineEvents.map((event, index) => (
            <TimelineEventItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline; 