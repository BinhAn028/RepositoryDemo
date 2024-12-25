// Import Workbox libraries (needed for injection)
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);


const cacheName = 'v1'
const cacheClone = async(e) => {
    const res = await fetch(e.request);
    const resClone = res.clone();

    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);
    return res;
};

self.addEventListener('fetch', (e) => {
    e.respondWith(
        cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res)
    );
});

self.addEventListener('push', function(event) {
    console.log('Push Notification received', process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: data.icon || '/icon.png',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        }
        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow('https://www.facebook.com/'))
})

self.addEventListener('message', (event) => {
    console.log('[Service Worker] Received message:', event.data);

    // Xử lý dữ liệu từ Front End
    if (event.data.type === 'PING') {
        // Gửi phản hồi lại Front End
        event.source.postMessage({ type: 'PONG', message: 'Hello from Service Worker!' });
        const options = {
            body: 'Hello from Service Worker!',
            icon: '/icon.png',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
            },
        }
        event.waitUntil(self.registration.showNotification("Service Worker", options))
    }
});