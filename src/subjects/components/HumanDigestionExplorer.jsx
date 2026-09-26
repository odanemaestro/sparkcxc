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
    <svg className="spark-digestion-system-svg" viewBox="0 0 760 900" role="img" aria-label="Detailed human digestive system showing salivary glands, pharynx, oesophagus, liver, gall bladder, bile duct, stomach, pancreas, duodenum, small intestine, colon, cecum, appendix, rectum and anus">
      <circle className="dg-head" cx="380" cy="78" r="58"/>
      <path className="dg-mouth" d="M347 80Q380 96 413 80"/>
      <ellipse className="dg-salivary" cx="346" cy="60" rx="12" ry="8"/>
      <ellipse className="dg-salivary" cx="405" cy="96" rx="11" ry="7"/>
      <ellipse className="dg-salivary" cx="358" cy="103" rx="10" ry="7"/>
      <path className="dg-pharynx" d="M380 105Q395 123 382 146"/>
      <path className="dg-body" d="M282 150Q380 113 478 150Q532 255 505 430Q487 565 445 760H315Q273 565 255 430Q228 255 282 150Z"/>

      <path className="dg-oesophagus" d="M382 140V318"/>
      <path className="dg-liver" d="M250 302Q307 245 401 268Q438 281 452 325Q414 374 348 388Q281 392 250 357Z"/>
      <path className="dg-gall" d="M334 371Q351 364 361 380Q359 409 337 419Q321 403 334 371Z"/>
      <path className="dg-bile-duct" d="M348 395Q365 425 378 454"/>

      <path className="dg-stomach" d="M424 321Q475 305 499 345Q522 390 496 435Q474 472 429 463Q381 454 372 416Q362 374 389 344Q402 330 424 321Z"/>
      <path className="dg-pancreas" d="M350 456Q407 429 478 453Q454 489 391 498Q366 494 350 456Z"/>
      <path className="dg-pancreatic-duct" d="M370 469Q411 471 458 463"/>
      <path className="dg-duodenum" d="M445 465Q500 478 500 520Q500 558 454 570"/>

      <path className="dg-large dg-colon ascending" d="M286 515Q250 565 264 690"/>
      <path className="dg-large dg-colon transverse" d="M285 515Q380 482 478 515"/>
      <path className="dg-large dg-colon descending" d="M478 515Q510 565 496 690"/>
      <path className="dg-large dg-colon sigmoid" d="M496 690Q475 735 430 742Q395 744 381 767"/>
      <path className="dg-cecum" d="M263 681Q244 705 263 730Q286 739 299 718Q301 694 286 681Z"/>
      <path className="dg-appendix" d="M263 724Q236 746 246 780"/>

      <path className="dg-small" d="M310 535Q360 503 421 532Q455 552 426 578Q399 599 429 620Q451 641 420 663Q388 687 348 664Q317 646 346 623Q376 602 342 582Q309 563 310 535Z"/>
      <path className="dg-small inner" d="M328 545Q362 525 398 544Q417 558 396 574Q373 592 399 609Q418 624 397 641Q372 660 348 643Q327 629 348 611Q369 594 348 580Q326 565 328 545Z"/>

      <path className="dg-rectum" d="M381 767V826"/>
      <path className="dg-anus" d="M364 826Q381 842 398 826"/>
      <path className="dg-route" d="M380 94Q384 120 382 145V318Q411 338 427 366Q439 398 425 430Q412 459 466 480Q494 493 492 520Q486 553 454 570Q422 589 429 620Q444 657 411 680Q388 701 390 742Q383 774 381 824"/>

      <g className="dg-labels left">
        <text x="106" y="54">salivary glands</text><path d="M205 50L338 61"/>
        <text x="108" y="112">mouth</text><path d="M158 108L342 84"/>
        <text x="96" y="164">pharynx</text><path d="M160 160L372 130"/>
        <text x="82" y="230">oesophagus</text><path d="M165 226L372 220"/>
        <text x="95" y="320">liver</text><path d="M142 316L260 314"/>
        <text x="62" y="382">gall bladder</text><path d="M160 378L326 385"/>
        <text x="50" y="430">common bile duct</text><path d="M175 426L360 420"/>
        <text x="62" y="560">ascending colon</text><path d="M170 556L268 555"/>
        <text x="115" y="700">cecum</text><path d="M162 696L255 700"/>
        <text x="100" y="770">appendix</text><path d="M160 766L243 755"/>
      </g>

      <g className="dg-labels right">
        <text x="586" y="336">stomach</text><path d="M500 332L575 332"/>
        <text x="586" y="438">pancreas</text><path d="M474 462L575 438"/>
        <text x="586" y="482">pancreatic duct</text><path d="M456 470L575 478"/>
        <text x="586" y="536">duodenum</text><path d="M500 520L575 532"/>
        <text x="586" y="585">small intestine</text><path d="M430 580L575 580"/>
        <text x="586" y="520">transverse colon</text><path d="M472 512L575 512"/>
        <text x="586" y="625">descending colon</text><path d="M498 615L575 620"/>
        <text x="586" y="718">sigmoid colon</text><path d="M470 716L575 714"/>
        <text x="586" y="790">rectum</text><path d="M392 786L575 786"/>
        <text x="586" y="838">anus</text><path d="M400 833L575 833"/>
      </g>

      <text className="dg-caption" x="380" y="882" textAnchor="middle">food pathway through the alimentary canal, with accessory digestive organs</text>
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
