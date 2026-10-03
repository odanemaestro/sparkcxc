import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
  const particles=Array.from({length:7},(_,i)=>i);
  return <div className="spark-abrasion-view">
    <div className="spark-cleaning-toggle"><button type="button" className={!abrasive?"active":""} onClick={()=>setAbrasive(false)}>Soft cleaner</button><button type="button" className={abrasive?"active":""} onClick={()=>setAbrasive(true)}>Scouring powder</button></div>
    <ReviewedScienceDiagram site="CleaningAgentsEffectsExplorer.jsx:29"><svg className="spark-abrasion-svg" viewBox="0 0 820 390" role="img" aria-label={abrasive?"Cross-section of a non-stick pan showing abrasive particles scraping grooves through the coating":"Cross-section of a non-stick pan showing an intact coating under a non-abrasive cleaner"}>
      <defs>
        <marker id="clean-abrasion-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="ca-arrow-head"/></marker>
      </defs>
      <rect className="ca-panel-bg" x="0" y="0" width="820" height="390" rx="20"/>
      <path className="ca-pan-base" d="M80 265H740V344Q740 358 726 358H94Q80 358 80 344Z"/>
      <path className="ca-nonstick-coating" d={abrasive?"M80 230H220V246H270L294 230H398V247H448L473 230H740V266H80Z":"M80 230H740V266H80Z"}/>
      <path className="ca-soil-layer" d="M110 207Q162 187 214 207Q268 185 321 207Q381 184 438 207Q501 185 558 207Q620 184 690 208V230H110Z"/>
      <text className="ca-label" x="115" y="321">base material</text>
      <line className="ca-leader" x1="248" y1="247" x2="154" y2="150" markerEnd="url(#clean-abrasion-arrow)"/>
      <text className="ca-label" x="88" y="135">non-stick coating</text>
      <line className="ca-leader" x1="414" y1="211" x2="414" y2="155" markerEnd="url(#clean-abrasion-arrow)"/>
      <text className="ca-label" x="414" y="134" textAnchor="middle">food soil / stain</text>
      {abrasive?particles.map((i)=>{
        const x=182+i*74;
        const y=128+(i%2)*18;
        return <g key={i} className="ca-abrasive-particle" transform={"translate("+x+" "+y+") rotate("+(i*17-36)+")"}>
          <path d="M-17 12L-5 -17L18 -8L13 15Z"/>
          <line className="ca-motion-line" x1="-31" y1="-7" x2="-7" y2="-7"/>
        </g>;
      }):<React.Fragment>
        <path className="ca-soft-cleaner" d="M165 106Q181 77 197 106Q211 130 181 139Q151 131 165 106Z"/>
        <path className="ca-soft-cleaner" d="M364 91Q380 62 396 91Q410 115 380 124Q350 116 364 91Z"/>
        <path className="ca-soft-cleaner" d="M569 108Q585 79 601 108Q615 132 585 141Q555 133 569 108Z"/>
      </React.Fragment>}
      {abrasive&&<React.Fragment>
        <path className="ca-scratch-groove" d="M244 229L269 246L295 229"/>
        <path className="ca-scratch-groove" d="M423 229L447 247L474 229"/>
        <line className="ca-leader danger" x1="269" y1="250" x2="612" y2="166" markerEnd="url(#clean-abrasion-arrow)"/>
        <text className="ca-label danger" x="626" y="151">coating scratched away</text>
        <text className="ca-small" x="410" y="378" textAnchor="middle">abrasive particles scrape the coating and can expose the base material</text>
      </React.Fragment>}
      {!abrasive&&<text className="ca-small" x="410" y="378" textAnchor="middle">non-abrasive cleaning leaves the protective coating continuous</text>}
    </svg></ReviewedScienceDiagram>
    <p>{abrasive?"Abrasive particles remove stains by rubbing, but the same action can scratch polished silver or damage a non-stick coating. Once the coating is cut through, the base material becomes exposed.":"A non-abrasive cleaner can loosen suitable soils while preserving a delicate surface coating."}</p>
  </div>;
}

function ScaleView(){
  const [treated,setTreated]=useState(false);
  return <div className="spark-scale-cleaning">
    <div className="spark-cleaning-toggle"><button type="button" className={!treated?"active":""} onClick={()=>setTreated(false)}>Before vinegar</button><button type="button" className={treated?"active":""} onClick={()=>setTreated(true)}>Weak acid added</button></div>
    <ReviewedScienceDiagram site="CleaningAgentsEffectsExplorer.jsx:71"><svg className="spark-scale-reaction-svg" viewBox="0 0 860 400" role="img" aria-label={treated?"Kettle wall cross-section showing weak acid reacting with calcium carbonate scale, carbon dioxide bubbles and thinning scale":"Kettle wall cross-section showing calcium carbonate scale deposited on the metal surface"}>
      <defs>
        <marker id="clean-scale-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="ca-arrow-head"/></marker>
      </defs>
      <rect className="ca-panel-bg" x="0" y="0" width="860" height="400" rx="20"/>
      <rect className="ca-kettle-metal" x="74" y="270" width="712" height="64" rx="7"/>
      <path className={treated?"ca-scale-layer reacting":"ca-scale-layer"} d={treated?"M74 224H175V242H242V229H315V246H390V231H465V244H540V226H615V241H684V229H786V270H74Z":"M74 205Q160 189 244 205Q333 188 421 205Q510 188 596 205Q686 188 786 206V270H74Z"}/>
      <rect className={treated?"ca-acid-layer active":"ca-acid-layer"} x="74" y="75" width="712" height={treated?"151":"130"} rx="16"/>
      <text className="ca-label" x="106" y="310">kettle metal</text>
      <line className="ca-leader" x1="168" y1="240" x2="126" y2="166" markerEnd="url(#clean-scale-arrow)"/>
      <text className="ca-label" x="92" y="149">CaCO₃ scale</text>
      <text className="ca-label" x="430" y="118" textAnchor="middle">vinegar / weak acid</text>
      {treated&&<React.Fragment>
        {[0,1,2,3,4,5,6,7].map(i=><circle key={i} className="ca-co2-bubble" cx={184+(i%4)*155} cy={175-Math.floor(i/4)*45-(i%2)*12} r={8+(i%3)*3}/>)}
        <text className="ca-small" x="617" y="149">CO₂ bubbles</text>
        <line className="ca-leader" x1="659" y1="159" x2="650" y2="190" markerEnd="url(#clean-scale-arrow)"/>
        <text className="ca-small" x="430" y="367" textAnchor="middle">acid reacts at the scale surface, so the calcium carbonate deposit becomes thinner</text>
      </React.Fragment>}
      {!treated&&<text className="ca-small" x="430" y="367" textAnchor="middle">hard-water heating leaves a calcium carbonate deposit on the metal surface</text>}
    </svg></ReviewedScienceDiagram>
    <div className="spark-scale-equation"><span>acid</span><b>+</b><span>calcium carbonate</span><b>→</b><span>calcium salt + water + carbon dioxide</span></div>
    <p>Weak household acids can react with calcium carbonate scale. Carbon dioxide bubbles are released as the scale dissolves. The exact calcium salt formed depends on the acid used.</p>
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
