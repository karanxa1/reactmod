import React from 'react';
import { Link } from 'react-router-dom';
import './AppCard.css';

const AppCard = ({ app }) => {
  const getBadgeClass = (badgeColor) => {
    return badgeColor === 'blue' ? 'badge-new' : 'badge-mod';
  };

  return (
    <Link to={`/app/${app.id}`} className="app-card">
      <div className="app-card-image">
        <img src={app.logo} alt={app.name} />
        <div className={`app-badge ${getBadgeClass(app.badgeColor)}`}>
          {app.badge}
        </div>
      </div>
      
      <div className="app-card-content">
        <h3 className="app-name">{app.name}</h3>
        <p className="app-category">{app.category}</p>
        
        <div className="app-details">
          <div className="app-version">
            <span className="version-icon">⚡</span>
            <span>{app.version}</span>
          </div>
          <div className="app-size">
            <span className="size-icon">📥</span>
            <span>{app.fileSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppCard; 