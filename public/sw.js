/* Sahay offline-first service worker (cache-first for static, network-first for pages) */
const CACHE = 'sahay-v1';
const CORE = ['/', '/manifest.json', '/icon.svg', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Never cache APIPOSTs / AI endpoints
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  event.respondWith(
    (async () => {
      try {
        const net = await fetch(request);
        const cache = await caches.open(CACHE);
        cache.put(request, net.clone()).catch(() => undefined);
        return net;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') {
          const offline = await caches.match('/offline.html');
          if (offline) return offline;
        }
        throw new Error('offline');
      }
    })()
  );
});
