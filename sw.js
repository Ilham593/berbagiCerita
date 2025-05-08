const CACHE_NAME = 'story-app-v1';
const ASSETS = [
  '/berbagiCerita/',
  '/berbagiCerita/index.html',
  '/berbagiCerita/offline.html',
  '/berbagiCerita/scripts/index.js',
  '/berbagiCerita/styles/styles.css',
  '/berbagiCerita/icons/icon-192x192.png',
  '/berbagiCerita/icons/icon-512x512.png',
];

// Install: Caching App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: Clean Old Cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: Serve from cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match('/berbagiCerita/offline.html'))
    )
  );
});

// Push Notification
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
    console.warn('Push payload bukan JSON.');
  }

  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});
