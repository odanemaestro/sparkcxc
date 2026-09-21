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
    <article><span>{data.name.toUpperCase()}</span><h4>{data.process}</h4><p>{data.weather}</p></article>
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
