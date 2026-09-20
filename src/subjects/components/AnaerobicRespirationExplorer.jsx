import React,{useMemo,useState} from "react";
import "./anaerobicRespirationExplorer.css";

function CompareView(){
  const rows=[
    ["Oxygen","Required","Not required"],
    ["Breakdown of glucose","More complete","Partial"],
    ["Energy released","Much more","Much less"],
    ["Human muscle products","Carbon dioxide + water","Lactate, written as lactic acid in the CSEC equation"],
    ["Yeast products","Carbon dioxide + water when aerobic","Ethanol + carbon dioxide"],
  ];
  return <div className="spark-anaerobic-compare">
    <div className="spark-anaerobic-head"><span>Feature</span><strong>Aerobic</strong><strong>Anaerobic</strong></div>
    {rows.map(row=><div key={row[0]}><span>{row[0]}</span><p>{row[1]}</p><p>{row[2]}</p></div>)}
  </div>;
}

function YeastView(){
  return <div className="spark-yeast-fermentation">
    <div className="spark-yeast-equation"><span>Glucose</span><b>→</b><span>Ethanol</span><b>+</b><span>Carbon dioxide</span><b>+</b><span>Energy</span></div>
    <div className="spark-yeast-uses">
      <article><span>BREAD</span><h4>Carbon dioxide makes dough rise</h4><p>Gas bubbles become trapped in the dough. Ethanol formed during fermentation is largely lost during baking.</p></article>
      <article><span>BREWING</span><h4>Ethanol is the useful product</h4><p>Yeast ferments sugars under low-oxygen conditions to produce ethanol and carbon dioxide.</p></article>
      <article><span>INVESTIGATION</span><h4>Warm conditions support yeast enzymes</h4><p>A water bath around 35 °C provides suitable conditions. Carbon dioxide released by the yeast can turn limewater milky.</p></article>
    </div>
  </div>;
}

function MuscleView(){
  return <div className="spark-muscle-anaerobic">
    <div className="spark-muscle-equation"><span>Glucose</span><b>→</b><span>Lactic acid</span><b>+</b><span>Energy</span></div>
    <article><span>VIGOROUS EXERCISE</span><h4>When oxygen delivery does not meet demand</h4><p>Muscle cells increase anaerobic glycolysis and produce lactate. CSEC commonly writes the product as lactic acid.</p></article>
    <article><span>RECOVERY</span><h4>Breathing stays deep after exercise</h4><p>Extra oxygen supports recovery processes, including restoring energy stores and processing lactate. CSEC often describes this recovery requirement as repaying an oxygen debt.</p></article>
    <aside><strong>Accuracy note</strong><p>Lactate production is associated with intense exercise, but current exercise physiology does not identify lactate itself as the direct cause of exercise-associated muscle cramps.</p></aside>
  </div>;
}

function EnergyView(){
  const aerobic=2900;
  const anaerobic=210;
  const ratio=Math.round((aerobic/anaerobic)*10)/10;
  return <div className="spark-respiration-energy-ratio">
    <article><span>AEROBIC</span><strong>{aerobic.toLocaleString()} kJ</strong><p>Bank example per mole of glucose</p></article>
    <div className="spark-energy-ratio-center"><b>÷</b><strong>{ratio}×</strong><span>about 14 times more</span></div>
    <article><span>ANAEROBIC IN YEAST</span><strong>{anaerobic} kJ</strong><p>Bank example per mole of glucose</p></article>
    <p>Anaerobic respiration releases less energy because glucose is only partly broken down.</p>
  </div>;
}

export default function AnaerobicRespirationExplorer(){
  const [view,setView]=useState("compare");
  const summary=useMemo(()=>({
    compare:"Aerobic respiration uses oxygen and releases much more energy than anaerobic respiration.",
    yeast:"Yeast fermentation produces ethanol and carbon dioxide and has practical uses in bread-making and brewing.",
    muscle:"Human muscles rely more heavily on anaerobic pathways when energy demand exceeds oxygen-supported aerobic supply.",
    energy:"Partial breakdown of glucose explains the much lower energy yield from anaerobic respiration.",
  })[view],[view]);

  return <section className="spark-anaerobic-respiration">
    <header><span>AEROBIC AND ANAEROBIC RESPIRATION</span><h3>Compare oxygen use, products, energy yield and practical examples</h3><p>Anaerobic respiration releases energy without oxygen, but glucose is only partly broken down, so the energy yield is much lower than in aerobic respiration.</p></header>
    <div className="spark-anaerobic-tabs">{[["compare","Compare"],["yeast","Yeast"],["muscle","Muscle"],["energy","Energy yield"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-anaerobic-stage">
      {view==="compare"&&<CompareView/>}
      {view==="yeast"&&<YeastView/>}
      {view==="muscle"&&<MuscleView/>}
      {view==="energy"&&<EnergyView/>}
    </div>
    <div className="spark-anaerobic-summary"><strong>{summary}</strong><span>Use the organism when writing an anaerobic equation. Yeast produces ethanol and carbon dioxide, while human muscle is taught in the CSEC bank using the lactic-acid equation.</span></div>
  </section>;
}
