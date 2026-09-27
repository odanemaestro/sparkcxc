import React,{useMemo,useState} from "react";
import "./earthMoonEffectsExplorer.css";

function DayNightView(){
  const [angle,setAngle]=useState(0);
  const rad=(Number(angle)||0)*Math.PI/180;
  const markerX=410+82*Math.cos(rad);
  const markerY=210+82*Math.sin(rad);
  return <div className="spark-day-night">
    <svg viewBox="0 0 820 430" role="img" aria-label="Earth rotating with one side illuminated by the Sun">
      <circle className="eme-sun" cx="105" cy="210" r="58"/>
      <path className="eme-rays" d="M175 150H300M175 180H300M175 210H300M175 240H300M175 270H300"/>
      <circle className="eme-earth-day" cx="410" cy="210" r="95"/>
      <path className="eme-earth-night" d="M410 115A95 95 0 0 1 410 305A48 95 0 0 0 410 115Z"/>
      <circle className="eme-location" cx={markerX} cy={markerY} r="9"/>
      <path className="eme-rotate" d="M520 115Q585 210 520 305"/>
      <text className="eme-label" x="105" y="300" textAnchor="middle">Sun</text>
      <text className="eme-label" x="410" y="340" textAnchor="middle">Earth rotates once in about 24 h</text>
    </svg>
    <label>Rotate Earth location<input type="range" min="0" max="360" value={angle} onChange={e=>setAngle(e.target.value)}/></label>
    <p>Only the half of Earth facing the Sun is illuminated at one time. Earth's rotation brings places into daylight and then darkness.</p>
  </div>;
}

function YearView(){
  return <div className="spark-earth-year">
    <svg viewBox="0 0 840 450" role="img" aria-label="Earth revolving around the Sun">
      <circle className="ey-sun" cx="420" cy="225" r="55"/>
      <ellipse className="ey-orbit" cx="420" cy="225" rx="285" ry="155"/>
      <circle className="ey-earth" cx="705" cy="225" r="24"/>
      <line className="ey-axis" x1="694" y1="190" x2="716" y2="260"/>
      <path className="ey-arrow" d="M420 70Q630 70 705 210"/>
      <text className="ey-label" x="420" y="305" textAnchor="middle">Sun</text>
      <text className="ey-label" x="670" y="300">365¼ days</text>
    </svg>
    <p>One revolution of Earth around the Sun takes about 365¼ days. This defines one year.</p>
  </div>;
}

function MoonPhaseView(){
  const phases=[
    ["New moon","Moon between Earth and Sun. Illuminated half faces mostly away from Earth."],
    ["First quarter","Half of the Moon's visible disc appears illuminated."],
    ["Full moon","Earth lies roughly between Sun and Moon. The illuminated half faces Earth."],
    ["Last quarter","The opposite half of the visible disc appears illuminated."]
  ];
  return <div className="spark-moon-phases">
    <svg className="spark-moon-phase-svg" viewBox="0 0 940 610" role="img" aria-label="Sun Earth and Moon geometry for new moon, first quarter, full moon and last quarter with the corresponding view from Earth">
      <defs>
        <radialGradient id="eme-sun-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffd46a" />
          <stop offset="70%" stopColor="#e8b346" />
          <stop offset="100%" stopColor="#c7861f" />
        </radialGradient>
      </defs>

      <g className="eme-phase-space">
        <text className="eme-phase-heading" x="470" y="38" textAnchor="middle">Sun–Earth–Moon geometry</text>

        <circle className="eme-phase-sun" cx="110" cy="240" r="64" />
        <g className="eme-phase-rays">
          {[155,185,215,245,275,305].map(y=><line key={y} x1="180" y1={y} x2="315" y2={y}/>)}
        </g>

        <ellipse className="eme-phase-orbit" cx="560" cy="240" rx="230" ry="150" />
        <circle className="eme-phase-earth" cx="560" cy="240" r="57" />
        <path className="eme-phase-earth-night" d="M560 183A57 57 0 0 1 560 297A30 57 0 0 0 560 183Z" />

        <g className="eme-orbit-moon new" transform="translate(350 240)">
          <circle className="eme-moon-dark" r="28" />
          <path className="eme-moon-lit-space" d="M0-28A28 28 0 0 0 0 28A14 28 0 0 1 0-28Z" />
        </g>
        <g className="eme-orbit-moon first" transform="translate(560 95)">
          <circle className="eme-moon-dark" r="28" />
          <path className="eme-moon-lit-space" d="M0-28A28 28 0 0 0 0 28A14 28 0 0 1 0-28Z" />
        </g>
        <g className="eme-orbit-moon full" transform="translate(790 240)">
          <circle className="eme-moon-dark" r="28" />
          <path className="eme-moon-lit-space" d="M0-28A28 28 0 0 0 0 28A14 28 0 0 1 0-28Z" />
        </g>
        <g className="eme-orbit-moon last" transform="translate(560 385)">
          <circle className="eme-moon-dark" r="28" />
          <path className="eme-moon-lit-space" d="M0-28A28 28 0 0 0 0 28A14 28 0 0 1 0-28Z" />
        </g>

        <text className="eme-phase-label" x="350" y="286" textAnchor="middle">new moon</text>
        <text className="eme-phase-label" x="560" y="62" textAnchor="middle">first quarter</text>
        <text className="eme-phase-label" x="790" y="286" textAnchor="middle">full moon</text>
        <text className="eme-phase-label" x="560" y="430" textAnchor="middle">last quarter</text>
        <text className="eme-phase-label sun" x="110" y="330" textAnchor="middle">Sun</text>
        <text className="eme-phase-label earth" x="560" y="246" textAnchor="middle">Earth</text>
        <text className="eme-phase-note" x="470" y="458" textAnchor="middle">The half of the Moon facing the Sun is always illuminated.</text>
      </g>

      <g className="eme-phase-earth-view" transform="translate(0 470)">
        <text className="eme-phase-heading" x="470" y="28" textAnchor="middle">View from Earth</text>

        <g transform="translate(185 88)">
          <circle className="eme-view-disc dark" r="42" />
          <text className="eme-view-label" x="0" y="66" textAnchor="middle">New moon</text>
        </g>

        <g transform="translate(375 88)">
          <circle className="eme-view-disc dark" r="42" />
          <path className="eme-view-disc lit" d="M0-42A42 42 0 0 1 0 42Z" />
          <text className="eme-view-label" x="0" y="66" textAnchor="middle">First quarter</text>
        </g>

        <g transform="translate(565 88)">
          <circle className="eme-view-disc lit full" r="42" />
          <text className="eme-view-label" x="0" y="66" textAnchor="middle">Full moon</text>
        </g>

        <g transform="translate(755 88)">
          <circle className="eme-view-disc dark" r="42" />
          <path className="eme-view-disc lit" d="M0-42A42 42 0 0 0 0 42Z" />
          <text className="eme-view-label" x="0" y="66" textAnchor="middle">Last quarter</text>
        </g>
      </g>
    </svg>

    <div className="spark-phase-cards">{phases.map(([name,text])=><article key={name}><b>{name}</b><p>{text}</p></article>)}</div>
    <strong>About 29½ days from one full moon to the next</strong>
  </div>;
}

function EclipseView(){
  const [type,setType]=useState("solar");
  const solar=type==="solar";
  return <div className="spark-eclipse-model">
    <div className="spark-eclipse-toggle"><button type="button" className={solar?"active":""} onClick={()=>setType("solar")}>Solar eclipse</button><button type="button" className={!solar?"active":""} onClick={()=>setType("lunar")}>Lunar eclipse</button></div>
    <svg viewBox="0 0 900 420" role="img" aria-label={solar?"Moon between Sun and Earth during a solar eclipse":"Earth between Sun and Moon during a lunar eclipse"}>
      <circle className="eem-sun" cx="110" cy="210" r="65"/>
      {solar?<><circle className="eem-moon" cx="430" cy="210" r="32"/><circle className="eem-earth" cx="740" cy="210" r="65"/><path className="eem-umbra" d="M462 190L675 198L675 222L462 230Z"/><path className="eem-penumbra" d="M462 178L675 150M462 242L675 270"/></>:<><circle className="eem-earth" cx="430" cy="210" r="65"/><circle className="eem-moon" cx="740" cy="210" r="32"/><path className="eem-umbra" d="M495 175L708 190L708 230L495 245Z"/><path className="eem-penumbra" d="M495 160L708 135M495 260L708 285"/></>}
      <text className="eem-label" x="110" y="315" textAnchor="middle">Sun</text>
      <text className="eem-label" x={solar?430:740} y="300" textAnchor="middle">Moon</text>
      <text className="eem-label" x={solar?740:430} y="315" textAnchor="middle">Earth</text>
    </svg>
    <p>{solar?"A solar eclipse occurs at new moon when the Moon passes between Sun and Earth. People in the Moon's umbra can see a total solar eclipse.":"A lunar eclipse occurs at full moon when Earth lies between the Sun and Moon and Earth's shadow falls on the Moon."}</p>
  </div>;
}

function ShadowView(){
  return <div className="spark-shadow-principle">
    <article><span>STRAIGHT-LINE LIGHT</span><h4>Opaque objects block rays</h4><p>A shadow forms because light travels approximately in straight lines and cannot pass through an opaque object.</p></article>
    <article><span>POINT SOURCE</span><h4>Sharper shadow</h4><p>A small light source produces a sharp umbra with little penumbra.</p></article>
    <article><span>EXTENDED SOURCE</span><h4>Softer edge</h4><p>A larger source produces a wider penumbra because different parts of the source are blocked differently.</p></article>
  </div>;
}

export default function EarthMoonEffectsExplorer(){
  const [view,setView]=useState("day");
  const summary=useMemo(()=>({
    day:"Day and night are caused by Earth's rotation on its axis.",
    year:"One Earth revolution around the Sun takes about 365¼ days.",
    moon:"Moon phases result from the changing geometry of the Sun, Earth and Moon.",
    eclipse:"Eclipses occur only when the Sun, Earth and Moon line up closely enough for one body to enter another body's shadow.",
    shadow:"Shadows form because opaque objects block light travelling in straight lines."
  })[view],[view]);
  return <section className="spark-earth-moon-effects">
    <header><span>EARTH, SUN AND MOON</span><h3>Connect rotation, revolution, Moon phases and eclipses</h3><p>Many familiar patterns in the sky result from the changing positions and motions of Earth and the Moon relative to the Sun.</p></header>
    <div className="spark-eme-tabs">{[["day","Day and night"],["year","Earth's year"],["moon","Moon phases"],["eclipse","Eclipses"],["shadow","Shadows"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-eme-stage">{view==="day"&&<DayNightView/>}{view==="year"&&<YearView/>}{view==="moon"&&<MoonPhaseView/>}{view==="eclipse"&&<EclipseView/>}{view==="shadow"&&<ShadowView/>}</div>
    <div className="spark-eme-summary"><strong>{summary}</strong><span>The Moon does not produce its own visible light. We see it because it reflects sunlight.</span></div>
  </section>;
}
