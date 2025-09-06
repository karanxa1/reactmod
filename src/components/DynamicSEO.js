import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DOMAIN_CONFIG } from '../config/domain';

const DynamicSEO = ({ app = null, customTitle = '', customDescription = '' }) => {
  const location = useLocation();
  const baseUrl = DOMAIN_CONFIG.baseUrl;
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Generate page-specific SEO data
  const generateSEOData = () => {
    const pathname = location.pathname;
    
    // Default SEO data
    let seoData = {
      title: 'MODZY - Premium Mobile Apps Marketplace | Download Android Apps & Games',
      description: 'MODZY - Premium mobile apps marketplace. Download exclusive Android apps, games, and premium applications. Discover curated mobile apps with secure downloads and community support at modzy.in',
      keywords: 'mobile apps, android apps, premium apps, app download, modzy apps, mobile games, android games, app marketplace, premium mobile apps, exclusive apps, modzy.in'
    };

    // Route-specific SEO optimization
    switch (pathname) {
      case '/':
        seoData = {
          title: 'MODZY - Premium Mobile Apps Marketplace | Download Android Apps & Games 2025',
          description: 'Discover and download premium mobile apps and games at MODZY. Your ultimate destination for curated Android applications including Instagram mod apk, Telegram mod apk, WhatsApp mod, and exclusive apps with secure downloads and community support.',
          keywords: 'mobile apps, android apps, premium apps, app download, modzy apps, mobile games, android games, app marketplace, Instagram mod apk, Telegram mod apk, WhatsApp mod, mod apps download'
        };
        break;
        
      case '/apps':
        seoData = {
          title: 'Browse All Mobile Apps | MODZY Premium App Collection',
          description: 'Browse our complete collection of premium mobile apps and games. Find the perfect Android applications for your needs at MODZY marketplace.',
          keywords: 'browse mobile apps, android app collection, premium apps list, mobile games, app catalog'
        };
        break;
        
      case '/categories':
        seoData = {
          title: 'App Categories | MODZY Mobile Apps by Category',
          description: 'Explore mobile apps organized by categories. Find games, productivity, entertainment, and utility apps at MODZY premium marketplace.',
          keywords: 'app categories, mobile app types, android games, productivity apps, entertainment apps'
        };
        break;
        
      case '/privacy':
        seoData = {
          title: 'Privacy Policy | MODZY Mobile Apps Marketplace',
          description: 'Read MODZY\'s privacy policy to understand how we protect your data and ensure secure app downloads.',
          keywords: 'privacy policy, data protection, secure downloads, user privacy'
        };
        break;
        
      case '/terms':
        seoData = {
          title: 'Terms & Conditions | MODZY Mobile Apps Marketplace',
          description: 'Review MODZY\'s terms and conditions for using our premium mobile apps marketplace and download services.',
          keywords: 'terms conditions, user agreement, app download terms, marketplace rules'
        };
        break;
        
      default:
        // Handle dynamic routes like /app/:id
        if (pathname.startsWith('/app/') && app) {
          seoData = {
            title: `${app.name} - Download ${app.category} App | MODZY`,
            description: `Download ${app.name} - ${app.description || `Premium ${app.category} application available on MODZY marketplace`}. Version ${app.version || '1.0'}, ${app.fileSize || 'N/A'} MB.`,
            keywords: `${app.name}, ${app.category}, mobile app, android app, download ${app.name}, premium app`
          };
        }
        break;
    }

    // Override with custom values if provided
    if (customTitle) seoData.title = customTitle;
    if (customDescription) seoData.description = customDescription;

    return seoData;
  };

  const seoData = generateSEOData();

  return (
    <Helmet>
      {/* Page Title */}
      <title>{seoData.title}</title>
      
      {/* Meta Description */}
      <meta name="description" content={seoData.description} />
      
      {/* Keywords */}
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Language and Region */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={app ? 'article' : 'website'} />
      <meta property="og:site_name" content="MODZY" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={app?.logo || `${baseUrl}/logo512.jpg`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content={app ? `${app.name} - ${app.category} App` : 'MODZY - Premium Mobile Apps Marketplace'} />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* App-specific Open Graph */}
      {app && (
        <>
          <meta property="article:author" content="MODZY" />
          <meta property="article:section" content={app.category} />
          <meta property="article:tag" content={`${app.name}, ${app.category}, mobile app, mod apk, android app`} />
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:modified_time" content={new Date().toISOString()} />
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@modzy_apps" />
      <meta name="twitter:creator" content="@modzy_apps" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:image" content={app?.logo || `${baseUrl}/logo512.jpg`} />
      <meta name="twitter:image:alt" content={app ? `${app.name} App Logo` : 'MODZY Logo'} />
      
      {/* App-specific Twitter Card */}
      {app && (
        <>
          <meta name="twitter:label1" content="Category" />
          <meta name="twitter:data1" content={app.category} />
          <meta name="twitter:label2" content="Version" />
          <meta name="twitter:data2" content={app.version || '1.0'} />
        </>
      )}
      
      {/* Additional Social Media Meta Tags */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="application-name" content="MODZY" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-TileImage" content={`${baseUrl}/logo192.jpg`} />
      <meta name="theme-color" content="#667eea" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data for Individual Apps */}
      {app && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app.name,
            "description": app.description || `${app.name} - Premium ${app.category} application`,
            "applicationCategory": app.category,
            "operatingSystem": "Android",
            "softwareVersion": app.version || "1.0.0",
            "fileSize": app.fileSize ? `${app.fileSize}MB` : undefined,
            "screenshot": app.logo,
            "url": currentUrl,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MODZY",
              "url": "https://modzy.in"
            },
            "downloadUrl": app.downloadLink,
            "installUrl": currentUrl,
            "featureList": app.features || [],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "ratingCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSEO;