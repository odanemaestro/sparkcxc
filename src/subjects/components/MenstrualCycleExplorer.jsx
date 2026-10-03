import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useMemo, useState } from "react";
import "./menstrualCycleExplorer.css";

const PHASES = [
  {start:1,end:5,name:"Menstruation",summary:"The uterine lining breaks down and is shed with blood."},
  {start:6,end:13,name:"Lining rebuilds",summary:"Oestrogen from the developing follicle helps repair and thicken the endometrium."},
  {start:14,end:14,name:"Ovulation",summary:"A mature ovum is released from an ovary in this typical 28-day example."},
  {start:15,end:28,name:"Post-ovulation phase",summary:"Progesterone helps maintain a thick uterine lining ready for possible implantation."},
];

function phaseFor(day) {
  return PHASES.find(phase => day >= phase.start && day <= phase.end) || PHASES[0];
}

function Timeline({ day }) {
  const angle = ((day - 1) / 28) * 360 - 90;
  const radians = angle * Math.PI / 180;
  const x = 260 + Math.cos(radians) * 142;
  const y = 245 + Math.sin(radians) * 142;

  return (
    <ReviewedScienceDiagram site="MenstrualCycleExplorer.jsx:22"><svg viewBox="0 0 520 500" role="img" aria-label="Typical 28-day menstrual cycle timeline">
      <circle className="mc-ring-base" cx="260" cy="245" r="142" />
      <path className="mc-ring menstruation" d="M260 103 A142 142 0 0 1 387 182" />
      <path className="mc-ring follicular" d="M387 182 A142 142 0 0 1 260 387" />
      <path className="mc-ring luteal" d="M260 387 A142 142 0 1 1 260 103" />
      <circle className="mc-ovulation-mark" cx="260" cy="387" r="13" />
      <line className="mc-hand" x1="260" y1="245" x2={x} y2={y} />
      <circle className="mc-day-marker" cx={x} cy={y} r="17" />
      <circle className="mc-centre" cx="260" cy="245" r="72" />
      <text className="mc-centre-small" x="260" y="225" textAnchor="middle">DAY</text>
      <text className="mc-centre-day" x="260" y="270" textAnchor="middle">{day}</text>
      <text className="mc-label" x="360" y="95">Days 1-5</text>
      <text className="mc-sub-label" x="360" y="117">menstruation</text>
      <text className="mc-label" x="350" y="405">Around Day 14</text>
      <text className="mc-sub-label" x="350" y="427">ovulation in a 28-day cycle</text>
      <text className="mc-label" x="35" y="205">Days 15-28</text>
      <text className="mc-sub-label" x="35" y="227">progesterone supports lining</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Graph() {
  return (
    <ReviewedScienceDiagram site="MenstrualCycleExplorer.jsx:45"><svg viewBox="0 0 920 500" role="img" aria-label="Simplified changes in uterine lining, oestrogen and progesterone across a 28-day menstrual cycle">
      <line className="mc-axis" x1="75" y1="420" x2="870" y2="420" />
      <line className="mc-axis" x1="75" y1="65" x2="75" y2="420" />
      {[1,5,14,21,28].map(day => {
        const x = 75 + ((day-1)/27)*795;
        return (
          <g key={day}>
            <line className="mc-grid" x1={x} y1="70" x2={x} y2="420" />
            <text className="mc-axis-label" x={x} y="452" textAnchor="middle">{day}</text>
          </g>
        );
      })}
      <text className="mc-axis-title" x="470" y="485" textAnchor="middle">Day of cycle</text>

      <path className="mc-lining-area" d="M75 180 C115 220 155 330 195 352 C280 350 360 250 455 190 C565 130 690 135 775 170 C825 195 850 265 870 320 L870 420 L75 420Z" />
      <path className="mc-lining-line" d="M75 180 C115 220 155 330 195 352 C280 350 360 250 455 190 C565 130 690 135 775 170 C825 195 850 265 870 320" />

      <path className="mc-oestrogen-line" d="M75 360 C180 350 270 315 350 210 C395 145 430 115 455 135 C490 175 515 300 560 310 C625 295 670 250 715 265 C785 290 825 345 870 360" />
      <path className="mc-progesterone-line" d="M75 370 C250 370 400 368 455 355 C520 320 565 230 630 170 C680 125 735 155 775 225 C820 290 845 345 870 370" />

      <line className="mc-ovulation-line" x1="455" y1="70" x2="455" y2="420" />
      <text className="mc-ovulation-text" x="466" y="92">ovulation</text>

      <g transform="translate(610 68)">
        <line className="mc-legend-line lining" x1="0" y1="0" x2="48" y2="0" />
        <text className="mc-legend-text" x="58" y="5">uterine lining</text>
        <line className="mc-legend-line oestrogen" x1="0" y1="28" x2="48" y2="28" />
        <text className="mc-legend-text" x="58" y="33">oestrogen</text>
        <line className="mc-legend-line progesterone" x1="0" y1="56" x2="48" y2="56" />
        <text className="mc-legend-text" x="58" y="61">progesterone</text>
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

export default function MenstrualCycleExplorer() {
  const [day,setDay] = useState(1);
  const [view,setView] = useState("timeline");
  const phase = useMemo(() => phaseFor(day),[day]);

  const estimatedNextPeriod = day => {
    const ovulationDay = Math.max(1,day - 14);
    return ovulationDay;
  };

  return (
    <section className="spark-menstrual-cycle">
      <header>
        <span>MENSTRUAL CYCLE MODEL</span>
        <h3>Follow the lining, ovulation and hormones</h3>
        <p>The 28-day cycle shown here is a teaching example. Real menstrual cycles vary in length and timing.</p>
      </header>

      <div className="spark-menstrual-tabs">
        <button type="button" className={view === "timeline" ? "active" : ""} onClick={() => setView("timeline")}>Cycle timeline</button>
        <button type="button" className={view === "graph" ? "active" : ""} onClick={() => setView("graph")}>Lining and hormones</button>
      </div>

      {view === "timeline" ? (
        <div className="spark-menstrual-grid">
          <div className="spark-menstrual-stage"><Timeline day={day} /></div>
          <aside>
            <label>
              <span>Move through the cycle</span>
              <input type="range" min="1" max="28" value={day} onChange={event => setDay(Number(event.target.value))} />
            </label>
            <div className="spark-menstrual-day">
              <b>Day {day}</b>
              <strong>{phase.name}</strong>
              <p>{phase.summary}</p>
            </div>
            <div className="spark-menstrual-rule">
              <b>Estimating ovulation</b>
              <span>For a regular cycle, ovulation is often estimated at about 14 days before the next period. In a 30-day cycle, this is around Day {estimatedNextPeriod(30)}.</span>
            </div>
          </aside>
        </div>
      ) : (
        <>
          <div className="spark-menstrual-stage"><Graph /></div>
          <div className="spark-menstrual-note-grid">
            <article><b>Oestrogen</b><span>Rises during the first half of the cycle and helps rebuild the uterine lining.</span></article>
            <article><b>Progesterone</b><span>Rises after ovulation and helps maintain the thick endometrium.</span></article>
            <article><b>If pregnancy does not occur</b><span>Progesterone falls, the lining is no longer maintained and menstruation begins.</span></article>
          </div>
        </>
      )}
    </section>
  );
}
