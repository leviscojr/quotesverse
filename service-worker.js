self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('quotesverse-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/quotes.html',
        '/favorites.html',
        '/about.html',
        '/style.css',
        '/scripts/quotes.js'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
