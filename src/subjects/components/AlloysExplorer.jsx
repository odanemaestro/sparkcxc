import React,{useMemo,useState} from "react";
import "./alloysExplorer.css";

const ALLOYS=[
  {id:"brass",name:"Brass",parts:"Copper + zinc",benefit:"Harder than copper, attractive and corrosion resistant.",use:"Door handles, locks and decorative fittings."},
  {id:"bronze",name:"Bronze",parts:"Copper + tin",benefit:"Hard, wear resistant and corrosion resistant.",use:"Medals, statues and bearings."},
  {id:"steel",name:"Steel",parts:"Iron + carbon",benefit:"Stronger and harder than pure iron.",use:"Tools, structures and household hardware."},
  {id:"stainless",name:"Stainless steel",parts:"Iron + chromium, usually with other elements",benefit:"Hard and highly resistant to rusting.",use:"Cutlery, sinks and cookware."},
  {id:"solder",name:"Traditional solder",parts:"Tin + lead",benefit:"Low melting point compared with its component metals.",use:"Joining metal parts in the traditional syllabus example."},
];

function StructureView(){
  const [alloy,setAlloy]=useState(false);
  const rows=[0,1,2,3,4];
  const cols=[0,1,2,3,4,5,6];
  const substitutions=new Set(["1-2","2-5","3-1","4-4"]);
  return <div className="spark-alloy-structure">
    <div className="spark-alloy-toggle"><button type="button" className={!alloy?"active":""} onClick={()=>setAlloy(false)}>Pure metal</button><button type="button" className={alloy?"active":""} onClick={()=>setAlloy(true)}>Alloy</button></div>
    <svg className="spark-alloy-lattice-svg" viewBox="0 0 920 500" role="img" aria-label={alloy?"Alloy lattice with different-sized atoms disrupting regular metal layers":"Pure metal lattice with regular layers of similar-sized atoms"}>
      <defs>
        <marker id="alloy-slide-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="al-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>
      <rect className="al-lattice-panel" x="75" y="65" width="770" height="330" rx="22"/>
      {rows.map(r=>cols.map(col=>{
        const key=`${r}-${col}`;
        const different=alloy&&substitutions.has(key);
        const x=145+col*96+(r%2?18:0);
        const y=125+r*58;
        const rr=different?(key==="2-5"?31:22):26;
        return <g key={key} className={different?"al-atom different":"al-atom host"}>
          <circle cx={x} cy={y} r={rr}/>
          {different&&<text x={x} y={y+5} textAnchor="middle">B</text>}
        </g>;
      }))}

      {!alloy?<g className="al-slip">
        <path d="M145 215H730" markerEnd="url(#alloy-slide-arrow)"/>
        <path d="M165 274H750" markerEnd="url(#alloy-slide-arrow)"/>
        <text className="al-label" x="455" y="455" textAnchor="middle">regular layers can slide past one another more easily</text>
      </g>:<g className="al-blocked-slip">
        <path d="M145 215H355"/>
        <path d="M145 274H540"/>
        <path className="al-stop" d="M365 190L390 240M390 190L365 240"/>
        <path className="al-stop" d="M550 250L575 300M575 250L550 300"/>
        <text className="al-label" x="455" y="455" textAnchor="middle">different-sized atoms distort the lattice and hinder layer movement</text>
      </g>}

      <g className="al-key" transform="translate(105 410)">
        <circle className="host" cx="18" cy="18" r="16"/><text className="al-key-text" x="45" y="23">main metal atoms</text>
        {alloy&&<><circle className="different" cx="230" cy="18" r="14"/><text className="al-key-text" x="255" y="23">different alloying atoms</text></>}
      </g>
      <text className="al-title" x="460" y="42" textAnchor="middle">{alloy?"alloy: distorted metallic lattice":"pure metal: regular metallic lattice"}</text>
    </svg>
    <p>{alloy?"Different-sized atoms disturb the regular layers. This makes it harder for layers to slide over each other, so many alloys are harder than the pure metals from which they are made.":"In a pure metal, similar-sized atoms are arranged more regularly, so layers can often slide more easily when a force is applied."}</p>
  </div>;
}

function AlloyView(){
  const [id,setId]=useState("brass");
  const a=ALLOYS.find(x=>x.id===id);
  return <div className="spark-alloy-selector">
    <div className="spark-alloy-buttons">{ALLOYS.map(x=><button type="button" key={x.id} className={id===x.id?"active":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
    <article><span>{a.name.toUpperCase()}</span><h4>{a.parts}</h4><strong>Improved property</strong><p>{a.benefit}</p><strong>Household or practical use</strong><p>{a.use}</p></article>
  </div>;
}

function StainlessView(){
  return <div className="spark-stainless-use">
    <article><span>CUTLERY</span><h4>Hard and corrosion resistant</h4><p>Stainless steel resists rusting and keeps a durable surface during repeated washing and food contact.</p></article>
    <article><span>SINKS</span><h4>Durable in wet conditions</h4><p>The chromium-containing alloy forms a protective surface layer that strongly resists ordinary corrosion.</p></article>
    <article><span>COOKWARE</span><h4>Strong and easy to clean</h4><p>Stainless steel is widely used where hardness, durability and corrosion resistance are important.</p></article>
  </div>;
}

function SolderView(){
  return <div className="spark-solder-use">
    <div className="spark-solder-joint"><div className="spark-wire a"></div><div className="spark-wire b"></div><div className="spark-solder-blob">solder</div></div>
    <p>The syllabus example uses a tin-lead solder because the alloy melts at a relatively low temperature and can join metal parts without melting the conductors themselves.</p>
  </div>;
}

function PlatingView(){
  return <div className="spark-alloy-plating">
    <article><span>ALLOYING</span><h4>Changes the whole material</h4><p>Different elements are mixed throughout the metal to change properties such as hardness or corrosion resistance.</p></article>
    <article><span>ELECTROPLATING</span><h4>Changes only the surface</h4><p>A thin layer of another metal is deposited using electricity, improving appearance or corrosion resistance without changing the whole object.</p></article>
    <aside><strong>Do not confuse the two</strong><p>Silver-plating a steel spoon is not alloying. The spoon remains steel underneath with a thin silver surface coating.</p></aside>
  </div>;
}

export default function AlloysExplorer(){
  const [view,setView]=useState("structure");
  const summary=useMemo(()=>({
    structure:"Alloys often become harder because different-sized atoms disrupt the regular metal lattice and hinder layer movement.",
    alloys:"Brass, bronze, steel, stainless steel and solder are chosen because alloying changes useful properties.",
    stainless:"Stainless steel combines hardness with strong corrosion resistance, making it useful for household items.",
    solder:"A low melting point allows solder to melt and form joints without melting the main metal parts.",
    plating:"Alloying changes the bulk material; electroplating changes the surface."
  })[view],[view]);
  return <section className="spark-alloys">
    <header><span>ALLOYS</span><h3>Explain why mixtures of metals can outperform pure metals</h3><p>An alloy is a mixture containing a metal and one or more other elements. Alloying is used to improve properties such as hardness, strength, corrosion resistance or melting behaviour.</p></header>
    <div className="spark-alloy-tabs">{[["structure","Why alloys are harder"],["alloys","Common alloys"],["stainless","Stainless steel"],["solder","Solder"],["plating","Alloy vs plating"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-alloy-stage">{view==="structure"&&<StructureView/>}{view==="alloys"&&<AlloyView/>}{view==="stainless"&&<StainlessView/>}{view==="solder"&&<SolderView/>}{view==="plating"&&<PlatingView/>}</div>
    <div className="spark-alloy-summary"><strong>{summary}</strong><span>Brass = copper + zinc. Bronze = copper + tin. Steel = iron + carbon.</span></div>
  </section>;
}
export { ALLOYS };
