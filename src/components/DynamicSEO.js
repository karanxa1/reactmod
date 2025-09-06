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
    
    // Default SEO data - Enhanced for Mod Apps
    let seoData = {
      title: 'MODZY - Premium Mod APK Download | Modified Android Apps & Games 2025',
      description: 'Download premium mod APK files and modified Android apps at MODZY. Get Instagram mod apk, WhatsApp mod, Telegram mod, and 1000+ modified apps with premium features unlocked. Safe, secure, and virus-free mod app downloads.',
      keywords: 'mod apk, modified apps, android mod apk, premium mod apps, Instagram mod apk, WhatsApp mod apk, Telegram mod apk, modded games, cracked apps, premium features unlocked, mod app download, modified android apps, free premium apps, modzy mod apk, mod apk download site'
    };

    // Route-specific SEO optimization
    switch (pathname) {
      case '/':
        seoData = {
          title: 'MODZY - #1 Mod APK Download Site | Premium Modified Apps & Games 2025',
          description: 'Download the latest mod APK files and modified Android apps at MODZY. Get Instagram mod apk, WhatsApp mod apk, Telegram mod apk, YouTube mod apk, and 1000+ premium modified apps with unlocked features. Fast, secure, and virus-free downloads.',
          keywords: 'mod apk download, modified apps, android mod apk, premium mod apps, Instagram mod apk, WhatsApp mod apk, Telegram mod apk, YouTube mod apk, modded games, cracked apps, premium features unlocked, mod app download, modified android apps, free premium apps, modzy mod apk, best mod apk site, mod apk store, mod apk hub'
        };
        break;
        
      case '/apps':
        seoData = {
          title: 'Browse All Mod APK Files | Complete Collection of Modified Apps | MODZY',
          description: 'Browse our complete collection of mod APK files and modified Android apps. Find Instagram mod apk, WhatsApp mod apk, Telegram mod apk, and 1000+ premium modified apps with unlocked features.',
          keywords: 'browse mod apk, modified apps collection, android mod apk list, premium mod apps, modded games catalog, Instagram mod apk, WhatsApp mod apk, Telegram mod apk, YouTube mod apk, mod apk files, modified android apps'
        };
        break;
        
      case '/categories':
        seoData = {
          title: 'Mod APK Categories | Modified Apps by Category | MODZY',
          description: 'Explore mod APK files organized by categories. Find Instagram mod apk, WhatsApp mod apk, Telegram mod apk, YouTube mod apk, gaming mods, and utility mods at MODZY.',
          keywords: 'mod apk categories, modified apps by category, Instagram mod apk, WhatsApp mod apk, Telegram mod apk, YouTube mod apk, gaming mods, utility mods, social media mods, entertainment mods, productivity mods'
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
          const isModApp = app.name.toLowerCase().includes('mod') || app.category.toLowerCase().includes('mod');
          const modKeywords = isModApp ? 'mod apk, modified app, premium features unlocked, cracked app' : 'premium app, android app';
          
          seoData = {
            title: `${app.name} Mod APK Download | ${app.category} | MODZY`,
            description: `Download ${app.name} mod APK - ${app.description || `Premium ${app.category} application with unlocked features`}. Version ${app.version || '1.0'}, ${app.fileSize || 'N/A'} MB. Safe and secure download from MODZY.`,
            keywords: `${app.name} mod apk, ${app.name} download, ${app.category} mod apk, ${app.name} modified, ${modKeywords}, android app download, premium features unlocked, modzy download`
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
      
      {/* Enhanced Structured Data for Mod Apps */}
      {app && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": `${app.name} Mod APK`,
            "alternateName": `${app.name} Modified`,
            "description": app.description || `${app.name} - Premium ${app.category} application with unlocked features and premium mods`,
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
              "availability": "https://schema.org/InStock",
              "description": "Free mod APK download with premium features unlocked"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MODZY",
              "url": "https://modzy.in",
              "logo": `${baseUrl}/logo512.jpg`,
              "description": "Premium mod APK download site for modified Android apps"
            },
            "downloadUrl": app.downloadLink,
            "installUrl": currentUrl,
            "featureList": app.features || ["Premium features unlocked", "Ad-free experience", "Enhanced functionality"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "2500",
              "bestRating": "5",
              "worstRating": "1"
            },
            "keywords": `${app.name} mod apk, ${app.category} mod, modified android app, premium features unlocked`,
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "inLanguage": "en-US",
            "isAccessibleForFree": true,
            "license": "Free to use",
            "softwareRequirements": "Android 5.0+",
            "memoryRequirements": "100MB",
            "storageRequirements": `${app.fileSize || 50}MB`
          })}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSEO;