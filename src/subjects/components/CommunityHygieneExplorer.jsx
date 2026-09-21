import React,{useMemo,useState} from "react";
import "./communityHygieneExplorer.css";

function WasteTypesView(){
  const [type,setType]=useState("bio");
  const data={
    bio:{title:"Biodegradable waste",items:["food scraps","paper","grass cuttings"],text:"Microorganisms can break these materials down. Organic waste can often be composted."},
    e:{title:"Electronic waste",items:["old phones","computers","batteries"],text:"E-waste may contain useful metals but also hazardous substances, so it should not be dumped with ordinary garbage."},
    med:{title:"Medical / biological waste",items:["used syringes","contaminated bandages","some laboratory waste"],text:"Medical waste can carry pathogens or cause sharps injuries and therefore requires controlled handling and disposal."}
  }[type];
  return <div className="spark-hygiene-waste-types">
    <div className="spark-hygiene-toggle">{[["bio","Biodegradable"],["e","E-waste"],["med","Medical waste"]].map(([k,l])=><button type="button" key={k} className={type===k?"active":""} onClick={()=>setType(k)}>{l}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><div className="spark-hygiene-chips">{data.items.map(x=><b key={x}>{x}</b>)}</div><p>{data.text}</p></article>
  </div>;
}

function PestsView(){
  return <div className="spark-hygiene-pests">
    <article><span>OPEN GARBAGE</span><h4>Food and shelter for pests</h4><p>Uncovered garbage attracts rats and flies and can hold water in containers that breed mosquitoes.</p></article>
    <article><span>BLOCKED DRAINS</span><h4>Standing water</h4><p>Litter can obstruct drains, increase local flooding and leave stagnant water that supports mosquito breeding.</p></article>
    <article><span>COMMUNITY EFFECT</span><h4>More disease risk and nuisance</h4><p>Good waste storage and regular collection reduce pests, bad odours and unsightly surroundings.</p></article>
  </div>;
}

function LandfillView(){
  return <div className="spark-hygiene-landfill">
    <svg viewBox="0 0 860 430" role="img" aria-label="Simplified landfill showing rainwater leachate moving through waste toward groundwater">
      <path className="ch-soil" d="M0 170Q210 120 430 165Q650 115 860 175V430H0Z"/>
      <path className="ch-waste" d="M175 170Q330 120 520 165Q620 190 705 205L650 290L205 285Z"/>
      <path className="ch-rain" d="M250 40V120M340 35V125M430 45V130"/>
      <path className="ch-leach" d="M330 220Q350 310 390 360"/>
      <path className="ch-water" d="M0 350Q210 330 430 355Q650 330 860 350V430H0Z"/>
      <text className="ch-label" x="430" y="205" textAnchor="middle">landfill waste</text>
      <text className="ch-label" x="410" y="330">leachate</text>
      <text className="ch-label" x="650" y="390">groundwater</text>
    </svg>
    <p>Rainwater can pass through landfill waste and form leachate containing dissolved chemicals. If a landfill is poorly designed or managed, leachate can contaminate soil and groundwater.</p>
  </div>;
}

function SanitationView(){
  const [system,setSystem]=useState("septic");
  return <div className="spark-hygiene-sanitation">
    <div className="spark-hygiene-toggle"><button type="button" className={system==="septic"?"active":""} onClick={()=>setSystem("septic")}>Septic system</button><button type="button" className={system==="plant"?"active":""} onClick={()=>setSystem("plant")}>Sewage treatment plant</button></div>
    {system==="septic"?<div className="spark-septic-model">
      <div className="spark-house">home</div><div className="spark-pipe"></div><div className="spark-septic-tank">septic tank<br/><small>settling + microbial breakdown</small></div><div className="spark-drain-field">soil treatment area</div>
    </div>:<div className="spark-treatment-flow">
      {["screening","settling","biological treatment","disinfection / final treatment","safer effluent"].map((x,i)=><React.Fragment key={x}><article>{x}</article>{i<4&&<span>→</span>}</React.Fragment>)}
    </div>}
    <p>{system==="septic"?"Septic systems treat household sewage where there is no sewer connection. They need suitable siting, maintenance and separation from wells to protect groundwater.":"Treatment plants remove solids, reduce organic matter and pathogens, and may reduce nutrients before effluent is released."}</p>
  </div>;
}

function DiseaseView(){
  return <div className="spark-hygiene-disease">
    <article><span>CONTAMINATED WATER</span><h4>Typhoid and gastroenteritis</h4><p>Faecal contamination of wells and other water supplies can spread disease-causing microorganisms.</p></article>
    <article><span>CONTAMINATED SOIL</span><h4>Hookworm</h4><p>Hookworm larvae can penetrate bare skin when a person walks on soil contaminated with infected faeces.</p></article>
    <article><span>PREVENTION</span><h4>Safe sanitation and hygiene</h4><p>Keep latrines and septic systems away from wells, protect water sources, dispose of faeces safely and wash hands properly.</p></article>
  </div>;
}

function RecoverView(){
  const [mode,setMode]=useState("compost");
  const data={
    compost:{title:"Composting",text:"Aerobic decomposers break down kitchen and garden waste to form humus-rich compost that can improve soil."},
    biogas:{title:"Biogas",text:"Anaerobic microorganisms can break down animal manure and food waste, producing methane-rich biogas that can be used as a fuel."},
    repurpose:{title:"Repurposing",text:"An item is used for a different purpose instead of being discarded, for example using a safe old container as a planter."},
    recycle:{title:"Reduce, reuse and recycle",text:"Reducing waste at the source is usually best. Reuse and recycling then keep more material out of landfills."}
  }[mode];
  return <div className="spark-hygiene-recovery">
    <div className="spark-hygiene-toggle">{Object.keys(data).map(k=><button type="button" key={k} className={mode===k?"active":""} onClick={()=>setMode(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
  </div>;
}

function AestheticView(){
  return <div className="spark-hygiene-aesthetic">
    <article><span>CLEAN SPACES</span><h4>Safer and more pleasant communities</h4><p>Well-managed waste, clean drains and maintained public areas improve comfort and appearance.</p></article>
    <article><span>TOURISM AND BUSINESS</span><h4>Better community image</h4><p>Clean surroundings can make neighbourhoods, beaches and commercial areas more attractive to residents and visitors.</p></article>
    <article><span>CIVIC RESPONSIBILITY</span><h4>Shared action matters</h4><p>Households, schools, businesses and local authorities all contribute to effective community hygiene.</p></article>
  </div>;
}

export default function CommunityHygieneExplorer(){
  const [view,setView]=useState("waste");
  const summary=useMemo(()=>({
    waste:"Different waste streams need different handling. Biodegradable, electronic and medical wastes should not all be treated the same way.",
    pests:"Poor garbage management increases rats, flies, mosquitoes, odours and blocked drains.",
    landfill:"Landfill leachate can contaminate groundwater if waste sites are poorly managed.",
    sanitation:"Septic systems and treatment plants reduce health risks when they are properly designed, operated and maintained.",
    disease:"Unsafe faecal disposal can contaminate water and soil and spread enteric disease and parasites.",
    recovery:"Composting, biogas, repurposing, reuse and recycling recover value while reducing disposal.",
    aesthetic:"Community hygiene protects health and also creates cleaner, more attractive surroundings."
  })[view],[view]);
  return <section className="spark-community-hygiene">
    <header><span>COMMUNITY HYGIENE</span><h3>Connect waste management, sanitation and disease prevention</h3><p>Good community hygiene protects water, controls pests, reduces disease transmission and keeps neighbourhoods clean and attractive.</p></header>
    <div className="spark-hygiene-tabs">{[["waste","Waste types"],["pests","Pests and drains"],["landfill","Landfills"],["sanitation","Sewage treatment"],["disease","Disease prevention"],["recovery","Recovering waste"],["aesthetic","Community benefits"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-hygiene-stage">{view==="waste"&&<WasteTypesView/>}{view==="pests"&&<PestsView/>}{view==="landfill"&&<LandfillView/>}{view==="sanitation"&&<SanitationView/>}{view==="disease"&&<DiseaseView/>}{view==="recovery"&&<RecoverView/>}{view==="aesthetic"&&<AestheticView/>}</div>
    <div className="spark-hygiene-summary"><strong>{summary}</strong><span>Waste should be reduced where possible, then safely reused, recycled, recovered or disposed of according to its type.</span></div>
  </section>;
}
