import React from "react";
import Modal from "./Modal";
import Btn from "./Btn";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  busy = false,
  destructive = false,
}) {
  if (!open) return null;

  return (
    <Modal
      onClose={() => { if (!busy) onClose?.(); }}
      className="spark-confirm-modal"
      showClose
      closeLabel="Close confirmation"
      maxWidth={470}
    >
      <div className="spark-confirm-modal__body">
        <div className={`spark-confirm-modal__icon ${destructive ? "is-destructive" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 8v5M12 17h.01M10.3 4.7 2.9 17.5A1.7 1.7 0 0 0 4.4 20h15.2a1.7 1.7 0 0 0 1.5-2.5L13.7 4.7a1.96 1.96 0 0 0-3.4 0Z"/>
          </svg>
        </div>
        <div>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      </div>
      <div className="spark-confirm-modal__actions">
        <Btn action="nav" v="outline" onClick={onClose} disabled={busy}>{cancelLabel}</Btn>
        <Btn onClick={onConfirm} disabled={busy} className={destructive ? "spark-confirm-danger" : ""}>
          {busy ? "Working…" : confirmLabel}
        </Btn>
      </div>
    </Modal>
  );
}
