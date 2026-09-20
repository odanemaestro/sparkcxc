import React, { useMemo, useState } from "react";
import "./humanGrowthExplorer.css";

const HEIGHT = {
  ages:[8,9,10,11,12,13,14,15,16,17,18],
  boys:[128,133,138,143,149,156,163,169,173,175,176],
  girls:[127,132,138,145,151,156,159,161,162,163,163],
};

const MASS = {
  ages:[8,10,12,14,16,18],
  boys:[26,32,40,51,61,68],
  girls:[26,33,42,50,54,56],
};

function scalePoint(value,min,max,start,end) {
  if (max === min) return start;
  return start + ((value-min)/(max-min))*(end-start);
}

function GrowthGraph({dataset,metric,unit}) {
  const all = [...dataset.boys,...dataset.girls];
  const minY = Math.floor(Math.min(...all)/10)*10;
  const maxY = Math.ceil(Math.max(...all)/10)*10;
  const xMin = dataset.ages[0];
  const xMax = dataset.ages[dataset.ages.length-1];
  const px = age => scalePoint(age,xMin,xMax,90,850);
  const py = value => scalePoint(value,minY,maxY,410,55);
  const path = values => values.map((value,index) =>
    (index ? "L" : "M") + px(dataset.ages[index]).toFixed(1) + " " + py(value).toFixed(1)
  ).join(" ");

  return (
    <svg viewBox="0 0 930 500" role="img" aria-label={"Average " + metric.toLowerCase() + " of boys and girls in the CSEC practice dataset"}>
      <line className="hg-axis" x1="90" y1="55" x2="90" y2="410" />
      <line className="hg-axis" x1="90" y1="410" x2="850" y2="410" />
      {dataset.ages.map(age => (
        <g key={age}>
          <line className="hg-grid" x1={px(age)} y1="55" x2={px(age)} y2="410" />
          <text className="hg-tick" x={px(age)} y="438" textAnchor="middle">{age}</text>
        </g>
      ))}
      {Array.from({length:6},(_,index) => {
        const value = minY + ((maxY-minY)/5)*index;
        return (
          <g key={value}>
            <line className="hg-grid" x1="90" y1={py(value)} x2="850" y2={py(value)} />
            <text className="hg-tick" x="76" y={py(value)+5} textAnchor="end">{Math.round(value)}</text>
          </g>
        );
      })}
      <path className="hg-line boys" d={path(dataset.boys)} />
      <path className="hg-line girls" d={path(dataset.girls)} />
      {dataset.boys.map((value,index) => <circle key={"b-"+index} className="hg-point boys" cx={px(dataset.ages[index])} cy={py(value)} r="6" />)}
      {dataset.girls.map((value,index) => <circle key={"g-"+index} className="hg-point girls" cx={px(dataset.ages[index])} cy={py(value)} r="6" />)}
      <text className="hg-axis-title" x="470" y="480" textAnchor="middle">Age / years</text>
      <text className="hg-axis-title" x="22" y="235" textAnchor="middle" transform="rotate(-90 22 235)">{metric} / {unit}</text>
      <g transform="translate(675 75)">
        <line className="hg-line boys" x1="0" y1="0" x2="50" y2="0" />
        <text className="hg-legend" x="60" y="5">boys</text>
        <line className="hg-line girls" x1="0" y1="30" x2="50" y2="30" />
        <text className="hg-legend" x="60" y="35">girls</text>
      </g>
    </svg>
  );
}

function biggestGain(dataset,key) {
  let best = null;
  for (let index=1; index<dataset.ages.length; index += 1) {
    const gain = dataset[key][index]-dataset[key][index-1];
    if (!best || gain > best.gain) {
      best = {from:dataset.ages[index-1],to:dataset.ages[index],gain};
    }
  }
  return best;
}

export default function HumanGrowthExplorer() {
  const [metric,setMetric] = useState("height");
  const dataset = metric === "height" ? HEIGHT : MASS;
  const boysGain = useMemo(() => biggestGain(dataset,"boys"),[dataset]);
  const girlsGain = useMemo(() => biggestGain(dataset,"girls"),[dataset]);

  return (
    <section className="spark-human-growth">
      <header>
        <span>HUMAN GROWTH DATA</span>
        <h3>Compare male and female growth patterns</h3>
        <p>These values reproduce the CSEC practice datasets in SPARK. They are group averages and do not predict the growth of an individual person.</p>
      </header>

      <div className="spark-human-growth-tabs">
        <button type="button" className={metric === "height" ? "active" : ""} onClick={() => setMetric("height")}>Height data</button>
        <button type="button" className={metric === "mass" ? "active" : ""} onClick={() => setMetric("mass")}>Mass data</button>
      </div>

      <div className="spark-human-growth-stage">
        <GrowthGraph dataset={dataset} metric={metric === "height" ? "Height" : "Mass"} unit={metric === "height" ? "cm" : "kg"} />
      </div>

      <div className="spark-human-growth-insights">
        <article>
          <b>Boys</b>
          <span>Largest interval increase in this dataset: ages {boysGain.from} to {boysGain.to}, change {boysGain.gain} {metric === "height" ? "cm" : "kg"}.</span>
        </article>
        <article>
          <b>Girls</b>
          <span>Largest interval increase in this dataset: ages {girlsGain.from} to {girlsGain.to}, change {girlsGain.gain} {metric === "height" ? "cm" : "kg"}.</span>
        </article>
        <article>
          <b>Puberty pattern</b>
          <span>Girls usually enter puberty and their adolescent growth spurt earlier on average. Boys generally begin their major adolescent growth spurt later and may continue rapid growth for longer.</span>
        </article>
      </div>
    </section>
  );
}
