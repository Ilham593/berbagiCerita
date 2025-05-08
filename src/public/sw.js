const CACHE_NAME = 'story-app-v1';
const ASSETS = [
  '/berbagiCerita/',
  '/berbagiCerita/index.html',
  '/berbagiCerita/offline.html',
  '/berbagiCerita/assets/index.js', 
  '/berbagiCerita/assets/index.css',
  '/berbagiCerita/icons/icon-192x192.png',
  '/berbagiCerita/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(ASSETS);
      } catch (err) {
        console.warn('[ServiceWorker] Caching gagal:', err);
      }
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Hapus cache lama:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/berbagiCerita/offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {

  let data = {
    title: 'Notifikasi Baru',
    options: {
      body: 'Ada cerita baru!',
    },
  };

  try {
    const parsed = event.data?.json();
    if (parsed) data = parsed;
  } catch {
    console.warn('[ServiceWorker] Payload push bukan JSON.');
  }

  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});
