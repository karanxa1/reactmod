import React, { useState } from 'react';
import Header from './Header';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I download apps from Jar MOD?",
      answer: "To download apps, click on any app card, join our Telegram channel, confirm your membership, and then click the download button. All downloads are safe and verified."
    },
    {
      question: "Are the apps safe to install?",
      answer: "Yes, all apps are thoroughly tested and scanned for malware before being made available. We prioritize user security and only provide safe, verified applications."
    },
    {
      question: "Why do I need to join the Telegram channel?",
      answer: "Our Telegram channel is where we share updates, provide support, and ensure you get the latest versions of apps. It's also how we verify legitimate users and prevent abuse."
    },
    {
      question: "Do I need to pay for these apps?",
      answer: "No, all apps are free to download. However, some apps may have in-app purchases or premium features that require payment within the app itself."
    },
    {
      question: "How often are new apps added?",
      answer: "We regularly add new apps and update existing ones. Join our Telegram channel to get notified immediately when new apps are available."
    },
    {
      question: "What Android versions are supported?",
      answer: "Most apps support Android 5.0 (API level 21) and above. Specific requirements are listed in each app's description."
    },
    {
      question: "Can I request specific apps?",
      answer: "Yes! You can request apps in our Telegram channel. We review all requests and try to fulfill popular ones when possible."
    },
    {
      question: "How do I report issues with an app?",
      answer: "If you encounter any issues, please report them in our Telegram channel with details about your device and the problem. Our support team will assist you."
    },
    {
      question: "Are these apps modified (MOD) versions?",
      answer: "Some apps may be modified to unlock premium features or remove ads. Each app clearly indicates if it's a MOD version or original."
    },
    {
      question: "How do I update apps?",
      answer: "Updates are announced in our Telegram channel. You'll need to download and install the new version manually, as these apps don't update through Google Play Store."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Header />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">
            Find answers to common questions about Jar MOD and our apps
          </p>
        </div>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-cta">
          <div className="faq-cta-content">
            <h3>Still have questions?</h3>
            <p>Join our Telegram channel for instant support and community help</p>
            <button 
              className="btn-primary"
              onClick={() => window.open('https://t.me/keyisheremybaby', '_blank')}
            >
              Join Telegram Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 