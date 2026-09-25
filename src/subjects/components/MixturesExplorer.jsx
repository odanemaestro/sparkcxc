import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./mixturesExplorer.css";

const PARTICLES={
  solution:[[110,84],[145,112],[190,78],[236,116],[282,86],[326,122],[365,91],[128,158],[174,190],[222,156],[270,194],[318,160],[350,205],[150,232],[205,248],[258,226],[312,246],[365,238]],
  suspension:[[118,92],[178,126],[245,82],[315,132],[350,102],[135,188],[225,176],[300,206],[166,246],[248,258],[332,266]],
  colloid:[[110,88],[145,118],[190,82],[232,126],[278,94],[326,124],[366,90],[126,166],[171,198],[221,164],[271,202],[317,170],[356,214],[149,238],[202,252],[256,232],[309,250],[362,244]]
};

function ParticleModel({type}){
  const title=type==="solution"?"Solution particle model":type==="suspension"?"Suspension particle model":"Colloid particle model";
  return <div className="spark-mixture-particle-model">
    <ReviewedScienceDiagram site="MixturesExplorer.jsx:13"><svg className="spark-mixture-particle-svg" viewBox="0 0 470 330" role="img" aria-label={title}>
      <path className="mix-vessel" d="M76 38V270Q76 294 100 294H370Q394 294 394 270V38"/>
      <line className="mix-rim" x1="60" y1="38" x2="410" y2="38"/>
      <path className="mix-liquid" d="M76 78H394V270Q394 294 370 294H100Q76 294 76 270Z"/>
      {type==="solution"&&PARTICLES.solution.map(([cx,cy],i)=><circle key={i} className="mix-particle solution" cx={cx} cy={cy} r="5"/>)}
      {type==="suspension"&&<>
        {PARTICLES.suspension.map(([cx,cy],i)=><circle key={i} className="mix-particle suspension" cx={cx} cy={cy} r={i%2===0?13:10}/>)}
        <path className="mix-settle-arrow" d="M426 115V238"/>
        <path className="mix-arrow-head" d="M417 228L426 242L435 228"/>
        <text className="mix-side-label" x="426" y="95" textAnchor="middle">settles</text>
      </>}
      {type==="colloid"&&PARTICLES.colloid.map(([cx,cy],i)=><circle key={i} className="mix-particle colloid" cx={cx} cy={cy} r={i%3===0?9:7}/>)}
      <text className="mix-bottom-label" x="235" y="318" textAnchor="middle">
        {type==="solution"?"particles remain evenly distributed":type==="suspension"?"larger particles settle on standing":"intermediate particles remain dispersed"}
      </text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-mixture-particle-key">
      <span><i className={"mix-key-dot "+type}></i>{type==="solution"?"dissolved solute particles":type==="suspension"?"large suspended particles":"colloidal particles"}</span>
      <strong>{type==="solution"?"do not settle, pass ordinary filter paper":type==="suspension"?"settle and are removable by filtration":"do not settle readily, scatter light"}</strong>
    </div>
  </div>;
}

function TypeView(){
  const [type,setType]=useState("solution");
  const data={
    solution:{name:"Solution",example:"Sugar in water / vinegar",desc:"A solute is evenly dissolved in a solvent. The mixture is homogeneous and particles do not settle.",filter:"Passes through ordinary filter paper."},
    suspension:{name:"Suspension",example:"Muddy water / chalk in water",desc:"Large particles are dispersed but not dissolved. They settle on standing.",filter:"Particles can be removed by filtration."},
    colloid:{name:"Colloid",example:"Milk / mayonnaise",desc:"Very small dispersed particles remain suspended and do not settle readily.",filter:"Particles are too small for ordinary filtration and scatter light."}
  }[type];
  return <div className="spark-mixture-type">
    <div className="spark-mixture-buttons">{["solution","suspension","colloid"].map(k=><button type="button" key={k} className={type===k?"active":""} onClick={()=>setType(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-mixture-type-content">
      <ParticleModel type={type}/>
      <article><span>{data.name.toUpperCase()}</span><h4>{data.example}</h4><p>{data.desc}</p><strong>{data.filter}</strong></article>
    </div>
  </div>;
}

function SolutionView(){
  const [solute,setSolute]=useState("sugar");
  const data={
    sugar:["Sugar","Water","Aqueous solution"],
    salt:["Salt","Water","Aqueous solution"],
    iodine:["Iodine","Alcohol","Non-aqueous solution"]
  }[solute];
  return <div className="spark-solution-parts">
    <div className="spark-mixture-buttons">{["sugar","salt","iodine"].map(k=><button type="button" key={k} className={solute===k?"active":""} onClick={()=>setSolute(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-solution-equation"><span>{data[0]}<small>solute</small></span><b>+</b><span>{data[1]}<small>solvent</small></span><b>→</b><span>{data[2]}</span></div>
    <p>An aqueous solution uses water as the solvent. A non-aqueous solution uses another solvent, such as alcohol.</p>
  </div>;
}

function SettlingView(){
  const [time,setTime]=useState("fresh");
  const settled=time==="settled";
  return <div className="spark-settling-view">
    <div className="spark-mixture-buttons"><button type="button" className={!settled?"active":""} onClick={()=>setTime("fresh")}>Just shaken</button><button type="button" className={settled?"active":""} onClick={()=>setTime("settled")}>After standing</button></div>
    <div className="spark-suspension-jar">
      <div className="spark-jar-water"></div>
      {settled?<div className="spark-sediment"></div>:Array.from({length:18},(_,i)=><span key={i} style={{left:(12+(i*17)%76)+"%",top:(18+(i*23)%62)+"%"}}></span>)}
    </div>
    <p>{settled?"Suspension particles settle under gravity, so medicines that are suspensions may need shaking before use.":"Immediately after shaking, large particles are temporarily distributed through the liquid."}</p>
  </div>;
}

function TyndallView(){
  const [sample,setSample]=useState("colloid");
  const visible=sample==="colloid";
  return <div className="spark-tyndall-view">
    <div className="spark-mixture-buttons"><button type="button" className={!visible?"active":""} onClick={()=>setSample("solution")}>True solution</button><button type="button" className={visible?"active":""} onClick={()=>setSample("colloid")}>Colloid</button></div>
    <div className="spark-light-demo"><div className="spark-laser-source"></div><div className={"spark-laser-beam "+(visible?"visible":"faint")}></div><div className="spark-sample-cell">{visible?"milk / colloid":"salt solution"}</div></div>
    <p>{visible?"Colloid particles scatter light, so the beam becomes visible. This is the Tyndall effect.":"In a true solution, dissolved particles are too small to scatter the beam strongly enough to make its path clearly visible."}</p>
  </div>;
}

function ExamplesView(){
  return <div className="spark-mixture-examples">
    <article><span>VINEGAR</span><h4>Solution</h4><p>Ethanoic acid and other components are dissolved in water.</p></article>
    <article><span>MUDDY WATER</span><h4>Suspension</h4><p>Soil particles eventually settle and can be filtered.</p></article>
    <article><span>MAYONNAISE</span><h4>Colloid / emulsion</h4><p>Tiny droplets are dispersed and stabilised rather than settling rapidly.</p></article>
    <article><span>MILK</span><h4>Colloid</h4><p>Fat droplets are dispersed in water and scatter light.</p></article>
    <article><span>MEDICINE TO SHAKE</span><h4>Suspension</h4><p>Particles settle between uses, so shaking redistributes them.</p></article>
    <article><span>IODINE IN ALCOHOL</span><h4>Non-aqueous solution</h4><p>Alcohol, not water, is the solvent.</p></article>
  </div>;
}

export default function MixturesExplorer(){
  const [view,setView]=useState("types");
  const summary=useMemo(()=>({
    types:"Solutions, suspensions and colloids differ in particle size, settling and filtration behaviour.",
    solution:"A solution contains a solute dissolved in a solvent; aqueous means the solvent is water.",
    settling:"Suspension particles settle on standing and can usually be removed by filtration.",
    tyndall:"Colloids scatter light, producing the Tyndall effect.",
    examples:"Household products provide familiar examples of each mixture type."
  })[view],[view]);

  return <section className="spark-mixtures">
    <header><span>MIXTURES</span><h3>Compare solutions, suspensions and colloids</h3><p>Mixtures can be classified by particle size, whether particles dissolve, whether they settle and whether they scatter light.</p></header>
    <div className="spark-mixture-tabs">{[["types","Mixture types"],["solution","Solute and solvent"],["settling","Settling"],["tyndall","Tyndall effect"],["examples","Household examples"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-mixture-stage">{view==="types"&&<TypeView/>}{view==="solution"&&<SolutionView/>}{view==="settling"&&<SettlingView/>}{view==="tyndall"&&<TyndallView/>}{view==="examples"&&<ExamplesView/>}</div>
    <div className="spark-mixture-summary"><strong>{summary}</strong><span>Solute + solvent = solution. “Aqueous” means water is the solvent.</span></div>
  </section>;
}
