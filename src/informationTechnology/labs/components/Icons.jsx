import React from "react";

function IconBase({ children, size = 18, className = "", ...props }) {
  return (
    <svg
      className={`itv2-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowLeftIcon(props) {
  return <IconBase {...props}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></IconBase>;
}

export function ArrowRightIcon(props) {
  return <IconBase {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconBase>;
}

export function ArrowUpRightIcon(props) {
  return <IconBase {...props}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></IconBase>;
}

export function ChevronUpIcon(props) {
  return <IconBase {...props}><path d="m18 15-6-6-6 6"/></IconBase>;
}

export function ChevronDownIcon(props) {
  return <IconBase {...props}><path d="m6 9 6 6 6-6"/></IconBase>;
}

export function PlayIcon(props) {
  return (
    <IconBase {...props} fill="currentColor" stroke="none">
      <path d="M8 5.5v13l10-6.5L8 5.5Z"/>
    </IconBase>
  );
}
