// ============================================================================
// Done by: Odane Robinson
// Global floating "back to top" button, mounted once at the app root (see
// the bottom of App()) so it shows up on every view - home, study/lesson,
// quiz, dashboard, etc. - not just one page. It appears once the page (or a
// view's own internal content panel, marked with the "app-scroll-panel"
// class) has scrolled down a bit, and smoothly resets both back to the top
// on click, so students on long lesson or quiz pages always have a fast way
// back up without hunting for a scrollbar.
//
// It shares the bottom-right corner with per-page controls like the
// lesson's "Next topic" button, so it never simply sits on top of them:
// any element tagged data-avoid-scrolltop is checked on every scroll/resize,
// and if it's currently poking into this button's usual spot, the button
// lifts itself just clear of it instead of covering it up.
// ============================================================================
import { useState, useEffect } from "react";
import { T } from "../../theme";

function ScrollToTopButton({ raised = false }) {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [avoidBottom, setAvoidBottom] = useState(0);
  const BUTTON_SIZE = 46;
  const CLEAR_GAP = 14; // breathing room between the button and whatever it's dodging

  useEffect(() => {
    const THRESHOLD = 320;
    const check = () => {
      const windowY = window.scrollY || document.documentElement.scrollTop || 0;
      const panels = document.querySelectorAll(".app-scroll-panel");
      const panelY = panels.length
        ? Math.max(...[...panels].map(el => el.scrollTop || 0))
        : 0;
      setVisible(windowY > THRESHOLD || panelY > THRESHOLD);

      // Some views have their own bottom-right control sitting in the same
      // corner as this button - e.g. the "Next topic" button at the end of
      // a lesson. Any such element can opt in with data-avoid-scrolltop,
      // and if it's currently poking into this button's normal spot, the
      // button lifts itself just clear of it instead of covering it up.
      const baseBottom = raised ? 92 : 22;
      const defaultTop = window.innerHeight - baseBottom - BUTTON_SIZE;
      let lift = 0;
      document.querySelectorAll("[data-avoid-scrolltop]").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return; // not rendered/visible
        if (rect.bottom > defaultTop && rect.top < window.innerHeight) {
          const needed = (window.innerHeight - rect.top) + CLEAR_GAP - BUTTON_SIZE;
          if (needed > lift) lift = needed;
        }
      });
      setAvoidBottom(lift);
    };
    check();
    // capture:true so this also notices scrolling inside a view's own
    // content panel - the native 'scroll' event doesn't bubble, but a
    // capture-phase listener on window still sees it on its way down.
    window.addEventListener("scroll", check, { passive: true, capture: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check, { capture: true });
      window.removeEventListener("resize", check);
    };
  }, [raised]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelectorAll(".app-scroll-panel").forEach(el => {
      el.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const baseBottom = raised ? 92 : 22;
  const bottom = Math.max(baseBottom, avoidBottom);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position:"fixed", right:22, bottom, width:BUTTON_SIZE, height:BUTTON_SIZE,
        borderRadius:"50%", border:"1px solid rgba(255,255,255,.18)",
        background:hover ? T.navyMid : T.navyDeep, color:"#fff",
        display:"flex", alignItems:"center", justifyContent:"center", padding:0,
        cursor:"pointer", boxShadow:hover ? T.shadowLg : T.shadowMd,
        opacity:visible ? 1 : 0, transform:visible ? "translateY(0)" : "translateY(14px)",
        pointerEvents:visible ? "auto" : "none", transition:`bottom .2s ${T.ease}, opacity .25s ${T.ease}, transform .25s ${T.ease}, background .2s ${T.ease}, box-shadow .2s ${T.ease}`,
        zIndex:60,
      }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5 12 12 5 19 12"/>
      </svg>
    </button>
  );
}

export default ScrollToTopButton;
