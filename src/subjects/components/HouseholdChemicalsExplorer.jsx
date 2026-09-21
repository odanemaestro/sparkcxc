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
  return <article className={"spark-hazard-card "+type}>
    <svg className="spark-ghs-hazard-svg" viewBox="0 0 140 140" role="img" aria-label={label+" hazard pictogram"}>
      <polygon className="hc-diamond" points="70,8 132,70 70,132 8,70"/>
      {type==="flammable"&&<g className="hc-flame">
        <path className="hc-black" d="M72 111Q42 98 49 72Q53 58 65 49Q62 65 72 66Q66 45 82 27Q83 48 96 60Q108 72 103 90Q98 106 83 112Q87 99 79 91Q78 104 72 111Z"/>
      </g>}
      {type==="corrosive"&&<g className="hc-corrosion">
        <path className="hc-tube" d="M30 33L50 39L43 60L23 54Z"/><path className="hc-tube" d="M79 31L99 38L91 59L71 52Z"/>
        <path className="hc-liquid-stream" d="M41 58Q45 68 49 75"/><path className="hc-liquid-stream" d="M88 57Q83 67 80 76"/>
        <circle className="hc-black" cx="50" cy="78" r="5"/><circle className="hc-black" cx="79" cy="79" r="5"/>
        <path className="hc-hand" d="M22 94Q36 89 49 94L62 101Q68 107 61 113H35Q28 109 22 103Z"/>
        <path className="hc-metal-bar" d="M73 99H113V110H73Z"/><path className="hc-corrosion-bite" d="M88 99Q94 91 100 99Q105 92 111 99"/>
      </g>}
      {type==="toxic"&&<g className="hc-skull-crossbones">
        <path className="hc-crossbone" d="M29 105L107 73M31 74L105 106"/>
        <circle className="hc-black" cx="69" cy="59" r="23"/>
        <circle className="hc-white" cx="61" cy="55" r="6"/><circle className="hc-white" cx="77" cy="55" r="6"/>
        <path className="hc-white" d="M62 70H76L73 80H65Z"/>
      </g>}
      {type==="explosive"&&<g className="hc-explosion">
        <path className="hc-black" d="M37 92Q43 72 58 68Q69 65 77 73Q84 82 77 96Q68 109 50 107Q39 104 37 92Z"/>
        <path className="hc-fragment" d="M61 61L55 39L69 48L76 27L83 51L103 38L94 61L118 60L98 72L118 84L92 82L101 107L82 91"/>
        <circle className="hc-black" cx="42" cy="61" r="5"/><circle className="hc-black" cx="107" cy="102" r="5"/>
      </g>}
      {type==="irritant"&&<g className="hc-exclamation">
        <path className="hc-black" d="M62 34H78L75 82H65Z"/><circle className="hc-black" cx="70" cy="101" r="9"/>
      </g>}
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
