import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./thermometerTypesExplorer.css";

const TYPES=[
  {id:"lab",name:"Laboratory thermometer",range:"about -10 °C to 110 °C",use:"Experiments and general laboratory measurements",feature:"No constriction. Reading changes continuously with temperature."},
  {id:"clinical",name:"Clinical thermometer",range:"about 35 °C to 42 °C",use:"Human body temperature",feature:"Traditional liquid-in-glass versions have a constriction that holds the maximum reading until shaken down."},
  {id:"digital",name:"Digital thermometer",range:"depends on model",use:"Body, food, room or laboratory measurements",feature:"Electronic sensor with a quick, easy-to-read display and no mercury column."},
];

function CompareView(){
  const [id,setId]=useState("lab");
  const item=TYPES.find(t=>t.id===id);
  return <div className="spark-thermometer-compare">
    <div className="spark-thermometer-buttons">{TYPES.map(t=><button type="button" key={t.id} className={id===t.id?"active":""} onClick={()=>setId(t.id)}>{t.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><h4>{item.range}</h4><div><b>Use</b><p>{item.use}</p></div><div><b>Key feature</b><p>{item.feature}</p></div></article>
  </div>;
}

function LiquidView(){
  const [temp,setTemp]=useState(37);
  const t=Math.min(50,Math.max(0,Number(temp)||0));
  const x=70+(t/50)*360;
  return <div className="spark-liquid-thermometer">
    <ReviewedScienceDiagram site="ThermometerTypesExplorer.jsx:24"><svg viewBox="0 0 500 150" role="img" aria-label={"Thermometer reading "+t+" degrees Celsius"}>
      <rect className="tt-body" x="35" y="45" width="430" height="36" rx="18"/>
      <circle className="tt-bulb" cx="50" cy="63" r="14"/>
      <line className="tt-column" x1="50" y1="63" x2={x} y2="63"/>
      {[0,10,20,30,40,50].map(v=>{const tx=70+(v/50)*360;return <g key={v}><line className="tt-tick" x1={tx} y1="42" x2={tx} y2="57"/><text className="tt-scale" x={tx} y="112" textAnchor="middle">{v}</text></g>})}
      <text className="tt-unit" x="450" y="112">°C</text>
    </svg></ReviewedScienceDiagram>
    <label>Set reading<input type="range" min="0" max="50" value={t} onChange={e=>setTemp(e.target.value)}/></label>
    <strong>{t} °C</strong>
    <p>The liquid expands when heated and rises along the narrow bore. A narrow bore makes small volume changes easier to see.</p>
  </div>;
}

function ClinicalView(){
  return <div className="spark-clinical-thermometer">
    <ReviewedScienceDiagram site="ThermometerTypesExplorer.jsx:39"><svg viewBox="0 0 780 330" role="img" aria-label="Clinical thermometer with bulb, narrow bore and constriction">
      <rect className="ct-glass" x="110" y="135" width="560" height="64" rx="32"/>
      <circle className="ct-bulb" cx="135" cy="167" r="28"/>
      <line className="ct-mercury" x1="135" y1="167" x2="480" y2="167"/>
      <path className="ct-kink" d="M480 167q18 -25 36 0q18 25 36 0"/>
      <line className="ct-mercury" x1="552" y1="167" x2="620" y2="167"/>
      <text className="ct-label" x="135" y="95" textAnchor="middle">bulb</text>
      <line className="ct-callout" x1="135" y1="110" x2="135" y2="138"/>
      <text className="ct-label" x="515" y="95" textAnchor="middle">constriction</text>
      <line className="ct-callout" x1="515" y1="110" x2="515" y2="142"/>
      <text className="ct-label" x="615" y="95" textAnchor="middle">held reading</text>
      <line className="ct-callout" x1="615" y1="110" x2="615" y2="142"/>
      <text className="ct-range" x="390" y="255" textAnchor="middle">Typical clinical range: 35 °C to 42 °C</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-clinical-notes"><article><b>Why a constriction?</b><p>It prevents the liquid column from returning immediately to the bulb, so the maximum reading remains visible after removal.</p></article><article><b>Why shake before reuse?</b><p>Shaking forces the liquid back past the constriction into the bulb so a new reading can be taken.</p></article></div>
  </div>;
}

function LiquidChoiceView(){
  return <div className="spark-thermometer-liquids">
    <article><span>ALCOHOL</span><h4>Better for very low temperatures</h4><p>Alcohol freezes near -115 °C, far below mercury's freezing point near -39 °C. It is often coloured because pure alcohol is hard to see.</p></article>
    <article><span>MERCURY</span><h4>Historically useful but toxic</h4><p>Mercury expands fairly uniformly, is opaque and does not wet glass. A major disadvantage is toxicity if a thermometer breaks.</p></article>
    <article><span>DIGITAL</span><h4>No liquid column needed</h4><p>Electronic thermometers are quick to read and avoid mercury exposure. They require a sensor and electronic power source.</p></article>
  </div>;
}

function TemperatureView(){
  return <div className="spark-temperature-basics">
    <article><span>TEMPERATURE</span><h4>How hot or cold an object is</h4><p>Temperature is not the same as total thermal energy. Two objects can have the same temperature but very different masses and thermal energies.</p></article>
    <article><span>COMMON UNIT</span><h4>degree Celsius, °C</h4><p>Celsius is widely used in daily and laboratory measurements.</p></article>
    <article><span>SI UNIT</span><h4>kelvin, K</h4><p>The kelvin is the SI base unit for thermodynamic temperature.</p></article>
  </div>;
}

export default function ThermometerTypesExplorer(){
  const [view,setView]=useState("compare");
  const summary=useMemo(()=>({
    compare:"Choose a thermometer by range, safety, response and intended use.",
    liquid:"Liquid-in-glass thermometers rely on thermal expansion in a narrow bore.",
    clinical:"The constriction in a traditional clinical thermometer holds the maximum reading for observation.",
    liquids:"Alcohol suits lower temperatures, mercury has useful physical properties but serious toxicity concerns, and digital sensors avoid liquid mercury.",
    basics:"Temperature measures hotness, not the total thermal energy stored in an object.",
  })[view],[view]);

  return <section className="spark-thermometer-types">
    <header><span>THERMOMETERS</span><h3>Compare thermometer types, ranges and working principles</h3><p>Thermometers measure temperature using a physical property that changes predictably with temperature, such as liquid volume or electrical resistance.</p></header>
    <div className="spark-thermometer-tabs">{[["compare","Types"],["liquid","Read a thermometer"],["clinical","Clinical thermometer"],["liquids","Mercury, alcohol, digital"],["basics","Temperature basics"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-thermometer-stage">
      {view==="compare"&&<CompareView/>}
      {view==="liquid"&&<LiquidView/>}
      {view==="clinical"&&<ClinicalView/>}
      {view==="liquids"&&<LiquidChoiceView/>}
      {view==="basics"&&<TemperatureView/>}
    </div>
    <div className="spark-thermometer-summary"><strong>{summary}</strong><span>Always read a liquid-in-glass thermometer at eye level and use the smallest scale division to determine the reading correctly.</span></div>
  </section>;
}

export { TYPES };
