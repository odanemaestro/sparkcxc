import { useCallback, useEffect, useRef, useState } from 'react';

// Shared "prefers-reduced-motion" hook. Simulations keep working when motion is
// reduced: the clock advances in discrete steps instead of a smooth
// requestAnimationFrame loop, so nothing depends on continuous animation.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(Boolean(query.matches));
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

// Simulation clock: play / pause / step / reset with a speed multiplier.
// `time` is simulated seconds. `duration` stops the clock automatically.
export function useSimulationClock({ duration = Infinity, initialRate = 1, loop = false } = {}) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(initialRate);
  const reducedMotion = usePrefersReducedMotion();
  const frame = useRef(null);
  const last = useRef(null);

  const advance = useCallback((t, dt) => {
    const next = t + dt;
    if (next >= duration) return loop ? next - duration : duration;
    return next;
  }, [duration, loop]);

  useEffect(() => {
    if (!playing) return undefined;
    if (reducedMotion) {
      // Discrete 0.25 s steps roughly three times a second.
      const id = setInterval(() => setTime(t => advance(t, 0.25 * rate)), 350);
      return () => clearInterval(id);
    }
    const tick = now => {
      const dt = last.current == null ? 0 : (now - last.current) / 1000;
      last.current = now;
      // Clamp long frames (tab switches) so the physics never jumps.
      setTime(t => advance(t, Math.min(dt, 0.05) * rate));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = null;
      last.current = null;
    };
  }, [playing, rate, reducedMotion, advance]);

  useEffect(() => {
    if (!loop && Number.isFinite(duration) && time >= duration) setPlaying(false);
  }, [time, duration, loop]);

  const play = useCallback(() => {
    setTime(t => (Number.isFinite(duration) && t >= duration ? 0 : t));
    setPlaying(true);
  }, [duration]);
  const pause = useCallback(() => setPlaying(false), []);
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);
  const step = useCallback((dt = 0.1) => {
    setPlaying(false);
    setTime(t => advance(t, dt));
  }, [advance]);
  const reset = useCallback(() => {
    setPlaying(false);
    setTime(0);
  }, []);

  return { time, playing, rate, setRate, play, pause, toggle, step, reset, setTime, reducedMotion };
}
