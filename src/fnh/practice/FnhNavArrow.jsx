import React from "react";

// Shared minimal navigation arrow for FNH study and examinations.
// Keep the icon decorative; the button text supplies the accessible name.
export default function FnhNavArrow({direction="right"}) {
  return <svg className="fnh-nav-arrow" viewBox="0 0 20 20" width="18" height="18"
    aria-hidden="true" focusable="false" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {direction==="left"
      ? <path d="M15 10H5m0 0 4-4m-4 4 4 4" />
      : <path d="M4 10h12m0 0-4-4m4 4-4 4" />}
  </svg>;
}
