export async function registerNotifications() {
  const vapidPublicKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;

  // Request permission for notifications
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permission not granted for Notification");
    return;
  }

  // Register the service worker and subscribe to notifications
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    console.log("User is subscribed:", subscription);
  } catch (err) {
    console.log("Failed to subscribe the user: ", err);
  }
}
