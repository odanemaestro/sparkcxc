import React,{useMemo,useState} from "react";
import "./householdElectricalSafetyExplorer.css";

const HAZARDS=[
  ["Overloaded socket","Too many appliances can draw a large current, heating wires and insulation and increasing fire risk."],
  ["Frayed flex","Damaged insulation can expose live conductors, creating shock and fire hazards."],
  ["Wet hands","Water containing dissolved ions conducts, so wet skin can reduce resistance and increase shock risk."],
  ["Wrong fuse","A fuse rated far above normal operating current may fail to protect the cable and appliance during a fault."],
];

function ThreePinPlugDiagram(){
  return <svg className="spark-three-pin-plug-svg" viewBox="0 0 860 560" role="img" aria-label="Inside a three-pin plug showing earth, neutral and live wires, fuse, cable grip and three pins">
    <path className="ep-body" d="M170 95Q430 35 690 95L730 420Q630 505 430 510Q230 505 130 420Z"/>
    <rect className="ep-pin earth" x="398" y="18" width="64" height="145" rx="8"/>
    <rect className="ep-pin neutral" x="168" y="380" width="64" height="145" rx="8"/>
    <rect className="ep-pin live" x="628" y="380" width="64" height="145" rx="8"/>

    <path className="ep-cable" d="M430 510V430"/>
    <rect className="ep-grip" x="365" y="402" width="130" height="52" rx="12"/>
    <path className="ep-wire earth" d="M415 415Q370 350 430 160"/>
    <path className="ep-wire neutral" d="M430 420Q325 350 225 355"/>
    <path className="ep-wire live" d="M445 420Q520 362 590 330"/>
    <rect className="ep-fuse" x="575" y="270" width="58" height="125" rx="14"/>
    <line className="ep-fuse-link" x1="604" y1="290" x2="604" y2="374"/>
    <path className="ep-wire live" d="M604 270Q635 230 660 180"/>

    <circle className="ep-terminal earth" cx="430" cy="160" r="17"/>
    <circle className="ep-terminal neutral" cx="225" cy="355" r="17"/>
    <circle className="ep-terminal live" cx="660" cy="180" r="17"/>

    <g className="ep-callouts">
      <path d="M430 125L430 70"/><text x="430" y="58" textAnchor="middle">earth pin</text>
      <path d="M215 385L75 340"/><text x="62" y="342" textAnchor="end">neutral pin</text>
      <path d="M665 385L785 342"/><text x="798" y="344">live pin</text>
      <path d="M355 280L86 225"/><text x="72" y="228" textAnchor="end">green/yellow earth wire</text>
      <path d="M288 350L86 295"/><text x="72" y="298" textAnchor="end">blue neutral wire</text>
      <path d="M542 355L774 285"/><text x="788" y="288">brown live wire</text>
      <path d="M632 320L774 220"/><text x="788" y="223">fuse in live wire</text>
      <path d="M430 420L774 420"/><text x="788" y="424">cable grip</text>
    </g>
    <text className="ep-caption" x="430" y="545" textAnchor="middle">protective earth connects to the longest upper pin, live passes through the fuse</text>
  </svg>;
}

function PlugView(){
  return <div className="spark-safety-plug">
    <ThreePinPlugDiagram/>
    <div className="spark-safety-wire-card live"><span>BROWN</span><b>Live</b><p>Carries the alternating supply to the appliance. The fuse is placed in this wire.</p></div>
    <div className="spark-safety-wire-card neutral"><span>BLUE</span><b>Neutral</b><p>Completes the normal circuit back to the supply.</p></div>
    <div className="spark-safety-wire-card earth"><span>GREEN / YELLOW</span><b>Earth</b><p>Provides a low-resistance path for fault current if a metal case becomes live.</p></div>
    <div className="spark-safety-plug-note"><strong>Why the fuse is in the live wire</strong><p>If excessive current melts the fuse, the live connection is broken so the appliance is disconnected from the dangerous supply potential.</p></div>
  </div>;
}

function FuseView(){
  const [power,setPower]=useState(690);
  const [voltage,setVoltage]=useState(230);
  const ratings=[1,3,5,13,30];
  const current=(Number(power)||0)/Math.max(1,Number(voltage)||1);
  const suitable=ratings.find(r=>r>current) || ratings[ratings.length-1];
  return <div className="spark-fuse-selector">
    <article>
      <span>APPLIANCE CURRENT</span>
      <label>Power, W<input type="number" value={power} onChange={e=>setPower(e.target.value)}/></label>
      <label>Supply voltage, V<input type="number" value={voltage} onChange={e=>setVoltage(e.target.value)}/></label>
      <strong>I = P ÷ V = {Math.round(current*100)/100} A</strong>
    </article>
    <article>
      <span>FUSE CHOICE</span>
      <h4>Choose the smallest standard rating above normal current</h4>
      <div className="spark-fuse-ratings">{ratings.map(r=><b key={r} className={r===suitable?"selected":""}>{r} A</b>)}</div>
      <p>For {power} W at {voltage} V, the normal current is about {Math.round(current*100)/100} A, so the practice choice is {suitable} A.</p>
    </article>
  </div>;
}

function ProtectionView(){
  return <div className="spark-safety-protection">
    <svg className="spark-protection-device-svg" viewBox="0 0 1040 600" role="img" aria-label="Electrical safety fault path showing live fault to a metal appliance case earth wire fuse and circuit breaker protection">
      <defs>
        <marker id="es-fault-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="es-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <text className="es-title" x="55" y="55">supply</text>
      <path className="es-live-line" d="M70 105H365"/>
      <path className="es-neutral-line" d="M70 175H365"/>
      <path className="es-earth-line" d="M70 245H365"/>

      <rect className="es-fuse-body" x="165" y="78" width="100" height="54" rx="12"/>
      <path className="es-fuse-link" d="M182 105Q205 87 228 105T250 105"/>
      <text className="es-small" x="215" y="64" textAnchor="middle">fuse in live conductor</text>

      <g className="es-appliance">
        <rect className="es-case" x="365" y="80" width="305" height="275" rx="30"/>
        <circle className="es-motor" cx="520" cy="205" r="68"/>
        <path className="es-motor-coil" d="M475 205Q500 155 525 205Q550 255 575 205"/>
        <path className="es-live-internal" d="M365 105H455Q500 105 500 145"/>
        <path className="es-neutral-internal" d="M365 175H455Q500 175 500 155"/>
        <path className="es-earth-bond" d="M365 245H405V315H625"/>
        <circle className="es-earth-terminal" cx="625" cy="315" r="10"/>
        <path className="es-fault" d="M500 145Q570 120 625 172V305" markerEnd="url(#es-fault-arrow)"/>
        <text className="es-label" x="520" y="380" textAnchor="middle">metal appliance case</text>
        <text className="es-small fault" x="600" y="130">insulation fault</text>
      </g>

      <path className="es-fault-current" d="M625 315Q735 360 790 450" markerEnd="url(#es-fault-arrow)"/>
      <text className="es-label" x="748" y="360">large fault current</text>
      <text className="es-small" x="744" y="385">low-resistance earth path</text>

      <g className="es-ground" transform="translate(790 442)">
        <path d="M0 0V55"/>
        <path d="M-45 55H45M-30 70H30M-16 85H16"/>
        <text className="es-label" x="0" y="120" textAnchor="middle">earth</text>
      </g>

      <g className="es-breaker-panel" transform="translate(735 75)">
        <rect className="es-device-card" x="0" y="0" width="245" height="205" rx="18"/>
        <text className="es-title" x="122" y="34" textAnchor="middle">circuit breaker</text>
        <circle className="es-breaker-contact" cx="72" cy="105" r="8"/>
        <circle className="es-breaker-contact" cx="170" cy="105" r="8"/>
        <path className="es-breaker-arm" d="M80 100L150 62"/>
        <path className="es-magnetic-trip" d="M112 130Q122 112 132 130Q142 148 152 130"/>
        <path className="es-trip-arrow" d="M132 155V118" markerEnd="url(#es-fault-arrow)"/>
        <text className="es-small" x="122" y="185" textAnchor="middle">excess current trips contacts open</text>
      </g>

      <g className="es-fuse-panel" transform="translate(40 365)">
        <rect className="es-device-card" x="0" y="0" width="360" height="165" rx="18"/>
        <text className="es-title" x="180" y="34" textAnchor="middle">fuse action</text>
        <path className="es-live-line" d="M40 90H125M235 90H320"/>
        <rect className="es-fuse-body" x="120" y="63" width="120" height="54" rx="12"/>
        <path className="es-fuse-link broken" d="M137 90L170 90M190 78L210 102M215 90L228 90"/>
        <text className="es-small" x="180" y="145" textAnchor="middle">fuse link melts and opens the live circuit</text>
      </g>

      <g className="es-sequence" transform="translate(430 455)">
        <text className="es-title" x="0" y="0">fault protection sequence</text>
        <text className="es-small" x="0" y="32">1. live conductor touches metal case</text>
        <text className="es-small" x="0" y="58">2. earth conductor carries a large fault current</text>
        <text className="es-small" x="0" y="84">3. fuse melts or breaker trips</text>
        <text className="es-small" x="0" y="110">4. dangerous live supply is disconnected</text>
      </g>
    </svg>
    <article><span>FUSE</span><h4>Melts when current exceeds its rating</h4><p>The fuse wire heats and melts, breaking the live connection. A blown fuse must be replaced with the correct rating.</p></article>
    <article><span>CIRCUIT BREAKER</span><h4>Trips and opens the circuit</h4><p>Many household circuits use breakers because they disconnect on excessive current and can be reset after the fault is corrected.</p></article>
    <article><span>EARTHING</span><h4>Protects exposed metal cases</h4><p>If a fault connects live wiring to the case, the earth conductor provides a low-resistance fault path so a protective device disconnects the circuit.</p></article>
  </div>;
}

function HazardView(){
  return <div className="spark-safety-hazards">{HAZARDS.map(([name,text],i)=><article key={name}><span>{i+1}</span><div><b>{name}</b><p>{text}</p></div></article>)}</div>;
}

function CableView(){
  return <div className="spark-safety-cable">
    <article className="thin"><span>THIN CONDUCTOR</span><div className="spark-cable-line"></div><h4>Higher resistance for the same material and length</h4><p>Large current causes greater heating, so a thin cable may overheat in a heavy-duty circuit.</p></article>
    <article className="thick"><span>THICK CONDUCTOR</span><div className="spark-cable-line"></div><h4>Lower resistance</h4><p>Heavy-duty appliances and power cables use appropriately sized conductors so large currents produce less resistive heating.</p></article>
  </div>;
}

export default function HouseholdElectricalSafetyExplorer(){
  const [view,setView]=useState("plug");
  const summary=useMemo(()=>({
    plug:"Correct plug wiring places live through the fuse, neutral on blue and protective earth on green/yellow.",
    fuse:"Fuse selection starts by calculating normal operating current using I = P ÷ V.",
    protection:"Fuses, breakers and earthing reduce risk by disconnecting fault currents.",
    hazards:"Electrical accidents often begin with damaged insulation, overloads, water or incorrect protection.",
    cable:"Conductor thickness matters because lower resistance reduces heating at large current.",
  })[view],[view]);

  return <section className="spark-household-safety">
    <header><span>ELECTRICAL SAFETY</span><h3>Connect plug wiring, protection devices and safe cable design</h3><p>Electrical safety depends on keeping live conductors enclosed, limiting excessive current and providing a safe fault path when metal parts become energised.</p></header>
    <div className="spark-safety-tabs">{[["plug","Three-pin plug"],["fuse","Fuse selector"],["protection","Protection devices"],["hazards","Hazards"],["cable","Cable thickness"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-safety-stage">
      {view==="plug"&&<PlugView/>}
      {view==="fuse"&&<FuseView/>}
      {view==="protection"&&<ProtectionView/>}
      {view==="hazards"&&<HazardView/>}
      {view==="cable"&&<CableView/>}
    </div>
    <div className="spark-safety-summary"><strong>{summary}</strong><span>Never defeat a fuse or circuit breaker with a higher rating simply to stop nuisance trips. The fault or overload must be corrected.</span></div>
  </section>;
}

export { HAZARDS };
