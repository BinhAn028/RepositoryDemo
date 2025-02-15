import { PushNotificationManager } from '../components/PushNotificationManager ';
import InstallPrompt from '../components/InstallPrompt';

export default function Home() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
