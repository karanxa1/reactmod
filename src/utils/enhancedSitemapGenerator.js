// Enhanced Sitemap Generator for MODZY
// Generates XML sitemap with proper priority and frequency settings
import { DOMAIN_CONFIG } from '../config/domain';

export const generateEnhancedSitemap = (apps = []) => {
  const baseUrl = DOMAIN_CONFIG.baseUrl;
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages with SEO priority
  const staticPages = [
    {
      url: '',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: currentDate
    },
    {
      url: '/apps',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: currentDate
    },
    {
      url: '/categories',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    },
    {
      url: '/privacy',
      priority: '0.3',
      changefreq: 'monthly',
      lastmod: currentDate
    },
    {
      url: '/terms',
      priority: '0.3',
      changefreq: 'monthly',
      lastmod: currentDate
    }
  ];

  // Category pages for better SEO structure
  const categoryPages = [
    'social-media-apps',
    'educational-apps', 
    'utility-apps',
    'entertainment-apps',
    'productivity-apps',
    'communication-apps'
  ].map(category => ({
    url: `/category/${category}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: currentDate
  }));

  // Individual app pages
  const appPages = apps.map(app => {
    const appSlug = app.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return {
      url: `/app/${appSlug}`,
      priority: '0.6',
      changefreq: 'weekly',
      lastmod: app.updatedAt || currentDate
    };
  });

  // Keyword-focused landing pages
  const keywordPages = [
    'instagram-mod-apk',
    'telegram-mod-apk', 
    'whatsapp-mod-apk',
    'brainly-mod-apk',
    'photomath-mod-apk',
    'educational-mod-apps',
    'safe-mod-apk-download'
  ].map(keyword => ({
    url: `/${keyword}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: currentDate
  }));

  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...appPages,
    ...keywordPages
  ];

  // Generate XML sitemap
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

// Generate robots.txt with sitemap reference
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://modzy.in/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Specific rules for search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Block certain paths if needed
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Allow important files
Allow: /logo192.jpg
Allow: /logo512.jpg
Allow: /manifest.json`;
};

// Generate news sitemap for timely content
export const generateNewsSitemap = (recentApps = []) => {
  const baseUrl = 'https://modzy.in';
  
  const newsItems = recentApps.slice(0, 10).map(app => {
    const pubDate = new Date(app.createdAt || Date.now());
    const appSlug = app.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return {
      url: `/app/${appSlug}`,
      title: `${app.name} - ${app.category} Mod APK Download`,
      publication: 'MODZY',
      language: 'en',
      publishedDate: pubDate.toISOString(),
      keywords: `${app.name}, ${app.category}, mod apk, android app`
    };
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${item.publication}</news:name>
        <news:language>${item.language}</news:language>
      </news:publication>
      <news:publication_date>${item.publishedDate}</news:publication_date>
      <news:title>${item.title}</news:title>
      <news:keywords>${item.keywords}</news:keywords>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

  return xmlContent;
};

export default {
  generateEnhancedSitemap,
  generateRobotsTxt,
  generateNewsSitemap
};