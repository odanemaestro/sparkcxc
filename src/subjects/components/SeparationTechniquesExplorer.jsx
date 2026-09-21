import React,{useMemo,useState} from "react";
import "./separationTechniquesExplorer.css";

const TECHNIQUES=[
  {id:"filtration",name:"Filtration",best:"Insoluble solid + liquid",example:"Sand from water; straining rice or pasta.",principle:"Particle size. Solid particles are trapped while liquid passes through."},
  {id:"evaporation",name:"Evaporation",best:"Recover dissolved solid when solvent is not needed",example:"Salt from sea water or salt ponds.",principle:"The solvent changes to vapour and leaves the dissolved solid behind."},
  {id:"crystallisation",name:"Crystallisation",best:"Obtain purer crystals from a solution",example:"Sugar crystals from concentrated cane juice.",principle:"Concentrate the solution, then cool so excess solute forms crystals."},
  {id:"distillation",name:"Distillation",best:"Recover a solvent or separate liquids with different boiling points",example:"Pure water from ink; alcohol-water separation in rum production.",principle:"One component boils, its vapour is cooled, then the liquid is collected."},
  {id:"chromatography",name:"Chromatography",best:"Separate dissolved coloured substances",example:"Dyes in food colouring or ink.",principle:"Components move at different rates because of different attractions to the mobile and stationary phases."},
  {id:"funnel",name:"Separating funnel",best:"Immiscible liquids",example:"Cooking oil and water.",principle:"The liquids form separate layers because they do not mix and usually have different densities."},
];

function SelectorView(){
  const [id,setId]=useState("filtration");
  const t=TECHNIQUES.find(x=>x.id===id);
  return <div className="spark-separation-selector">
    <div className="spark-separation-buttons">{TECHNIQUES.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{t.name.toUpperCase()}</span><h4>{t.best}</h4><strong>Example</strong><p>{t.example}</p><strong>Why it works</strong><p>{t.principle}</p></article>
  </div>;
}

function SandSaltView(){
  return <div className="spark-sand-salt">
    <article><span>1</span><b>Add water and stir</b><p>Salt dissolves but sand remains insoluble.</p></article><div>→</div>
    <article><span>2</span><b>Filter</b><p>Sand remains as residue; salt solution passes through as filtrate.</p></article><div>→</div>
    <article><span>3</span><b>Evaporate or crystallise</b><p>Remove water to recover the salt.</p></article>
  </div>;
}

function DistillView(){
 return <div className="spark-distill-view">
  <svg viewBox="0 0 900 420" role="img" aria-label="Simple distillation apparatus">
    <ellipse className="sep-flask" cx="190" cy="270" rx="95" ry="90"/>
    <path className="sep-liquid" d="M115 280Q190 315 265 280V315Q190 350 115 315Z"/>
    <path className="sep-vapour" d="M190 180V105H370"/>
    <rect className="sep-condenser" x="370" y="82" width="280" height="46" rx="22"/>
    <path className="sep-output" d="M650 105Q740 105 740 230"/>
    <rect className="sep-beaker" x="680" y="230" width="125" height="120" rx="8"/>
    <text className="sep-label" x="190" y="330" textAnchor="middle">mixture</text><text className="sep-label" x="510" y="65" textAnchor="middle">condenser</text><text className="sep-label" x="742" y="300" textAnchor="middle">distillate</text>
  </svg>
  <p>Distillation is useful when the solvent is required. For an alcohol-water mixture, the lower-boiling component becomes richer in the first vapour, although real beverage distillation produces mixtures rather than perfectly pure ethanol in one simple step.</p>
 </div>;
}

function ChromatographyView(){
  const [run,setRun]=useState(false);
  return <div className="spark-chromatography">
   <div className="spark-separation-toggle"><button type="button" className={!run?"active":""} onClick={()=>setRun(false)}>Before run</button><button type="button" className={run?"active":""} onClick={()=>setRun(true)}>After run</button></div>
   <div className="spark-paper-chrom">
    <div className="spark-solvent-front" style={{top:run?"15%":"80%"}}></div>
    <span className="spot a" style={{bottom:run?"58%":"12%"}}></span>
    <span className="spot b" style={{bottom:run?"35%":"12%"}}></span>
    <span className="spot c" style={{bottom:run?"18%":"12%"}}></span>
    <div className="spark-baseline"></div>
   </div>
   <p>{run?"Different dyes have moved different distances. Spots at the same height in different samples suggest a common dye under the same conditions.":"Samples are placed on a pencil baseline above the solvent before the chromatogram develops."}</p>
  </div>;
}

function FunnelView(){
  const [drain,setDrain]=useState(false);
  return <div className="spark-funnel-view">
    <div className="spark-separation-toggle"><button type="button" className={!drain?"active":""} onClick={()=>setDrain(false)}>Two layers</button><button type="button" className={drain?"active":""} onClick={()=>setDrain(true)}>Drain lower layer</button></div>
    <svg viewBox="0 0 500 420" role="img" aria-label="Separating funnel with oil and water layers">
      <path className="sf-body" d="M145 55Q145 30 175 30H325Q355 30 355 55L390 230L285 325H215L110 230Z"/>
      {!drain&&<><path className="sf-oil" d="M133 155H367L390 230L285 325H215L110 230Z"/><path className="sf-water" d="M180 235H320L285 325H215Z"/></>}
      {drain&&<><path className="sf-oil" d="M133 155H367L390 230L285 325H215L110 230Z"/><path className="sf-drip" d="M250 325V390"/></>}
      <rect className="sf-tap" x="225" y="323" width="50" height="16"/>
      <text className="sf-label" x="250" y="125" textAnchor="middle">oil</text><text className="sf-label" x="250" y="285" textAnchor="middle">{drain?"lower layer draining":"water"}</text>
    </svg>
    <p>Oil and water are immiscible, so they form separate layers. The denser lower layer can be released through the tap first.</p>
  </div>;
}

function CrystalsView(){
  return <div className="spark-crystals-view">
    <div className="spark-crystal-steps"><article><b>Heat gently</b><p>Evaporate some solvent until the solution becomes concentrated.</p></article><div>→</div><article><b>Cool slowly</b><p>Solubility decreases and crystals begin to form.</p></article><div>→</div><article><b>Filter and dry</b><p>Separate the crystals from remaining solution.</p></article></div>
    <aside><strong>Do not simply boil to dryness when good crystals are required.</strong><p>Slow cooling of a concentrated solution usually produces larger, better-formed crystals.</p></aside>
  </div>;
}

export default function SeparationTechniquesExplorer(){
  const [view,setView]=useState("selector");
  const summary=useMemo(()=>({
    selector:"Choose a separation technique by using physical differences such as solubility, particle size, boiling point or immiscibility.",
    sandsalt:"Sand and salt require more than one method: dissolve, filter, then evaporate or crystallise.",
    distill:"Distillation vaporises and then condenses a component so it can be collected.",
    chrom:"Chromatography separates dissolved substances because they travel at different rates.",
    funnel:"A separating funnel separates immiscible liquid layers.",
    crystals:"Crystallisation uses concentration followed by slow cooling to form crystals."
  })[view],[view]);
  return <section className="spark-separation-techniques">
    <header><span>SEPARATION TECHNIQUES</span><h3>Choose the method that matches the physical properties of the mixture</h3><p>Mixtures can be separated without changing the chemical identity of their components by exploiting differences in particle size, solubility, boiling point, movement or density.</p></header>
    <div className="spark-separation-tabs">{[["selector","Choose technique"],["sandsalt","Sand + salt"],["distill","Distillation"],["chrom","Chromatography"],["funnel","Separating funnel"],["crystals","Crystallisation"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-separation-stage">{view==="selector"&&<SelectorView/>}{view==="sandsalt"&&<SandSaltView/>}{view==="distill"&&<DistillView/>}{view==="chrom"&&<ChromatographyView/>}{view==="funnel"&&<FunnelView/>}{view==="crystals"&&<CrystalsView/>}</div>
    <div className="spark-separation-summary"><strong>{summary}</strong><span>Salt water → evaporation if only salt is wanted; distillation if the water must be collected.</span></div>
  </section>;
}
