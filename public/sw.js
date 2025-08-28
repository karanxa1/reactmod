// Service Worker for MODZY App
// Provides caching and offline functionality for better performance

const CACHE_NAME = 'modzy-cache-v1';
const STATIC_CACHE_NAME = 'modzy-static-v1';
const DYNAMIC_CACHE_NAME = 'modzy-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.jpg',
  '/logo512.jpg'
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Skip external resources that should be handled by browser directly
  if (isExternalResource(url)) {
    return;
  }
  
  // Handle different types of requests
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request));
  } else {
    event.respondWith(handleNavigationRequest(request));
  }
});

// Check if request is for static assets
function isStaticAsset(url) {
  return url.pathname.includes('/static/') || 
         url.pathname.endsWith('.js') || 
         url.pathname.endsWith('.css') || 
         url.pathname.endsWith('.ico');
}

// Check if request is for API
function isAPIRequest(url) {
  return url.hostname.includes('firestore.googleapis.com') ||
         url.hostname.includes('firebase') ||
         url.pathname.includes('/api/');
}

// Check if request is for external resources that should bypass service worker
function isExternalResource(url) {
  // Allow all external resources - no bypassing for ad networks
  return false;
}

// Check if request is for images
function isImageRequest(url) {
  return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
         url.hostname.includes('firebasestorage.googleapis.com');
}

// Handle static assets with cache-first strategy
function handleStaticAsset(request) {
  return caches.match(request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(STATIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone).catch((error) => {
                  console.warn('[SW] Failed to cache static asset:', error);
                });
              });
          }
          return networkResponse;
        });
    })
    .catch((error) => {
      console.warn('[SW] Failed to handle static asset:', request.url, error);
      // Return offline fallback for static assets
      return new Response('Offline - Static asset not available', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    });
}

// Handle API requests with network-first strategy
function handleAPIRequest(request) {
  return fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE_NAME)
          .then((cache) => {
            cache.put(request, responseClone).catch((error) => {
              console.warn('[SW] Failed to cache API response:', error);
            });
          });
      }
      return networkResponse;
    })
    .catch((error) => {
      console.warn('[SW] Failed to fetch API request:', request.url, error);
      // Fallback to cache for API requests
      return caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Return offline fallback data
          return new Response(JSON.stringify({
            error: 'Offline',
            message: 'No network connection available',
            cached: false
          }), {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        });
    });
}

// Handle image requests with stale-while-revalidate strategy
function handleImageRequest(request) {
  return caches.open(DYNAMIC_CACHE_NAME)
    .then((cache) => {
      return cache.match(request)
        .then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                // Only cache successful responses
                cache.put(request, networkResponse.clone()).catch((error) => {
                  console.warn('[SW] Failed to cache image:', error);
                });
              }
              return networkResponse;
            })
            .catch((error) => {
              console.warn('[SW] Failed to fetch image:', request.url, error);
              // Return cached version if available, otherwise let the error propagate
              if (cachedResponse) {
                return cachedResponse;
              }
              // Don't try to cache failed requests
              return new Response('', {
                status: 404,
                statusText: 'Image not found'
              });
            });
          
          // Return cached version immediately, update in background
          return cachedResponse || fetchPromise;
        });
    });
}

// Handle navigation requests
function handleNavigationRequest(request) {
  return fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE_NAME)
          .then((cache) => {
            cache.put(request, responseClone).catch((error) => {
              console.warn('[SW] Failed to cache navigation response:', error);
            });
          });
      }
      return networkResponse;
    })
    .catch((error) => {
      console.warn('[SW] Failed to fetch navigation request:', request.url, error);
      // Fallback to cached version or offline page
      return caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Return cached index.html for SPA routing
          return caches.match('/')
            .then((indexResponse) => {
              return indexResponse || new Response('Offline', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        });
    });
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      handleBackgroundSync()
    );
  }
});

// Handle background sync tasks
function handleBackgroundSync() {
  return new Promise((resolve) => {
    console.log('[SW] Performing background sync tasks');
    // Add any background sync logic here
    resolve();
  });
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/logo192.jpg',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/logo192.jpg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.ico'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('MODZY', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => {
          return cache.addAll(event.data.urls);
        })
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync content in background
      handlePeriodicSync()
    );
  }
});

// Handle periodic sync
function handlePeriodicSync() {
  return fetch('/api/sync')
    .then((response) => {
      if (response.ok) {
        console.log('[SW] Periodic sync completed successfully');
      }
    })
    .catch((error) => {
      console.error('[SW] Periodic sync failed:', error);
    });
}

// Cache management utilities
function cleanupOldCaches() {
  return caches.keys()
    .then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.includes('modzy')) {
            return caches.delete(cacheName);
          }
        })
      );
    });
}

// Preload critical resources
function preloadCriticalResources() {
  const criticalUrls = [
    '/',
    '/static/css/main.css',
    '/static/js/bundle.js'
  ];
  
  return caches.open(STATIC_CACHE_NAME)
    .then((cache) => {
      return cache.addAll(criticalUrls);
    });
}

console.log('[SW] Service worker script loaded');