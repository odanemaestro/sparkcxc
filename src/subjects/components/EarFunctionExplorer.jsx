import React, { useState } from "react";
import "./earFunctionExplorer.css";

const VIEWS = {
  hearing:{
    label:"Hearing pathway",
    title:"From sound wave to nerve impulse",
    note:"Sound waves travel through the ear canal, vibrate the ear drum, are amplified by the ossicles and enter the cochlea, where sensory cells convert vibrations into nerve impulses.",
  },
  sound:{
    label:"Pitch and loudness",
    title:"Frequency controls pitch, amplitude controls loudness",
    note:"A higher frequency gives a higher pitch. A larger amplitude produces a louder sound, although prolonged loud sound can damage sensory hair cells in the cochlea.",
  },
  balance:{
    label:"Balance",
    title:"Semicircular canals detect head movement",
    note:"Movement of fluid in the semicircular canals bends sensory structures. After spinning stops, fluid may continue moving briefly, causing dizziness.",
  },
  pressure:{
    label:"Pressure",
    title:"The Eustachian tube equalises pressure",
    note:"Changes in outside air pressure can create unequal pressure across the ear drum. Opening of the Eustachian tube allows the pressures to equalise, producing the familiar ear 'pop'.",
  },
};

function HearingScene() {
  const [focus,setFocus]=useState("pinna");
  const details={
    pinna:["Pinna","The pinna collects sound waves and directs them into the ear canal."],
    canal:["Ear canal","The ear canal carries sound waves towards the ear drum."],
    drum:["Ear drum","The tympanic membrane vibrates when sound waves reach it."],
    ossicles:["Ossicles","The malleus, incus and stapes transmit and amplify vibrations through the middle ear."],
    cochlea:["Cochlea","Vibrations enter the fluid-filled cochlea, where sensory hair cells convert mechanical movement into nerve impulses."],
    nerve:["Auditory nerve","The auditory nerve carries impulses from the cochlea towards the brain."]
  };
  const selected=details[focus];
  return (
    <div className="spark-ear-reference-view">
      <figure className="spark-ear-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Anatomy_of_the_Human_Ear_blank.svg"
          alt="Blank scientific cross-section of the human ear showing outer, middle and inner ear anatomy"
          loading="lazy"
        />
        <figcaption>
          <span>Human ear anatomy</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Anatomy_of_the_Human_Ear_blank.svg" target="_blank" rel="noreferrer">Chittka L, Brockmann / M.Komorniczak</a>
            {" · "}CC BY 2.5
          </small>
        </figcaption>
      </figure>
      <div className="spark-ear-reference-focus">
        <span>Follow the hearing pathway</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
        <p className="spark-ear-reference-note">Sound path: pinna → ear canal → ear drum → ossicles → cochlea → auditory nerve.</p>
      </div>
    </div>
  );
}

function SoundScene() {
  const wave = (y,amp,cycles,startX=70,endX=420) => {
    const pts=[];
    const span=endX-startX;
    for(let x=startX;x<=endX;x+=10){
      const phase=((x-startX)/span)*Math.PI*2*cycles;
      pts.push((pts.length?"L":"M")+x+" "+(y+Math.sin(phase)*amp).toFixed(1));
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Frequency controls pitch and amplitude controls loudness">
      <text className="earfx-heading" x="245" y="45" textAnchor="middle">Pitch depends on frequency</text>
      <path className="earfx-sound low" d={wave(150,35,2)} />
      <text className="earfx-small" x="245" y="210" textAnchor="middle">low frequency, lower pitch</text>
      <path className="earfx-sound high" d={wave(315,35,6)} />
      <text className="earfx-small" x="245" y="375" textAnchor="middle">high frequency, higher pitch</text>

      <text className="earfx-heading" x="735" y="45" textAnchor="middle">Loudness depends on amplitude</text>
      <path className="earfx-sound quiet" d={wave(150,20,4,560,910)} />
      <text className="earfx-small" x="735" y="210" textAnchor="middle">small amplitude, quieter</text>
      <path className="earfx-sound loud" d={wave(315,60,4,560,910)} />
      <text className="earfx-small" x="735" y="405" textAnchor="middle">large amplitude, louder</text>

      <text className="earfx-warning" x="735" y="470" textAnchor="middle">prolonged loud noise can damage cochlear hair cells</text>
    </svg>
  );
}

function BalanceScene() {
  const [focus,setFocus]=useState("canals");
  const details={
    canals:["Semicircular canals","Three semicircular canals are arranged in different planes and help detect rotational movement of the head."],
    fluid:["Fluid movement","When the head rotates, fluid in the canals lags behind and bends sensory structures."],
    receptors:["Sensory receptors","Hair-cell receptors convert movement of the fluid and associated structures into nerve signals."],
    dizziness:["After spinning","After rotation stops, fluid may continue moving briefly, which can make a person feel dizzy."]
  };
  const selected=details[focus];
  return (
    <div className="spark-ear-reference-view">
      <figure className="spark-ear-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/STS-65_fig6.png"
          alt="NASA diagram of the vestibular apparatus showing semicircular canals and otolith organs involved in balance and motion sensing"
          loading="lazy"
        />
        <figcaption>
          <span>Vestibular apparatus and balance</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:STS-65_fig6.png" target="_blank" rel="noreferrer">NASA</a>
            {" · "}Public domain
          </small>
        </figcaption>
      </figure>
      <div className="spark-ear-reference-focus">
        <span>Explore balance</span>
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

function PressureScene() {
  const [focus,setFocus]=useState("difference");
  const details={
    difference:["Unequal pressure","Rapid changes in outside air pressure can create a pressure difference across the ear drum."],
    tube:["Eustachian tube","The Eustachian tube connects the middle ear with the throat and helps equalise air pressure."],
    opening:["Swallowing or yawning","Swallowing or yawning can help open the Eustachian tube so air moves between the throat and middle ear."],
    pop:["The familiar 'pop'","When pressure equalises across the ear drum, discomfort reduces and a person may feel or hear the ears 'pop'."]
  };
  const selected=details[focus];
  return (
    <div className="spark-ear-reference-view">
      <figure className="spark-ear-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Anatomy_of_the_Human_Ear_blank.svg"
          alt="Scientific cross-section of the human ear including the middle ear and Eustachian tube"
          loading="lazy"
        />
        <figcaption>
          <span>Middle ear and Eustachian tube</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Anatomy_of_the_Human_Ear_blank.svg" target="_blank" rel="noreferrer">Chittka L, Brockmann / M.Komorniczak</a>
            {" · "}CC BY 2.5
          </small>
        </figcaption>
      </figure>
      <div className="spark-ear-reference-focus">
        <span>Explore pressure equalisation</span>
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

export default function EarFunctionExplorer() {
  const [view,setView] = useState("hearing");
  const info = VIEWS[view];

  return (
    <section className="spark-ear-function">
      <header>
        <span>EAR FUNCTION</span>
        <h3>Hearing, balance and pressure control</h3>
        <p>Follow sound through the ear and compare the inner-ear structures responsible for hearing and balance.</p>
      </header>

      <div className="spark-ear-function-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-ear-function-stage">
        {view==="hearing" && <HearingScene />}
        {view==="sound" && <SoundScene />}
        {view==="balance" && <BalanceScene />}
        {view==="pressure" && <PressureScene />}
      </div>

      <div className="spark-ear-function-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>

      <div className="spark-ear-range">
        <b>Typical human hearing range</b>
        <span>About 20 Hz to 20 000 Hz in young people with healthy hearing. Sensitivity to high frequencies often decreases with age and noise exposure.</span>
      </div>
    </section>
  );
}
