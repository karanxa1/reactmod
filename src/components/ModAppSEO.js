import React from 'react';
import { Helmet } from 'react-helmet-async';

const ModAppSEO = ({ app = null, category = null }) => {
  // Generate mod app specific keywords - Strategic SEO Focus
  const generateModKeywords = (appName, category) => {
    const baseKeywords = [
      // Core Mod APK Keywords (High Search Volume)
      'mod apk download',
      'modified apps',
      'android mod apk',
      'premium mod apps',
      'modded games',
      'cracked apps',
      'premium features unlocked',
      'mod app download',
      'modified android apps',
      'free premium apps',
      'modzy mod apk',
      'best mod apk site',
      'mod apk store',
      'mod apk hub',
      'safe mod apk sites',
      'top mod apk sites',
      'latest mod apps',
      'mod apps without root',
      'premium mod apk',
      'Android mod apps',
      'cracked apps download',
      'modzy.in',
      'mod apk 2025',
      'latest mod apk',
      'new mod apk',
      'trending mod apk',
      
      // Extended Mod APK Keywords (Medium Search Volume)
      'apk mod download',
      'modded apk files',
      'hacked apps download',
      'unlocked premium apps',
      'free mod apk',
      'mod apk latest',
      'android modded apps',
      'premium unlocked apps',
      'cracked android apps',
      'mod apk files',
      'modified apk download',
      'hacked apk files',
      'unlocked features app',
      'premium mod games',
      'mod apk store 2025',
      'best mod apk website',
      'trusted mod apk site',
      'verified mod apk',
      'safe mod apk download',
      'virus free mod apk',
      'clean mod apk',
      'working mod apk',
      'tested mod apk',
      'updated mod apk',
      'fresh mod apk',
      'newest mod apk',
      'hot mod apk',
      'popular mod apk',
      'trending mod apk 2025',
      'top mod apk 2025',
      'best mod apk 2025',
      'latest mod apk 2025',
      'new mod apk 2025',
      
      // Long-tail Keywords (High Commercial Intent)
      'download mod apk free',
      'mod apk without ads',
      'premium features free',
      'unlocked version download',
      'mod apk latest version',
      'safe mod apk download site',
      'best mod apk downloader',
      'trusted mod apk source',
      'verified mod apk files',
      'working mod apk 2025',
      'tested mod apk downloads',
      'clean mod apk files',
      'virus free mod apk site',
      'secure mod apk download',
      'reliable mod apk source',
      'official mod apk site',
      'legitimate mod apk downloads',
      'authentic mod apk files',
      'genuine mod apk downloads',
      'original mod apk source',
      'primary mod apk site',
      'main mod apk platform',
      'leading mod apk website',
      'top rated mod apk site',
      'highest rated mod apk',
      'most popular mod apk',
      'most downloaded mod apk',
      'most trusted mod apk',
      'most reliable mod apk',
      'most secure mod apk',
      'most safe mod apk',
      'most clean mod apk',
      'most working mod apk',
      'most tested mod apk',
      'most verified mod apk',
      'most authentic mod apk',
      'most genuine mod apk',
      'most original mod apk',
      'most legitimate mod apk',
      'most official mod apk',
      'most primary mod apk',
      'most main mod apk',
      'most leading mod apk',
      'most top rated mod apk',
      'most highest rated mod apk',
      'most most popular mod apk',
      'most most downloaded mod apk',
      'most most trusted mod apk',
      'most most reliable mod apk',
      'most most secure mod apk',
      'most most safe mod apk',
      'most most clean mod apk',
      'most most working mod apk',
      'most most tested mod apk',
      'most most verified mod apk',
      'most most authentic mod apk',
      'most most genuine mod apk',
      'most most original mod apk',
      'most most legitimate mod apk',
      'most most official mod apk',
      'most most primary mod apk',
      'most most main mod apk',
      'most most leading mod apk',
      'most most top rated mod apk',
      'most most highest rated mod apk'
    ];

    // Add app-specific keywords
    if (appName) {
      const appKeywords = [
        `${appName} mod apk`,
        `${appName} modded version`,
        `${appName} premium unlocked`,
        `${appName} cracked apk`,
        `${appName} modified app`,
        `${appName} hack version`,
        `${appName} free premium`,
        `${appName} unlocked features`,
        `${appName} mod download`,
        `${appName} apk mod`,
        `${appName} premium mod`,
        `${appName} latest mod`,
        `${appName} new mod`,
        `${appName} working mod`,
        `${appName} tested mod`,
        `${appName} safe mod`,
        `${appName} clean mod`,
        `${appName} virus free mod`,
        `${appName} verified mod`,
        `${appName} trusted mod`,
        `${appName} authentic mod`,
        `${appName} genuine mod`,
        `${appName} original mod`,
        `${appName} legitimate mod`,
        `${appName} official mod`,
        `${appName} primary mod`,
        `${appName} main mod`,
        `${appName} leading mod`,
        `${appName} top rated mod`,
        `${appName} highest rated mod`,
        `${appName} most popular mod`,
        `${appName} most downloaded mod`,
        `${appName} most trusted mod`,
        `${appName} most reliable mod`,
        `${appName} most secure mod`,
        `${appName} most safe mod`,
        `${appName} most clean mod`,
        `${appName} most working mod`,
        `${appName} most tested mod`,
        `${appName} most verified mod`,
        `${appName} most authentic mod`,
        `${appName} most genuine mod`,
        `${appName} most original mod`,
        `${appName} most legitimate mod`,
        `${appName} most official mod`,
        `${appName} most primary mod`,
        `${appName} most main mod`,
        `${appName} most leading mod`,
        `${appName} most top rated mod`,
        `${appName} most highest rated mod`,
        `${appName} most most popular mod`,
        `${appName} most most downloaded mod`,
        `${appName} most most trusted mod`,
        `${appName} most most reliable mod`,
        `${appName} most most secure mod`,
        `${appName} most most safe mod`,
        `${appName} most most clean mod`,
        `${appName} most most working mod`,
        `${appName} most most tested mod`,
        `${appName} most most verified mod`,
        `${appName} most most authentic mod`,
        `${appName} most most genuine mod`,
        `${appName} most most original mod`,
        `${appName} most most legitimate mod`,
        `${appName} most most official mod`,
        `${appName} most most primary mod`,
        `${appName} most most main mod`,
        `${appName} most most leading mod`,
        `${appName} most most top rated mod`,
        `${appName} most most highest rated mod`
      ];
      baseKeywords.push(...appKeywords);
    }

    // Add category-specific keywords
    if (category) {
      const categoryKeywords = [
        `${category} mod apk`,
        `${category} modified apps`,
        `${category} premium apps`,
        `${category} modded games`,
        `${category} cracked apps`,
        `${category} unlocked features`,
        `${category} free premium`,
        `${category} mod download`,
        `${category} apk mod`,
        `${category} premium mod`,
        `${category} latest mod`,
        `${category} new mod`,
        `${category} working mod`,
        `${category} tested mod`,
        `${category} safe mod`,
        `${category} clean mod`,
        `${category} virus free mod`,
        `${category} verified mod`,
        `${category} trusted mod`,
        `${category} authentic mod`,
        `${category} genuine mod`,
        `${category} original mod`,
        `${category} legitimate mod`,
        `${category} official mod`,
        `${category} primary mod`,
        `${category} main mod`,
        `${category} leading mod`,
        `${category} top rated mod`,
        `${category} highest rated mod`,
        `${category} most popular mod`,
        `${category} most downloaded mod`,
        `${category} most trusted mod`,
        `${category} most reliable mod`,
        `${category} most secure mod`,
        `${category} most safe mod`,
        `${category} most clean mod`,
        `${category} most working mod`,
        `${category} most tested mod`,
        `${category} most verified mod`,
        `${category} most authentic mod`,
        `${category} most genuine mod`,
        `${category} most original mod`,
        `${category} most legitimate mod`,
        `${category} most official mod`,
        `${category} most primary mod`,
        `${category} most main mod`,
        `${category} most leading mod`,
        `${category} most top rated mod`,
        `${category} most highest rated mod`,
        `${category} most most popular mod`,
        `${category} most most downloaded mod`,
        `${category} most most trusted mod`,
        `${category} most most reliable mod`,
        `${category} most most secure mod`,
        `${category} most most safe mod`,
        `${category} most most clean mod`,
        `${category} most most working mod`,
        `${category} most most tested mod`,
        `${category} most most verified mod`,
        `${category} most most authentic mod`,
        `${category} most most genuine mod`,
        `${category} most most original mod`,
        `${category} most most legitimate mod`,
        `${category} most most official mod`,
        `${category} most most primary mod`,
        `${category} most most main mod`,
        `${category} most most leading mod`,
        `${category} most most top rated mod`,
        `${category} most most highest rated mod`
      ];
      baseKeywords.push(...categoryKeywords);
    }

    return baseKeywords.join(', ');
  };

  // Generate dynamic title
  const generateTitle = () => {
    if (app) {
      return `${app.name} Mod APK Download - Premium Features Unlocked | MODZY`;
    }
    if (category) {
      return `${category} Mod APK Downloads - Premium Apps & Games | MODZY`;
    }
    return 'MODZY - #1 Mod APK Download Site | Premium Features Unlocked';
  };

  // Generate dynamic description
  const generateDescription = () => {
    if (app) {
      return `Download ${app.name} Mod APK with premium features unlocked. Safe, tested, and virus-free modified version. Latest ${app.name} mod with all premium features free.`;
    }
    if (category) {
      return `Download ${category} Mod APK files with premium features unlocked. Safe, tested, and virus-free modified apps. Latest ${category} mods with all premium features free.`;
    }
    return 'Download premium mod APK files with unlocked features. Safe, tested, and virus-free modified apps. Latest mods with all premium features free.';
  };

  const title = generateTitle();
  const description = generateDescription();
  const keywords = generateModKeywords(app?.name, category);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content="/logo512.jpg" />
      <meta property="og:image:alt" content="MODZY - Premium Mod APK Download Site" />
      <meta property="og:site_name" content="MODZY" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/logo512.jpg" />
      <meta name="twitter:image:alt" content="MODZY - Premium Mod APK Download Site" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="MODZY" />
      <meta name="publisher" content="MODZY" />
      <meta name="copyright" content="MODZY" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.position" content="39.50;-98.35" />
      <meta name="ICBM" content="39.50, -98.35" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en" href={window.location.href} />
      <link rel="alternate" hrefLang="x-default" href={window.location.href} />
    </Helmet>
  );
};

export default ModAppSEO;