import React,{useMemo,useState} from "react";
import "./rustingConditionsExplorer.css";

const TESTS=[
  {id:"airwater",name:"Air + water",oxygen:true,water:true,salt:false,rust:"rusts",note:"Both required conditions are present."},
  {id:"boiled",name:"Boiled water + oil",oxygen:false,water:true,salt:false,rust:"little or no rust",note:"Boiling removes dissolved oxygen and oil limits oxygen returning."},
  {id:"dry",name:"Dry air",oxygen:true,water:false,salt:false,rust:"little or no rust",note:"Oxygen is present but water is absent."},
  {id:"salt",name:"Salt water + air",oxygen:true,water:true,salt:true,rust:"fastest",note:"Salt increases conductivity of the water and speeds electrochemical corrosion."},
];

function RustTube({x,id,label,selected,onSelect}){
  const isBoiled=id==="boiled",isDry=id==="dry",isSalt=id==="salt",rusty=id==="airwater"||isSalt;
  return <g className={selected?"rt-group selected":"rt-group"} role="button" tabIndex="0" onClick={onSelect} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect();}}}>
    <path className="rt-tube" d={`M${x} 82V286Q${x} 336 ${x+62} 336Q${x+124} 336 ${x+124} 286V82`}/>
    {!isDry&&<path className={isSalt?"rt-water salty":"rt-water"} d={`M${x+6} 205H${x+118}V286Q${x+118} 329 ${x+62} 329Q${x+6} 329 ${x+6} 286Z`}/>}
    {isBoiled&&<rect className="rt-oil" x={x+6} y="187" width="112" height="20"/>}
    {isDry&&<path className="rt-desiccant" d={`M${x+10} 286Q${x+62} 266 ${x+114} 286V320Q${x+62} 337 ${x+10} 320Z`}/>}
    <rect className={rusty?(isSalt?"rt-nail heavy":"rt-nail rusty"):"rt-nail"} x={x+49} y="116" width="26" height="178" rx="8" transform={`rotate(-5 ${x+62} 205)`}/>
    {isBoiled&&<text className="rt-small" x={x+62} y="201" textAnchor="middle">oil layer</text>}
    {isDry&&<text className="rt-small" x={x+62} y="309" textAnchor="middle">drying agent</text>}
    <text className="rt-label" x={x+62} y="365" textAnchor="middle">{label}</text>
    <text className="rt-small" x={x+62} y="389" textAnchor="middle">{id==="airwater"?"rust":isSalt?"heavy rust":"little / no rust"}</text>
  </g>;
}

function TestTubeView(){
  const [id,setId]=useState("airwater");
  const t=TESTS.find(x=>x.id===id);
  return <div className="spark-rusting-tubes">
    <div className="spark-rust-buttons">{TESTS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <svg className="spark-rusting-comparison" viewBox="0 0 820 430" role="img" aria-label="Four-test-tube rusting experiment comparing air and water, boiled water under oil, dry air and salt water with air">
      <text className="rt-title" x="410" y="35" textAnchor="middle">Controlled rusting experiment</text>
      <text className="rt-small" x="410" y="57" textAnchor="middle">same iron nails, different oxygen and water conditions</text>
      <RustTube x={45} id="airwater" label="Air + water" selected={id==="airwater"} onSelect={()=>setId("airwater")}/>
      <RustTube x={240} id="boiled" label="Boiled water + oil" selected={id==="boiled"} onSelect={()=>setId("boiled")}/>
      <RustTube x={435} id="dry" label="Dry air" selected={id==="dry"} onSelect={()=>setId("dry")}/>
      <RustTube x={630} id="salt" label="Salt water + air" selected={id==="salt"} onSelect={()=>setId("salt")}/>
    </svg>
    <div className="spark-rust-result"><strong>{t.name}: {t.rust}</strong><p>{t.note}</p></div>
  </div>;
}

function EquationView(){
  return <div className="spark-rust-equation">
    <div><span>iron</span><b>+</b><span>oxygen</span><b>+</b><span>water</span><b>→</b><span>hydrated iron(III) oxide, rust</span></div>
    <p>Rusting is an oxidation process because iron combines with oxygen. Water is also required for the electrochemical corrosion process.</p>
    <aside><strong>Why mass can increase</strong><p>Oxygen and water become chemically associated with the iron corrosion products, so a nail can gain mass while rust forms.</p></aside>
  </div>;
}

function ClimateView(){
  const [condition,setCondition]=useState("humid");
  const data={
    dry:{name:"Dry air",rate:"slow",reason:"Little water is available for rusting."},
    humid:{name:"Warm humid air",rate:"faster",reason:"Moisture is readily available and warmth generally increases reaction rates."},
    coastal:{name:"Warm humid salty air",rate:"fastest",reason:"Water and oxygen are present, and dissolved salts speed the electrochemical process."},
    acidic:{name:"Humid polluted air",rate:"faster",reason:"Acidic gases can dissolve in moisture and increase corrosion."}
  }[condition];
  return <div className="spark-rust-climate">
    <div className="spark-rust-climate-buttons">{["dry","humid","coastal","acidic"].map(k=><button type="button" key={k} className={condition===k?"active":""} onClick={()=>setCondition(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <article><span>{data.name.toUpperCase()}</span><h4>Rusting rate: {data.rate}</h4><p>{data.reason}</p></article>
  </div>;
}

function CaribbeanView(){
  return <div className="spark-rust-caribbean">
    <article><span>WARMTH</span><h4>Tropical temperatures</h4><p>Warm conditions often increase the rate of chemical reactions.</p></article>
    <article><span>HUMIDITY</span><h4>Frequent moisture</h4><p>Humid air and rainfall keep metal surfaces wet for longer periods.</p></article>
    <article><span>SEA SPRAY</span><h4>Salt accelerates corrosion</h4><p>Coastal salt deposits dissolve in moisture and create a more conductive surface film, speeding rusting.</p></article>
    <article><span>INDUSTRIAL POLLUTION</span><h4>Acidic gases can increase corrosion</h4><p>Gases such as sulfur dioxide can dissolve in atmospheric moisture and make the surface environment more corrosive.</p></article>
  </div>;
}

function TarnishView(){
  return <div className="spark-rust-vs-tarnish">
    <article><span>RUSTING</span><h4>Specific to iron and steel</h4><p>Rust is hydrated iron(III) oxide formed when iron reacts in the presence of oxygen and water.</p></article>
    <article><span>TARNISHING</span><h4>Surface reaction on other metals</h4><p>Silver tarnish forms when silver reacts with sulfur-containing substances in the air, producing a dark silver sulfide surface.</p></article>
    <aside><strong>Do not use “rust” for every metal</strong><p>Iron rusts. Other metals corrode or tarnish in different ways and form different compounds.</p></aside>
  </div>;
}

export default function RustingConditionsExplorer(){
  const [view,setView]=useState("test");
  const summary=useMemo(()=>({
    test:"Rusting requires both oxygen and water. Salt is not required, but it speeds the process.",
    equation:"Rust is hydrated iron(III) oxide formed when iron is oxidised in the presence of water.",
    climate:"Warmth, humidity, salt and acidic pollution can all increase corrosion rate.",
    caribbean:"The Caribbean's warm humid climate and coastal sea spray make rust prevention especially important.",
    tarnish:"Rusting is specific to iron and steel; silver tarnish is a different chemical process."
  })[view],[view]);

  return <section className="spark-rusting-conditions">
    <header><span>RUSTING</span><h3>Investigate the conditions that cause iron to rust</h3><p>Rusting is the corrosion of iron. Both oxygen and water are necessary, while salt, warmth and acidic conditions can increase the rate.</p></header>
    <div className="spark-rust-tabs">{[["test","Rusting experiment"],["equation","Rust equation"],["climate","Conditions"],["caribbean","Caribbean context"],["tarnish","Rust vs tarnish"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-rust-stage">{view==="test"&&<TestTubeView/>}{view==="equation"&&<EquationView/>}{view==="climate"&&<ClimateView/>}{view==="caribbean"&&<CaribbeanView/>}{view==="tarnish"&&<TarnishView/>}</div>
    <div className="spark-rust-summary"><strong>{summary}</strong><span>Oxygen + water are required. Salt speeds rusting but is not itself required.</span></div>
  </section>;
}

export { TESTS };
