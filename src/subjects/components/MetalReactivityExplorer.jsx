import React,{useMemo,useState} from "react";
import "./metalReactivityExplorer.css";

const SERIES=["Potassium","Calcium","Magnesium","Aluminium","Zinc","Iron","Tin","Lead","Hydrogen","Copper","Silver","Gold"];

function SeriesView(){
  return <div className="spark-reactivity-series">{SERIES.map((m,i)=><article key={m} className={m==="Hydrogen"?"hydrogen":""}><span>{i+1}</span><b>{m}</b><small>{m==="Hydrogen"?"reference position":i<8?"more reactive above":"less reactive below"}</small></article>)}</div>;
}

function AcidView(){
  const [metal,setMetal]=useState("zinc");
  const data={
    zinc:{name:"Zinc",bubbles:"many",equation:"zinc + hydrochloric acid → zinc chloride + hydrogen",reacts:true},
    iron:{name:"Iron",bubbles:"some",equation:"iron + hydrochloric acid → iron chloride + hydrogen",reacts:true},
    copper:{name:"Copper",bubbles:"none",equation:"No reaction with dilute hydrochloric acid under normal classroom conditions",reacts:false},
    silver:{name:"Silver",bubbles:"none",equation:"No reaction with dilute hydrochloric acid under normal classroom conditions",reacts:false}
  }[metal];
  return <div className="spark-acid-reactivity">
    <div className="spark-reactivity-buttons">{["zinc","iron","copper","silver"].map(k=><button type="button" key={k} className={metal===k?"active":""} onClick={()=>setMetal(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-test-tube">
      <div className="spark-acid-liquid"></div>
      <div className={"spark-metal-piece "+metal}>{data.name}</div>
      {data.reacts&&Array.from({length:metal==="zinc"?12:6}).map((_,i)=><span key={i} className="spark-gas-bubble" style={{left:(35+(i*9)%35)+"%",bottom:(65+(i*19)%120)+"px"}}></span>)}
    </div>
    <strong>{data.equation}</strong><p>{data.reacts?"Hydrogen gas is released because the metal is above hydrogen in the reactivity series.":"Copper and silver are below hydrogen in the simplified series used here, so they do not displace hydrogen from dilute hydrochloric acid."}</p>
  </div>;
}

function DisplacementView(){
  const [metal,setMetal]=useState("iron");
  const iron=metal==="iron";
  return <div className="spark-displacement-view">
    <div className="spark-reactivity-buttons"><button type="button" className={iron?"active":""} onClick={()=>setMetal("iron")}>Iron in copper(II) sulfate</button><button type="button" className={!iron?"active":""} onClick={()=>setMetal("copper")}>Copper in iron salt</button></div>
    <div className="spark-displacement-beaker"><div className="spark-blue-solution"></div><div className={"spark-strip "+metal}></div>{iron&&<div className="spark-copper-coat">copper coating</div>}</div>
    <p>{iron?"Iron is more reactive than copper, so iron displaces copper ions from solution and copper metal coats the nail or strip.":"Copper is less reactive than iron, so it cannot displace iron ions from solution."}</p>
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
