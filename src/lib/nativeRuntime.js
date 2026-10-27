// The native bridge is injected by Capacitor when SPARK runs in a native WebView.
// Do not infer native status from the user agent; iPhone Safari remains a web app.
export function isSparkNativeApp() {
  if (typeof window === "undefined") return false;
  const bridge = window.Capacitor;
  return typeof bridge?.isNativePlatform === "function" && bridge.isNativePlatform() === true;
}
