import React, { useState } from 'react';
import TelegramPopup from './TelegramPopup';

const TelegramPopupDemo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Sample app data for testing
  const sampleApp = {
    id: 'demo-app',
    name: 'Instagram Mod APK',
    category: 'Social Media',
    version: '2.0.1',
    fileSize: '45',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
    description: 'Download Instagram stories, reels, and photos. Hide online status, no ads, and premium themes included.',
    downloadLink: 'https://example.com/download'
  };

  return (
    <div style={{ 
      padding: '2rem',
      background: '#0a0a0a',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          Multiple Telegram Channels Demo
        </h1>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Now users need to visit <strong>3 different links</strong> before they can download any app:
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>MODZY Main Channel</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              Main updates and announcements
            </p>
          </div>
          
          <div style={{
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛠️</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>MODZY Apps</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              Latest app releases and updates
            </p>
          </div>
          
          <div style={{
            background: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '12px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>MODZY Partners</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              Partner site and premium content
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsPopupOpen(true)}
          style={{
            background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
          }}
        >
          🚀 Test Multiple Links Download
        </button>
        
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '8px',
          textAlign: 'left'
        }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#22c55e' }}>✅ New Features:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
            <li>Sequential link visiting (must complete in order)</li>
            <li>Progress tracking (X/3 links completed)</li>
            <li>Visual status indicators for each link</li>
            <li>Locked links until previous ones are visited</li>
            <li>Success confirmation when all links visited</li>
            <li>Download only enabled after all links visited + confirmation</li>
            <li>Automatic detection when user returns from external links</li>
            <li>Opens all links in new tabs for better UX</li>
          </ul>
        </div>
      </div>
      
      <TelegramPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        app={sampleApp}
      />
    </div>
  );
};

export default TelegramPopupDemo;