// Modern Image Optimization Utility
// Handles WebP/AVIF conversion and responsive image serving

/**
 * Generate responsive image sources with modern formats
 * @param {string} imageSrc - Original image source
 * @param {Array} sizes - Array of sizes for responsive images
 * @param {Object} options - Additional options
 * @returns {Object} - Responsive image data
 */
export const generateResponsiveImages = (imageSrc, sizes = [320, 640, 1024, 1920], options = {}) => {
  const { quality = 80, formats = ['avif', 'webp', 'jpg'] } = options;
  
  if (!imageSrc) return null;
  
  const baseUrl = imageSrc.split('.').slice(0, -1).join('.');
  const extension = imageSrc.split('.').pop().toLowerCase();
  
  const sources = formats.map(format => {
    const srcSet = sizes.map(size => {
      if (format === 'avif') {
        return `${baseUrl}_${size}w.avif ${size}w`;
      } else if (format === 'webp') {
        return `${baseUrl}_${size}w.webp ${size}w`;
      } else {
        return `${baseUrl}_${size}w.${extension} ${size}w`;
      }
    }).join(', ');
    
    return {
      type: `image/${format}`,
      srcSet
    };
  });
  
  return {
    sources,
    fallback: imageSrc,
    sizes: '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
  };
};

/**
 * Modern Picture component for responsive images
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Picture element with modern formats
 */
export const ModernPicture = ({ 
  src, 
  alt, 
  className = '', 
  sizes = [320, 640, 1024], 
  loading = 'lazy',
  ...props 
}) => {
  if (!src) return null;
  
  const imageData = generateResponsiveImages(src, sizes);
  
  if (!imageData) {
    return <img src={src} alt={alt} className={className} loading={loading} {...props} />;
  }
  
  return (
    <picture className={className}>
      {imageData.sources.map((source, index) => (
        <source 
          key={index}
          type={source.type}
          srcSet={source.srcSet}
          sizes={imageData.sizes}
        />
      ))}
      <img 
        src={imageData.fallback} 
        alt={alt} 
        loading={loading}
        {...props}
      />
    </picture>
  );
};

/**
 * Check if browser supports modern image formats
 * @returns {Object} - Support status for different formats
 */
export const checkImageFormatSupport = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  const support = {
    webp: false,
    avif: false
  };
  
  // Check WebP support
  try {
    support.webp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch (e) {
    support.webp = false;
  }
  
  // Check AVIF support (more complex detection)
  const avifTest = new Image();
  avifTest.onload = () => {
    support.avif = true;
  };
  avifTest.onerror = () => {
    support.avif = false;
  };
  avifTest.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  
  return support;
};

/**
 * Get optimized image URL based on browser support
 * @param {string} originalSrc - Original image source
 * @param {number} width - Desired width
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (originalSrc, width = null, options = {}) => {
  if (!originalSrc) return '';
  
  const { quality = 80, format = 'auto' } = options;
  const support = checkImageFormatSupport();
  
  // If it's already a modern format or external URL, return as is
  if (originalSrc.includes('.webp') || originalSrc.includes('.avif') || originalSrc.startsWith('http')) {
    return originalSrc;
  }
  
  const baseUrl = originalSrc.split('.').slice(0, -1).join('.');
  const extension = originalSrc.split('.').pop().toLowerCase();
  
  let optimizedFormat = extension;
  
  // Choose best supported format
  if (format === 'auto') {
    if (support.avif) {
      optimizedFormat = 'avif';
    } else if (support.webp) {
      optimizedFormat = 'webp';
    }
  } else if (format === 'webp' && support.webp) {
    optimizedFormat = 'webp';
  } else if (format === 'avif' && support.avif) {
    optimizedFormat = 'avif';
  }
  
  // Add width suffix if specified
  const widthSuffix = width ? `_${width}w` : '';
  
  return `${baseUrl}${widthSuffix}.${optimizedFormat}`;
};

/**
 * Lazy loading intersection observer for images
 * @param {HTMLElement} target - Image element to observe
 * @param {Function} callback - Callback when image enters viewport
 * @returns {IntersectionObserver} - Observer instance
 */
export const createImageLazyLoader = (target, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  );
  
  observer.observe(target);
  return observer;
};

/**
 * Preload critical images
 * @param {Array} imageSources - Array of image sources to preload
 * @param {Object} options - Preload options
 */
export const preloadCriticalImages = (imageSources, options = {}) => {
  const { formats = ['avif', 'webp'], sizes = [320, 640] } = options;
  
  imageSources.forEach(src => {
    formats.forEach(format => {
      sizes.forEach(size => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = getOptimizedImageUrl(src, size, { format });
        link.type = `image/${format}`;
        document.head.appendChild(link);
      });
    });
  });
};

/**
 * Generate image optimization build script
 * This would typically be run during build process
 */
export const generateImageOptimizationScript = () => {
  return `
# Image Optimization Build Script
# Run this script to generate WebP and AVIF versions of your images

# Install sharp for image processing
npm install --save-dev sharp

# Create optimization script
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImages = async () => {
  const inputDir = './public';
  const sizes = [320, 640, 1024, 1920];
  const formats = ['webp', 'avif'];
  
  const imageFiles = fs.readdirSync(inputDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    
    // Generate different sizes and formats
    for (const size of sizes) {
      for (const format of formats) {
        const outputPath = path.join(inputDir, \`\${baseName}_\${size}w.\${format}\`);
        
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .toFormat(format, { quality: 80 })
          .toFile(outputPath);
        
        console.log(\`Generated: \${outputPath}\`);
      }
    }
  }
};

optimizeImages().catch(console.error);
`;
};

export default {
  generateResponsiveImages,
  ModernPicture,
  checkImageFormatSupport,
  getOptimizedImageUrl,
  createImageLazyLoader,
  preloadCriticalImages,
  generateImageOptimizationScript
};