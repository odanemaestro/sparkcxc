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

function YeastApparatusDiagram(){
  return <svg className="spark-yeast-apparatus-svg" viewBox="0 0 900 430" role="img" aria-label="Yeast fermentation apparatus with glucose solution in a warm water bath connected to limewater">
    <path className="ya-water-bath" d="M70 145V330Q70 355 95 355H390Q415 355 415 330V145"/>
    <line className="ya-rim" x1="55" y1="145" x2="430" y2="145"/>
    <path className="ya-bath-water" d="M70 220H415V330Q415 355 390 355H95Q70 355 70 330Z"/>
    <path className="ya-flask" d="M165 85V145L120 290Q115 320 148 320H307Q340 320 335 290L290 145V85Z"/>
    <path className="ya-ferment" d="M145 240Q228 215 312 240V298Q312 308 300 308H155Q145 308 145 298Z"/>
    {[175,205,235,265,295].map((x,i)=><circle key={x} className="ya-bubble" cx={x} cy={230-(i%3)*24} r={i%2===0?6:4}/>)}
    <path className="ya-delivery" d="M290 105H500Q548 105 548 155V245"/>
    <path className="ya-test-tube" d="M505 155V315Q505 345 550 345Q595 345 595 315V155"/>
    <path className="ya-limewater" d="M505 245H595V315Q595 345 550 345Q505 345 505 315Z"/>
    <circle className="ya-cloud" cx="533" cy="283" r="18"/><circle className="ya-cloud" cx="562" cy="292" r="19"/><circle className="ya-cloud" cx="552" cy="272" r="16"/>
    <rect className="ya-thermometer" x="365" y="140" width="13" height="135" rx="6"/>
    <circle className="ya-thermometer-bulb" cx="371.5" cy="280" r="15"/>
    <rect className="ya-mercury" x="369" y="178" width="5" height="102" rx="2.5"/>
    <text className="ya-label" x="228" y="350" textAnchor="middle">yeast + glucose solution</text>
    <text className="ya-label" x="244" y="395" textAnchor="middle">warm water bath, about 35 °C</text>
    <text className="ya-label" x="550" y="390" textAnchor="middle">limewater turns milky</text>
    <text className="ya-small" x="455" y="82" textAnchor="middle">CO₂ passes through delivery tube</text>
    <path className="ya-stop-air" d="M720 120L790 190M790 120L720 190"/>
    <text className="ya-label" x="755" y="225" textAnchor="middle">low oxygen</text>
    <text className="ya-small" x="755" y="250" textAnchor="middle">favours fermentation</text>
  </svg>;
}

function YeastView(){
  return <div className="spark-yeast-fermentation">
    <div className="spark-yeast-equation"><span>Glucose</span><b>→</b><span>Ethanol</span><b>+</b><span>Carbon dioxide</span><b>+</b><span>Energy</span></div>
    <YeastApparatusDiagram/>
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
