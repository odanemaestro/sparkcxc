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
  const [focus,setFocus]=useState("dendrites");
  const details={
    dendrites:["Dendrites","Dendrites receive signals and carry them towards the cell body."],
    body:["Cell body and nucleus","The cell body contains the nucleus and much of the neurone's cytoplasm."],
    axon:["Axon","The axon carries the nerve impulse away from the cell body."],
    myelin:["Myelin sheath","Myelin electrically insulates the axon and increases the speed of impulse transmission."],
    endings:["Nerve endings","Axon terminals pass the signal to another neurone, muscle or gland."]
  };
  const hotspots={dendrites:[16,48],body:[31,49],axon:[55,50],myelin:[68,50],endings:[91,49]};
  const selected=details[focus];
  return (
    <div className="spark-neurone-reference-view">
      <figure className="spark-neurone-reference-figure">
        <div className="spark-neurone-image-stage">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Derived_Neuron_schema_with_no_labels.svg"
            alt="Unlabeled scientific neuron diagram showing dendrites, cell body, axon, myelin and nerve endings"
            loading="lazy"
          />
          {Object.entries(hotspots).map(([key,[left,top]])=>(
            <button
              type="button"
              key={key}
              className={"spark-neurone-hotspot "+(focus===key?"active":"")}
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
          <span>Neuron structure</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Derived_Neuron_schema_with_no_labels.svg" target="_blank" rel="noreferrer">Dhp1080 / Actam</a>
            {" · "}CC BY-SA 3.0 / GFDL
          </small>
        </figcaption>
      </figure>
      <div className="spark-neurone-reference-focus">
        <span>Explore a neurone</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
      </div>
    </div>
  );
}

function ReflexScene() {
  const [focus,setFocus]=useState("stimulus");
  const details={
    stimulus:["Stimulus and receptor","A painful or harmful stimulus is detected by a receptor in the skin."],
    sensory:["Sensory neurone","The sensory neurone carries the impulse from the receptor towards the spinal cord."],
    relay:["Relay neurone","A relay neurone within the spinal cord links the sensory pathway to the motor pathway."],
    motor:["Motor neurone","The motor neurone carries the impulse from the spinal cord to the effector."],
    effector:["Effector","A muscle contracts rapidly to withdraw the body part from danger."]
  };
  const selected=details[focus];
  return (
    <div className="spark-reflex-reference-view">
      <figure className="spark-reflex-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Reflex_Arc.svg"
          alt="Scientific reflex-arc diagram showing a painful stimulus, sensory neuron, spinal cord, interneuron, motor neuron and responding muscle"
          loading="lazy"
        />
        <figcaption>
          <span>Reflex arc</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Reflex_Arc.svg" target="_blank" rel="noreferrer">Verona Dethran</a>
            {" · "}CC BY-SA 4.0
          </small>
        </figcaption>
      </figure>
      <div className="spark-reflex-reference-focus">
        <span>Trace the reflex</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
        <p className="spark-reflex-reference-note">Pathway: receptor → sensory neurone → relay neurone → motor neurone → effector.</p>
      </div>
    </div>
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
