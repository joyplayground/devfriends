// workbox.skipWaiting();

const CACHE_VERSION = 'v2';

workbox.core.setCacheNameDetails({
    prefix: 'honchy',
    suffix: CACHE_VERSION,
    precache: 'PC',
    runtime: 'RC'
});

workbox.clientsClaim();

// 策略是 cacheFirst， 无法发出 update 通知
// 直接使用 runtime 的 router，当资源发生变化的时候，通知修改
workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener('message', function(event) {
    if (event.data === 'skipWaiting') {
        console.log('skip waiting');
        self.skipWaiting();
    }
});
