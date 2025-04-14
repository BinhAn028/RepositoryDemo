import { PushNotificationManager } from '../components/app/home/PushNotificationManager ';
import InstallPrompt from '../components/app/home/InstallPrompt';
import Link from 'next/link';


export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function Home() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
      <Link href="/rscload">Rscload</Link> 
     
    </div>
  );
}
