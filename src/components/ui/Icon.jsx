// ============================================================================
// SPARK UI icon system
// Lightweight inline SVG icons used by dashboard navigation. Decorative icons
// are hidden from assistive technology because the adjacent text is the label.
// ============================================================================
import React from "react";

const paths = {
  overview: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  subjects: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  progress: <><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>,
  flashcards: <><rect x="4" y="5" width="12" height="15" rx="2" /><path d="M8 5V3h12v15h-4" /><path d="M7.5 10h5M7.5 14h3.5" /></>,
  insight: <><path d="M12 2a7 7 0 0 0-4 12.74V18h8v-3.26A7 7 0 0 0 12 2z" /><path d="M9 22h6M9 18h6M12 6v4M10 8h4" /></>,
  focus: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" /></>,
  goal: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /><path d="M16 8l5-5M17 3h4v4" /></>,
  report: <><path d="M6 2h9l4 4v16H6z" /><path d="M15 2v5h5" /><path d="M9 12h6M9 16h6M9 8h2" /></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 9h18" /><path d="M8 13h3v3H8z" /></>,
  spark: <><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
  circles: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /><path d="M14.5 14c3.6.2 6.5 2.7 6.5 6" /></>,
  // SPARK_V539L4_HOME_FEATURE_ICONS
  featureBook: <><path d="M3.5 5.5A3 3 0 0 1 6.5 4H11v16H6.5a3 3 0 0 0-3 1z" /><path d="M20.5 5.5A3 3 0 0 0 17.5 4H13v16h4.5a3 3 0 0 1 3 1z" /><path d="M12 5v15" /></>,
  featurePencil: <><path d="M4 20l4.25-1.05L19.1 8.1a2 2 0 0 0-2.83-2.83L5.42 16.12 4 20z" /><path d="M14.85 6.7l2.83 2.83" /><path d="M8.25 18.95l-2.83-2.83" /></>,
  featureVerifiedTutor: <><path d="M3 8.5L12 4l9 4.5-9 4.5z" /><path d="M7 11.5v4c0 1.8 2.2 3 5 3 1 0 1.95-.16 2.75-.48" /><path d="M19 10v4" /><path d="M15.5 18.25l1.7 1.7L21 16.1" /></>,
  featureAnalytics: <><path d="M4 20V10" /><path d="M10 20V6" /><path d="M16 20v-7" /><path d="M22 20V4" /><path d="M3 20h19" /></>,
  featureExam: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 3.5V2h6v1.5" /><path d="M8.5 9h7" /><path d="M8.5 13h4" /><path d="M8.5 17l1.5 1.5 3-3" /></>,
  featureLesson: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M8.4 14.8A7 7 0 1 1 15.6 14.8C14.6 15.55 14 16.5 14 18h-4c0-1.5-.6-2.45-1.6-3.2z" /><path d="M12 2V.5M4.9 4.9L3.8 3.8M19.1 4.9l1.1-1.1" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>, // SPARK_V539L_NOTIFICATION_BELL
  bookings: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  study: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  tutor: <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" /></>,
  students: <><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="9" r="2.5" /><path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M13.5 15c3.1.2 5.5 2.3 5.5 5" /></>,
  reviews: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  earnings: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5c0-1.4 1.1-2 2.5-2s2.5.7 2.5 2-1 1.7-2.5 2-2.5.7-2.5 2 1.1 2 2.5 2 2.5-.6 2.5-2" /></>,
  profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
};

export default function Icon({ name, size = "1em", color = "currentColor", strokeWidth = 2, className = "" }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false" style={{ flexShrink: 0, display: "block" }}>
      {content}
    </svg>
  );
}
