import React,{useMemo,useState} from "react";
import "./airMassFrontsExplorer.css";

const AIR_MASSES=[
  {id:"mT",name:"Maritime tropical",temp:"Warm",moisture:"Moist",source:"Warm tropical ocean",caribbean:"Common source of warm, humid Caribbean air."},
  {id:"cT",name:"Continental tropical",temp:"Warm",moisture:"Dry",source:"Hot subtropical land",caribbean:"Can carry hot, dry air and dust when transported from continental regions."},
  {id:"mP",name:"Maritime polar",temp:"Cold",moisture:"Moist",source:"Cold ocean",caribbean:"Cooler moist air can reach lower latitudes behind fronts."},
  {id:"cP",name:"Continental polar",temp:"Cold",moisture:"Dry",source:"Cold land",caribbean:"Cold dry continental air can influence the northern Caribbean during strong winter outbreaks."},
];

function AirMassView(){
  const [id,setId]=useState("mT");
  const a=AIR_MASSES.find(x=>x.id===id);
  return <div className="spark-airmass-view">
    <div className="spark-airmass-buttons">{AIR_MASSES.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.id}: {x.name}</button>)}</div>
    <article><span>{a.name.toUpperCase()}</span><h4>{a.temp} and {a.moisture.toLowerCase()}</h4><div><b>Source region</b><p>{a.source}</p></div><div><b>Caribbean relevance</b><p>{a.caribbean}</p></div></article>
  </div>;
}

function FrontSymbol({type,label}){
  const xs=[60,130,200,270,340];
  const triangleUp=x=>(x-14)+",55 "+(x+14)+",55 "+x+",30";
  const triangleDown=x=>(x-14)+",55 "+(x+14)+",55 "+x+",80";
  const semi=x=>"M"+(x-14)+",55 A14,14 0 0 1 "+(x+14)+",55 Z";
  return <article className={"spark-front-card "+type}>
    <svg viewBox="0 0 400 100" role="img" aria-label={label+" symbol"}>
      <line className="fr-line" x1="25" y1="55" x2="375" y2="55"/>
      {type==="cold"&&xs.map(x=><polygon key={x} className="fr-mark" points={triangleUp(x)}/>)}
      {type==="warm"&&xs.map(x=><path key={x} className="fr-mark" d={semi(x)}/>)}
      {type==="occluded"&&xs.map((x,i)=>i%2===0?<polygon key={x} className="fr-mark" points={triangleUp(x)}/>:<path key={x} className="fr-mark" d={semi(x)}/>)}
      {type==="stationary"&&xs.map((x,i)=>i%2===0?<polygon key={x} className="fr-mark" points={triangleDown(x)}/>:<path key={x} className="fr-mark" d={semi(x)}/>)}
    </svg>
    <b>{label}</b>
  </article>;
}

function SymbolsView(){
  return <div className="spark-front-symbols"><FrontSymbol type="cold" label="Cold front"/><FrontSymbol type="warm" label="Warm front"/><FrontSymbol type="occluded" label="Occluded front"/><FrontSymbol type="stationary" label="Stationary front"/></div>;
}

function FrontCrossSection({type}){
  if(type==="cold"){
    return <svg viewBox="0 0 860 430" role="img" aria-label="Cold front cross-section with dense cold air pushing under warm air, rapid uplift and heavy showers">
      <rect className="fr-sky" x="20" y="25" width="820" height="340" rx="18" />
      <path className="fr-ground" d="M20 345H840" />
      <path className="fr-air cold" d="M25 345V250Q160 238 300 292L410 345Z" />
      <path className="fr-air warm" d="M295 289Q415 165 590 105Q735 65 835 82V345H410Z" />
      <path className="fr-boundary cold-boundary" d="M295 289Q410 175 585 108" />
      <path className="fr-motion cold-motion" d="M95 315H260" />
      <path className="fr-motion warm-motion" d="M350 265Q405 205 480 168" />
      <g className="fr-cloud cumulonimbus" transform="translate(490 80)">
        <circle cx="0" cy="48" r="38"/><circle cx="42" cy="32" r="52"/><circle cx="91" cy="55" r="38"/>
        <path d="M28 68Q45 105 37 145M65 70Q82 110 74 150M100 75Q117 112 108 145"/>
      </g>
      <g className="fr-rain heavy">
        {[525,560,595,630].map((x,i)=><line key={x} x1={x} y1={190+i%2*8} x2={x-12} y2={238+i%2*8}/>)}
      </g>
      <text className="fr-air-label cold" x="155" y="320">cold, dense air</text>
      <text className="fr-air-label warm" x="690" y="145">warm air</text>
      <text className="fr-section-label" x="515" y="300">steep uplift</text>
      <text className="fr-weather-label" x="610" y="55">towering cloud + heavy showers</text>
    </svg>;
  }

  if(type==="warm"){
    return <svg viewBox="0 0 860 430" role="img" aria-label="Warm front cross-section with warm air rising gradually over cold air and layered cloud producing steady rain">
      <rect className="fr-sky" x="20" y="25" width="820" height="340" rx="18" />
      <path className="fr-ground" d="M20 345H840" />
      <path className="fr-air cold" d="M460 345Q620 300 840 285V345Z" />
      <path className="fr-air warm" d="M20 345V130Q240 135 440 225Q505 255 565 300L460 345Z" />
      <path className="fr-boundary warm-boundary" d="M175 167Q355 205 565 300" />
      <path className="fr-motion warm-motion" d="M160 290Q285 230 405 205" />
      <path className="fr-motion cold-motion" d="M785 325H605" />
      <g className="fr-layer-clouds">
        <ellipse cx="320" cy="125" rx="85" ry="28"/><ellipse cx="440" cy="155" rx="105" ry="30"/><ellipse cx="555" cy="190" rx="110" ry="30"/>
      </g>
      <g className="fr-rain steady">
        {[400,445,490,535,580,625].map((x,i)=><line key={x} x1={x} y1={195+i%3*8} x2={x-8} y2={238+i%3*8}/>)}
      </g>
      <text className="fr-air-label warm" x="170" y="215">warm air rises gradually</text>
      <text className="fr-air-label cold" x="690" y="322">cold air</text>
      <text className="fr-weather-label" x="460" y="75">layered cloud + longer steady rain</text>
    </svg>;
  }

  if(type==="occluded"){
    return <svg viewBox="0 0 860 430" role="img" aria-label="Occluded front cross-section with warm air lifted above colder surface air">
      <rect className="fr-sky" x="20" y="25" width="820" height="340" rx="18" />
      <path className="fr-ground" d="M20 345H840" />
      <path className="fr-air cold strongest" d="M20 345V258Q210 240 392 326L420 345Z" />
      <path className="fr-air cool" d="M420 345Q605 275 840 286V345Z" />
      <path className="fr-air warm lifted" d="M245 235Q405 105 610 150Q690 168 760 220Q585 195 425 330Z" />
      <path className="fr-boundary occluded-boundary" d="M246 236Q365 170 425 330Q540 270 710 243" />
      <path className="fr-motion cold-motion" d="M115 315H310" />
      <path className="fr-motion cool-motion" d="M760 320H560" />
      <path className="fr-motion warm-motion" d="M390 250Q430 188 492 165" />
      <g className="fr-layer-clouds occluded"><ellipse cx="420" cy="105" rx="82" ry="28"/><ellipse cx="515" cy="120" rx="95" ry="30"/></g>
      <g className="fr-rain steady">{[420,465,510,555].map(x=><line key={x} x1={x} y1="150" x2={x-9} y2="210"/>)}</g>
      <text className="fr-air-label warm" x="545" y="205">warm air lifted off ground</text>
      <text className="fr-air-label cold" x="135" y="320">colder air</text>
      <text className="fr-air-label cool" x="700" y="320">cool air</text>
      <text className="fr-weather-label" x="475" y="60">cloud and rain near the occlusion</text>
    </svg>;
  }

  return <svg viewBox="0 0 860 430" role="img" aria-label="Stationary front cross-section where warm and cold air masses meet but neither advances strongly">
    <rect className="fr-sky" x="20" y="25" width="820" height="340" rx="18" />
    <path className="fr-ground" d="M20 345H840" />
    <path className="fr-air cold" d="M20 345V225Q210 230 410 315V345Z" />
    <path className="fr-air warm" d="M840 345V180Q625 180 450 300L410 345Z" />
    <path className="fr-boundary stationary-boundary" d="M280 248Q365 280 430 325Q520 252 610 220" />
    <path className="fr-motion opposing left" d="M110 315H280" />
    <path className="fr-motion opposing right" d="M750 315H580" />
    <g className="fr-layer-clouds stationary"><ellipse cx="405" cy="145" rx="80" ry="25"/><ellipse cx="500" cy="155" rx="90" ry="27"/></g>
    <g className="fr-rain light">{[405,450,495,540].map(x=><line key={x} x1={x} y1="180" x2={x-6} y2="220"/>)}</g>
    <text className="fr-air-label cold" x="170" y="290">cold air</text>
    <text className="fr-air-label warm" x="690" y="255">warm air</text>
    <text className="fr-section-label" x="430" y="355" textAnchor="middle">boundary changes little</text>
    <text className="fr-weather-label" x="460" y="90">cloudy, unsettled weather may persist</text>
  </svg>;
}

function WeatherView(){
  const [type,setType]=useState("cold");
  const data={
    cold:{name:"Cold front",process:"Cold dense air pushes under warm air, forcing it upward rapidly.",weather:"Heavy showers, thunderstorms, gusty winds and a fall in temperature are common."},
    warm:{name:"Warm front",process:"Warm air rises gradually over colder air.",weather:"Layered clouds and longer periods of steady light rain can occur, followed by rising temperature."},
    occluded:{name:"Occluded front",process:"A cold front catches up with a warm front and lifts the warm air away from the surface.",weather:"Cloud, rain and changeable weather can accompany the occlusion."},
    stationary:{name:"Stationary front",process:"Neither air mass advances strongly enough to displace the other.",weather:"Cloud and unsettled weather may persist for a prolonged period."}
  }[type];
  return <div className="spark-front-weather">
    <div className="spark-front-buttons">{["cold","warm","occluded","stationary"].map(k=><button type="button" key={k} className={type===k?"active":""} onClick={()=>setType(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-front-weather-main">
      <div className="spark-front-cross-section"><FrontCrossSection type={type}/></div>
      <article><span>{data.name.toUpperCase()}</span><h4>{data.process}</h4><p>{data.weather}</p></article>
    </div>
  </div>;
}

function TransportView(){
  return <div className="spark-atmospheric-transport">
    <svg viewBox="0 0 880 390" role="img" aria-label="Airflow carrying Saharan dust westward across the Atlantic toward the Caribbean">
      <path className="at-land sahara" d="M80 90Q180 60 260 110Q220 185 100 195Z"/>
      <path className="at-land caribbean" d="M690 180Q730 150 775 195Q745 240 695 225Z"/>
      <path className="at-wind" d="M260 135Q420 110 650 190"/>
      <circle className="at-dust" cx="300" cy="130" r="8"/><circle className="at-dust" cx="390" cy="135" r="7"/><circle className="at-dust" cx="480" cy="150" r="7"/><circle className="at-dust" cx="575" cy="170" r="6"/>
      <text className="at-label" x="160" y="235" textAnchor="middle">Sahara</text><text className="at-label" x="735" y="270" textAnchor="middle">Caribbean</text><text className="at-label" x="450" y="95" textAnchor="middle">winds transport dust westward</text>
    </svg>
    <div className="spark-transport-cards">
      <article><b>Saharan dust</b><p>Fine mineral dust can travel across the Atlantic in large air masses. High dust concentrations can worsen asthma and allergies in sensitive people.</p></article>
      <article><b>Volcanic ash</b><p>Winds can carry ash from Caribbean eruptions, such as those in Montserrat, to other islands and marine areas.</p></article>
      <article><b>Why transport matters</b><p>Atmospheric circulation links distant source regions to Caribbean air quality, visibility, cloud processes and weather.</p></article>
    </div>
  </div>;
}

function DefinitionView(){
  return <div className="spark-airmass-definitions">
    <article><span>AIR MASS</span><h4>Large body of air</h4><p>An air mass has broadly similar temperature and humidity over a large area because it takes on properties of its source region.</p></article>
    <article><span>FRONT</span><h4>Boundary between air masses</h4><p>A front forms where air masses with different temperature and moisture characteristics meet.</p></article>
    <article><span>NAME CODE</span><h4>Surface + latitude</h4><p>Maritime means formed over sea and therefore moist. Continental means formed over land and usually drier. Tropical means warm. Polar means cold.</p></article>
  </div>;
}

export default function AirMassFrontsExplorer(){
  const [view,setView]=useState("masses");
  const summary=useMemo(()=>({
    masses:"Air masses are classified mainly by whether they form over land or sea and whether the source region is tropical or polar.",
    symbols:"Front symbols show the boundary type and the direction in which the front is advancing.",
    weather:"Front weather depends on how warm and cold air are forced to move at the boundary.",
    transport:"Winds and air masses can carry dust and volcanic ash across great distances.",
    definitions:"Air masses are large bodies of air. Fronts are the boundaries between contrasting air masses."
  })[view],[view]);
  return <section className="spark-airmass-fronts">
    <header><span>CARIBBEAN AIR MASSES</span><h3>Classify air masses, read front symbols and connect them to Caribbean weather</h3><p>Air masses acquire the temperature and moisture characteristics of the regions where they form. When contrasting air masses meet, the boundary is called a front.</p></header>
    <div className="spark-airmass-tabs">{[["masses","Air masses"],["symbols","Front symbols"],["weather","Front weather"],["transport","Dust and ash"],["definitions","Definitions"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-airmass-stage">{view==="masses"&&<AirMassView/>}{view==="symbols"&&<SymbolsView/>}{view==="weather"&&<WeatherView/>}{view==="transport"&&<TransportView/>}{view==="definitions"&&<DefinitionView/>}</div>
    <div className="spark-airmass-summary"><strong>{summary}</strong><span>A cold front is shown with triangles. A warm front is shown with semicircles.</span></div>
  </section>;
}

export { AIR_MASSES };
