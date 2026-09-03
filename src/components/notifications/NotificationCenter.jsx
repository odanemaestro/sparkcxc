import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { setSparkAppBadge } from "../../lib/pushNotifications";
import messageIcon from "../../assets/icons/notification-message.png";
import "./notificationCenter.css";
import { getNotificationRoute } from "./notificationRouting";
import PushNotificationSettings from "./PushNotificationSettings";

const TYPE_META = {
  booking_created: { icon: "📅", tone: "teal", label: "Booking request" },
  booking_confirmed: { icon: "✓", tone: "green", label: "Booking confirmed" },
  booking_declined: { icon: "×", tone: "red", label: "Booking declined" },
  booking_cancelled: { icon: "×", tone: "red", label: "Booking cancelled" },
  booking_cancelled_by_tutor: { icon: "×", tone: "red", label: "Booking cancelled" },
  booking_rescheduled: { icon: "↻", tone: "amber", label: "Session changed" },
  booking_confirmation_reminder: { icon: "!", tone: "amber", label: "Confirmation needed" },
  booking_not_confirmed: { icon: "×", tone: "red", label: "Session not confirmed" },
  child_booking_not_confirmed: { icon: "!", tone: "purple", label: "Tutoring update" },
  session_completed: { icon: "✓", tone: "green", label: "Session completed" },
  session_reminder: { icon: "⏱", tone: "amber", label: "Session reminder" },
  paper1_completed: { icon: "P1", tone: "navy", label: "Paper 1 completed" },
  paper2_completed: { icon: "P2", tone: "navy", label: "Paper 2 completed" },
  child_paper1_completed: { icon: "P1", tone: "purple", label: "Child progress" },
  child_paper2_completed: { icon: "P2", tone: "purple", label: "Child progress" },
  child_lesson_completed: { icon: "L", tone: "green", label: "Lesson completed" },
  child_topic_quiz_completed: { icon: "Q", tone: "navy", label: "Topic test" },
  child_adaptive_session_completed: { icon: "A", tone: "teal", label: "Adaptive Practice" },
  child_section_completed: { icon: "S", tone: "green", label: "Section completed" },
  child_section_test_completed: { icon: "T", tone: "navy", label: "Section test" },
  child_course_completed: { icon: "✓", tone: "green", label: "Course completed" },
  child_mastery_milestone: { icon: "★", tone: "purple", label: "Mastery milestone" },
  child_weak_skill_alert: { icon: "!", tone: "amber", label: "Needs attention" },
  child_skill_improved: { icon: "↑", tone: "teal", label: "Skill improving" },
  tutor_application_update: { icon: "🎓", tone: "teal", label: "Tutor application" },
  family_link_request: { icon: "👪", tone: "purple", label: "Family request" },
  family_link_update: { icon: "👪", tone: "purple", label: "Family connection" },
};

const NOTIFICATION_SELECT = "id,recipient_user_id,tutor_id,student_id,booking_id,type,title,message,action_view,action_label,metadata,read_at,created_at";

function relativeTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return "Just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric", year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined });
}

function actionLabel(notification) {
  if (notification?.action_label) return notification.action_label;
  if (notification?.booking_id) return "View booking";
  if (String(notification?.type || "").includes("paper")) return "View progress";
  if (String(notification?.type || "").includes("tutor_application")) return "View application";
  if (String(notification?.type || "").includes("family")) return "View dashboard";
  return null;
}

function fallbackTitle(notification) {
  const meta = TYPE_META[notification?.type];
  return notification?.title || meta?.label || "SPARK update";
}

function initialPushNotificationId() {
  if (typeof window === "undefined") return null;
  try { return new URL(window.location.href).searchParams.get("spark_notification"); }
  catch { return null; }
}

function removePushNotificationIdFromUrl() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("spark_notification");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // A clean URL is helpful but not required for notification routing.
  }
}

export default function NotificationCenter({ user, profile, setView }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(true);
  const [pendingPushId, setPendingPushId] = useState(initialPushNotificationId);
  const mounted = useRef(true);
  const handledPushIds = useRef(new Set());

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select(NOTIFICATION_SELECT)
      .eq("recipient_user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(60);
    if (!mounted.current) return;
    if (error) {
      console.error("Failed to load notifications:", error);
      setAvailable(false);
      setItems([]);
    } else {
      setAvailable(true);
      setItems(data || []);
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => { mounted.current = false; };
  }, [load]);

  useEffect(() => {
    if (!user?.id) return undefined;
    const channel = supabase
      .channel(`notification-centre-${user.id}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `recipient_user_id=eq.${user.id}`,
      }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, load]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return undefined;
    const onMessage = event => {
      if (event.data?.type === "SPARK_PUSH_OPEN" && event.data.notificationId) {
        setPendingPushId(String(event.data.notificationId));
      }
    };
    navigator.serviceWorker.addEventListener("message", onMessage);
    return () => navigator.serviceWorker.removeEventListener("message", onMessage);
  }, []);

  const unreadCount = useMemo(() => items.filter(item => !item.read_at).length, [items]);
  const visibleItems = useMemo(
    () => filter === "unread" ? items.filter(item => !item.read_at) : items,
    [items, filter]
  );

  useEffect(() => { setSparkAppBadge(unreadCount); }, [unreadCount]);

  const markRead = useCallback(async (notification) => {
    if (!notification || notification.read_at) return;
    const readAt = new Date().toISOString();
    setItems(prev => prev.map(item => item.id === notification.id ? { ...item, read_at: readAt } : item));
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: readAt })
      .eq("id", notification.id)
      .eq("recipient_user_id", user.id);
    if (error) load();
  }, [load, user?.id]);

  const markAllRead = async () => {
    if (!unreadCount) return;
    const readAt = new Date().toISOString();
    setItems(prev => prev.map(item => item.read_at ? item : { ...item, read_at: readAt }));
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: readAt })
      .eq("recipient_user_id", user.id)
      .is("read_at", null);
    if (error) load();
  };

  const openNotification = useCallback(async (notification) => {
    await markRead(notification);

    const role = profile?.role || null;
    const route = getNotificationRoute(notification, role, user?.id);
    let target = route.dashboardTarget ? { ...route.dashboardTarget } : null;

    if (target?.scope === "parent" && target.bookingId && !target.studentId) {
      const { data } = await supabase
        .from("bookings")
        .select("student_id")
        .eq("id", target.bookingId)
        .maybeSingle();
      if (data?.student_id) target.studentId = data.student_id;
    }

    if (target) {
      try {
        sessionStorage.setItem("spark_dashboard_notification_target", JSON.stringify(target));
      } catch {
        // Navigation still works if browser storage is unavailable.
      }
      window.dispatchEvent(new CustomEvent("spark:dashboard-notification-target", { detail: target }));
    }

    if (route.view && setView) setView(route.view);
    setOpen(false);
  }, [markRead, profile?.role, setView, user?.id]);

  useEffect(() => {
    if (!pendingPushId || !user?.id || loading || handledPushIds.current.has(pendingPushId)) return undefined;
    let cancelled = false;
    const handle = async () => {
      let notification = items.find(item => String(item.id) === String(pendingPushId));
      if (!notification) {
        const { data, error } = await supabase
          .from("notifications")
          .select(NOTIFICATION_SELECT)
          .eq("id", pendingPushId)
          .eq("recipient_user_id", user.id)
          .maybeSingle();
        if (!error) notification = data;
      }
      if (cancelled) return;
      handledPushIds.current.add(pendingPushId);
      removePushNotificationIdFromUrl();
      setPendingPushId(null);
      if (notification) await openNotification(notification);
    };
    handle();
    return () => { cancelled = true; };
  }, [items, loading, openNotification, pendingPushId, user?.id]);

  if (!user?.id) return null;

  return (
    <>
      <button
        type="button"
        className="notification-trigger"
        aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
        aria-expanded={open}
        onClick={() => { setOpen(true); setFilter("all"); load(); }}
      >
        <span className="notification-trigger-icon"><img src={messageIcon} alt="" /></span>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>}
      </button>

      {open && (
        <div className="notification-layer" role="presentation">
          <button className="notification-scrim" aria-label="Close notifications" onClick={() => setOpen(false)} />
          <aside className="notification-drawer" role="dialog" aria-modal="true" aria-label="Notifications">
            <div className="notification-head">
              <div>
                <div className="notification-kicker">SPARK</div>
                <h2>{filter === "settings" ? "Notification settings" : "Notifications"}</h2>
              </div>
              <button className="notification-close" onClick={() => setOpen(false)} aria-label="Close notifications">×</button>
            </div>

            <div className="notification-toolbar">
              <div className="notification-tabs" role="tablist" aria-label="Notification views">
                <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
                <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>Unread{unreadCount ? ` (${unreadCount})` : ""}</button>
                <button className={filter === "settings" ? "active" : ""} onClick={() => setFilter("settings")}>Settings</button>
              </div>
              {filter !== "settings" && <button className="notification-mark-all" onClick={markAllRead} disabled={!unreadCount}>Mark all as read</button>}
            </div>

            {filter === "settings" ? (
              <div className="notification-list notification-settings-list">
                <PushNotificationSettings user={user} profile={profile} />
              </div>
            ) : (
              <div className="notification-list">
                {loading && items.length === 0 ? (
                  <div className="notification-empty"><div className="notification-empty-icon">•••</div><strong>Loading updates</strong></div>
                ) : !available ? (
                  <div className="notification-empty">
                    <div className="notification-empty-icon">i</div>
                    <strong>Notification Centre setup is required</strong>
                    <span>Apply the latest Supabase migration, then reopen this panel.</span>
                  </div>
                ) : visibleItems.length === 0 ? (
                  <div className="notification-empty">
                    <div className="notification-empty-icon">✓</div>
                    <strong>{filter === "unread" ? "You're all caught up" : "No notifications yet"}</strong>
                    <span>Booking, session and progress updates will appear here.</span>
                  </div>
                ) : visibleItems.map(notification => {
                  const meta = TYPE_META[notification.type] || { icon: "i", tone: "navy" };
                  const label = actionLabel(notification);
                  return (
                    <article
                      key={notification.id}
                      className={`notification-item ${notification.read_at ? "" : "unread"}`}
                      onClick={() => openNotification(notification)}
                    >
                      <div className={`notification-type-icon ${meta.tone}`}>{meta.icon}</div>
                      <div className="notification-copy">
                        <div className="notification-title-row">
                          <strong>{fallbackTitle(notification)}</strong>
                          {!notification.read_at && <span className="notification-unread-dot" aria-label="Unread" />}
                        </div>
                        <p>{notification.message}</p>
                        <div className="notification-meta-row">
                          <time dateTime={notification.created_at}>{relativeTime(notification.created_at)}</time>
                          {label && <span className="notification-action-label">{label} →</span>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export { relativeTime };
