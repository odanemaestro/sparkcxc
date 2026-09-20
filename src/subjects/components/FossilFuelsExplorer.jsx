import React,{useMemo,useState} from "react";
import "./fossilFuelsExplorer.css";

const FUELS=[
  {name:"Coal",origin:"Mainly ancient plant material",mainUse:"Electricity and industrial heat",note:"Solid fossil fuel. Burning coal can release carbon dioxide, sulfur dioxide, nitrogen oxides and particles."},
  {name:"Crude oil",origin:"Ancient marine organisms and organic matter",mainUse:"Refined into transport fuels and petrochemical feedstocks",note:"Fractions include gasoline, kerosene, diesel and fuel oil."},
  {name:"Natural gas",origin:"Organic matter transformed by heat and pressure",mainUse:"Electricity, heating and industry",note:"Natural gas consists mainly of methane."},
];

function FormationView(){
  const steps=[
    ["Organic remains","Dead plants and microorganisms accumulate in environments where some organic material escapes complete decomposition."],
    ["Burial","Sediments bury the organic material over long periods."],
    ["Heat and pressure","Increasing temperature and pressure transform the buried material chemically."],
    ["Fossil fuel deposits","Coal, petroleum and natural gas form over geological timescales measured in millions of years."],
    ["Extraction and use","Humans extract and burn these fuels far faster than natural processes replace them."],
  ];
  return <div className="spark-fossil-formation">{steps.map((item,i)=><React.Fragment key={item[0]}><article><span>{i+1}</span><div><b>{item[0]}</b><p>{item[1]}</p></div></article>{i<steps.length-1&&<div className="spark-fossil-down" aria-hidden="true">↓</div>}</React.Fragment>)}</div>;
}

function PowerPlantView(){
  return <div className="spark-fossil-power">
    <div className="spark-fossil-chain">
      <article><span>1</span><b>Chemical</b><p>Fuel oil stores chemical energy.</p></article>
      <div>→</div>
      <article><span>2</span><b>Heat</b><p>Combustion heats water to produce high-pressure steam.</p></article>
      <div>→</div>
      <article><span>3</span><b>Kinetic</b><p>Moving steam turns a turbine.</p></article>
      <div>→</div>
      <article><span>4</span><b>Electrical</b><p>A generator converts mechanical rotation to electrical energy.</p></article>
    </div>
    <p>Useful electricity is produced, while some input energy is transferred to the surroundings as waste heat and sound.</p>
  </div>;
}

function ImpactView(){
  return <div className="spark-fossil-impacts">
    <article><span>CO₂</span><h4>Climate warming</h4><p>Burning fossil fuels adds carbon dioxide to the atmosphere. Carbon dioxide absorbs outgoing infrared radiation and strengthens the greenhouse effect.</p></article>
    <article><span>SO₂ + NOₓ</span><h4>Acid deposition</h4><p>Sulfur dioxide and nitrogen oxides can react in the atmosphere to form acidic compounds that damage sensitive lakes, soils, vegetation and materials.</p></article>
    <article><span>PARTICLES + TOXIC POLLUTANTS</span><h4>Air pollution</h4><p>Fossil-fuel combustion can release fine particles and other pollutants that harm health and ecosystems.</p></article>
    <article><span>SMALL ISLAND RISK</span><h4>Caribbean impacts</h4><p>Small islands face rising sea levels, coastal flooding and heat stress on coral reefs as the climate warms.</p></article>
  </div>;
}

function TradeoffsView(){
  return <div className="spark-fossil-tradeoffs">
    <div className="spark-fossil-column">
      <h4>Why fossil fuels became widely used</h4>
      <p>High energy density</p>
      <p>Established infrastructure</p>
      <p>Easy storage and transport for many liquid and gaseous fuels</p>
      <p>Dispatchable energy supply when fuel is available</p>
    </div>
    <div className="spark-fossil-column">
      <h4>Why dependence creates problems</h4>
      <p>Non-renewable on human timescales</p>
      <p>Carbon dioxide emissions from combustion</p>
      <p>Air pollutants and acid-forming emissions</p>
      <p>Extraction, transport and spill risks</p>
    </div>
  </div>;
}

function RegionalView(){
  return <div className="spark-fossil-regional">
    <article><span>TRINIDAD AND TOBAGO</span><h4>Long-established petroleum and natural-gas industry</h4><p>Trinidad and Tobago has produced oil and natural gas for more than a century and remains a major hydrocarbon producer in the Caribbean.</p></article>
    <article><span>HISTORICAL POLLUTANT</span><h4>Lead from leaded gasoline</h4><p>Older leaded gasoline released toxic lead compounds. Lead can damage the nervous system, especially in children. This is a historical fuel-pollution example rather than a description of modern unleaded gasoline.</p></article>
    <article><span>OTHER METHANE SOURCES</span><h4>Landfills and livestock</h4><p>Methane is also released by decomposition in landfills and by digestion in ruminant animals. Fossil-fuel systems are another important human-related methane source.</p></article>
  </div>;
}

export default function FossilFuelsExplorer(){
  const [view,setView]=useState("fuels");
  const summary=useMemo(()=>({
    fuels:"Coal, petroleum and natural gas are fossil fuels formed from ancient organic material.",
    formation:"Fossil fuels form over geological time, so present-day extraction is far faster than natural replacement.",
    power:"Fuel-fired generation follows chemical to heat to kinetic to electrical energy.",
    impacts:"The major environmental costs include greenhouse-gas emissions and air pollution.",
    tradeoffs:"Evaluation requires both useful properties and long-term environmental costs.",
    regional:"Caribbean examples connect the science to regional industry and environmental history.",
  })[view],[view]);

  return <section className="spark-fossil-fuels">
    <header><span>FOSSIL FUELS</span><h3>Connect fossil-fuel formation, energy conversion and environmental effects</h3><p>Coal, petroleum and natural gas store chemical energy accumulated from ancient organic matter. They are non-renewable on human timescales because formation takes millions of years.</p></header>
    <div className="spark-fossil-tabs">{[["fuels","Fuel types"],["formation","Formation"],["power","Power station"],["impacts","Environmental effects"],["tradeoffs","Advantages and costs"],["regional","Caribbean context"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-fossil-stage">
      {view==="fuels"&&<div className="spark-fossil-types">{FUELS.map((item,i)=><article key={item.name}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.mainUse}</strong><p>{item.origin}</p><small>{item.note}</small></div></article>)}</div>}
      {view==="formation"&&<FormationView/>}
      {view==="power"&&<PowerPlantView/>}
      {view==="impacts"&&<ImpactView/>}
      {view==="tradeoffs"&&<TradeoffsView/>}
      {view==="regional"&&<RegionalView/>}
    </div>
    <div className="spark-fossil-summary"><strong>{summary}</strong><span>Kerosene, gasoline, diesel and fuel oil are petroleum products. Natural gas is mainly methane.</span></div>
  </section>;
}

export { FUELS };
