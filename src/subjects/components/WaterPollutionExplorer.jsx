import React,{useMemo,useState} from "react";
import "./waterPollutionExplorer.css";

function EutrophicationView(){
  const steps=[
    ["1","Nutrient input","Fertiliser runoff or sewage adds nitrates and phosphates."],
    ["2","Algal bloom","Algae multiply rapidly near the water surface."],
    ["3","Algae die","Dead algae and organic matter sink."],
    ["4","Decomposition","Bacteria and other decomposers respire while breaking down the material."],
    ["5","Oxygen falls","Dissolved oxygen is used faster than it is replaced."],
    ["6","Aquatic life stressed","Fish and other animals may suffocate and die."]
  ];
  return <div className="spark-eutrophication-model">
    <svg viewBox="0 0 1040 560" role="img" aria-label="Eutrophication in a water body showing nutrient runoff, algal bloom, sinking dead algae, decomposition, oxygen loss and fish death">
      <defs>
        <linearGradient id="wp-lake-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9fd2df" />
          <stop offset="100%" stopColor="#4f899c" />
        </linearGradient>
      </defs>

      <rect className="eu-sky" x="20" y="20" width="1000" height="500" rx="20" />
      <path className="eu-bank" d="M20 160Q165 105 305 150L345 225H20Z" />
      <path className="eu-lake" d="M20 225H1020V520H20Z" />

      <g className="eu-farm" transform="translate(45 68)">
        <path className="eu-field" d="M0 85Q100 35 230 78L260 135H0Z" />
        {[35,75,115,155,195].map((x,i)=><path key={x} className="eu-crop" d={`M${x} 85V${55-(i%2)*8}M${x} 68L${x-12} 55M${x} 68L${x+12} 55`} />)}
        <text className="eu-label" x="125" y="22" textAnchor="middle">fertiliser / sewage nutrients</text>
      </g>

      <path className="eu-runoff" d="M245 150Q320 175 390 235" />
      <g className="eu-nutrient-dots">
        {[285,315,345,375].map((x,i)=><circle key={x} cx={x} cy={180+i*14} r="7" />)}
      </g>
      <text className="eu-small" x="330" y="150" textAnchor="middle">nitrates + phosphates enter water</text>

      <g className="eu-algal-bloom">
        <path d="M390 230Q520 200 650 225T910 225V265Q775 250 650 267T390 260Z" />
        {[420,455,495,535,575,615,655,695,735,775,815,855,895].map((x,i)=><circle key={x} cx={x} cy={235+(i%3)*8} r={5+(i%2)*2} />)}
      </g>
      <text className="eu-stage-label bloom" x="650" y="195" textAnchor="middle">rapid algal bloom near surface</text>

      <g className="eu-dead-algae">
        {[470,520,570,620,670,720].map((x,i)=><path key={x} d={`M${x} 285Q${x+10} ${310+i*4} ${x-5} ${335+i*7}`} />)}
      </g>
      <text className="eu-small" x="555" y="340" textAnchor="middle">dead algae sink</text>

      <g className="eu-decomposers">
        {[455,500,548,595,645,690].map((x,i)=><g key={x} transform={`translate(${x} ${410+(i%2)*24})`}><circle r="10"/><path d="M-15 0H15M0-15V15M-11-11L11 11M11-11L-11 11"/></g>)}
      </g>
      <text className="eu-small" x="570" y="470" textAnchor="middle">decomposers respire and use dissolved oxygen</text>

      <g className="eu-oxygen high">
        {[405,440,775,820].map((x,i)=><circle key={x} cx={x} cy={310+(i%2)*40} r="9" />)}
      </g>
      <g className="eu-oxygen low">
        {[735,865].map((x,i)=><circle key={x} cx={x} cy={390+i*36} r="6" />)}
      </g>
      <text className="eu-oxygen-label" x="832" y="360">dissolved O₂ falls</text>

      <g className="eu-fish alive" transform="translate(290 345)">
        <path d="M0 0Q35-25 75 0Q35 25 0 0Z" /><path d="M0 0L-28-22V22Z" /><circle cx="55" cy="-5" r="3" />
      </g>
      <g className="eu-fish stressed" transform="translate(835 455) rotate(18)">
        <path d="M0 0Q35-25 75 0Q35 25 0 0Z" /><path d="M0 0L-28-22V22Z" /><path className="eu-fish-x" d="M48-11L62 3M62-11L48 3" />
      </g>
      <text className="eu-stage-label fish" x="870" y="505">fish may die</text>

      <g className="eu-step-key" transform="translate(35 535)">
        <text x="0" y="0">nutrients → bloom → death/sinking → decomposition → oxygen depletion → animal stress</text>
      </g>
    </svg>

    <div className="spark-eutrophication-steps">
      {steps.map(([n,title,text])=><article key={n}><span>{n}</span><div><b>{title}</b><p>{text}</p></div></article>)}
    </div>
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
