import React, { useState, useEffect } from 'react';
import { Rocket, Key, MessageSquare, Gift, Lock, Zap, Target, Send } from 'lucide-react';
import './TelegramBenefits.css';

const TelegramBenefits = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const [progress, setProgress] = useState(0);
  const [memberActivity, setMemberActivity] = useState([]);

  useEffect(() => {
    // Simulate progress animation
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    // Simulate member activity
    const activities = [
      { user: 'Alex M.', action: 'downloaded Insta Vault', time: '2 min ago' },
      { user: 'Sarah K.', action: 'joined the community', time: '5 min ago' },
      { user: 'Mike R.', action: 'shared Live Capture', time: '8 min ago' },
      { user: 'Emma L.', action: 'got early access', time: '12 min ago' },
    ];

    setMemberActivity(activities);

    return () => clearInterval(timer);
  }, []);

  const handleJoinTelegram = () => {
    window.open('https://t.me/keyisheremybaby', '_blank');
  };

  const benefits = [
    {
      icon: <Rocket size={24} />,
      title: 'Early Access',
      description: 'Get new apps 24-48 hours before public release',
      badge: 'Exclusive'
    },
    {
      icon: <Key size={24} />,
      title: 'Access Codes',
      description: 'Receive unique download codes and passwords',
      badge: 'Premium'
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Direct Support',
      description: '24/7 support from developers and community',
      badge: 'Priority'
    },
    {
      icon: <Gift size={24} />,
      title: 'Member Rewards',
      description: 'Exclusive giveaways and bonus content',
      badge: 'Free'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Rodriguez',
      avatar: '👨‍💻',
      rating: 5,
      text: 'Amazing community! Got access to premium apps instantly.',
      verified: true
    },
    {
      name: 'Sarah Chen',
      avatar: '👩‍🎨',
      rating: 5,
      text: 'The support is incredible. Developers actually respond!',
      verified: true
    },
    {
      name: 'Mike Johnson',
      avatar: '👨‍🚀',
      rating: 5,
      text: 'Best decision ever. Early access to all new releases.',
      verified: true
    }
  ];

  const stats = [
    { number: '145,783+', label: 'Active Members', trend: '+12%' },
    { number: '50+', label: 'Apps Shared Daily', trend: '+8%' },
    { number: '99%', label: 'Satisfaction Rate', trend: '+2%' },
    { number: '24/7', label: 'Support Available', trend: 'Always' }
  ];

  return (
    <section className="telegram-benefits">
      <div className="benefits-container">
        <div className="benefits-header">
          <h2 className="benefits-title">
            <span className="title-icon">📱</span>
            Join Our Exclusive Community
          </h2>
          <p className="benefits-subtitle">
            Get instant access to premium apps, early releases, and exclusive content
          </p>
        </div>

        <div className="benefits-tabs">
          <button 
            className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefits')}
          >
            Benefits
          </button>
          <button 
            className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            Community
          </button>
          <button 
            className={`tab-button ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            Reviews
          </button>
        </div>

        <div className="benefits-content">
          {activeTab === 'benefits' && (
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <div className="benefit-badge">{benefit.badge}</div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'community' && (
            <div className="community-content">
              <div className="community-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-trend">{stat.trend}</div>
                  </div>
                ))}
              </div>
              
              <div className="member-activity">
                <h3 className="activity-title">Live Activity</h3>
                <div className="activity-list">
                  {memberActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-avatar">👤</div>
                      <div className="activity-content">
                        <span className="activity-user">{activity.user}</span>
                        <span className="activity-action">{activity.action}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                      <div className="activity-status">✅</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">{testimonial.avatar}</div>
                    <div className="testimonial-info">
                      <div className="testimonial-name">
                        {testimonial.name}
                        {testimonial.verified && <span className="verified-badge">✓</span>}
                      </div>
                      <div className="testimonial-rating">
                        {'⭐'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="benefits-cta">
          <div className="progress-indicator">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">Join {progress}% faster than others!</span>
          </div>
          
          <button className="join-telegram-btn" onClick={handleJoinTelegram}>
            <Send size={18} />
            Join Telegram Channel
            <span className="btn-badge">Free</span>
          </button>
          
          <div className="trust-indicators">
            <div className="trust-item">
              <Lock size={16} className="trust-icon" />
              <span className="trust-text">100% Secure</span>
            </div>
            <div className="trust-item">
              <Zap size={16} className="trust-icon" />
              <span className="trust-text">Instant Access</span>
            </div>
            <div className="trust-item">
              <Target size={16} className="trust-icon" />
              <span className="trust-text">No Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelegramBenefits; 