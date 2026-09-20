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
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Sound pathway through the ear">
      <path className="earfx-wave" d="M30 120q35-35 70 0t70 0t70 0" />
      <path className="earfx-wave" d="M30 180q35-35 70 0t70 0t70 0" />
      <path className="earfx-canal" d="M250 150H390" />
      <ellipse className="earfx-drum" cx="420" cy="150" rx="15" ry="65" />
      <path className="earfx-ossicles" d="M438 135L480 105L520 135L560 105" />
      <path className="earfx-cochlea" d="M650 170Q720 105 775 150Q825 195 785 240Q750 278 705 250Q675 232 687 205Q700 184 724 194Q741 203 735 220" />
      <path className="earfx-nerve" d="M770 220Q845 210 920 250" />
      <path className="earfx-arrow" d="M205 150H235M395 150H405M565 120H620M790 230H835" />
      <text className="earfx-label" x="135" y="290" textAnchor="middle">1. sound waves</text>
      <text className="earfx-label" x="330" y="290" textAnchor="middle">2. ear canal</text>
      <text className="earfx-label" x="470" y="290" textAnchor="middle">3. ear drum + ossicles</text>
      <text className="earfx-label" x="710" y="290" textAnchor="middle">4. cochlea</text>
      <text className="earfx-label" x="860" y="290" textAnchor="middle">5. auditory nerve</text>
      <text className="earfx-small" x="490" y="385" textAnchor="middle">Sound path: ear canal → ear drum → ossicles → cochlea → auditory nerve</text>
    </svg>
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
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Semicircular canals showing fluid movement during rotation">
      <g transform="translate(130 70)">
        <path className="earfx-semicircular" d="M180 250Q60 160 120 65Q200-15 285 75Q340 140 300 225" />
        <path className="earfx-semicircular" d="M205 245Q150 110 250 75Q355 40 375 150Q388 225 310 270" />
        <path className="earfx-semicircular" d="M185 275Q80 255 72 165Q68 75 155 65Q245 55 275 150" />
        <path className="earfx-fluid" d="M110 160Q160 100 220 115" />
        <path className="earfx-fluid" d="M230 95Q300 110 330 170" />
        <path className="earfx-fluid" d="M100 215Q160 265 230 245" />
        <text className="earfx-label" x="215" y="355" textAnchor="middle">fluid moves when the head rotates</text>
      </g>
      <g transform="translate(610 135)">
        <circle className="earfx-head" cx="80" cy="85" r="55" />
        <path className="earfx-body" d="M80 145V280M80 190L15 235M80 190L150 230M80 280L25 365M80 280L145 365" />
        <path className="earfx-spin" d="M5 45Q80-20 155 45" />
        <text className="earfx-small" x="80" y="400" textAnchor="middle">fluid may keep moving briefly after spinning stops</text>
      </g>
    </svg>
  );
}

function PressureScene() {
  return (
    <svg viewBox="0 0 980 500" role="img" aria-label="Eustachian tube equalising pressure across the ear drum">
      <g transform="translate(80 70)">
        <rect className="earfx-outer-air" x="0" y="60" width="250" height="280" rx="20" />
        <ellipse className="earfx-drum big" cx="290" cy="200" rx="18" ry="110" />
        <rect className="earfx-middle-air" x="325" y="60" width="250" height="280" rx="20" />
        <path className="earfx-eustachian" d="M480 265Q500 340 585 390" />
        <path className="earfx-pressure-arrow" d="M90 200H245M500 200H340" />
        <text className="earfx-heading" x="125" y="45" textAnchor="middle">outside air</text>
        <text className="earfx-heading" x="450" y="45" textAnchor="middle">middle ear</text>
        <text className="earfx-label" x="445" y="430">Eustachian tube opens to throat</text>
      </g>
      <text className="earfx-small" x="500" y="475" textAnchor="middle">equal pressure on both sides of the ear drum reduces discomfort and causes the 'pop'</text>
    </svg>
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
