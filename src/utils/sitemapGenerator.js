// Sitemap Generator Utility for MODZY
// This utility generates sitemap.xml for better SEO crawling

const generateSitemap = (apps = []) => {
  const baseUrl = 'https://modzy.in';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: '/apps',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/categories',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/privacy',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.3'
    },
    {
      url: '/terms',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.3'
    }
  ];

  // Mod-specific category pages
  const modCategoryPages = [
    {
      url: '/instagram-mods',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/telegram-mods',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/whatsapp-mods',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/educational-mods',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/utility-mods',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/streaming-mods',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/mod-faq',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/mod-guides',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/safe-mod-downloads',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/best-mod-apps-2025',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: '/latest-mod-apps',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    }
  ];

  // Generate app-specific URLs
  const appPages = apps.map(app => ({
    url: `/app/${app.id}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.7'
  }));

  // Combine all pages
  const allPages = [...staticPages, ...modCategoryPages, ...appPages];

  // Generate XML sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Generate robots.txt content
const generateRobotsTxt = () => {
  const baseUrl = 'https://modzy.in';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$
Disallow: /*.xml$

# Allow important files
Allow: /sitemap.xml
Allow: /robots.txt

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1

# Specific bot instructions
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1`;
};

// Function to download sitemap as file (for development/testing)
const downloadSitemap = (apps) => {
  const sitemapContent = generateSitemap(apps);
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to download robots.txt as file (for development/testing)
const downloadRobotsTxt = () => {
  const robotsContent = generateRobotsTxt();
  const blob = new Blob([robotsContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'robots.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to generate and save sitemap to public folder (for build process)
const saveSitemapToPublic = async (apps) => {
  try {
    const sitemapContent = generateSitemap(apps);
    const robotsContent = generateRobotsTxt();
    
    // In a real application, you would save these to the public folder
    // This is a placeholder for the actual file writing logic
    console.log('Generated sitemap.xml:', sitemapContent);
    console.log('Generated robots.txt:', robotsContent);
    
    return {
      sitemap: sitemapContent,
      robots: robotsContent
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
};

export {
  generateSitemap,
  generateRobotsTxt,
  downloadSitemap,
  downloadRobotsTxt,
  saveSitemapToPublic
};