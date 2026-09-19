import React from "react";

export default function BackArrowIcon({ size = 18, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      focusable="false"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "0 0 auto" }}
    >
      <path d="M12.5 5.5 8 10l4.5 4.5M8 10h8" />
    </svg>
  );
}