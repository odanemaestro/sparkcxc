import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./electricalConductorsExplorer.css";

const MATERIALS=[
  {id:"copper",name:"Copper wire",class:"Conductor",lamp:true,why:"Copper has mobile electrons and is widely used for electrical wiring."},
  {id:"aluminium",name:"Aluminium foil",class:"Conductor",lamp:true,why:"Aluminium conducts electricity and is light, so it is useful for long overhead power cables."},
  {id:"graphite",name:"Pencil graphite",class:"Conductor",lamp:true,why:"Graphite is a non-metal with electrons that can move through its layered structure."},
  {id:"iron",name:"Iron nail",class:"Conductor",lamp:true,why:"Iron is a metal and conducts electric current."},
  {id:"plastic",name:"Plastic ruler",class:"Insulator",lamp:false,why:"Plastic resists charge flow and is used to cover wires and tool handles."},
  {id:"rubber",name:"Rubber band",class:"Insulator",lamp:false,why:"Dry rubber is a poor electrical conductor and is useful for insulation."},
  {id:"wood",name:"Dry wood",class:"Insulator",lamp:false,why:"Dry wood is a poor conductor. Wet or contaminated wood behaves differently."},
  {id:"silicon",name:"Silicon",class:"Semiconductor",lamp:null,why:"Silicon conducts better than an insulator but not as freely as a metal. Its conductivity can be controlled in electronic devices."},
];

function TesterView(){
  const [id,setId]=useState("copper");
  const item=MATERIALS.find(row=>row.id===id);
  return <div className="spark-conductor-tester">
    <div className="spark-conductor-buttons">{MATERIALS.map(row=><button type="button" key={row.id} className={id===row.id?"active":""} onClick={()=>setId(row.id)}>{row.name}</button>)}</div>
    <div className="spark-conductor-circuit">
      <ReviewedScienceDiagram site="ElectricalConductorsExplorer.jsx:21"><svg viewBox="0 0 760 350" role="img" aria-label={"Test circuit for "+item.name}>
        <line className="ec-wire" x1="120" y1="175" x2="230" y2="175"/>
        <line className="ec-wire" x1="530" y1="175" x2="640" y2="175"/>
        <line className="ec-wire" x1="120" y1="175" x2="120" y2="280"/>
        <line className="ec-wire" x1="640" y1="175" x2="640" y2="280"/>
        <line className="ec-wire" x1="120" y1="280" x2="335" y2="280"/>
        <line className="ec-wire" x1="425" y1="280" x2="640" y2="280"/>
        <line className="ec-cell-long" x1="350" y1="245" x2="350" y2="315"/>
        <line className="ec-cell-short" x1="410" y1="258" x2="410" y2="302"/>
        <line className="ec-wire" x1="350" y1="280" x2="410" y2="280"/>
        <circle className={"ec-lamp "+(item.lamp===true?"on":item.lamp===false?"off":"semi")} cx="380" cy="85" r="54"/>
        <line className="ec-lamp-cross" x1="345" y1="50" x2="415" y2="120"/>
        <line className="ec-lamp-cross" x1="345" y1="120" x2="415" y2="50"/>
        <line className="ec-wire" x1="120" y1="175" x2="120" y2="85"/>
        <line className="ec-wire" x1="120" y1="85" x2="326" y2="85"/>
        <line className="ec-wire" x1="434" y1="85" x2="640" y2="85"/>
        <line className="ec-wire" x1="640" y1="85" x2="640" y2="175"/>
        <rect className={"ec-test-material "+item.class.toLowerCase()} x="230" y="150" width="300" height="50" rx="12"/>
        <text className="ec-material-label" x="380" y="181" textAnchor="middle">{item.name}</text>
        <text className="ec-lamp-label" x="380" y="20" textAnchor="middle">{item.lamp===true?"lamp lights":item.lamp===false?"lamp stays off":"semiconductor response depends on device conditions"}</text>
      </svg></ReviewedScienceDiagram>
      <div className="spark-conductor-result"><strong>{item.class}</strong><p>{item.why}</p></div>
    </div>
  </div>;
}

function CategoriesView(){
  return <div className="spark-conductor-categories">
    <article><span>CONDUCTORS</span><h4>Charge flows readily</h4><p>Metals such as copper, aluminium and iron are good electrical conductors. Graphite is an important conducting non-metal.</p></article>
    <article><span>INSULATORS</span><h4>Charge flow is strongly restricted</h4><p>Dry rubber, plastic, glass and dry wood are common electrical insulators.</p></article>
    <article><span>SEMICONDUCTORS</span><h4>Conductivity can be controlled</h4><p>Silicon and germanium conduct better than insulators but less freely than metals. Their electrical properties make electronic devices possible.</p></article>
  </div>;
}

function WireView(){
  return <div className="spark-wire-design">
    <ReviewedScienceDiagram site="ElectricalConductorsExplorer.jsx:57"><svg viewBox="0 0 800 360" role="img" aria-label="Copper electrical wire with plastic insulation">
      <rect className="wd-plastic" x="120" y="115" width="560" height="130" rx="65"/>
      <rect className="wd-copper" x="190" y="150" width="420" height="60" rx="30"/>
      <line className="wd-callout" x1="325" y1="150" x2="245" y2="75"/>
      <text className="wd-label" x="235" y="65" textAnchor="end">copper conductor</text>
      <line className="wd-callout" x1="575" y1="120" x2="650" y2="65"/>
      <text className="wd-label" x="660" y="60">plastic insulation</text>
      <text className="wd-note" x="400" y="305" textAnchor="middle">conducting core carries current, insulating cover protects users and nearby conductors</text>
    </svg></ReviewedScienceDiagram>
    <div className="spark-wire-cards">
      <article><b>Household wiring</b><p>Copper conducts well. Plastic insulation helps prevent shock and short circuits.</p></article>
      <article><b>Overhead cables</b><p>Aluminium is less dense than copper, so long cable spans place less weight on supports.</p></article>
      <article><b>Tool handles</b><p>Plastic or rubber handles reduce the chance of current passing through a user when the insulation is intact and appropriate for the task.</p></article>
    </div>
  </div>;
}

function WaterView(){
  const ions=[[660,210,"+"],[710,250,"−"],[760,205,"+"],[805,270,"−"],[685,315,"−"],[750,330,"+"],[820,225,"+"]];

  return <div className="spark-water-conductivity-view">
    <ReviewedScienceDiagram site="ElectricalConductorsExplorer.jsx:78"><svg className="spark-water-ion-svg" viewBox="0 0 980 520" role="img" aria-label="Comparison of very pure water and tap water in conductivity circuits, showing few charge carriers and an unlit lamp in pure water, versus dissolved positive and negative ions carrying charge and a lit lamp in tap water">
      <defs>
        <marker id="ion-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0L9 4.5L0 9Z" className="wi-arrow-head"/>
        </marker>
      </defs>

      <g className="wi-panel pure" transform="translate(35 35)">
        <rect className="wi-panel-bg" x="0" y="0" width="420" height="440" rx="20"/>
        <text className="wi-title" x="210" y="36" textAnchor="middle">VERY PURE WATER</text>
        <circle className="wi-lamp off" cx="210" cy="88" r="42"/>
        <path className="wi-lamp-cross" d="M183 61L237 115M237 61L183 115"/>
        <path className="wi-wire" d="M168 88H95V165M252 88H325V165"/>
        <rect className="wi-electrode" x="80" y="160" width="30" height="175" rx="4"/>
        <rect className="wi-electrode" x="310" y="160" width="30" height="175" rx="4"/>
        <path className="wi-beaker" d="M55 145V365Q55 395 85 395H335Q365 395 365 365V145"/>
        <path className="wi-water" d="M60 220H360V365Q360 390 335 390H85Q60 390 60 365Z"/>
        <circle className="wi-rare-ion" cx="175" cy="285" r="10"/><circle className="wi-rare-ion" cx="258" cy="318" r="10"/>
        <text className="wi-small" x="210" y="430" textAnchor="middle">very few ions available to carry charge</text>
        <text className="wi-result off" x="210" y="138" textAnchor="middle">lamp stays off or extremely dim</text>
      </g>

      <g className="wi-panel tap" transform="translate(525 35)">
        <rect className="wi-panel-bg" x="0" y="0" width="420" height="440" rx="20"/>
        <text className="wi-title" x="210" y="36" textAnchor="middle">TAP WATER WITH DISSOLVED IONS</text>
        <circle className="wi-lamp on" cx="210" cy="88" r="42"/>
        <path className="wi-lamp-cross" d="M183 61L237 115M237 61L183 115"/>
        <path className="wi-wire" d="M168 88H95V165M252 88H325V165"/>
        <rect className="wi-electrode negative" x="80" y="160" width="30" height="175" rx="4"/>
        <rect className="wi-electrode positive" x="310" y="160" width="30" height="175" rx="4"/>
        <path className="wi-beaker" d="M55 145V365Q55 395 85 395H335Q365 395 365 365V145"/>
        <path className="wi-water" d="M60 220H360V365Q360 390 335 390H85Q60 390 60 365Z"/>

        {ions.map(([x,y,sign],i)=><g key={i} className={"wi-ion "+(sign==="+"?"cation":"anion")} transform={"translate("+(x-525)+" "+(y-35)+")"}>
          <circle cx="0" cy="0" r="14"/><text x="0" y="5" textAnchor="middle">{sign}</text>
        </g>)}

        <path className="wi-ion-flow cation" d="M250 255Q185 250 115 255" markerEnd="url(#ion-flow-arrow)"/>
        <path className="wi-ion-flow anion" d="M175 315Q245 320 305 300" markerEnd="url(#ion-flow-arrow)"/>
        <text className="wi-small" x="170" y="245">positive ions → negative electrode</text>
        <text className="wi-small" x="175" y="345">negative ions → positive electrode</text>
        <text className="wi-result on" x="210" y="138" textAnchor="middle">lamp lights more readily</text>
        <text className="wi-small" x="210" y="430" textAnchor="middle">mobile dissolved ions carry charge through the water</text>
      </g>

      <text className="wi-caption" x="490" y="505" textAnchor="middle">Electrical conduction in water depends strongly on the concentration of mobile ions.</text>
    </svg></ReviewedScienceDiagram>
    <p>Very pure water contains very few ions and is therefore a poor conductor. Tap water and many natural waters contain dissolved ionic substances. Positive and negative ions move through the solution and allow electric current to pass more readily.</p>
  </div>;
}

export default function ElectricalConductorsExplorer(){
  const [view,setView]=useState("tester");
  const summary=useMemo(()=>({
    tester:"A simple lamp circuit tests whether a material completes an electrical path.",
    categories:"Conductors, insulators and semiconductors differ in how readily charge moves through them.",
    wire:"Electrical design combines conducting materials with insulating materials.",
    water:"Water conductivity depends strongly on the ions dissolved in it.",
  })[view],[view]);

  return <section className="spark-electrical-conductors">
    <header><span>ELECTRICAL CONDUCTORS</span><h3>Test materials and connect electrical properties to everyday design</h3><p>Conductors allow electric charge to move readily. Insulators strongly restrict charge flow, while semiconductors have intermediate and controllable electrical properties.</p></header>
    <div className="spark-conductor-tabs">{[["tester","Material tester"],["categories","Categories"],["wire","Wire design"],["water","Water and ions"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-conductor-stage">
      {view==="tester"&&<TesterView/>}
      {view==="categories"&&<CategoriesView/>}
      {view==="wire"&&<WireView/>}
      {view==="water"&&<WaterView/>}
    </div>
    <div className="spark-conductor-summary"><strong>{summary}</strong><span>Graphite is a useful exception to the simple rule that metals conduct and non-metals insulate. It is a non-metal that conducts electricity.</span></div>
  </section>;
}

export { MATERIALS };
