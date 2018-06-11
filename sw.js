var CACHE_NAME = 'restaurant-review-v1';
console.log('Opened cache');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll([
                '/',
                'js/main.js',
                'js/restaurant_info.js',
                'js/dbhelper.js',
                'css/styles.css',
                'data/restaurants.json'
            ]);
        })
    )
})

// Remove old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('restaurant-review-') &&
                        cacheName != CACHE_NAME;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// support offline
self.addEventListener('fetch', function(event) {
    var requestUrl = new URL(event.request.url);
  
    // if (requestUrl.origin === location.origin) {
    //   if (requestUrl.pathname === '/') {
    //     event.respondWith(caches.match('/skeleton'));
    //     return;
    //   }
    // }
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });