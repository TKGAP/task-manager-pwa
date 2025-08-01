self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('task-app-v4').then(cache => {
      return cache.addAll([
        './',
        './index.html'
      ]);
    })
  );
});

// 新しいSWが来たら即座に適用
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== 'task-app-v4') {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
