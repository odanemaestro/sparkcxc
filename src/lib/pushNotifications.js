import { supabase } from "./supabaseClient";

export const DEFAULT_NOTIFICATION_PREFERENCES = Object.freeze({
  push_enabled: false,
  show_push_previews: true,
  booking_updates: true,
  exam_results: true,
  learning_progress: true,
  family_updates: true,
  tutor_updates: true,
});

export const PUSH_PREFERENCE_KEYS = new Set(Object.keys(DEFAULT_NOTIFICATION_PREFERENCES));

export function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(char => char.charCodeAt(0)));
}

export function classifyPushPlatform(userAgent = "") {
  const ua = String(userAgent || "");
  if (/iPad|iPhone|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
  if (/Linux/i.test(ua)) return "linux";
  return "web";
}

export function classifyPushBrowser(userAgent = "") {
  const ua = String(userAgent || "");

  // Order matters because Chromium-based browsers often also contain
  // Chrome/Safari tokens in their user-agent strings.
  if (/SamsungBrowser/i.test(ua)) return "Samsung Internet";
  if (/EdgiOS|EdgA|Edg\//i.test(ua)) return "Edge";
  if (/FxiOS|Firefox/i.test(ua)) return "Firefox";
  if (/OPiOS|OPR\//i.test(ua)) return "Opera";
  if (/CriOS|Chrome|Chromium/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  return "Browser";
}

export function pushDeviceLabel(userAgent = "", maxTouchPoints = 0) {
  const ua = String(userAgent || "");
  const browser = classifyPushBrowser(ua);

  let device = "Device";
  if (/iPhone|iPod/i.test(ua)) device = "iPhone";
  else if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && Number(maxTouchPoints || 0) > 1)) device = "iPad";
  else if (/Android/i.test(ua)) device = "Android";
  else if (/Windows/i.test(ua)) device = "Windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) device = "Mac";
  else if (/Linux/i.test(ua)) device = "Linux";

  return `${browser} on ${device}`;
}

function currentPushDeviceLabel() {
  if (typeof navigator === "undefined") return "This device";
  return pushDeviceLabel(navigator.userAgent, navigator.maxTouchPoints);
}

export function isIOSDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = String(navigator.userAgent || "");
  return /iPad|iPhone|iPod/i.test(ua)
    || (/Macintosh/i.test(ua) && Number(navigator.maxTouchPoints || 0) > 1);
}

export function isStandaloneWebApp() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)")?.matches === true || navigator.standalone === true;
}

export function isPushSupported() {
  return typeof window !== "undefined"
    && "serviceWorker" in navigator
    && "PushManager" in window
    && "Notification" in window;
}

export function getPushCapability() {
  const supported = isPushSupported();
  const ios = isIOSDevice();
  const standalone = isStandaloneWebApp();
  const publicKeyConfigured = Boolean(process.env.REACT_APP_VAPID_PUBLIC_KEY);
  return {
    supported,
    ios,
    standalone,
    publicKeyConfigured,
    deviceLabel: currentPushDeviceLabel(),
    permission: supported ? Notification.permission : "unsupported",
    iosInstallRequired: ios && !standalone,
  };
}

export async function registerSparkServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return null;
  const swUrl = `${process.env.PUBLIC_URL || ""}/sw.js`;
  try {
    const registration = await navigator.serviceWorker.register(swUrl);
    return registration;
  } catch (error) {
    console.error("SPARK service worker registration failed:", error);
    return null;
  }
}

const SERVICE_WORKER_READY_TIMEOUT_MS = 5000;

async function waitForActiveRegistration(registration) {
  if (!registration) return null;
  if (registration.active) return registration;

  try {
    const ready = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise(resolve => setTimeout(() => resolve(null), SERVICE_WORKER_READY_TIMEOUT_MS)),
    ]);
    if (ready?.active) return ready;
  } catch {
    // Fall through to the registration state below.
  }

  return registration.active ? registration : null;
}

async function getRegistration({ waitForActive = false } = {}) {
  const registered = await registerSparkServiceWorker();
  if (!registered) return null;
  return waitForActive ? waitForActiveRegistration(registered) : registered;
}

function subscriptionPayload(subscription) {
  const json = subscription?.toJSON?.() || {};
  const keys = json.keys || {};
  return {
    endpoint: subscription?.endpoint || json.endpoint || "",
    p256dh: keys.p256dh || "",
    auth: keys.auth || "",
    expirationTime: subscription?.expirationTime ?? json.expirationTime ?? null,
  };
}

async function registerSubscriptionForUser(userId, subscription) {
  if (!userId || !subscription) return { ok: false, error: new Error("No push subscription is available.") };
  const data = subscriptionPayload(subscription);
  if (!data.endpoint || !data.p256dh || !data.auth) {
    return { ok: false, error: new Error("The browser returned an incomplete push subscription.") };
  }
  const { error } = await supabase.rpc("spark_register_push_subscription", {
    p_endpoint: data.endpoint,
    p_p256dh: data.p256dh,
    p_auth: data.auth,
    p_expiration_time: data.expirationTime == null ? null : Math.round(Number(data.expirationTime)),
    p_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    p_platform: typeof navigator !== "undefined" ? classifyPushPlatform(navigator.userAgent) : "web",
  });
  return error ? { ok: false, error } : { ok: true, subscription };
}

export async function getNotificationPreferences(userId) {
  if (!userId) return { ...DEFAULT_NOTIFICATION_PREFERENCES };
  const { data, error } = await supabase
    .from("notification_preferences")
    .select("push_enabled,show_push_previews,booking_updates,exam_results,learning_progress,family_updates,tutor_updates")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return { ...DEFAULT_NOTIFICATION_PREFERENCES, ...(data || {}) };
}

export async function saveNotificationPreference(userId, key, value) {
  if (!userId || !PUSH_PREFERENCE_KEYS.has(key)) throw new Error("Invalid notification preference.");
  const payload = { user_id: userId, [key]: Boolean(value), updated_at: new Date().toISOString() };
  const { error } = await supabase
    .from("notification_preferences")
    .upsert(payload, { onConflict: "user_id" });
  if (error) throw error;
  return true;
}

export async function getCurrentPushDeviceState(userId = null) {
  const capability = getPushCapability();
  if (!capability.supported) return { ...capability, subscribed: false, browserSubscribed: false, endpoint: null };
  const registration = await getRegistration();
  const subscription = registration ? await registration.pushManager.getSubscription() : null;
  const endpoint = subscription?.endpoint || null;
  let serverConnected = false;
  if (userId && endpoint) {
    const { data, error } = await supabase
      .from("push_subscriptions")
      .select("id")
      .eq("user_id", userId)
      .eq("endpoint", endpoint)
      .eq("is_active", true)
      .maybeSingle();
    if (!error) serverConnected = Boolean(data?.id);
  }
  return {
    ...getPushCapability(),
    subscribed: serverConnected,
    browserSubscribed: Boolean(subscription),
    endpoint,
  };
}

export async function enablePushForUser(userId) {
  const capability = getPushCapability();
  if (capability.iosInstallRequired) return { ok: false, code: "ios-install-required" };
  if (!capability.supported) return { ok: false, code: "unsupported" };
  if (!capability.publicKeyConfigured) return { ok: false, code: "not-configured" };

  let permission = Notification.permission;
  if (permission === "default") permission = await Notification.requestPermission();
  if (permission !== "granted") return { ok: false, code: "permission-denied", permission };

  const registration = await getRegistration({ waitForActive: true });
  if (!registration) return { ok: false, code: "service-worker-failed" };

  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY),
    });
  }

  const registered = await registerSubscriptionForUser(userId, subscription);
  if (!registered.ok) return { ok: false, code: "server-registration-failed", error: registered.error };

  try {
    await saveNotificationPreference(userId, "push_enabled", true);
  } catch (error) {
    return { ok: false, code: "preference-save-failed", error };
  }
  return { ok: true, subscription };
}

export async function detachCurrentPushAssociation() {
  if (!isPushSupported() || Notification.permission !== "granted") return { ok: true, detached: false };
  const registration = await getRegistration();
  const subscription = registration ? await registration.pushManager.getSubscription() : null;
  if (!subscription?.endpoint) return { ok: true, detached: false };
  const { error } = await supabase.rpc("spark_unregister_push_subscription", { p_endpoint: subscription.endpoint });
  return error ? { ok: false, error } : { ok: true, detached: true };
}

export async function disablePushForAccount(userId) {
  if (!userId) return { ok: false, error: new Error("A signed-in account is required.") };
  const { error } = await supabase.rpc("spark_disable_push_for_account");
  return error ? { ok: false, error } : { ok: true };
}

export async function disablePushOnThisDevice() {
  if (!isPushSupported()) return { ok: true, unsubscribed: false };
  const registration = await getRegistration();
  const subscription = registration ? await registration.pushManager.getSubscription() : null;
  if (!subscription) return { ok: true, unsubscribed: false };
  const endpoint = subscription.endpoint;
  const { error } = await supabase.rpc("spark_unregister_push_subscription", { p_endpoint: endpoint });
  if (error) return { ok: false, error };
  const unsubscribed = await subscription.unsubscribe();
  return { ok: true, unsubscribed };
}

export async function restorePushAssociation(userId) {
  if (!userId || !isPushSupported() || Notification.permission !== "granted") return { ok: true, restored: false };
  let prefs;
  try {
    prefs = await getNotificationPreferences(userId);
  } catch (error) {
    return { ok: false, error };
  }
  if (!prefs.push_enabled) return { ok: true, restored: false };
  const registration = await getRegistration();
  const subscription = registration ? await registration.pushManager.getSubscription() : null;
  if (!subscription) return { ok: true, restored: false };
  const result = await registerSubscriptionForUser(userId, subscription);
  return result.ok ? { ok: true, restored: true } : result;
}

export async function clearSparkAppBadge() {
  try {
    if (typeof navigator !== "undefined" && "clearAppBadge" in navigator) {
      await navigator.clearAppBadge();
    }
  } catch {
    // Badging is optional and should never affect the notification experience.
  }
}

export async function setSparkAppBadge(count) {
  try {
    if (typeof navigator === "undefined") return;
    if (!count && "clearAppBadge" in navigator) await navigator.clearAppBadge();
    else if (count > 0 && "setAppBadge" in navigator) await navigator.setAppBadge(count);
  } catch {
    // Badging is optional and should never affect the notification experience.
  }
}
