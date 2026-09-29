import React,{useMemo,useState} from "react";
import "./thermometerComparisonExplorer.css";

function LiquidView(){
  const [temp,setTemp]=useState(37);
  const height=Math.max(0,Math.min(100,(Number(temp)+10)/120*100));
  return <div className="spark-thermometer-liquid">
    <div className="spark-thermometer-vertical">
      <div className="spark-thermometer-scale">
        {[110,90,70,50,30,10,-10].map(t=><span key={t} style={{bottom:`${(t+10)/120*100}%`}}>{t} °C</span>)}
        <div className="spark-thermometer-tube"><div className="spark-thermometer-column" style={{height:`${height}%`}}></div></div>
        <div className="spark-thermometer-bulb"></div>
      </div>
    </div>
    <article><span>LIQUID EXPANSION</span><label>Temperature, °C<input type="range" min="-10" max="110" value={temp} onChange={e=>setTemp(Number(e.target.value))}/></label><strong>{temp} °C</strong><p>As temperature rises, the thermometric liquid expands and moves farther along the narrow bore.</p></article>
  </div>;
}

function CompareView(){
  const rows=[
    ["Laboratory thermometer","About -10 °C to 110 °C in the bank","General laboratory temperatures","Wide range, no clinical constriction"],
    ["Traditional clinical mercury thermometer","About 35 °C to 42 °C","Human body temperature","Constriction holds the maximum reading until shaken down"],
    ["Alcohol thermometer","Extends to lower temperatures than mercury","Low-temperature measurements","Alcohol freezes near -114 °C, much lower than mercury near -39 °C"],
    ["Digital thermometer","Depends on model","Clinical, food, laboratory and other uses","Fast display, easy reading and no mercury column"],
  ];
  return <div className="spark-thermometer-table"><div className="spark-thermometer-table-head"><span>Type</span><span>Typical range / bank range</span><span>Use</span><span>Feature</span></div>{rows.map(row=><div key={row[0]}>{row.map(cell=><p key={cell}>{cell}</p>)}</div>)}</div>;
}

function ClinicalView(){
  const [shaken,setShaken]=useState(false);
  return <div className="spark-clinical-thermometer">
    <svg viewBox="0 0 900 300" role="img" aria-label="Traditional clinical thermometer with bulb, constriction and narrow range">
      <rect className="ct-glass" x="80" y="120" width="700" height="54" rx="27"/>
      <circle className="ct-bulb" cx="100" cy="147" r="31"/>
      <line className="ct-mercury" x1="105" y1="147" x2={shaken?"220":"610"} y2="147"/>
      <path className="ct-constriction" d="M245 132L265 147L245 162"/>
      {[35,36,37,38,39,40,41,42].map((t,i)=><g key={t}><line className="ct-tick" x1={300+i*60} y1="105" x2={300+i*60} y2="120"/><text className="ct-label" x={300+i*60} y="92" textAnchor="middle">{t}</text></g>)}
      <text className="ct-unit" x="770" y="100">°C</text>
      <line className="ct-callout" x1="255" y1="165" x2="210" y2="235"/><text className="ct-callout-text" x="200" y="250" textAnchor="end">constriction</text>
    </svg>
    <div className="spark-clinical-controls"><button type="button" className={!shaken?"active":""} onClick={()=>setShaken(false)}>Previous reading held</button><button type="button" className={shaken?"active":""} onClick={()=>setShaken(true)}>Shaken down</button></div>
    <p>{shaken?"Shaking a traditional mercury clinical thermometer forces the liquid column back past the constriction towards the bulb before the next measurement.":"The constriction prevents the mercury column from returning immediately to the bulb, so the maximum reading remains visible after the thermometer is removed."}</p>
  </div>;
}

function ReadScaleView(){
  const [reading,setReading]=useState(37);
  const x=70+(reading/50)*360;
  return <div className="spark-read-thermometer">
    <svg viewBox="0 0 500 130" role="img" aria-label={"Laboratory thermometer reading "+reading+" degrees Celsius"}>
      <rect className="rt-glass" x="35" y="45" width="430" height="30" rx="15"/>
      <circle className="rt-bulb" cx="48" cy="60" r="12"/>
      {[0,10,20,30,40,50].map(t=><g key={t}><line className="rt-major" x1={70+t/50*360} y1="35" x2={70+t/50*360} y2="48"/><text className="rt-label" x={70+t/50*360} y="105" textAnchor="middle">{t}</text></g>)}
      {Array.from({length:51},(_,t)=>t).filter(t=>t%10!==0).map(t=><line key={t} className="rt-minor" x1={70+t/50*360} y1="40" x2={70+t/50*360} y2="47"/>)}
      <line className="rt-liquid" x1="50" y1="60" x2={x} y2="60"/>
      <text className="rt-unit" x="455" y="105">°C</text>
    </svg>
    <label>Set reading<input type="range" min="0" max="50" value={reading} onChange={e=>setReading(Number(e.target.value))}/></label>
    <strong>{reading} °C</strong>
    <p>Read the end of the liquid column against the scale. In the bank diagram, the column ends at 37 °C.</p>
  </div>;
}

function MercuryAlcoholView(){
  return <div className="spark-mercury-alcohol">
    <article><span>MERCURY</span><h4>Traditional thermometric liquid</h4><p>Mercury is opaque, expands fairly uniformly and does not wet glass strongly. Its freezing point is about -39 °C.</p><strong>Important: mercury is toxic if released.</strong></article>
    <article><span>ALCOHOL</span><h4>Useful at much lower temperatures</h4><p>Ethanol freezes near -114 °C, so alcohol thermometers remain useful at temperatures where mercury would freeze.</p><strong>Alcohol is usually dyed so the liquid column is easier to see.</strong></article>
  </div>;
}

function DigitalView(){
  return <div className="spark-digital-thermometer">
    <div className="spark-digital-display"><span>37.0</span><b>°C</b></div>
    <div className="spark-digital-notes"><p>Electronic sensors convert temperature into an electrical signal and display the result numerically.</p><p>Advantages include easy reading, rapid response for many models and no mercury column.</p><p>Range, accuracy and response time depend on the thermometer design, so choose a model suited to the task.</p></div>
  </div>;
}

export default function ThermometerComparisonExplorer(){
  const [view,setView]=useState("liquid");
  const summary=useMemo(()=>({
    liquid:"Liquid-in-glass thermometers rely on predictable thermal expansion.",
    compare:"Thermometer range and design must match the temperature and task being measured.",
    clinical:"The constriction of a traditional clinical thermometer holds the maximum reading until the column is shaken down.",
    scale:"A thermometer reading is taken where the liquid column ends on the calibrated scale.",
    liquids:"Alcohol is preferred for very low temperatures because its freezing point is far below that of mercury.",
    digital:"Digital thermometers use electronic sensors and avoid mercury exposure.",
  })[view],[view]);

  return <section className="spark-thermometer-comparison">
    <header><span>THERMOMETERS</span><h3>Compare thermometer types, ranges and working principles</h3><p>Temperature describes how hot or cold a body is. The SI unit is the kelvin, K, while degrees Celsius, °C, are widely used in everyday and laboratory measurements.</p></header>
    <div className="spark-thermometer-tabs">{[["liquid","Liquid expansion"],["compare","Compare types"],["clinical","Clinical thermometer"],["scale","Read a scale"],["liquids","Mercury vs alcohol"],["digital","Digital"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-thermometer-stage">
      {view==="liquid"&&<LiquidView/>}
      {view==="compare"&&<CompareView/>}
      {view==="clinical"&&<ClinicalView/>}
      {view==="scale"&&<ReadScaleView/>}
      {view==="liquids"&&<MercuryAlcoholView/>}
      {view==="digital"&&<DigitalView/>}
    </div>
    <div className="spark-thermometer-summary"><strong>{summary}</strong><span>A thermometer measures temperature. It does not directly measure the total thermal energy stored in an object.</span></div>
  </section>;
}
