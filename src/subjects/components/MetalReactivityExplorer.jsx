import React,{useMemo,useState} from "react";
import "./metalReactivityExplorer.css";

const SERIES=["Potassium","Calcium","Magnesium","Aluminium","Zinc","Iron","Tin","Lead","Hydrogen","Copper","Silver","Gold"];

function SeriesView(){
  return <div className="spark-reactivity-series">{SERIES.map((m,i)=><article key={m} className={m==="Hydrogen"?"hydrogen":""}><span>{i+1}</span><b>{m}</b><small>{m==="Hydrogen"?"reference position":i<8?"more reactive above":"less reactive below"}</small></article>)}</div>;
}

function AcidView(){
  const [metal,setMetal]=useState("zinc");
  const data={
    zinc:{name:"Zinc",symbol:"Zn",equation:"zinc + hydrochloric acid → zinc chloride + hydrogen",reacts:true,bubbles:12},
    iron:{name:"Iron",symbol:"Fe",equation:"iron + hydrochloric acid → iron chloride + hydrogen",reacts:true,bubbles:7},
    copper:{name:"Copper",symbol:"Cu",equation:"No reaction with dilute hydrochloric acid under normal classroom conditions",reacts:false,bubbles:0},
    silver:{name:"Silver",symbol:"Ag",equation:"No reaction with dilute hydrochloric acid under normal classroom conditions",reacts:false,bubbles:0}
  }[metal];
  const bubblePoints=[[209,174],[222,153],[197,141],[216,126],[201,111],[226,96],[205,81],[217,67],[199,55],[225,45],[211,34],[201,24]];
  return <div className="spark-acid-reactivity">
    <div className="spark-reactivity-buttons">{["zinc","iron","copper","silver"].map(k=><button type="button" key={k} className={metal===k?"active":""} onClick={()=>setMetal(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-acid-apparatus">
      <svg className="spark-acid-svg" viewBox="0 0 620 360" role="img" aria-label={data.name+" reacting with dilute hydrochloric acid in a test tube"}>
        <defs>
          <clipPath id="mr-test-tube-clip"><path d="M170 52V252C170 301 250 301 250 252V52Z"/></clipPath>
        </defs>
        <path className="mr-tube" d="M170 52V252C170 301 250 301 250 252V52"/>
        <line className="mr-rim" x1="158" y1="52" x2="262" y2="52"/>
        <g clipPath="url(#mr-test-tube-clip)">
          <rect className="mr-acid" x="170" y="145" width="80" height="145"/>
          <path className={"mr-metal "+metal} d="M193 238L227 224L233 266L198 274Z"/>
          {data.reacts&&bubblePoints.slice(0,data.bubbles).map(([cx,cy],i)=><circle key={i} className="mr-bubble" cx={cx} cy={cy} r={i%3===0?6:4}/>)}
        </g>
        <line className="mr-callout" x1="250" y1="173" x2="362" y2="153"/>
        <text className="mr-label" x="375" y="150">dilute hydrochloric acid</text>
        <line className="mr-callout" x1="225" y1="244" x2="360" y2="255"/>
        <text className="mr-label" x="375" y="260">{data.name} metal</text>
        {data.reacts&&<>
          <line className="mr-callout" x1="221" y1="96" x2="360" y2="72"/>
          <text className="mr-label" x="375" y="68">hydrogen gas bubbles</text>
        </>}
        <text className="mr-symbol" x="210" y="253" textAnchor="middle">{data.symbol}</text>
        <text className="mr-caption" x="210" y="328" textAnchor="middle">test tube</text>
      </svg>
    </div>
    <strong>{data.equation}</strong><p>{data.reacts?"Hydrogen gas is released because the metal is above hydrogen in the reactivity series. Faster bubbling indicates a faster reaction under the same conditions.":"Copper and silver are below hydrogen in the simplified series used here, so they do not displace hydrogen from dilute hydrochloric acid."}</p>
  </div>;
}

function DisplacementView(){
  const [metal,setMetal]=useState("iron");
  const iron=metal==="iron";
  return <div className="spark-displacement-view">
    <div className="spark-reactivity-buttons"><button type="button" className={iron?"active":""} onClick={()=>setMetal("iron")}>Iron in copper(II) sulfate</button><button type="button" className={!iron?"active":""} onClick={()=>setMetal("copper")}>Copper in iron salt</button></div>
    <div className="spark-displacement-apparatus">
      <svg className="spark-displacement-svg" viewBox="0 0 720 390" role="img" aria-label={iron?"Iron nail in copper two sulfate solution showing copper deposition":"Copper strip in iron salt solution showing no displacement"}>
        <path className="mr-beaker" d="M155 62V305Q155 326 176 326H394Q415 326 415 305V62"/>
        <line className="mr-beaker-rim" x1="140" y1="62" x2="430" y2="62"/>
        <path className={iron?"mr-solution copper-sulfate":"mr-solution iron-salt"} d="M155 145H415V305Q415 326 394 326H176Q155 326 155 305Z"/>
        <rect className={iron?"mr-strip iron":"mr-strip copper"} x="265" y="92" width="42" height="202" rx="8"/>
        {iron&&<path className="mr-copper-deposit" d="M260 191Q286 179 312 191V289Q286 302 260 289Z"/>}
        <line className="mr-callout" x1="308" y1="118" x2="506" y2="96"/>
        <text className="mr-label" x="520" y="94">{iron?"iron nail / strip":"copper strip"}</text>
        <line className="mr-callout" x1="410" y1="180" x2="506" y2="168"/>
        <text className="mr-label" x="520" y="166">{iron?"copper(II) sulfate solution":"iron salt solution"}</text>
        {iron&&<>
          <line className="mr-callout" x1="308" y1="235" x2="506" y2="248"/>
          <text className="mr-label" x="520" y="247">copper metal deposited</text>
          <text className="mr-ion-note" x="284" y="348" textAnchor="middle">Fe atoms enter solution while Cu²⁺ ions gain electrons and form Cu</text>
        </>}
        {!iron&&<text className="mr-ion-note" x="284" y="348" textAnchor="middle">No displacement, copper is less reactive than iron</text>}
      </svg>
    </div>
    <p>{iron?"Iron is more reactive than copper, so iron displaces copper ions from solution. Copper metal forms as a reddish-brown coating while iron enters the solution as ions.":"Copper is less reactive than iron, so it cannot displace iron ions from solution."}</p>
  </div>;
}

function AluminiumView(){
  const [scratched,setScratched]=useState(false);
  return <div className="spark-aluminium-reactivity">
    <div className="spark-reactivity-buttons"><button type="button" className={!scratched?"active":""} onClick={()=>setScratched(false)}>Oxide layer intact</button><button type="button" className={scratched?"active":""} onClick={()=>setScratched(true)}>Oxide layer removed</button></div>
    <div className="spark-aluminium-strip"><div className={scratched?"spark-oxide broken":"spark-oxide"}></div><span>Al</span></div>
    <p>{scratched?"Once the protective aluminium oxide layer is removed, the underlying aluminium can react more readily.":"Aluminium is high in the reactivity series, but its thin, adherent oxide layer protects the metal and can make initial reaction appear slow."}</p>
  </div>;
}

function NativeView(){
  return <div className="spark-native-metals">
    <article><span>GOLD</span><h4>Very unreactive</h4><p>Gold does not readily form compounds, so it can occur uncombined in nature.</p></article>
    <article><span>SILVER</span><h4>Relatively unreactive</h4><p>Silver is much less reactive than metals such as zinc or iron and can sometimes occur native.</p></article>
    <article><span>MORE REACTIVE METALS</span><h4>Usually found as compounds</h4><p>Potassium, aluminium, zinc and iron react more readily and are normally found chemically combined in ores.</p></article>
  </div>;
}

export default function MetalReactivityExplorer(){
  const [view,setView]=useState("series");
  const summary=useMemo(()=>({
    series:"The reactivity series orders metals by how readily they react. Hydrogen is included as a useful reference point for acid reactions.",
    acid:"Metals above hydrogen can usually displace hydrogen from dilute acids, producing a salt and hydrogen gas.",
    displacement:"A more reactive metal can displace a less reactive metal from a solution of its compound.",
    aluminium:"Aluminium is reactive but appears protected because of its thin oxide coating.",
    native:"Very unreactive metals such as gold can occur uncombined in nature."
  })[view],[view]);
  return <section className="spark-metal-reactivity">
    <header><span>METAL REACTIVITY</span><h3>Compare metals using acid reactions, displacement and the reactivity series</h3><p>Metal reactivity can be compared by how readily a metal reacts with acids, oxygen or solutions containing ions of other metals.</p></header>
    <div className="spark-reactivity-tabs">{[["series","Reactivity series"],["acid","Metals + acid"],["displacement","Displacement"],["aluminium","Aluminium oxide"],["native","Native metals"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-reactivity-stage">{view==="series"&&<SeriesView/>}{view==="acid"&&<AcidView/>}{view==="displacement"&&<DisplacementView/>}{view==="aluminium"&&<AluminiumView/>}{view==="native"&&<NativeView/>}</div>
    <div className="spark-reactivity-summary"><strong>{summary}</strong><span>For dilute acids: metal + acid → salt + hydrogen, provided the metal is reactive enough.</span></div>
  </section>;
}

export { SERIES };
