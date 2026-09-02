/* SPARK Web Push service worker. This worker handles push only. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));

function assetUrl(fileName) {
  return new URL(fileName, self.registration.scope).toString();
}

self.addEventListener("push", event => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "" };
  }

  const title = payload.title || "SPARK";
  const options = {
    body: payload.body || "You have a new SPARK notification.",
    icon: assetUrl("logo192.png"),
    badge: assetUrl("logo192.png"),
    tag: payload.notificationId ? `spark-${payload.notificationId}` : "spark-update",
    renotify: false,
    data: {
      notificationId: payload.notificationId || null,
      url: payload.url || self.registration.scope,
      type: payload.type || "update",
    },
  };

  event.waitUntil((async () => {
    if (payload.badgeCount > 0 && self.navigator && "setAppBadge" in self.navigator) {
      try { await self.navigator.setAppBadge(payload.badgeCount); } catch {}
    }
    await self.registration.showNotification(title, options);
  })());
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || self.registration.scope;
  event.waitUntil((async () => {
    if (self.navigator && "clearAppBadge" in self.navigator) {
      try { await self.navigator.clearAppBadge(); } catch {}
    }
    const windowClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windowClients) {
      if ("navigate" in client) {
        try { await client.navigate(targetUrl); } catch {}
      }
      if ("focus" in client) return client.focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(targetUrl) : undefined;
  })());
});
