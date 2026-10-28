import React from "react";
import "./nativeBackButton.css";

/**
 * Compact, touch-friendly chevron used at the leading edge of native pages.
 * The icon is visual only. Accessibility preserves the destination name.
 * Keep exam Exit / Submit actions explicit for safety.
 */
export default function NativeBackButton({
  onClick,
  label = "Go back",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`spark-native-back-button${className ? ` ${className}` : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      data-spark-action="nav"
    >
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14.5 5-7 7 7 7" />
      </svg>
    </button>
  );
}
