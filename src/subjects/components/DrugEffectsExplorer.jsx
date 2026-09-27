import React, { useState } from "react";
import "./drugEffectsExplorer.css";

const VIEWS = {
  classes:{
    label:"Drug classes",
    title:"Drugs affect the nervous system in different ways",
    note:"CSEC groups selected drugs as stimulants, depressants, hallucinogens and narcotics. Modern medical terminology usually describes heroin and morphine as opioids.",
  },
  driving:{
    label:"Alcohol and driving",
    title:"Alcohol impairs skills needed for safe driving",
    note:"Alcohol is a central nervous system depressant. Reaction time, judgement, attention, balance and coordination become impaired, increasing crash risk.",
  },
  steroids:{
    label:"Anabolic steroids",
    title:"Muscle gain does not remove health risks",
    note:"Anabolic steroid misuse can increase muscle mass but can also affect the cardiovascular, liver, hormonal and reproductive systems.",
  },
  dependence:{
    label:"Dependence and addiction",
    title:"Physical dependence and addiction are related but different",
    note:"Physical dependence means the body has adapted and withdrawal can occur if use stops suddenly. Addiction involves compulsive drug seeking or use despite harmful consequences.",
  },
  consequences:{
    label:"Wider effects",
    title:"Drug misuse can affect health, family life and society",
    note:"Effects can include impaired health, family conflict, financial pressure, reduced school or work performance, injuries, crime and increased health-care and social costs.",
  },
};

function ClassesScene() {
  const rows=[
    {kind:"Stimulants",examples:"Caffeine, cocaine",effect:"Increase central nervous system activity and alertness. Some also raise heart rate and blood pressure."},
    {kind:"Depressants",examples:"Alcohol, some sedative medicines",effect:"Slow central nervous system activity. They can impair reaction time, judgement, balance and coordination."},
    {kind:"Hallucinogens",examples:"LSD",effect:"Alter perception, thought and sensory experience."},
    {kind:"Opioids",examples:"Morphine, heroin",effect:"Relieve pain and can cause drowsiness and dangerous slowing of breathing. CSEC may use the older term narcotics."},
  ];
  return (
    <div className="spark-drug-class-grid">
      {rows.map((row,index)=>(
        <article key={row.kind}>
          <span>{index+1}</span>
          <div><b>{row.kind}</b><strong>{row.examples}</strong><p>{row.effect}</p></div>
        </article>
      ))}
    </div>
  );
}

function DrivingScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Alcohol impairing reaction time judgement and coordination needed for driving">
      <g transform="translate(55 80)">
        <circle className="drug-brain" cx="125" cy="120" r="85" />
        <path className="drug-brain-fold" d="M80 95q35-30 65 0m-75 45q45-35 90 0m-50 45q35-25 70 0" />
        <text className="drug-label" x="125" y="245" textAnchor="middle">CNS activity slows</text>
      </g>
      <path className="drug-arrow" d="M285 200H360"/>
      <g transform="translate(380 80)">
        <circle className="drug-clock" cx="100" cy="120" r="70"/>
        <line className="drug-clock-hand" x1="100" y1="120" x2="100" y2="72"/>
        <line className="drug-clock-hand" x1="100" y1="120" x2="145" y2="145"/>
        <text className="drug-label" x="100" y="245" textAnchor="middle">slower reaction time</text>
      </g>
      <path className="drug-arrow" d="M560 200H635"/>
      <g transform="translate(650 65)">
        <path className="drug-road" d="M110 45L20 340H200Z"/>
        <path className="drug-road-lines" d="M110 90V140M110 175V225M110 260V310"/>
        <path className="drug-car" d="M65 235H155L170 280H50Z"/>
        <circle className="drug-wheel" cx="75" cy="287" r="14"/><circle className="drug-wheel" cx="145" cy="287" r="14"/>
        <text className="drug-label" x="110" y="385" textAnchor="middle">greater crash risk</text>
      </g>
      <text className="drug-small" x="490" y="475" textAnchor="middle">Coffee does not reverse alcohol-related impairment. The body needs time to metabolise alcohol.</text>
    </svg>
  );
}

function SteroidScene() {
  return (
    <div className="spark-drug-steroid-grid">
      <article className="benefit"><b>Why some people misuse them</b><p>Anabolic steroids can increase muscle size and strength when combined with training.</p></article>
      <article><b>Heart and blood vessels</b><p>Misuse is linked with high blood pressure, blood clots, heart attack, stroke and artery damage.</p></article>
      <article><b>Liver</b><p>Some anabolic steroid misuse can damage the liver.</p></article>
      <article><b>Hormonal and reproductive effects</b><p>Misuse can disrupt normal hormone production, reduce sperm production and affect reproductive function.</p></article>
      <article><b>Adolescents</b><p>Misuse can interfere with normal growth and development.</p></article>
    </div>
  );
}

function DependenceScene() {
  return (
    <div className="spark-drug-dependence">
      <article>
        <span>PHYSICAL DEPENDENCE</span>
        <h4>Body adaptation</h4>
        <p>Repeated exposure changes the body. Withdrawal symptoms may occur when the drug is reduced or stopped.</p>
        <b>Dependence can occur even with some medicines taken as prescribed.</b>
      </article>
      <article>
        <span>ADDICTION</span>
        <h4>Compulsive use despite harm</h4>
        <p>Drug seeking or use becomes difficult to control and continues despite serious health, social or functional consequences.</p>
        <b>Addiction can include dependence, but dependence alone does not equal addiction.</b>
      </article>
      <article>
        <span>TOLERANCE</span>
        <h4>Reduced response to the same dose</h4>
        <p>With repeated exposure, a person may need a larger amount to produce the same effect. Tolerance does not by itself prove addiction.</p>
      </article>
    </div>
  );
}

function ConsequencesScene() {
  const items=[
    ["Physical health","Brain, liver, heart, lungs or other organs may be harmed depending on the drug, dose and pattern of use."],
    ["Mental and behavioural effects","Judgement, memory, mood, attention and coordination may be impaired."],
    ["Family and relationships","Conflict, neglect, violence or breakdown of trust can affect households."],
    ["School and work","Absence, poorer performance, accidents or job loss can occur."],
    ["Economic effects","Money spent on drugs, health care, lost productivity and law enforcement can affect families and communities."],
    ["Injury risk","Impaired driving or operating machinery increases the risk of injury to the user and other people."],
  ];
  return <div className="spark-drug-consequence-grid">{items.map(([t,x],i)=><article key={t}><span>{i+1}</span><div><b>{t}</b><p>{x}</p></div></article>)}</div>;
}

export default function DrugEffectsExplorer() {
  const [view,setView]=useState("classes");
  const info=VIEWS[view];

  return (
    <section className="spark-drug-effects">
      <header>
        <span>DRUG USE AND EFFECTS</span>
        <h3>Classify effects, then evaluate the consequences</h3>
        <p>Drug effects depend on the substance, dose, route, frequency, combinations used and the person taking it.</p>
      </header>

      <div className="spark-drug-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>
        ))}
      </div>

      <div className={view==="driving" ? "spark-drug-stage" : "spark-drug-stage cards"}>
        {view==="classes" && <ClassesScene/>}
        {view==="driving" && <DrivingScene/>}
        {view==="steroids" && <SteroidScene/>}
        {view==="dependence" && <DependenceScene/>}
        {view==="consequences" && <ConsequencesScene/>}
      </div>

      <div className="spark-drug-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}
