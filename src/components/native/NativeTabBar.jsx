import React, { useEffect, useRef, useState } from "react";
import NotificationCenter from "../notifications/NotificationCenter";
import ThemeSelector from "../ui/ThemeSelector";

// Native student navigation is independent of the website header and dashboard
// sidebar. Only the main student hubs display the persistent tab strip.
const TABS = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "study", label: "Study", icon: "book" },
  { id: "practice", label: "Practice", icon: "practice" },
  { id: "progress", label: "Progress", icon: "progress" },
  { id: "more", label: "More", icon: "more" },
];

export function activeNativeTab(view, hash) {
  if (view === "home") return "dashboard";
  if (view !== "dashboard") return view;
  return String(hash || "").startsWith("#/dashboard/progress") ? "progress" : "dashboard";
}

function TabIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "home" && <><path d="m3 10 9-7 9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-6h5v6"/></>}
      {name === "book" && <><path d="M12 6c-2.6-1.7-5.7-2-9-1v14c3.4-1 6.4-.7 9 1"/><path d="M12 6c2.6-1.7 5.7-2 9-1v14c-3.4-1-6.4-.7-9 1"/><path d="M12 6v15"/></>}
      {name === "practice" && <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/><path d="m9 14 2 2 4-4"/></>}
      {name === "progress" && <><path d="M4 20V4"/><path d="M4 20h17"/><path d="m7 16 4-5 3 2 5-7"/></>}
      {name === "more" && <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>}
    </svg>
  );
}

const MORE_DESTINATIONS = [
  { id: "subjects", label: "My subjects", description: "Your enrolled courses", destination: "dashboard:subjects" },
  { id: "flashcards", label: "Flashcards", description: "Review what you've learned", destination: "dashboard:flashcards" },
  { id: "circles", label: "Study Circles", description: "Learn with other students", destination: "dashboard:circles" },
  { id: "bookings", label: "My bookings", description: "Manage tutoring sessions", destination: "dashboard:bookings" },
  { id: "tutors", label: "Find a tutor", description: "Browse available tutors", destination: "tutors" },
];

export default function NativeTabBar({ view, onNavigate, user, profile, onLogout, themeMode, resolvedTheme, setThemeMode }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [routeHash, setRouteHash] = useState(() => typeof window === "undefined" ? "" : window.location.hash);
  const closeRef = useRef(null);
  const moreButtonRef = useRef(null);
  const activeTab = activeNativeTab(view, routeHash);

  useEffect(() => {
    const onRouteChange = () => {
      setRouteHash(window.location.hash);
      setMoreOpen(false);
    };
    window.addEventListener("hashchange", onRouteChange);
    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("spark:routechange", onRouteChange);
    return () => {
      window.removeEventListener("hashchange", onRouteChange);
      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("spark:routechange", onRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = event => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      moreButtonRef.current?.focus({ preventScroll: true });
    };
  }, [moreOpen]);

  const chooseDestination = destination => {
    setMoreOpen(false);
    onNavigate(destination);
  };

  return (
    <>
      <nav className="spark-native-tabs" aria-label="Student navigation">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            ref={tab.id === "more" ? moreButtonRef : undefined}
            className={`spark-native-tab${(tab.id === "more" ? moreOpen : activeTab === tab.id) ? " is-active" : ""}`}
            aria-current={tab.id !== "more" && activeTab === tab.id ? "page" : undefined}
            aria-haspopup={tab.id === "more" ? "dialog" : undefined}
            aria-expanded={tab.id === "more" ? moreOpen : undefined}
            onClick={() => {
              if (tab.id === "more") setMoreOpen(open => !open);
              else if (tab.id !== activeTab || tab.id === "dashboard") chooseDestination(tab.id);
            }}
          >
            <TabIcon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {moreOpen && (
        <div className="spark-native-more-backdrop" onPointerDown={event => {
          if (event.target === event.currentTarget) setMoreOpen(false);
        }}>
          <section className="spark-native-more-sheet" role="dialog" aria-modal="true" aria-labelledby="spark-native-more-title">
            <div className="spark-native-more-handle" aria-hidden="true" />
            <div className="spark-native-more-head">
              <div>
                <h2 id="spark-native-more-title">More</h2>
                <p>{profile?.name || user?.email || "SPARK account"}</p>
              </div>
              <button type="button" className="spark-native-more-close" ref={closeRef} onClick={() => setMoreOpen(false)} aria-label="Close More menu">×</button>
            </div>

            <div className="spark-native-more-list">
              {MORE_DESTINATIONS.map(item => (
                <button type="button" className="spark-native-more-item" key={item.id} onClick={() => chooseDestination(item.destination)}>
                  <span><strong>{item.label}</strong><small>{item.description}</small></span>
                  <span aria-hidden="true">›</span>
                </button>
              ))}
              <div className="spark-native-more-row">
                <span><strong>Notifications</strong><small>Results, reminders and updates</small></span>
                <NotificationCenter user={user} profile={profile} setView={chooseDestination}/>
              </div>
              <div className="spark-native-more-row">
                <span><strong>Appearance</strong><small>{themeMode === "system" ? "Follow device setting" : resolvedTheme === "dark" ? "Dark mode" : "Light mode"}</small></span>
                <ThemeSelector value={themeMode} resolvedTheme={resolvedTheme} onChange={setThemeMode}/>
              </div>
              <button type="button" className="spark-native-more-item spark-native-more-logout" onClick={() => { setMoreOpen(false); onLogout?.(); }}>
                <span><strong>Log out</strong><small>Sign out of your SPARK account</small></span>
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
