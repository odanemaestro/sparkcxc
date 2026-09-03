// ============================================================================
// SPARK responsive toast notification
// ============================================================================
import React from "react";
import "./Toast.css";
import { friendlyErrorMessage } from "../../lib/errorMessages";

const TOAST_META = {
  success: { label: "Success" },
  error: { label: "Something went wrong" },
  warning: { label: "Please check" },
  info: { label: "SPARK" },
};

function ToastIcon({ type }) {
  if (type === "success") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5 9.2 16.7 19 7" />
      </svg>
    );
  }

  if (type === "error") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7.2v6.1" />
        <path d="M12 17.2h.01" />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7.2v6.1" />
        <path d="M12 17.2h.01" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 10.8v6" />
      <path d="M12 7.2h.01" />
    </svg>
  );
}

const Toast = ({ msg, onDismiss }) => {
  if (!msg) return null;

  const rawType = typeof msg === "object" && msg?.type ? msg.type : "info";
  const type = TOAST_META[rawType] ? rawType : "info";
  const rawText = typeof msg === "string" ? msg : (msg?.message || msg);
  const text = friendlyErrorMessage(rawText);
  const title = typeof msg === "object" && msg?.title
    ? msg.title
    : TOAST_META[type].label;

  return (
    <div
      className={`spark-toast spark-toast--${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <span className="spark-toast__accent" aria-hidden="true" />

      <span className="spark-toast__icon" aria-hidden="true">
        <ToastIcon type={type} />
      </span>

      <span className="spark-toast__content">
        <span className="spark-toast__title">{title}</span>
        <span className="spark-toast__message">{text}</span>
      </span>

      {onDismiss && (
        <button
          type="button"
          className="spark-toast__close"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;
