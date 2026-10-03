import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./forcePrinciplesExplorer.css";

function FmaView(){
  const [mass,setMass]=useState(3);
  const [force,setForce]=useState(12);
  const m=Math.max(0.1,Number(mass)||0.1);
  const f=Number(force)||0;
  const a=f/m;
  return <div className="spark-force-fma">
    <div className="spark-force-formula">F = m a</div>
    <div className="spark-force-inputs">
      <label>Mass, kg<input type="number" min="0.1" step="0.1" value={mass} onChange={e=>setMass(e.target.value)}/></label>
      <label>Force, N<input type="number" value={force} onChange={e=>setForce(e.target.value)}/></label>
    </div>
    <strong>Acceleration = {a.toFixed(2)} m/s²</strong>
    <p>For a fixed mass, a larger resultant force produces a larger acceleration. For a fixed force, a larger mass produces a smaller acceleration.</p>
  </div>;
}

function ResultantView(){
  const [left,setLeft]=useState(20);
  const [right,setRight]=useState(35);
  const L=Math.max(0,Number(left)||0),R=Math.max(0,Number(right)||0);
  const result=R-L;
  const direction=result>0?"right":result<0?"left":"balanced";
  const leftLength=Math.min(190,45+L*3);
  const rightLength=Math.min(190,45+R*3);
  const resultantLength=Math.min(210,55+Math.abs(result)*5);
  const resultPath=direction==="right"
    ?"M410 305H"+(410+resultantLength)
    :direction==="left"
      ?"M410 305H"+(410-resultantLength)
      :"";
  return <div className="spark-resultant-force">
    <div className="spark-resultant-inputs">
      <label>Left force, N<input type="number" min="0" value={left} onChange={e=>setLeft(e.target.value)}/></label>
      <label>Right force, N<input type="number" min="0" value={right} onChange={e=>setRight(e.target.value)}/></label>
    </div>
    <ReviewedScienceDiagram site="ForcePrinciplesExplorer.jsx:40"><svg className="spark-resultant-svg" viewBox="0 0 820 390" role="img" aria-label={"Free-body diagram with "+L+" newtons left, "+R+" newtons right and resultant "+Math.abs(result)+" newtons "+direction}>
      <defs>
        <marker id="fp-force-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="fp-force-head"/></marker>
        <marker id="fp-resultant-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="fp-resultant-head"/></marker>
      </defs>
      <rect className="fp-fbd-bg" x="0" y="0" width="820" height="390" rx="18"/>
      <text className="fp-fbd-title" x="410" y="42" textAnchor="middle">horizontal force diagram</text>
      <rect className="fp-fbd-object" x="350" y="145" width="120" height="92" rx="12"/>
      <text className="fp-fbd-object-label" x="410" y="197" textAnchor="middle">object</text>
      <line className="fp-force-arrow left" x1="350" y1="191" x2={350-leftLength} y2="191" markerEnd="url(#fp-force-arrow)"/>
      <text className="fp-force-label left" x={350-leftLength/2} y="166" textAnchor="middle">{L} N left</text>
      <line className="fp-force-arrow right" x1="470" y1="191" x2={470+rightLength} y2="191" markerEnd="url(#fp-force-arrow)"/>
      <text className="fp-force-label right" x={470+rightLength/2} y="166" textAnchor="middle">{R} N right</text>
      <text className="fp-resultant-title" x="410" y="278" textAnchor="middle">resultant force, ΣF</text>
      {direction==="balanced"
        ?<g className="fp-balanced-result"><circle cx="410" cy="305" r="13"/><text x="410" y="346" textAnchor="middle">0 N, forces are balanced</text></g>
        :<g><path className={"fp-resultant-arrow "+direction} d={resultPath} markerEnd="url(#fp-resultant-arrow)"/><text className="fp-resultant-label" x="410" y="348" textAnchor="middle">{Math.abs(result)} N to the {direction}</text></g>}
    </svg></ReviewedScienceDiagram>
    <strong>{direction==="balanced"?"Resultant = 0 N":"Resultant = "+Math.abs(result)+" N to the "+direction}</strong>
    <p>The resultant force is the vector sum of the forces. Opposite horizontal forces subtract, so 35 N right and 20 N left give a resultant of 15 N to the right.</p>
  </div>;
}

function ThirdLawView(){
  const [example,setExample]=useState("rocket");
  const data={
    rocket:["Rocket","hot gases pushed downward","rocket pushed upward"],
    jet:["Jet aircraft","hot gases pushed backward","aircraft pushed forward"],
    gun:["Gun recoil","bullet pushed forward","gun pushed backward"]
  }[example];
  return <div className="spark-third-law">
    <div className="spark-force-toggle">{["rocket","jet","gun"].map(k=><button type="button" key={k} className={example===k?"active":""} onClick={()=>setExample(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <ReviewedScienceDiagram site="ForcePrinciplesExplorer.jsx:72"><svg className="spark-third-law-svg" viewBox="0 0 820 430" role="img" aria-label={data[0]+" Newton third-law force pair acting on different objects"}>
      <defs>
        <marker id="fp-third-action-head" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="fp-third-action-head"/></marker>
        <marker id="fp-third-reaction-head" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" className="fp-third-reaction-head"/></marker>
      </defs>
      <rect className="fp-third-bg" x="0" y="0" width="820" height="430" rx="18"/>
      <text className="fp-third-title" x="410" y="42" textAnchor="middle">equal and opposite forces act on different objects</text>
      {example==="rocket"&&<g className="fp-third-example rocket">
        <path className="fp-rocket-body" d="M375 235Q410 112 445 235L432 285H388Z"/>
        <circle className="fp-rocket-window" cx="410" cy="180" r="13"/>
        <path className="fp-exhaust" d="M393 285Q410 360 427 285Z"/>
        <line className="fp-third-action" x1="410" y1="300" x2="410" y2="382" markerEnd="url(#fp-third-action-head)"/>
        <line className="fp-third-reaction" x1="410" y1="145" x2="410" y2="70" markerEnd="url(#fp-third-reaction-head)"/>
        <text className="fp-third-action-label" x="438" y="372">force on gases</text>
        <text className="fp-third-reaction-label" x="438" y="86">force on rocket</text>
        <text className="fp-third-object-label" x="410" y="324" textAnchor="middle">exhaust gases</text>
      </g>}
      {example==="jet"&&<g className="fp-third-example jet">
        <path className="fp-jet-body" d="M270 205L485 187L595 205L485 224L270 210Z"/>
        <path className="fp-jet-wing" d="M420 200L500 118L530 124L483 201M420 214L500 296L530 290L483 212"/>
        <path className="fp-exhaust jet" d="M270 199L185 172L212 207L183 244L270 216Z"/>
        <line className="fp-third-action" x1="248" y1="270" x2="115" y2="270" markerEnd="url(#fp-third-action-head)"/>
        <line className="fp-third-reaction" x1="470" y1="100" x2="610" y2="100" markerEnd="url(#fp-third-reaction-head)"/>
        <text className="fp-third-action-label" x="182" y="298" textAnchor="middle">force on gases</text>
        <text className="fp-third-reaction-label" x="540" y="86" textAnchor="middle">force on aircraft</text>
      </g>}
      {example==="gun"&&<g className="fp-third-example gun">
        <rect className="fp-gun-barrel" x="290" y="180" width="245" height="42" rx="6"/>
        <path className="fp-gun-grip" d="M335 220H402L385 322H332Z"/>
        <circle className="fp-bullet" cx="625" cy="201" r="14"/>
        <line className="fp-third-action" x1="545" y1="145" x2="690" y2="145" markerEnd="url(#fp-third-action-head)"/>
        <line className="fp-third-reaction" x1="315" y1="350" x2="170" y2="350" markerEnd="url(#fp-third-reaction-head)"/>
        <text className="fp-third-action-label" x="615" y="130" textAnchor="middle">force on bullet</text>
        <text className="fp-third-reaction-label" x="243" y="378" textAnchor="middle">force on gun</text>
      </g>}
      <g className="fp-third-key">
        <line className="fp-third-action" x1="585" y1="360" x2="635" y2="360" markerEnd="url(#fp-third-action-head)"/>
        <text x="650" y="365">force on object A</text>
        <line className="fp-third-reaction" x1="585" y1="392" x2="635" y2="392" markerEnd="url(#fp-third-reaction-head)"/>
        <text x="650" y="397">force on object B</text>
      </g>
    </svg></ReviewedScienceDiagram>
    <div className="spark-third-law-pair">
      <article><span>FORCE ON ONE OBJECT</span><h4>{data[1]}</h4></article>
      <div>↔</div>
      <article><span>FORCE ON THE OTHER OBJECT</span><h4>{data[2]}</h4></article>
    </div>
    <p>{data[0]} motion illustrates Newton's third law. The force pair is equal in size and opposite in direction, but the two forces do not cancel because they act on different objects.</p>
  </div>;
}

function LiftView(){
  const [wind,setWind]=useState("calm");
  const headwind=wind==="head";
  return <div className="spark-wing-lift">
    <div className="spark-force-toggle"><button type="button" className={!headwind?"active":""} onClick={()=>setWind("calm")}>Lower relative air speed</button><button type="button" className={headwind?"active":""} onClick={()=>setWind("head")}>Take-off into wind</button></div>
    <ReviewedScienceDiagram site="ForcePrinciplesExplorer.jsx:128"><svg viewBox="0 0 820 360" role="img" aria-label="Airflow around an aircraft wing producing lift">
      <path className="fp-wing" d="M260 190Q420 100 610 185Q455 215 260 190Z"/>
      <path className="fp-flow top" d={headwind?"M60 140Q330 90 690 140":"M90 145Q330 110 665 145"}/>
      <path className="fp-flow bottom" d={headwind?"M60 240Q340 255 690 220":"M90 235Q350 245 665 220"}/>
      <path className="fp-lift" d="M450 180V65"/>
      <text className="fp-label" x="470" y="75">lift</text>
      <text className="fp-label" x="90" y="120">airflow</text>
    </svg></ReviewedScienceDiagram>
    <p>{headwind?"Taking off into the wind increases the aircraft's speed relative to the surrounding air, so the wing can produce the required lift at a lower ground speed.":"A wing produces lift from the pressure distribution around it and by deflecting air downward. Faster airflow over parts of the wing is one part of this pressure pattern."}</p>
  </div>;
}

function FrictionView(){
  const [surface,setSurface]=useState("wet");
  const wet=surface==="wet";
  return <div className="spark-friction-view">
    <div className="spark-force-toggle"><button type="button" className={wet?"active":""} onClick={()=>setSurface("wet")}>Wet road</button><button type="button" className={!wet?"active":""} onClick={()=>setSurface("dry")}>Dry road</button></div>
    <div className="spark-tyre-model">
      <div className="spark-tyre"><div className="spark-tread one"></div><div className="spark-tread two"></div><div className="spark-tread three"></div></div>
      <div className={"spark-road "+(wet?"wet":"dry")}></div>
      {wet&&<div className="spark-water-channel">tread channels water away</div>}
    </div>
    <div className="spark-friction-cards">
      <article><span>USEFUL</span><h4>Brakes and tyre grip</h4><p>Friction lets brakes slow a bicycle and lets tyres grip the road.</p></article>
      <article><span>UNWANTED</span><h4>Wear and heating</h4><p>Friction can wear machine parts and convert useful mechanical energy to heat.</p></article>
      <article><span>REDUCE IT</span><h4>Lubrication</h4><p>Oil between moving surfaces reduces direct contact and lowers friction.</p></article>
      <article><span>WET ROADS</span><h4>Tread matters</h4><p>Tyre grooves help remove water. Smooth worn tyres are more likely to lose grip and skid.</p></article>
    </div>
  </div>;
}

export default function ForcePrinciplesExplorer(){
  const [view,setView]=useState("fma");
  const summary=useMemo(()=>({
    fma:"Newton's second law links resultant force, mass and acceleration through F = ma.",
    resultant:"Unbalanced forces combine to give a resultant force that changes motion.",
    third:"Newton's third-law forces are equal and opposite but act on different objects.",
    lift:"Aircraft lift depends on airflow and pressure around the wing, and take-off into a headwind increases relative air speed.",
    friction:"Friction can be useful for grip and braking but unwanted when it causes heating and wear."
  })[view],[view]);

  return <section className="spark-force-principles">
    <header><span>FORCES</span><h3>Connect pushes and pulls to acceleration, motion, lift and friction</h3><p>A force is a push or pull that can change an object's speed, direction or shape. Force is measured in newtons, N.</p></header>
    <div className="spark-force-tabs">{[["fma","F = ma"],["resultant","Resultant force"],["third","Third law"],["lift","Aircraft lift"],["friction","Friction"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-force-stage">{view==="fma"&&<FmaView/>}{view==="resultant"&&<ResultantView/>}{view==="third"&&<ThirdLawView/>}{view==="lift"&&<LiftView/>}{view==="friction"&&<FrictionView/>}</div>
    <div className="spark-force-summary"><strong>{summary}</strong><span>Force is measured in newtons. Mass is measured in kilograms. Acceleration is measured in m/s².</span></div>
  </section>;
}
