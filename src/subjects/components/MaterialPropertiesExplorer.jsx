import React,{useMemo,useState} from "react";
import "./materialPropertiesExplorer.css";

const MATERIALS=[
  {id:"copper",name:"Copper",kind:"metal",props:["good electrical conductor","ductile","malleable","corrosion resistant"],uses:"Electrical wiring and water pipes."},
  {id:"aluminium",name:"Aluminium",kind:"metal",props:["low density","good heat conductor","malleable","protective oxide layer"],uses:"Aircraft bodies, cooking pots and foil."},
  {id:"wood",name:"Wood",kind:"non-metal",props:["poor heat conductor","light","tough in suitable species"],uses:"Pan handles and sporting equipment such as cricket bats."},
  {id:"ceramic",name:"Ceramic",kind:"non-metal",props:["hard","durable","poor electrical conductor","brittle"],uses:"Tiles and heat-resistant household items."},
  {id:"nylon",name:"Nylon",kind:"non-metal",props:["strong","elastic","low density","resists rotting in water"],uses:"Fishing nets, ropes and racket strings."},
  {id:"carbon",name:"Carbon fibre composite",kind:"composite",props:["high tensile strength","low density","stiff"],uses:"Racing bicycle frames and other lightweight structures."},
];

function CompareView(){
  return <div className="spark-material-compare">
    <article><span>MOST METALS</span><h4>Good conductors, malleable and often ductile</h4><p>Many metals conduct heat and electricity well and can be shaped without breaking. Most also have relatively high melting points.</p></article>
    <article><span>MOST NON-METALS</span><h4>Poor conductors and often brittle when solid</h4><p>Many non-metals are thermal and electrical insulators. Their properties vary widely, so the actual material must be matched to the job.</p></article>
    <aside><strong>Important exceptions</strong><p>These are broad trends, not absolute rules. Graphite conducts electricity, for example, even though carbon is a non-metal.</p></aside>
  </div>;
}

function PropertyView(){
  const [prop,setProp]=useState("ductility");
  const data={
    ductility:["Ductility","Ability to be drawn into wires.","Copper electrical wiring."],
    malleability:["Malleability","Ability to be hammered or rolled into sheets.","Aluminium foil and metal sheeting."],
    elasticity:["Elasticity","Ability to return toward the original shape after the deforming force is removed.","Rubber, nylon or gut strings."],
    tensile:["Tensile strength","Ability to resist being pulled apart.","Steel cables and carbon-fibre structures."],
    conductivity:["Conductivity","Ability to transfer heat or electric current.","Copper wiring and metal cooking pots."],
    density:["Density","Mass per unit volume. Lower density gives less mass for the same volume.","Aluminium aircraft bodies and carbon-fibre bicycle frames."]
  }[prop];
  return <div className="spark-material-property">
    <div className="spark-material-buttons">{Object.keys({ductility:1,malleability:1,elasticity:1,tensile:1,conductivity:1,density:1}).map(k=><button type="button" key={k} className={prop===k?"active":""} onClick={()=>setProp(k)}>{k==="tensile"?"Tensile strength":k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data[0].toUpperCase()}</span><h4>{data[1]}</h4><strong>Example use</strong><p>{data[2]}</p></article>
  </div>;
}

function UsesView(){
  const [id,setId]=useState("copper");
  const m=MATERIALS.find(x=>x.id===id);
  return <div className="spark-material-uses">
    <div className="spark-material-buttons">{MATERIALS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{m.kind.toUpperCase()}</span><h4>{m.name}</h4><div className="spark-property-chips">{m.props.map(p=><b key={p}>{p}</b>)}</div><p>{m.uses}</p></article>
  </div>;
}

function KitchenView(){
  return <div className="spark-material-kitchen">
    <article><span>POT BODY</span><h4>Metal</h4><p>A cooking pot needs to transfer heat efficiently to food, so metals such as aluminium or stainless-steel-based constructions are suitable.</p></article>
    <article><span>PAN HANDLE</span><h4>Wood or heat-resistant plastic</h4><p>A handle should conduct heat poorly so it remains safer to touch.</p></article>
    <article><span>KITCHEN FLOOR</span><h4>Glazed ceramic tile</h4><p>Hardness, durability and an easy-to-clean surface make ceramic tiles suitable for floors.</p></article>
  </div>;
}

function SportView(){
  return <div className="spark-material-sport">
    <article><span>CRICKET BAT</span><h4>Willow</h4><p>Willow is relatively light, strong and able to absorb impact without being excessively brittle.</p></article>
    <article><span>TENNIS STRINGS</span><h4>Nylon or gut</h4><p>Elastic strings stretch on impact and return energy to the ball.</p></article>
    <article><span>RACING BICYCLE</span><h4>Carbon fibre composite</h4><p>High tensile strength and stiffness at low mass make carbon fibre useful for performance bicycle frames.</p></article>
  </div>;
}

export default function MaterialPropertiesExplorer(){
  const [view,setView]=useState("compare");
  const summary=useMemo(()=>({
    compare:"Material groups have broad trends, but selection must be based on the actual properties of the material.",
    property:"Property names such as ductility, malleability, elasticity and tensile strength describe different behaviours.",
    uses:"A material is useful only when its properties match the job it must do.",
    kitchen:"Cookware and kitchen fittings often combine conductors for heat transfer with insulators for safe handling.",
    sport:"Sporting equipment is selected for combinations of strength, mass, elasticity and impact behaviour."
  })[view],[view]);
  return <section className="spark-material-properties">
    <header><span>MATERIAL PROPERTIES</span><h3>Match metals, non-metals and composites to the jobs they perform</h3><p>Materials are selected by comparing properties such as conductivity, density, strength, elasticity, ductility, malleability, hardness and corrosion resistance.</p></header>
    <div className="spark-material-tabs">{[["compare","Metals vs non-metals"],["property","Property meanings"],["uses","Material selector"],["kitchen","Kitchen"],["sport","Sport"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-material-stage">{view==="compare"&&<CompareView/>}{view==="property"&&<PropertyView/>}{view==="uses"&&<UsesView/>}{view==="kitchen"&&<KitchenView/>}{view==="sport"&&<SportView/>}</div>
    <div className="spark-material-summary"><strong>{summary}</strong><span>Ductility means drawing into wires; malleability means shaping into sheets.</span></div>
  </section>;
}

export { MATERIALS };
