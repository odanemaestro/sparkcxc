import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./personalHygieneExplorer.css";

const DATA = [
  {label:"No washing",value:86},
  {label:"Water only",value:54},
  {label:"Soap + water",value:12},
  {label:"Hand sanitiser",value:18},
];

const VIEWS = {
  hands:{
    label:"Hand washing",
    title:"Soap and water remove germs and reduce spread",
    note:"In the CSEC practical dataset, soap and water produced the lowest colony count. The result shows why hand hygiene matters before handling food and after using the toilet.",
  },
  body:{
    label:"Skin and odour",
    title:"Body odour mainly develops when skin bacteria act on sweat and secretions",
    note:"Regular bathing and clean clothing remove sweat, oils, dead skin and microorganisms. Antiperspirants reduce sweating, while deodorants mainly reduce or mask odour.",
  },
  intimate:{
    label:"Menstrual and genital hygiene",
    title:"Clean, dry conditions reduce irritation and microbial growth",
    note:"Daily washing, clean breathable underwear and regular changing of menstrual products support comfort and hygiene. Strong scented products are not a substitute for washing and may irritate sensitive skin.",
  },
  personal:{
    label:"Personal items",
    title:"Do not share items that contact skin, hair or blood",
    note:"Towels, razors and similar personal items can transfer microorganisms or contaminated blood between people.",
  },
  food:{
    label:"Food handlers",
    title:"Personal hygiene protects other people",
    note:"A food handler can transfer pathogens from hands, skin, the toilet environment or contaminated surfaces to food. Hand washing and clean clothing reduce this risk.",
  },
};

function HandwashingChart() {
  const max=90;
  return (
    <ReviewedScienceDiagram site="PersonalHygieneExplorer.jsx:42"><svg viewBox="0 0 980 520" role="img" aria-label="Bacterial colonies after different hand washing methods">
      <line className="hyg-axis" x1="95" y1="70" x2="95" y2="420"/>
      <line className="hyg-axis" x1="95" y1="420" x2="900" y2="420"/>
      {[0,20,40,60,80].map(v=>{
        const y=420-(v/max)*330;
        return <g key={v}><line className="hyg-grid" x1="95" y1={y} x2="900" y2={y}/><text className="hyg-tick" x="80" y={y+5} textAnchor="end">{v}</text></g>;
      })}
      {DATA.map((row,index)=>{
        const x=150+index*190;
        const height=(row.value/max)*330;
        const y=420-height;
        return (
          <g key={row.label}>
            <rect className={"hyg-bar b"+index} x={x} y={y} width="100" height={height} rx="8"/>
            <text className="hyg-value" x={x+50} y={y-10} textAnchor="middle">{row.value}</text>
            <text className="hyg-label" x={x+50} y="455" textAnchor="middle">{row.label}</text>
          </g>
        );
      })}
      <text className="hyg-axis-label" x="28" y="250" textAnchor="middle" transform="rotate(-90 28 250)">Number of colonies</text>
      <text className="hyg-small" x="500" y="495" textAnchor="middle">CSEC practical dataset after fingertip contact with nutrient agar</text>
    </svg></ReviewedScienceDiagram>
  );
}

function BodyScene() {
  return (
    <ReviewedScienceDiagram site="PersonalHygieneExplorer.jsx:69"><svg viewBox="0 0 980 500" role="img" aria-label="Sweat skin bacteria and body odour">
      <g transform="translate(110 75)">
        <rect className="hyg-skin" x="0" y="95" width="300" height="180" rx="20"/>
        <path className="hyg-sweat-gland" d="M80 235q35-55 70 0t70 0q-35 50-70 0t-70 0Z"/>
        <path className="hyg-sweat-duct" d="M150 205Q120 155 150 95V40"/>
        <path className="hyg-drop" d="M150 5q-25 34 0 60q25-26 0-60Z"/>
        {[55,100,205,250].map((x,i)=><circle className="hyg-bacteria" key={x} cx={x} cy={125+(i%2)*45} r="12"/>)}
        <text className="hyg-label" x="150" y="325" textAnchor="middle">skin + sweat + bacteria</text>
      </g>
      <path className="hyg-arrow" d="M455 245H545"/>
      <g transform="translate(575 75)">
        <circle className="hyg-clean" cx="150" cy="160" r="100"/>
        <path className="hyg-water" d="M75 125q75-70 150 0M75 170q75-70 150 0M75 215q75-70 150 0"/>
        <text className="hyg-label" x="150" y="325" textAnchor="middle">washing removes sweat and microbes</text>
      </g>
      <text className="hyg-small" x="490" y="455" textAnchor="middle">Fresh sweat has little odour. Bacterial breakdown of skin secretions contributes strongly to body odour.</text>
    </svg></ReviewedScienceDiagram>
  );
}

function IntimateScene() {
  const points=[
    "Wash the external genital area regularly with clean water and suitable mild products.",
    "Wear clean, breathable underwear and change damp clothing.",
    "Change menstrual pads, tampons or other menstrual products at appropriate intervals.",
    "Wash hands before and after changing menstrual products.",
    "Avoid sharing towels and personal hygiene items.",
  ];
  return <div className="spark-hygiene-checklist">{points.map((p,i)=><article key={p}><span>{i+1}</span><p>{p}</p></article>)}</div>;
}

function PersonalItemsScene() {
  return (
    <div className="spark-hygiene-items">
      {[
        ["Razor","May carry blood and skin microorganisms."],
        ["Towel","May transfer bacteria, fungi and skin secretions."],
        ["Toothbrush","May carry saliva, blood and oral microorganisms."],
        ["Hair or skin tools","Items contacting scalp or skin should be kept clean and not casually shared."],
      ].map(([t,x])=><article key={t}><div className="hyg-item-icon">×</div><b>{t}</b><span>{x}</span></article>)}
    </div>
  );
}

function FoodHandlerScene() {
  return (
    <ReviewedScienceDiagram site="PersonalHygieneExplorer.jsx:115"><svg viewBox="0 0 980 500" role="img" aria-label="Food handler hand hygiene preventing contamination">
      <g transform="translate(65 75)">
        <path className="hyg-hand" d="M75 210V90q0-25 22-25t22 25v70V65q0-25 22-25t22 25v95V75q0-25 22-25t22 25v100V100q0-25 22-25t22 25v135q0 115-110 115Q75 350 75 210Z"/>
        {[105,145,190,225].map((x,i)=><circle className="hyg-bacteria" key={x} cx={x} cy={185+(i%2)*45} r="12"/>)}
        <text className="hyg-label" x="160" y="395" textAnchor="middle">unwashed hands</text>
      </g>
      <path className="hyg-arrow" d="M340 250H435"/>
      <g transform="translate(445 90)">
        <rect className="hyg-food" x="45" y="160" width="210" height="120" rx="20"/>
        <path className="hyg-food-top" d="M70 160Q150 90 230 160"/>
        <text className="hyg-label" x="150" y="330" textAnchor="middle">food becomes contaminated</text>
      </g>
      <path className="hyg-stop" d="M760 130L900 345M900 130L760 345"/>
      <text className="hyg-small" x="830" y="395" textAnchor="middle">hand washing breaks the transfer route</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function PersonalHygieneExplorer() {
  const [view,setView]=useState("hands");
  const info=VIEWS[view];
  return (
    <section className="spark-personal-hygiene">
      <header>
        <span>PERSONAL HYGIENE</span>
        <h3>Reduce contamination and protect health</h3>
        <p>Connect hygiene practices with the microorganisms, body secretions and transmission routes they help control.</p>
      </header>
      <div className="spark-hygiene-tabs">
        {Object.entries(VIEWS).map(([key,item])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>)}
      </div>
      <div className={view==="intimate"||view==="personal" ? "spark-hygiene-stage cards" : "spark-hygiene-stage"}>
        {view==="hands"&&<HandwashingChart/>}
        {view==="body"&&<BodyScene/>}
        {view==="intimate"&&<IntimateScene/>}
        {view==="personal"&&<PersonalItemsScene/>}
        {view==="food"&&<FoodHandlerScene/>}
      </div>
      <div className="spark-hygiene-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}
