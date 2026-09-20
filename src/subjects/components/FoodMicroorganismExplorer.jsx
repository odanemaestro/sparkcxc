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

function MilkGraph(){
  const px=h=>90+(h/48)*780;
  const py=p=>410-((p-4)/3)*320;
  const pathFor=values=>values.map((p,i)=>(i?"L":"M")+px(MILK.hours[i]).toFixed(1)+" "+py(p).toFixed(1)).join(" ");
  return(
    <svg viewBox="0 0 960 520" role="img" aria-label="Milk pH at 4 degrees Celsius and 30 degrees Celsius over 48 hours">
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
    </svg>
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
        {view==="milk"&&<MilkGraph/>}
        {view==="useful"&&<UsefulScene/>}
      </div>
      <div className="spark-food-microbe-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}

export { BREAD, MILK };
