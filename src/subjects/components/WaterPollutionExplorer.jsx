import React,{useMemo,useState} from "react";
import "./waterPollutionExplorer.css";

function EutrophicationView(){
  return <div className="spark-waterpollution-flow">
    {["fertiliser / sewage nutrients","rapid algal growth","algae die","bacteria decompose","dissolved oxygen falls","fish may die"].map((x,i)=><React.Fragment key={x}><article>{x}</article>{i<5&&<span>→</span>}</React.Fragment>)}
  </div>;
}

function PollutantsView(){
  const [type,setType]=useState("oil");
  const data={
    oil:{title:"Oil spills",effect:"Oil coats seabird feathers, reducing waterproofing and insulation. Birds may also ingest oil while preening."},
    sewage:{title:"Raw sewage",effect:"Sewage adds nutrients and pathogens. Decomposition can lower dissolved oxygen and disease risk increases."},
    pesticide:{title:"Pesticides",effect:"Some pesticides persist and can accumulate in organisms and food chains, harming higher trophic levels."},
    heat:{title:"Thermal pollution",effect:"Warm water holds less dissolved oxygen. Heated discharge can therefore stress or kill aquatic organisms."},
    silt:{title:"Sediment / silt",effect:"Suspended sediment reduces light and can settle on coral, smothering tissues and photosynthetic algae."}
  }[type];
  return <div className="spark-waterpollution-pollutants">
    <div className="spark-waterpollution-buttons">{Object.keys(data).map(k=><button key={k} type="button" className={type===k?"active":""} onClick={()=>setType(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.title}</h4><p>{data.effect}</p></article>
  </div>;
}

function HabitatsView(){
  return <div className="spark-waterpollution-habitats">
    <article><span>MANGROVES</span><h4>Nursery habitat</h4><p>Mangrove roots shelter juvenile fish and other organisms, trap sediment and help protect coastlines from erosion and wave energy.</p></article>
    <article><span>CORAL REEFS</span><h4>Need clear, suitable water</h4><p>Sewage, sediment and unusually high temperature can stress coral reefs. Parrotfish, by contrast, are natural reef grazers that help control algae.</p></article>
    <article><span>FISHERIES</span><h4>Habitat loss reduces recruitment</h4><p>Destroying mangrove nursery areas can reduce survival of young fish and weaken future fish stocks.</p></article>
  </div>;
}

function OxygenView(){
  const [distance,setDistance]=useState(0);
  const d=Number(distance)||0;
  const oxygen=d<1?7:d<4?2:d<8?4:7;
  return <div className="spark-waterpollution-oxygen">
    <label>Distance downstream from sewage input, km<input type="range" min="0" max="10" step="1" value={distance} onChange={e=>setDistance(e.target.value)}/></label>
    <strong>{d} km → illustrative dissolved oxygen: {oxygen} mg/L</strong>
    <div className="spark-oxygen-bar"><div style={{width:Math.min(100,oxygen*12)+"%"}}></div></div>
    <p>Immediately downstream, bacteria may use large amounts of oxygen while decomposing sewage. Farther downstream, as organic waste is broken down and the river mixes with air, oxygen can recover.</p>
  </div>;
}

export default function WaterPollutionExplorer(){
  const [view,setView]=useState("eutrophication");
  const summary=useMemo(()=>({
    eutrophication:"Excess nutrients can trigger algal blooms followed by oxygen depletion during decomposition.",
    pollutants:"Different pollutants harm aquatic life by different mechanisms.",
    habitats:"Mangroves and coral reefs support fisheries and coastal ecosystems.",
    oxygen:"Dissolved oxygen often falls where decomposition demand is greatest and can recover farther downstream."
  })[view],[view]);
  return <section className="spark-water-pollution">
    <header><span>WATER POLLUTION</span><h3>Connect pollutants to oxygen loss, habitat damage and aquatic life</h3><p>Water pollution affects organisms through nutrient enrichment, toxic chemicals, pathogens, heat, oil and sediment.</p></header>
    <div className="spark-waterpollution-tabs">{[["eutrophication","Eutrophication"],["pollutants","Pollutants"],["habitats","Habitats"],["oxygen","Dissolved oxygen"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-waterpollution-stage">{view==="eutrophication"&&<EutrophicationView/>}{view==="pollutants"&&<PollutantsView/>}{view==="habitats"&&<HabitatsView/>}{view==="oxygen"&&<OxygenView/>}</div>
    <div className="spark-waterpollution-summary"><strong>{summary}</strong><span>Protecting mangroves, controlling sewage and reducing nutrient, pesticide and sediment runoff all support aquatic life.</span></div>
  </section>;
}
