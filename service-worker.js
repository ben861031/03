/*
 * PWA 網站外殼快取。
 * 安全邊界：只處理本站靜態檔案；不攔截、不快取 Firebase、Authentication、
 * App Check、Cloud Functions 或任何跨網域請求。
 * 發布新版時請同步遞增 CACHE_NAME。
 */
const CACHE_NAME = 'dispatch-pwa-v2.1.6-info-panel';
const CACHE_PREFIX = 'dispatch-pwa-';
const SHELL_FILES = [
  './index.html',
  './offline.html',
  './assets/css/style.css',
  './assets/js/app-config.js',
  './assets/js/firebase-init.js',
  './assets/js/app.js',
  './assets/js/pwa-init.js',
  './manifest.webmanifest',
  './assets/icons/favicon.png',
  './assets/icons/app-icon-white-192.png',
  './assets/icons/app-icon-white-512.png',
  './assets/icons/app-icon-white-maskable-512.png',
  './assets/icons/apple-touch-icon-white.png'
];

const SHELL_PATHS = new Set(
  SHELL_FILES.map((path) => new URL(path, self.registration.scope).pathname)
);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .catch(() => caches.match('./offline.html'))
    );
    return;
  }

  if (!SHELL_PATHS.has(url.pathname)) return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || !response.ok || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
