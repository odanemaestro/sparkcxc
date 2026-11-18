import React from "react";
import { useSavedPracticeState } from "../../routing/usePracticeRouteState";
import GeographySketch from "./GeographySketch";

export const GEOGRAPHY_TOOLS = [
  ["map", "Map measurements"],
  ["climate", "Climate graph"],
  ["fieldwork", "Fieldwork planner"],
  ["sketch", "Sketch pad"],
];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const exampleRain = [66, 47, 46, 55, 100, 140, 126, 151, 164, 180, 152, 90];
const exampleTemp = [25, 25, 26, 26, 27, 28, 28, 28, 28, 27, 27, 26];
const display = number => new Intl.NumberFormat("en", { maximumFractionDigits:2 }).format(number);

function NumberField({ label, value, onChange, min, max, step = "any" }) {
  return <label>{label}<input type="number" min={min} max={max} step={step} value={value ?? ""} onChange={event => onChange(event.target.value)} /></label>;
}

function MapTools({ storageKey }) {
  const [values, setValues] = useSavedPracticeState(storageKey, {});
  const change = (key, value) => setValues(current => ({ ...current, [key]: value }));
  const number = key => values[key]?.trim() ? Number(values[key]) : NaN;
  const scale = number("scale"), length = number("length"), rise = number("rise"), run = number("run");
  const distance = scale > 0 && length >= 0 ? length * scale / 100 : NaN;
  const gradient = rise > 0 && run > 0 ? run / rise : NaN;
  const bearing = number("bearing");
  const back = Number.isInteger(bearing) && bearing >= 0 && bearing < 360 ? String((bearing + 180) % 360).padStart(3, "0") : null;
  return <>
    <h3>Scale and distance</h3>
    <p>Use a print measurement with a ratio scale, or compare the route and scale bar on the same screen.</p>
    <div className="geo-tool-fields">
      <NumberField label="Scale denominator (1 to …)" value={values.scale} onChange={value => change("scale", value)} min={1} />
      <NumberField label="Map distance (cm)" value={values.length} onChange={value => change("length", value)} min={0} />
    </div>
    <output>{Number.isFinite(distance) ? `${display(distance)} m on the ground` : "Enter a scale and map distance."}</output>
    <h3>Gradient</h3>
    <div className="geo-tool-fields">
      <NumberField label="Vertical rise (m)" value={values.rise} onChange={value => change("rise", value)} min={0} />
      <NumberField label="Horizontal distance (m)" value={values.run} onChange={value => change("run", value)} min={1} />
    </div>
    <output>{Number.isFinite(gradient) ? `1 in ${display(gradient)} · ${display(rise / run * 100)}%` : rise === 0 && run > 0 ? "Level ground · 0%" : "Enter both distances in metres."}</output>
    <h3>Reverse bearing</h3>
    <NumberField label="Original bearing (°)" value={values.bearing} onChange={value => change("bearing", value)} min={0} max={359} step={1} />
    <output>{back ? `${back}°` : "Enter a whole number from 0 to 359."}</output>
  </>;
}

function ClimateTools({ storageKey }) {
  const [data, setData] = useSavedPracticeState(storageKey, { rain:exampleRain.map(String), temp:exampleTemp.map(String), example:true });
  const read = (values, min, max) => months.map((_, index) => {
    const raw = values?.[index];
    const value = Number(raw);
    return raw?.trim() && value >= min && value <= max ? value : null;
  });
  const rain = read(data.rain, 0, 3000), temperature = read(data.temp, -80, 65);
  const rainfallMax = Math.max(50, Math.ceil(Math.max(...rain) / 50) * 50);
  const temperatures = temperature.filter(value => value != null);
  const tMin = Math.min(0, Math.floor(Math.min(...temperatures) / 5) * 5);
  const tMax = Math.max(35, Math.ceil(Math.max(...temperatures) / 5) * 5);
  const x = index => 56 + index * 43;
  const y = (value, min, max) => 230 - (value - min) * 170 / (max - min);
  const change = (key, index, value) => setData(previous => ({
    ...previous, example:false, [key]:months.map((_, i) => i === index ? value : previous[key]?.[i] ?? ""),
  }));
  return <>
    <p>{data.example ? "This example uses illustrative monthly data." : "Enter rainfall in millimetres and temperature in degrees Celsius."}</p>
    <div className="geo-chart-scroll" tabIndex={0} role="region" aria-label="Climate graph">
      <svg width="610" height="270" viewBox="0 0 610 270" role="img" aria-label="Monthly rainfall bars and temperature line">
        <rect x="0" y="0" width="610" height="270" fill="#fff" />
        <g fill="#173451" fontSize="13"><text x="15" y="27">Rainfall (mm)</text><text x="495" y="27">Temperature (°C)</text></g>
        {[0, 0.25, 0.5, 0.75, 1].map(fraction => <g key={fraction} fill="#173451" fontSize="11">
          <line x1="34" x2="556" y1={230-170*fraction} y2={230-170*fraction} stroke="#d6e2ec" />
          <text x="29" y={234-170*fraction} textAnchor="end">{display(rainfallMax*fraction)}</text>
          <text x="564" y={234-170*fraction}>{display(tMin+(tMax-tMin)*fraction)}</text>
        </g>)}
        {rain.map((value, index) => value != null && <rect key={months[index]} x={x(index)-12} y={y(value,0,rainfallMax)} width="24" height={230-y(value,0,rainfallMax)} fill="#2a738f" />)}
        {temperature.map((value, index) => value != null && <g key={months[index]}>
          {index > 0 && temperature[index-1] != null && <line x1={x(index-1)} y1={y(temperature[index-1],tMin,tMax)} x2={x(index)} y2={y(value,tMin,tMax)} stroke="#a13923" strokeWidth="2.5" />}
          <circle cx={x(index)} cy={y(value,tMin,tMax)} r="3" fill="#a13923" />
        </g>)}
        {months.map((month,index) => <text key={month} x={x(index)} y="250" fill="#173451" fontSize="11" textAnchor="middle">{month}</text>)}
      </svg>
    </div>
    <p>{rain.every(value => value != null) && `Annual rainfall ${display(rain.reduce((sum, value) => sum+value, 0))} mm. `}
      {temperature.every(value => value != null) && `Annual temperature range ${display(Math.max(...temperature)-Math.min(...temperature))} °C.`}</p>
    <div className="geo-months">
      {months.map((month,index) => <fieldset key={month}><legend>{month}</legend>
        <NumberField label="Rainfall (mm)" value={data.rain[index]} onChange={value => change("rain",index,value)} min={0} max={3000} />
        <NumberField label="Temperature (°C)" value={data.temp[index]} onChange={value => change("temp",index,value)} min={-80} max={65} />
      </fieldset>)}
    </div>
    <button className="secondary" type="button" onClick={() => setData({rain:exampleRain.map(String),temp:exampleTemp.map(String),example:true})}>Load example</button>
  </>;
}

const fieldworkFields = [
  ["question", "Research question", "Name the place and what you plan to compare."],
  ["site", "Study area and safety", "Record sites, access, permissions and your safety plan."],
  ["method", "Sampling and measurements", "Explain how you will choose sites, keep measurements consistent and record units."],
  ["evidence", "Evidence log", "Record dates, observations and source details as you collect them."],
  ["analysis", "Patterns and conclusion", "Use numbers or observations to support your answer. Include limitations."],
];

function FieldworkTools({ storageKey }) {
  const [draft, setDraft] = useSavedPracticeState(storageKey, {});
  return <>
    <p>Plan your own investigation. Your notes are saved in this browser.</p>
    <div className="geo-fieldwork">
      {fieldworkFields.map(([key,label,help]) => <label key={key}>{label}<span>{help}</span>
        <textarea rows={3} maxLength={4000} value={draft[key] || ""} onChange={event => {
          const value = event.target.value;
          setDraft(previous => ({ ...previous, [key]:value }));
        }} />
      </label>)}
    </div>
  </>;
}

function SketchTools({ storageKey }) {
  const [sketch, setSketch] = useSavedPracticeState(storageKey, "");
  return <GeographySketch value={sketch} onChange={setSketch} />;
}

export default function GeographyWorkspace({ tool, setTool, userId }) {
  const storageKey = `spark:geography:tool:${userId || "guest"}:${tool}`;
  const Panel = { map:MapTools, climate:ClimateTools, fieldwork:FieldworkTools, sketch:SketchTools }[tool];
  return <section className="poa-library-card geo-workspace">
    <h1>Geography workshop</h1>
    <div className="geo-tool-actions" role="group" aria-label="Geography tools">
      {GEOGRAPHY_TOOLS.map(([id,name]) => <button type="button" className="secondary" key={id} aria-pressed={tool === id} onClick={() => setTool(id)}>{name}</button>)}
    </div>
    <h2>{GEOGRAPHY_TOOLS.find(([id]) => id === tool)?.[1]}</h2>
    <Panel key={tool} storageKey={storageKey} />
  </section>;
}
