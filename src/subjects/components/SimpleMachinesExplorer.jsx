import React,{useMemo,useState} from "react";
import "./simpleMachinesExplorer.css";

function LeverView(){
  const [type,setType]=useState("first");
  const data={
    first:{title:"First-class lever",order:["Effort","Fulcrum","Load"],example:"See-saw or scissors",text:"The fulcrum lies between effort and load."},
    second:{title:"Second-class lever",order:["Fulcrum","Load","Effort"],example:"Wheelbarrow or bottle opener",text:"The load lies between fulcrum and effort. Ideal mechanical advantage is greater than 1."},
    third:{title:"Third-class lever",order:["Fulcrum","Effort","Load"],example:"Tweezers or human forearm",text:"The effort lies between fulcrum and load. This gives speed and range of movement rather than force multiplication."}
  }[type];
  return <div className="spark-machines-levers">
    <div className="spark-machines-buttons">{["first","second","third"].map(k=><button key={k} type="button" className={type===k?"active":""} onClick={()=>setType(k)}>{data[k].title}</button>)}</div>
    <div className="spark-lever-diagram">{data.order.map((x,i)=><React.Fragment key={x}><article className={x.toLowerCase()}>{x}</article>{i<2&&<span>—</span>}</React.Fragment>)}</div>
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
