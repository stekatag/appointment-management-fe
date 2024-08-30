self.addEventListener("push", onPush);

async function onPush(event) {
  event.waitUntil(
    (async () => {
      if (event.data) {
        let data;
        try {
          // Try to parse as JSON
          data = event.data.json();
        } catch (e) {
          // If parsing fails, treat it as plain text
          data = { title: event.data.text() };
        }

        const { title, ...rest } = data;

        // Send the push data to the application
        const clients = await self.clients.matchAll();
        clients.forEach((client) => client.postMessage(data));

        await self.registration.showNotification(title, {
          ...rest,
        });
      }
    })()
  );
}
