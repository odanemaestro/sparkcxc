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
  const spinalPairs = [195,220,245,270,295,320,345,370,395,420,445];
  return (
    <svg viewBox="0 0 980 720" role="img" aria-label="Human nervous system showing brain, spinal cord and branching peripheral nerves throughout the body">
      <g className="ns-body ns-full-body" transform="translate(20 12)">
        <path className="ns-silhouette" d="M285 24Q330 24 350 61Q365 93 349 129Q338 151 323 159L318 188Q369 205 402 244Q429 278 444 336L465 430Q472 467 454 492Q436 509 415 494Q400 480 403 455L388 365Q380 327 362 302L356 460Q365 512 354 558L338 682Q330 707 305 704Q287 698 287 676L294 548L281 472H269L256 548L263 676Q263 698 245 704Q220 707 212 682L196 558Q185 512 194 460L188 302Q170 327 162 365L147 455Q150 480 135 494Q114 509 96 492Q78 467 85 430L106 336Q121 278 148 244Q181 205 232 188L227 159Q212 151 201 129Q185 93 200 61Q220 24 265 24Z" />

        <path className="ns-brain cerebrum" d="M224 69Q239 38 274 35Q311 31 337 57Q355 79 348 106Q337 132 310 137Q286 148 260 137Q230 138 214 116Q203 94 224 69Z" />
        <path className="ns-brain cerebellum" d="M309 118Q333 112 348 127Q354 144 342 155Q322 163 304 151Q297 136 309 118Z" />
        <path className="ns-brainstem" d="M292 128Q306 133 310 151V179" />
        <path className="ns-spinal" d="M282 165V470" />

        <g className="ns-spinal-roots">
          {spinalPairs.map((y,index)=>(
            <g key={y}>
              <path d={"M282 "+y+"Q"+(250-index)+" "+(y+5)+" "+(224-index*2)+" "+(y+20)} />
              <path d={"M282 "+y+"Q"+(314+index)+" "+(y+5)+" "+(340+index*2)+" "+(y+20)} />
            </g>
          ))}
        </g>

        <g className="ns-pns upper">
          <path className="ns-nerve major" d="M260 205Q211 222 177 259Q143 298 125 353Q112 401 105 452" />
          <path className="ns-nerve major" d="M304 205Q353 222 387 259Q421 298 439 353Q452 401 459 452" />
          <path className="ns-nerve" d="M213 236Q173 253 145 284M196 259Q156 286 130 327M178 294Q145 328 121 371" />
          <path className="ns-nerve" d="M351 236Q391 253 419 284M368 259Q408 286 434 327M386 294Q419 328 443 371" />
          <path className="ns-nerve fine" d="M125 353Q101 384 100 424M439 353Q463 384 464 424" />
        </g>

        <g className="ns-pns thorax">
          <path className="ns-nerve" d="M240 250Q207 269 184 300M240 278Q207 295 188 326M240 306Q211 323 191 350M324 250Q357 269 380 300M324 278Q357 295 376 326M324 306Q353 323 373 350" />
          <path className="ns-nerve fine" d="M225 332Q198 349 180 375M339 332Q366 349 384 375" />
        </g>

        <g className="ns-pns lower">
          <path className="ns-nerve major" d="M258 420Q224 461 219 514Q216 566 225 626Q229 656 226 682" />
          <path className="ns-nerve major" d="M306 420Q340 461 345 514Q348 566 339 626Q335 656 338 682" />
          <path className="ns-nerve" d="M246 452Q211 482 200 527M318 452Q353 482 364 527" />
          <path className="ns-nerve" d="M226 535Q203 568 198 610M338 535Q361 568 366 610" />
          <path className="ns-nerve fine" d="M225 626Q208 654 205 684M339 626Q356 654 359 684" />
        </g>

        <g className="ns-cranial-nerves">
          <path className="ns-nerve fine" d="M252 102Q216 111 196 131M265 118Q231 137 210 161M319 103Q346 113 367 133" />
        </g>
      </g>

      <g className="ns-cns-key">
        <rect className="ns-key-card" x="505" y="48" width="420" height="116" rx="16" />
        <line className="ns-key-line cns" x1="530" y1="80" x2="585" y2="80" />
        <text className="ns-card-title" x="605" y="87">Central nervous system (CNS)</text>
        <text className="ns-card-text" x="530" y="116">Brain + spinal cord: integration and coordination</text>
        <line className="ns-key-line pns" x1="530" y1="140" x2="585" y2="140" />
        <text className="ns-card-title" x="605" y="147">Peripheral nervous system (PNS)</text>
      </g>

      <text className="ns-label" x="520" y="230">brain</text>
      <path className="ns-guide" d="M360 95Q440 110 500 220" />
      <text className="ns-label" x="520" y="315">spinal cord</text>
      <path className="ns-guide" d="M302 292H500" />
      <text className="ns-label" x="520" y="410">peripheral nerves</text>
      <path className="ns-guide" d="M411 378Q462 386 500 400" />

      <g transform="translate(535 445)">
        <rect className="ns-card" x="0" y="0" width="190" height="112" rx="16" />
        <text className="ns-card-title" x="18" y="30">Cerebrum</text>
        <text className="ns-card-text" x="18" y="58">thinking, memory</text>
        <text className="ns-card-text" x="18" y="80">voluntary actions</text>

        <rect className="ns-card" x="205" y="0" width="190" height="112" rx="16" />
        <text className="ns-card-title" x="223" y="30">Cerebellum</text>
        <text className="ns-card-text" x="223" y="58">balance and muscle</text>
        <text className="ns-card-text" x="223" y="80">coordination</text>

        <rect className="ns-card" x="0" y="128" width="395" height="108" rx="16" />
        <text className="ns-card-title" x="18" y="158">Medulla oblongata</text>
        <text className="ns-card-text" x="18" y="186">automatic control of breathing and heartbeat</text>
      </g>

      <text className="ns-small" x="730" y="700" textAnchor="middle">
        Sensory input → CNS integration → motor output
      </text>
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
