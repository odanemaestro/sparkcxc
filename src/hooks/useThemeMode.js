import { useCallback, useEffect, useMemo, useState } from "react";

export const THEME_STORAGE_KEY = "spark_theme_mode";
export const THEME_MODES = Object.freeze(["system", "light", "dark"]);

function initialMode() {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_MODES.includes(saved) ? saved : "system";
  } catch {
    return "system";
  }
}

function prefersDark() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function useThemeMode() {
  const [themeMode, setThemeModeState] = useState(initialMode);
  const [systemDark, setSystemDark] = useState(prefersDark);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = event => setSystemDark(event.matches);
    setSystemDark(media.matches);

    if (media.addEventListener) media.addEventListener("change", sync);
    else media.addListener(sync);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", sync);
      else media.removeListener(sync);
    };
  }, []);

  const resolvedTheme = useMemo(
    () => themeMode === "system" ? (systemDark ? "dark" : "light") : themeMode,
    [themeMode, systemDark]
  );

  const setThemeMode = useCallback(nextMode => {
    if (!THEME_MODES.includes(nextMode)) return;
    setThemeModeState(nextMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.themeMode = themeMode;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {}

    const themeColor = resolvedTheme === "dark" ? "#050D1B" : "#081A3D";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", themeColor);
  }, [themeMode, resolvedTheme]);

  return { themeMode, resolvedTheme, setThemeMode };
}
