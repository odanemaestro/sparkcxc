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
  return <div className="spark-resultant-force">
    <div className="spark-resultant-inputs">
      <label>Left force, N<input type="number" min="0" value={left} onChange={e=>setLeft(e.target.value)}/></label>
      <label>Right force, N<input type="number" min="0" value={right} onChange={e=>setRight(e.target.value)}/></label>
    </div>
    <div className="spark-force-box">
      <span className="left">← {L} N</span><div>box</div><span className="right">{R} N →</span>
    </div>
    <strong>{direction==="balanced"?"Resultant = 0 N":`Resultant = ${Math.abs(result)} N to the ${direction}`}</strong>
    <p>The resultant force is the single force that has the same overall effect as all the forces acting together.</p>
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
    <div className="spark-third-law-pair">
      <article><span>ACTION</span><h4>{data[1]}</h4></article>
      <div>↔</div>
      <article><span>REACTION</span><h4>{data[2]}</h4></article>
    </div>
    <p>{data[0]} motion illustrates Newton's third law. The two forces are equal in size and opposite in direction, and they act on different objects.</p>
  </div>;
}

function LiftView(){
  const [wind,setWind]=useState("calm");
  const headwind=wind==="head";
  return <div className="spark-wing-lift">
    <div className="spark-force-toggle"><button type="button" className={!headwind?"active":""} onClick={()=>setWind("calm")}>Lower relative air speed</button><button type="button" className={headwind?"active":""} onClick={()=>setWind("head")}>Take-off into wind</button></div>
    <svg viewBox="0 0 820 360" role="img" aria-label="Airflow around an aircraft wing producing lift">
      <path className="fp-wing" d="M260 190Q420 100 610 185Q455 215 260 190Z"/>
      <path className="fp-flow top" d={headwind?"M60 140Q330 90 690 140":"M90 145Q330 110 665 145"}/>
      <path className="fp-flow bottom" d={headwind?"M60 240Q340 255 690 220":"M90 235Q350 245 665 220"}/>
      <path className="fp-lift" d="M450 180V65"/>
      <text className="fp-label" x="470" y="75">lift</text>
      <text className="fp-label" x="90" y="120">airflow</text>
    </svg>
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
