import React,{useMemo,useState} from "react";
import "./waterPurificationExplorer.css";

function TreatmentView(){
  const [stage,setStage]=useState("sedimentation");
  const data={
    sedimentation:{title:"Sedimentation",text:"Larger suspended particles settle when water is left still or after coagulation has formed heavier flocs."},
    coagulation:{title:"Coagulation with alum",text:"Alum helps tiny suspended particles clump together into larger flocs that settle more easily."},
    filtration:{title:"Filtration",text:"Sand and other filter media trap fine suspended solids that remain after settling."},
    chlorination:{title:"Chlorination",text:"A controlled chlorine dose disinfects water by killing or inactivating many disease-causing microorganisms."}
  }[stage];
  return <div className="spark-purification-treatment">
    <div className="spark-purification-buttons">{Object.keys(data).map(k=><button key={k} type="button" className={stage===k?"active":""} onClick={()=>setStage(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
    <div className="spark-treatment-order"><b>Sedimentation / coagulation</b><span>→</span><b>Filtration</b><span>→</span><b>Disinfection</b></div>
  </div>;
}

function DistillationView(){
  return <div className="spark-purification-distillation">
    <svg viewBox="0 0 880 380" role="img" aria-label="Simple distillation apparatus producing fresh water from sea water">
      <rect className="wp-flask" x="80" y="150" width="180" height="145" rx="55"/>
      <path className="wp-water" d="M100 215H240V275Q170 310 100 275Z"/>
      <text className="wp-label" x="170" y="245" textAnchor="middle">sea water</text>
      <path className="wp-steam" d="M170 150Q170 90 315 90"/>
      <rect className="wp-cond" x="315" y="68" width="300" height="44" rx="22"/>
      <path className="wp-condensate" d="M615 90Q700 90 700 185"/>
      <rect className="wp-beaker" x="645" y="185" width="115" height="110" rx="8"/>
      <text className="wp-label" x="703" y="242" textAnchor="middle">fresh water</text>
      <text className="wp-label" x="170" y="330" textAnchor="middle">salt remains</text>
    </svg>
    <p>Distillation boils water, leaves dissolved salts behind and condenses the vapour as fresh water. It can desalinate sea water but requires energy.</p>
  </div>;
}

function ReverseOsmosisView(){
  const [pressure,setPressure]=useState(70);
  return <div className="spark-ro-view">
    <label>Applied pressure<input type="range" min="20" max="100" value={pressure} onChange={e=>setPressure(e.target.value)}/></label>
    <div className="spark-ro-model">
      <div className="spark-ro-feed">salty water<br/><small>water + ions</small></div>
      <div className="spark-ro-membrane">semi-permeable membrane</div>
      <div className="spark-ro-product">fresh water</div>
      <div className="spark-ro-brine">concentrated brine</div>
    </div>
    <p>Reverse osmosis uses pressure to force water through a membrane that rejects most dissolved salts. Higher pressure is required than for ordinary osmosis.</p>
  </div>;
}

function HouseholdView(){
  return <div className="spark-purification-household">
    <article><span>BOILING</span><h4>Emergency disinfection</h4><p>Boiling kills many disease-causing microorganisms. It does not remove dissolved salts, heavy metals or every chemical contaminant.</p></article>
    <article><span>ACTIVATED CARBON</span><h4>Taste and odour control</h4><p>Activated carbon adsorbs many organic compounds that cause unpleasant taste and smell. It is not a complete disinfection method by itself.</p></article>
    <article><span>SAFE STORAGE</span><h4>Avoid recontamination</h4><p>Treated water should be kept in a clean covered container and handled with clean utensils.</p></article>
  </div>;
}

export default function WaterPurificationExplorer(){
  const [view,setView]=useState("treatment");
  const summary=useMemo(()=>({
    treatment:"Water treatment combines physical removal of suspended matter with controlled disinfection.",
    distillation:"Distillation removes non-volatile dissolved salts by evaporating and condensing the water.",
    ro:"Reverse osmosis removes salts by forcing water through a selective membrane under pressure.",
    household:"Household methods can improve safety, but each method has limits."
  })[view],[view]);
  return <section className="spark-water-purification">
    <header><span>WATER PURIFICATION</span><h3>Compare treatment, distillation, reverse osmosis and household methods</h3><p>Purification methods are chosen according to the contaminants present. No single step removes every possible impurity.</p></header>
    <div className="spark-purification-tabs">{[["treatment","Treatment plant"],["distillation","Distillation"],["ro","Reverse osmosis"],["household","Household treatment"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-purification-stage">{view==="treatment"&&<TreatmentView/>}{view==="distillation"&&<DistillationView/>}{view==="ro"&&<ReverseOsmosisView/>}{view==="household"&&<HouseholdView/>}</div>
    <div className="spark-purification-summary"><strong>{summary}</strong><span>Typical sequence: settle/coagulate, filter, then disinfect.</span></div>
  </section>;
}
