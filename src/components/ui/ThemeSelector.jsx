import { useEffect, useRef, useState } from "react";
import "./themeSelector.css";

const MODES = [
  { value:"system", label:"System", description:"Match this device" },
  { value:"light", label:"Light", description:"Always use light" },
  { value:"dark", label:"Dark", description:"Always use dark" },
];

function ThemeGlyph({ mode }) {
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.4 15.2A8.4 8.4 0 0 1 8.8 3.6 8.7 8.7 0 1 0 20.4 15.2Z"/>
      </svg>
    );
  }

  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  );
}

export default function ThemeSelector({ value, resolvedTheme, onChange, variant = "menu" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const active = MODES.find(mode => mode.value === value) || MODES[0];

  useEffect(() => {
    if (!open) return undefined;

    const closeOutside = event => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) setOpen(false);
    };
    const closeEscape = event => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className="spark-theme-inline" aria-label="Appearance">
        {MODES.map(mode => (
          <button
            type="button"
            key={mode.value}
            className={value === mode.value ? "active" : ""}
            aria-pressed={value === mode.value}
            onClick={() => onChange(mode.value)}
          >
            <ThemeGlyph mode={mode.value === "system" ? resolvedTheme : mode.value}/>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="spark-theme-control" ref={wrapRef}>
      <button
        type="button"
        className="spark-theme-trigger"
        onClick={() => setOpen(current => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Appearance: ${active.label}`}
        title={`Appearance: ${active.label}`}
      >
        <ThemeGlyph mode={value === "system" ? resolvedTheme : value}/>
        <span className="spark-theme-trigger-label">{active.label}</span>
        <svg className="spark-theme-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>
      </button>

      {open && (
        <div className="spark-theme-popover fade-in" role="menu" aria-label="Choose appearance">
          <div className="spark-theme-popover-title">Appearance</div>
          {MODES.map(mode => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={value === mode.value}
              key={mode.value}
              className={value === mode.value ? "active" : ""}
              onClick={() => {
                onChange(mode.value);
                setOpen(false);
              }}
            >
              <span className="spark-theme-option-icon">
                <ThemeGlyph mode={mode.value === "system" ? resolvedTheme : mode.value}/>
              </span>
              <span className="spark-theme-option-copy">
                <strong>{mode.label}</strong>
                <small>{mode.description}</small>
              </span>
              <span className="spark-theme-check" aria-hidden="true">{value === mode.value ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
