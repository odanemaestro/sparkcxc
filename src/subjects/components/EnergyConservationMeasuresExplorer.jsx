import React,{useMemo,useState} from "react";
import "./energyConservationMeasuresExplorer.css";

const MEASURES=[
  {area:"Lighting",bad:"Leave lights on in empty rooms",good:"Switch lights off or use occupancy sensors",why:"Lighting only provides a benefit when the space needs illumination."},
  {area:"Standby power",bad:"Leave unused appliances powered",good:"Switch off or unplug equipment not in use",why:"Some equipment continues to draw standby power."},
  {area:"Refrigeration",bad:"Open the refrigerator often or ignore a damaged seal",good:"Keep the door closed and maintain the seal",why:"Warm air entering makes the compressor run longer."},
  {area:"Cooking",bad:"Cook with uncovered pots or boil excess water",good:"Cover pots and heat only the amount needed",why:"Covers reduce heat loss by convection and evaporation."},
  {area:"Cooling",bad:"Run air conditioning with doors or windows open",good:"Close the cooled space and reduce unwanted heat gain",why:"The air conditioner otherwise removes heat continuously from incoming warm air."},
  {area:"Laundry",bad:"Use an electric dryer for every load in suitable weather",good:"Dry clothes on a line when practical",why:"Air and sunlight replace electrical heating and motor energy."},
];

function MeasuresView(){
  const [index,setIndex]=useState(0);
  const item=MEASURES[index];
  return <div className="spark-conserve-measures">
    <div className="spark-conserve-measure-buttons">{MEASURES.map((row,i)=><button type="button" key={row.area} className={index===i?"active":""} onClick={()=>setIndex(i)}>{row.area}</button>)}</div>
    <div className="spark-conserve-before-after">
      <article className="waste"><span>WASTES ENERGY</span><h4>{item.bad}</h4></article>
      <div className="spark-conserve-arrow">→</div>
      <article className="save"><span>CONSERVES ENERGY</span><h4>{item.good}</h4><p>{item.why}</p></article>
    </div>
  </div>;
}

function LightingView(){
  return <div className="spark-conserve-lighting">
    <article><span>FILAMENT</span><strong>large heat loss</strong><p>A filament must become extremely hot to glow, so much of the electrical input becomes thermal energy.</p></article>
    <div>→</div>
    <article><span>LED</span><strong>more useful light per watt</strong><p>An LED gives the same useful illumination with much lower electrical power in many common applications.</p></article>
    <aside><b>Occupancy sensor</b><p>Automatically switching lights off when a room is empty prevents unnecessary operating time.</p></aside>
  </div>;
}

function CoolingView(){
  return <div className="spark-conserve-cooling">
    <svg viewBox="0 0 820 430" role="img" aria-label="White roof reflecting more solar radiation than a dark roof">
      <circle className="ecm-sun" cx="105" cy="75" r="42"/>
      <path className="ecm-ray" d="M160 90L315 150M155 55L320 120M145 120L300 180"/>
      <path className="ecm-house" d="M230 210L410 90L590 210V360H230Z"/>
      <path className="ecm-roof" d="M205 215L410 70L615 215L585 235L410 115L235 235Z"/>
      <path className="ecm-reflect" d="M330 145L270 65M415 105L420 25M500 145L560 65"/>
      <text className="ecm-label" x="410" y="395" textAnchor="middle">white roof reflects more incoming solar radiation</text>
    </svg>
    <div className="spark-conserve-cooling-notes">
      <p>White and light-coloured roofs reflect more solar radiation than dark surfaces, reducing heat gain and air-conditioning demand.</p>
      <p>Close doors and windows when air conditioning is operating so warm outside air does not continuously enter the cooled space.</p>
      <p>Maintain filters and choose efficient, correctly sized equipment so the system does not work harder than necessary.</p>
    </div>
  </div>;
}

function SchoolView(){
  const actions=[
    ["Classrooms","Switch lights and fans off when rooms are empty."],
    ["Computer labs","Shut down computers and monitors at the end of the day instead of leaving unused equipment running."],
    ["Air conditioning","Keep windows and doors closed while cooling."],
    ["Lighting controls","Use occupancy or timer controls where they are suitable."],
    ["Maintenance","Repair faulty door seals, dripping hot-water systems and inefficient equipment."],
  ];
  return <div className="spark-conserve-school">{actions.map(([area,text],i)=><article key={area}><span>{i+1}</span><div><b>{area}</b><p>{text}</p></div></article>)}</div>;
}

function TransportView(){
  return <div className="spark-conserve-transport">
    <article><span>CAR-POOL</span><h4>More people per vehicle</h4><p>If several people share one trip instead of travelling in separate cars, fuel use per person falls.</p></article>
    <article><span>PUBLIC TRANSPORT</span><h4>Share energy use across many passengers</h4><p>When well used, buses and other shared transport reduce the number of separate vehicle journeys needed.</p></article>
    <article><span>ACTIVE TRANSPORT</span><h4>Walk or cycle for suitable short trips</h4><p>Walking and cycling replace transport fuel use where the route and safety conditions are appropriate.</p></article>
  </div>;
}

function AuditView(){
  const [oldWatts,setOldWatts]=useState(60);
  const [newWatts,setNewWatts]=useState(9);
  const [lamps,setLamps]=useState(10);
  const [hours,setHours]=useState(5);
  const saved=((Number(oldWatts)||0)-(Number(newWatts)||0))*(Number(lamps)||0)*(Number(hours)||0)/1000;
  return <div className="spark-conserve-audit">
    <article><span>DAILY LIGHTING SAVING</span><label>Old lamp power, W<input type="number" value={oldWatts} onChange={e=>setOldWatts(e.target.value)}/></label><label>New lamp power, W<input type="number" value={newWatts} onChange={e=>setNewWatts(e.target.value)}/></label><label>Number of lamps<input type="number" value={lamps} onChange={e=>setLamps(e.target.value)}/></label><label>Hours used per day<input type="number" value={hours} onChange={e=>setHours(e.target.value)}/></label><strong>{Math.round(saved*100)/100} kWh saved per day</strong></article>
    <aside><b>Energy-efficiency rating</b><p>When two appliances provide the same useful service, the more efficient option wastes less input energy and usually costs less to operate.</p><p>Purchase price alone does not show lifetime energy cost.</p></aside>
  </div>;
}

export default function EnergyConservationMeasuresExplorer(){
  const [view,setView]=useState("measures");
  const summary=useMemo(()=>({
    measures:"Conservation reduces unnecessary energy use while still providing the required service.",
    lighting:"Efficient lighting saves energy by reducing both wasted heat and unnecessary operating time.",
    cooling:"Reducing heat gain lowers the work an air conditioner must do.",
    school:"Energy conservation works best when equipment use and building operation are managed consistently.",
    transport:"Transport conservation reduces fuel use per person or replaces fuel use entirely for suitable trips.",
    audit:"An energy audit turns conservation ideas into measurable kWh savings.",
  })[view],[view]);

  return <section className="spark-energy-conservation">
    <header><span>ENERGY CONSERVATION</span><h3>Reduce waste at home, school and in transport</h3><p>Energy conservation means reducing unnecessary energy use and energy waste while still meeting the intended need.</p></header>
    <div className="spark-conserve-tabs">{[["measures","Everyday measures"],["lighting","Lighting"],["cooling","Cooling"],["school","At school"],["transport","Transport"],["audit","Savings audit"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-conserve-stage">
      {view==="measures"&&<MeasuresView/>}
      {view==="lighting"&&<LightingView/>}
      {view==="cooling"&&<CoolingView/>}
      {view==="school"&&<SchoolView/>}
      {view==="transport"&&<TransportView/>}
      {view==="audit"&&<AuditView/>}
    </div>
    <div className="spark-conserve-summary"><strong>{summary}</strong><span>Conservation saves money and resources because less energy has to be generated, transmitted or supplied as fuel.</span></div>
  </section>;
}

export { MEASURES };
