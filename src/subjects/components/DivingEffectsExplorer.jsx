import React,{useMemo,useState} from "react";
import "./divingEffectsExplorer.css";

function PressureView(){
  const [depth,setDepth]=useState(10);
  const d=Math.max(0,Number(depth)||0);
  const ata=1+d/10;
  return <div className="spark-diving-pressure">
    <label>Depth, m<input type="range" min="0" max="40" step="1" value={depth} onChange={e=>setDepth(e.target.value)}/></label>
    <strong>Approximate ambient pressure: {ata.toFixed(1)} atmospheres absolute</strong>
    <div className="spark-diver-column"><div className="spark-diver" style={{top:(10+d*1.6)+"%"}}>diver</div></div>
    <p>Water pressure increases with depth because the weight of water above the diver increases. A useful CSEC approximation is about one additional atmosphere for every 10 m of seawater.</p>
  </div>;
}

function DCSView(){
  return <div className="spark-diving-dcs">
    <div className="spark-diving-flow">
      {["greater pressure at depth","more inert nitrogen dissolves in tissues","rapid pressure reduction","gas bubbles may form","decompression sickness"].map((x,i)=><React.Fragment key={x}><article>{x}</article>{i<4&&<span>→</span>}</React.Fragment>)}
    </div>
    <p>Controlled ascent allows dissolved inert gas to leave tissues more gradually. Divers follow approved dive tables or computers and required decompression procedures rather than using a single fixed rule for every dive.</p>
  </div>;
}

function EarView(){
  const [equalized,setEqualized]=useState(false);
  return <div className="spark-diving-ear">
    <div className="spark-diving-toggle"><button type="button" className={!equalized?"active":""} onClick={()=>setEqualized(false)}>Pressure not equalised</button><button type="button" className={equalized?"active":""} onClick={()=>setEqualized(true)}>Pressure equalised</button></div>

    <svg className="spark-diving-ear-svg" viewBox="0 0 920 500" role="img" aria-label={equalized
      ? "Ear cross-section with equal pressure on both sides of the eardrum and an open Eustachian tube"
      : "Ear cross-section with greater external water pressure bending the eardrum inward while middle-ear pressure is lower"}>
      <defs>
        <linearGradient id="de-water" x1="0" x2="1">
          <stop offset="0%" stopColor="#78b9d3"/>
          <stop offset="100%" stopColor="#b6dbe8"/>
        </linearGradient>
      </defs>

      <rect className="de-water-field" x="20" y="30" width="250" height="400" rx="20"/>

      <path className="de-pinna" d="M300 90Q222 72 190 145Q160 210 200 285Q238 350 292 330Q342 312 330 270Q321 240 289 244Q259 248 260 275Q264 300 287 290" />
      <path className="de-ear-canal" d="M287 291Q360 280 420 270" />

      <path className={equalized?"de-eardrum equal":"de-eardrum unequal"} d={equalized
        ? "M430 205Q446 255 430 320"
        : "M430 205Q465 252 445 320"} />

      <path className="de-middle-ear" d="M448 212Q525 200 594 232L594 315Q520 330 450 315Z" />
      <g className="de-ossicles">
        <path className="de-malleus" d="M470 235Q485 247 486 270L498 284" />
        <path className="de-incus" d="M498 284Q516 272 530 281L542 270" />
        <path className="de-stapes" d="M542 270l18-9l12 17l-18 11Z" />
      </g>

      <path className={equalized?"de-eustachian open":"de-eustachian"} d="M540 310Q576 352 638 408" />
      <path className="de-throat" d="M638 408Q676 430 705 400" />

      <g className="de-external-pressure">
        <path d="M70 170H165M70 230H165M70 290H165"/>
        <text x="118" y="142" textAnchor="middle">water pressure</text>
      </g>

      <g className={equalized?"de-middle-pressure equal":"de-middle-pressure low"}>
        <path d="M570 248H480M570 292H480"/>
        <text x="525" y="205" textAnchor="middle">{equalized?"middle-ear pressure equal":"lower middle-ear pressure"}</text>
      </g>

      {!equalized&&<>
        <path className="de-drum-force" d="M390 262H440"/>
        <text className="de-warning" x="345" y="350">pressure difference bends eardrum inward</text>
      </>}

      {equalized&&<>
        <path className="de-equalise-arrow" d="M690 420Q632 385 579 340"/>
        <text className="de-equalise-label" x="707" y="453" textAnchor="end">air moves through Eustachian tube</text>
      </>}

      <g className="de-labels">
        <text x="130" y="470">external ear / water</text>
        <text x="344" y="245">ear canal</text>
        <text x="430" y="190" textAnchor="middle">eardrum</text>
        <text x="526" y="350" textAnchor="middle">middle ear</text>
        <text x="650" y="350">Eustachian tube</text>
      </g>
    </svg>

    <div className="spark-diving-ear-facts">
      <article><b>Descent</b><span>External water pressure rises with depth. If middle-ear pressure does not increase, the eardrum is pushed inward.</span></article>
      <article><b>Equalisation</b><span>The Eustachian tube connects the middle ear to the throat and allows pressure to be balanced.</span></article>
      <article><b>Barotrauma risk</b><span>A large pressure difference can cause pain and tissue injury. Divers equalise early and gently during descent.</span></article>
    </div>

    <p>{equalized?"Equalising pressure reduces the pressure difference across the eardrum.":"If pressure outside the eardrum rises faster than pressure in the middle ear, pain and barotrauma can occur."}</p>
  </div>;
}

function BreathView(){
  return <div className="spark-diving-breath">
    <article><span>DO NOT HOLD BREATH ON ASCENT</span><h4>Expanding gas can injure lungs</h4><p>As ambient pressure falls during ascent, gas in the lungs expands. Holding the breath can contribute to pulmonary barotrauma and arterial gas embolism.</p></article>
    <article><span>ARTERIAL GAS EMBOLISM</span><h4>Gas bubble blocks blood flow</h4><p>A gas bubble entering the arterial circulation can obstruct blood flow and cause a serious emergency.</p></article>
  </div>;
}

function NarcosisView(){
  return <div className="spark-diving-narcosis">
    <article><span>NITROGEN NARCOSIS</span><h4>Confusion and poor judgement</h4><p>At greater depth, increased nitrogen partial pressure can impair judgement, coordination and thinking.</p></article>
    <article><span>FREE-DIVING BLACKOUT</span><h4>Low oxygen risk</h4><p>Breath-hold divers can lose consciousness if oxygen falls too low, including near the surface during ascent.</p></article>
    <article><span>WEIGHT BELT</span><h4>Counteracts buoyancy</h4><p>Scuba divers may use weights to offset buoyancy from the body, suit and equipment so descent and neutral buoyancy are easier to control.</p></article>
  </div>;
}

function TreatmentView(){
  return <div className="spark-diving-treatment">
    <article><span>HYPERBARIC OXYGEN</span><h4>Standard treatment for serious decompression illness</h4><p>A recompression or hyperbaric chamber increases pressure and provides high-concentration oxygen, then pressure is reduced in a controlled way.</p></article>
    <article><span>MEDICAL EMERGENCY</span><h4>Do not attempt to “dive again” for treatment</h4><p>Suspected decompression illness or arterial gas embolism requires emergency medical assessment and specialist treatment.</p></article>
  </div>;
}

function FlyingView(){
  return <div className="spark-diving-flying">
    <article><span>LOWER CABIN PRESSURE</span><h4>Altitude adds decompression stress</h4><p>Flying soon after diving lowers ambient pressure further and can increase decompression-sickness risk.</p></article>
    <article><span>WAITING TIME DEPENDS ON DIVE PROFILE</span><h4>Use current recognised guidance</h4><p>Recommended preflight intervals differ for a single no-decompression dive, repetitive diving and dives requiring decompression. Divers should follow current guidance from recognised dive-safety organisations and their training agency.</p></article>
  </div>;
}

export default function DivingEffectsExplorer(){
  const [view,setView]=useState("pressure");
  const summary=useMemo(()=>({
    pressure:"Pressure increases with depth because more water lies above the diver.",
    dcs:"Decompression sickness can occur when dissolved inert gas forms bubbles during excessive pressure reduction.",
    ear:"Ear barotrauma results from unequal pressure across the eardrum.",
    breath:"Breath-holding during ascent can cause dangerous lung overexpansion and gas embolism.",
    narcosis:"Deep diving can impair judgement through nitrogen narcosis, while breath-hold diving carries blackout risk.",
    treatment:"Serious decompression illness is treated medically, often with hyperbaric oxygen.",
    flying:"Flying too soon after diving adds decompression stress because cabin pressure is lower than sea-level pressure."
  })[view],[view]);
  return <section className="spark-diving-effects">
    <header><span>DIVING AND THE HUMAN BODY</span><h3>Connect pressure changes to decompression, ears, lungs and the nervous system</h3><p>Diving exposes the body to changing pressure. Safe diving depends on controlled ascent, pressure equalisation, normal breathing and appropriate decompression planning.</p></header>
    <div className="spark-diving-tabs">{[["pressure","Pressure with depth"],["dcs","The bends"],["ear","Ear pressure"],["breath","Breath-holding"],["narcosis","Narcosis and blackout"],["treatment","Treatment"],["flying","Flying after diving"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-diving-stage">{view==="pressure"&&<PressureView/>}{view==="dcs"&&<DCSView/>}{view==="ear"&&<EarView/>}{view==="breath"&&<BreathView/>}{view==="narcosis"&&<NarcosisView/>}{view==="treatment"&&<TreatmentView/>}{view==="flying"&&<FlyingView/>}</div>
    <div className="spark-diving-summary"><strong>{summary}</strong><span>Divers should follow trained procedures, dive tables/computers and current recognised dive-safety guidance.</span></div>
  </section>;
}
