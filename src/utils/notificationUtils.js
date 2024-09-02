// Function to register notifications
export async function registerNotifications() {
  const vapidPublicKey = import.meta.env.VITE_PUBLIC_VAPID_KEY;

  // Request permission for notifications
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Permission not granted for Notification");
    return null;
  }

  // Register the service worker and subscribe to notifications
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    });

    console.log("User is subscribed:", subscription);
    return subscription; // Return the subscription object
  } catch (err) {
    console.log("Failed to subscribe the user: ", err);
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
      console.log("User is unsubscribed from notifications");
    }
  } catch (err) {
    console.log("Failed to unsubscribe the user: ", err);
  }
}
