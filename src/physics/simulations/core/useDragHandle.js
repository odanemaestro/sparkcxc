import { useCallback, useRef, useState } from 'react';

// Convert a pointer event into SVG viewBox coordinates.
export function svgPointFromEvent(svg, clientX, clientY) {
  if (!svg) return { x: 0, y: 0 };
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const p = pt.matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

const KEY_DELTAS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

// Pointer (mouse + touch + pen) and keyboard drag for one SVG handle.
// onMove receives viewBox coordinates. onKey receives (dx, dy) in "steps";
// hold Shift for larger steps. Spread `handleProps` onto the draggable element.
export function useDragHandle({ svgRef, onMove, onKey, onStart, onEnd, label, valueText, value, min, max, disabled = false }) {
  const [active, setActive] = useState(false);
  const pointerId = useRef(null);

  const onPointerDown = useCallback(e => {
    if (disabled) return;
    e.preventDefault();
    pointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setActive(true);
    onStart?.();
    onMove?.(svgPointFromEvent(svgRef.current, e.clientX, e.clientY), e);
  }, [disabled, onMove, onStart, svgRef]);

  const onPointerMove = useCallback(e => {
    if (!active || e.pointerId !== pointerId.current) return;
    e.preventDefault();
    onMove?.(svgPointFromEvent(svgRef.current, e.clientX, e.clientY), e);
  }, [active, onMove, svgRef]);

  const finish = useCallback(e => {
    if (!active) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    pointerId.current = null;
    setActive(false);
    onEnd?.();
  }, [active, onEnd]);

  const onKeyDown = useCallback(e => {
    if (disabled) return;
    const d = KEY_DELTAS[e.key];
    if (!d) return;
    e.preventDefault();
    const mult = e.shiftKey ? 5 : 1;
    onKey?.(d[0] * mult, d[1] * mult);
  }, [disabled, onKey]);

  return {
    active,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
      onKeyDown,
      tabIndex: disabled ? -1 : 0,
      role: 'slider',
      'aria-label': label,
      'aria-valuetext': valueText,
      'aria-valuenow': Number.isFinite(value) ? Math.round(value * 100) / 100 : undefined,
      'aria-valuemin': Number.isFinite(min) ? min : undefined,
      'aria-valuemax': Number.isFinite(max) ? max : undefined,
      'aria-disabled': disabled || undefined,
      className: `psim-handle${active ? ' active' : ''}`,
      style: { touchAction: 'none', cursor: disabled ? 'default' : active ? 'grabbing' : 'grab' },
    },
  };
}
