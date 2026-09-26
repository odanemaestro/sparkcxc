import React, { useState } from "react";
import "./soilErosionExplorer.css";

const CONTROL_METHODS = {
  terracing:{
    title:"Terracing",
    note:"Flat steps are cut across a steep slope. Each step slows run-off and reduces the distance water travels downhill.",
  },
  contour:{
    title:"Contour farming",
    note:"Ploughing and planting follow the contour lines across the slope. Ridges interrupt run-off instead of directing water straight downhill.",
  },
  cover:{
    title:"Cover crops",
    note:"Leaves protect the soil from raindrop impact while roots hold soil particles together.",
  },
  windbreak:{
    title:"Windbreaks",
    note:"Rows of trees or shrubs reduce wind speed across exposed farmland and help prevent dry topsoil from being blown away.",
  },
  strips:{
    title:"Strip cropping",
    note:"Alternating strips of crops slow water movement, trap eroded soil and reduce the length of exposed ground.",
  },
};

function CausesScene() {
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="Comparison of erosion on bare and vegetated hillsides">
      <text className="se-title" x="240" y="40" textAnchor="middle">Bare hillside</text>
      <text className="se-title" x="720" y="40" textAnchor="middle">Vegetated hillside</text>
      <path className="se-hill bare" d="M35 425Q255 105 455 425Z" />
      <path className="se-hill covered" d="M505 425Q725 105 925 425Z" />
      {[
        [115,90,165,210],[205,80,245,190],[315,85,340,205],[600,90,650,205],[710,75,735,185],[820,90,845,205]
      ].map(([x1,y1,x2,y2],index)=><path key={index} className="se-rain" d={"M"+x1+" "+y1+"L"+x2+" "+y2} />)}
      <path className="se-runoff" d="M245 210Q280 300 390 400" />
      <path className="se-runoff" d="M180 260Q225 340 340 420" />
      <path className="se-soil-loss" d="M170 285Q270 330 390 405" />
      {[585,640,700,760,820,875].map((x,index)=>(
        <g key={x}>
          <path className="se-grass" d={"M"+x+" "+(350-index%2*18)+"q-8-35-20-55m20 55q10-38 24-62"} />
          <path className="se-root" d={"M"+x+" "+(350-index%2*18)+"q-18 38-8 72m8-72q18 35 9 72"} />
        </g>
      ))}
      <path className="se-runoff slow" d="M680 230Q700 290 750 340" />
      <text className="se-note" x="240" y="470" textAnchor="middle">rapid run-off removes exposed topsoil</text>
      <text className="se-note" x="720" y="470" textAnchor="middle">leaves reduce rain impact, roots bind soil</text>
    </svg>
  );
}

function FoodScene() {
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="Effect of soil erosion on crop growth and food production">
      <text className="se-title" x="240" y="44" textAnchor="middle">Before severe erosion</text>
      <text className="se-title" x="720" y="44" textAnchor="middle">After severe erosion</text>
      <rect className="se-topsoil rich" x="70" y="325" width="340" height="90" rx="12" />
      <rect className="se-subsoil" x="70" y="415" width="340" height="55" rx="0 0 12 12" />
      <rect className="se-topsoil thin" x="550" y="385" width="340" height="30" rx="8" />
      <rect className="se-subsoil" x="550" y="415" width="340" height="55" rx="0 0 12 12" />
      {[145,240,335].map(x=>(
        <g key={x}>
          <path className="se-crop-stem healthy" d={"M"+x+" 325V145"} />
          <ellipse className="se-crop-leaf healthy" cx={x-34} cy="195" rx="43" ry="20" transform={"rotate(-24 "+(x-34)+" 195)"} />
          <ellipse className="se-crop-leaf healthy" cx={x+34} cy="235" rx="43" ry="20" transform={"rotate(24 "+(x+34)+" 235)"} />
          <path className="se-root" d={"M"+x+" 325q-28 44-20 84m20-84q30 45 20 84"} />
        </g>
      ))}
      {[625,720,815].map((x,index)=>(
        <g key={x}>
          <path className="se-crop-stem weak" d={"M"+x+" 385V"+(285+index*8)} />
          <ellipse className="se-crop-leaf weak" cx={x-22} cy={320+index*5} rx="30" ry="14" />
          <ellipse className="se-crop-leaf weak" cx={x+22} cy={345+index*5} rx="30" ry="14" />
          <path className="se-root" d={"M"+x+" 385q-18 25-10 55m10-55q18 25 12 55"} />
        </g>
      ))}
      <text className="se-layer light" x="240" y="370" textAnchor="middle">deep fertile topsoil, humus + nutrients</text>
      <text className="se-layer" x="720" y="375" textAnchor="middle">thin topsoil, fewer nutrients and poorer rooting</text>
      <text className="se-note" x="240" y="500" textAnchor="middle">better growth and higher yield</text>
      <text className="se-note warning" x="720" y="500" textAnchor="middle">lower yield, less food, higher production pressure</text>
    </svg>
  );
}

function ControlScene({ method }) {
  const info = CONTROL_METHODS[method];
  return (
    <div className="spark-erosion-control-layout">
      <div className="spark-erosion-control-stage">
        <svg viewBox="0 0 960 520" role="img" aria-label={info.title + " soil erosion control"}>
          {method === "terracing" && <>
            <path className="se-hill covered" d="M70 440Q460 100 890 440Z" />
            {[170,245,320,395].map((y,index)=><path key={y} className="se-terrace" d={"M"+(220+index*45)+" "+y+"H"+(760-index*40)+"V"+(y+34)} />)}
            <text className="se-note" x="480" y="480" textAnchor="middle">flat steps slow run-off on steep slopes</text>
          </>}
          {method === "contour" && <>
            <path className="se-hill covered" d="M70 440Q460 100 890 440Z" />
            {[190,245,300,355].map((y,index)=><path key={y} className="se-contour" d={"M"+(180+index*25)+" "+y+"Q480 "+(y-70)+" "+(785-index*20)+" "+y} />)}
            <text className="se-note" x="480" y="480" textAnchor="middle">ridges follow the contour across the slope</text>
          </>}
          {method === "cover" && <>
            <rect className="se-field" x="75" y="300" width="810" height="135" rx="16" />
            {Array.from({length:13},(_,index)=>(
              <g key={index} transform={"translate("+(115+index*60)+" 0)"}>
                <path className="se-grass" d="M0 315q-10-45-25-65m25 65q12-50 28-70" />
                <path className="se-root" d="M0 315q-20 45-8 100m8-100q22 45 10 100" />
              </g>
            ))}
            <path className="se-rain" d="M180 80L220 230M400 70L430 230M650 80L680 230" />
            <text className="se-note" x="480" y="480" textAnchor="middle">plant cover protects the surface and roots bind soil</text>
          </>}
          {method === "windbreak" && <>
            <rect className="se-field dry" x="70" y="350" width="820" height="90" rx="14" />
            {[180,230,280].map(x=>(
              <g key={x}>
                <rect className="se-tree-trunk" x={x-10} y="205" width="20" height="145" />
                <circle className="se-tree" cx={x} cy="175" r="55" />
              </g>
            ))}
            <path className="se-wind" d="M40 150H145M40 205H150M40 260H155" />
            <path className="se-wind slow" d="M330 170H520M335 225H560M340 280H600" />
            <text className="se-note" x="480" y="480" textAnchor="middle">trees reduce wind speed before it crosses the field</text>
          </>}
          {method === "strips" && <>
            <path className="se-hill covered" d="M70 440Q460 100 890 440Z" />
            {[0,1,2,3,4].map(index=><path key={index} className={index%2 ? "se-strip alt" : "se-strip"} d={"M"+(190+index*120)+" 405Q"+(250+index*85)+" 285 "+(330+index*70)+" 190"} />)}
            <text className="se-note" x="480" y="480" textAnchor="middle">alternating strips interrupt water flow and trap soil</text>
          </>}
        </svg>
      </div>
      <aside>
        <strong>{info.title}</strong>
        <p>{info.note}</p>
      </aside>
    </div>
  );
}

function DownstreamScene() {
  return (
    <svg viewBox="0 0 960 540" role="img" aria-label="Sediment from eroded farmland entering rivers and coastal ecosystems">
      <path className="se-hill bare" d="M30 260Q190 70 360 260Z" />
      <path className="se-runoff" d="M195 130Q245 210 355 290" />
      <path className="se-river" d="M320 280Q460 230 555 330T930 360V520H300Z" />
      <path className="se-sediment" d="M335 310Q500 285 610 370T930 405V520H350Z" />
      <g transform="translate(700 400)">
        <path className="se-coral" d="M0 70V10m0 30q-35-35-55-12m55 20q35-42 55-18m-55 20q-18 15-25 42m25-25q25 18 35 45" />
        <ellipse className="se-fish" cx="110" cy="35" rx="45" ry="22" />
        <path className="se-fish-tail" d="M150 35l35-25v50Z" />
      </g>
      <text className="se-title" x="190" y="305" textAnchor="middle">eroded farm soil</text>
      <text className="se-note" x="520" y="250" textAnchor="middle">muddy river carries sediment downstream</text>
      <text className="se-note warning" x="735" y="510" textAnchor="middle">sediment can smother reefs and harm fisheries</text>
    </svg>
  );
}

export default function SoilErosionExplorer() {
  const [tab,setTab] = useState("causes");
  const [method,setMethod] = useState("terracing");

  return (
    <section className="spark-erosion-explorer">
      <header>
        <span>SOIL EROSION AND FOOD PRODUCTION</span>
        <h3>Follow the soil from hillside to harvest</h3>
        <p>See how erosion begins, why losing topsoil lowers crop production and how farming practices reduce the loss.</p>
      </header>
      <div className="spark-erosion-tabs" role="tablist" aria-label="Soil erosion views">
        {[
          ["causes","How erosion starts"],
          ["food","Food production"],
          ["control","Control methods"],
          ["downstream","Downstream effects"],
        ].map(([key,label])=>(
          <button type="button" role="tab" aria-selected={tab===key} className={tab===key?"active":""} key={key} onClick={()=>setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "control" ? (
        <>
          <div className="spark-erosion-methods">
            {Object.entries(CONTROL_METHODS).map(([key,item])=>(
              <button type="button" key={key} className={method===key?"active":""} onClick={()=>setMethod(key)}>{item.title}</button>
            ))}
          </div>
          <ControlScene method={method} />
        </>
      ) : (
        <div className="spark-erosion-stage">
          {tab === "causes" && <CausesScene />}
          {tab === "food" && <FoodScene />}
          {tab === "downstream" && <DownstreamScene />}
        </div>
      )}

      {tab === "causes" && (
        <div className="spark-erosion-note-grid">
          <article><b>Water erosion</b><span>Heavy rain and fast surface run-off detach and carry soil, especially on bare slopes.</span></article>
          <article><b>Wind erosion</b><span>Strong wind removes dry, loose topsoil from exposed fields.</span></article>
          <article><b>Human activity</b><span>Deforestation, bush fires, overgrazing and ploughing down a slope leave soil exposed or direct water downhill.</span></article>
        </div>
      )}
      {tab === "food" && (
        <div className="spark-erosion-impact">
          <strong>Why food production falls</strong>
          <span>Topsoil contains much of the humus, mineral nutrients and biological activity needed by crops. Severe erosion removes this layer, reduces rooting quality and water retention, lowers yields and can leave less productive land available for farming.</span>
        </div>
      )}
      {tab === "downstream" && (
        <div className="spark-erosion-impact">
          <strong>The impact does not stop at the farm</strong>
          <span>Sediment makes rivers muddy, can fill channels and may reach coastal waters where it smothers coral reefs and affects nursery habitats and fisheries.</span>
        </div>
      )}
    </section>
  );
}
