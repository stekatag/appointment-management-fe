// Function to register notifications
export async function registerNotifications() {
  const vapidPublicKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;

  // Request permission for notifications
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return null;
  }

  // Register the service worker and subscribe to notifications
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    return subscription; // Return the subscription object
  } catch (err) {
    return null;
  }
}

// Function to unsubscribe notifications
export async function unsubscribeNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
    }
  } catch (err) {
    console.error("Failed to unsubscribe from notifications:", err);
  }
}
