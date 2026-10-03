import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./foodMicroorganismExplorer.css";

const BREAD=[
  {dish:"A",condition:"Dry bread, 25 °C",mould:0},
  {dish:"B",condition:"Moist bread, 25 °C",mould:65},
  {dish:"C",condition:"Moist bread, 4 °C",mould:5},
  {dish:"D",condition:"Moist bread + salt, 25 °C",mould:10},
];

const MILK={
  hours:[0,12,24,36,48],
  cold:[6.7,6.7,6.6,6.5,6.5],
  warm:[6.7,6.2,5.4,4.8,4.5],
};

const VIEWS={
  growth:{
    label:"Growth conditions",
    title:"Microorganisms grow fastest when conditions suit their metabolism",
    note:"Moisture, nutrients, suitable temperature and pH are major factors. Some organisms also require oxygen, while others grow without it.",
  },
  bread:{
    label:"Bread investigation",
    title:"Moisture and warmth strongly affect mould growth",
    note:"The bank data show 65% mould on moist bread at 25 °C, compared with 5% at 4 °C and 10% when salt is added.",
  },
  mould:{
    label:"Mould structure",
    title:"Bread mould grows as branching hyphae that together form a mycelium",
    note:"Spores spread the fungus. Under suitable moisture and temperature, a spore can germinate and produce hyphae that branch across and into the food.",
  },
  milk:{
    label:"Milk pH data",
    title:"Warm milk becomes more acidic as microorganisms produce acids",
    note:"At 30 °C the milk pH falls from 6.7 to 4.5 in 48 hours. At 4 °C the change is much smaller because microbial activity is slower.",
  },
  useful:{
    label:"Useful microbes",
    title:"Microorganisms are also used deliberately in food production",
    note:"Yeast produces carbon dioxide in bread dough, while bacteria and fungi are used in foods such as yoghurt, cheese, vinegar and soy products.",
  },
};

function GrowthScene(){
  const factors=[
    ["Moisture","Water is needed for enzyme reactions and transport in cells."],
    ["Temperature","Warm conditions often speed microbial metabolism until temperatures become damaging."],
    ["Nutrients","Food supplies carbon, nitrogen, minerals and energy sources."],
    ["pH","Each microorganism has a pH range in which it grows best."],
    ["Oxygen","Some microorganisms need oxygen. Others grow with little or none."],
  ];
  return <div className="spark-food-microbe-factors">{factors.map(([t,x],i)=><article key={t}><span>{i+1}</span><div><b>{t}</b><p>{x}</p></div></article>)}</div>;
}

function BreadScene(){
  return(
    <div className="spark-bread-investigation">
      <div className="spark-bread-bars" role="img" aria-label="Percentage mould growth on four bread treatments">
        {BREAD.map(row=>(
          <div className="spark-bread-row" key={row.dish}>
            <div className="spark-bread-name"><b>Dish {row.dish}</b><span>{row.condition}</span></div>
            <div className="spark-bread-track"><span style={{width:`${row.mould}%`}} /></div>
            <strong>{row.mould}%</strong>
          </div>
        ))}
      </div>
      <div className="spark-bread-interpretation">
        <b>Reference condition</b>
        <p>Dish B is the moist 25 °C condition used to compare the effect of drying, refrigeration and salt.</p>
      </div>
    </div>
  );
}

function MouldStructureScene(){
  const spores=[[120,90],[185,70],[255,105],[720,75],[790,100],[850,68]];
  return(
    <div className="spark-mould-structure-scene">
      <ReviewedScienceDiagram site="FoodMicroorganismExplorer.jsx:80"><svg className="spark-mould-structure-svg" viewBox="0 0 980 520" role="img" aria-label="Bread mould structure showing spores, a germinating spore, branching thread-like hyphae and a mycelium spreading through bread">
        <defs>
          <marker id="mould-callout-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" className="ms-arrow-head"/>
          </marker>
        </defs>

        <rect className="ms-air" x="0" y="0" width="980" height="520"/>
        <path className="ms-bread" d="M70 290Q210 250 355 285Q500 320 640 282Q790 245 910 292V470H70Z"/>
        <path className="ms-bread-surface" d="M70 290Q210 250 355 285Q500 320 640 282Q790 245 910 292"/>

        <g className="ms-spores">
          {spores.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={10+(i%2)*2}/>)}
        </g>
        <text className="ms-label" x="180" y="48" textAnchor="middle">spores spread through the air</text>

        <g className="ms-germination">
          <circle cx="350" cy="160" r="15"/>
          <path d="M362 170Q395 190 410 225"/>
          <text className="ms-small" x="350" y="130" textAnchor="middle">germinating spore</text>
        </g>

        <g className="ms-hyphae">
          <path d="M410 225Q430 270 425 320Q420 370 390 430"/>
          <path d="M430 280Q485 255 535 278Q580 300 610 350"/>
          <path d="M455 305Q500 335 518 395"/>
          <path d="M425 325Q365 325 318 350Q270 375 238 425"/>
          <path d="M390 355Q345 382 330 435"/>
          <path d="M535 278Q570 245 625 230"/>
          <path d="M610 350Q665 338 722 365Q765 385 804 430"/>
          <path d="M518 395Q565 375 620 410"/>
        </g>

        <g className="ms-mycelium-highlight">
          <path d="M240 420Q310 372 390 348Q470 325 550 360Q640 397 808 430"/>
          <path d="M270 445Q380 402 485 400Q600 398 760 450"/>
        </g>

        <g className="ms-callouts">
          <path d="M500 300L720 190" markerEnd="url(#mould-callout-arrow)"/><text x="742" y="194">hypha, one thread-like filament</text>
          <path d="M545 405L760 390" markerEnd="url(#mould-callout-arrow)"/><text x="782" y="395">mycelium, mass of hyphae</text>
          <path d="M165 92L105 185" markerEnd="url(#mould-callout-arrow)"/><text x="94" y="190" textAnchor="end">spore</text>
          <path d="M350 160L190 235" markerEnd="url(#mould-callout-arrow)"/><text x="178" y="240" textAnchor="end">germination begins in suitable conditions</text>
        </g>

        <text className="ms-bread-label" x="490" y="485" textAnchor="middle">bread provides nutrients while moisture and suitable temperature support growth</text>
      </svg></ReviewedScienceDiagram>
      <div className="spark-mould-structure-notes">
        <article><b>Hyphae</b><p>Mould grows as thread-like hyphae that spread through or over the food.</p></article>
        <article><b>Mycelium</b><p>A mass of branching hyphae forms the body of the mould called a mycelium.</p></article>
        <article><b>Spores</b><p>Spores allow mould to reproduce and spread to new locations.</p></article>
        <article><b>Germination</b><p>Suitable moisture and temperature allow a spore to germinate and new hyphae to grow.</p></article>
      </div>
    </div>
  );
}

function MilkGraph(){
  const px=h=>90+(h/48)*780;
  const py=p=>410-((p-4)/3)*320;
  const pathFor=values=>values.map((p,i)=>(i?"L":"M")+px(MILK.hours[i]).toFixed(1)+" "+py(p).toFixed(1)).join(" ");
  return(
    <ReviewedScienceDiagram site="FoodMicroorganismExplorer.jsx:142"><svg viewBox="0 0 960 520" role="img" aria-label="Milk pH at 4 degrees Celsius and 30 degrees Celsius over 48 hours">
      <line className="fm-axis" x1="90" y1="90" x2="90" y2="410"/>
      <line className="fm-axis" x1="90" y1="410" x2="870" y2="410"/>
      {[4,5,6,7].map(v=><g key={v}><line className="fm-grid" x1="90" y1={py(v)} x2="870" y2={py(v)}/><text className="fm-tick" x="74" y={py(v)+5} textAnchor="end">{v.toFixed(1)}</text></g>)}
      {MILK.hours.map(h=><g key={h}><line className="fm-grid" x1={px(h)} y1="90" x2={px(h)} y2="410"/><text className="fm-tick" x={px(h)} y="440" textAnchor="middle">{h}</text></g>)}
      <path className="fm-line cold" d={pathFor(MILK.cold)}/>
      <path className="fm-line warm" d={pathFor(MILK.warm)}/>
      {MILK.cold.map((v,i)=><circle className="fm-point cold" key={"c"+i} cx={px(MILK.hours[i])} cy={py(v)} r="6"/>)}
      {MILK.warm.map((v,i)=><circle className="fm-point warm" key={"w"+i} cx={px(MILK.hours[i])} cy={py(v)} r="6"/>)}
      <text className="fm-legend cold" x="690" y="115">4 °C</text>
      <text className="fm-legend warm" x="690" y="145">30 °C</text>
      <text className="fm-axis-label" x="480" y="485" textAnchor="middle">Time / hours</text>
      <text className="fm-axis-label" x="28" y="250" textAnchor="middle" transform="rotate(-90 28 250)">pH of milk</text>
    </svg></ReviewedScienceDiagram>
  );
}

function UsefulScene(){
  const rows=[
    ["Bread","Yeast","Fermentation releases carbon dioxide, which makes dough rise."],
    ["Cheese","Bacteria and fungi","Selected cultures produce acids, flavours and textures during controlled fermentation or ripening."],
    ["Vinegar","Acetic acid bacteria","Bacteria convert ethanol to acetic acid when oxygen is available."],
    ["Soy foods","Selected microorganisms","Fermentation changes flavour, texture and chemical composition."],
  ];
  return <div className="spark-useful-microbes">{rows.map(([food,microbe,effect])=><article key={food}><span>{food}</span><b>{microbe}</b><p>{effect}</p></article>)}</div>;
}

export default function FoodMicroorganismExplorer(){
  const [view,setView]=useState("growth");
  const info=VIEWS[view];
  return(
    <section className="spark-food-microorganisms">
      <header>
        <span>MICROORGANISMS AND FOOD</span>
        <h3>Use evidence to explain spoilage, fermentation and growth</h3>
        <p>Temperature, water, nutrients and acidity affect microbial activity. The same biology explains both food spoilage and useful fermentation.</p>
      </header>
      <div className="spark-food-microbe-tabs">
        {Object.entries(VIEWS).map(([key,item])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>)}
      </div>
      <div className={view==="milk"?"spark-food-microbe-stage":"spark-food-microbe-stage cards"}>
        {view==="growth"&&<GrowthScene/>}
        {view==="bread"&&<BreadScene/>}
        {view==="mould"&&<MouldStructureScene/>}
        {view==="milk"&&<MilkGraph/>}
        {view==="useful"&&<UsefulScene/>}
      </div>
      <div className="spark-food-microbe-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}

export { BREAD, MILK };
