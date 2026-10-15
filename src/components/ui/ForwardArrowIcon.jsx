import React from "react";

export default function ForwardArrowIcon({ size = 18, className = "" }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 20 20"
    focusable="false" aria-hidden="true" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: "0 0 auto" }}>
    <path d="M4 10h12m0 0-4-4m4 4-4 4" />
  </svg>;
}
