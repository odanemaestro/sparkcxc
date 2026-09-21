import React,{useMemo,useState} from "react";
import "./teethFunctionExplorer.css";

const TYPES=[
  {name:"Incisor",shape:"Chisel-shaped edge",function:"Biting and cutting",count:"8 in a full adult set"},
  {name:"Canine",shape:"Pointed crown",function:"Gripping and tearing",count:"4 in a full adult set"},
  {name:"Premolar",shape:"Broad crown with cusps",function:"Crushing and grinding",count:"8 in a full adult set"},
  {name:"Molar",shape:"Large broad crown with several cusps",function:"Crushing and grinding",count:"12 in a full adult set, including wisdom teeth"},
];

function ToothShape({type}){
  const common=<>
    <path className="tf-enamel-line" d="M42 62Q70 48 98 62" />
    <path className="tf-pulp-line" d="M70 72V132" />
  </>;

  if(type==="Incisor") return <svg viewBox="0 0 140 180" role="img" aria-label="Incisor tooth with chisel-shaped crown and single root">
    <path className="tf-tooth" d="M35 34Q70 18 105 34L101 75Q95 96 84 112L79 165Q70 174 61 165L56 112Q45 96 39 75Z" />
    <path className="tf-edge" d="M40 38Q70 29 100 38" />
    {common}
  </svg>;

  if(type==="Canine") return <svg viewBox="0 0 140 180" role="img" aria-label="Canine tooth with pointed crown and long single root">
    <path className="tf-tooth" d="M39 46Q54 20 70 11Q86 20 101 46L96 79Q91 100 81 113L77 169Q70 177 63 169L59 113Q49 100 44 79Z" />
    <path className="tf-edge" d="M43 48Q56 32 70 19Q84 32 97 48" />
    {common}
  </svg>;

  if(type==="Premolar") return <svg viewBox="0 0 140 180" role="img" aria-label="Premolar tooth with two cusps and two roots">
    <path className="tf-tooth" d="M29 48Q42 24 58 35Q70 18 82 35Q98 24 111 48L105 82Q99 103 86 116L89 159Q84 171 76 159L70 121L64 159Q56 171 51 159L54 116Q41 103 35 82Z" />
    <path className="tf-edge" d="M33 50Q45 35 58 43Q70 28 82 43Q95 35 107 50" />
    {common}
  </svg>;

  return <svg viewBox="0 0 140 180" role="img" aria-label="Molar tooth with broad multi-cusped crown and multiple roots">
    <path className="tf-tooth" d="M20 52Q30 25 47 36Q58 20 70 36Q82 20 93 36Q110 25 120 52L114 88Q108 105 95 116L101 157Q98 171 88 160L78 122L75 162Q70 176 65 162L62 122L52 160Q42 171 39 157L45 116Q32 105 26 88Z" />
    <path className="tf-edge" d="M25 54Q34 37 47 45Q58 31 70 45Q82 31 93 45Q106 37 115 54" />
    {common}
  </svg>;
}

function TypesView(){
  return <div className="spark-teeth-types">{TYPES.map((item,i)=><article key={item.name}>
    <span>{i+1}</span>
    <div className="spark-tooth-shape"><ToothShape type={item.name}/></div>
    <div><b>{item.name}</b><strong>{item.function}</strong><p>{item.shape}</p><small>{item.count}</small></div>
  </article>)}</div>;
}

function StructureView(){
  return <div className="spark-tooth-structure-view">
    <svg className="spark-tooth-structure-svg" viewBox="0 0 760 620" role="img" aria-label="Cross-section of a tooth showing enamel, dentine, pulp cavity, nerves, blood vessels, gum, jaw bone, crown, neck and root">
      <path className="ts-jaw" d="M70 395Q150 350 240 372Q310 390 380 370Q465 344 555 378Q630 405 700 390V590H70Z"/>
      <path className="ts-gum" d="M70 350Q150 305 245 338Q305 360 380 338Q470 305 555 340Q630 365 700 350V430Q615 445 540 414Q465 388 380 414Q305 441 235 417Q150 390 70 420Z"/>

      <path className="ts-enamel" d="M220 80Q285 35 380 45Q475 35 540 80Q568 108 553 180Q543 225 522 274Q505 312 490 350L468 482Q458 555 414 560Q382 555 380 492Q378 555 346 560Q302 555 292 482L270 350Q255 312 238 274Q217 225 207 180Q192 108 220 80Z"/>
      <path className="ts-dentine" d="M247 102Q304 68 380 76Q456 68 513 102Q532 126 521 180Q512 221 493 264Q474 305 461 344L445 474Q440 515 414 520Q394 512 392 466L388 353Q384 329 380 312Q376 329 372 353L368 466Q366 512 346 520Q320 515 315 474L299 344Q286 305 267 264Q248 221 239 180Q228 126 247 102Z"/>
      <path className="ts-pulp" d="M315 180Q345 160 380 166Q415 160 445 180Q456 215 444 263Q430 306 414 333L405 458Q402 483 388 486Q380 477 380 452Q380 477 372 486Q358 483 355 458L346 333Q330 306 316 263Q304 215 315 180Z"/>

      <path className="ts-nerve" d="M374 486V330Q357 287 356 220M386 486V330Q405 285 408 216"/>
      <path className="ts-vessel one" d="M363 490V336Q347 300 340 255"/>
      <path className="ts-vessel two" d="M397 490V336Q415 300 424 250"/>

      <line className="ts-crown-line" x1="178" y1="95" x2="178" y2="330"/>
      <line className="ts-root-line" x1="178" y1="360" x2="178" y2="555"/>
      <text className="ts-region-label" x="160" y="210" textAnchor="end">crown</text>
      <text className="ts-region-label" x="160" y="356" textAnchor="end">neck</text>
      <text className="ts-region-label" x="160" y="470" textAnchor="end">root</text>

      <g className="ts-callouts">
        <path d="M488 110L610 80"/><text x="625" y="84">enamel</text>
        <path d="M470 165L610 145"/><text x="625" y="150">dentine</text>
        <path d="M430 230L610 225"/><text x="625" y="230">pulp cavity</text>
        <path d="M405 360L610 310"/><text x="625" y="315">nerves and blood vessels</text>
        <path d="M518 385L610 390"/><text x="625" y="395">gum</text>
        <path d="M515 500L610 500"/><text x="625" y="505">jaw bone</text>
      </g>

      <text className="ts-caption" x="380" y="600" textAnchor="middle">tooth cross-section</text>
    </svg>
    <div className="spark-tooth-structure-notes">
      <article><b>Enamel</b><p>Hard outer covering of the crown. It protects the tooth from wear and acid attack.</p></article>
      <article><b>Dentine</b><p>Hard tissue beneath enamel. It forms most of the tooth and is less resistant to decay than enamel.</p></article>
      <article><b>Pulp cavity</b><p>Contains nerves and blood vessels that keep the living tissues supplied.</p></article>
      <article><b>Root and supporting tissues</b><p>The root anchors the tooth in the jaw. Gum and jaw bone support the tooth around the socket.</p></article>
    </div>
  </div>;
}

function FormulaView(){
  return <div className="spark-dental-formula">
    <article><span>ONE SIDE OF UPPER JAW</span><strong>2 incisors + 1 canine + 2 premolars + 3 molars</strong></article>
    <article><span>ONE SIDE OF LOWER JAW</span><strong>2 incisors + 1 canine + 2 premolars + 3 molars</strong></article>
    <div className="spark-dental-total"><b>Adult dental formula</b><strong>2.1.2.3 / 2.1.2.3 × 2 = 32 teeth</strong><p>The multiplication by 2 accounts for the left and right sides of the mouth.</p></div>
  </div>;
}

function ChewingView(){
  return <div className="spark-chewing-model">
    <article><span>1</span><div><b>Large food piece</b><p>Small surface area relative to volume.</p></div></article>
    <div className="spark-chewing-arrow" aria-hidden="true">→</div>
    <article><span>2</span><div><b>Chewing</b><p>Mechanical digestion breaks food into smaller pieces.</p></div></article>
    <div className="spark-chewing-arrow" aria-hidden="true">→</div>
    <article><span>3</span><div><b>Smaller pieces</b><p>Greater total surface area allows digestive enzymes to act more effectively.</p></div></article>
  </div>;
}

function HealthView(){
  const [stage,setStage]=useState("decay");
  const cards={
    decay:{
      title:"How tooth decay develops",
      steps:["Plaque containing bacteria builds up","Bacteria use sugars from food","Acids are produced","Acid dissolves mineral from enamel","A cavity can develop and spread into dentine"],
      note:"Frequent exposure to sugary foods and drinks increases the time teeth are exposed to acid attack.",
    },
    prevention:{
      title:"Reducing tooth decay and gum disease",
      steps:["Brush twice daily with fluoride toothpaste","Clean between teeth with floss or another suitable interdental method","Limit frequent sugary snacks and drinks","Visit a dental professional regularly","Use appropriate fluoride exposure"],
      note:"Fluoride strengthens enamel and makes it more resistant to acid attack.",
    },
    gum:{
      title:"Protecting the gums",
      steps:["Remove plaque regularly","Clean along the gum line","Clean between teeth","Seek dental care for persistent bleeding, swelling or pain"],
      note:"Plaque at the gum margin can trigger inflammation and contribute to gum disease.",
    },
  };
  const item=cards[stage];
  return <div className="spark-dental-health"><div className="spark-dental-health-buttons">{Object.entries(cards).map(([key,val])=><button type="button" key={key} className={stage===key?"active":""} onClick={()=>setStage(key)}>{val.title}</button>)}</div><article><h4>{item.title}</h4>{item.steps.map((step,i)=><div key={step}><span>{i+1}</span><p>{step}</p></div>)}<strong>{item.note}</strong></article></div>;
}

export default function TeethFunctionExplorer(){
  const [view,setView]=useState("types");
  const summary=useMemo(()=>({
    types:"Tooth shape matches function during mechanical digestion.",
    structure:"A tooth has specialised layers and supporting tissues that protect living pulp and anchor the tooth in the jaw.",
    formula:"A complete adult dentition contains 32 teeth when third molars are present.",
    chewing:"Chewing increases the surface area of food available to digestive enzymes.",
    health:"Plaque control, fluoride and sensible sugar intake help protect teeth and gums.",
  })[view],[view]);

  return <section className="spark-teeth-function">
    <header><span>TEETH AND DIGESTION</span><h3>Relate tooth structure to cutting, tearing, crushing and grinding</h3><p>Teeth begin mechanical digestion by breaking food into smaller pieces before enzyme-controlled chemical digestion continues.</p></header>
    <div className="spark-teeth-tabs">{[["types","Tooth types"],["structure","Tooth structure"],["formula","Dental formula"],["chewing","Why chew?"],["health","Dental health"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-teeth-stage">
      {view==="types"&&<TypesView/>}
      {view==="structure"&&<StructureView/>}
      {view==="formula"&&<FormulaView/>}
      {view==="chewing"&&<ChewingView/>}
      {view==="health"&&<HealthView/>}
    </div>
    <div className="spark-teeth-summary"><strong>{summary}</strong><span>Enamel is the hardest substance in the human body. The pulp cavity contains nerves and blood vessels, while the root anchors the tooth in its socket.</span></div>
  </section>;
}

export { TYPES };
