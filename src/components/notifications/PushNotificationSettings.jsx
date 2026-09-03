import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  disablePushForAccount,
  disablePushOnThisDevice,
  enablePushForUser,
  getCurrentPushDeviceState,
  getNotificationPreferences,
  saveNotificationPreference,
} from "../../lib/pushNotifications";

const ROLE_OPTIONS = [
  {
    key: "booking_updates",
    label: "Bookings and sessions",
    description: "Booking requests, confirmations, changes, cancellations and completed sessions.",
    roles: ["student", "parent", "tutor"],
  },
  {
    key: "exam_results",
    label: "Exam results",
    description: "Paper 1 and Paper 2 results and child exam updates.",
    roles: ["student", "parent"],
  },
  {
    key: "learning_progress",
    label: "Learning progress",
    description: "Lessons, tests, Adaptive Practice, mastery and skills needing attention.",
    roles: ["parent"],
  },
  {
    key: "family_updates",
    label: "Family connections",
    description: "Parent or guardian connection requests and status changes.",
    roles: ["student", "parent"],
  },
  {
    key: "tutor_updates",
    label: "Tutor application updates",
    description: "Changes to a tutor application or verification status.",
    roles: ["tutor"],
  },
];

function Switch({ checked, onChange, disabled, label }) {
  return (
    <button
      type="button"
      className={`push-switch ${checked ? "on" : ""}`}
      aria-pressed={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

function friendlyPushError(code) {
  switch (code) {
    case "unsupported": return "Push notifications are not supported in this browser.";
    case "not-configured": return "Phone notifications are still being configured for SPARK.";
    case "ios-install-required": return "Add SPARK to your iPhone Home Screen first, then open SPARK from the Home Screen and enable notifications here.";
    case "permission-denied": return "Notifications are blocked for SPARK. Allow notifications in your browser or device settings, then try again.";
    case "service-worker-failed": return "SPARK could not prepare phone notifications on this device. Refresh the page and try again.";
    default: return "SPARK could not enable phone notifications on this device. Please try again.";
  }
}

export default function PushNotificationSettings({ user, profile }) {
  const [prefs, setPrefs] = useState(DEFAULT_NOTIFICATION_PREFERENCES);
  const [device, setDevice] = useState({ supported: true, permission: "default", subscribed: false, ios: false, standalone: false, iosInstallRequired: false, publicKeyConfigured: true });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const role = profile?.role || "student";
  const options = useMemo(() => ROLE_OPTIONS.filter(item => item.roles.includes(role)), [role]);

  const refresh = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [saved, currentDevice] = await Promise.all([
        getNotificationPreferences(user.id),
        getCurrentPushDeviceState(user.id),
      ]);
      setPrefs(saved);
      setDevice(currentDevice);
    } catch (error) {
      console.error("Failed to load push settings:", error);
      setMessage({ type: "error", text: "SPARK could not load phone notification settings." });
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const setPreference = async (key, value) => {
    const previous = prefs[key];
    setPrefs(current => ({ ...current, [key]: value }));
    setMessage(null);
    try {
      await saveNotificationPreference(user.id, key, value);
    } catch (error) {
      console.error("Failed to save notification preference:", error);
      setPrefs(current => ({ ...current, [key]: previous }));
      setMessage({ type: "error", text: "SPARK could not save that notification preference." });
    }
  };

  const enablePush = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const result = await enablePushForUser(user.id);
      if (!result.ok) {
        setMessage({ type: "error", text: friendlyPushError(result.code) });
      } else {
        setPrefs(current => ({ ...current, push_enabled: true }));
        setMessage({ type: "success", text: "Phone notifications are enabled on this device." });
      }
    } catch (error) {
      console.error("Failed to enable phone notifications:", error);
      setMessage({ type: "error", text: "SPARK could not enable phone notifications on this device." });
    } finally {
      await refresh();
      setBusy(false);
    }
  };

  const turnOffEverywhere = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const result = await disablePushForAccount(user.id);
      if (!result.ok) throw result.error || new Error("Push account disable failed");
      setPrefs(current => ({ ...current, push_enabled: false }));
      setDevice(current => ({ ...current, subscribed: false }));
      setMessage({ type: "success", text: "Phone notifications are off for your SPARK account." });
    } catch (error) {
      console.error("Failed to disable phone notifications:", error);
      setMessage({ type: "error", text: "SPARK could not update your phone notification setting." });
    } finally {
      setBusy(false);
    }
  };

  const disableDevice = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const result = await disablePushOnThisDevice();
      if (!result.ok) throw result.error || new Error("Push device removal failed");
      setMessage({ type: "success", text: "Phone notifications are disabled on this device. Other connected devices are unchanged." });
      await refresh();
    } catch (error) {
      console.error("Failed to disable this push device:", error);
      setMessage({ type: "error", text: "SPARK could not disable phone notifications on this device." });
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="push-settings-state">Loading phone notification settings...</div>;
  }

  return (
    <div className="push-settings">
      <div className="push-settings-intro">
        <div className="push-settings-icon" aria-hidden="true">●</div>
        <div>
          <h3>Phone notifications</h3>
          <p>Receive important SPARK updates even when the website is not open.</p>
        </div>
      </div>

      {message && <div className={`push-settings-message ${message.type}`}>{message.text}</div>}

      {device.iosInstallRequired ? (
        <div className="push-settings-card ios-help">
          <strong>One step first on iPhone</strong>
          <span>Tap Share in Safari, choose Add to Home Screen, open SPARK from the new Home Screen icon, then return here and enable phone notifications.</span>
        </div>
      ) : !device.supported ? (
        <div className="push-settings-card muted">
          <strong>Not supported on this browser</strong>
          <span>Use a current version of Chrome, Edge, Firefox or Safari on a supported device.</span>
        </div>
      ) : !device.publicKeyConfigured ? (
        <div className="push-settings-card muted">
          <strong>Phone notifications are being prepared</strong>
          <span>This SPARK deployment does not have its public push key yet.</span>
        </div>
      ) : (
        <>
          <div className="push-settings-card master">
            <div>
              <strong>Allow phone notifications</strong>
              <span>Controls push alerts for your SPARK account.</span>
            </div>
            <Switch
              checked={prefs.push_enabled}
              disabled={busy}
              label="Allow phone notifications"
              onChange={value => value ? enablePush() : turnOffEverywhere()}
            />
          </div>

          {prefs.push_enabled && (
            <>
              <div className="push-device-row">
                <div>
                  <strong>{device.deviceLabel || "This device"}</strong>
                  <span>{device.subscribed ? "Connected for SPARK notifications." : "Not connected. Enable this device to receive your selected alerts here."}</span>
                </div>
                {device.subscribed ? (
                  <button type="button" className="push-device-button secondary" disabled={busy} onClick={disableDevice}>Disable this device</button>
                ) : (
                  <button type="button" className="push-device-button" disabled={busy} onClick={enablePush}>Enable this device</button>
                )}
              </div>

              <div className="push-settings-section-title">Alert types</div>
              <div className="push-preference-list">
                {options.map(option => (
                  <div className="push-preference-row" key={option.key}>
                    <div>
                      <strong>{option.label}</strong>
                      <span>{option.description}</span>
                    </div>
                    <Switch
                      checked={prefs[option.key] !== false}
                      disabled={busy}
                      label={option.label}
                      onChange={value => setPreference(option.key, value)}
                    />
                  </div>
                ))}
              </div>

              <div className="push-settings-section-title">Lock Screen privacy</div>
              <div className="push-preference-row preview-row">
                <div>
                  <strong>Show notification details</strong>
                  <span>When off, your phone shows only “You have a new notification” until you open SPARK.</span>
                </div>
                <Switch
                  checked={prefs.show_push_previews !== false}
                  disabled={busy}
                  label="Show notification details"
                  onChange={value => setPreference("show_push_previews", value)}
                />
              </div>
            </>
          )}
        </>
      )}

      <p className="push-settings-footnote">Browser and device notification controls still apply. You can change these settings at any time.</p>
    </div>
  );
}
