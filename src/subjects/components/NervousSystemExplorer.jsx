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
  const [focus,setFocus]=useState("brain");
  const details={
    brain:["Brain","The brain forms the main integration centre of the central nervous system."],
    spinal:["Spinal cord","The spinal cord carries impulses between the brain and the body and coordinates many reflexes."],
    peripheral:["Peripheral nerves","Peripheral nerves connect receptors and effectors throughout the body with the central nervous system."],
    cerebrum:["Cerebrum","The cerebrum is involved in conscious thought, memory, sensory interpretation and voluntary actions."],
    cerebellum:["Cerebellum","The cerebellum helps coordinate muscle activity, posture and balance."],
    medulla:["Medulla oblongata","The medulla helps regulate involuntary activities such as breathing and heartbeat."]
  };
  const hotspots={
    brain:[50,8],spinal:[50,34],peripheral:[32,44],cerebrum:[49,6],cerebellum:[55,11],medulla:[50,13]
  };
  const selected=details[focus];
  return (
    <div className="spark-nervous-reference-view">
      <figure className="spark-nervous-reference-figure">
        <div className="spark-nervous-image-stage">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Nervous_system_diagram_unlabeled.svg"
            alt="Unlabeled human nervous system showing the brain, spinal cord and peripheral nerves"
            loading="lazy"
          />
          {Object.entries(hotspots).map(([key,[left,top]])=>(
            <button
              type="button"
              key={key}
              className={"spark-nervous-hotspot "+(focus===key?"active":"")}
              style={{left:left+"%",top:top+"%"}}
              onClick={()=>setFocus(key)}
              aria-pressed={focus===key}
              aria-label={details[key][0]}
              title={details[key][0]}
            >
              <span aria-hidden="true"></span>
            </button>
          ))}
        </div>
        <figcaption>
          <span>Human central and peripheral nervous system</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Nervous_system_diagram_unlabeled.svg" target="_blank" rel="noreferrer">Medium69 / Jmarchn</a>
            {" · "}CC BY-SA 4.0
          </small>
        </figcaption>
      </figure>

      <div className="spark-nervous-reference-focus">
        <span>Explore the system</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status">
          <strong>{selected[0]}</strong>
          <p>{selected[1]}</p>
        </article>
      </div>
    </div>
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
