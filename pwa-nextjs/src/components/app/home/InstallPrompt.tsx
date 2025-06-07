'use client';
import NProgress from '@/providers/progressProvider/nprogress';
// import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

export default function InstallPrompt() {
  // const router = useRouter();
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const pWindow: any = window;
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !pWindow.MSStream);

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className='flex flex-col gap-2 justify-start items-center mt-20'>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role='img' aria-label='share icon'>
            {' '}
            ⎋{' '}
          </span>
          and then `&quot;`Add to Home Screen`&quot;`
          <span role='img' aria-label='plus icon'>
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
      <div
        onClick={() => {
          NProgress.start();
          // router.push('/rscload');
          // NProgress.done();
        }}>AAAAAA</div>
    </div>
  );
}
