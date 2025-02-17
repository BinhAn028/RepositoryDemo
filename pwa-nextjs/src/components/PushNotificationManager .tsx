'use client';
import { useEffect, useState } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from './actions';
import OneSignal from 'react-onesignal';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState('');

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
      //
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from Service Worker:', event);
      });
      //
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        // console.log('annnnnn enable', enable);
        if (!enable) {
          await OneSignal.init({
            appId: 'a9b55968-e339-46f6-90c4-e3d6b3292a39',
            safari_web_id:
              'web.onesignal.auto.412ff56c-6955-417a-b410-cc97b21af240',
            notifyButton: {
              enable: true,
            },
            autoResubscribe: true, // tự động theo đõi
            autoRegister: true,

            serviceWorkerPath: '/sw.js',
            allowLocalhostAsSecureOrigin: true,
          });
        }
        setEnable(OneSignal.Notifications.permission);

        await OneSignal.Notifications.requestPermission();
        await OneSignal.Slidedown.promptPush();

        await OneSignal.login('huyi_abi222');
        // await OneSignal.User.addAlias('myAlias', 'huyi');

        // await OneSignal.Debug.setLogLevel('trace'); // này để log, hông muốn log thì để ""
      } catch (error) {
        console.log('error :>> ', error);
      }
    };
    init();
  }, [enable]);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  }

  async function postMessageToServiceWorker() {
    const registration = await navigator.serviceWorker.ready;
    // Gửi một message xuống Service Worker
    if (registration.active) {
      console.log('registration :>> ', registration);
      registration.active.postMessage({
        type: 'PING',
        message: 'Web Hello Service Worker!',
      });
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div className='flex flex-col gap-2 justify-start items-center mt-10'>
      <h3 className='tex-center'>Push Notifications</h3>
      {subscription ? (
        <div className='flex flex-col gap-2 justify-start items-center'>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            className='w-32 bg-black p-2 rounded-md'
            type='text'
            placeholder='Enter notification message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
          <button onClick={postMessageToServiceWorker}>
            Send Service Worker
          </button>
        </div>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
          <input
            className='w-32 bg-black p-2 rounded-md'
            type='text'
            placeholder='Enter notification message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={postMessageToServiceWorker}>
            Send Service Worker
          </button>
        </>
      )}
    </div>
  );
}
