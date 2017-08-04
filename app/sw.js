const CACHE_NAME = 'chris-hutchinson-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/app.js',
  '/manifest.json',
];

self.addEventListener('install', event =>
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(console.error)
  )
);

self.addEventListener('fetch', event =>
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        // Cache hit
        if (response) return response;
        return fetch(event.request);
      })
      .catch(console.error)
  )
);
