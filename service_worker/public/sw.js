self.importScripts('https://cdn.jsdelivr.net/npm/idb@8.0.2/build/umd.min.js');

self.addEventListener('install', () => {
    console.log('📦 SW installed');
});

self.addEventListener('activate', () => {
    console.log('⚙️ SW activated');
});

self.addEventListener('sync', (event) => {
    console.log('sync');
    if (event.tag === 'send-messages') {
        event.waitUntil(sendStoredMessages());
    }
});

async function notifyClients(data) {
    const allClients = await self.clients.matchAll({
      includeUncontrolled: true, // quan trọng: bao gồm các client chưa điều khiển bởi SW
      type: 'window',            // chỉ lấy các tab (window), không lấy workers
    });
  
    for (const client of allClients) {
      client.postMessage(data);
    }
  }

async function sendStoredMessages() {
    console.log('sendStoredMessages');
    const db = await self.idb.openDB('messages-db', 1);
    const allKeys = await db.getAllKeys('messages');

    console.log('Sending stored messages:', allKeys);
    if(!allKeys.length) {
        console.log('No messages to send');
        return;
    }
    for (const key of allKeys) {
        console.log('Sending message:', key);
        const mess = await db.get('messages', key);
        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                body: JSON.stringify(mess),
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                const tx = db.transaction('messages', 'readwrite');
                await tx.store.delete(key);
                await tx.done;
            }
        } catch (err) {
            console.error('Failed to send message:', err);
            return; // giữ lại tin nhắn để thử lại sau
        }
    }
    await notifyClients({ type: 'MESSAGE_SYNC_DONE', message: 'Đã gửi xong!' });
}