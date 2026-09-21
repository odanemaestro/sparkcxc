import React,{useMemo,useState} from "react";
import "./cleaningAgentsEffectsExplorer.css";

const CASES=[
  {id:"scour",agent:"Scouring powder",surface:"Non-stick pan",result:"Avoid",why:"Abrasive particles can scratch and remove the non-stick coating."},
  {id:"scale",agent:"Vinegar",surface:"Kettle scale",result:"Suitable",why:"Acid reacts with calcium carbonate scale and helps dissolve it."},
  {id:"oven",agent:"Strong oven cleaner",surface:"Greasy oven",result:"Suitable with label precautions",why:"Strong alkalis such as sodium hydroxide react with fats and grease through saponification."},
  {id:"aluminium",agent:"Strong alkali / oven cleaner",surface:"Aluminium utensil",result:"Avoid",why:"Strong alkali attacks aluminium and can corrode the surface."},
  {id:"bleachcloth",agent:"Bleach",surface:"Coloured fabric",result:"Use only if label permits",why:"Oxidising bleach can remove dyes and weaken some fibres."},
  {id:"silver",agent:"Bleach",surface:"Silver jewellery",result:"Avoid",why:"Bleach can chemically attack and tarnish or corrode silver."},
  {id:"zinc",agent:"Acid cleaner",surface:"Galvanised zinc coating",result:"Avoid",why:"Acid reacts with zinc and can dissolve the protective coating."},
  {id:"rust",agent:"Acid rust remover",surface:"Iron oxide rust",result:"Purpose-specific",why:"Acids can dissolve iron oxides, but misuse can also attack the underlying metal."}
];

function MatchView(){
  const [id,setId]=useState("scale");
  const c=CASES.find(x=>x.id===id);
  return <div className="spark-cleaning-match">
    <div className="spark-cleaning-buttons">{CASES.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.agent} → {x.surface}</button>)}</div>
    <article className={c.result==="Avoid"?"avoid":"ok"}><span>{c.result.toUpperCase()}</span><h4>{c.agent} on {c.surface}</h4><p>{c.why}</p></article>
  </div>;
}

function AbrasionView(){
  const [abrasive,setAbrasive]=useState(false);
  return <div className="spark-abrasion-view">
    <div className="spark-cleaning-toggle"><button type="button" className={!abrasive?"active":""} onClick={()=>setAbrasive(false)}>Soft cleaner</button><button type="button" className={abrasive?"active":""} onClick={()=>setAbrasive(true)}>Scouring powder</button></div>
    <div className="spark-coated-surface"><div className={abrasive?"spark-coating scratched":"spark-coating"}></div><div className="spark-pan-base">base material</div>{abrasive&&<div className="spark-abrasive-grains">•• •• •••</div>}</div>
    <p>{abrasive?"Abrasive particles remove stains by rubbing, but the same action can scratch polished silver or damage a non-stick coating.":"A non-abrasive cleaner can remove suitable soils while preserving delicate surface coatings."}</p>
  </div>;
}

function ScaleView(){
  return <div className="spark-scale-cleaning">
    <div className="spark-scale-kettle"><div className="spark-scale-layer">CaCO₃ scale</div><div className="spark-vinegar-layer">vinegar / weak acid</div></div>
    <div className="spark-scale-equation"><span>acid</span><b>+</b><span>calcium carbonate</span><b>→</b><span>calcium salt + water + carbon dioxide</span></div>
    <p>Weak household acids can react with calcium carbonate scale. The exact product depends on the acid used.</p>
  </div>;
}

function AlkaliView(){
  return <div className="spark-alkali-cleaning">
    <article><span>GREASE</span><h4>Strong alkali can break down fats</h4><p>Sodium hydroxide in some oven cleaners reacts with fats, forming soap-like products that are easier to remove.</p></article>
    <article><span>ALUMINIUM</span><h4>The same alkali can attack metal</h4><p>Strong alkalis react with aluminium, so an oven cleaner suitable for one surface may damage an aluminium utensil.</p></article>
    <article><span>SKIN</span><h4>Corrosive hazard</h4><p>Strong alkalis can cause chemical burns. Follow the label and use the protective equipment specified by the manufacturer.</p></article>
  </div>;
}

function BleachView(){
  return <div className="spark-bleach-effects">
    <article><span>DISINFECTION / STAIN REMOVAL</span><h4>Useful oxidising action</h4><p>Bleach can destroy many coloured stain molecules and microorganisms.</p></article>
    <article><span>FABRIC COLOUR</span><h4>Can remove dyes</h4><p>The same oxidising action can fade or remove fabric colours and weaken fibres if misused.</p></article>
    <article><span>METALS</span><h4>Can promote corrosion</h4><p>Bleach can attack metals including silver and aluminium, so compatibility instructions matter.</p></article>
  </div>;
}

function RuleView(){
  return <div className="spark-cleaning-rules">
    <article><span>1</span><h4>Identify the soil</h4><p>Grease, mineral scale, rust and food residue need different chemistry.</p></article>
    <article><span>2</span><h4>Identify the surface</h4><p>Glass, stainless steel, aluminium, silver, non-stick coatings and fabrics tolerate different cleaners.</p></article>
    <article><span>3</span><h4>Read the label</h4><p>Use only on approved surfaces, at the recommended concentration and contact time.</p></article>
    <article><span>4</span><h4>Protect yourself</h4><p>Use ventilation and gloves or eye protection when the label requires them.</p></article>
  </div>;
}

export default function CleaningAgentsEffectsExplorer(){
  const [view,setView]=useState("match");
  const summary=useMemo(()=>({
    match:"A cleaner that works well on one soil or surface can damage another.",
    abrasion:"Abrasives clean by mechanical rubbing and can scratch delicate coatings.",
    scale:"Weak acids can dissolve calcium-carbonate scale.",
    alkali:"Strong alkalis remove grease but can corrode aluminium and burn skin.",
    bleach:"Oxidising bleach disinfects and removes stains but can damage dyes, fibres and metals.",
    rules:"Choose cleaners by matching the soil, surface and product label."
  })[view],[view]);

  return <section className="spark-cleaning-effects">
    <header><span>CLEANING AGENTS AND SURFACES</span><h3>Predict when a cleaner will help and when it will damage a household item</h3><p>Cleaning works through abrasion, dissolution, oxidation, acid-base chemistry and surfactant action. The same chemical effect can clean one material while damaging another.</p></header>
    <div className="spark-cleaning-tabs">{[["match","Cleaner matcher"],["abrasion","Abrasion"],["scale","Lime scale"],["alkali","Strong alkalis"],["bleach","Bleach"],["rules","Safe selection"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-cleaning-stage">{view==="match"&&<MatchView/>}{view==="abrasion"&&<AbrasionView/>}{view==="scale"&&<ScaleView/>}{view==="alkali"&&<AlkaliView/>}{view==="bleach"&&<BleachView/>}{view==="rules"&&<RuleView/>}</div>
    <div className="spark-cleaning-summary"><strong>{summary}</strong><span>Do not assume “stronger cleaner” means “better cleaner”. Surface compatibility matters.</span></div>
  </section>;
}
