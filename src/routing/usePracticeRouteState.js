import { useCallback, useEffect, useRef, useState } from "react";
import { readSparkHashRoute, subscribeSparkRoute, writeSparkNestedRoute } from "./sparkRoutingV270";

/** Persist a small navigation selection in its subject URL, never exam responses. */
export function usePracticeRouteState(subjectId, key, initialValue, options = {}) {
  const path = options.path || `/practice/${subjectId}`;
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const initialRef = useRef();
  const initializedRef = useRef(false);
  if (!initializedRef.current) {
    initialRef.current = typeof initialValue === "function" ? initialValue() : initialValue;
    initializedRef.current = true;
  }

  const read = useCallback(route => {
    if (route.path !== path || !route.params.has(key)) return initialRef.current;
    const raw = route.params.get(key);
    if (raw.length > 4000) return initialRef.current;
    try {
      if (optionsRef.current.decode) return optionsRef.current.decode(raw);
      if (typeof initialRef.current === "number") {
        const value = Number(raw);
        return Number.isFinite(value) ? value : initialRef.current;
      }
      if (typeof initialRef.current === "boolean") return raw === "true";
      return raw;
    } catch {
      return initialRef.current;
    }
  }, [path, key]);

  const [value, setValue] = useState(() => read(readSparkHashRoute()));
  const valueRef = useRef(value);
  const setRouteValue = useCallback(nextValue => {
    const next = typeof nextValue === "function" ? nextValue(valueRef.current) : nextValue;
    valueRef.current = next;
    setValue(next);

    // Embedded previews do not own the application's location.
    if (readSparkHashRoute().path !== path) return;
    const encode = optionsRef.current.encode || (item => item == null ? null : String(item));
    const encoded = encode(next);
    const defaultEncoded = encode(initialRef.current);
    writeSparkNestedRoute(path, { [key]: encoded === defaultEncoded ? null : encoded }, {
      preserve: true,
      replace: Boolean(optionsRef.current.replace),
    });
  }, [path, key]);

  useEffect(() => {
    const sync = route => {
      if (route.path !== path) return;
      const next = read(route);
      valueRef.current = next;
      setValue(next);
    };
    sync(readSparkHashRoute());
    return subscribeSparkRoute(sync);
  }, [path, read]);

  return [value, setRouteValue];
}

/** Keep a practice draft on this device; its contents never enter the URL. */
export function useSavedPracticeState(storageKey, initialValue, { decode, encode } = {}) {
  const read = () => {
    const fallback = typeof initialValue === "function" ? initialValue() : initialValue;
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (raw == null) return fallback;
      if (decode) return decode(raw, fallback);
      if (Array.isArray(fallback)) return Array.isArray(raw) ? raw : fallback;
      if (fallback && typeof fallback === "object") return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : fallback;
      return typeof raw === typeof fallback ? raw : fallback;
    } catch { return fallback; }
  };
  const [snapshot, setSnapshot] = useState(() => ({ key: storageKey, value: read() }));
  const value = snapshot.key === storageKey ? snapshot.value : read();
  useEffect(() => {
    if (snapshot.key !== storageKey) setSnapshot({ key: storageKey, value: read() });
  }, [storageKey, snapshot.key]);
  useEffect(() => {
    if (snapshot.key !== storageKey) return;
    try { localStorage.setItem(storageKey, JSON.stringify(encode ? encode(snapshot.value) : snapshot.value)); } catch { /* Storage can be unavailable. */ }
  }, [storageKey, snapshot, encode]);
  const setValue = next => setSnapshot(previous => {
    const current = previous.key === storageKey ? previous.value : read();
    return { key: storageKey, value: typeof next === "function" ? next(current) : next };
  });
  return [value, setValue];
}
