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
  return <div className="spark-hygiene-pests-view">
    <svg className="spark-pests-drains-svg" viewBox="0 0 980 560" role="img" aria-label="Community hygiene diagram showing litter blocking a drain, stagnant water supporting mosquito eggs larvae and pupae, and open garbage attracting flies and rats">
      <defs>
        <marker id="pest-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="pd-arrow-head"/>
        </marker>
      </defs>

      <rect className="pd-ground" x="0" y="0" width="980" height="560"/>
      <g className="pd-drain">
        <path className="pd-road" d="M40 160H940V300H40Z"/>
        <rect className="pd-drain-channel" x="110" y="250" width="760" height="115" rx="18"/>
        <path className="pd-water" d="M125 300Q260 282 390 302T650 302T855 300V350H125Z"/>
        <g className="pd-litter">
          <rect x="425" y="265" width="65" height="30" rx="5"/><path d="M515 270L565 294L530 325Z"/><circle cx="595" cy="286" r="20"/>
        </g>
        <path className="pd-flow blocked" d="M185 320Q305 320 390 315" markerEnd="url(#pest-flow-arrow)"/>
        <path className="pd-flow weak" d="M650 320Q720 318 790 320"/>
        <text className="pd-label" x="500" y="228" textAnchor="middle">litter blocks the drain</text>
        <text className="pd-small" x="745" y="346">water movement slows</text>
      </g>

      <g className="pd-mosquito-cycle" transform="translate(80 380)">
        <text className="pd-heading" x="190" y="-12" textAnchor="middle">stagnant water supports mosquito breeding</text>
        <g transform="translate(0 10)">
          <ellipse className="pd-egg" cx="35" cy="35" rx="7" ry="15"/><ellipse className="pd-egg" cx="53" cy="31" rx="7" ry="15"/>
          <text className="pd-small" x="45" y="78" textAnchor="middle">eggs</text>
        </g>
        <path className="pd-stage-arrow" d="M85 45H135" markerEnd="url(#pest-flow-arrow)"/>
        <g transform="translate(145 0)"><path className="pd-larva" d="M15 20Q48 0 62 30T96 45Q100 70 72 72"/><text className="pd-small" x="55" y="82" textAnchor="middle">larva</text></g>
        <path className="pd-stage-arrow" d="M260 45H310" markerEnd="url(#pest-flow-arrow)"/>
        <g transform="translate(320 0)"><path className="pd-pupa" d="M20 18Q77 18 70 58Q63 80 38 68Q15 58 20 18Z"/><text className="pd-small" x="48" y="82" textAnchor="middle">pupa</text></g>
        <path className="pd-stage-arrow" d="M420 45H470" markerEnd="url(#pest-flow-arrow)"/>
        <g transform="translate(480 -6)">
          <ellipse className="pd-mosquito-body" cx="55" cy="42" rx="8" ry="27"/>
          <circle className="pd-mosquito-head" cx="55" cy="12" r="9"/>
          <path className="pd-mosquito-lines" d="M47 34L18 16M63 34L92 16M47 46L15 63M63 46L95 63M55 4V-14"/>
          <text className="pd-small" x="55" y="86" textAnchor="middle">adult mosquito</text>
        </g>
      </g>

      <g className="pd-garbage" transform="translate(685 380)">
        <rect className="pd-bin" x="0" y="35" width="135" height="105" rx="10"/>
        <path className="pd-bin-lid" d="M-8 40H143L125 12H10Z"/>
        <path className="pd-bag" d="M45 20Q65 0 85 20L98 72Q65 95 32 72Z"/>
        <g className="pd-flies">
          <circle cx="18" cy="5" r="4"/><circle cx="115" cy="0" r="4"/><circle cx="136" cy="28" r="4"/>
        </g>
        <g className="pd-rat" transform="translate(148 85)">
          <ellipse cx="32" cy="25" rx="34" ry="20"/><circle cx="60" cy="20" r="12"/><circle cx="63" cy="8" r="5"/>
          <path d="M2 24Q-25 8 -30 32"/>
        </g>
        <text className="pd-heading" x="75" y="168" textAnchor="middle">open garbage attracts flies and rats</text>
      </g>
    </svg>

    <div className="spark-hygiene-pests">
      <article><span>OPEN GARBAGE</span><h4>Food and shelter for pests</h4><p>Uncovered garbage attracts rats and flies and can hold water in containers that breed mosquitoes.</p></article>
      <article><span>BLOCKED DRAINS</span><h4>Standing water</h4><p>Litter can obstruct drains, increase local flooding and leave stagnant water that supports mosquito breeding.</p></article>
      <article><span>COMMUNITY EFFECT</span><h4>More disease risk and nuisance</h4><p>Good waste storage and regular collection reduce pests, bad odours and unsightly surroundings.</p></article>
    </div>
  </div>;
}

function LandfillView(){
  return <div className="spark-hygiene-landfill">
    <svg className="spark-landfill-cross-section" viewBox="0 0 980 520" role="img" aria-label="Managed landfill cross-section showing cover, compacted waste, rain infiltration, leachate drainage layer, collection pipe, impermeable liner, surrounding soil and groundwater">
      <defs>
        <marker id="landfill-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0L9 4.5L0 9Z" className="lf-arrow-head"/></marker>
      </defs>
      <rect className="lf-sky" x="0" y="0" width="980" height="190"/>
      <path className="ch-soil" d="M0 190H980V520H0Z"/>
      <path className="ch-water" d="M0 420Q210 398 425 422Q650 395 980 420V520H0Z"/>
      <path className="lf-cell-shell" d="M150 205Q490 110 830 205L785 385H195Z"/>
      <path className="lf-cover" d="M160 208Q490 126 820 208L812 235Q490 158 168 235Z"/>
      <path className="ch-waste" d="M170 235Q490 165 810 235L775 345H205Z"/>
      <g className="lf-waste-details">
        <rect x="240" y="246" width="65" height="30" rx="5"/><circle cx="350" cy="270" r="18"/><path d="M405 245L455 270L420 300Z"/>
        <rect x="505" y="242" width="75" height="34" rx="6"/><circle cx="625" cy="280" r="21"/><path d="M684 248L740 275L700 308Z"/>
      </g>
      <path className="lf-drainage-layer" d="M205 345H775L766 370H214Z"/>
      <path className="lf-liner" d="M195 385Q490 410 785 385L778 401Q490 428 202 401Z"/>
      <path className="lf-collection-pipe" d="M260 360H715" markerEnd="url(#landfill-flow-arrow)"/>
      <circle className="lf-pipe-hole" cx="330" cy="360" r="4"/><circle className="lf-pipe-hole" cx="430" cy="360" r="4"/><circle className="lf-pipe-hole" cx="530" cy="360" r="4"/><circle className="lf-pipe-hole" cx="630" cy="360" r="4"/>
      <path className="ch-rain" d="M285 55V150M420 42V152M555 52V150M690 38V152"/>
      <path className="ch-leach" d="M320 220Q330 286 350 342M465 215Q472 280 480 342M610 220Q600 288 592 342"/>
      <path className="lf-collected-leachate" d="M715 360Q795 360 846 318" markerEnd="url(#landfill-flow-arrow)"/>
      <rect className="lf-leachate-tank" x="840" y="270" width="95" height="92" rx="14"/>
      <path className="lf-tank-liquid" d="M848 325H927V353H848Z"/>

      <text className="ch-label" x="490" y="205" textAnchor="middle">daily/final cover reduces rain infiltration</text>
      <text className="ch-label" x="490" y="285" textAnchor="middle">compacted landfill waste</text>
      <text className="lf-small" x="490" y="337" textAnchor="middle">leachate drains downward through waste</text>
      <text className="ch-label" x="490" y="382" textAnchor="middle">drainage layer + perforated collection pipe</text>
      <text className="ch-label" x="490" y="414" textAnchor="middle">impermeable liner</text>
      <text className="lf-small" x="884" y="252" textAnchor="middle">leachate collection</text>
      <text className="lf-small" x="884" y="379" textAnchor="middle">sent for treatment</text>
      <text className="ch-label" x="720" y="470" textAnchor="middle">groundwater below landfill</text>
    </svg>
    <p>Rainwater passing through waste forms leachate. A managed landfill uses cover, a drainage layer, collection pipes and an impermeable liner to capture leachate before it reaches groundwater. Poor siting, damaged liners or inadequate leachate control increase contamination risk.</p>
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
