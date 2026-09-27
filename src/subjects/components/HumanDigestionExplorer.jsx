import React,{useMemo,useState} from "react";
import "./humanDigestionExplorer.css";

const ENZYMES=[
  {name:"Salivary amylase",where:"Mouth",substrate:"Starch",product:"Maltose",condition:"Near-neutral pH"},
  {name:"Pepsin",where:"Stomach",substrate:"Protein",product:"Shorter polypeptides",condition:"Acidic pH, about pH 2"},
  {name:"Rennin (chymosin)",where:"Stomach of young mammals",substrate:"Milk protein",product:"Clotted milk protein",condition:"Acidic stomach conditions"},
  {name:"Trypsin",where:"Small intestine",substrate:"Protein / polypeptides",product:"Smaller peptides",condition:"Alkaline conditions"},
  {name:"Pancreatic amylase",where:"Small intestine",substrate:"Starch",product:"Maltose",condition:"Alkaline conditions"},
  {name:"Maltase",where:"Small intestine",substrate:"Maltose",product:"Glucose",condition:"Small-intestine conditions"},
  {name:"Lactase",where:"Small intestine",substrate:"Lactose",product:"Glucose + galactose",condition:"Small-intestine conditions"},
  {name:"Lipase",where:"Small intestine",substrate:"Fat",product:"Fatty acids + glycerol",condition:"Works efficiently after fat is emulsified"},
];

function DigestiveSystemScene({selected,onSelect}){
  const hotspots={
    mouth:[50,8],oesophagus:[51,22],liver:[39,36],stomach:[60,39],gall:[44,43],
    pancreas:[56,46],duodenum:[60,50],small:[52,61],large:[52,57],rectum:[50,83]
  };
  const labels={
    mouth:"Mouth",oesophagus:"Oesophagus",liver:"Liver",stomach:"Stomach",gall:"Gall bladder",
    pancreas:"Pancreas",duodenum:"Duodenum",small:"Small intestine",large:"Large intestine",rectum:"Rectum"
  };
  return (
    <figure className="spark-digestion-reference-figure">
      <div className="spark-digestion-reference-stage">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Digestive_system_without_labels.svg"
          alt="Public-domain unlabeled human digestive system"
          loading="lazy"
        />
        {Object.entries(hotspots).map(([key,[left,top]])=>(
          <button
            type="button"
            key={key}
            className={"spark-digestion-hotspot "+(selected===key?"active":"")}
            style={{left:left+"%",top:top+"%"}}
            onClick={()=>onSelect(key)}
            aria-pressed={selected===key}
            aria-label={labels[key]}
            title={labels[key]}
          >
            <span aria-hidden="true"></span>
          </button>
        ))}
      </div>
      <figcaption>
        <span>Human digestive system</span>
        <small>
          Reference: <a href="https://commons.wikimedia.org/wiki/File:Digestive_system_without_labels.svg" target="_blank" rel="noreferrer">LadyofHats / Mariana Ruiz</a>
          {" · "}Public domain
        </small>
      </figcaption>
    </figure>
  );
}

function PathwayView(){
  const steps=[
    ["mouth","Mouth","Chewing gives mechanical digestion. Salivary amylase begins starch digestion."],
    ["oesophagus","Oesophagus","Peristalsis moves the bolus towards the stomach."],
    ["stomach","Stomach","Muscular churning mixes food. Hydrochloric acid kills many microbes and provides the low pH needed by pepsin."],
    ["duodenum","Duodenum","Bile enters from the liver and gall bladder. Pancreatic enzymes enter from the pancreas."],
    ["small","Small intestine","Digestion is completed and most digested nutrients are absorbed through villi."],
    ["large","Large intestine","Much of the remaining water is absorbed."],
    ["rectum","Rectum and anus","Undigested material is stored briefly and then egested."]
  ];
  const [selected,setSelected]=useState("mouth");
  return <div className="spark-digestion-pathway-layout">
    <div className="spark-digestion-system"><DigestiveSystemScene selected={selected} onSelect={setSelected}/></div>
    <div className="spark-digestion-pathway">{steps.map((row,i)=><article key={row[0]} className={selected===row[0]?"active":""} onClick={()=>setSelected(row[0])}><span>{i+1}</span><div><b>{row[1]}</b><p>{row[2]}</p></div></article>)}</div>
  </div>;
}

function EnzymeView(){
  const [selected,setSelected]=useState("Salivary amylase");
  const item=ENZYMES.find(row=>row.name===selected);
  return <div className="spark-digestion-enzymes">
    <div className="spark-digestion-enzyme-buttons">{ENZYMES.map(row=><button type="button" key={row.name} className={selected===row.name?"active":""} onClick={()=>setSelected(row.name)}>{row.name}</button>)}</div>
    <article>
      <span>{item.where.toUpperCase()}</span>
      <h4>{item.name}</h4>
      <div><b>Substrate</b><strong>{item.substrate}</strong></div>
      <div><b>Product</b><strong>{item.product}</strong></div>
      <div><b>Best conditions</b><strong>{item.condition}</strong></div>
      <p>Enzymes are biological catalysts. Their active sites work best over a limited range of temperature and pH.</p>
    </article>
  </div>;
}

function BileView(){
  return <div className="spark-digestion-bile">
    <article><span>1</span><div><b>Liver</b><p>Produces bile.</p></div></article>
    <div className="spark-digestion-bile-arrow" aria-hidden="true">→</div>
    <article><span>2</span><div><b>Gall bladder</b><p>Stores and concentrates bile before release.</p></div></article>
    <div className="spark-digestion-bile-arrow" aria-hidden="true">→</div>
    <article><span>3</span><div><b>Duodenum</b><p>Bile emulsifies fat into smaller droplets, increasing surface area for lipase. It also helps neutralise acidic chyme entering from the stomach.</p></div></article>
  </div>;
}

function VillusView(){
  return <div className="spark-villus-view">
    <svg viewBox="0 0 760 420" role="img" aria-label="Simplified intestinal villus showing thin epithelium, blood capillaries and a central lacteal">
      <path className="villus-outline" d="M260 370Q270 230 300 100Q330 40 380 40Q430 40 460 100Q490 230 500 370Z"/>
      <path className="villus-lacteal" d="M380 315V100"/>
      <path className="villus-capillary" d="M320 330Q300 220 335 130Q355 95 380 125Q405 95 425 130Q460 220 440 330"/>
      <line className="villus-label-line" x1="300" y1="110" x2="140" y2="75"/>
      <text className="villus-label" x="130" y="70" textAnchor="end">one-cell-thick epithelium</text>
      <line className="villus-label-line" x1="350" y1="175" x2="135" y2="180"/>
      <text className="villus-label" x="125" y="185" textAnchor="end">blood capillaries</text>
      <line className="villus-label-line" x1="380" y1="235" x2="615" y2="215"/>
      <text className="villus-label" x="625" y="220">lacteal</text>
      <text className="villus-small" x="380" y="400" textAnchor="middle">large surface area + short diffusion distance + good transport away</text>
    </svg>
    <div className="spark-villus-cards">
      <article><b>Glucose and amino acids</b><p>Enter blood capillaries and are carried away in the blood.</p></article>
      <article><b>Products of fat digestion</b><p>Enter the lacteal and move through the lymphatic system.</p></article>
      <article><b>Assimilation</b><p>Body cells use absorbed nutrients for energy, growth, repair and storage.</p></article>
    </div>
  </div>;
}

function ConditionsView(){
  return <div className="spark-enzyme-conditions">
    <svg viewBox="0 0 760 370" role="img" aria-label="Enzyme activity rises to an optimum near 37 degrees Celsius and then falls sharply at high temperature">
      <line className="enzyme-axis" x1="85" y1="300" x2="690" y2="300"/>
      <line className="enzyme-axis" x1="85" y1="300" x2="85" y2="55"/>
      <path className="enzyme-curve" d="M95 280C180 270 250 220 330 120C365 78 405 72 440 110C475 150 490 245 505 292L680 298"/>
      <line className="enzyme-optimum" x1="390" y1="75" x2="390" y2="300"/>
      <text className="enzyme-label" x="390" y="330" textAnchor="middle">37 °C approximately</text>
      <text className="enzyme-label" x="390" y="355" textAnchor="middle">Temperature</text>
      <text className="enzyme-label" x="28" y="190" transform="rotate(-90 28 190)">Enzyme activity</text>
      <text className="enzyme-note" x="520" y="130">high temperature can denature enzyme</text>
    </svg>
    <div className="spark-enzyme-condition-notes">
      <p>At low temperature, enzyme-controlled reactions are slow because particles have less kinetic energy.</p>
      <p>Activity rises towards an optimum. For many human digestive enzymes this is close to body temperature, about 37 °C.</p>
      <p>High temperature can denature an enzyme by changing the shape of its active site. Extreme pH can also disrupt enzyme shape and activity.</p>
    </div>
  </div>;
}

export default function HumanDigestionExplorer(){
  const [view,setView]=useState("pathway");
  const summary=useMemo(()=>({
    pathway:"Digestion combines mechanical breakdown, chemical digestion, absorption, assimilation and egestion.",
    enzymes:"Each digestive enzyme acts on a particular substrate and works best under suitable conditions.",
    bile:"Bile is not an enzyme. It emulsifies fat and supports lipase action.",
    villus:"Villi are specialised for rapid absorption through a large, thin surface with good transport.",
    conditions:"Temperature and pH affect enzyme activity because enzyme shape and molecular collisions matter.",
  })[view],[view]);

  return <section className="spark-human-digestion">
    <header><span>HUMAN DIGESTION</span><h3>Follow food from mechanical breakdown to absorption and assimilation</h3><p>Digestion converts large, often insoluble food molecules into smaller soluble molecules that can be absorbed and used by cells.</p></header>
    <div className="spark-digestion-tabs">{[["pathway","Digestive pathway"],["enzymes","Enzymes"],["bile","Bile"],["villus","Villus absorption"],["conditions","Enzyme conditions"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-digestion-stage">
      {view==="pathway"&&<PathwayView/>}
      {view==="enzymes"&&<EnzymeView/>}
      {view==="bile"&&<BileView/>}
      {view==="villus"&&<VillusView/>}
      {view==="conditions"&&<ConditionsView/>}
    </div>
    <div className="spark-digestion-summary"><strong>{summary}</strong><span>Absorption moves digested nutrients into blood or lymph. Assimilation is the use of absorbed nutrients by body cells. Egestion removes undigested food through the anus.</span></div>
  </section>;
}

export { ENZYMES };
