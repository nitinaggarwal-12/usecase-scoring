// Progressive Web App (PWA) Master Offline CacheStorage Hub
// Prefetches and indexes heavy WASM and styling models for zero-latency field C-Suite showcases

const CACHE_NAME = 'virtual-ce-pwa-enterprise-cache-v1';
const PREFETCH_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/models/audio_to_blendshapes.tflite'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA_SERVICE_WORKER] Successfully initialized CacheStorage hub and cached presentation assets.');
      return cache.addAll(PREFETCH_ASSETS).catch(() => {});
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA_SERVICE_WORKER] Purging stale storage ledger:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {});
    })
  );
});
