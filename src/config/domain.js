// Domain configuration for different environments
const getDomain = () => {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Always use production domain for modzy.in
  return 'https://modzy.in';
};

export const DOMAIN_CONFIG = {
  baseUrl: getDomain(),
  productionUrl: 'https://modzy.in',
  isProduction: process.env.NODE_ENV === 'production',
  isVercel: !!process.env.VERCEL,
  vercelUrl: process.env.VERCEL_URL,
  vercelEnv: process.env.VERCEL_ENV
};

// Helper functions
export const getFullUrl = (path = '') => {
  const baseUrl = DOMAIN_CONFIG.baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export const getImageUrl = (imagePath) => {
  return getFullUrl(imagePath);
};

export const getAppUrl = (appId) => {
  return getFullUrl(`app/${appId}`);
};

export const getCategoryUrl = (category) => {
  return getFullUrl(`category/${category}`);
};

export default DOMAIN_CONFIG;
