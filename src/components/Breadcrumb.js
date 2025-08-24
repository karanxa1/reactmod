import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = ({ customBreadcrumbs = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Default breadcrumb mapping
  const breadcrumbNameMap = {
    '': 'Home',
    'apps': 'Mod Apps',
    'categories': 'Mod Categories',
    'privacy': 'Privacy Policy',
    'terms': 'Terms & Conditions',
    'app': 'Mod App Details',
    'new': 'New Mod Apps',
    'popular': 'Popular Mod Apps',
    'featured': 'Featured Mod Apps',
    'instagram-mods': 'Instagram Mod APK',
    'telegram-mods': 'Telegram Mod APK',
    'whatsapp-mods': 'WhatsApp Mod APK',
    'educational-mods': 'Educational Mod Apps',
    'utility-mods': 'Utility Mod Apps',
    'streaming-mods': 'Streaming Mod Apps',
    'mod-faq': 'Mod Apps FAQ',
    'mod-guides': 'Mod Apps Guides',
    'safe-mod-downloads': 'Safe Mod Downloads'
  };

  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    // If custom breadcrumbs are provided, use them
    if (customBreadcrumbs.length > 0) {
      return customBreadcrumbs;
    }

    // Generate breadcrumbs from current path
    const breadcrumbs = [
      {
        name: 'Home',
        path: '/',
        isActive: pathnames.length === 0
      }
    ];

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;
      
      breadcrumbs.push({
        name: breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1),
        path: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page unless there are custom breadcrumbs
  if (breadcrumbs.length <= 1 && customBreadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb navigation">
      <div className="container">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbs.map((breadcrumb, index) => (
            <li 
              key={breadcrumb.path}
              className={`breadcrumb-item ${
                breadcrumb.isActive ? 'breadcrumb-item--active' : ''
              }`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index === 0 && (
                <Home className="breadcrumb-home-icon" size={16} />
              )}
              
              {breadcrumb.isActive ? (
                <span 
                  className="breadcrumb-text breadcrumb-text--active"
                  itemProp="name"
                  aria-current="page"
                >
                  {breadcrumb.name}
                </span>
              ) : (
                <Link 
                  to={breadcrumb.path}
                  className="breadcrumb-link"
                  itemProp="item"
                >
                  <span itemProp="name">{breadcrumb.name}</span>
                </Link>
              )}
              
              <meta itemProp="position" content={index + 1} />
              
              {!breadcrumb.isActive && index < breadcrumbs.length - 1 && (
                <ChevronRight 
                  className="breadcrumb-separator" 
                  size={14} 
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;