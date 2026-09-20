import React,{useMemo,useState} from "react";
import "./teethFunctionExplorer.css";

const TYPES=[
  {name:"Incisor",shape:"Chisel-shaped edge",function:"Biting and cutting",count:"8 in a full adult set"},
  {name:"Canine",shape:"Pointed crown",function:"Gripping and tearing",count:"4 in a full adult set"},
  {name:"Premolar",shape:"Broad crown with cusps",function:"Crushing and grinding",count:"8 in a full adult set"},
  {name:"Molar",shape:"Large broad crown with several cusps",function:"Crushing and grinding",count:"12 in a full adult set, including wisdom teeth"},
];

function TypesView(){
  return <div className="spark-teeth-types">{TYPES.map((item,i)=><article key={item.name}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.function}</strong><p>{item.shape}</p><small>{item.count}</small></div></article>)}</div>;
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
