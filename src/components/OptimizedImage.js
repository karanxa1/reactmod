import React, { useState, useRef, useEffect } from 'react';
import { createImageLazyLoader } from '../utils/imageOptimization';

/**
 * OptimizedImage Component
 * Automatically serves WebP/AVIF when supported, with lazy loading
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate optimized image sources
  const generateSources = (originalSrc) => {
    if (!originalSrc) return [];
    
    const baseName = originalSrc.split('.').slice(0, -1).join('.');
    const extension = originalSrc.split('.').pop().toLowerCase();
    
    // Define responsive breakpoints
    const breakpoints = [320, 640, 1024, 1920];
    
    const sources = [];
    
    // AVIF sources (best compression)
    const avifSrcSet = breakpoints
      .map(bp => `${baseName}_${bp}w.avif ${bp}w`)
      .join(', ');
    sources.push({
      type: 'image/avif',
      srcSet: avifSrcSet,
      sizes
    });
    
    // WebP sources (good compression, wide support)
    const webpSrcSet = breakpoints
      .map(bp => `${baseName}_${bp}w.webp ${bp}w`)
      .join(', ');
    sources.push({
      type: 'image/webp',
      srcSet: webpSrcSet,
      sizes
    });
    
    // Fallback sources (original format)
    const fallbackSrcSet = breakpoints
      .map(bp => `${baseName}_${bp}w.${extension} ${bp}w`)
      .join(', ');
    sources.push({
      type: `image/${extension}`,
      srcSet: fallbackSrcSet,
      sizes
    });
    
    return sources;
  };

  // Handle image load
  const handleLoad = (event) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(event);
  };

  // Handle image error
  const handleError = (event) => {
    setHasError(true);
    // Fallback to original source
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
    if (onError) onError(event);
  };

  // Set up lazy loading
  useEffect(() => {
    if (!imgRef.current || priority || loading !== 'lazy') return;

    observerRef.current = createImageLazyLoader(imgRef.current, (target) => {
      setCurrentSrc(src);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, loading]);

  // Set initial source for priority images
  useEffect(() => {
    if (priority || loading !== 'lazy') {
      setCurrentSrc(src);
    }
  }, [src, priority, loading]);

  // If no src provided, return null
  if (!src) return null;

  // For external images or when optimization is not needed
  if (src.startsWith('http') || src.includes('.svg')) {
    return (
      <img
        ref={imgRef}
        src={loading === 'lazy' && !priority ? (currentSrc || undefined) : src}
        alt={alt}
        className={`${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }

  const sources = generateSources(src);

  return (
    <picture className={`optimized-picture ${className}`}>
      {sources.map((source, index) => (
        <source
          key={index}
          type={source.type}
          srcSet={source.srcSet}
          sizes={source.sizes}
        />
      ))}
      <img
        ref={imgRef}
        src={loading === 'lazy' && !priority ? (currentSrc || undefined) : src}
        alt={alt}
        className={`optimized-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

// CSS for optimized images
const optimizedImageStyles = `
.optimized-picture {
  display: inline-block;
  max-width: 100%;
  height: auto;
}

.optimized-image {
  max-width: 100%;
  height: auto;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.optimized-image.loaded {
  opacity: 1;
}

.optimized-image.error {
  opacity: 0.7;
  filter: grayscale(100%);
}

/* Lazy loading placeholder */
.optimized-image:not([src]) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive image improvements */
@media (max-width: 768px) {
  .optimized-picture {
    width: 100%;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleId = 'optimized-image-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = optimizedImageStyles;
    document.head.appendChild(style);
  }
}

export default OptimizedImage;