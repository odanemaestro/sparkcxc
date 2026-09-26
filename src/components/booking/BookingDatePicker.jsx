import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./bookingDatePicker.css";

const pad = value => String(value).padStart(2, "0");

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateKey(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function monthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function monthCells(month) {
  const first = monthStart(month);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function monthLabel(date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function displayDate(value) {
  const date = parseDateKey(value);
  return date
    ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
    : "Choose a date";
}

export default function BookingDatePicker({ value, onChange, minDate, label = "Booking date" }) {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const todayKey = useMemo(() => dateKey(new Date()), []);
  const minimumKey = minDate || todayKey;
  const baseDate = parseDateKey(value) || parseDateKey(minimumKey) || new Date();
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => monthStart(baseDate));
  const [mobileSheet, setMobileSheet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(max-width: 600px)");
    if (!media) return undefined;
    const sync = () => setMobileSheet(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (!value) return;
    const selected = parseDateKey(value);
    if (selected) setMonth(monthStart(selected));
  }, [value]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = event => {
      if (rootRef.current?.contains(event.target) || popoverRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    const onKeyDown = event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    if (mobileSheet) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown, true);
      if (mobileSheet) document.body.style.overflow = previousOverflow;
    };
  }, [open, mobileSheet]);

  const cells = useMemo(() => monthCells(month), [month]);
  const minimumMonth = monthStart(parseDateKey(minimumKey) || new Date());
  const previousDisabled =
    month.getFullYear() === minimumMonth.getFullYear() &&
    month.getMonth() <= minimumMonth.getMonth();

  const moveMonth = delta => {
    setMonth(current => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const closeCalendar = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
  };

  const chooseDate = key => {
    if (key < minimumKey) return;
    onChange?.(key);
    closeCalendar();
  };

  const calendar = (
    <div
      ref={popoverRef}
      className="booking-date-popover"
      role="dialog"
      aria-modal={mobileSheet ? "true" : "false"}
      aria-label={label}
      onPointerDown={event => event.stopPropagation()}
    >
      {mobileSheet && (
        <div className="booking-date-sheet-top">
          <span aria-hidden="true" className="booking-date-sheet-handle" />
          <button type="button" className="booking-date-close" aria-label="Close calendar" onClick={closeCalendar}>×</button>
        </div>
      )}

      <div className="booking-date-head">
        <button
          type="button"
          className="booking-date-nav"
          aria-label="Previous month"
          disabled={previousDisabled}
          onClick={() => moveMonth(-1)}
        >
          ‹
        </button>
        <strong>{monthLabel(month)}</strong>
        <button
          type="button"
          className="booking-date-nav"
          aria-label="Next month"
          onClick={() => moveMonth(1)}
        >
          ›
        </button>
      </div>

      <div className="booking-date-weekdays" aria-hidden="true">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => <span key={day}>{day}</span>)}
      </div>

      <div className="booking-date-grid">
        {cells.map(day => {
          const key = dateKey(day);
          const outside = day.getMonth() !== month.getMonth();
          const disabled = key < minimumKey;
          const selected = key === value;
          const today = key === todayKey;

          return (
            <button
              type="button"
              key={key}
              className={[
                "booking-date-day",
                outside ? "is-outside" : "",
                selected ? "is-selected" : "",
                today ? "is-today" : "",
              ].filter(Boolean).join(" ")}
              disabled={disabled}
              aria-pressed={selected}
              aria-label={day.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })}
              onClick={() => chooseDate(key)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div className="booking-date-foot">
        <button
          type="button"
          onClick={() => {
            const safeToday = todayKey < minimumKey ? minimumKey : todayKey;
            const target = parseDateKey(safeToday);
            if (target) setMonth(monthStart(target));
            chooseDate(safeToday);
          }}
        >
          Today
        </button>
      </div>
    </div>
  );

  return (
    <div className={`booking-date-picker ${open ? "is-open" : ""}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="booking-date-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
      >
        <span className={value ? "has-value" : ""}>{displayDate(value)}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3v3M17 3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        </svg>
      </button>

      {open && mobileSheet && typeof document !== "undefined"
        ? createPortal(
            <div className="booking-date-layer" role="presentation">
              <button type="button" className="booking-date-scrim" aria-label="Close calendar" onClick={closeCalendar} />
              {calendar}
            </div>,
            document.body
          )
        : open ? calendar : null}
    </div>
  );
}
