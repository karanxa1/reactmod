import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOStructuredData = ({ apps = [] }) => {
  // Website/Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MODZY",
    "url": "https://modzy.in",
    "logo": "https://modzy.in/logo512.jpg",
    "description": "Best mod apps download site offering Instagram mod apk, Telegram mod apk, WhatsApp mod, and premium mod apps with safe downloads",
    "sameAs": [
      "https://t.me/keyisheremybaby",
      "https://github.com/karanxa1"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODZY",
    "url": "https://modzy.in",
    "description": "Best mod apps download site. Download Instagram mod apk, Telegram mod apk, WhatsApp mod, educational mod apps, and premium mod apk files with safe, verified downloads.",
    "publisher": {
      "@type": "Organization",
      "name": "MODZY",
      "logo": "https://modzy.in/logo512.jpg"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://modzy.in/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Software Application Schema for the marketplace
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MODZY Mod Apps Marketplace",
    "description": "Best mod apps download platform offering Instagram mod apk, Telegram mod apk, educational mod apps, and premium mod apk files with safe, verified downloads.",
    "url": "https://modzy.in",
    "applicationCategory": "Multimedia",
    "operatingSystem": "Web Browser, Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "MODZY"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MODZY",
      "logo": "https://modzy.in/logo512.jpg"
    },
    "screenshot": "https://modzy.in/logo512.jpg",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  // Individual App Schemas
  const appSchemas = apps.slice(0, 10).map(app => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "description": app.description || `${app.name} - Premium mobile application available on MODZY marketplace`,
    "applicationCategory": app.category || "Mobile Application",
    "operatingSystem": "Android",
    "softwareVersion": app.version || "1.0.0",
    "fileSize": app.fileSize ? `${app.fileSize}MB` : undefined,
    "screenshot": app.logo,
    "url": `https://modzy.in/app/${app.id}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MODZY"
    },
    "downloadUrl": app.downloadLink,
    "installUrl": `https://modzy.in/app/${app.id}`,
    "featureList": app.features || []
  }));

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://modzy.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mobile Apps",
        "item": "https://modzy.in/apps"
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MODZY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MODZY is the best mod apps download site offering Instagram mod apk, Telegram mod apk, WhatsApp mod, educational mod apps, and premium mod apk files with safe, verified downloads."
        }
      },
      {
        "@type": "Question",
        "name": "Are mod apk files on MODZY safe to download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all mod apk files on MODZY are thoroughly scanned for malware and verified for security. We provide safe mod apk downloads from trusted sources."
        }
      },
      {
        "@type": "Question",
        "name": "How to install Instagram mod apk safely?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To install Instagram mod apk safely: 1) Download from MODZY, 2) Enable Unknown Sources in Android settings, 3) Uninstall original Instagram, 4) Install the mod apk file, 5) Grant necessary permissions."
        }
      },
      {
        "@type": "Question",
        "name": "What features does Telegram mod apk offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Telegram mod apk offers multiple account support, extra themes, privacy lock, secret chat enhancements, unlimited file sharing, and premium features unlocked."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Software Application Schema */}
      <script type="application/ld+json">
        {JSON.stringify(softwareApplicationSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      {/* Individual App Schemas */}
      {appSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOStructuredData;