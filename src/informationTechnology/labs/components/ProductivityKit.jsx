import React, { useCallback, useEffect, useRef, useState } from "react";

export function ToolGroup({ label, children }) {
  return <fieldset className="itv2-tool-group"><legend>{label}</legend>{children}</fieldset>;
}

export function StatusMessage({ tone = "neutral", children }) {
  return <div className={`itv2-status-message ${tone}`} role="status" aria-live="polite">{children}</div>;
}

export function WorkspaceViewport({ label, children, className = "" }) {
  return <section className={`itv2-workspace-viewport ${className}`} aria-label={label}>{children}</section>;
}

export function useWorkspaceHistory(initialState, limit = 30) {
  const [state, setStateValue] = useState(initialState);
  const history = useRef({ past: [], future: [] });
  const setState = useCallback(next => {
    setStateValue(previous => {
      const value = typeof next === "function" ? next(previous) : next;
      if (Object.is(value, previous)) return previous;
      history.current = { past: [...history.current.past, previous].slice(-limit), future: [] };
      return value;
    });
  }, [limit]);
  const undo = useCallback(() => setStateValue(current => {
    const previous = history.current.past.at(-1);
    if (previous === undefined) return current;
    history.current = { past: history.current.past.slice(0, -1), future: [current, ...history.current.future] };
    return previous;
  }), []);
  const redo = useCallback(() => setStateValue(current => {
    const next = history.current.future[0];
    if (next === undefined) return current;
    history.current = { past: [...history.current.past, current].slice(-limit), future: history.current.future.slice(1) };
    return next;
  }), [limit]);
  return { state, setState, undo, redo, canUndo: history.current.past.length > 0, canRedo: history.current.future.length > 0 };
}

export function useTaskEvidence() {
  const [evidence, setEvidence] = useState(() => new Set());
  const record = useCallback(id => setEvidence(previous => previous.has(id) ? previous : new Set(previous).add(id)), []);
  return { evidence, record };
}

export function ReducedMotionNotice() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    const update = () => setReduced(query.matches);
    update(); query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced ? <span className="itv2-reduced-motion">Reduced motion</span> : null;
}
