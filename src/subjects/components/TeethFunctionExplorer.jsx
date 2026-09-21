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
    formula:"A complete adult dentition contains 32 teeth when third molars are present.",
    chewing:"Chewing increases the surface area of food available to digestive enzymes.",
    health:"Plaque control, fluoride and sensible sugar intake help protect teeth and gums.",
  })[view],[view]);

  return <section className="spark-teeth-function">
    <header><span>TEETH AND DIGESTION</span><h3>Relate tooth structure to cutting, tearing, crushing and grinding</h3><p>Teeth begin mechanical digestion by breaking food into smaller pieces before enzyme-controlled chemical digestion continues.</p></header>
    <div className="spark-teeth-tabs">{[["types","Tooth types"],["formula","Dental formula"],["chewing","Why chew?"],["health","Dental health"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-teeth-stage">
      {view==="types"&&<TypesView/>}
      {view==="formula"&&<FormulaView/>}
      {view==="chewing"&&<ChewingView/>}
      {view==="health"&&<HealthView/>}
    </div>
    <div className="spark-teeth-summary"><strong>{summary}</strong><span>Enamel is the hardest substance in the human body. The pulp cavity contains nerves and blood vessels, while the root anchors the tooth in its socket.</span></div>
  </section>;
}

export { TYPES };
