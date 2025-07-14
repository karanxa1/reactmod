import React from 'react';
import './InfiniteTicker.css';
import { Zap, ShieldCheck, Gift, MessageSquare, Rocket, Key } from 'lucide-react';

const tickerItems = [
  { icon: <Rocket />, text: 'Early Access' },
  { icon: <ShieldCheck />, text: '100% Secure' },
  { icon: <Zap />, text: 'Fast Downloads' },
  { icon: <Gift />, text: 'Member Rewards' },
  { icon: <Key />, text: 'Premium Codes' },
  { icon: <MessageSquare />, text: '24/7 Support' },
];

const InfiniteTicker = () => {
  const extendedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-section">
      <div className="ticker-wrap">
        <div className="ticker-move">
          {extendedItems.map((item, index) => (
            <div className="ticker-item" key={index}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteTicker; 