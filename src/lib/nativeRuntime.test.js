import { isSparkNativeApp } from "./nativeRuntime";

describe("SPARK native runtime detection", () => {
  const originalBridge = window.Capacitor;

  afterEach(() => {
    if (originalBridge === undefined) delete window.Capacitor;
    else window.Capacitor = originalBridge;
  });

  test("ordinary browsers remain web, even on phones", () => {
    delete window.Capacitor;
    expect(isSparkNativeApp()).toBe(false);
  });

  test("a native Capacitor bridge enables mobile mode", () => {
    window.Capacitor = { isNativePlatform: () => true, getPlatform: () => "android" };
    expect(isSparkNativeApp()).toBe(true);
  });

  test("a web Capacitor bridge does not enable native mode", () => {
    window.Capacitor = { isNativePlatform: () => false, getPlatform: () => "web" };
    expect(isSparkNativeApp()).toBe(false);
  });
});
