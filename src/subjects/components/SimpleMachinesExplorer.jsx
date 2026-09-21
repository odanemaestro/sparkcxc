import React,{useMemo,useState} from "react";
import "./simpleMachinesExplorer.css";

function LeverView(){
  const [type,setType]=useState("first");
  const data={
    first:{title:"First-class lever",positions:{effort:180,fulcrum:430,load:680},example:"See-saw or scissors",text:"The fulcrum lies between effort and load."},
    second:{title:"Second-class lever",positions:{fulcrum:180,load:430,effort:680},example:"Wheelbarrow or bottle opener",text:"The load lies between fulcrum and effort. Ideal mechanical advantage is greater than 1."},
    third:{title:"Third-class lever",positions:{fulcrum:180,effort:430,load:680},example:"Tweezers or human forearm",text:"The effort lies between fulcrum and load. This gives speed and range of movement rather than force multiplication."}
  }[type];

  const {effort,fulcrum,load}=data.positions;

  return <div className="spark-machines-levers">
    <div className="spark-machines-buttons">{["first","second","third"].map(k=><button key={k} type="button" className={type===k?"active":""} onClick={()=>setType(k)}>{({
      first:"First-class lever",second:"Second-class lever",third:"Third-class lever"
    })[k]}</button>)}</div>

    <svg className="spark-lever-svg" viewBox="0 0 860 430" role="img" aria-label={data.title+" showing the relative positions of effort fulcrum and load"}>
      <rect className="sl-ground" x="85" y="325" width="690" height="14" rx="7"/>
      <rect className="sl-beam" x="110" y="220" width="640" height="22" rx="11"/>

      <g className="sl-fulcrum" transform={`translate(${fulcrum} 242)`}>
        <path d="M0 0L-42 83H42Z"/>
        <circle cx="0" cy="0" r="10"/>
        <text x="0" y="118" textAnchor="middle">FULCRUM</text>
      </g>

      <g className="sl-effort" transform={`translate(${effort} 0)`}>
        <path d="M0 105V215"/>
        <path d="M-11 197L0 218L11 197"/>
        <text x="0" y="85" textAnchor="middle">EFFORT</text>
      </g>

      <g className="sl-load" transform={`translate(${load} 0)`}>
        <rect x="-34" y="135" width="68" height="58" rx="8"/>
        <path d="M0 193V215"/>
        <text x="0" y="120" textAnchor="middle">LOAD</text>
      </g>

      <g className="sl-order-guide">
        {[180,430,680].map(x=><line key={x} x1={x} y1="345" x2={x} y2="365"/>)}
        <line x1="180" y1="355" x2="680" y2="355"/>
      </g>

      <text className="sl-class-title" x="430" y="42" textAnchor="middle">{data.title}</text>
      <text className="sl-rule" x="430" y="398" textAnchor="middle">{data.text}</text>
    </svg>

    <div className="spark-lever-legend">
      <article><span className="effort-dot"></span><b>Effort</b><small>the applied force</small></article>
      <article><span className="fulcrum-dot"></span><b>Fulcrum</b><small>the pivot</small></article>
      <article><span className="load-dot"></span><b>Load</b><small>the resistance moved</small></article>
    </div>

    <p><b>{data.example}:</b> {data.text}</p>
  </div>;
}

function PulleyView(){
  const [strands,setStrands]=useState(2);
  const n=Math.max(1,Number(strands)||1);
  return <div className="spark-machines-pulley">
    <label>Supporting rope strands<input type="range" min="1" max="4" step="1" value={strands} onChange={e=>setStrands(e.target.value)}/></label>
    <div className="spark-pulley-model"><div className="spark-pulley-wheel"></div><div className="spark-pulley-load">load</div><div className="spark-rope-lines">{Array.from({length:n}).map((_,i)=><span key={i} style={{left:(30+i*(40/Math.max(1,n-1)))+"%"}}></span>)}</div></div>
    <strong>Ideal mechanical advantage ≈ number of supporting strands = {n}</strong>
    <p>A single fixed pulley mainly changes the direction of the effort and has ideal mechanical advantage 1.</p>
  </div>;
}

function InclinedView(){
  const [length,setLength]=useState(4),[height,setHeight]=useState(1);
  const L=Math.max(.1,Number(length)||.1),H=Math.max(.1,Number(height)||.1);
  return <div className="spark-machines-incline">
    <div className="spark-machines-inputs">
      <label>Ramp length, m<input type="number" min=".1" step=".1" value={length} onChange={e=>setLength(e.target.value)}/></label>
      <label>Vertical height, m<input type="number" min=".1" step=".1" value={height} onChange={e=>setHeight(e.target.value)}/></label>
    </div>
    <strong>Ideal mechanical advantage = length ÷ height = {(L/H).toFixed(2)}</strong>
    <p>An inclined plane lets a smaller force raise a load over a longer distance. A screw is an inclined plane wrapped around a cylinder.</p>
  </div>;
}

function ExamplesView(){
  return <div className="spark-machines-examples">
    <article><span>BICYCLE</span><h4>Gears, wheels and levers</h4><p>Gear combinations trade force for speed, while pedals and cranks act as rotating levers.</p></article>
    <article><span>SCREW JACK</span><h4>Wrapped inclined plane</h4><p>Turning the screw converts a long rotational path into a small lifting movement with greater force.</p></article>
    <article><span>FOREARM</span><h4>Third-class lever</h4><p>The elbow is the fulcrum, the biceps applies effort between the elbow and the load in the hand.</p></article>
  </div>;
}

export default function SimpleMachinesExplorer(){
  const [view,setView]=useState("levers");
  const summary=useMemo(()=>({
    levers:"Lever class depends on the relative positions of fulcrum, load and effort.",
    pulley:"Pulley systems can change force direction and multiply effort when multiple strands support the load.",
    incline:"Inclined planes reduce required effort by increasing the distance over which the force acts.",
    examples:"Bicycles, screw jacks and limbs combine simple-machine principles."
  })[view],[view]);
  return <section className="spark-simple-machines">
    <header><span>SIMPLE MACHINES</span><h3>Compare levers, pulleys, inclined planes, screws and gears</h3><p>Simple machines make tasks easier by changing the size or direction of forces, but they do not create energy or eliminate work.</p></header>
    <div className="spark-machines-tabs">{[["levers","Lever classes"],["pulley","Pulleys"],["incline","Inclined plane"],["examples","Examples"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-machines-stage">{view==="levers"&&<LeverView/>}{view==="pulley"&&<PulleyView/>}{view==="incline"&&<InclinedView/>}{view==="examples"&&<ExamplesView/>}</div>
    <div className="spark-machines-summary"><strong>{summary}</strong><span>Machines trade force against distance or direction. They do not reduce the total ideal work required.</span></div>
  </section>;
}
