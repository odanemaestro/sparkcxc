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
    {system==="septic"?<svg className="spark-sanitation-diagram" viewBox="0 0 940 470" role="img" aria-label="Septic system cross-section showing house sewer, septic tank, scum, wastewater, sludge, outlet and drain field">
      <defs><marker id="ch-flow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="ch-arrow-head"/></marker></defs>
      <rect className="ch-sky" x="0" y="0" width="940" height="215"/>
      <path className="ch-ground" d="M0 215H940V470H0Z"/>
      <path className="ch-house-body" d="M62 125H205V220H62Z"/><path className="ch-house-roof" d="M45 125L134 61L222 125Z"/>
      <path className="ch-sewer-pipe" d="M205 196H332" markerEnd="url(#ch-flow-arrow)"/>
      <text className="ch-label" x="135" y="174" textAnchor="middle">house</text>
      <text className="ch-small" x="269" y="181" textAnchor="middle">household sewage</text>

      <rect className="ch-tank-shell" x="350" y="190" width="300" height="180" rx="22"/>
      <rect className="ch-tank-liquid" x="365" y="242" width="270" height="96"/>
      <path className="ch-scum" d="M365 242Q430 226 500 243Q570 225 635 242V265Q570 252 500 266Q430 251 365 265Z"/>
      <path className="ch-sludge" d="M365 318Q435 300 500 320Q565 301 635 318V338H365Z"/>
      <path className="ch-baffle" d="M425 203V284M575 203V284"/>
      <text className="ch-small" x="500" y="222" textAnchor="middle">septic tank</text>
      <text className="ch-small" x="500" y="257" textAnchor="middle">scum</text>
      <text className="ch-small" x="500" y="298" textAnchor="middle">wastewater</text>
      <text className="ch-small" x="500" y="334" textAnchor="middle">sludge</text>

      <path className="ch-outlet-pipe" d="M650 275H735" markerEnd="url(#ch-flow-arrow)"/>
      <path className="ch-drain-main" d="M735 275V330H862"/>
      <path className="ch-drain-branch" d="M760 330V380M810 330V380M860 330V380"/>
      <circle className="ch-perforation" cx="760" cy="358" r="4"/><circle className="ch-perforation" cx="810" cy="358" r="4"/><circle className="ch-perforation" cx="860" cy="358" r="4"/>
      <path className="ch-soil-flow" d="M760 384V425M810 384V425M860 384V425"/>
      <text className="ch-label" x="809" y="256" textAnchor="middle">drain field</text>
      <text className="ch-small" x="809" y="451" textAnchor="middle">effluent filters through suitable soil</text>
    </svg>:<svg className="spark-sanitation-diagram" viewBox="0 0 980 470" role="img" aria-label="Sewage treatment plant process showing screening, primary settling, aeration, secondary settling, disinfection and treated effluent">
      <defs><marker id="ch-plant-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="ch-arrow-head"/></marker></defs>
      <line className="ch-process-pipe" x1="50" y1="230" x2="925" y2="230"/>
      <line className="ch-process-arrow" x1="55" y1="230" x2="118" y2="230" markerEnd="url(#ch-plant-arrow)"/>

      <rect className="ch-screen-channel" x="125" y="160" width="105" height="140" rx="10"/>
      <line className="ch-screen-bar" x1="150" y1="175" x2="150" y2="285"/><line className="ch-screen-bar" x1="173" y1="175" x2="173" y2="285"/><line className="ch-screen-bar" x1="196" y1="175" x2="196" y2="285"/>
      <text className="ch-label" x="178" y="139" textAnchor="middle">1 Screening</text>
      <text className="ch-small" x="178" y="327" textAnchor="middle">large debris removed</text>

      <path className="ch-process-arrow" d="M230 230H285" markerEnd="url(#ch-plant-arrow)"/>
      <ellipse className="ch-clarifier" cx="345" cy="230" rx="60" ry="84"/>
      <path className="ch-settled-solids" d="M297 254Q345 292 393 254Q385 309 345 314Q305 309 297 254Z"/>
      <text className="ch-label" x="345" y="123" textAnchor="middle">2 Primary settling</text>
      <text className="ch-small" x="345" y="345" textAnchor="middle">solids settle as sludge</text>

      <path className="ch-process-arrow" d="M405 230H465" markerEnd="url(#ch-plant-arrow)"/>
      <rect className="ch-aeration" x="470" y="155" width="135" height="150" rx="12"/>
      {Array.from({length:14},(_,i)=><circle key={i} className="ch-air-bubble" cx={490+(i%5)*23} cy={185+Math.floor(i/5)*37} r={4+(i%2)}/>)}
      <text className="ch-label" x="538" y="129" textAnchor="middle">3 Aeration</text>
      <text className="ch-small" x="538" y="333" textAnchor="middle">microbes break down organic matter</text>

      <path className="ch-process-arrow" d="M605 230H652" markerEnd="url(#ch-plant-arrow)"/>
      <ellipse className="ch-clarifier secondary" cx="710" cy="230" rx="58" ry="82"/>
      <path className="ch-settled-solids" d="M665 255Q710 286 755 255Q748 306 710 311Q672 306 665 255Z"/>
      <text className="ch-label" x="710" y="123" textAnchor="middle">4 Secondary settling</text>
      <text className="ch-small" x="710" y="342" textAnchor="middle">biological solids settle</text>

      <path className="ch-process-arrow" d="M768 230H814" markerEnd="url(#ch-plant-arrow)"/>
      <rect className="ch-disinfection" x="820" y="171" width="95" height="118" rx="12"/>
      <path className="ch-disinfection-ray" d="M840 201L895 259M895 201L840 259"/>
      <text className="ch-label" x="868" y="145" textAnchor="middle">5 Final treatment</text>
      <text className="ch-small" x="868" y="318" textAnchor="middle">pathogens reduced</text>

      <path className="ch-process-arrow" d="M915 230H955" markerEnd="url(#ch-plant-arrow)"/>
      <text className="ch-small" x="908" y="389" textAnchor="end">treated effluent is released only after required treatment and checks</text>
    </svg>}
    <p>{system==="septic"?"Septic systems treat household sewage where there is no sewer connection. Solids settle, microorganisms break down some waste, and clarified effluent enters a suitable drain field. Good siting, maintenance and separation from wells protect groundwater.":"Treatment plants screen debris, settle solids, use microorganisms to reduce organic matter, settle biological solids and apply final treatment before effluent is released. Some plants also remove nutrients depending on design and discharge requirements."}</p>
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
  const options={
    compost:{title:"Composting",text:"Aerobic decomposers break down kitchen and garden waste to form humus-rich compost that can improve soil."},
    biogas:{title:"Biogas",text:"Anaerobic microorganisms can break down animal manure and food waste, producing methane-rich biogas that can be used as a fuel."},
    repurpose:{title:"Repurposing",text:"An item is used for a different purpose instead of being discarded, for example using a safe old container as a planter."},
    recycle:{title:"Reduce, reuse and recycle",text:"Reducing waste at the source is usually best. Reuse and recycling then keep more material out of landfills."}
  };
  const data=options[mode];
  return <div className="spark-hygiene-recovery">
    <div className="spark-hygiene-toggle">{Object.entries(options).map(([key,item])=><button type="button" key={key} aria-pressed={mode===key} className={mode===key?"active":""} onClick={()=>setMode(key)}>{item.title}</button>)}</div>
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
