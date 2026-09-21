import React,{useMemo,useState} from "react";
import "./acidsBasesSaltsExplorer.css";

function PHView(){
  const [ph,setPh]=useState(7);
  const n=Number(ph)||7;
  const kind=n<7?"acidic":n>7?"alkaline":"neutral";
  const strength=n<=2?"strongly acidic":n<7?"weakly/moderately acidic":n===7?"neutral":n>=12?"strongly alkaline":"weakly/moderately alkaline";
  return <div className="spark-ph-view">
    <label>pH<input type="range" min="0" max="14" step="1" value={ph} onChange={e=>setPh(e.target.value)}/></label>
    <div className="spark-ph-scale">{Array.from({length:15},(_,i)=><span key={i} className={i===n?"active":""}>{i}</span>)}</div>
    <strong>pH {n}: {strength}</strong>
    <p>Solutions below pH 7 are acidic, pH 7 is neutral and solutions above pH 7 are alkaline. A pH value describes the solution, not whether the pure acid itself is chemically “strong” or “weak”.</p>
  </div>;
}

function IndicatorView(){
  const [sample,setSample]=useState("acid");
  const data={
    acid:{name:"Acid",litmus:"blue litmus → red",universal:"red / orange / yellow depending on pH",colour:"acid"},
    neutral:{name:"Neutral",litmus:"no red/blue litmus change",universal:"green around pH 7",colour:"neutral"},
    alkali:{name:"Alkali",litmus:"red litmus → blue",universal:"blue / purple at high pH",colour:"alkali"}
  }[sample];
  return <div className="spark-indicator-view">
    <div className="spark-acidbase-toggle">{["acid","neutral","alkali"].map(k=><button type="button" key={k} className={sample===k?"active":""} onClick={()=>setSample(k)}>{k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className={"spark-indicator-beaker "+data.colour}><span>{data.name}</span></div>
    <div className="spark-indicator-cards"><article><b>Litmus</b><p>{data.litmus}</p></article><article><b>Universal indicator</b><p>{data.universal}</p></article></div>
  </div>;
}

function ClassificationView(){
  return <div className="spark-acidbase-classify">
    <article><span>ACID</span><h4>pH below 7</h4><p>Examples include vinegar and citrus juice. Acids turn blue litmus red.</p></article>
    <article><span>BASE</span><h4>Neutralises acids</h4><p>Bases include metal oxides, hydroxides and other substances that react with acids.</p></article>
    <article><span>ALKALI</span><h4>A soluble base</h4><p>An alkali is a base that dissolves in water. Sodium hydroxide is an alkali; baking-soda solution is mildly alkaline.</p></article>
    <article><span>SALT</span><h4>Ionic product of many acid reactions</h4><p>Table salt, sodium chloride, is one example. Salts are formed in reactions such as acid + base.</p></article>
  </div>;
}

function NeutralisationView(){
  const [context,setContext]=useState("general");
  const data={
    general:["acid + base → salt + water","Neutralisation reduces acidic and basic properties as hydrogen ions and hydroxide ions form water."],
    stomach:["antacid + stomach acid → less acidic contents","Antacids contain bases that neutralise some excess stomach acid."],
    soil:["lime + acidic soil → less acidic soil","Farmers add lime to soil that is too acidic to raise its pH."],
    sewage:["lime + acidic wastewater → closer to neutral","Treatment processes may use lime to neutralise acidic wastewater."],
    cooking:["baking soda + some food acids → partial neutralisation","A small amount of baking soda can reduce sourness because it is a weak base."]
  }[context];
  return <div className="spark-neutralisation-view">
    <div className="spark-acidbase-buttons">{["general","stomach","soil","sewage","cooking"].map(k=><button type="button" key={k} className={context===k?"active":""} onClick={()=>setContext(k)}>{k==="general"?"General":k[0].toUpperCase()+k.slice(1)}</button>)}</div>
    <div className="spark-neutral-equation">{data[0]}</div>
    <p>{data[1]}</p>
  </div>;
}

function CarbonateView(){
  return <div className="spark-carbonate-view">
    <div className="spark-carbonate-equation"><span>acid</span><b>+</b><span>carbonate</span><b>→</b><span>salt</span><b>+</b><span>water</span><b>+</b><span>carbon dioxide</span></div>
    <article><span>LIMESTONE</span><h4>Calcium carbonate reacts with acids</h4><p>Acidic rainwater or pollution can react with limestone, gradually damaging buildings and monuments made from carbonate rock.</p></article>
  </div>;
}

function StingView(){
  return <div className="spark-sting-correction">
    <article><span>EXAM-CONCEPT NOTE</span><h4>The bank uses “alkaline wasp sting + vinegar” as a neutralisation example</h4><p>This can illustrate the abstract idea of acid-base neutralisation, but real insect venom is chemically complex and skin reactions are not treated reliably by trying to neutralise pH.</p></article>
    <article className="current"><span>CURRENT FIRST-AID NOTE</span><h4>Do not teach vinegar or bicarbonate as sting treatment</h4><p>Current NHS guidance advises against traditional home remedies such as vinegar or bicarbonate of soda because they are unlikely to help. Follow recognised first-aid guidance instead.</p></article>
  </div>;
}

function ExamplesView(){
  return <div className="spark-acidbase-examples">
    <article><span>VINEGAR</span><h4>Acidic</h4><p>Contains acetic acid.</p></article>
    <article><span>LIME / LEMON JUICE</span><h4>Acidic</h4><p>Contains organic acids such as citric acid.</p></article>
    <article><span>BAKING-SODA SOLUTION</span><h4>Mildly alkaline</h4><p>Sodium hydrogencarbonate solution is above pH 7.</p></article>
    <article><span>OVEN CLEANER</span><h4>Strongly alkaline product</h4><p>Many oven cleaners contain strong alkalis and require careful handling.</p></article>
    <article><span>TOOTHPASTE</span><h4>Often mildly alkaline</h4><p>Its formulation helps neutralise acids in the mouth while cleaning teeth.</p></article>
    <article><span>TABLE SALT</span><h4>Salt</h4><p>Sodium chloride is a common salt.</p></article>
  </div>;
}

export default function AcidsBasesSaltsExplorer(){
  const [view,setView]=useState("ph");
  const summary=useMemo(()=>({
    ph:"The pH scale describes how acidic or alkaline a solution is, from 0 to 14 in the school-level model.",
    indicators:"Indicators change colour according to pH and help classify unknown solutions.",
    classify:"An alkali is a soluble base; salts are ionic compounds formed in many acid reactions.",
    neutralise:"Neutralisation has applications in digestion, agriculture, wastewater treatment and cooking.",
    carbonate:"Acids react with carbonates to form a salt, water and carbon dioxide.",
    sting:"Acid-base neutralisation is useful chemistry, but vinegar/bicarbonate sting remedies should not be taught as medical first aid.",
    examples:"Common household products span acids, alkalis and salts."
  })[view],[view]);

  return <section className="spark-acids-bases-salts">
    <header><span>ACIDS, BASES AND SALTS</span><h3>Use pH, indicators and reaction patterns to classify household substances</h3><p>Acids and bases have contrasting properties, while salts are common products of neutralisation and other acid reactions.</p></header>
    <div className="spark-acidbase-tabs">{[["ph","pH scale"],["indicators","Indicators"],["classify","Acid/base/alkali/salt"],["neutralise","Neutralisation"],["carbonate","Acid + carbonate"],["sting","Sting myth correction"],["examples","Household examples"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-acidbase-stage">{view==="ph"&&<PHView/>}{view==="indicators"&&<IndicatorView/>}{view==="classify"&&<ClassificationView/>}{view==="neutralise"&&<NeutralisationView/>}{view==="carbonate"&&<CarbonateView/>}{view==="sting"&&<StingView/>}{view==="examples"&&<ExamplesView/>}</div>
    <div className="spark-acidbase-summary"><strong>{summary}</strong><span>Acid + base → salt + water. Acid + carbonate → salt + water + carbon dioxide.</span></div>
  </section>;
}
