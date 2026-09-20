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
  const tubes = [
    { x:80, label:"I", state:"No water" },
    { x:270, label:"II", state:"Germinates" },
    { x:460, label:"III", state:"Too cold" },
    { x:650, label:"IV", state:"No oxygen" },
  ];
  return (
    <svg viewBox="0 0 900 480" role="img" aria-label="Seed germination condition experiment">
      {tubes.map(tube => (
        <g key={tube.label}>
          <path className="pg-test-tube" d={"M" + tube.x + " 90V360Q" + (tube.x + 60) + " 420 " + (tube.x + 120) + " 360V90"} />
          {tube.label !== "I" && (
            <path className="pg-water" d={"M" + (tube.x + 5) + " 255H" + (tube.x + 115) + "V355Q" + (tube.x + 60) + " 405 " + (tube.x + 5) + " 355Z"} />
          )}
          {[0,1,2].map(i => (
            <ellipse key={i} className="pg-seed" cx={tube.x + 38 + i * 25} cy={tube.label === "I" ? 315 : 285} rx="12" ry="8" />
          ))}
          {tube.label === "IV" && <rect className="pg-oil" x={tube.x + 5} y="245" width="110" height="12" />}
          {tube.label === "II" && (
            <path className="pg-radicle" d={"M" + (tube.x + 62) + " 293Q" + (tube.x + 72) + " 320 " + (tube.x + 60) + " 345"} />
          )}
          <text className="pg-tube-label" x={tube.x + 60} y="55" textAnchor="middle">{tube.label}</text>
          <text className="pg-tube-note" x={tube.x + 60} y="445" textAnchor="middle">{tube.state}</text>
        </g>
      ))}
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
