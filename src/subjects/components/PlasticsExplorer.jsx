import React,{useMemo,useState} from "react";
import "./plasticsExplorer.css";

function BenefitsView(){
  return <div className="spark-plastics-benefits">
    <article><span>LIGHT</span><h4>Low mass for transport</h4><p>Many plastics are much lighter than glass or metal for the same job.</p></article>
    <article><span>DURABLE</span><h4>Resist water and corrosion</h4><p>Plastics are useful for pipes, containers, construction materials and protective coatings.</p></article>
    <article><span>EASILY MOULDED</span><h4>Many useful shapes</h4><p>Manufacturers can form plastics into syringes, gloves, bottles, fittings and many other products.</p></article>
    <article><span>LOW COST</span><h4>Efficient mass production</h4><p>Many plastic products are inexpensive to make in large quantities.</p></article>
  </div>;
}

function UsesView(){
  const [use,setUse]=useState("medicine");
  const uses={
    medicine:{title:"Medicine",text:"Disposable syringes, tubing, gloves and sterile packaging use plastics because they are light, mouldable and can be manufactured hygienically."},
    construction:{title:"Construction",text:"PVC pipes, electrical insulation, roofing membranes and window frames use plastics because they are durable, light and resistant to corrosion."},
    packaging:{title:"Packaging",text:"Plastic containers protect products and reduce transport mass, but unnecessary single-use packaging creates persistent waste."}
  };
  const data=uses[use];
  return <div className="spark-plastics-uses">
    <div className="spark-plastics-toggle">{Object.entries(uses).map(([key,item])=><button type="button" key={key} className={use===key?"active":""} onClick={()=>setUse(key)}>{item.title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
  </div>;
}

function PersistenceView(){
  return <div className="spark-plastics-persistence">
    <article><span>NON-BIODEGRADABLE</span><h4>Most common plastics break down very slowly</h4><p>Microorganisms do not easily digest the long synthetic polymer chains in many conventional plastics.</p></article>
    <article><span>FRAGMENTATION</span><h4>Smaller does not mean gone</h4><p>Sunlight, heat and abrasion can fragment plastic into smaller pieces without fully mineralising it.</p></article>
    <article><span>LANDFILL AND LITTER</span><h4>Waste can persist for decades or longer</h4><p>Durability is useful during a product's life but becomes a problem when discarded material is poorly managed.</p></article>
  </div>;
}

function MarineView(){
  const [mode,setMode]=useState("turtle");
  return <div className="spark-plastics-marine">
    <div className="spark-plastics-toggle"><button type="button" className={mode==="turtle"?"active":""} onClick={()=>setMode("turtle")}>Sea turtles</button><button type="button" className={mode==="micro"?"active":""} onClick={()=>setMode("micro")}>Microplastics</button></div>
    {mode==="turtle"?<div className="spark-turtle-model">
      <svg viewBox="0 0 820 390" role="img" aria-label="Sea turtle approaching a floating plastic bag that resembles jellyfish prey">
        <defs><marker id="plastic-risk-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="pl-arrow-head"/></marker></defs>
        <rect className="pl-sea" x="0" y="0" width="820" height="390"/>
        <path className="pl-surface" d="M0 68Q75 48 150 68T300 68T450 68T600 68T820 68"/>
        <ellipse className="pl-turtle-shell" cx="282" cy="216" rx="112" ry="66"/>
        <path className="pl-turtle-head" d="M383 194Q430 180 455 210Q431 244 383 232Z"/>
        <circle className="pl-turtle-eye" cx="432" cy="207" r="5"/>
        <path className="pl-flipper" d="M241 160Q199 105 159 136Q187 184 231 197Z"/>
        <path className="pl-flipper" d="M242 267Q194 314 159 280Q192 239 235 231Z"/>
        <path className="pl-flipper rear" d="M342 169Q379 124 411 144Q393 183 356 202Z"/>
        <path className="pl-flipper rear" d="M340 260Q383 294 405 268Q385 236 354 228Z"/>
        <path className="pl-bag" d="M586 116H675L663 230Q632 251 598 230Z"/>
        <path className="pl-bag-handle" d="M597 116Q606 75 625 75Q644 75 654 116"/>
        <path className="pl-jelly" d="M574 274Q620 236 667 274Q670 306 621 311Q575 307 574 274Z"/>
        <path className="pl-jelly-tentacle" d="M592 303Q581 339 601 350M620 309Q612 343 629 357M648 304Q662 337 647 354"/>
        <line className="pl-risk-arrow" x1="476" y1="207" x2="566" y2="173" markerEnd="url(#plastic-risk-arrow)"/>
        <text className="pl-label" x="630" y="103" textAnchor="middle">floating plastic bag</text>
        <text className="pl-label" x="621" y="371" textAnchor="middle">jellyfish prey</text>
        <text className="pl-small" x="500" y="195" textAnchor="middle">mistaken for food</text>
      </svg>
      <p>Floating plastic bags can resemble jellyfish. Turtles may ingest them, which can block or injure the digestive system and reduce feeding.</p>
    </div>:<div className="spark-microplastic-chain">
      <svg viewBox="0 0 900 330" role="img" aria-label="Microplastics entering a marine food web from particles to plankton, small fish and larger predators">
        <defs><marker id="plastic-food-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" className="pl-arrow-head"/></marker></defs>
        <rect className="pl-sea" x="0" y="0" width="900" height="330"/>
        {Array.from({length:16},(_,i)=><circle key={i} className="pl-micro" cx={65+(i%4)*25} cy={100+Math.floor(i/4)*25} r={4+(i%3)}/>)}
        <text className="pl-label" x="110" y="65" textAnchor="middle">microplastic particles</text>
        <g className="pl-plankton" transform="translate(275 165)">
          <circle cx="0" cy="0" r="24"/><path d="M-18 -18L-39 -36M18 -18L39 -36M-21 15L-43 29M21 15L43 29"/>
        </g>
        <text className="pl-label" x="275" y="230" textAnchor="middle">plankton / small organisms</text>
        <g className="pl-fish small" transform="translate(500 158)">
          <ellipse cx="0" cy="0" rx="66" ry="34"/><path d="M-62 0L-112 -38V38Z"/><circle cx="42" cy="-8" r="5"/>
        </g>
        <text className="pl-label" x="500" y="230" textAnchor="middle">small fish</text>
        <g className="pl-fish large" transform="translate(750 150)">
          <ellipse cx="0" cy="0" rx="92" ry="47"/><path d="M-85 0L-151 -50V50Z"/><circle cx="59" cy="-12" r="7"/>
        </g>
        <text className="pl-label" x="750" y="230" textAnchor="middle">larger predator</text>
        <line className="pl-food-arrow" x1="170" y1="160" x2="228" y2="160" markerEnd="url(#plastic-food-arrow)"/>
        <line className="pl-food-arrow" x1="327" y1="160" x2="411" y2="160" markerEnd="url(#plastic-food-arrow)"/>
        <line className="pl-food-arrow" x1="568" y1="160" x2="645" y2="160" markerEnd="url(#plastic-food-arrow)"/>
      </svg>
      <p>Microplastics can be ingested by marine organisms and move through food webs. Their biological effects depend on particle size, chemistry, exposure and species.</p>
    </div>}
  </div>;
}

function BurningView(){
  return <div className="spark-plastics-burning">
    <article><span>OPEN BURNING</span><h4>Uncontrolled combustion creates harmful pollution</h4><p>Burning mixed plastic waste can release smoke, fine particles, carbon monoxide and irritating or toxic organic compounds.</p></article>
    <article><span>DIOXINS AND FURANS</span><h4>Risk depends on material and burning conditions</h4><p>Chlorine-containing materials and poorly controlled combustion can contribute to formation of dioxins and furans. It is inaccurate to say every plastic always produces the same toxic gases.</p></article>
    <article><span>BETTER APPROACH</span><h4>Do not burn plastic waste in yards or open dumps</h4><p>Use approved collection, reuse, recycling or regulated waste-management systems instead.</p></article>
  </div>;
}

function RsView(){
  const [mode,setMode]=useState("refuse");
  const data={
    refuse:{title:"Refuse",text:"Avoid unnecessary single-use items, for example carry a reusable shopping bag instead of accepting a new plastic bag."},
    reduce:{title:"Reduce",text:"Use fewer disposable plastic products and choose refillable or longer-lasting alternatives."},
    reuse:{title:"Reuse",text:"Use suitable durable containers and bags repeatedly before disposal."},
    recycle:{title:"Recycle",text:"Where collection and processing exist, recycling can reduce landfill waste and reduce demand for virgin raw material."}
  }[mode];
  return <div className="spark-plastics-rs">
    <div className="spark-plastics-toggle">{Object.keys(data).map(k=><button type="button" key={k} className={mode===k?"active":""} onClick={()=>setMode(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.text}</p></article>
  </div>;
}

function PolicyView(){
  return <div className="spark-plastics-policy">
    <article><span>SINGLE-USE REDUCTION</span><h4>Less litter reaches drains and the sea</h4><p>Reducing disposable bags and foam food containers can decrease visible litter and persistent marine debris.</p></article>
    <article><span>DRAINAGE</span><h4>Less plastic blockage</h4><p>Plastic litter can clog drains and gullies, increasing local flooding risk during heavy rain.</p></article>
    <article><span>BEHAVIOUR CHANGE</span><h4>Reusable alternatives matter</h4><p>Policies are most effective when paired with affordable alternatives, collection systems and public participation.</p></article>
  </div>;
}

export default function PlasticsExplorer(){
  const [view,setView]=useState("benefits");
  const summary=useMemo(()=>({
    benefits:"Plastics are widely used because they are light, durable, corrosion-resistant, mouldable and often inexpensive.",
    uses:"Useful plastic products include medical devices, construction materials and packaging.",
    persistence:"The same durability that makes plastics useful also makes poorly managed waste persist in the environment.",
    marine:"Plastic bags and microplastics can harm marine organisms through ingestion and food-web exposure.",
    burning:"Open burning of plastic waste is unsafe because it can create harmful smoke and toxic combustion products.",
    rs:"Refusing and reducing unnecessary plastic come before reuse and recycling in a waste-reduction strategy.",
    policy:"Reducing single-use plastic can lower litter, drainage blockage and marine pollution."
  })[view],[view]);
  return <section className="spark-plastics-explorer">
    <header><span>PLASTICS</span><h3>Balance useful properties of plastics against their environmental costs</h3><p>Plastics are valuable materials, but poor design, excessive single-use consumption and weak disposal systems can turn durability into a pollution problem.</p></header>
    <div className="spark-plastics-tabs">{[["benefits","Advantages"],["uses","Uses"],["persistence","Persistence"],["marine","Marine impacts"],["burning","Burning"],["rs","Waste reduction"],["policy","Single-use reduction"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-plastics-stage">{view==="benefits"&&<BenefitsView/>}{view==="uses"&&<UsesView/>}{view==="persistence"&&<PersistenceView/>}{view==="marine"&&<MarineView/>}{view==="burning"&&<BurningView/>}{view==="rs"&&<RsView/>}{view==="policy"&&<PolicyView/>}</div>
    <div className="spark-plastics-summary"><strong>{summary}</strong><span>The best waste choice is often to avoid unnecessary plastic before disposal becomes necessary.</span></div>
  </section>;
}
