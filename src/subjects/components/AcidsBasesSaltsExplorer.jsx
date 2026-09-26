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
    {context==="general"&&<svg className="spark-neutralisation-svg" viewBox="0 0 940 450" role="img" aria-label="Particle model of acid-base neutralisation showing hydrogen ions reacting with hydroxide ions to form water while spectator ions remain in solution">
      <defs>
        <marker id="ab-reaction-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="ab-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>
      <g transform="translate(35 65)">
        <rect className="ab-beaker" x="0" y="0" width="250" height="280" rx="18"/>
        <path className="ab-acid-water" d="M12 90H238V258Q238 268 228 268H22Q12 268 12 258Z"/>
        <text className="ab-title" x="125" y="-20" textAnchor="middle">acid solution</text>
        {[[58,125,"H⁺"],[128,155,"H⁺"],[195,118,"H⁺"],[88,220,"Cl⁻"],[180,215,"Cl⁻"]].map(([x,y,t],i)=><g key={i} className={t==="H⁺"?"ab-ion hydrogen":"ab-ion spectator"}><circle cx={x} cy={y} r="22"/><text x={x} y={y+5} textAnchor="middle">{t}</text></g>)}
      </g>

      <text className="ab-plus-sign" x="315" y="220">+</text>

      <g transform="translate(345 65)">
        <rect className="ab-beaker" x="0" y="0" width="250" height="280" rx="18"/>
        <path className="ab-alkali-water" d="M12 90H238V258Q238 268 228 268H22Q12 268 12 258Z"/>
        <text className="ab-title" x="125" y="-20" textAnchor="middle">alkali solution</text>
        {[[58,125,"OH⁻"],[128,155,"OH⁻"],[195,118,"OH⁻"],[88,220,"Na⁺"],[180,215,"Na⁺"]].map(([x,y,t],i)=><g key={i} className={t==="OH⁻"?"ab-ion hydroxide":"ab-ion spectator"}><circle cx={x} cy={y} r="22"/><text x={x} y={y+5} textAnchor="middle">{t}</text></g>)}
      </g>

      <path className="ab-main-arrow" d="M620 205H700" markerEnd="url(#ab-reaction-arrow)"/>

      <g transform="translate(705 65)">
        <rect className="ab-beaker" x="0" y="0" width="200" height="280" rx="18"/>
        <path className="ab-neutral-water" d="M12 90H188V258Q188 268 178 268H22Q12 268 12 258Z"/>
        <text className="ab-title" x="100" y="-20" textAnchor="middle">after neutralisation</text>
        <g className="ab-water-molecules">
          <g transform="translate(62 135)"><circle className="oxygen" r="18"/><circle className="hydrogen" cx="-18" cy="16" r="10"/><circle className="hydrogen" cx="18" cy="16" r="10"/><text x="0" y="55" textAnchor="middle">H₂O</text></g>
          <g transform="translate(135 175)"><circle className="oxygen" r="18"/><circle className="hydrogen" cx="-18" cy="16" r="10"/><circle className="hydrogen" cx="18" cy="16" r="10"/><text x="0" y="55" textAnchor="middle">H₂O</text></g>
        </g>
        <g className="ab-spectator-after">
          <circle cx="55" cy="235" r="18"/><text x="55" y="240" textAnchor="middle">Na⁺</text>
          <circle cx="145" cy="235" r="18"/><text x="145" y="240" textAnchor="middle">Cl⁻</text>
        </g>
      </g>

      <text className="ab-equation-label" x="470" y="410" textAnchor="middle">H⁺ + OH⁻ → H₂O</text>
      <text className="ab-caption" x="470" y="438" textAnchor="middle">hydrogen ions and hydroxide ions form water; other ions remain dissolved and make the salt solution</text>
    </svg>}
    <div className="spark-neutral-equation">{data[0]}</div>
    <p>{data[1]}</p>
  </div>;
}

function CarbonateView(){
  return <div className="spark-carbonate-view">
    <svg className="spark-carbonate-reaction-svg" viewBox="0 0 940 500" role="img" aria-label="Acid reacting with calcium carbonate in a flask to produce carbon dioxide gas collected and tested with limewater">
      <defs>
        <marker id="ab-gas-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path className="ab-arrow-head" d="M0 0L10 5L0 10Z"/>
        </marker>
      </defs>

      <g transform="translate(70 85)">
        <path className="ab-reaction-flask" d="M100 0V75L35 250Q22 285 55 300H245Q278 285 265 250L200 75V0Z"/>
        <path className="ab-reaction-liquid" d="M72 205Q150 188 228 205L260 275Q263 286 247 290H53Q37 286 40 275Z"/>
        <g className="ab-carbonate-chips">
          <path d="M95 250l28-18 20 24-30 18Z"/><path d="M150 260l24-20 25 18-19 27Z"/><path d="M205 248l20-17 18 22-22 22Z"/>
        </g>
        {[115,145,175,205].map((x,i)=><circle key={x} className="ab-gas-bubble" cx={x} cy={185-i*25} r={8+i%2*2}/>)}
        <text className="ab-label" x="150" y="335" textAnchor="middle">acid + calcium carbonate</text>
      </g>

      <path className="ab-delivery-tube" d="M270 90V55Q270 30 300 30H590Q620 30 620 65V205"/>
      <path className="ab-gas-flow" d="M330 30H565" markerEnd="url(#ab-gas-arrow)"/>
      <text className="ab-label" x="445" y="18" textAnchor="middle">carbon dioxide travels through delivery tube</text>

      <g transform="translate(600 195)">
        <rect className="ab-limewater-beaker" x="0" y="0" width="230" height="205" rx="16"/>
        <path className="ab-limewater" d="M12 80H218V185Q218 193 210 193H20Q12 193 12 185Z"/>
        <path className="ab-dip-tube" d="M20 10H65V155"/>
        {[72,90,108,126].map((y,i)=><circle key={y} className="ab-gas-bubble" cx={65+(i%2)*12} cy={y} r="7"/>)}
        <path className="ab-milky-cloud" d="M85 120Q115 95 145 120Q175 102 195 132Q170 155 140 150Q110 160 85 140Z"/>
        <text className="ab-label" x="115" y="230" textAnchor="middle">limewater turns milky</text>
      </g>

      <text className="ab-caption" x="470" y="468" textAnchor="middle">acid + carbonate → salt + water + carbon dioxide</text>
    </svg>
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
