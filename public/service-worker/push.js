self.addEventListener("push", onPush);

async function onPush(event) {
  if (event.data) {
    let data;
    try {
      data = event.data.json();
    } catch (e) {
      console.error("Failed to parse push data:", e);
      data = { title: "Notification", body: "You have a new notification." };
    }

    const { title, body, icon, ...rest } = data;

    await self.registration.showNotification(title, {
      body: body || "No content available.",
      icon: icon || "/default-icon.png",
      data: rest,
    });
  }
}
