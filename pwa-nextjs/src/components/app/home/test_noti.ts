import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

// Cấu hình VAPID Keys (Thay bằng khóa của bạn)
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

console.log('VAPID_PUBLIC_KEY ', VAPID_PUBLIC_KEY);
console.log('VAPID_PRIVATE_KEY ', VAPID_PRIVATE_KEY);

webpush.setVapidDetails(
  'mailto:your-email@example.com', // Email liên hệ
  VAPID_PUBLIC_KEY!,
  VAPID_PRIVATE_KEY!,
);

// Subscription từ client
const subscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/eJtRTKwPZC4:APA91bHdsMnmnmmZbRFMk4gIe4QjzVJYnimokaI-aFEnnIjz2humPv61nzS7bsOXOgXfZeyGAIi4FQXrxkHT2EriLJa_MuJON1ApsYXOmOJjdvUcLHVgBzbbHK1BHGPvKu5ue2fu0E8P',
  expirationTime: null,
  keys: {
    p256dh:
      'BN0FgCZDh-4dAv5hlUYuH41GjcvMVqllAm_gav0-SQF0TWrgm4yPWRirFXtJsqccoDd7-rmtGrYe_S69WL7YPXI',
    auth: 'uSJa-fA393wEJQCSjXabJA',
  },
};

// Thông tin thông báo đẩy
const payload = JSON.stringify({
  title: '🔔 Push Notification Test',
  body: 'This is a test notification sent via web-push!',
  icon: '/icon.png',
});

// Gửi thông báo
webpush
  .sendNotification(subscription, payload)
  .then(() => console.log('Push notification sent successfully!'))
  .catch((err) => console.error('Error sending push notification:', err));
