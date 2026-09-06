import { useCallback, useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "spark_theme_mode";
export const THEME_MODES = Object.freeze(["light", "dark"]);

function prefersDark() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function initialMode() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (THEME_MODES.includes(saved)) return saved;
  } catch {}

  // Preserve the user's current device appearance on first load, then persist
  // the first explicit Light/Dark choice made with the new two-state toggle.
  return prefersDark() ? "dark" : "light";
}

export default function useThemeMode() {
  const [themeMode, setThemeModeState] = useState(initialMode);
  const resolvedTheme = themeMode;

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
