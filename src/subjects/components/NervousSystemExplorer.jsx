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
    <svg viewBox="0 0 980 520" role="img" aria-label="Central nervous system showing brain, spinal cord and peripheral nerves">
      <circle className="ns-head" cx="300" cy="115" r="75" />
      <path className="ns-torso" d="M220 205Q300 165 380 205L415 420H185Z" />
      <path className="ns-brain" d="M260 95Q300 60 345 90Q365 130 330 155Q285 170 250 135Q240 110 260 95Z" />
      <path className="ns-spinal" d="M300 165V405" />
      <path className="ns-nerve" d="M300 245L190 285M300 245L410 285M300 330L205 390M300 330L395 390" />
      <text className="ns-label" x="470" y="115">brain</text>
      <path className="ns-guide" d="M355 110H455" />
      <text className="ns-label" x="470" y="260">spinal cord</text>
      <path className="ns-guide" d="M315 260H455" />
      <text className="ns-label" x="470" y="360">peripheral nerves</text>
      <path className="ns-guide" d="M405 335H455" />

      <g transform="translate(610 90)">
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
