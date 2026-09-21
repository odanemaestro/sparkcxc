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
  const data={
    medicine:{title:"Medicine",text:"Disposable syringes, tubing, gloves and sterile packaging use plastics because they are light, mouldable and can be manufactured hygienically."},
    construction:{title:"Construction",text:"PVC pipes, electrical insulation, roofing membranes and window frames use plastics because they are durable, light and resistant to corrosion."},
    packaging:{title:"Packaging",text:"Plastic containers protect products and reduce transport mass, but unnecessary single-use packaging creates persistent waste."}
  }[use];
  return <div className="spark-plastics-uses">
    <div className="spark-plastics-toggle">{Object.keys(data).map(k=><button type="button" key={k} className={use===k?"active":""} onClick={()=>setUse(k)}>{data[k].title}</button>)}</div>
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
      <div className="spark-turtle">turtle</div><div className="spark-bag">plastic bag</div><div className="spark-jelly">jellyfish shape</div>
      <p>Floating plastic bags can resemble jellyfish. Turtles may ingest them, which can block or injure the digestive system and reduce feeding.</p>
    </div>:<div className="spark-microplastic-chain">
      {["microplastic particle","plankton / small organisms","small fish","larger predators"].map((x,i)=><React.Fragment key={x}><article>{x}</article>{i<3&&<span>→</span>}</React.Fragment>)}
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
