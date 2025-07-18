import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Header from './Header';
import { getAllApps } from '../firebase/appService';
import './AppDetail.css';

const AppDetail = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const apps = await getAllApps();
        const foundApp = apps.find(app => app.id === id);
        setApp(foundApp);
      } catch (error) {
        console.error('Error fetching app:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  if (loading) {
    return (
      <div className="app-detail-error">
        <Header />
        <div className="container">
          <h1>Loading...</h1>
          <p>Please wait while we fetch the app details.</p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="app-detail-error">
        <Header />
        <div className="container">
          <h1>App Not Found</h1>
          <p>The application you're looking for doesn't exist.</p>
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    window.open(app.downloadLink, '_blank');
  };

  const getBadgeClass = (badgeColor) => {
    return badgeColor === 'blue' ? 'badge-new' : 'badge-mod';
  };

  const renderDetailedFeatures = () => {
    if (!app.detailedFeatures) return null;

    return (
      <div className="detailed-features">
        {app.detailedFeatures.security && (
          <div className="feature-category">
            <h3>🔐 Security & Authentication</h3>
            <ul>
              {app.detailedFeatures.security.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {app.detailedFeatures.starSystem && (
          <div className="feature-category">
            <h3>⭐ Star Currency System</h3>
            <ul>
              {app.detailedFeatures.starSystem.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {app.detailedFeatures.followers && (
          <div className="feature-category">
            <h3>👥 Followers Growth</h3>
            <ul>
              {app.detailedFeatures.followers.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {app.detailedFeatures.likes && (
          <div className="feature-category">
            <h3>❤ Likes Enhancement</h3>
            <ul>
              {app.detailedFeatures.likes.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {app.detailedFeatures.payment && (
          <div className="feature-category">
            <h3>💳 Payment & Security</h3>
            <ul>
              {app.detailedFeatures.payment.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {app.detailedFeatures.pricing && (
          <div className="feature-category">
            <h3>💰 Pricing Structure</h3>
            <div className="pricing-grid">
              {app.detailedFeatures.pricing.map((price, index) => (
                <div key={index} className="price-item">
                  {price}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-detail">
      <Header />
      <div className="container">
        <Link to="/" className="back-link">
          ← Back to Apps
        </Link>
        
        <div className="app-detail-header">
          <div className="app-detail-logo">
            <LazyLoadImage
              alt={app.name}
              src={app.logo}
              effect="blur"
              width="120px"
              height="120px"
              style={{ borderRadius: '20px', objectFit: 'cover' }}
            />
            <div className={`app-badge ${getBadgeClass(app.badgeColor)}`}>
              {app.badge}
            </div>
          </div>
          <div className="app-detail-info">
            <h1 className="app-detail-title">{app.name}</h1>
            <p className="app-detail-category">{app.category}</p>
            <p className="app-detail-description">{app.description}</p>
            
            <div className="app-meta">
              <div className="meta-item">
                <span className="meta-label">Version:</span>
                <span className="meta-value">{app.version}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Size:</span>
                <span className="meta-value">{app.fileSize}</span>
              </div>
            </div>
            
            <button 
              className="download-button"
              onClick={handleDownload}
            >
              Download Now
            </button>
          </div>
        </div>

        <div className="app-detail-content">
          <section className="features-section">
            <h2>Key Features</h2>
            <ul className="features-list">
              {app.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="screenshots-section">
            <h2>Screenshots</h2>
            <div className="screenshots-grid">
              {app.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item">
                  <img src={screenshot} alt={`${app.name} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {renderDetailedFeatures()}
      </div>
    </div>
  );
};

export default AppDetail; 