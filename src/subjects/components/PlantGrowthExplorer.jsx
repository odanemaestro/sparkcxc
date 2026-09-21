import React, { useMemo, useState } from "react";
import "./plantGrowthExplorer.css";

const GROWTH = [
  { week:1, height:2 },
  { week:2, height:5 },
  { week:3, height:11 },
  { week:4, height:18 },
  { week:5, height:23 },
  { week:6, height:25 },
];

const DRY_MASS = [
  { day:0, mass:1.0 },
  { day:2, mass:0.88 },
  { day:4, mass:0.72 },
  { day:6, mass:0.65 },
  { day:8, mass:0.72 },
  { day:10, mass:0.86 },
];

function GerminationSetup() {
  const seeds=[0,1,2,3,4];
  return (
    <svg className="spark-germination-requirements-svg" viewBox="0 0 980 620" role="img" aria-label="Seed germination requirements and a fair investigation of temperature using equal numbers of similar seeds on equal amounts of moist material">
      <defs>
        <marker id="pg-requirement-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="pg-arrow-head"/>
        </marker>
      </defs>

      <text className="pg-section-title" x="490" y="38" textAnchor="middle">Three main requirements for germination</text>

      <g className="pg-requirement water" transform="translate(55 72)">
        <rect x="0" y="0" width="260" height="185" rx="18"/>
        <path className="pg-water-drop" d="M72 42Q42 84 72 112Q102 84 72 42Z"/>
        <ellipse className="pg-seed large" cx="170" cy="86" rx="34" ry="22"/>
        <path className="pg-radicle" d="M174 102Q190 128 180 156"/>
        <text className="pg-card-title" x="130" y="145" textAnchor="middle">Water</text>
        <text className="pg-card-note" x="130" y="168" textAnchor="middle">rehydrates tissues and activates enzymes</text>
      </g>

      <g className="pg-requirement oxygen" transform="translate(360 72)">
        <rect x="0" y="0" width="260" height="185" rx="18"/>
        <ellipse className="pg-seed large" cx="130" cy="82" rx="34" ry="22"/>
        <path className="pg-oxygen-arrow" d="M42 82H88" markerEnd="url(#pg-requirement-arrow)"/>
        <path className="pg-oxygen-arrow" d="M218 82H172" markerEnd="url(#pg-requirement-arrow)"/>
        <text className="pg-gas-label" x="40" y="65">O₂</text>
        <text className="pg-gas-label" x="210" y="65">O₂</text>
        <text className="pg-card-title" x="130" y="145" textAnchor="middle">Oxygen</text>
        <text className="pg-card-note" x="130" y="168" textAnchor="middle">needed for aerobic respiration</text>
      </g>

      <g className="pg-requirement temperature" transform="translate(665 72)">
        <rect x="0" y="0" width="260" height="185" rx="18"/>
        <rect className="pg-thermometer" x="64" y="34" width="18" height="74" rx="9"/>
        <circle className="pg-thermometer-bulb" cx="73" cy="116" r="22"/>
        <rect className="pg-thermometer-mercury" x="69" y="62" width="8" height="52" rx="4"/>
        <ellipse className="pg-seed large" cx="170" cy="86" rx="34" ry="22"/>
        <path className="pg-radicle" d="M174 102Q190 128 180 156"/>
        <text className="pg-card-title" x="130" y="145" textAnchor="middle">Suitable temperature</text>
        <text className="pg-card-note" x="130" y="168" textAnchor="middle">allows enzymes to work effectively</text>
      </g>

      <text className="pg-section-title" x="490" y="300" textAnchor="middle">Fair test: investigate the effect of temperature</text>
      <text className="pg-section-subtitle" x="490" y="326" textAnchor="middle">change temperature only; keep seed type, seed number, water and observation time constant</text>

      {[
        {x:95,label:"low temperature",germinated:1},
        {x:365,label:"suitable temperature",germinated:4},
        {x:635,label:"high temperature",germinated:1},
      ].map((dish,index)=>(
        <g key={dish.label} className={"pg-petri setup-"+index} transform={`translate(${dish.x} 355)`}>
          <ellipse className="pg-petri-base" cx="110" cy="95" rx="102" ry="66"/>
          <ellipse className="pg-moist-material" cx="110" cy="95" rx="86" ry="50"/>
          {seeds.map((seedIndex)=>{
            const positions=[[58,82],[90,110],[126,76],[156,108],[118,122]];
            const [cx,cy]=positions[seedIndex];
            const germinated=seedIndex<dish.germinated;
            return <g key={seedIndex}>
              <ellipse className="pg-seed" cx={cx} cy={cy} rx="12" ry="8"/>
              {germinated && <path className="pg-radicle" d={`M${cx+5} ${cy+5}Q${cx+14} ${cy+22} ${cx+9} ${cy+38}`}/>}
            </g>;
          })}
          <text className="pg-dish-label" x="110" y="188" textAnchor="middle">{dish.label}</text>
          <text className="pg-dish-note" x="110" y="211" textAnchor="middle">equal moist material + 5 similar seeds</text>
        </g>
      ))}

      <text className="pg-response-label" x="490" y="594" textAnchor="middle">Responding variable: number or percentage of seeds germinated after the same fixed time.</text>
    </svg>
  );
}

function LineChart({ data, xKey, yKey, xLabel, yLabel }) {
  const maxX = Math.max(...data.map(row => row[xKey]));
  const maxY = Math.max(...data.map(row => row[yKey]));
  const points = data.map(row => ({
    x:95 + (row[xKey] / maxX) * 650,
    y:360 - (row[yKey] / maxY) * 265,
    row,
  }));
  const pathData = points.map((point,index) => (index ? "L" : "M") + point.x + " " + point.y).join(" ");

  return (
    <svg viewBox="0 0 850 450" role="img" aria-label={yLabel + " against " + xLabel}>
      <line className="pg-axis" x1="95" y1="360" x2="765" y2="360" />
      <line className="pg-axis" x1="95" y1="360" x2="95" y2="65" />
      <path className="pg-line" d={pathData} />
      {points.map(point => (
        <g key={String(point.row[xKey]) + "-" + String(point.row[yKey])}>
          <circle className="pg-point" cx={point.x} cy={point.y} r="7" />
          <text className="pg-point-label" x={point.x} y={point.y - 14} textAnchor="middle">{point.row[yKey]}</text>
        </g>
      ))}
      <text className="pg-axis-label" x="430" y="420" textAnchor="middle">{xLabel}</text>
      <text className="pg-axis-label" x="28" y="215" transform="rotate(-90 28 215)" textAnchor="middle">{yLabel}</text>
    </svg>
  );
}

export default function PlantGrowthExplorer() {
  const [mode,setMode] = useState("conditions");

  const content = useMemo(() => {
    if (mode === "growth") return {
      title:"Growth curve",
      note:"Growth is slow at first, becomes rapid, then slows as the plant approaches a mature size.",
      view:<LineChart data={GROWTH} xKey="week" yKey="height" xLabel="Time / weeks" yLabel="Height / cm" />,
    };
    if (mode === "mass") return {
      title:"Dry mass during germination",
      note:"Dry mass falls at first because stored food is respired before the first leaves photosynthesise. It rises later when photosynthesis exceeds the use of stored food.",
      view:<LineChart data={DRY_MASS} xKey="day" yKey="mass" xLabel="Time / days" yLabel="Dry mass / relative units" />,
    };
    return {
      title:"Conditions for germination",
      note:"Most seeds require water, oxygen and a suitable temperature. Light is not a general requirement for germination.",
      view:<GerminationSetup />,
    };
  },[mode]);

  return (
    <section className="spark-plant-growth-explorer">
      <header>
        <span>GROWTH INVESTIGATION</span>
        <h3>Germination and growth patterns</h3>
        <p>Use experimental setups and graphs to connect observations with biological explanations.</p>
      </header>

      <div className="spark-plant-growth-tabs">
        <button type="button" className={mode === "conditions" ? "active" : ""} onClick={() => setMode("conditions")}>Germination conditions</button>
        <button type="button" className={mode === "growth" ? "active" : ""} onClick={() => setMode("growth")}>Height against time</button>
        <button type="button" className={mode === "mass" ? "active" : ""} onClick={() => setMode("mass")}>Dry mass</button>
      </div>

      <div className="spark-plant-growth-grid">
        <div className="spark-plant-growth-stage">{content.view}</div>
        <aside>
          <strong>{content.title}</strong>
          <p>{content.note}</p>
          {mode === "conditions" && (
            <dl>
              <div><dt>Water</dt><dd>Softens the testa and activates enzymes.</dd></div>
              <div><dt>Oxygen</dt><dd>Supports aerobic respiration for energy release.</dd></div>
              <div><dt>Temperature</dt><dd>Affects enzyme activity.</dd></div>
            </dl>
          )}
          {mode === "growth" && <p>When describing a graph, state where growth is slow, where it is rapid and where it levels off. Use values or time intervals where useful.</p>}
          {mode === "mass" && <p>Dry mass ignores changing water content, so it is useful when examining how stored food and photosynthesis affect plant material.</p>}
        </aside>
      </div>
    </section>
  );
}
