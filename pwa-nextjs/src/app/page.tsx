import { PushNotificationManager } from '../components/app/home/PushNotificationManager ';
import InstallPrompt from '../components/app/home/InstallPrompt';

export default function Home() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
