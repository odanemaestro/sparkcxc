// ============================================================================
// Done by: Odane Robinson
// One-time global CSS injection (fonts, scrollbars, hover/motion utility
// classes, the lesson/quiz/calendar styling used across many views).
// Extracted from App.js as-is; behavior is unchanged.
// ============================================================================
import { useEffect } from "react";
import { T, FD, FB } from "../../theme";

export default function GlobalStyles() {
  useEffect(() => {
    const id = "cp-gs";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Crimson+Pro:wght@400;600;700;800&display=swap');
      *{box-sizing:border-box;}
      html{scroll-behavior:smooth;}
      body{margin:0;font-family:${FB};background:${T.bg};color:${T.ink};-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
      button,input,select,textarea{font-family:${FB};}
      button{cursor:pointer;}
      a{color:inherit;}
      ::-webkit-scrollbar{width:8px;height:8px;}
      ::-webkit-scrollbar-track{background:transparent;}
      ::-webkit-scrollbar-thumb{background:${T.border};border-radius:99px;}
      ::-webkit-scrollbar-thumb:hover{background:#CBD5E1;}
      ::selection{background:${T.tealLight};color:${T.tealDark};}
      :focus-visible{outline:2px solid ${T.teal};outline-offset:2px;border-radius:4px;}

      /* ── Motion / hover system ─────────────────────────────────────── */
      .hl{transition:transform .25s ${T.ease},box-shadow .25s ${T.ease},border-color .25s ${T.ease};will-change:transform;}
      .hl:hover{transform:translateY(-4px);box-shadow:${T.shadowLg};border-color:${T.tealLight}!important;}
      .press:active{transform:scale(.97);}

      /* ── Glass nav ──────────────────────────────────────────────────── */
      .glass-nav{background:rgba(8,26,61,.82);backdrop-filter:blur(14px) saturate(150%);-webkit-backdrop-filter:blur(14px) saturate(150%);border-bottom:1px solid rgba(255,255,255,.08);}

      /* ── Decorative gradient orbs (hero backgrounds) ───────────────── */
      .orb{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;opacity:.55;}
      @keyframes floaty{0%,100%{transform:translate(0,0);}50%{transform:translate(-14px,18px);}}
      .orb-float{animation:floaty 10s ease-in-out infinite;}

      .lesson-section{border:1px solid ${T.border};border-radius:${T.rMd}px;overflow:hidden;margin-bottom:16px;transition:box-shadow .2s ${T.ease},border-color .2s ${T.ease};}
      .lesson-section:hover{box-shadow:${T.shadowSm};border-color:#D8E0EC;}
      .lesson-section-header{padding:16px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:${T.paper};transition:background .18s ${T.ease};}
      .lesson-section-header:hover{background:${T.muted};}
      .lesson-section-body{padding:20px;background:${T.paper};border-top:1px solid ${T.border};}
      .example-box{background:#F0FDF9;border-left:3px solid ${T.teal};border-radius:0 10px 10px 0;padding:16px 18px;margin:14px 0;}
      .example-question{font-weight:600;color:${T.ink};font-size:14.5px;margin-bottom:10px;line-height:1.5;}
      .solution-reveal{margin-top:10px;}
      .solution-content{background:${T.paper};border:1px solid ${T.border};border-radius:${T.rSm}px;padding:14px 16px;margin-top:8px;font-size:13.5px;color:${T.inkSoft};line-height:1.8;white-space:pre-wrap;font-family:'Courier New',monospace;}
      .key-fact{display:flex;gap:10px;margin-bottom:7px;align-items:flex-start;font-size:14px;color:${T.inkSoft};line-height:1.5;}
      .mistake-item{display:flex;gap:10px;margin-bottom:7px;align-items:flex-start;font-size:14px;color:${T.inkSoft};line-height:1.5;}
      .selfcheck{background:${T.purpleLight};border:1px solid ${T.purple};border-radius:${T.rSm}px;padding:14px 16px;margin:14px 0;}
      .quiz-option{width:100%;padding:13px 16px;border-radius:${T.rSm}px;font-size:14px;text-align:left;cursor:pointer;border:1.5px solid ${T.border};background:#fff;color:${T.inkSoft};margin-bottom:8px;transition:all .18s ${T.ease};font-family:${FB};display:block;}
      .quiz-option:hover:not(:disabled){border-color:${T.teal};background:${T.tealLight};color:${T.tealDark};transform:translateX(2px);}
      .quiz-option.correct{background:${T.emeraldLight};border-color:${T.emerald};color:${T.emerald};font-weight:600;}
      .quiz-option.wrong{background:${T.redLight};border-color:${T.red};color:${T.red};}
      .structured-answer{width:100%;min-height:140px;padding:12px 14px;border:1.5px solid ${T.border};border-radius:${T.rSm}px;font-size:14px;resize:vertical;outline:none;transition:border .18s ${T.ease},box-shadow .18s ${T.ease};line-height:1.7;}
      .structured-answer:focus{border-color:${T.teal};box-shadow:0 0 0 3px ${T.tealLight};}
      .progress-step{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid ${T.border};}
      .step-dot{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}
      @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
      .fade-in{animation:fadeIn .35s ${T.ease} both;}
      /* ── Sessions calendar ─────────────────────────────────────────── */
      .session-calendar-shell{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(280px,.8fr);gap:18px;align-items:start;}
      .session-calendar-card{background:${T.paper};border:1px solid ${T.border};border-radius:${T.rLg}px;box-shadow:${T.shadowSm};overflow:hidden;}
      .session-calendar-card.calendar-agenda{overflow:visible;}
      .session-calendar-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid ${T.border};background:linear-gradient(180deg,#fff,#fbfcfd);}
      .session-calendar-month{display:flex;align-items:center;gap:8px;min-width:0;}
      .session-calendar-month-title{font-family:${FD};font-size:21px;font-weight:700;color:${T.ink};min-width:170px;}
      .calendar-icon-btn{width:34px;height:34px;border:1px solid ${T.border};background:#fff;color:${T.ink};border-radius:9px;display:inline-flex;align-items:center;justify-content:center;font-size:16px;transition:all .18s ${T.ease};}
      .calendar-icon-btn:hover{background:${T.muted};border-color:#CBD5E1;transform:translateY(-1px);}
      .calendar-today-btn{height:34px;padding:0 12px;border:1px solid ${T.border};background:#fff;color:${T.inkSoft};border-radius:9px;font-size:12px;font-weight:700;transition:all .18s ${T.ease};}
      .calendar-today-btn:hover{border-color:${T.teal};color:${T.teal};background:${T.tealLight};}
      .calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));}
      .calendar-weekday{padding:10px 8px;font-size:10px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:${T.textMuted};background:#F8FAFC;border-bottom:1px solid ${T.border};}
      .calendar-day{min-height:118px;padding:8px;border-right:1px solid ${T.border};border-bottom:1px solid ${T.border};background:#fff;position:relative;transition:background .16s ${T.ease};}
      .calendar-day:nth-child(7n){border-right:none;}
      .calendar-day.is-outside{background:#FAFBFC;}
      .calendar-day:hover{background:#FCFEFE;}
      .calendar-day.is-today{background:linear-gradient(180deg,${T.tealLight}55,#fff 70%);}
      .calendar-day-number{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${T.inkSoft};margin-bottom:6px;}
      .calendar-day.is-today .calendar-day-number{background:${T.teal};color:#fff;box-shadow:0 3px 9px rgba(13,148,136,.25);}
      .calendar-event{width:100%;text-align:left;border:0;border-left:3px solid ${T.teal};background:#F0FDFA;color:${T.ink};border-radius:7px;padding:5px 6px;margin-bottom:5px;cursor:pointer;display:block;overflow:hidden;transition:all .16s ${T.ease};}
      .calendar-event:hover{transform:translateX(2px);box-shadow:${T.shadowSm};}
      .calendar-event.pending{border-left-color:${T.amber};background:${T.amberLight};}
      .calendar-event.completed{border-left-color:${T.teal};background:#F0FDFA;}
      .calendar-event.cancelled,.calendar-event.declined{border-left-color:${T.red};background:${T.redLight};opacity:.72;}
      .calendar-event-title{font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
      .calendar-event-time{font-size:10px;color:${T.textMuted};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px;}
      .calendar-more{font-size:10px;color:${T.teal};font-weight:700;padding:2px 4px;}
      .calendar-agenda{padding:18px;position:sticky;top:18px;}
      .calendar-agenda-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.09em;font-weight:700;color:${T.teal};margin-bottom:5px;}
      .calendar-agenda-title{font-family:${FD};font-size:20px;font-weight:700;color:${T.ink};margin-bottom:14px;}
      .calendar-agenda-empty{padding:26px 12px;text-align:center;border:1px dashed ${T.border};border-radius:12px;background:#FBFCFD;color:${T.textMuted};font-size:13px;line-height:1.55;}
      .calendar-agenda-event{border:1px solid ${T.border};border-radius:12px;padding:13px;margin-bottom:10px;background:#fff;box-shadow:${T.shadowSm};}
      .calendar-agenda-event-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:8px;}
      .calendar-agenda-event-name{font-weight:700;font-size:14px;color:${T.ink};}
      .calendar-agenda-meta{font-size:12px;color:${T.textMuted};line-height:1.55;}
      .calendar-agenda-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px;}
      .calendar-view-switch{display:inline-flex;align-items:center;padding:3px;background:${T.muted};border:1px solid ${T.border};border-radius:10px;gap:2px;}
      .calendar-view-switch button{border:0;background:transparent;color:${T.textMuted};padding:7px 11px;border-radius:8px;font-size:12px;font-weight:700;display:inline-flex;align-items:center;gap:6px;transition:all .18s ${T.ease};}
      .calendar-view-switch button.active{background:#fff;color:${T.ink};box-shadow:${T.shadowSm};}
      .calendar-view-switch button:hover:not(.active){color:${T.ink};}
      @media(max-width:900px){.session-calendar-shell{grid-template-columns:1fr;}.calendar-agenda{position:static;}.calendar-day{min-height:100px;}}
      @media(max-width:620px){.session-calendar-toolbar{align-items:flex-start;flex-wrap:wrap;}.session-calendar-month{width:100%;}.session-calendar-month-title{min-width:0;flex:1;text-align:center;font-size:19px;}.calendar-weekday{padding:8px 2px;text-align:center;font-size:9px;}.calendar-day{min-height:82px;padding:5px;}.calendar-day-number{width:24px;height:24px;font-size:11px;margin-bottom:4px;}.calendar-event{border-left-width:2px;padding:4px;margin-bottom:3px;}.calendar-event-time{display:none;}.calendar-event-title{font-size:9px;}.calendar-more{font-size:9px;}.calendar-today-btn{margin-left:auto;}.calendar-view-switch button{padding:7px 9px;}}
      @media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important;}}
      @media(max-width:700px){.lesson-layout{grid-template-columns:1fr!important;}.lesson-sidebar{display:none!important;}.dash-layout{grid-template-columns:1fr!important;}.dash-sidebar{display:none!important;}}
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}
