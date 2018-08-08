self.importScripts('https://unpkg.com/dexie@2.0.4/dist/dexie.min.js');
self.importScripts('/js/dbhelper.js');

const CACHE_NAME = 'restaurant-review-v2';
const IMG_CACHE_NAME = 'restaurant-review-imgs';
const ALL_CACHES = [
    CACHE_NAME,
    IMG_CACHE_NAME
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll([
                '/',
                '/restaurant.html',
                'js/main.js',
                'js/restaurant_info.js',
                'js/dbhelper.js',
                'css/styles.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/dexie@latest/dist/dexie.min.js',
                'https://unpkg.com/dexie@2.0.4/dist/dexie.min.js',
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
                        !ALL_CACHES.includes(cacheName);
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// support offline
self.addEventListener('fetch', function (event) {
    var requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname.startsWith('/img')) {
            event.respondWith(servePhoto(event.request));
            return;
        }
    }

    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true  
        }).then(response => {
            return response || fetch(event.request);
        })
    );
});

function servePhoto(request) {
    var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
    return caches.open(IMG_CACHE_NAME).then((cache) => {
        return cache.match(storageUrl).then(response => {
            if (response) return response;

            return fetch(request).then(networkResponse => {
                cache.put(storageUrl, networkResponse.clone());
                return networkResponse;
            });
        })
    })
}