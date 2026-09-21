import React,{useMemo,useState} from "react";
import "./fireExtinguishingExplorer.css";

function TriangleView(){
  const [removed,setRemoved]=useState("heat");
  const info={
    heat:["Remove heat","Water cools ordinary combustibles such as wood or paper below the temperature needed to keep burning."],
    oxygen:["Remove oxygen","A lid, suitable fire blanket, foam layer or carbon dioxide can reduce the fire's access to oxygen in suitable situations."],
    fuel:["Remove fuel","Turn off a gas supply if safe or create a firebreak ahead of a vegetation fire so the flames have no fuel to continue through."],
  };
  return <div className="spark-fire-triangle">
    <div className="spark-fire-triangle-graphic">
      <svg viewBox="0 0 620 500" role="img" aria-label="Fire triangle showing heat fuel and oxygen">
        <polygon className="ft-triangle" points="310,55 75,420 545,420"/>
        <circle className={"ft-node "+(removed==="heat"?"removed":"")} cx="310" cy="95" r="65"/><text className="ft-label" x="310" y="103" textAnchor="middle">HEAT</text>
        <circle className={"ft-node "+(removed==="fuel"?"removed":"")} cx="140" cy="380" r="65"/><text className="ft-label" x="140" y="388" textAnchor="middle">FUEL</text>
        <circle className={"ft-node "+(removed==="oxygen"?"removed":"")} cx="480" cy="380" r="65"/><text className="ft-label" x="480" y="388" textAnchor="middle">OXYGEN</text>
        <path className="ft-flame" d="M310 355Q245 290 285 220Q295 270 330 230Q390 290 350 355Q335 385 310 395Q285 385 270 355Q250 315 310 275Q290 320 310 355Z"/>
      </svg>
    </div>
    <div className="spark-fire-triangle-controls">{Object.entries(info).map(([key,[title,text]])=><button type="button" key={key} className={removed===key?"active":""} onClick={()=>setRemoved(key)}><b>{title}</b><span>{text}</span></button>)}</div>
  </div>;
}

function SelectorView(){
  const [type,setType]=useState("electrical");
  const data={
    ordinary:{title:"Wood, paper, cloth",class:"Ordinary combustible",safe:"Water or another extinguisher specifically rated for ordinary combustibles can cool the fuel.",avoid:"Do not assume water is suitable when electricity or flammable liquid is also involved."},
    liquid:{title:"Gasoline or other flammable liquid",class:"Flammable liquid",safe:"Use an extinguisher specifically rated for flammable liquids. CSEC commonly gives foam for a gasoline fire.",avoid:"Do not use water because it can spread burning liquid."},
    electrical:{title:"Energized electrical equipment",class:"Electrical",safe:"De-energize the equipment if safe and use an extinguisher rated for energized electrical equipment, such as suitable CO₂ or dry chemical equipment.",avoid:"Do not use water while the equipment remains energized."},
    cooking:{title:"Small cooking-oil pan fire",class:"Cooking oil / fat",safe:"Turn off the heat if safe and slide a lid over the pan or use a suitable fire blanket. Commercial kitchens use appropriately rated cooking-oil extinguishers.",avoid:"Never pour water onto burning cooking oil."},
    gas:{title:"Burning gas from a controlled appliance",class:"Fuel-fed gas fire",safe:"If this can be done safely, shutting off the gas supply removes the fuel. Leave and call emergency services if the situation is not controlled.",avoid:"Do not place yourself in danger to reach a valve."},
  };
  const item=data[type];
  return <div className="spark-fire-selector">
    <div className="spark-fire-selector-buttons">{Object.entries(data).map(([key,val])=><button type="button" key={key} className={type===key?"active":""} onClick={()=>setType(key)}>{val.title}</button>)}</div>
    <article><span>{item.class.toUpperCase()}</span><h4>{item.title}</h4><div className="safe"><b>Suitable response</b><p>{item.safe}</p></div><div className="avoid"><b>Avoid</b><p>{item.avoid}</p></div></article>
  </div>;
}

function PanView(){
  return <div className="spark-pan-fire">
    <svg viewBox="0 0 820 420" role="img" aria-label="Small pan fire being smothered with a lid">
      <rect className="pf-stove" x="150" y="285" width="520" height="55" rx="12"/>
      <path className="pf-pan" d="M270 255Q410 285 550 255L520 320H300Z"/>
      <path className="pf-handle" d="M535 280H700"/>
      <path className="pf-flame" d="M340 245Q300 190 350 135Q355 185 385 150Q425 190 405 245Z M430 245Q390 175 445 110Q450 170 485 140Q535 195 500 245Z"/>
      <rect className="pf-lid" x="250" y="80" width="320" height="32" rx="14" transform="rotate(12 410 96)"/>
      <path className="pf-arrow" d="M610 85Q560 115 525 155"/>
      <text className="pf-label" x="630" y="72">slide lid across pan</text>
    </svg>
    <div className="spark-pan-fire-steps"><p>Turn off the burner if you can do so safely.</p><p>Slide a lid or suitable fire blanket over the pan to cut off oxygen.</p><p>Leave the lid in place until the pan has cooled.</p><p>Never use water on burning cooking oil.</p></div>
  </div>;
}

function FirebreakView(){
  return <div className="spark-firebreak">
    <div className="spark-firebreak-row">
      <article className="burning"><span>VEGETATION</span><div className="fb-flames">▲ ▲ ▲ ▲</div><p>Fuel allows the bush fire to advance.</p></article>
      <article className="break"><span>FIREBREAK</span><strong>wide strip cleared of vegetation</strong><p>The fuel path is interrupted.</p></article>
      <article className="unburned"><span>VEGETATION</span><div className="fb-trees">♣ ♣ ♣ ♣</div><p>Fire has less fuel to continue across the break.</p></article>
    </div>
  </div>;
}

function ExamView(){
  return <div className="spark-fire-exam-notes">
    <article><span>CSEC FOAM EXAMPLE</span><h4>Burning gasoline or oil</h4><p>The bank commonly gives foam because a suitable foam blanket can suppress vapour and reduce oxygen contact. In practice, use an extinguisher whose label explicitly covers the fire class.</p></article>
    <article><span>CSEC DRY POWDER EXAMPLE</span><h4>Multi-purpose use</h4><p>Some dry chemical or dry powder extinguishers are rated for several fire classes, including flammable liquids and energized electrical equipment. Check the extinguisher label.</p></article>
    <article><span>OLDER DAMP-CLOTH ITEM</span><h4>Principle: smothering removes oxygen</h4><p>The exam principle is correct, but current home guidance for a small pan fire favors a lid or suitable fire blanket rather than improvising with a wet or damp cloth.</p></article>
  </div>;
}

export default function FireExtinguishingExplorer(){
  const [view,setView]=useState("triangle");
  const summary=useMemo(()=>({
    triangle:"A fire continues only while enough heat, fuel and oxygen are available.",
    selector:"Choose an extinguisher or method for the specific fuel and whether electricity remains energized.",
    pan:"A small pan fire is smothered, not attacked with water.",
    firebreak:"Firebreaks control vegetation fires by removing fuel from the path.",
    exam:"CSEC answers still map to the fire triangle, while real extinguisher labels and current safety instructions govern actual use.",
  })[view],[view]);

  return <section className="spark-fire-extinguishing">
    <header><span>EXTINGUISHING FIRES</span><h3>Remove heat, oxygen or fuel using the right method for the fire</h3><p>Fire-control methods work by interrupting at least one part of the fire triangle. The correct extinguishing agent depends on what is burning and whether electrical equipment is energized.</p></header>
    <div className="spark-fire-tabs">{[["triangle","Fire triangle"],["selector","Choose a method"],["pan","Pan fire"],["firebreak","Firebreak"],["exam","CSEC notes"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-fire-stage">
      {view==="triangle"&&<TriangleView/>}
      {view==="selector"&&<SelectorView/>}
      {view==="pan"&&<PanView/>}
      {view==="firebreak"&&<FirebreakView/>}
      {view==="exam"&&<ExamView/>}
    </div>
    <div className="spark-fire-summary"><strong>{summary}</strong><span>Only attempt to extinguish a small fire if you are trained, have the correct equipment and have a clear escape route. If the fire is growing or you are unsure, leave and call emergency services.</span></div>
  </section>;
}
