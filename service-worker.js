console.log('register service worker');
workbox.routing.registerRoute(/\.(png|jpg|webp|gif|jpeg|ico)$/, workbox.strategies.cacheFirst());
workbox.routing.registerRoute(/\.(js|css|json)$/, workbox.strategies.staleWhileRevalidate());
workbox.routing.registerRoute(/\/pages/, workbox.strategies.staleWhileRevalidate());
workbox.skipWaiting();
workbox.clientsClaim();
