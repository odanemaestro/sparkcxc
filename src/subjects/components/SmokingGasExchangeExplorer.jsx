import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./smokingGasExchangeExplorer.css";

const SMOKE_EFFECTS=[
  {name:"Nicotine",system:"Dependence",effect:"Nicotine is highly addictive and helps sustain repeated tobacco use."},
  {name:"Carbon monoxide",system:"Oxygen transport",effect:"Carbon monoxide binds strongly to haemoglobin and reduces the amount of oxygen the blood can carry."},
  {name:"Tobacco smoke particles and chemicals",system:"Airways and cancer risk",effect:"Smoke contains thousands of chemicals, including many carcinogens and substances that injure respiratory tissues."},
];

function ComponentsView(){
  return <div className="spark-smoking-components">{SMOKE_EFFECTS.map((item,i)=><article key={item.name}><span>{i+1}</span><div><b>{item.name}</b><strong>{item.system}</strong><p>{item.effect}</p></div></article>)}</div>;
}

function CiliaView(){
  return <div className="spark-smoking-cilia">
    <div className="spark-airway-panel healthy">
      <span>HEALTHY AIRWAY</span>
      <h4>Working cilia move mucus</h4>
      <ReviewedScienceDiagram site="SmokingGasExchangeExplorer.jsx:19"><svg viewBox="0 0 620 250" role="img" aria-label="Healthy airway with cilia moving mucus toward the throat">
        <rect className="sc-airway" x="50" y="70" width="520" height="110" rx="45"/>
        <path className="sc-mucus" d="M75 100Q150 80 225 100T375 100T545 100"/>
        {[95,130,165,200,235,270,305,340,375,410,445,480,515].map(x=><path key={x} className="sc-cilium" d={"M"+x+" 145Q"+(x-8)+" 125 "+(x-2)+" 108"}/>)}
        <path className="sc-clear-arrow" d="M500 45H155"/>
        <text className="sc-arrow-text" x="325" y="35" textAnchor="middle">mucus moved towards throat</text>
      </svg></ReviewedScienceDiagram>
      <p>Mucus traps particles and microorganisms. Coordinated cilia help move the mucus out of the lower airways.</p>
    </div>
    <div className="spark-airway-panel damaged">
      <span>SMOKE-DAMAGED AIRWAY</span>
      <h4>Impaired clearance allows mucus to build up</h4>
      <ReviewedScienceDiagram site="SmokingGasExchangeExplorer.jsx:31"><svg viewBox="0 0 620 250" role="img" aria-label="Smoke-damaged airway with impaired cilia and accumulated mucus">
        <rect className="sc-airway" x="50" y="70" width="520" height="110" rx="45"/>
        <path className="sc-mucus thick" d="M75 105Q150 65 225 105T375 105T545 105"/>
        {[95,150,220,310,400,485].map((x,i)=><path key={x} className="sc-cilium damaged-cilium" d={"M"+x+" 145Q"+(x+(i%2?10:-12))+" 135 "+(x+(i%2?14:-8))+" 122"}/>)}
        <circle className="sc-particle" cx="170" cy="92" r="9"/><circle className="sc-particle" cx="320" cy="105" r="8"/><circle className="sc-particle" cx="455" cy="88" r="10"/>
      </svg></ReviewedScienceDiagram>
      <p>Smoke exposure damages airway defences and increases mucus and inflammation. Poor mucus clearance contributes to persistent cough and respiratory infections.</p>
    </div>
  </div>;
}

function EmphysemaView(){
  return <div className="spark-emphysema-view">
    <ReviewedScienceDiagram site="SmokingGasExchangeExplorer.jsx:44"><svg viewBox="0 0 900 430" role="img" aria-label="Normal small alveoli compared with emphysema where alveolar walls are destroyed and surface area is reduced">
      <g transform="translate(70 70)">
        {[0,1,2,3,4,5,6].map(i=>{
          const xy=[[120,95],[190,75],[255,110],[140,160],[215,155],[275,175],[185,220]][i];
          return <circle key={i} className="em-alveolus normal" cx={xy[0]} cy={xy[1]} r="48"/>;
        })}
        <text className="em-title" x="195" y="310" textAnchor="middle">many small alveoli</text>
        <text className="em-note" x="195" y="338" textAnchor="middle">large total surface area</text>
      </g>
      <g transform="translate(500 70)">
        <path className="em-alveolus damaged" d="M70 90Q105 35 165 70Q225 35 270 90Q315 145 275 210Q245 270 175 240Q110 280 70 220Q25 155 70 90Z"/>
        <path className="em-broken-wall" d="M145 90L180 120M220 155L255 175M120 190L160 170"/>
        <text className="em-title" x="175" y="310" textAnchor="middle">alveolar walls destroyed</text>
        <text className="em-note" x="175" y="338" textAnchor="middle">fewer larger air spaces, less surface area</text>
      </g>
    </svg></ReviewedScienceDiagram>
    <div className="spark-emphysema-notes">
      <p>Emphysema is part of COPD. Destruction of walls between alveoli reduces the surface area available for gaseous exchange and also reduces elastic recoil.</p>
      <p>Less effective exchange makes it harder to obtain enough oxygen, especially during activity.</p>
    </div>
  </div>;
}

function ExposureView(){
  return <div className="spark-smoke-exposure">
    <article><span>SECOND-HAND TOBACCO SMOKE</span><h4>Exposure harms people who do not smoke</h4><p>There is no safe level of second-hand tobacco smoke exposure. It raises the risk of lung cancer and cardiovascular disease and causes respiratory harm in children.</p></article>
    <article><span>VAPE AEROSOL</span><h4>Not harmless water vapour</h4><p>E-cigarettes create an aerosol. It often contains nicotine and can contain cancer-causing chemicals, metals, volatile compounds and fine particles inhaled deep into the lungs.</p></article>
    <article><span>SMOKED CANNABIS</span><h4>Smoke can injure respiratory tissue</h4><p>Cannabis smoke contains many of the same toxins, irritants and carcinogens as tobacco smoke. Smoking cannabis is associated with cough, mucus production and bronchitis symptoms. Some longer-term disease relationships need more research.</p></article>
    <article><span>SMOKE-FREE AND AEROSOL-FREE SPACES</span><h4>Protect other people from involuntary exposure</h4><p>Restrictions on smoking and vaping in shared indoor spaces reduce exposure of other people to tobacco smoke and e-cigarette aerosol.</p></article>
  </div>;
}

function OxygenView(){
  const [co,setCo]=useState(false);
  return <div className="spark-co-haemoglobin">
    <div className="spark-co-controls"><button type="button" className={!co?"active":""} onClick={()=>setCo(false)}>Without carbon monoxide</button><button type="button" className={co?"active":""} onClick={()=>setCo(true)}>With carbon monoxide</button></div>
    <div className="spark-co-blood">
      {[0,1,2,3,4,5].map(i=><div key={i} className="spark-rbc-card"><span>Hb</span>{co&&i<3?<b className="co-bound">CO</b>:<b className="o2-bound">O₂</b>}</div>)}
    </div>
    <p>{co?"Carbon monoxide occupies haemoglobin binding sites and reduces oxygen-carrying capacity. Tissues then receive less oxygen for aerobic respiration.":"With no carbon monoxide occupying these sites, haemoglobin is more available to bind and transport oxygen."}</p>
  </div>;
}

export default function SmokingGasExchangeExplorer(){
  const [view,setView]=useState("components");
  const summary=useMemo(()=>({
    components:"Different smoke components harm gaseous exchange through different mechanisms.",
    cilia:"Damage to airway clearance allows mucus and trapped material to accumulate.",
    emphysema:"Loss of alveolar walls reduces exchange surface area and elastic recoil.",
    oxygen:"Carbon monoxide interferes with oxygen transport even though the lungs still contain oxygen.",
    exposure:"Second-hand smoke, vape aerosol and other inhaled smoke exposures matter because respiratory harm is not limited to cigarette users.",
  })[view],[view]);

  return <section className="spark-smoking-gas-exchange">
    <header><span>SMOKING AND GASEOUS EXCHANGE</span><h3>Trace how inhaled smoke affects airways, alveoli and oxygen transport</h3><p>Cigarette smoking damages the respiratory system through several pathways. The effects include addiction, impaired airway clearance, reduced oxygen transport, COPD and increased cancer risk.</p></header>
    <div className="spark-smoking-tabs">{[["components","Smoke components"],["cilia","Cilia and mucus"],["emphysema","Emphysema"],["oxygen","Carbon monoxide"],["exposure","Other exposure"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-smoking-stage">
      {view==="components"&&<ComponentsView/>}
      {view==="cilia"&&<CiliaView/>}
      {view==="emphysema"&&<EmphysemaView/>}
      {view==="oxygen"&&<OxygenView/>}
      {view==="exposure"&&<ExposureView/>}
    </div>
    <div className="spark-smoking-summary"><strong>{summary}</strong><span>Cigarette smoking is a major cause of lung cancer and COPD. Avoiding tobacco smoke and second-hand smoke protects lung health.</span></div>
  </section>;
}

export { SMOKE_EFFECTS };
