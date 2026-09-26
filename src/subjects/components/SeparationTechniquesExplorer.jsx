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

function FiltrationView(){
 return <div className="spark-filtration-view">
  <svg viewBox="0 0 760 450" role="img" aria-label="Filtration apparatus showing mixture poured into filter paper with residue retained and filtrate collected">
    <defs><marker id="sep-filter-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="sep-arrow-head"/></marker></defs>
    <path className="sep-pour-beaker" d="M80 82H235L215 215H100Z"/>
    <path className="sep-muddy" d="M96 148H220L211 205H104Z"/>
    <path className="sep-pour-stream" d="M218 154Q286 167 330 212"/>
    <path className="sep-funnel" d="M285 180H475L405 302H355Z"/>
    <path className="sep-filter-paper" d="M309 193H451L399 280H361Z"/>
    <path className="sep-residue" d="M337 225Q380 245 423 225L399 267H361Z"/>
    <path className="sep-funnel-stem" d="M380 302V352"/>
    <path className="sep-flask-outline" d="M314 350H446L480 417H280Z"/>
    <path className="sep-filtrate" d="M305 393H455L467 417H293Z"/>
    <line className="sep-flow-arrow" x1="535" y1="208" x2="535" y2="336" markerEnd="url(#sep-filter-arrow)"/>
    <text className="sep-label" x="155" y="63" textAnchor="middle">sand + water</text>
    <text className="sep-label" x="380" y="164" textAnchor="middle">filter funnel + paper</text>
    <text className="sep-label" x="380" y="241" textAnchor="middle">residue</text>
    <text className="sep-label" x="380" y="438" textAnchor="middle">filtrate</text>
    <text className="sep-small" x="552" y="275">liquid passes through</text>
  </svg>
  <p>Filter paper traps an insoluble solid as the residue. The liquid passing through the paper is the filtrate.</p>
 </div>;
}

function DistillView(){
 return <div className="spark-distill-view">
  <svg viewBox="0 0 940 470" role="img" aria-label="Simple distillation apparatus with heated flask, thermometer, Liebig condenser, cooling water and receiver">
    <defs><marker id="sep-distill-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="sep-arrow-head"/></marker></defs>
    <path className="sep-round-flask" d="M205 170V208Q126 238 126 326Q126 397 215 397Q304 397 304 326Q304 238 225 208V170Z"/>
    <path className="sep-liquid" d="M145 314Q215 345 285 314V350Q215 381 145 350Z"/>
    <path className="sep-neck" d="M205 170V105H265"/>
    <line className="sep-thermometer" x1="215" y1="55" x2="215" y2="184"/>
    <circle className="sep-thermometer-bulb" cx="215" cy="184" r="10"/>
    <text className="sep-small" x="142" y="58">thermometer bulb near side arm</text>

    <path className="sep-vapour-tube" d="M265 105H405"/>
    <rect className="sep-condenser-jacket" x="390" y="72" width="320" height="72" rx="34"/>
    <line className="sep-condenser-tube" x1="405" y1="108" x2="695" y2="108"/>
    <line className="sep-vapour-arrow" x1="302" y1="108" x2="372" y2="108" markerEnd="url(#sep-distill-arrow)"/>
    <line className="sep-vapour-arrow" x1="445" y1="108" x2="535" y2="108" markerEnd="url(#sep-distill-arrow)"/>
    <line className="sep-vapour-arrow" x1="570" y1="108" x2="660" y2="108" markerEnd="url(#sep-distill-arrow)"/>

    <path className="sep-water-port" d="M430 72V34"/>
    <path className="sep-water-port" d="M670 144V184"/>
    <line className="sep-water-arrow" x1="670" y1="212" x2="670" y2="164" markerEnd="url(#sep-distill-arrow)"/>
    <line className="sep-water-arrow" x1="430" y1="60" x2="430" y2="24" markerEnd="url(#sep-distill-arrow)"/>
    <text className="sep-small" x="702" y="209">cold water in</text>
    <text className="sep-small" x="452" y="28">water out</text>

    <path className="sep-delivery" d="M695 108Q770 108 770 218"/>
    <path className="sep-receiver" d="M721 218H819L845 394H695Z"/>
    <path className="sep-distillate" d="M711 342H829L837 394H703Z"/>
    <text className="sep-label" x="770" y="326" textAnchor="middle">distillate</text>

    <path className="sep-tripod" d="M120 408H310M160 408L135 455M270 408L295 455"/>
    <path className="sep-flame" d="M215 450Q180 423 214 389Q248 423 215 450Z"/>
    <text className="sep-label" x="215" y="294" textAnchor="middle">mixture</text>
    <text className="sep-label" x="550" y="58" textAnchor="middle">Liebig condenser</text>
    <text className="sep-small" x="518" y="167" textAnchor="middle">vapour cools and condenses</text>
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
    <svg className="spark-crystallisation-svg" viewBox="0 0 1040 520" role="img" aria-label="Crystallisation process showing gentle heating of a solution, cooling to form crystals, then filtration and drying">
      <defs>
        <marker id="sep-crystal-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="sep-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g transform="translate(35 85)">
        <text className="sep-crystal-title" x="145" y="-25" textAnchor="middle">1. concentrate solution</text>
        <path className="sep-evap-dish" d="M45 115Q145 155 245 115L220 180Q145 215 70 180Z"/>
        <path className="sep-crystal-solution" d="M70 135Q145 165 220 135L205 172Q145 195 85 172Z"/>
        <path className="sep-tripod-small" d="M65 215H225M95 215L75 285M195 215L215 285"/>
        <path className="sep-flame-small" d="M145 300Q115 270 145 235Q175 270 145 300Z"/>
        <path className="sep-vapour-small" d="M105 98q12-18 24 0t24 0M155 85q12-18 24 0t24 0"/>
        <text className="sep-crystal-note" x="145" y="335" textAnchor="middle">heat gently to evaporate some solvent</text>
      </g>

      <path className="sep-process-arrow" d="M305 250H365" markerEnd="url(#sep-crystal-arrow)"/>

      <g transform="translate(365 85)">
        <text className="sep-crystal-title" x="145" y="-25" textAnchor="middle">2. cool concentrated solution</text>
        <path className="sep-crystal-beaker" d="M55 80V245Q55 270 80 270H210Q235 270 235 245V80"/>
        <line className="sep-crystal-rim" x1="40" y1="80" x2="250" y2="80"/>
        <path className="sep-crystal-solution cool" d="M55 150H235V245Q235 270 210 270H80Q55 270 55 245Z"/>
        {[[95,215],[135,235],[175,205],[205,238],[150,185]].map(([x,y],i)=><polygon key={i} className="sep-crystal-solid" points={`${x},${y-12} ${x+11},${y} ${x},${y+12} ${x-11},${y}`}/>)}
        <path className="sep-cooling-arrow" d="M265 140Q300 175 270 215" markerEnd="url(#sep-crystal-arrow)"/>
        <text className="sep-crystal-note" x="145" y="335" textAnchor="middle">solubility falls and crystals grow</text>
      </g>

      <path className="sep-process-arrow" d="M635 250H695" markerEnd="url(#sep-crystal-arrow)"/>

      <g transform="translate(690 70)">
        <text className="sep-crystal-title" x="145" y="-10" textAnchor="middle">3. filter and dry crystals</text>
        <path className="sep-crystal-funnel" d="M55 80H235L175 185H115Z"/>
        <path className="sep-crystal-paper" d="M75 95H215L168 172H122Z"/>
        <g className="sep-crystal-residue">
          {[[120,135],[145,145],[170,132],[190,150]].map(([x,y],i)=><polygon key={i} points={`${x},${y-9} ${x+9},${y} ${x},${y+9} ${x-9},${y}`}/>)}
        </g>
        <path className="sep-crystal-stem" d="M145 185V235"/>
        <path className="sep-crystal-flask" d="M85 235H205L230 320H60Z"/>
        <path className="sep-mother-liquor" d="M78 292H212L220 320H70Z"/>
        <text className="sep-crystal-label" x="255" y="140">crystals remain on paper</text><path className="sep-crystal-callout" d="M195 145L240 142"/>
        <text className="sep-crystal-label" x="245" y="292">mother liquor</text><path className="sep-crystal-callout" d="M205 300L235 294"/>
      </g>

      <g className="sep-crystal-key" transform="translate(355 430)">
        <rect x="0" y="0" width="330" height="62" rx="14"/>
        <text className="sep-crystal-note" x="165" y="25" textAnchor="middle">do not boil to dryness when good crystals are required</text>
        <text className="sep-crystal-note" x="165" y="47" textAnchor="middle">slow cooling generally gives larger, better-formed crystals</text>
      </g>
    </svg>
    <div className="spark-crystal-steps"><article><b>Heat gently</b><p>Evaporate some solvent until the solution becomes concentrated.</p></article><div>→</div><article><b>Cool slowly</b><p>Solubility decreases and crystals begin to form.</p></article><div>→</div><article><b>Filter and dry</b><p>Separate the crystals from remaining solution.</p></article></div>
    <aside><strong>Do not simply boil to dryness when good crystals are required.</strong><p>Slow cooling of a concentrated solution usually produces larger, better-formed crystals.</p></aside>
  </div>;
}

export default function SeparationTechniquesExplorer(){
  const [view,setView]=useState("selector");
  const summary=useMemo(()=>({
    selector:"Choose a separation technique by using physical differences such as solubility, particle size, boiling point or immiscibility.",
    filtration:"Filtration separates an insoluble solid from a liquid using filter paper.",
    sandsalt:"Sand and salt require more than one method: dissolve, filter, then evaporate or crystallise.",
    distill:"Distillation vaporises and then condenses a component so it can be collected.",
    chrom:"Chromatography separates dissolved substances because they travel at different rates.",
    funnel:"A separating funnel separates immiscible liquid layers.",
    crystals:"Crystallisation uses concentration followed by slow cooling to form crystals."
  })[view],[view]);
  return <section className="spark-separation-techniques">
    <header><span>SEPARATION TECHNIQUES</span><h3>Choose the method that matches the physical properties of the mixture</h3><p>Mixtures can be separated without changing the chemical identity of their components by exploiting differences in particle size, solubility, boiling point, movement or density.</p></header>
    <div className="spark-separation-tabs">{[["selector","Choose technique"],["filtration","Filtration"],["sandsalt","Sand + salt"],["distill","Distillation"],["chrom","Chromatography"],["funnel","Separating funnel"],["crystals","Crystallisation"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-separation-stage">{view==="selector"&&<SelectorView/>}{view==="filtration"&&<FiltrationView/>}{view==="sandsalt"&&<SandSaltView/>}{view==="distill"&&<DistillView/>}{view==="chrom"&&<ChromatographyView/>}{view==="funnel"&&<FunnelView/>}{view==="crystals"&&<CrystalsView/>}</div>
    <div className="spark-separation-summary"><strong>{summary}</strong><span>Salt water → evaporation if only salt is wanted; distillation if the water must be collected.</span></div>
  </section>;
}
