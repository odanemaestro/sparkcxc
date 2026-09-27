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

function PropertyDiagram({prop}){
  if(prop==="ductility") return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Ductility shown by drawing a metal rod through a die to form wire">
    <defs><marker id="mp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mp-arrow-head"/></marker></defs>
    <rect className="mp-metal" x="75" y="102" width="165" height="46" rx="20"/>
    <path className="mp-die" d="M255 64L330 104V146L255 186Z"/>
    <line className="mp-wire" x1="330" y1="125" x2="548" y2="125"/>
    <line className="mp-force" x1="420" y1="82" x2="510" y2="82" markerEnd="url(#mp-arrow)"/>
    <text className="mp-label" x="158" y="88" textAnchor="middle">metal rod</text>
    <text className="mp-label" x="438" y="153" textAnchor="middle">thin wire</text>
    <text className="mp-small" x="304" y="218" textAnchor="middle">drawn through a die without breaking</text>
  </svg>;
  if(prop==="malleability") return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Malleability shown by compressing metal into a thin sheet">
    <defs><marker id="mp-mall-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mp-arrow-head"/></marker></defs>
    <rect className="mp-metal" x="190" y="116" width="240" height="58" rx="10"/>
    <rect className="mp-press" x="245" y="42" width="130" height="42" rx="8"/>
    <line className="mp-force" x1="310" y1="86" x2="310" y2="112" markerEnd="url(#mp-mall-arrow)"/>
    <line className="mp-sheet" x1="120" y1="201" x2="500" y2="201"/>
    <text className="mp-label" x="310" y="31" textAnchor="middle">compressive force</text>
    <text className="mp-small" x="310" y="231" textAnchor="middle">metal spreads into a sheet instead of cracking</text>
  </svg>;
  if(prop==="elasticity") return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Elasticity shown by a spring stretching under force and returning to its original length">
    <defs><marker id="mp-elastic-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mp-arrow-head"/></marker></defs>
    <path className="mp-spring" d="M90 92h40l18-22 28 44 28-44 28 44 28-44 28 44 18-22h55"/>
    <path className="mp-spring stretched" d="M90 169h40l28-22 42 44 42-44 42 44 28-22h91"/>
    <line className="mp-force" x1="403" y1="169" x2="528" y2="169" markerEnd="url(#mp-elastic-arrow)"/>
    <path className="mp-return" d="M492 211Q365 238 250 211" markerEnd="url(#mp-elastic-arrow)"/>
    <text className="mp-label" x="90" y="72">original length</text>
    <text className="mp-label" x="90" y="151">stretched</text>
    <text className="mp-small" x="364" y="236" textAnchor="middle">returns toward original shape when force is removed</text>
  </svg>;
  if(prop==="tensile") return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Tensile strength shown by a specimen pulled in opposite directions">
    <defs><marker id="mp-tensile-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mp-arrow-head"/></marker></defs>
    <path className="mp-tensile-bar" d="M180 105H270L290 122L270 139H180Z"/>
    <path className="mp-tensile-bar" d="M440 105H350L330 122L350 139H440Z"/>
    <line className="mp-force" x1="178" y1="122" x2="70" y2="122" markerEnd="url(#mp-tensile-arrow)"/>
    <line className="mp-force" x1="442" y1="122" x2="550" y2="122" markerEnd="url(#mp-tensile-arrow)"/>
    <text className="mp-label" x="310" y="86" textAnchor="middle">specimen under tension</text>
    <text className="mp-small" x="310" y="205" textAnchor="middle">high tensile strength means resisting being pulled apart</text>
  </svg>;
  if(prop==="conductivity") return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Conductivity shown by heat moving along a metal bar and electric current through a wire">
    <defs><marker id="mp-cond-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="mp-arrow-head"/></marker></defs>
    <rect className="mp-conductor" x="90" y="72" width="440" height="38" rx="18"/>
    <circle className="mp-hot" cx="112" cy="91" r="25"/>
    <line className="mp-heat" x1="150" y1="91" x2="480" y2="91" markerEnd="url(#mp-cond-arrow)"/>
    <path className="mp-circuit" d="M120 178H245Q270 178 270 153V145M350 145V153Q350 178 375 178H500"/>
    <circle className="mp-bulb" cx="310" cy="145" r="38"/>
    <path className="mp-filament" d="M292 146q18-26 36 0"/>
    <text className="mp-label" x="310" y="47" textAnchor="middle">heat conduction</text>
    <text className="mp-label" x="310" y="224" textAnchor="middle">electrical conduction</text>
  </svg>;
  return <svg className="spark-property-diagram" viewBox="0 0 620 250" role="img" aria-label="Density comparison using equal-volume blocks with different masses">
    <rect className="mp-density light" x="110" y="85" width="130" height="110" rx="10"/>
    <rect className="mp-density heavy" x="380" y="85" width="130" height="110" rx="10"/>
    <text className="mp-label" x="175" y="142" textAnchor="middle">same volume</text>
    <text className="mp-label" x="445" y="142" textAnchor="middle">same volume</text>
    <text className="mp-small" x="175" y="219" textAnchor="middle">lower mass</text>
    <text className="mp-small" x="445" y="219" textAnchor="middle">higher mass</text>
    <text className="mp-small" x="310" y="42" textAnchor="middle">density = mass ÷ volume</text>
  </svg>;
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
    <article><span>{data[0].toUpperCase()}</span><h4>{data[1]}</h4><PropertyDiagram prop={prop}/><strong>Example use</strong><p>{data[2]}</p></article>
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
