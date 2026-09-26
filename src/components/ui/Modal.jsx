// ============================================================================
// Done by: Odane Robinson - extracted from App.js.
// SPARK interaction pass: focus, Escape dismissal and modal motion semantics.
// ============================================================================
import { useEffect, useRef } from "react";
import { T } from "../../theme";

const Modal = ({ children, onClose, maxWidth = 500, className = "", showClose = false, closeLabel = "Close dialog" }) => {
  const cardRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    const onKeyDown = event => {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key !== "Tab" || !cardRef.current) return;

      const focusable = Array.from(cardRef.current.querySelectorAll(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      )).filter(element => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");

      if (!focusable.length) {
        event.preventDefault();
        cardRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === cardRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const frame = window.requestAnimationFrame(() => {
      if (cardRef.current && !cardRef.current.contains(document.activeElement)) {
        cardRef.current.focus({ preventScroll: true });
      }
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);

      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  return (
    <div
      className="fade-in spark-modal-backdrop"
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(8,26,61,.55)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:400,
        padding:20,
        backdropFilter:"blur(3px)"
      }}
      onClick={event => event.target === event.currentTarget && onClose?.()}
      role="presentation"
    >
      <div
        ref={cardRef}
        className={`fade-in spark-modal-card ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          background:T.paper,
          borderRadius:T.rLg,
          padding:28,
          width:"100%",
          maxWidth,
          boxShadow:T.shadowXl,
          maxHeight:"90vh",
          overflowY:"auto",
          border:`1px solid ${T.borderSoft}`
        }}
      >
        {showClose && (
          <button type="button" className="spark-modal-close" aria-label={closeLabel} onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
