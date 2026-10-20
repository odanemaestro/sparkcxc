// One shared back-to-top action, mounted at the app root. Keep its target clear
// of visible page controls, including controls inside scrolling lesson panels.
import { useState, useEffect, useRef } from "react";
import "./ScrollToTopButton.css";

const CLEAR_GAP = 14;
const EDGE_GAP = 14;
const CONTROL_SELECTOR = [
  "button", "a[href]", 'input:not([type="hidden"])', "select", "textarea", "summary",
  '[role="button"]', '[role="link"]', '[role="tab"]', '[role="checkbox"]',
  '[role="radio"]', '[role="switch"]', '[role="menuitem"]', '[role="option"]',
  '[role="combobox"]', '[role="slider"]', '[role="spinbutton"]',
  '[tabindex]:not([tabindex="-1"])', '[contenteditable="true"]', "[data-avoid-scrolltop]",
].join(",");

const intersects = (a, b, gap = 0) =>
  a.left < b.right + gap && a.right > b.left - gap &&
  a.top < b.bottom + gap && a.bottom > b.top - gap;

// Search obstacle edges rather than moving by arbitrary increments. Each upward
// step clears overlapping targets, so clearing one cannot cover the next one.
export function findScrollTopPosition({ bounds, width, height, preferred, obstacles, previous }) {
  const maxLeft = bounds.right - width;
  const maxTop = bounds.bottom - height;
  if (maxLeft < bounds.left || maxTop < bounds.top) return null;
  const origin = {
    left:Math.max(bounds.left, Math.min(preferred.left, maxLeft)),
    top:Math.max(bounds.top, Math.min(preferred.top, maxTop)),
  };
  const rectangle = p => ({...p, right:p.left + width, bottom:p.top + height});
  const isClear = p => p.left >= bounds.left && p.left <= maxLeft &&
    p.top >= bounds.top && p.top <= maxTop &&
    !obstacles.some(rect => intersects(rectangle(p), rect, CLEAR_GAP));
  if (isClear(origin)) return origin;

  const lefts = new Set([origin.left, bounds.left]);
  obstacles.forEach(rect => {
    const left = rect.left - CLEAR_GAP - width;
    if (left >= bounds.left && left <= origin.left) lefts.add(left);
  });
  const cost = p => (origin.left - p.left) * 1.5 + origin.top - p.top;
  let best = null;
  lefts.forEach(left => {
    let top = origin.top;
    // Top only decreases; each pass clears at least one obstacle edge.
    for (let step = 0; step <= obstacles.length && top >= bounds.top; step += 1) {
      const collisions = obstacles.filter(rect => intersects(rectangle({left, top}), rect, CLEAR_GAP));
      if (!collisions.length) {
        const candidate = {left, top};
        if (!best || cost(candidate) < cost(best)) best = candidate;
        break;
      }
      top = Math.min(...collisions.map(rect => rect.top - CLEAR_GAP - height));
    }
  });
  // A small dead band prevents alternating between equally good slots during
  // scrolling. Restore the preferred corner as soon as that corner is clear.
  if (best && previous && previous.left <= origin.left && previous.top <= origin.top &&
      isClear(previous) && cost(previous) <= cost(best) + 24) return previous;
  return best;
}

function visibleControlRect(element, bounds, clipCache) {
  if (element.closest('[hidden],[inert],[aria-hidden="true"]')) return null;
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height || !intersects(rect, bounds)) return null;
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden" ||
      style.visibility === "collapse" || style.opacity === "0") return null;
  const clipped = {
    left:Math.max(rect.left, bounds.left), right:Math.min(rect.right, bounds.right),
    top:Math.max(rect.top, bounds.top), bottom:Math.min(rect.bottom, bounds.bottom),
  };
  // Only reserve the part visible inside a scrolling or clipped parent.
  for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
    if (!clipCache.has(parent)) {
      const parentStyle = window.getComputedStyle(parent);
      const clipsX = /auto|scroll|hidden|clip/.test(parentStyle.overflowX || parentStyle.overflow);
      const clipsY = /auto|scroll|hidden|clip/.test(parentStyle.overflowY || parentStyle.overflow);
      clipCache.set(parent, {
        rect:clipsX || clipsY ? parent.getBoundingClientRect() : null, clipsX, clipsY,
        hidden:parentStyle.display === "none" || parentStyle.opacity === "0",
      });
    }
    const clip = clipCache.get(parent);
    if (clip.hidden) return null;
    if (clip.clipsX) {
      clipped.left = Math.max(clipped.left, clip.rect.left);
      clipped.right = Math.min(clipped.right, clip.rect.right);
    }
    if (clip.clipsY) {
      clipped.top = Math.max(clipped.top, clip.rect.top);
      clipped.bottom = Math.min(clipped.bottom, clip.rect.bottom);
    }
    if (clipped.left >= clipped.right || clipped.top >= clipped.bottom) return null;
  }
  return clipped;
}

function ScrollToTopButton({ raised = false }) {
  const buttonRef = useRef(null);
  const placementRef = useRef({lift:0, shift:0, clear:true});
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState(placementRef.current);
  const baseBottom = raised ? 92 : 22;

  useEffect(() => {
    const button = buttonRef.current;
    let frame = null;
    let refreshTargets = true;
    let targets = [];
    let panels = [];
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => schedule());
    const viewport = window.visualViewport;

    function check() {
      frame = null;
      if (refreshTargets) {
        targets = [...document.querySelectorAll(CONTROL_SELECTOR)].filter(el => el !== button && !button.contains(el));
        panels = [...document.querySelectorAll(".app-scroll-panel")];
        resizeObserver?.disconnect();
        [document.documentElement, document.body, ...targets, ...panels].forEach(el => resizeObserver?.observe(el));
        refreshTargets = false;
      }
      const windowY = window.scrollY || document.documentElement.scrollTop || 0;
      const isScrolled = windowY > 320 || panels.some(el => el.scrollTop > 320);
      setVisible(isScrolled);
      if (!isScrolled) return;

      const current = placementRef.current;
      const style = window.getComputedStyle(button);
      const width = button.offsetWidth || parseFloat(style.width) || 48;
      const height = button.offsetHeight || parseFloat(style.height) || 48;
      // Computed offsets include CSS safe-area insets and responsive gutters.
      const bottomInset = (parseFloat(style.bottom) || baseBottom + current.lift) - current.lift;
      const rightInset = (parseFloat(style.right) || (window.innerWidth <= 980 ? 14 : 22) + current.shift) - current.shift;
      const bounds = {
        left:(viewport?.offsetLeft || 0) + EDGE_GAP + (parseFloat(style.getPropertyValue("--scroll-top-safe-left")) || 0),
        top:(viewport?.offsetTop || 0) + EDGE_GAP + (parseFloat(style.getPropertyValue("--scroll-top-safe-top")) || 0),
        right:(viewport?.offsetLeft || 0) + (viewport?.width || window.innerWidth) - EDGE_GAP,
        bottom:(viewport?.offsetTop || 0) + (viewport?.height || window.innerHeight) - EDGE_GAP,
      };
      const preferred = {left:window.innerWidth - rightInset - width, top:window.innerHeight - bottomInset - height};
      const previous = {left:preferred.left - current.shift, top:preferred.top - current.lift};
      const clipCache = new Map();
      const obstacles = targets.map(el => visibleControlRect(el, bounds, clipCache)).filter(Boolean);
      const position = findScrollTopPosition({bounds, width, height, preferred, obstacles, previous});
      const next = position ? {
        lift:Math.ceil(preferred.top - position.top),
        shift:Math.ceil(preferred.left - position.left), clear:true,
      } : {...current, clear:false};
      if (next.lift !== current.lift || next.shift !== current.shift || next.clear !== current.clear) {
        placementRef.current = next;
        setPlacement(next);
      }
    }
    function schedule() {
      if (frame === null) frame = window.requestAnimationFrame(check);
    }
    const mutations = new MutationObserver(records => {
      const relevant = records.filter(record => record.target !== button && !button.contains(record.target));
      if (!relevant.length) return;
      refreshTargets ||= relevant.some(record => record.type === "childList" ||
        ["class", "role", "tabindex", "href", "contenteditable", "data-avoid-scrolltop"].includes(record.attributeName));
      schedule();
    });
    mutations.observe(document.body, {
      childList:true, subtree:true, attributes:true,
      attributeFilter:["class", "style", "hidden", "inert", "aria-hidden", "role", "tabindex", "href", "contenteditable", "data-avoid-scrolltop"],
    });
    check();
    // Native scroll does not bubble; capture also catches nested lesson panels.
    window.addEventListener("scroll", schedule, {passive:true, capture:true});
    window.addEventListener("resize", schedule);
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);
    return () => {
      window.removeEventListener("scroll", schedule, {capture:true});
      window.removeEventListener("resize", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
      mutations.disconnect();
      resizeObserver?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [baseBottom]);

  const handleClick = () => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const behavior = reduceMotion ? "auto" : "smooth";
    window.scrollTo({top:0, behavior});
    document.querySelectorAll(".app-scroll-panel").forEach(el => el.scrollTo({top:0, behavior}));
  };

  const shown = visible && placement.clear;
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`spark-scroll-top${shown ? " is-visible" : ""}`}
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      style={{
        bottom:`calc(${baseBottom + placement.lift}px + env(safe-area-inset-bottom, 0px))`,
        "--scroll-top-shift":`${placement.shift}px`,
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V6m0 0-5 5m5-5 5 5" />
      </svg>
    </button>
  );
}

export default ScrollToTopButton;
