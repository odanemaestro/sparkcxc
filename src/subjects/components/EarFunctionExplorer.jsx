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
    <svg viewBox="0 0 980 500" role="img" aria-label="Sound pathway through outer, middle and inner ear">
      <path className="earfx-wave" d="M20 120q30-32 60 0t60 0t60 0" />
      <path className="earfx-wave" d="M20 180q30-32 60 0t60 0t60 0" />

      <path className="earfx-pinna" d="M210 85Q160 85 150 155Q145 235 220 255Q275 260 280 205Q284 165 247 160Q218 158 214 187Q212 212 235 211Q252 210 252 185" />
      <path className="earfx-canal" d="M245 185Q315 174 386 184" />
      <ellipse className="earfx-drum" cx="410" cy="184" rx="14" ry="60" transform="rotate(-8 410 184)" />

      <path className="earfx-middle-cavity" d="M427 128Q505 115 568 151Q575 198 542 232Q486 248 431 217Z" />
      <path className="earfx-ossicles" d="M426 166Q445 145 465 147L476 169L462 190M470 149Q494 142 505 160L496 181L516 191M514 191L532 171M516 196L536 214M532 171Q547 192 536 214" />

      <path className="earfx-semicircular" d="M590 145Q555 82 600 58Q652 31 682 83Q705 124 675 169M621 164Q610 92 670 80Q724 69 733 128Q742 178 690 200M590 185Q545 153 565 107Q585 62 633 83Q675 101 670 145" />
      <ellipse className="earfx-vestibule" cx="676" cy="218" rx="28" ry="38" />

      <path className="earfx-cochlea" d="M694 258Q735 211 786 232Q835 252 832 300Q828 343 786 355Q745 365 719 337Q700 316 710 291Q719 269 742 268Q767 266 778 284Q788 302 778 317Q768 330 753 327Q741 324 739 312" />
      <path className="earfx-nerve" d="M785 286Q848 269 922 304" />

      <path className="earfx-eustachian" d="M535 211Q560 246 577 309Q590 352 632 386" />

      <path className="earfx-arrow" d="M190 150H228M389 184H399M542 190H577M812 296H850" />

      <text className="earfx-label" x="90" y="305" textAnchor="middle">1. sound waves</text>
      <text className="earfx-label" x="300" y="305" textAnchor="middle">2. pinna + ear canal</text>
      <text className="earfx-label" x="480" y="305" textAnchor="middle">3. ear drum + ossicles</text>
      <text className="earfx-label" x="735" y="405" textAnchor="middle">4. cochlea</text>
      <text className="earfx-label" x="875" y="355" textAnchor="middle">5. auditory nerve</text>
      <text className="earfx-small" x="500" y="465" textAnchor="middle">Sound path: pinna → ear canal → ear drum → ossicles → cochlea → auditory nerve</text>
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
