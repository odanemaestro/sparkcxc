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
    <svg viewBox="0 0 980 500" role="img" aria-label="Cross contamination from raw chicken through a chopping board to salad">
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
    </svg>
  );
}

function ToxinScene(){
  return(
    <div className="spark-food-toxin-grid">
      <article>
        <span>1</span><b>Poor storage</b><p>Warm, humid storage can encourage mould growth on peanuts, maize and other susceptible foods.</p>
      </article>
      <article>
        <span>2</span><b>Aflatoxin risk</b><p>Some Aspergillus moulds produce aflatoxins. Long-term exposure can damage the liver and increase liver-cancer risk.</p>
      </article>
      <article>
        <span>3</span><b>Visible mould is a warning</b><p>Removing only the visible mould does not prove the remaining food is safe because toxins can extend beyond what is seen.</p>
      </article>
      <article>
        <span>4</span><b>Prevention</b><p>Keep dry foods dry, use suitable storage, inspect supplies and discard food showing unsafe mould or spoilage.</p>
      </article>
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
