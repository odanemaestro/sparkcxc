import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./fishingMethodsExplorer.css";

const METHODS={
  hand:{name:"Hand line",gear:"Single line and hook",selectivity:"High",bycatch:"Low",text:"A fisher catches one fish at a time, making the method relatively selective when hook size and bait are chosen carefully."},
  pot:{name:"Fish pot",gear:"Wire mesh or woven trap with funnel entrance",selectivity:"Medium",bycatch:"Medium",text:"Fish enter through a funnel-shaped opening and have difficulty finding their way out. Escape gaps and suitable mesh can reduce capture of juveniles."},
  long:{name:"Long-line",gear:"Long main line carrying many baited hooks",selectivity:"Medium",bycatch:"Variable",text:"Used for large pelagic fish such as tuna and marlin. Hook type, depth and bait influence unwanted catch."},
  seine:{name:"Seine net",gear:"Net drawn around a school, often near shore",selectivity:"Variable",bycatch:"Variable",text:"A seine surrounds a group of fish and is pulled in. Mesh size and where the net is set affect juvenile catch."},
  trawl:{name:"Trawling",gear:"Large net towed by a boat",selectivity:"Low to medium",bycatch:"Often high",text:"Bottom trawling can disturb seabed habitats and catch non-target organisms as bycatch."}
};

function FishingGearDiagram({method}){
  const fish=(x,y,s=1)=><g transform={"translate("+x+" "+y+") scale("+s+")"}><path className="fg-fish" d="M-28 0Q0-24 30 0Q0 24-28 0Z"/><path className="fg-tail" d="M-28 0L-50-18L-50 18Z"/><circle className="fg-eye" cx="17" cy="-4" r="3"/></g>;

  if(method==="hand") return <ReviewedScienceDiagram site="FishingMethodsExplorer.jsx:15"><svg className="spark-fishing-gear-svg" viewBox="0 0 840 390" role="img" aria-label="Hand line fishing showing one line, hook and a single fish">
    <path className="fg-water" d="M0 185Q105 165 210 185T420 185T630 185T840 185V390H0Z"/>
    <path className="fg-boat" d="M120 120H330L295 175H155Z"/>
    <circle className="fg-head" cx="220" cy="72" r="20"/><path className="fg-person" d="M220 92V137M220 108L260 125"/>
    <path className="fg-line" d="M260 125Q330 150 365 220V310"/>
    <path className="fg-hook" d="M365 310Q365 342 390 330Q404 322 395 307"/>
    {fish(430,315,1)}
    <text className="fg-label" x="355" y="245">single line</text>
    <text className="fg-label" x="410" y="352">baited hook</text>
    <text className="fg-caption" x="420" y="372" textAnchor="middle">one hook at a time gives relatively high selectivity</text>
  </svg></ReviewedScienceDiagram>;

  if(method==="pot") return <ReviewedScienceDiagram site="FishingMethodsExplorer.jsx:27"><svg className="spark-fishing-gear-svg" viewBox="0 0 840 390" role="img" aria-label="Fish pot showing mesh trap, funnel entrance, bait and escape gap">
    <path className="fg-water" d="M0 75Q105 55 210 75T420 75T630 75T840 75V390H0Z"/>
    <path className="fg-seabed" d="M0 345Q150 320 300 346T600 345T840 340"/>
    <path className="fg-pot" d="M205 155L610 145L665 315H160Z"/>
    {[220,280,340,400,460,520,580].map(x=><line key={x} className="fg-mesh" x1={x} y1="155" x2={x-35} y2="315"/>)}
    {[190,225,260,295].map(y=><line key={y} className="fg-mesh" x1="185" y1={y} x2="640" y2={y-10}/>)}
    <path className="fg-funnel" d="M160 240L300 205V275Z"/>
    <circle className="fg-bait" cx="470" cy="245" r="13"/>
    <rect className="fg-escape" x="535" y="265" width="48" height="28" rx="6"/>
    {fish(385,210,.7)}{fish(430,280,.6)}
    <text className="fg-label" x="132" y="215" textAnchor="end">funnel entrance</text><path className="fg-callout" d="M140 210L240 225"/>
    <text className="fg-label" x="640" y="225">mesh trap</text>
    <text className="fg-label" x="610" y="305">escape gap</text><path className="fg-callout" d="M595 298L560 280"/>
    <text className="fg-caption" x="420" y="372" textAnchor="middle">escape gaps and suitable mesh reduce capture of juveniles</text>
  </svg></ReviewedScienceDiagram>;

  if(method==="long") return <ReviewedScienceDiagram site="FishingMethodsExplorer.jsx:43"><svg className="spark-fishing-gear-svg" viewBox="0 0 840 390" role="img" aria-label="Long-line fishing showing a main line with floats and many branch lines carrying baited hooks">
    <path className="fg-water" d="M0 90Q105 70 210 90T420 90T630 90T840 90V390H0Z"/>
    <path className="fg-main-line" d="M80 135Q420 115 760 135"/>
    {[130,270,410,550,690].map(x=><g key={x}><ellipse className="fg-float" cx={x} cy="105" rx="28" ry="12"/><line className="fg-float-line" x1={x} y1="117" x2={x} y2="130"/></g>)}
    {[180,320,460,600,720].map((x,i)=><g key={x}><path className="fg-branch" d={"M"+x+" 128V"+(240+(i%2)*35)}/><path className="fg-hook" d={"M"+x+" "+(240+(i%2)*35)+"Q"+x+" "+(275+(i%2)*35)+" "+(x+22)+" "+(265+(i%2)*35)}/>{fish(x+55,270+(i%2)*30,.65)}</g>)}
    <text className="fg-label" x="420" y="165" textAnchor="middle">long main line</text>
    <text className="fg-label" x="738" y="245">branch lines with hooks</text>
    <text className="fg-caption" x="420" y="372" textAnchor="middle">hook type, depth and bait influence target catch and bycatch</text>
  </svg></ReviewedScienceDiagram>;

  if(method==="seine") return <ReviewedScienceDiagram site="FishingMethodsExplorer.jsx:53"><svg className="spark-fishing-gear-svg" viewBox="0 0 840 390" role="img" aria-label="Seine net surrounding a school of fish with floats along the top and weights along the bottom">
    <path className="fg-water" d="M0 65Q105 45 210 65T420 65T630 65T840 65V390H0Z"/>
    <path className="fg-seine" d="M115 125Q420 255 725 125L670 320Q420 365 170 320Z"/>
    {[170,250,330,410,490,570,650].map(x=><circle key={x} className="fg-float" cx={x} cy={145+Math.abs(x-410)*.22} r="9"/>)}
    {[190,280,370,460,550,640].map(x=><circle key={x} className="fg-weight" cx={x} cy={318+Math.abs(x-415)*.06} r="7"/>)}
    {[220,285,350,415,480,545,610].map(x=><path key={x} className="fg-net-line" d={"M"+x+" "+(168+Math.abs(x-410)*.15)+"L"+(x-20)+" "+(320+Math.abs(x-415)*.05)}/>)}
    {fish(360,235,.65)}{fish(430,260,.7)}{fish(500,225,.58)}{fish(285,275,.55)}
    <text className="fg-label" x="420" y="105" textAnchor="middle">floats support upper edge</text>
    <text className="fg-label" x="420" y="350" textAnchor="middle">weights hold lower edge down</text>
    <text className="fg-caption" x="420" y="382" textAnchor="middle">the net surrounds a school before being drawn together</text>
  </svg></ReviewedScienceDiagram>;

  return <ReviewedScienceDiagram site="FishingMethodsExplorer.jsx:65"><svg className="spark-fishing-gear-svg" viewBox="0 0 840 390" role="img" aria-label="Bottom trawl showing a boat towing a cone-shaped net near the seabed">
    <path className="fg-water" d="M0 75Q105 55 210 75T420 75T630 75T840 75V390H0Z"/>
    <path className="fg-boat" d="M85 105H280L250 155H115Z"/>
    <path className="fg-tow-line" d="M255 150L440 225"/>
    <path className="fg-trawl-net" d="M440 205L735 255L620 335L440 245Z"/>
    <path className="fg-trawl-mouth" d="M440 205V245"/>
    {[500,550,600,650].map(x=><line key={x} className="fg-net-line" x1={x} y1={215+(x-440)*.17} x2={x-20} y2={260+(x-440)*.25}/>)}
    <path className="fg-seabed" d="M0 348Q150 320 300 348T600 345T840 340"/>
    {fish(535,285,.55)}{fish(600,300,.5)}{fish(675,282,.45)}
    <text className="fg-label" x="330" y="190">tow line</text>
    <text className="fg-label" x="570" y="205">cone-shaped trawl net</text>
    <text className="fg-caption" x="420" y="378" textAnchor="middle">bottom trawling can disturb seabed habitat and catch non-target organisms</text>
  </svg></ReviewedScienceDiagram>;
}

function MethodView(){
  const [method,setMethod]=useState("hand");
  const d=METHODS[method];
  return <div className="spark-fishing-method-view">
    <div className="spark-fishing-buttons">{Object.keys(METHODS).map(k=><button key={k} type="button" className={method===k?"active":""} onClick={()=>setMethod(k)}>{METHODS[k].name}</button>)}</div>
    <div className="spark-fishing-method-detail"><FishingGearDiagram method={method}/><article><span>{d.name.toUpperCase()}</span><h4>{d.gear}</h4><div className="spark-fishing-stats"><b>Selectivity: {d.selectivity}</b><b>Bycatch: {d.bycatch}</b></div><p>{d.text}</p></article></div>
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
