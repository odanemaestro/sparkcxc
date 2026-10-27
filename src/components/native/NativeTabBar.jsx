import React from "react";

// Tab navigation is deliberately limited to the student hubs.
// Question and lesson screens stay focused and keep their existing back controls.
const TABS = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "study", label: "Study", icon: "book" },
  { id: "practice", label: "Practice", icon: "practice" },
];

function TabIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "home" && <><path d="m3 10 9-7 9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-6h5v6"/></>}
      {name === "book" && <><path d="M12 6c-2.6-1.7-5.7-2-9-1v14c3.4-1 6.4-.7 9 1"/><path d="M12 6c2.6-1.7 5.7-2 9-1v14c-3.4-1-6.4-.7-9 1"/><path d="M12 6v15"/></>}
      {name === "practice" && <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/><path d="m9 14 2 2 4-4"/></>}
    </svg>
  );
}

export default function NativeTabBar({ view, onNavigate }) {
  return (
    <nav className="spark-native-tabs" aria-label="Student navigation">
      {TABS.map(tab => (
        <button
          type="button"
          key={tab.id}
          className={`spark-native-tab${view === tab.id ? " is-active" : ""}`}
          aria-current={view === tab.id ? "page" : undefined}
          onClick={() => { if (view !== tab.id) onNavigate(tab.id); }}
        >
          <TabIcon name={tab.icon} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
