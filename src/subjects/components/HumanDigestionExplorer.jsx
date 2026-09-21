import React,{useMemo,useState} from "react";
import "./humanDigestionExplorer.css";

const ENZYMES=[
  {name:"Salivary amylase",where:"Mouth",substrate:"Starch",product:"Maltose",condition:"Near-neutral pH"},
  {name:"Pepsin",where:"Stomach",substrate:"Protein",product:"Shorter polypeptides",condition:"Acidic pH, about pH 2"},
  {name:"Rennin (chymosin)",where:"Stomach of young mammals",substrate:"Milk protein",product:"Clotted milk protein",condition:"Acidic stomach conditions"},
  {name:"Trypsin",where:"Small intestine",substrate:"Protein / polypeptides",product:"Smaller peptides",condition:"Alkaline conditions"},
  {name:"Pancreatic amylase",where:"Small intestine",substrate:"Starch",product:"Maltose",condition:"Alkaline conditions"},
  {name:"Maltase",where:"Small intestine",substrate:"Maltose",product:"Glucose",condition:"Small-intestine conditions"},
  {name:"Lactase",where:"Small intestine",substrate:"Lactose",product:"Glucose + galactose",condition:"Small-intestine conditions"},
  {name:"Lipase",where:"Small intestine",substrate:"Fat",product:"Fatty acids + glycerol",condition:"Works efficiently after fat is emulsified"},
];

function DigestiveSystemScene(){
  return (
    <svg className="spark-digestion-system-svg" viewBox="0 0 620 760" role="img" aria-label="Human digestive system showing the pathway from mouth to anus and the liver, gall bladder and pancreas">
      <circle className="dg-head" cx="310" cy="72" r="52" />
      <path className="dg-mouth" d="M282 74Q310 90 338 74" />
      <path className="dg-pharynx" d="M310 100V132" />

      <path className="dg-body" d="M225 140Q310 105 395 140Q448 235 430 385Q417 500 380 640H240Q203 500 190 385Q172 235 225 140Z" />

      <path className="dg-oesophagus" d="M310 112V285" />
      <path className="dg-liver" d="M205 265Q258 215 337 236Q371 247 382 282Q350 326 292 340Q232 347 205 312Z" />
      <path className="dg-gall" d="M275 323Q290 317 299 331Q297 356 278 365Q264 351 275 323Z" />

      <path className="dg-stomach" d="M340 280Q388 267 410 305Q431 347 409 387Q389 421 348 414Q305 407 296 372Q287 336 311 307Q323 292 340 280Z" />
      <path className="dg-duodenum" d="M367 409Q408 420 409 455Q409 487 370 497" />
      <path className="dg-pancreas" d="M286 414Q338 390 400 410Q378 442 325 450Q302 447 286 414Z" />

      <path className="dg-large" d="M225 430Q205 458 210 535Q214 612 262 632M395 430Q415 458 410 535Q406 612 358 632M225 430Q310 402 395 430M262 632Q310 654 358 632" />
      <path className="dg-appendix" d="M220 538Q192 558 202 588" />

      <path className="dg-small" d="M262 454Q310 420 358 452Q385 476 358 500Q333 520 360 542Q379 564 348 584Q314 608 278 585Q251 564 279 542Q305 520 274 501Q245 482 262 454Z" />
      <path className="dg-small inner" d="M280 463Q314 444 339 462Q355 477 336 491Q315 506 339 523Q354 538 335 553Q311 572 290 555Q272 541 290 525Q307 509 288 496Q268 482 280 463Z" />

      <path className="dg-rectum" d="M310 632V694" />
      <path className="dg-anus" d="M294 694Q310 707 326 694" />

      <path className="dg-route" d="M310 91V281Q333 300 345 325Q353 351 343 380Q334 405 365 421Q390 438 383 465Q374 495 345 512Q315 530 333 557Q352 586 330 612Q316 627 310 646V690" />

      <g className="dg-labels">
        <text x="88" y="78">mouth</text><path d="M135 74H275"/>
        <text x="70" y="185">oesophagus</text><path d="M150 180H300"/>
        <text x="68" y="282">liver</text><path d="M115 278H213"/>
        <text x="447" y="320">stomach</text><path d="M405 315H440"/>
        <text x="447" y="424">pancreas</text><path d="M395 419H440"/>
        <text x="455" y="478">duodenum</text><path d="M408 474H448"/>
        <text x="74" y="490">small intestine</text><path d="M160 486H258"/>
        <text x="55" y="570">large intestine</text><path d="M155 565H215"/>
        <text x="446" y="648">rectum</text><path d="M322 643H438"/>
        <text x="446" y="704">anus</text><path d="M327 700H438"/>
      </g>

      <text className="dg-caption" x="310" y="742" textAnchor="middle">food pathway through the alimentary canal</text>
    </svg>
  );
}

function PathwayView(){
  const steps=[
    ["Mouth","Chewing gives mechanical digestion. Salivary amylase begins starch digestion."],
    ["Oesophagus","Peristalsis moves the bolus towards the stomach."],
    ["Stomach","Muscular churning mixes food. Hydrochloric acid kills many microbes and provides the low pH needed by pepsin."],
    ["Duodenum","Bile enters from the liver and gall bladder. Pancreatic enzymes enter from the pancreas."],
    ["Small intestine","Digestion is completed and most digested nutrients are absorbed through villi."],
    ["Large intestine","Much of the remaining water is absorbed."],
    ["Rectum and anus","Undigested material is stored briefly and then egested."],
  ];
  return <div className="spark-digestion-pathway-layout">
    <div className="spark-digestion-system"><DigestiveSystemScene /></div>
    <div className="spark-digestion-pathway">{steps.map((row,i)=><article key={row[0]}><span>{i+1}</span><div><b>{row[0]}</b><p>{row[1]}</p></div></article>)}</div>
  </div>;
}

function EnzymeView(){
  const [selected,setSelected]=useState("Salivary amylase");
  const item=ENZYMES.find(row=>row.name===selected);
  return <div className="spark-digestion-enzymes">
    <div className="spark-digestion-enzyme-buttons">{ENZYMES.map(row=><button type="button" key={row.name} className={selected===row.name?"active":""} onClick={()=>setSelected(row.name)}>{row.name}</button>)}</div>
    <article>
      <span>{item.where.toUpperCase()}</span>
      <h4>{item.name}</h4>
      <div><b>Substrate</b><strong>{item.substrate}</strong></div>
      <div><b>Product</b><strong>{item.product}</strong></div>
      <div><b>Best conditions</b><strong>{item.condition}</strong></div>
      <p>Enzymes are biological catalysts. Their active sites work best over a limited range of temperature and pH.</p>
    </article>
  </div>;
}

function BileView(){
  return <div className="spark-digestion-bile">
    <article><span>1</span><div><b>Liver</b><p>Produces bile.</p></div></article>
    <div className="spark-digestion-bile-arrow" aria-hidden="true">→</div>
    <article><span>2</span><div><b>Gall bladder</b><p>Stores and concentrates bile before release.</p></div></article>
    <div className="spark-digestion-bile-arrow" aria-hidden="true">→</div>
    <article><span>3</span><div><b>Duodenum</b><p>Bile emulsifies fat into smaller droplets, increasing surface area for lipase. It also helps neutralise acidic chyme entering from the stomach.</p></div></article>
  </div>;
}

function VillusView(){
  return <div className="spark-villus-view">
    <svg viewBox="0 0 760 420" role="img" aria-label="Simplified intestinal villus showing thin epithelium, blood capillaries and a central lacteal">
      <path className="villus-outline" d="M260 370Q270 230 300 100Q330 40 380 40Q430 40 460 100Q490 230 500 370Z"/>
      <path className="villus-lacteal" d="M380 315V100"/>
      <path className="villus-capillary" d="M320 330Q300 220 335 130Q355 95 380 125Q405 95 425 130Q460 220 440 330"/>
      <line className="villus-label-line" x1="300" y1="110" x2="140" y2="75"/>
      <text className="villus-label" x="130" y="70" textAnchor="end">one-cell-thick epithelium</text>
      <line className="villus-label-line" x1="350" y1="175" x2="135" y2="180"/>
      <text className="villus-label" x="125" y="185" textAnchor="end">blood capillaries</text>
      <line className="villus-label-line" x1="380" y1="235" x2="615" y2="215"/>
      <text className="villus-label" x="625" y="220">lacteal</text>
      <text className="villus-small" x="380" y="400" textAnchor="middle">large surface area + short diffusion distance + good transport away</text>
    </svg>
    <div className="spark-villus-cards">
      <article><b>Glucose and amino acids</b><p>Enter blood capillaries and are carried away in the blood.</p></article>
      <article><b>Products of fat digestion</b><p>Enter the lacteal and move through the lymphatic system.</p></article>
      <article><b>Assimilation</b><p>Body cells use absorbed nutrients for energy, growth, repair and storage.</p></article>
    </div>
  </div>;
}

function ConditionsView(){
  return <div className="spark-enzyme-conditions">
    <svg viewBox="0 0 760 370" role="img" aria-label="Enzyme activity rises to an optimum near 37 degrees Celsius and then falls sharply at high temperature">
      <line className="enzyme-axis" x1="85" y1="300" x2="690" y2="300"/>
      <line className="enzyme-axis" x1="85" y1="300" x2="85" y2="55"/>
      <path className="enzyme-curve" d="M95 280C180 270 250 220 330 120C365 78 405 72 440 110C475 150 490 245 505 292L680 298"/>
      <line className="enzyme-optimum" x1="390" y1="75" x2="390" y2="300"/>
      <text className="enzyme-label" x="390" y="330" textAnchor="middle">37 °C approximately</text>
      <text className="enzyme-label" x="390" y="355" textAnchor="middle">Temperature</text>
      <text className="enzyme-label" x="28" y="190" transform="rotate(-90 28 190)">Enzyme activity</text>
      <text className="enzyme-note" x="520" y="130">high temperature can denature enzyme</text>
    </svg>
    <div className="spark-enzyme-condition-notes">
      <p>At low temperature, enzyme-controlled reactions are slow because particles have less kinetic energy.</p>
      <p>Activity rises towards an optimum. For many human digestive enzymes this is close to body temperature, about 37 °C.</p>
      <p>High temperature can denature an enzyme by changing the shape of its active site. Extreme pH can also disrupt enzyme shape and activity.</p>
    </div>
  </div>;
}

export default function HumanDigestionExplorer(){
  const [view,setView]=useState("pathway");
  const summary=useMemo(()=>({
    pathway:"Digestion combines mechanical breakdown, chemical digestion, absorption, assimilation and egestion.",
    enzymes:"Each digestive enzyme acts on a particular substrate and works best under suitable conditions.",
    bile:"Bile is not an enzyme. It emulsifies fat and supports lipase action.",
    villus:"Villi are specialised for rapid absorption through a large, thin surface with good transport.",
    conditions:"Temperature and pH affect enzyme activity because enzyme shape and molecular collisions matter.",
  })[view],[view]);

  return <section className="spark-human-digestion">
    <header><span>HUMAN DIGESTION</span><h3>Follow food from mechanical breakdown to absorption and assimilation</h3><p>Digestion converts large, often insoluble food molecules into smaller soluble molecules that can be absorbed and used by cells.</p></header>
    <div className="spark-digestion-tabs">{[["pathway","Digestive pathway"],["enzymes","Enzymes"],["bile","Bile"],["villus","Villus absorption"],["conditions","Enzyme conditions"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-digestion-stage">
      {view==="pathway"&&<PathwayView/>}
      {view==="enzymes"&&<EnzymeView/>}
      {view==="bile"&&<BileView/>}
      {view==="villus"&&<VillusView/>}
      {view==="conditions"&&<ConditionsView/>}
    </div>
    <div className="spark-digestion-summary"><strong>{summary}</strong><span>Absorption moves digested nutrients into blood or lymph. Assimilation is the use of absorbed nutrients by body cells. Egestion removes undigested food through the anus.</span></div>
  </section>;
}

export { ENZYMES };
