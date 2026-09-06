import "./themeSelector.css";

function ThemeGlyph({ mode }) {
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.4 15.2A8.4 8.4 0 0 1 8.8 3.6 8.7 8.7 0 1 0 20.4 15.2Z"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>
    </svg>
  );
}

export default function ThemeSelector({ resolvedTheme, onChange, variant = "menu" }) {
  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  const actionLabel = `Switch to ${nextTheme} mode`;

  return (
    <button
      type="button"
      className={`spark-theme-toggle${variant === "inline" ? " spark-theme-toggle-inline" : ""}`}
      onClick={() => onChange(nextTheme)}
      aria-label={actionLabel}
      title={actionLabel}
    >
      <ThemeGlyph mode={nextTheme}/>
    </button>
  );
}
