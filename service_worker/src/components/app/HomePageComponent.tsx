'use client';

import { useEffect, useState } from 'react';
import { openDB } from '@/lib/idb';

export default function HomePageComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data?.type === 'MESSAGE_SYNC_DONE') {
        alert('✅ Tin nhắn đã được gửi thành công!');
      }
    });
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        reg.update(); // force check latest sw.js
      })
      .then(() => {
        console.log('✅ Service Worker registered');
      })
        .catch((err) => console.error('❌ SW registration failed', err));
    }
  }, []);

  const sendMessage = async () => {
    console.log('📨 Gửi tin nhắn:', message, navigator.onLine);
    if (navigator.onLine) {
      await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const db = await openDB();
      const tx = db.transaction('messages', 'readwrite');
      await tx.store.add({ message });
      await tx.done;
      const sw = await navigator.serviceWorker.ready;
      // Sync đợi có network để gửi tin nhắn
      (sw as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('send-messages');
      // Call thực hiện trực tiếp 
      sw.active?.postMessage({ type: 'SEND_MESSAGES_NOW', message });
      alert('Tin nhắn đã lưu offline và sẽ gửi khi có mạng!');
    }

    setMessage('');
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Service Worker Demo</h1>
      
      <div className="mb-6">
        <h2 className="text-xl mb-2">Features:</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><a href="/digital-clock" className="text-blue-600 hover:text-blue-800 underline">Digital World Clock</a> - Real-time clocks for multiple time zones</li>
          <li>Offline Message Sender (below)</li>
        </ul>
      </div>

      <div className="border-t pt-4">
        <h2 className="text-xl mb-4">Offline Message Sender</h2>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
          Send
        </button>
      </div>
    </main>
  );
}