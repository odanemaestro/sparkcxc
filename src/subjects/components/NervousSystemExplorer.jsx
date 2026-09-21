import React, { useState } from "react";
import "./nervousSystemExplorer.css";

const VIEWS = {
  cns:{
    label:"CNS overview",
    title:"Brain and spinal cord form the central nervous system",
    note:"The brain processes information and coordinates responses. The spinal cord carries impulses to and from the brain and also coordinates many reflex actions.",
  },
  neurone:{
    label:"Neurone",
    title:"Neurones carry electrical impulses",
    note:"Sensory neurones carry impulses from receptors to the CNS. Motor neurones carry impulses from the CNS to effectors. Relay neurones connect neurones within the CNS.",
  },
  reflex:{
    label:"Reflex arc",
    title:"Reflexes provide rapid automatic protection",
    note:"A reflex arc follows the pathway receptor → sensory neurone → relay neurone → motor neurone → effector. The response occurs rapidly without waiting for conscious decision-making.",
  },
  actions:{
    label:"Actions",
    title:"Voluntary and involuntary actions differ",
    note:"Voluntary actions involve conscious control by the cerebrum. Involuntary actions occur automatically and include reflexes and processes such as heartbeat control.",
  },
};

function CNSScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Central nervous system showing brain regions, spinal cord and peripheral nerves">
      <g className="ns-body" transform="translate(30 18)">
        <circle className="ns-head" cx="300" cy="105" r="78" />
        <path className="ns-torso" d="M223 195Q300 162 377 195Q420 278 405 421H195Q180 278 223 195Z" />
        <path className="ns-arm" d="M224 222Q158 274 128 370M376 222Q442 274 472 370" />
        <path className="ns-leg" d="M260 420Q236 468 224 500M340 420Q364 468 376 500" />

        <path className="ns-brain cerebrum" d="M258 78Q278 43 321 48Q354 45 374 71Q389 99 373 127Q350 147 316 139Q286 153 259 133Q240 111 258 78Z" />
        <path className="ns-brain cerebellum" d="M335 124Q368 116 388 136Q395 156 379 170Q352 179 329 163Q319 145 335 124Z" />
        <path className="ns-brainstem" d="M322 130Q338 135 344 154V183" />
        <path className="ns-spinal" d="M300 167V415" />

        <path className="ns-nerve" d="M300 226Q238 240 190 282M300 226Q362 240 410 282" />
        <path className="ns-nerve" d="M300 292Q231 324 166 364M300 292Q369 324 434 364" />
        <path className="ns-nerve" d="M300 355Q260 390 238 430M300 355Q340 390 362 430" />
        <path className="ns-nerve fine" d="M190 282Q160 310 145 344M410 282Q440 310 455 344M238 430Q225 455 220 478M362 430Q375 455 380 478" />
      </g>

      <text className="ns-label" x="510" y="105">brain</text>
      <path className="ns-guide" d="M397 105H495" />
      <text className="ns-label" x="510" y="245">spinal cord</text>
      <path className="ns-guide" d="M340 245H495" />
      <text className="ns-label" x="510" y="350">peripheral nerves</text>
      <path className="ns-guide" d="M430 335H495" />

      <g transform="translate(650 72)">
        <rect className="ns-card" x="0" y="0" width="285" height="115" rx="16" />
        <text className="ns-card-title" x="18" y="30">Cerebrum</text>
        <text className="ns-card-text" x="18" y="58">thinking, memory and</text>
        <text className="ns-card-text" x="18" y="80">voluntary actions</text>

        <rect className="ns-card" x="0" y="130" width="285" height="115" rx="16" />
        <text className="ns-card-title" x="18" y="160">Cerebellum</text>
        <text className="ns-card-text" x="18" y="188">balance and muscle</text>
        <text className="ns-card-text" x="18" y="210">coordination</text>

        <rect className="ns-card" x="0" y="260" width="285" height="115" rx="16" />
        <text className="ns-card-title" x="18" y="290">Medulla oblongata</text>
        <text className="ns-card-text" x="18" y="318">breathing and heartbeat</text>
        <text className="ns-card-text" x="18" y="340">control</text>
      </g>
    </svg>
  );
}

function NeuroneScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Motor neurone showing dendrites, cell body, axon, myelin sheath and nerve endings">
      <g transform="translate(60 65)">
        <circle className="ns-cell-body" cx="185" cy="200" r="70" />
        <circle className="ns-nucleus" cx="185" cy="200" r="23" />
        <path className="ns-dendrite" d="M125 160Q70 115 30 130M120 195Q60 180 20 205M128 232Q80 275 35 265M155 140Q150 75 110 45" />
        <path className="ns-axon" d="M255 200H805" />
        {[300,385,470,555,640,725].map(x => <rect key={x} className="ns-myelin" x={x} y="175" width="62" height="50" rx="24" />)}
        <path className="ns-terminal" d="M805 200Q855 165 900 145M805 200Q860 200 915 200M805 200Q855 235 900 255" />

        <text className="ns-label" x="130" y="345">cell body</text>
        <path className="ns-guide" d="M185 270V325" />
        <text className="ns-label" x="470" y="345">axon</text>
        <path className="ns-guide" d="M500 210V325" />
        <text className="ns-label" x="655" y="115">myelin sheath</text>
        <path className="ns-guide" d="M660 130V170" />
        <text className="ns-label" x="790" y="345">nerve endings</text>
        <path className="ns-guide" d="M840 250V325" />
        <path className="ns-impulse" d="M285 150H770" />
        <text className="ns-small" x="525" y="135" textAnchor="middle">direction of nerve impulse</text>
      </g>
    </svg>
  );
}

function ReflexScene() {
  const stages = [
    {x:95,label:"Receptor",sub:"skin detects heat"},
    {x:285,label:"Sensory neurone",sub:"impulse to CNS"},
    {x:480,label:"Relay neurone",sub:"within spinal cord"},
    {x:675,label:"Motor neurone",sub:"impulse from CNS"},
    {x:865,label:"Effector",sub:"muscle contracts"},
  ];
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Reflex arc from receptor through sensory relay and motor neurones to an effector">
      <path className="ns-hot-object" d="M35 385H160V455H35Z" />
      <path className="ns-heat" d="M60 365q18-30 36 0M105 365q18-30 36 0" />
      <path className="ns-hand" d="M115 320Q155 280 190 305Q210 330 195 365Q160 390 130 370Z" />

      {stages.map((stage,index)=>(
        <g key={stage.label}>
          <circle className={index===2 ? "ns-reflex-node relay" : "ns-reflex-node"} cx={stage.x} cy="170" r="58" />
          <text className="ns-node-title" x={stage.x} y="165" textAnchor="middle">{stage.label}</text>
          <text className="ns-node-sub" x={stage.x} y="190" textAnchor="middle">{stage.sub}</text>
          {index<stages.length-1 && <path className="ns-reflex-arrow" d={"M"+(stage.x+65)+" 170H"+(stages[index+1].x-65)} />}
        </g>
      ))}
      <path className="ns-reflex-link" d="M95 230Q120 280 150 315" />
      <path className="ns-reflex-link" d="M865 230Q825 300 770 360" />
      <path className="ns-muscle" d="M700 355Q780 325 850 375Q810 440 720 420Q680 400 700 355Z" />
      <text className="ns-small" x="490" y="300" textAnchor="middle">rapid automatic pathway through the spinal cord</text>
      <text className="ns-small" x="490" y="335" textAnchor="middle">the brain is informed, but the protective response begins before conscious action</text>
    </svg>
  );
}

function ActionsScene() {
  return (
    <div className="spark-nervous-actions">
      <article>
        <span>VOLUNTARY</span>
        <h4>Conscious control</h4>
        <p>Examples include writing, walking by choice, answering a telephone and kicking a ball.</p>
        <b>Main brain region: cerebrum</b>
      </article>
      <article>
        <span>INVOLUNTARY</span>
        <h4>Automatic response</h4>
        <p>Examples include blinking when dust enters the eye, the knee jerk and regulation of heartbeat.</p>
        <b>Reflexes are rapid and protective</b>
      </article>
    </div>
  );
}

export default function NervousSystemExplorer() {
  const [view,setView] = useState("cns");
  const info = VIEWS[view];

  return (
    <section className="spark-nervous-system">
      <header>
        <span>NERVOUS SYSTEM</span>
        <h3>From stimulus to coordinated response</h3>
        <p>Compare the structures that receive information, process it and carry impulses to muscles or glands.</p>
      </header>

      <div className="spark-nervous-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="actions" ? "spark-nervous-stage actions" : "spark-nervous-stage"}>
        {view==="cns" && <CNSScene />}
        {view==="neurone" && <NeuroneScene />}
        {view==="reflex" && <ReflexScene />}
        {view==="actions" && <ActionsScene />}
      </div>

      <div className="spark-nervous-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>

      {view==="neurone" && (
        <div className="spark-nervous-myelin">
          <b>Myelin sheath</b>
          <span>The fatty myelin sheath electrically insulates the axon and increases the speed of nerve-impulse transmission.</span>
        </div>
      )}
    </section>
  );
}
