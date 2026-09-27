import React, { useState } from "react";
import "./populationGrowthExplorer.css";

const POPULATION = [
  {year:1960,value:4},
  {year:1970,value:5.5},
  {year:1980,value:8},
  {year:1990,value:11.5},
  {year:2000,value:16},
  {year:2010,value:21.5},
  {year:2020,value:28},
];

function PopulationGraph() {
  const px = year => 85 + ((year-1960)/60)*760;
  const py = value => 415 - (value/30)*350;
  const path = POPULATION.map((row,index) =>
    (index ? "L" : "M") + px(row.year).toFixed(1) + " " + py(row.value).toFixed(1)
  ).join(" ");

  return (
    <svg viewBox="0 0 930 500" role="img" aria-label="CSEC practice population graph from 1960 to 2020">
      <line className="pg-axis" x1="85" y1="65" x2="85" y2="415" />
      <line className="pg-axis" x1="85" y1="415" x2="845" y2="415" />
      {[0,5,10,15,20,25,30].map(value => (
        <g key={value}>
          <line className="pg-grid" x1="85" y1={py(value)} x2="845" y2={py(value)} />
          <text className="pg-tick" x="70" y={py(value)+5} textAnchor="end">{value}</text>
        </g>
      ))}
      {POPULATION.map(row => (
        <g key={row.year}>
          <line className="pg-grid" x1={px(row.year)} y1="65" x2={px(row.year)} y2="415" />
          <text className="pg-tick" x={px(row.year)} y="444" textAnchor="middle">{row.year}</text>
        </g>
      ))}
      <path className="pg-line" d={path} />
      {POPULATION.map(row => <circle key={row.year} className="pg-point" cx={px(row.year)} cy={py(row.value)} r="7" />)}
      <text className="pg-axis-title" x="465" y="480" textAnchor="middle">Year</text>
      <text className="pg-axis-title" x="22" y="240" textAnchor="middle" transform="rotate(-90 22 240)">Population / millions</text>
    </svg>
  );
}

function PressureScene() {
  const items = [
    ["Food","More people require a larger and reliable food supply."],
    ["Water","Demand for clean fresh water increases."],
    ["Housing","More housing and community infrastructure are needed."],
    ["Jobs","The labour force grows and needs employment opportunities."],
    ["Waste","More sewage and solid waste require safe management."],
    ["Land","Expansion can increase deforestation and habitat loss."],
  ];
  return (
    <div className="spark-population-pressure-grid">
      {items.map(([title,text],index) => (
        <article key={title}>
          <span>{index+1}</span>
          <div><b>{title}</b><p>{text}</p></div>
        </article>
      ))}
    </div>
  );
}

function ChangeScene() {
  return (
    <div className="spark-population-equation">
      <div className="spark-population-equation-row">
        <span className="positive">Births</span>
        <b>+</b>
        <span className="positive">Immigration</span>
        <b>-</b>
        <span className="negative">Deaths</span>
        <b>-</b>
        <span className="negative">Emigration</span>
      </div>
      <strong>= population change</strong>
      <div className="spark-population-change-notes">
        <article><b>Falling death rate</b><span>If birth rate stays high while health care lowers death rate, population grows faster.</span></article>
        <article><b>Earlier childbearing</b><span>Beginning parenthood at younger ages shortens the time between generations and can increase population growth.</span></article>
        <article><b>Migration</b><span>Immigration adds people to a population while emigration removes people.</span></article>
      </div>
    </div>
  );
}

function ResponsesScene() {
  return (
    <div className="spark-population-response">
      <article><b>Education</b><span>Education, including comprehensive family-planning information, helps people make informed decisions.</span></article>
      <article><b>Access to contraception</b><span>Voluntary access to suitable contraceptive methods supports spacing and planning of births.</span></article>
      <article><b>Education of girls and women</b><span>Continued education is associated with later childbearing and wider social and economic opportunities.</span></article>
      <article><b>Resource planning</b><span>Governments and communities can plan housing, water, health care, schools, food systems and waste management for changing populations.</span></article>
      <article><b>Rights and informed choice</b><span>Population programmes should respect individual rights and rely on voluntary, informed decisions rather than coercion.</span></article>
    </div>
  );
}

export default function PopulationGrowthExplorer() {
  const [view,setView] = useState("data");

  return (
    <section className="spark-population-growth">
      <header>
        <span>HUMAN POPULATION</span>
        <h3>Population growth, resources and planning</h3>
        <p>Use the CSEC practice data to connect population change with demand for food, water, housing, jobs and environmental resources.</p>
      </header>

      <div className="spark-population-tabs">
        <button type="button" className={view === "data" ? "active" : ""} onClick={() => setView("data")}>Population data</button>
        <button type="button" className={view === "change" ? "active" : ""} onClick={() => setView("change")}>Why populations change</button>
        <button type="button" className={view === "pressure" ? "active" : ""} onClick={() => setView("pressure")}>Resource pressure</button>
        <button type="button" className={view === "responses" ? "active" : ""} onClick={() => setView("responses")}>Planning responses</button>
      </div>

      {view === "data" && (
        <>
          <div className="spark-population-stage"><PopulationGraph /></div>
          <div className="spark-population-data-note">
            <strong>Bank calculation</strong>
            <span>The practice graph rises from about 8 million in 1980 to 28 million in 2020, an increase of about 20 million.</span>
          </div>
        </>
      )}
      {view === "change" && <ChangeScene />}
      {view === "pressure" && <PressureScene />}
      {view === "responses" && <ResponsesScene />}
    </section>
  );
}
