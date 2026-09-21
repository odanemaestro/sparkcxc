import React,{useMemo,useState} from "react";
import "./fishingMethodsExplorer.css";

const METHODS={
  hand:{name:"Hand line",gear:"Single line and hook",selectivity:"High",bycatch:"Low",text:"A fisher catches one fish at a time, making the method relatively selective when hook size and bait are chosen carefully."},
  pot:{name:"Fish pot",gear:"Wire mesh or woven trap with funnel entrance",selectivity:"Medium",bycatch:"Medium",text:"Fish enter through a funnel-shaped opening and have difficulty finding their way out. Escape gaps and suitable mesh can reduce capture of juveniles."},
  long:{name:"Long-line",gear:"Long main line carrying many baited hooks",selectivity:"Medium",bycatch:"Variable",text:"Used for large pelagic fish such as tuna and marlin. Hook type, depth and bait influence unwanted catch."},
  seine:{name:"Seine net",gear:"Net drawn around a school, often near shore",selectivity:"Variable",bycatch:"Variable",text:"A seine surrounds a group of fish and is pulled in. Mesh size and where the net is set affect juvenile catch."},
  trawl:{name:"Trawling",gear:"Large net towed by a boat",selectivity:"Low to medium",bycatch:"Often high",text:"Bottom trawling can disturb seabed habitats and catch non-target organisms as bycatch."}
};

function MethodView(){
  const [method,setMethod]=useState("hand");
  const d=METHODS[method];
  return <div className="spark-fishing-method-view">
    <div className="spark-fishing-buttons">{Object.keys(METHODS).map(k=><button key={k} type="button" className={method===k?"active":""} onClick={()=>setMethod(k)}>{METHODS[k].name}</button>)}</div>
    <article><span>{d.name.toUpperCase()}</span><h4>{d.gear}</h4><div className="spark-fishing-stats"><b>Selectivity: {d.selectivity}</b><b>Bycatch: {d.bycatch}</b></div><p>{d.text}</p></article>
  </div>;
}

function SustainabilityView(){
  return <div className="spark-fishing-sustainability">
    <article><span>MESH SIZE</span><h4>Let juveniles escape</h4><p>Larger mesh can allow young fish to pass through so they can grow and reproduce before being harvested.</p></article>
    <article><span>CLOSED SEASONS</span><h4>Protect breeding periods</h4><p>Temporary closures can reduce fishing pressure when adults are spawning or when young stages are especially vulnerable.</p></article>
    <article><span>SELECTIVE GEAR</span><h4>Reduce unwanted catch</h4><p>Hand lines and well-designed traps can be more selective than methods that sweep large areas.</p></article>
    <article><span>AQUACULTURE</span><h4>Supplement wild supply</h4><p>Well-managed fish farming can provide food without taking every fish from wild stocks, although farms must still manage waste, disease and habitat impacts.</p></article>
  </div>;
}

function HarmView(){
  return <div className="spark-fishing-harm">
    <article><span>BOTTOM TRAWLING</span><h4>Seabed damage</h4><p>Heavy gear dragged along the bottom can damage coral, seagrass and other benthic habitats.</p></article>
    <article><span>DYNAMITE FISHING</span><h4>Destructive and indiscriminate</h4><p>Explosions can kill many organisms at once and physically destroy reef habitat.</p></article>
    <article><span>SCUBA SPEARFISHING</span><h4>High targeting pressure</h4><p>Where restricted, one concern is that divers can efficiently remove large breeding reef fish.</p></article>
  </div>;
}

export default function FishingMethodsExplorer(){
  const [view,setView]=useState("methods");
  const summary=useMemo(()=>({
    methods:"Fishing methods differ in gear, selectivity and the amount of unwanted catch they may produce.",
    sustain:"Sustainable fishing protects breeding fish, juveniles and habitat so stocks can replenish.",
    harm:"Destructive or poorly controlled fishing can damage habitats and remove too many fish."
  })[view],[view]);
  return <section className="spark-fishing-methods">
    <header><span>LOCAL FISHING METHODS</span><h3>Compare common fishing methods and their environmental effects</h3><p>Caribbean fisheries use hooks, pots and nets suited to different species and habitats. The way gear is designed and used affects both catch and sustainability.</p></header>
    <div className="spark-fishing-tabs">{[["methods","Fishing methods"],["sustain","Sustainable practice"],["harm","Environmental harm"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-fishing-stage">{view==="methods"&&<MethodView/>}{view==="sustain"&&<SustainabilityView/>}{view==="harm"&&<HarmView/>}</div>
    <div className="spark-fishing-summary"><strong>{summary}</strong><span>Hand line generally produces less bycatch than trawling, while larger mesh sizes help juveniles escape.</span></div>
  </section>;
}
