import React,{useMemo,useState} from "react";
import "./flotationExplorer.css";

function DensityView(){
  const [mass,setMass]=useState(60);
  const [volume,setVolume]=useState(100);
  const m=Math.max(0,Number(mass)||0),v=Math.max(0.1,Number(volume)||0.1);
  const density=m/v;
  const state=density<1?"floats":density===1?"neutral":"sinks";
  return <div className="spark-flotation-density">
    <div className="spark-flotation-inputs">
      <label>Mass, g<input type="number" min="0" value={mass} onChange={e=>setMass(e.target.value)}/></label>
      <label>Volume, cm³<input type="number" min="0.1" value={volume} onChange={e=>setVolume(e.target.value)}/></label>
    </div>
    <strong>Density = {density.toFixed(2)} g/cm³ → {state} in fresh water</strong>
    <p>Density = mass ÷ volume. Fresh water is approximately 1 g/cm³, so an object with lower average density can float.</p>
  </div>;
}

function ArchimedesView(){
  const [air,setAir]=useState(5);
  const [water,setWater]=useState(3);
  const weight=Math.max(0,Number(air)||0);
  const apparent=Math.max(0,Number(water)||0);
  const up=Math.max(0,weight-apparent);

  return <div className="spark-flotation-archimedes">
    <div className="spark-flotation-inputs">
      <label>Weight in air, N<input type="number" min="0" step="0.1" value={air} onChange={e=>setAir(e.target.value)}/></label>
      <label>Apparent weight in water, N<input type="number" min="0" step="0.1" value={water} onChange={e=>setWater(e.target.value)}/></label>
    </div>
    <strong>Upthrust = {up.toFixed(1)} N</strong>

    <div className="spark-archimedes-diagram">
      <svg viewBox="0 0 960 520" role="img" aria-label="Immersed object suspended from a spring balance in an overflow can showing weight downward, upthrust upward and displaced water collected">
        <g className="fa-support">
          <path className="fa-stand" d="M105 55V430M75 430H235M105 75H340" />
          <rect className="fa-spring-case" x="255" y="72" width="126" height="112" rx="18" />
          <line className="fa-spring-scale" x1="278" y1="105" x2="358" y2="105" />
          <line className="fa-spring-scale" x1="278" y1="125" x2="348" y2="125" />
          <line className="fa-spring-scale" x1="278" y1="145" x2="358" y2="145" />
          <text className="fa-reading" x="318" y="169" textAnchor="middle">{apparent.toFixed(1)} N</text>
          <text className="fa-small" x="318" y="55" textAnchor="middle">spring balance</text>
          <path className="fa-thread" d="M318 184V250" />
        </g>

        <g className="fa-overflow-can">
          <path className="fa-can" d="M180 205H585V440Q565 460 382 460Q198 460 180 440Z" />
          <path className="fa-water" d="M185 264H580V436Q558 449 382 449Q205 449 185 436Z" />
          <path className="fa-waterline" d="M185 264H580" />
          <path className="fa-spout" d="M580 260Q645 260 675 295" />
          <text className="fa-small" x="205" y="242">water level at overflow spout</text>
        </g>

        <path className="fa-object" d="M276 283Q318 251 360 281Q389 307 371 352Q347 390 303 379Q264 368 254 330Q249 304 276 283Z" />
        <text className="fa-object-label" x="312" y="333" textAnchor="middle">object</text>

        <path className="fa-force up" d="M238 360V277" />
        <text className="fa-force-label up" x="215" y="315" textAnchor="end">upthrust {up.toFixed(1)} N</text>
        <path className="fa-force down" d="M408 276V363" />
        <text className="fa-force-label down" x="432" y="320">weight {weight.toFixed(1)} N</text>

        <g className="fa-collector">
          <path className="fa-beaker" d="M685 310H840L823 455H702Z" />
          <path className="fa-collected-water" d="M699 380H827L820 448H706Z" />
          <path className="fa-drip" d="M674 296Q690 314 700 338" />
          <text className="fa-small" x="762" y="285" textAnchor="middle">displaced water collected</text>
          <text className="fa-result" x="762" y="482" textAnchor="middle">weight of displaced water = {up.toFixed(1)} N</text>
        </g>

        <g className="fa-equation">
          <rect x="560" y="72" width="335" height="140" rx="18" />
          <text className="fa-equation-title" x="728" y="108" textAnchor="middle">Force balance</text>
          <text x="728" y="140" textAnchor="middle">weight in air − apparent weight</text>
          <text x="728" y="169" textAnchor="middle">{weight.toFixed(1)} N − {apparent.toFixed(1)} N = {up.toFixed(1)} N</text>
          <text className="fa-equation-note" x="728" y="196" textAnchor="middle">this difference is the upthrust</text>
        </g>
      </svg>
    </div>

    <p>Archimedes' principle states that the upthrust on an immersed object equals the weight of fluid displaced. The spring balance reads less in water because the upward buoyant force supports part of the object's weight.</p>
  </div>;
}

function ShipView(){
  const [water,setWater]=useState("sea");
  const sea=water==="sea";
  return <div className="spark-flotation-ship">
    <div className="spark-flotation-toggle"><button type="button" className={sea?"active":""} onClick={()=>setWater("sea")}>Sea water</button><button type="button" className={!sea?"active":""} onClick={()=>setWater("fresh")}>Fresh water</button></div>
    <div className={"spark-ship-water "+(sea?"sea":"fresh")}><div className={"spark-ship-hull "+(sea?"high":"low")}>ship</div></div>
    <p>{sea?"Sea water is denser, so the ship needs to displace less volume to obtain the same upthrust and floats slightly higher.":"Fresh water is less dense, so the same ship must sink slightly lower to displace enough water for the same upthrust."}</p>
  </div>;
}

function HollowView(){
  return <div className="spark-flotation-hollow">
    <article><span>STEEL ITSELF</span><h4>Denser than water</h4><p>A solid lump of steel sinks because its density is greater than water.</p></article>
    <article><span>HOLLOW SHIP</span><h4>Large volume, lower average density</h4><p>A ship encloses a large volume of air, so the average density of the whole ship can be low enough to float.</p></article>
    <article><span>DISPLACEMENT</span><h4>Enough water must be displaced</h4><p>The ship settles until the weight of displaced water produces enough upthrust to balance the ship's weight.</p></article>
  </div>;
}

function LoadingView(){
  const [load,setLoad]=useState(40);
  const l=Math.max(0,Math.min(100,Number(load)||0));
  return <div className="spark-flotation-loading">
    <label>Boat loading<input type="range" min="0" max="100" value={load} onChange={e=>setLoad(e.target.value)}/></label>
    <div className="spark-load-water"><div className="spark-load-boat" style={{top:(35+l*.35)+"%"}}>boat<div className="spark-plimsoll-mark">load line</div></div></div>
    <strong>{l<70?"Adequate freeboard":"Low freeboard: increased risk"}</strong>
    <p>Overloading lowers freeboard, so waves can more easily enter the boat and stability may be reduced. Load lines such as the Plimsoll mark show safe loading limits.</p>
  </div>;
}

function SaltEggView(){
  const [salt,setSalt]=useState(0);
  const floats=Number(salt)>=55;
  return <div className="spark-salt-egg">
    <label>Salt concentration, relative scale<input type="range" min="0" max="100" value={salt} onChange={e=>setSalt(e.target.value)}/></label>
    <div className="spark-egg-tank"><div className={"spark-egg "+(floats?"float":"sink")}>egg</div></div>
    <p>{floats?"Adding salt increases the liquid's density, so a greater upthrust can support the egg.":"In less dense water the egg's density is greater than the liquid, so it sinks."}</p>
  </div>;
}

export default function FlotationExplorer(){
  const [view,setView]=useState("density");
  const summary=useMemo(()=>({
    density:"Density helps predict whether an object will float or sink.",
    archimedes:"Upthrust equals the weight of fluid displaced.",
    ship:"Ships float at different depths because fresh and sea water have different densities.",
    hollow:"A hollow steel ship can float because its overall average density is reduced by the enclosed air.",
    loading:"Safe loading preserves freeboard and stability.",
    salt:"Increasing water density increases the upthrust available for the same displaced volume."
  })[view],[view]);
  return <section className="spark-flotation">
    <header><span>FLOTATION</span><h3>Connect density, upthrust and displacement to floating and safe loading</h3><p>Objects in fluids experience an upward buoyant force called upthrust. Whether they float depends on density, displacement and the balance of forces.</p></header>
    <div className="spark-flotation-tabs">{[["density","Density"],["archimedes","Archimedes"],["ship","Sea vs fresh water"],["hollow","Why ships float"],["loading","Safe loading"],["salt","Salt-water egg"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-flotation-stage">{view==="density"&&<DensityView/>}{view==="archimedes"&&<ArchimedesView/>}{view==="ship"&&<ShipView/>}{view==="hollow"&&<HollowView/>}{view==="loading"&&<LoadingView/>}{view==="salt"&&<SaltEggView/>}</div>
    <div className="spark-flotation-summary"><strong>{summary}</strong><span>Upthrust = weight in air − apparent weight in water.</span></div>
  </section>;
}
