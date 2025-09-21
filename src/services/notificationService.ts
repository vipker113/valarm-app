import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

export async function requestUserPermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } catch (error) {
    console.log('Error requesting notification permission: ', error);
  }
}

export async function getFcmToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      return fcmToken;
    }
  } catch (error) {
    console.log('Failed to get FCM token', error);
    return null;
  }
}

export function notificationListener() {
  messaging().onMessage(async remoteMessage => {
    console.log(
      'A new FCM message arrived in foreground!',
      JSON.stringify(remoteMessage, null, 2),
    );
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      JSON.stringify(remoteMessage, null, 2),
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage, null, 2),
        );
      }
    });
}
