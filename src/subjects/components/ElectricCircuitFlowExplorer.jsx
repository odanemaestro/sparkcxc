import React,{useMemo,useState} from "react";
import "./electricCircuitFlowExplorer.css";

function Symbol({type,label}){
  return <div className="spark-circuit-symbol-card">
    <svg viewBox="0 0 180 80" role="img" aria-label={label}>
      <line className="cs-wire" x1="10" y1="40" x2="55" y2="40"/>
      <line className="cs-wire" x1="125" y1="40" x2="170" y2="40"/>
      {type==="cell"&&<><line className="cs-cell-long" x1="78" y1="15" x2="78" y2="65"/><line className="cs-cell-short" x1="101" y1="26" x2="101" y2="54"/><line className="cs-wire" x1="55" y1="40" x2="78" y2="40"/><line className="cs-wire" x1="101" y1="40" x2="125" y2="40"/></>}
      {type==="lamp"&&<><line className="cs-wire" x1="55" y1="40" x2="70" y2="40"/><circle className="cs-component" cx="90" cy="40" r="20"/><line className="cs-cross" x1="76" y1="26" x2="104" y2="54"/><line className="cs-cross" x1="76" y1="54" x2="104" y2="26"/><line className="cs-wire" x1="110" y1="40" x2="125" y2="40"/></>}
      {type==="resistor"&&<><line className="cs-wire" x1="55" y1="40" x2="70" y2="40"/><rect className="cs-component" x="70" y="27" width="40" height="26"/><line className="cs-wire" x1="110" y1="40" x2="125" y2="40"/></>}
      {type==="fuse"&&<><line className="cs-wire" x1="55" y1="40" x2="65" y2="40"/><rect className="cs-component" x="65" y="27" width="50" height="26"/><line className="cs-fuse-line" x1="60" y1="40" x2="120" y2="40"/><line className="cs-wire" x1="115" y1="40" x2="125" y2="40"/></>}
      {type==="switch"&&<><circle className="cs-node" cx="70" cy="40" r="5"/><circle className="cs-node" cx="110" cy="40" r="5"/><line className="cs-switch" x1="74" y1="37" x2="105" y2="20"/><line className="cs-wire" x1="55" y1="40" x2="65" y2="40"/><line className="cs-wire" x1="115" y1="40" x2="125" y2="40"/></>}
      {type==="ammeter"&&<><line className="cs-wire" x1="55" y1="40" x2="68" y2="40"/><circle className="cs-component" cx="90" cy="40" r="22"/><text className="cs-meter-text" x="90" y="47" textAnchor="middle">A</text><line className="cs-wire" x1="112" y1="40" x2="125" y2="40"/></>}
      {type==="voltmeter"&&<><line className="cs-wire" x1="55" y1="40" x2="68" y2="40"/><circle className="cs-component" cx="90" cy="40" r="22"/><text className="cs-meter-text" x="90" y="47" textAnchor="middle">V</text><line className="cs-wire" x1="112" y1="40" x2="125" y2="40"/></>}
      {type==="transformer"&&<><path className="cs-coil" d="M63 18Q78 18 78 28Q78 38 63 38Q78 38 78 48Q78 58 63 58"/><path className="cs-coil" d="M117 18Q102 18 102 28Q102 38 117 38Q102 38 102 48Q102 58 117 58"/><line className="cs-core" x1="86" y1="10" x2="86" y2="70"/><line className="cs-core" x1="94" y1="10" x2="94" y2="70"/></>}
    </svg>
    <strong>{label}</strong>
  </div>;
}

function SymbolsView(){
  const symbols=[["cell","Cell"],["lamp","Lamp"],["resistor","Resistor"],["fuse","Fuse"],["switch","Open switch"],["ammeter","Ammeter"],["voltmeter","Voltmeter"],["transformer","Transformer"]];
  return <div className="spark-circuit-symbols">{symbols.map(([type,label])=><Symbol key={type} type={type} label={label}/>)}</div>;
}

function SeriesParallelView(){
  const [mode,setMode]=useState("series");
  const series=mode==="series";
  return <div className="spark-series-parallel">
    <div className="spark-series-toggle"><button type="button" className={series?"active":""} onClick={()=>setMode("series")}>Series</button><button type="button" className={!series?"active":""} onClick={()=>setMode("parallel")}>Parallel</button></div>
    <svg viewBox="0 0 820 400" role="img" aria-label={series?"Two lamps in series":"Two lamps in parallel"}>
      {series?<>
        <path className="cp-wire" d="M130 200H245M325 200H495M575 200H690V315H130V200"/>
        <line className="cp-cell-long" x1="360" y1="285" x2="360" y2="345"/><line className="cp-cell-short" x1="410" y1="297" x2="410" y2="333"/>
        <circle className="cp-lamp" cx="285" cy="200" r="40"/><line className="cp-cross" x1="258" y1="173" x2="312" y2="227"/><line className="cp-cross" x1="258" y1="227" x2="312" y2="173"/>
        <circle className="cp-lamp" cx="535" cy="200" r="40"/><line className="cp-cross" x1="508" y1="173" x2="562" y2="227"/><line className="cp-cross" x1="508" y1="227" x2="562" y2="173"/>
        <text className="cp-title" x="410" y="85" textAnchor="middle">one path for current</text>
      </>:<>
        <path className="cp-wire" d="M150 115H670V315H150V115M260 115V315M560 115V315"/>
        <line className="cp-cell-long" x1="360" y1="285" x2="360" y2="345"/><line className="cp-cell-short" x1="410" y1="297" x2="410" y2="333"/>
        <circle className="cp-lamp" cx="260" cy="210" r="40"/><line className="cp-cross" x1="233" y1="183" x2="287" y2="237"/><line className="cp-cross" x1="233" y1="237" x2="287" y2="183"/>
        <circle className="cp-lamp" cx="560" cy="210" r="40"/><line className="cp-cross" x1="533" y1="183" x2="587" y2="237"/><line className="cp-cross" x1="533" y1="237" x2="587" y2="183"/>
        <text className="cp-title" x="410" y="70" textAnchor="middle">separate branches</text>
      </>}
    </svg>
    <div className="spark-circuit-comparison">
      {series?<><article><b>Current</b><p>Same current flows through every component in the single path.</p></article><article><b>Resistance</b><p>Series resistances add. Adding another lamp raises total resistance and usually reduces current.</p></article><article><b>Broken lamp</b><p>A break stops current everywhere, so all lamps go out.</p></article></>:<><article><b>Voltage</b><p>Each branch is connected across the supply and receives the full branch voltage.</p></article><article><b>Current</b><p>Main current equals the sum of branch currents.</p></article><article><b>Broken lamp</b><p>Other branches stay complete, so other lamps remain lit.</p></article></>}
    </div>
  </div>;
}

function MetersView(){
  return <div className="spark-meter-placement">
    <div className="spark-meter-diagram">
      <svg viewBox="0 0 800 390" role="img" aria-label="Circuit showing ammeter in series and voltmeter in parallel across a resistor">
        <path className="mp-wire" d="M135 210H245M315 210H480M570 210H665V330H135V210"/>
        <circle className="mp-meter" cx="280" cy="210" r="35"/><text className="mp-meter-text" x="280" y="220" textAnchor="middle">A</text>
        <rect className="mp-resistor" x="480" y="185" width="90" height="50" rx="4"/>
        <path className="mp-wire" d="M480 210V105H570V210"/>
        <circle className="mp-meter" cx="525" cy="105" r="35"/><text className="mp-meter-text" x="525" y="115" textAnchor="middle">V</text>
        <line className="mp-cell-long" x1="365" y1="300" x2="365" y2="360"/><line className="mp-cell-short" x1="420" y1="312" x2="420" y2="348"/>
        <text className="mp-note" x="280" y="160" textAnchor="middle">ammeter in series</text>
        <text className="mp-note" x="525" y="50" textAnchor="middle">voltmeter in parallel</text>
      </svg>
    </div>
    <div className="spark-meter-notes"><article><b>Current</b><p>Measured in amperes, A. An ammeter is placed in series so the circuit current passes through it.</p></article><article><b>Potential difference</b><p>Measured in volts, V. A voltmeter is connected in parallel across the component.</p></article><article><b>Resistance</b><p>Measured in ohms, Ω. For an ohmic component, V = IR.</p></article><article><b>Power</b><p>Measured in watts, W. Electrical power is P = IV.</p></article></div>
  </div>;
}

function CalculatorView(){
  const [voltage,setVoltage]=useState(12);
  const [resistance,setResistance]=useState(6);
  const [powerVoltage,setPowerVoltage]=useState(240);
  const [current,setCurrent]=useState(10);
  const safeR=Math.max(0.001,Number(resistance)||0.001);
  const ohmCurrent=(Number(voltage)||0)/safeR;
  const power=(Number(powerVoltage)||0)*(Number(current)||0);
  return <div className="spark-circuit-calculators">
    <article><span>OHM'S LAW</span><h4>V = IR</h4><label>Voltage, V<input type="number" value={voltage} onChange={e=>setVoltage(e.target.value)}/></label><label>Resistance, Ω<input type="number" min="0.001" value={resistance} onChange={e=>setResistance(e.target.value)}/></label><strong>Current = {Math.round(ohmCurrent*100)/100} A</strong></article>
    <article><span>ELECTRICAL POWER</span><h4>P = IV</h4><label>Voltage, V<input type="number" value={powerVoltage} onChange={e=>setPowerVoltage(e.target.value)}/></label><label>Current, A<input type="number" value={current} onChange={e=>setCurrent(e.target.value)}/></label><strong>Power = {(Math.round(power*100)/100).toLocaleString()} W</strong></article>
  </div>;
}

function TransformerView(){
  return <div className="spark-transformer-view">
    <svg className="spark-transformer-svg" viewBox="0 0 920 470" role="img" aria-label="Transformer showing alternating current in the primary coil producing changing magnetic flux in an iron core and inducing alternating voltage in the secondary coil">
      <defs>
        <marker id="tf-flux-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="tf-arrow-head"/>
        </marker>
      </defs>

      <g className="tf-core-frame">
        <rect x="325" y="70" width="270" height="300" rx="18"/>
        <rect className="tf-core-window" x="395" y="130" width="130" height="180" rx="10"/>
      </g>

      <g className="tf-primary-coil">
        {[0,1,2,3,4,5].map(i=><path key={i} d={"M310 "+(115+i*42)+"Q265 "+(115+i*42)+" 265 "+(136+i*42)+"Q265 "+(157+i*42)+" 310 "+(157+i*42)}/>)}
      </g>
      <g className="tf-secondary-coil">
        {[0,1,2,3,4,5].map(i=><path key={i} d={"M610 "+(115+i*42)+"Q655 "+(115+i*42)+" 655 "+(136+i*42)+"Q655 "+(157+i*42)+" 610 "+(157+i*42)}/>)}
      </g>

      <path className="tf-wire" d="M80 155H250M80 305H250"/>
      <path className="tf-wire" d="M670 155H840M670 305H840"/>

      <g className="tf-ac-input">
        <path d="M100 210Q130 165 160 210T220 210"/>
        <text x="160" y="245" textAnchor="middle">a.c. input</text>
      </g>
      <g className="tf-ac-output">
        <path d="M700 210Q730 165 760 210T820 210"/>
        <text x="760" y="245" textAnchor="middle">induced a.c. output</text>
      </g>

      <g className="tf-flux-path">
        <path d="M365 105H555" markerEnd="url(#tf-flux-arrow)"/>
        <path d="M560 335H370" markerEnd="url(#tf-flux-arrow)"/>
      </g>
      <text className="tf-flux-label" x="460" y="54" textAnchor="middle">changing magnetic flux in iron core</text>

      <text className="tf-label" x="285" y="415" textAnchor="middle">primary coil</text>
      <text className="tf-label" x="635" y="415" textAnchor="middle">secondary coil</text>
      <text className="tf-label" x="460" y="220" textAnchor="middle" transform="rotate(-90 460 220)">iron core</text>

      <text className="tf-small" x="160" y="355" textAnchor="middle">alternating current produces a changing magnetic field</text>
      <text className="tf-small" x="760" y="355" textAnchor="middle">changing flux induces an alternating potential difference</text>
    </svg>
    <p>A transformer changes the voltage of an alternating-current supply. Alternating current in the primary coil produces a changing magnetic field in the iron core. The changing magnetic flux links the secondary coil and induces an alternating potential difference there. A transformer does not store electricity and it is not a measuring device.</p>
  </div>;
}

export default function ElectricCircuitFlowExplorer(){
  const [view,setView]=useState("symbols");
  const summary=useMemo(()=>({
    symbols:"Circuit diagrams use standard symbols so electrical connections are clear and universal.",
    circuits:"Series circuits have one path, while parallel circuits provide separate branches.",
    meters:"Place meters according to what they measure: current through a path, or potential difference across a component.",
    calculations:"Ohm's law and the power equation link current, voltage, resistance and power.",
    transformer:"Transformers change a.c. voltage using electromagnetic induction between coils.",
  })[view],[view]);

  return <section className="spark-electric-circuit-flow">
    <header><span>ELECTRIC CIRCUITS</span><h3>Read symbols, compare circuit paths and calculate current, voltage, resistance and power</h3><p>An electric circuit needs a complete conducting path and a source of potential difference. Current describes charge flow, while resistance opposes that flow.</p></header>
    <div className="spark-circuit-tabs">{[["symbols","Circuit symbols"],["circuits","Series and parallel"],["meters","Meters"],["calculations","Calculations"],["transformer","Transformer"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-circuit-stage">
      {view==="symbols"&&<SymbolsView/>}
      {view==="circuits"&&<SeriesParallelView/>}
      {view==="meters"&&<MetersView/>}
      {view==="calculations"&&<CalculatorView/>}
      {view==="transformer"&&<TransformerView/>}
    </div>
    <div className="spark-circuit-summary"><strong>{summary}</strong><span>Current is measured in amperes, potential difference in volts, resistance in ohms and power in watts.</span></div>
  </section>;
}
