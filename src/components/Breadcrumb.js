import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const separatorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.nav 
      className="breadcrumb-nav" 
      aria-label="Breadcrumb navigation"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {breadcrumbs.map((breadcrumb, index) => (
            <motion.li 
              key={breadcrumb.path}
              className={`breadcrumb-item ${
                breadcrumb.isActive ? 'breadcrumb-item--active' : ''
              }`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {index === 0 && (
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Home className="breadcrumb-home-icon" size={16} />
                </motion.div>
              )}
              
              {breadcrumb.isActive ? (
                <motion.span 
                  className="breadcrumb-text breadcrumb-text--active"
                  itemProp="name"
                  aria-current="page"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {breadcrumb.name}
                </motion.span>
              ) : (
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={breadcrumb.path}
                    className="breadcrumb-link"
                    itemProp="item"
                  >
                    <span itemProp="name">{breadcrumb.name}</span>
                  </Link>
                </motion.div>
              )}
              
              <meta itemProp="position" content={index + 1} />
              
              {!breadcrumb.isActive && index < breadcrumbs.length - 1 && (
                <motion.div
                  variants={separatorVariants}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight 
                    className="breadcrumb-separator" 
                    size={14} 
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;