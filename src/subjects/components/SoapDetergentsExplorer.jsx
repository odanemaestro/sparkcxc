import React,{useMemo,useState} from "react";
import "./soapDetergentsExplorer.css";

function MakeView(){
  return <div className="spark-soap-making">
    <div className="spark-soap-equation"><span>fats or vegetable oils</span><b>+</b><span>sodium hydroxide</span><b>→</b><span>soap + glycerol</span></div>
    <p>This process is called saponification. The soap molecules produced have a water-attracting end and an oil-attracting end.</p>
  </div>;
}

function CleaningView(){
  const [grease,setGrease]=useState(false);
  return <div className="spark-detergent-cleaning">
    <div className="spark-detergent-toggle"><button type="button" className={!grease?"active":""} onClick={()=>setGrease(false)}>Before washing</button><button type="button" className={grease?"active":""} onClick={()=>setGrease(true)}>With surfactant</button></div>
    <div className="spark-grease-model">
      <div className="spark-grease-drop">grease</div>
      {grease&&Array.from({length:12},(_,i)=><span key={i} className="spark-surfactant" style={{transform:`rotate(${i*30}deg) translateY(-70px)`}}>●</span>)}
    </div>
    <p>{grease?"Surfactant molecules surround grease droplets. Their oil-attracting parts face inward and their water-attracting parts face outward, helping disperse grease into the wash water.":"Grease does not mix well with water on its own."}</p>
  </div>;
}

function HardWaterView(){
  const [product,setProduct]=useState("soap");
  const soap=product==="soap";
  return <div className="spark-soap-hardwater">
    <div className="spark-detergent-toggle"><button type="button" className={soap?"active":""} onClick={()=>setProduct("soap")}>Soap</button><button type="button" className={!soap?"active":""} onClick={()=>setProduct("synthetic")}>Soapless detergent</button></div>
    <div className="spark-hardwater-bowl">
      <div className="spark-hardwater-liquid"></div>
      {soap?<div className="spark-soap-scum">calcium / magnesium soap scum</div>:<div className="spark-detergent-foam">lather remains effective</div>}
    </div>
    <p>{soap?"Soap reacts with calcium and magnesium ions in hard water to form insoluble scum. This wastes soap and reduces lather.":"Synthetic detergents are designed so their calcium and magnesium salts remain much more soluble, so they work better in hard water."}</p>
  </div>;
}

function CompareView(){
  return <div className="spark-soap-compare">
    <article><span>SOAP</span><h4>Made by saponifying fats or oils</h4><p>Often readily biodegradable and traditionally made from renewable biological feedstocks.</p></article>
    <article><span>SOAPLESS DETERGENT</span><h4>Synthetic surfactant formulation</h4><p>Many conventional detergents use petrochemical-derived surfactants, although modern products may also use bio-based feedstocks.</p></article>
    <article><span>SOAP ADVANTAGE</span><h4>Often readily biodegradable</h4><p>Soap molecules are generally broken down readily by microorganisms under suitable conditions.</p></article>
    <article><span>SOAP DISADVANTAGE</span><h4>Forms scum in hard water</h4><p>Calcium and magnesium ions form insoluble salts with soap.</p></article>
    <article><span>DETERGENT ADVANTAGE</span><h4>Works in hard water</h4><p>Synthetic detergents do not form the same insoluble scum problem.</p></article>
    <article><span>DETERGENT CAUTION</span><h4>Environmental impact depends on formulation</h4><p>Some surfactants or additives can persist, irritate skin or contribute to water pollution if poorly formulated or overused.</p></article>
  </div>;
}

function PhosphateView(){
  return <div className="spark-phosphate-view">
    <article><span>1</span><h4>Phosphate enters water</h4><p>Some detergent formulations can add phosphate nutrients to rivers or lakes.</p></article><div>→</div>
    <article><span>2</span><h4>Algae grow rapidly</h4><p>Extra nutrients can stimulate excessive algal growth, called eutrophication.</p></article><div>→</div>
    <article><span>3</span><h4>Oxygen can fall</h4><p>When large amounts of algae die, microbial decomposition consumes dissolved oxygen and can stress or kill aquatic organisms.</p></article>
    <aside><strong>Important qualification</strong><p>Not every modern detergent contains phosphate, and many synthetic detergents are formulated to be biodegradable. Evaluate the actual product rather than assuming all “soapless detergents” have the same environmental impact.</p></aside>
  </div>;
}

function SkinView(){
  return <div className="spark-detergent-skin">
    <article><span>MILD SOAP</span><h4>Can be suitable for many routine uses</h4><p>Soap removes oils and dirt but can still irritate or dry skin if used excessively.</p></article>
    <article><span>STRONG DETERGENTS</span><h4>May irritate sensitive skin</h4><p>Some formulations remove natural skin oils or contain fragrances and additives that can irritate sensitive users.</p></article>
    <article><span>BEST PRACTICE</span><h4>Use the product intended for the task</h4><p>Do not use heavy-duty household detergents as skin cleansers. Follow product labels and rinse residues from clothing or surfaces as directed.</p></article>
  </div>;
}

export default function SoapDetergentsExplorer(){
  const [view,setView]=useState("make");
  const summary=useMemo(()=>({
    make:"Soap is produced by saponification of fats or oils with an alkali such as sodium hydroxide.",
    clean:"Soap and detergent molecules act as surfactants that help water disperse grease.",
    hard:"Soap forms insoluble scum in hard water; synthetic detergents generally remain effective.",
    compare:"Soap and soapless detergents differ in feedstock, hard-water behaviour and environmental profile.",
    phosphate:"Excess phosphate can contribute to eutrophication and low dissolved oxygen.",
    skin:"Skin irritation depends on formulation and exposure, so product choice matters."
  })[view],[view]);

  return <section className="spark-soap-detergents">
    <header><span>SOAP AND SOAPLESS DETERGENTS</span><h3>Compare how soaps and synthetic detergents are made, clean and behave in hard water</h3><p>Both soaps and synthetic detergents contain surfactants that help remove grease, but they differ in manufacture, hard-water performance and environmental behaviour.</p></header>
    <div className="spark-detergent-tabs">{[["make","Making soap"],["clean","Cleaning action"],["hard","Hard water"],["compare","Compare"],["phosphate","Phosphates"],["skin","Skin and use"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-detergent-stage">{view==="make"&&<MakeView/>}{view==="clean"&&<CleaningView/>}{view==="hard"&&<HardWaterView/>}{view==="compare"&&<CompareView/>}{view==="phosphate"&&<PhosphateView/>}{view==="skin"&&<SkinView/>}</div>
    <div className="spark-detergent-summary"><strong>{summary}</strong><span>Soap + hard-water calcium or magnesium ions → insoluble scum. Synthetic detergents are designed to avoid this problem.</span></div>
  </section>;
}
