import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  classifyPushPlatform,
  urlBase64ToUint8Array,
} from "./pushNotifications";

describe("SPARK push notification helpers", () => {
  test("decodes a URL-safe base64 VAPID public key", () => {
    const bytes = urlBase64ToUint8Array("AQIDBA");
    expect(Array.from(bytes)).toEqual([1, 2, 3, 4]);
  });

  test("detects iOS user agents", () => {
    expect(classifyPushPlatform("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)")).toBe("ios");
  });

  test("detects Android user agents", () => {
    expect(classifyPushPlatform("Mozilla/5.0 (Linux; Android 15; Pixel 9)")).toBe("android");
  });

  test("push is opt-in by default", () => {
    expect(DEFAULT_NOTIFICATION_PREFERENCES.push_enabled).toBe(false);
  });

  test("notification categories default to enabled after opt-in", () => {
    expect(DEFAULT_NOTIFICATION_PREFERENCES.booking_updates).toBe(true);
    expect(DEFAULT_NOTIFICATION_PREFERENCES.exam_results).toBe(true);
    expect(DEFAULT_NOTIFICATION_PREFERENCES.learning_progress).toBe(true);
  });
});
