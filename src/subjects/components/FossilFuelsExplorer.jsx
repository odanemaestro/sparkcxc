import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
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
  return <div className="spark-fossil-formation">
    <ReviewedScienceDiagram site="FossilFuelsExplorer.jsx:19"><svg className="spark-fossil-formation-svg" viewBox="0 0 980 560" role="img" aria-label="Geological cross-section showing burial of organic matter and formation of coal petroleum and natural gas deposits">
      <defs>
        <marker id="ff-burial-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="ff-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>
      <rect className="ff-sky" x="0" y="0" width="980" height="90"/>
      <path className="ff-sea" d="M0 90Q200 74 400 90T800 90T980 90V165H0Z"/>
      <path className="ff-sediment layer1" d="M0 165Q240 145 490 170Q720 190 980 160V255H0Z"/>
      <path className="ff-sediment layer2" d="M0 255Q240 230 490 260Q730 285 980 250V355H0Z"/>
      <path className="ff-sediment layer3" d="M0 355Q220 330 470 365Q720 400 980 350V470H0Z"/>
      <path className="ff-rock-base" d="M0 470Q250 435 500 480Q740 520 980 460V560H0Z"/>

      <g className="ff-surface-plants">
        <path d="M120 90V48M120 62Q85 40 70 65M120 56Q150 32 168 54"/>
        <path d="M205 90V55M205 68Q176 48 160 67M205 61Q236 42 252 62"/>
        <path d="M305 90V50M305 62Q273 40 258 62M305 57Q337 35 355 55"/>
      </g>

      <g className="ff-organic-remains">
        <path d="M105 188Q150 160 202 185Q175 215 125 213Z"/>
        <path d="M260 205Q305 174 352 199Q330 225 280 229Z"/>
        <ellipse cx="470" cy="195" rx="34" ry="12"/>
        <path d="M555 188Q595 165 635 194Q607 218 566 215Z"/>
      </g>

      <path className="ff-burial-arrow" d="M390 185V315" markerEnd="url(#ff-burial-arrow)"/>
      <text className="ff-label" x="410" y="238">burial by sediment</text>
      <text className="ff-small" x="410" y="262">millions of years</text>

      <g className="ff-coal-seam">
        <path d="M90 350Q220 328 348 350L338 382Q220 360 100 384Z"/>
        <text className="ff-deposit-label" x="205" y="420" textAnchor="middle">coal seam</text>
      </g>

      <g className="ff-oil-trap">
        <path className="ff-cap-rock" d="M520 365Q650 282 805 360Q730 330 655 354Q595 373 520 365Z"/>
        <path className="ff-reservoir" d="M548 380Q650 326 772 380Q742 435 659 443Q587 438 548 380Z"/>
        <path className="ff-oil" d="M574 399Q652 365 744 400Q712 428 658 431Q611 428 574 399Z"/>
        <path className="ff-gas" d="M603 382Q655 358 711 382Q684 393 657 395Q630 394 603 382Z"/>
        <text className="ff-deposit-label" x="655" y="470" textAnchor="middle">petroleum reservoir</text>
        <text className="ff-small" x="663" y="389" textAnchor="middle">natural gas</text>
        <text className="ff-small" x="663" y="419" textAnchor="middle">crude oil</text>
      </g>

      <path className="ff-pressure-arrow" d="M875 205V405" markerEnd="url(#ff-burial-arrow)"/>
      <text className="ff-label" x="855" y="285" textAnchor="end">increasing</text>
      <text className="ff-label" x="855" y="310" textAnchor="end">heat + pressure</text>

      <text className="ff-caption" x="490" y="535" textAnchor="middle">fossil fuels form only where organic material, burial, time, heat and pressure occur under suitable geological conditions</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-fossil-formation-steps">{steps.map((item,i)=><React.Fragment key={item[0]}><article><span>{i+1}</span><div><b>{item[0]}</b><p>{item[1]}</p></div></article>{i<steps.length-1&&<div className="spark-fossil-down" aria-hidden="true">↓</div>}</React.Fragment>)}</div>
  </div>;
}

function PowerPlantView(){
  return <div className="spark-fossil-power">
    <ReviewedScienceDiagram site="FossilFuelsExplorer.jsx:76"><svg className="spark-fossil-power-svg" viewBox="0 0 1060 560" role="img" aria-label="Thermal power station showing fuel combustion boiler steam turbine generator condenser cooling water pump and electricity output">
      <defs>
        <marker id="ff-flow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="ff-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g className="ff-boiler">
        <rect x="55" y="165" width="210" height="245" rx="18"/>
        <path className="ff-flame" d="M115 355Q145 298 174 352Q202 306 220 358Q196 398 165 405Q133 397 115 355Z"/>
        <path className="ff-water-coil" d="M100 210H220V320H100Z"/>
        <text className="ff-title" x="160" y="145" textAnchor="middle">boiler</text>
        <text className="ff-small" x="160" y="445" textAnchor="middle">fuel burns</text>
        <text className="ff-small" x="160" y="468" textAnchor="middle">water becomes steam</text>
      </g>

      <path className="ff-steam-pipe" d="M265 220H365Q390 220 390 245V285" markerEnd="url(#ff-flow-arrow)"/>
      <text className="ff-small" x="330" y="200" textAnchor="middle">high-pressure steam</text>

      <g className="ff-turbine" transform="translate(380 250)">
        <ellipse cx="90" cy="80" rx="92" ry="72"/>
        {[0,45,90,135,180,225,270,315].map(a=><path key={a} transform={"rotate("+a+" 90 80)"} d="M90 80L150 62Q160 80 150 98Z"/>)}
        <circle className="ff-turbine-hub" cx="90" cy="80" r="20"/>
        <text className="ff-title" x="90" y="-12" textAnchor="middle">turbine</text>
      </g>

      <path className="ff-shaft" d="M560 330H675"/>
      <g className="ff-generator">
        <rect x="675" y="260" width="150" height="140" rx="24"/>
        <circle cx="750" cy="330" r="38"/>
        <path d="M720 330Q750 285 780 330Q750 375 720 330Z"/>
        <text className="ff-title" x="750" y="235" textAnchor="middle">generator</text>
      </g>

      <path className="ff-electric-line" d="M825 330H1010" markerEnd="url(#ff-flow-arrow)"/>
      <path className="ff-power-pole" d="M930 250V425M895 290H965M905 335H955"/>
      <text className="ff-label" x="925" y="465" textAnchor="middle">electrical energy to grid</text>

      <path className="ff-exhaust-steam" d="M500 390Q530 430 600 432"/>
      <g className="ff-condenser">
        <rect x="510" y="430" width="235" height="82" rx="16"/>
        <path className="ff-cooling-coil" d="M535 470Q565 445 595 470T655 470T715 470"/>
        <text className="ff-small" x="627" y="545" textAnchor="middle">condenser: steam → water</text>
      </g>

      <path className="ff-water-return" d="M510 470H325Q295 470 295 405V340H265" markerEnd="url(#ff-flow-arrow)"/>
      <g className="ff-pump" transform="translate(325 438)">
        <circle cx="0" cy="0" r="23"/>
        <path d="M-9-9L12 0L-9 9Z"/>
      </g>
      <text className="ff-small" x="325" y="515" textAnchor="middle">pump returns water</text>

      <path className="ff-cooling-water in" d="M745 492H830" markerEnd="url(#ff-flow-arrow)"/>
      <path className="ff-cooling-water out" d="M830 450H745" markerEnd="url(#ff-flow-arrow)"/>
      <text className="ff-small" x="885" y="455">warm cooling water out</text>
      <text className="ff-small" x="885" y="498">cooling water in</text>

      <g className="ff-energy-key">
        <rect x="55" y="35" width="780" height="68" rx="14"/>
        <text className="ff-key-text" x="92" y="76">chemical energy</text>
        <text className="ff-key-arrow" x="235" y="76">→</text>
        <text className="ff-key-text" x="280" y="76">heat</text>
        <text className="ff-key-arrow" x="350" y="76">→</text>
        <text className="ff-key-text" x="395" y="76">kinetic / mechanical</text>
        <text className="ff-key-arrow" x="565" y="76">→</text>
        <text className="ff-key-text" x="610" y="76">electrical energy</text>
      </g>
    </svg></ReviewedScienceDiagram>
    <p>Combustion transfers chemical energy in the fuel to thermal energy in water. Steam turns the turbine, the turbine drives the generator, and the condenser returns steam to liquid water so the cycle can continue.</p>
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
