import React,{useMemo,useState} from "react";
import "./householdChemicalsExplorer.css";

function ProductView(){
  const [id,setId]=useState("water");
  const data={
    water:{name:"Water",use:"Most common household solvent",why:"Dissolves many salts, sugars and cleaning residues."},
    bleach:{name:"Bleach",use:"Disinfecting and stain removal",why:"Household bleach contains sodium hypochlorite, an oxidising disinfectant."},
    acetone:{name:"Acetone",use:"Nail-polish removal",why:"Dissolves many nail-polish resins that water does not remove well."},
    turpentine:{name:"Turpentine / paint solvent",use:"Removing oil-based paint from brushes",why:"Non-aqueous solvent for oil-based paint."},
    ammonia:{name:"Ammonia solution",use:"Cleaning glass and hard surfaces",why:"Helps remove grease and some residues."},
    spirit:{name:"Methylated spirit",use:"Cleaning glass and some ink or grease stains",why:"Alcohol-based solvent for substances that do not dissolve well in water."},
    antacid:{name:"Antacid",use:"Relieving acid indigestion",why:"Contains basic substances that neutralise excess stomach acid."},
    baking:{name:"Baking powder",use:"Making cakes rise",why:"Releases carbon dioxide during baking, expanding bubbles in the batter."}
  }[id];
  return <div className="spark-housechem-products">
    <div className="spark-housechem-buttons">{Object.keys({water:1,bleach:1,acetone:1,turpentine:1,ammonia:1,spirit:1,antacid:1,baking:1}).map(k=><button type="button" key={k} className={id===k?"active":""} onClick={()=>setId(k)}>{k==="spirit"?"Methylated spirit":k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data.name.toUpperCase()}</span><h4>{data.use}</h4><p>{data.why}</p></article>
  </div>;
}

function HazardIcon({type,label}){
  return <article className="spark-hazard-card">
    <svg viewBox="0 0 120 120" role="img" aria-label={label+" hazard symbol"}>
      <polygon className="hc-diamond" points="60,7 113,60 60,113 7,60"/>
      {type==="flammable"&&<path className="hc-black" d="M60 87Q38 77 47 54Q51 65 57 63Q51 48 63 31Q65 48 75 56Q84 69 72 84Z"/>}
      {type==="corrosive"&&<><rect className="hc-black" x="29" y="79" width="62" height="9"/><path className="hc-line" d="M38 36L55 50M70 36L85 50"/><circle className="hc-black" cx="54" cy="61" r="4"/><circle className="hc-black" cx="78" cy="64" r="4"/></>}
      {type==="toxic"&&<><circle className="hc-black" cx="60" cy="48" r="15"/><circle className="hc-white" cx="54" cy="46" r="4"/><circle className="hc-white" cx="66" cy="46" r="4"/><path className="hc-line thick" d="M39 73L81 92M39 92L81 73"/></>}
      {type==="explosive"&&<><circle className="hc-black" cx="57" cy="69" r="10"/><path className="hc-line" d="M57 53V34M71 57L85 43M74 70H94M70 82L85 98M46 56L32 43"/></>}
      {type==="irritant"&&<><rect className="hc-black" x="55" y="31" width="10" height="39" rx="3"/><circle className="hc-black" cx="60" cy="84" r="6"/></>}
    </svg>
    <b>{label}</b>
  </article>;
}

function HazardView(){
  return <div className="spark-housechem-hazards"><HazardIcon type="flammable" label="Flammable"/><HazardIcon type="corrosive" label="Corrosive"/><HazardIcon type="toxic" label="Toxic"/><HazardIcon type="explosive" label="Explosive"/><HazardIcon type="irritant" label="Irritant / harmful"/></div>;
}

function MixingView(){
  const [mix,setMix]=useState("safe");
  return <div className="spark-housechem-mixing">
    <div className="spark-housechem-toggle"><button type="button" className={mix==="safe"?"active":""} onClick={()=>setMix("safe")}>Use one cleaner as directed</button><button type="button" className={mix==="danger"?"active":""} onClick={()=>setMix("danger")}>Bleach + ammonia cleaner</button></div>
    {mix==="safe"?<article className="safe"><span>SAFER PRACTICE</span><h4>Follow the label and do not invent mixtures</h4><p>Use household chemicals only for their intended purpose, with ventilation and protective measures stated on the product label.</p></article>:<article className="danger"><span>DANGEROUS MIXTURE</span><h4>Never mix bleach with ammonia-based cleaners</h4><p>The reaction can release toxic chloramine gases. Leave the products separate and follow the manufacturer label.</p></article>}
  </div>;
}

function StorageView(){
  return <div className="spark-housechem-storage">
    <article><span>ORIGINAL CONTAINER</span><h4>Keep the label</h4><p>Store household chemicals in their original labelled containers so users know the contents, hazards and instructions.</p></article>
    <article><span>NEVER A DRINK BOTTLE</span><h4>Prevent accidental swallowing</h4><p>Do not transfer cleaners or solvents into soft-drink or water bottles that could be mistaken for beverages.</p></article>
    <article><span>CHILD SAFETY</span><h4>Store securely</h4><p>Keep hazardous products closed and out of reach of children and pets.</p></article>
    <article><span>FLAMMABLE PRODUCTS</span><h4>Keep away from flames and heat</h4><p>Alcohols, acetone and some solvents can ignite easily.</p></article>
  </div>;
}

function EconomyView(){
  return <div className="spark-housechem-economy">
    <article><span>USE THE RECOMMENDED AMOUNT</span><h4>More is not always better</h4><p>Correct dosing reduces waste, cost and unnecessary chemical release into drains.</p></article>
    <article><span>BUY APPROPRIATELY</span><h4>Bulk can reduce packaging and cost</h4><p>Bulk purchasing can be economical when the product will be used safely before deterioration and can be stored correctly.</p></article>
    <article><span>ECO-FRIENDLY CHOICE</span><h4>Prefer lower-impact products where suitable</h4><p>Biodegradable products that are effective at lower toxicity can reduce environmental harm when used as directed.</p></article>
  </div>;
}

function SanitiserView(){
  return <div className="spark-housechem-sanitiser">
    <article><span>ALCOHOL-BASED HAND SANITISER</span><h4>Used when soap and water are not available</h4><p>Alcohol-based sanitisers can reduce many microbes on hands. They are flammable and should be kept away from flames and heat.</p></article>
    <article><span>SOAP AND WATER</span><h4>Preferred when hands are visibly dirty</h4><p>Washing physically removes dirt and microbes and is important after activities that leave hands heavily soiled.</p></article>
  </div>;
}

export default function HouseholdChemicalsExplorer(){
  const [view,setView]=useState("products");
  const summary=useMemo(()=>({
    products:"Common household chemicals are chosen because their chemical properties match tasks such as dissolving, disinfecting, neutralising or releasing gas.",
    hazards:"Hazard pictograms communicate risks such as flammability, corrosiveness, acute toxicity and explosion.",
    mixing:"Bleach and ammonia-based cleaners must never be mixed because toxic gases can form.",
    storage:"Safe storage prevents accidental poisoning, fires and mistaken ingestion.",
    economy:"Correct dosing and appropriate purchasing reduce cost, waste and environmental release.",
    sanitiser:"Alcohol-based hand sanitisers are useful disinfecting products but are flammable."
  })[view],[view]);

  return <section className="spark-household-chemicals">
    <header><span>HOUSEHOLD CHEMICALS</span><h3>Match common chemicals to their uses and handle them safely</h3><p>Household chemicals include solvents, disinfectants, cleaners, medicines and cooking ingredients. Their benefits depend on correct use, safe storage and attention to hazard labels.</p></header>
    <div className="spark-housechem-tabs">{[["products","Uses"],["hazards","Hazard symbols"],["mixing","Mixing safety"],["storage","Storage"],["economy","Economical use"],["sanitiser","Hand sanitiser"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-housechem-stage">{view==="products"&&<ProductView/>}{view==="hazards"&&<HazardView/>}{view==="mixing"&&<MixingView/>}{view==="storage"&&<StorageView/>}{view==="economy"&&<EconomyView/>}{view==="sanitiser"&&<SanitiserView/>}</div>
    <div className="spark-housechem-summary"><strong>{summary}</strong><span>Never mix household cleaners unless the product label explicitly directs it.</span></div>
  </section>;
}
