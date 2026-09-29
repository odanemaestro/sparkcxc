import React, { useState } from "react";
import "./foodPreservationExplorer.css";

const METHODS=[
  {method:"Refrigeration",principle:"Low temperature",effect:"Slows microbial growth and enzyme activity. It does not sterilise food."},
  {method:"Solar drying",principle:"Remove water",effect:"Reduces water available for microbial growth and uses renewable solar energy."},
  {method:"Salting / curing",principle:"Reduce available water",effect:"Concentrated salt draws water from microbial cells and food. Approved curing agents can also inhibit selected bacteria."},
  {method:"Sugaring",principle:"Reduce available water",effect:"High sugar concentration draws water from microbial cells by osmosis, as in jams and jellies."},
  {method:"Pickling",principle:"Low pH",effect:"Vinegar creates acidic conditions that inhibit many spoilage organisms."},
  {method:"Canning",principle:"Heat + sealed container",effect:"Heating destroys many microorganisms and the sealed can prevents re-contamination."},
  {method:"Pasteurisation",principle:"Controlled heat",effect:"Heat reduces harmful microorganisms, followed by rapid cooling and suitable storage."},
];

const VIEWS={
  methods:{
    label:"Methods",
    title:"Preservation changes conditions microorganisms need for growth",
    note:"Cold, reduced water availability, acidity, heat and exclusion of new contamination are the main principles in the CSEC bank.",
  },
  osmosis:{
    label:"Salt and sugar",
    title:"Concentrated salt or sugar lowers the water available to microorganisms",
    note:"Water moves out of microbial cells by osmosis when the surrounding solution has a much higher solute concentration.",
  },
  temperature:{
    label:"Heat and cold",
    title:"Cold slows growth while heat can destroy microorganisms",
    note:"Refrigeration slows microbial and enzyme activity. Pasteurisation and canning use heat for different levels of microbial control.",
  },
  safety:{
    label:"Storage safety",
    title:"Preserved food still needs safe storage and inspection",
    note:"Bulging or leaking cans are unsafe warning signs. Do not taste food from a swollen can to decide whether it is safe.",
  },
};

function MethodsScene(){
  return <div className="spark-preservation-methods">{METHODS.map((row,i)=><article key={row.method}><span>{i+1}</span><div><b>{row.method}</b><strong>{row.principle}</strong><p>{row.effect}</p></div></article>)}</div>;
}

function OsmosisScene(){
  return(
    <svg viewBox="0 0 980 500" role="img" aria-label="Osmosis drawing water out of a microbial cell in concentrated salt or sugar solution">
      <g transform="translate(95 95)">
        <circle className="fp-cell" cx="150" cy="150" r="100"/>
        <circle className="fp-core" cx="150" cy="150" r="45"/>
        <text className="fp-label" x="150" y="305" textAnchor="middle">microbial cell</text>
        <text className="fp-small" x="150" y="335" textAnchor="middle">higher water concentration inside</text>
      </g>
      <g transform="translate(645 95)">
        <rect className="fp-solution" x="10" y="50" width="220" height="205" rx="30"/>
        {[50,90,130,170,210].map((x,i)=><circle className="fp-solute" key={x} cx={x} cy={95+(i%3)*55} r="10"/>)}
        <text className="fp-label" x="120" y="305" textAnchor="middle">concentrated salt or sugar</text>
        <text className="fp-small" x="120" y="335" textAnchor="middle">lower water availability outside</text>
      </g>
      <path className="fp-water-arrow" d="M350 200C455 145 525 145 625 200"/>
      <path className="fp-water-arrow" d="M350 260C455 315 525 315 625 260"/>
      <text className="fp-water-text" x="490" y="185" textAnchor="middle">water moves out</text>
      <text className="fp-small" x="490" y="455" textAnchor="middle">Less available water slows growth and can damage microbial cells.</text>
    </svg>
  );
}

function TemperatureScene(){
  return(
    <div className="spark-preservation-temperature">
      <article className="cold">
        <span>LOW TEMPERATURE</span>
        <h4>Refrigeration</h4>
        <b>Slows, not sterilises</b>
        <p>Low temperature slows enzyme-controlled reactions and reproduction. Most microorganisms are not all killed.</p>
        <strong>Bank example: inverter refrigerator</strong>
        <p>A steady low temperature supports storage while inverter control can reduce electricity use.</p>
      </article>
      <article className="heat">
        <span>CONTROLLED HEAT</span>
        <h4>Pasteurisation</h4>
        <b>Reduces harmful microorganisms</b>
        <p>The CSEC bank uses about 72 °C for 15 seconds as the high-temperature short-time milk example, followed by rapid cooling.</p>
        <strong>Not complete sterilisation</strong>
        <p>Pasteurised milk still requires suitable storage because some microorganisms can remain.</p>
      </article>
      <article className="heat">
        <span>HEAT + SEAL</span>
        <h4>Canning</h4>
        <b>Heat then prevent re-entry</b>
        <p>Heating destroys microorganisms and the sealed container prevents new contamination during storage.</p>
      </article>
    </div>
  );
}

function SafetyScene(){
  const items=[
    ["Swollen can","Do not eat","Gas production can indicate microbial growth. Some dangerous bacteria can produce toxins in improperly processed canned foods."],
    ["Leaking or badly damaged can","Discard safely","A broken seal allows contamination and removes the protection provided by canning."],
    ["Refrigerated food left warm","Limit time in warm conditions","Low temperature only protects food while suitable cold storage is maintained."],
    ["Solar-dried food becomes damp","Dry or discard as appropriate","Moisture returning to the food allows microorganisms to grow again."],
  ];
  return <div className="spark-preservation-safety">{items.map(([sign,action,text],i)=><article key={sign}><span>{i+1}</span><div><b>{sign}</b><strong>{action}</strong><p>{text}</p></div></article>)}</div>;
}

export default function FoodPreservationExplorer(){
  const [view,setView]=useState("methods");
  const info=VIEWS[view];
  return(
    <section className="spark-food-preservation">
      <header>
        <span>FOOD PRESERVATION</span>
        <h3>Connect each preservation method with the condition it changes</h3>
        <p>Preservation extends shelf life by slowing microbial growth, destroying microorganisms or preventing re-contamination.</p>
      </header>
      <div className="spark-preservation-tabs">
        {Object.entries(VIEWS).map(([key,item])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{item.label}</button>)}
      </div>
      <div className={view==="osmosis"?"spark-preservation-stage":"spark-preservation-stage cards"}>
        {view==="methods"&&<MethodsScene/>}
        {view==="osmosis"&&<OsmosisScene/>}
        {view==="temperature"&&<TemperatureScene/>}
        {view==="safety"&&<SafetyScene/>}
      </div>
      <div className="spark-preservation-summary"><strong>{info.title}</strong><span>{info.note}</span></div>
    </section>
  );
}

export { METHODS };
