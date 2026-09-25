import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./foodContaminationExplorer.css";

const VIEWS={
  types:{
    label:"Contaminant types",
    title:"Food hazards may be physical, chemical or biological",
    note:"Classifying the hazard helps you choose a suitable prevention method. Glass is physical, cleaning chemicals are chemical, and Salmonella is biological.",
  },
  cross:{
    label:"Cross-contamination",
    title:"Raw food can transfer pathogens to food that will not be cooked again",
    note:"Separate boards, utensils and storage for raw meat reduce transfer of microorganisms to salads, fruit and cooked food.",
  },
  toxins:{
    label:"Mould and toxins",
    title:"Some moulds can produce toxins that remain a food-safety hazard",
    note:"Aflatoxins may occur in poorly stored peanuts and other crops. Mouldy food should not be treated as safe simply by removing the visible mould.",
  },
  handler:{
    label:"Food handler",
    title:"Safe handling interrupts contamination before food reaches the consumer",
    note:"Hand washing, clean surfaces, covered food, safe raw-food separation and suitable storage reduce contamination.",
  },
};

function TypesScene(){
  const groups=[
    {kind:"PHYSICAL",examples:["glass","hair","metal fragment"],meaning:"Foreign objects that may injure or contaminate food."},
    {kind:"CHEMICAL",examples:["cleaning chemical","pesticide residue","mercury"],meaning:"Harmful chemicals that enter food through misuse, pollution or contamination."},
    {kind:"BIOLOGICAL",examples:["Salmonella","mould","pathogenic microorganisms"],meaning:"Living organisms or biological agents that can cause disease or spoilage."},
  ];
  return(
    <div className="spark-food-contam-types">
      {groups.map((group,index)=>(
        <article key={group.kind} className={"t"+index}>
          <span>{group.kind}</span>
          <p>{group.meaning}</p>
          <div>{group.examples.map(item=><b key={item}>{item}</b>)}</div>
        </article>
      ))}
    </div>
  );
}

function CrossScene(){
  return(
    <ReviewedScienceDiagram site="FoodContaminationExplorer.jsx:48"><svg viewBox="0 0 980 500" role="img" aria-label="Cross contamination from raw chicken through a chopping board to salad">
      <g transform="translate(60 105)">
        <path className="fc-chicken" d="M40 150Q75 60 170 75Q245 90 230 180Q215 260 120 250Q45 240 40 150Z"/>
        <path className="fc-bone" d="M225 145L300 95M285 80l30 30M285 110l30-30"/>
        <text className="fc-label" x="150" y="310" textAnchor="middle">raw chicken</text>
      </g>
      <path className="fc-arrow bad" d="M370 250H455"/>
      <g transform="translate(450 105)">
        <rect className="fc-board" x="15" y="75" width="220" height="160" rx="18"/>
        {[70,115,160,200].map((x,i)=><circle key={x} className="fc-bacteria" cx={x} cy={125+(i%2)*55} r="13"/>)}
        <text className="fc-label" x="125" y="310" textAnchor="middle">shared chopping board</text>
      </g>
      <path className="fc-arrow bad" d="M705 250H790"/>
      <g transform="translate(775 105)">
        <path className="fc-bowl" d="M20 155Q110 285 200 155Z"/>
        <path className="fc-salad" d="M35 150Q75 85 110 150Q150 80 185 150"/>
        <text className="fc-label" x="110" y="310" textAnchor="middle">ready-to-eat salad</text>
      </g>
      <text className="fc-small" x="490" y="455" textAnchor="middle">Use separate boards and utensils, then wash and sanitise food-contact surfaces after raw meat.</text>
    </svg></ReviewedScienceDiagram>
  );
}

function ToxinScene(){
  return(
    <div className="spark-aflatoxin-scene">
      <ReviewedScienceDiagram site="FoodContaminationExplorer.jsx:74"><svg className="spark-aflatoxin-svg" viewBox="0 0 980 540" role="img" aria-label="Aflatoxin risk pathway showing warm humid storage, mould growth on stored peanuts, toxin contamination extending beyond visible mould, and liver health risk from long-term exposure">
        <defs>
          <marker id="aflatoxin-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" className="af-arrow-head"/>
          </marker>
        </defs>

        <g className="af-stage storage" transform="translate(55 80)">
          <rect className="af-store" x="0" y="60" width="190" height="220" rx="14"/>
          <path className="af-roof" d="M-15 60L95 5L205 60Z"/>
          <g className="af-peanuts">
            {[38,75,112,149].map((x,i)=><ellipse key={x} cx={x} cy={180+(i%2)*42} rx="22" ry="13" transform={"rotate("+(i%2?18:-18)+" "+x+" "+(180+(i%2)*42)+")"}/>)}
          </g>
          <path className="af-humidity" d="M30 105Q50 75 70 105T110 105T150 105"/>
          <text className="af-title" x="95" y="320" textAnchor="middle">warm, humid storage</text>
          <text className="af-small" x="95" y="344" textAnchor="middle">favours mould growth</text>
        </g>

        <path className="af-flow" d="M270 220H335" markerEnd="url(#aflatoxin-arrow)"/>

        <g className="af-stage mould" transform="translate(345 70)">
          <rect className="af-food-sample" x="0" y="100" width="210" height="150" rx="18"/>
          <g className="af-mould-hyphae">
            <path d="M35 205Q60 160 85 190Q112 220 135 165Q158 120 185 155"/>
            <path d="M62 188Q45 145 57 118M123 176Q110 133 120 108M170 160Q176 127 190 112"/>
          </g>
          <g className="af-mould-spores">
            {[55,120,190].map((x,i)=><circle key={x} cx={x} cy={102-(i%2)*14} r="10"/>)}
          </g>
          <g className="af-toxin-dots">
            {[45,80,115,150,180].map((x,i)=><circle key={x} cx={x} cy={215-(i%2)*32} r="7"/>)}
          </g>
          <text className="af-title" x="105" y="292" textAnchor="middle">Aspergillus mould may grow</text>
          <text className="af-small" x="105" y="318" textAnchor="middle">some strains can produce aflatoxins</text>
        </g>

        <path className="af-flow" d="M580 220H645" markerEnd="url(#aflatoxin-arrow)"/>

        <g className="af-stage spread" transform="translate(660 65)">
          <rect className="af-food-sample" x="0" y="105" width="250" height="155" rx="18"/>
          <path className="af-visible-mould" d="M15 118Q45 82 85 115Q110 88 145 118Q125 154 80 150Q40 155 15 118Z"/>
          <g className="af-toxin-dots spread">
            {[35,70,105,140,175,210].map((x,i)=><circle key={x} cx={x} cy={190+(i%2)*34} r="7"/>)}
          </g>
          <path className="af-warning-line" d="M22 278H228"/>
          <text className="af-title" x="125" y="315" textAnchor="middle">visible mould is only part of the risk</text>
          <text className="af-small" x="125" y="340" textAnchor="middle">removing the visible patch does not prove the food is safe</text>
        </g>

        <path className="af-risk-arrow" d="M780 415Q700 455 610 455Q520 455 455 425" markerEnd="url(#aflatoxin-arrow)"/>
        <g className="af-liver-risk" transform="translate(300 390)">
          <path className="af-liver" d="M40 58Q110 5 210 35Q245 45 254 84Q215 132 145 143Q78 151 40 120Q20 95 40 58Z"/>
          <text className="af-title" x="145" y="175" textAnchor="middle">long-term exposure can damage the liver</text>
          <text className="af-small" x="145" y="198" textAnchor="middle">and increase liver-cancer risk</text>
        </g>
      </svg></ReviewedScienceDiagram>

      <div className="spark-food-toxin-grid">
        <article><span>1</span><b>Keep dry foods dry</b><p>Use suitable storage and reduce warm, humid conditions that encourage mould growth.</p></article>
        <article><span>2</span><b>Inspect and discard unsafe food</b><p>Do not assume food is safe after scraping away visible mould because contamination can extend beyond the visible growth.</p></article>
      </div>
    </div>
  );
}

function HandlerScene(){
  const items=[
    ["Wash hands","Before food preparation, after using the toilet and after handling raw meat."],
    ["Separate raw and ready-to-eat food","Use separate boards or thoroughly clean and sanitise equipment between tasks."],
    ["Cover food","Protect prepared food from flies, dust and contact contamination."],
    ["Clean food-contact surfaces","Wash and sanitise boards, knives, counters and utensils."],
    ["Wash produce","Rinsing under clean running water removes dirt and can reduce some surface microorganisms and residues."],
    ["Store safely","Keep foods at suitable temperatures and protect chemicals from contact with food."],
  ];
  return <div className="spark-food-handler-grid">{items.map(([t,x],i)=><article key={t}><span>{i+1}</span><div><b>{t}</b><p>{x}</p></div></article>)}</div>;
}

export default function FoodContaminationExplorer(){
  const [view,setView]=useState("types");
  const info=VIEWS[view];
  return(
    <section className="spark-food-contamination">
      <header>
        <span>FOOD CONTAMINATION</span>
        <h3>Identify the hazard, then break the route into the food</h3>
        <p>Food becomes unsafe when physical objects, harmful chemicals or biological agents enter it.</p>
      </header>
      <div className="spark-food-contam-tabs">
        {Object.entries(VIEWS).map(([key,item])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>)}
      </div>
      <div className={view==="cross"?"spark-food-contam-stage":"spark-food-contam-stage cards"}>
        {view==="types"&&<TypesScene/>}
        {view==="cross"&&<CrossScene/>}
        {view==="toxins"&&<ToxinScene/>}
        {view==="handler"&&<HandlerScene/>}
      </div>
      <div className="spark-food-contam-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}
