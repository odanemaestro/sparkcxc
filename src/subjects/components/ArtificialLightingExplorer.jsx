import React,{useMemo,useState} from "react";
import "./artificialLightingExplorer.css";

const SOURCES=[
  {id:"filament",name:"Filament lamp",efficiency:"Lowest of these common choices",heat:"High",shadow:"Point-like bulb can give sharper shadows",dimming:"Works smoothly with a simple resistive dimmer",material:"Tungsten filament",disposal:"No mercury, but glass and metal should still be handled responsibly."},
  {id:"fluorescent",name:"Fluorescent tube",efficiency:"More efficient than filament",heat:"Lower than filament",shadow:"Long source produces softer shadows and larger penumbra",dimming:"Needs suitable ballast and compatible dimming equipment",material:"Gas discharge plus phosphor coating",disposal:"Contains a small amount of mercury and should be collected and disposed of carefully."},
  {id:"cfl",name:"Compact fluorescent",efficiency:"More efficient than filament",heat:"Lower than filament",shadow:"Broader source than a bare filament",dimming:"Only dimmable models work properly with compatible controls",material:"Compact fluorescent tube",disposal:"Contains a small amount of mercury and needs careful disposal."},
  {id:"led",name:"LED lamp",efficiency:"Highest of these common household choices",heat:"Low for the same useful light",shadow:"Depends on lamp design and diffuser",dimming:"Dimmable LED lamps need a compatible dimmer",material:"Light-emitting semiconductor",disposal:"Electronic waste should be handled through suitable collection where available."},
];

function CompareView(){
  const [id,setId]=useState("led");
  const item=SOURCES.find(s=>s.id===id);
  return <div className="spark-light-compare">
    <div className="spark-light-source-buttons">{SOURCES.map(s=><button type="button" key={s.id} className={id===s.id?"active":""} onClick={()=>setId(s.id)}>{s.name}</button>)}</div>
    <article><span>{item.name.toUpperCase()}</span><h4>{item.efficiency}</h4><div><b>Heat output</b><p>{item.heat}</p></div><div><b>Shadow behaviour</b><p>{item.shadow}</p></div><div><b>Dimming</b><p>{item.dimming}</p></div><div><b>Main light-producing system</b><p>{item.material}</p></div><div><b>Disposal</b><p>{item.disposal}</p></div></article>
  </div>;
}

function EfficiencyView(){
  return <div className="spark-light-efficiency">
    <article className="filament"><span>FILAMENT</span><strong>small useful-light fraction</strong><div className="spark-energy-bar"><i style={{width:"12%"}}></i></div><p>Most of the electrical input becomes heat. CSEC questions commonly use about 10% as useful light for a simple comparison.</p></article>
    <article className="cfl"><span>CFL / FLUORESCENT</span><strong>better light output per watt</strong><div className="spark-energy-bar"><i style={{width:"45%"}}></i></div><p>Less energy is wasted as heat than in a filament lamp, although some is still lost in the lamp and control gear.</p></article>
    <article className="led"><span>LED</span><strong>highest efficiency in the bank comparison</strong><div className="spark-energy-bar"><i style={{width:"75%"}}></i></div><p>LEDs provide the required illumination at lower wattage than traditional filament lamps in typical household use.</p></article>
  </div>;
}

function ShadowView(){
  const [extended,setExtended]=useState(false);
  return <div className="spark-light-shadow">
    <div className="spark-shadow-toggle"><button type="button" className={!extended?"active":""} onClick={()=>setExtended(false)}>Point source</button><button type="button" className={extended?"active":""} onClick={()=>setExtended(true)}>Extended source</button></div>
    <svg viewBox="0 0 860 430" role="img" aria-label={extended?"Extended light source produces umbra and penumbra":"Point light source produces a sharp shadow"}>
      {extended?<rect className="ls-source extended" x="70" y="85" width="38" height="205" rx="18"/>:<circle className="ls-source point" cx="90" cy="190" r="23"/>}
      <rect className="ls-object" x="390" y="120" width="55" height="145" rx="10"/>
      <rect className="ls-screen" x="735" y="55" width="18" height="280" rx="4"/>
      {extended?<>
        <path className="ls-ray" d="M108 85L390 120M108 290L390 265M108 85L390 265M108 290L390 120"/>
        <path className="ls-penumbra" d="M445 120L735 75V305L445 265Z"/>
        <path className="ls-umbra" d="M445 145L735 145V255L445 240Z"/>
        <text className="ls-label" x="635" y="125">penumbra</text><text className="ls-label" x="635" y="210">umbra</text>
      </>:<>
        <path className="ls-ray" d="M90 190L390 120M90 190L390 265"/>
        <path className="ls-umbra" d="M445 120L735 50V330L445 265Z"/>
        <text className="ls-label" x="635" y="210">sharp shadow</text>
      </>}
      <text className="ls-note" x="90" y="365" textAnchor="middle">{extended?"long source":"small source"}</text><text className="ls-note" x="417" y="365" textAnchor="middle">opaque object</text><text className="ls-note" x="744" y="365" textAnchor="middle">screen</text>
    </svg>
    <p>{extended?"A fluorescent tube behaves as an extended source. Different parts of the source are blocked differently, producing a penumbra and a softer shadow edge.":"A small point source sends light from essentially one position, so the shadow edge is sharp with little penumbra."}</p>
  </div>;
}

function ColourView(){
  return <div className="spark-light-colour">
    <article><span>CANDLE / WARM FILAMENT</span><div className="spark-colour-strip warm"></div><h4>Warm yellow-red appearance</h4><p>The spectrum and colour temperature differ strongly from daylight.</p></article>
    <article><span>DAYLIGHT FLUORESCENT</span><div className="spark-colour-strip daylight"></div><h4>Designed to resemble daylight</h4><p>The bank treats a daylight fluorescent tube as the closest listed option to natural daylight.</p></article>
    <article><span>LED</span><div className="spark-colour-strip led"></div><h4>Available in many colour temperatures</h4><p>LED lamps can be designed as warm, neutral or daylight white.</p></article>
    <article><span>SODIUM STREET LAMP</span><div className="spark-colour-strip sodium"></div><h4>Strong yellow-orange appearance</h4><p>Traditional low-pressure sodium lighting gives poor colour rendering.</p></article>
  </div>;
}

function CostView(){
  const [filamentW,setFilamentW]=useState(60);
  const [ledW,setLedW]=useState(9);
  const [hours,setHours]=useState(1000);
  const [rate,setRate]=useState(20);
  const filamentCost=(Number(filamentW)||0)/1000*(Number(hours)||0)*(Number(rate)||0);
  const ledCost=(Number(ledW)||0)/1000*(Number(hours)||0)*(Number(rate)||0);
  return <div className="spark-light-cost">
    <article><span>RUNNING-COST COMPARISON</span><label>Filament power, W<input type="number" value={filamentW} onChange={e=>setFilamentW(e.target.value)}/></label><label>LED power, W<input type="number" value={ledW} onChange={e=>setLedW(e.target.value)}/></label><label>Operating time, h<input type="number" value={hours} onChange={e=>setHours(e.target.value)}/></label><label>Illustrative rate per kWh<input type="number" value={rate} onChange={e=>setRate(e.target.value)}/></label></article>
    <div className="spark-light-cost-results"><div><span>Filament energy cost</span><strong>{Math.round(filamentCost*100)/100}</strong></div><div><span>LED energy cost</span><strong>{Math.round(ledCost*100)/100}</strong></div><p>The purchase price is only one part of lifetime cost. Lower power use and longer service life often make LEDs cheaper over time.</p></div>
  </div>;
}

function DisposalView(){
  return <div className="spark-light-disposal">
    <article><span>FLUORESCENT TUBES AND CFLs</span><h4>Contain a small amount of mercury</h4><p>They should not be deliberately broken. Use an appropriate lamp-recycling or hazardous-waste collection route where one is available.</p></article>
    <article><span>IF A FLUORESCENT LAMP BREAKS</span><h4>Avoid unnecessary contact with debris</h4><p>Keep people away from the area, ventilate the space and follow local public-health or environmental guidance for cleanup and disposal.</p></article>
    <article><span>LEDs</span><h4>No mercury in the light source</h4><p>LED lamps contain electronic components and materials worth recovering, so suitable electronic-waste collection is preferred where available.</p></article>
  </div>;
}

export default function ArtificialLightingExplorer(){
  const [view,setView]=useState("compare");
  const summary=useMemo(()=>({
    compare:"Artificial light sources differ in efficiency, heat output, colour, shadow quality, dimming and disposal needs.",
    efficiency:"For the same useful illumination, filament lamps generally require more electrical power than CFLs or LEDs.",
    shadow:"Source size affects shadow sharpness. Extended sources produce a larger penumbra.",
    colour:"Lamp spectrum and colour temperature determine how similar the light appears to daylight.",
    cost:"Running cost depends on power, time and electricity price, not purchase price alone.",
    disposal:"Mercury-containing fluorescent lamps need more careful disposal than ordinary household waste.",
  })[view],[view]);

  return <section className="spark-artificial-lighting">
    <header><span>ARTIFICIAL LIGHT SOURCES</span><h3>Compare efficiency, light quality, shadows and lifetime cost</h3><p>Different lamps convert electrical energy into light with different efficiencies and produce different visual effects. Selection also depends on control, lifetime, cost and disposal.</p></header>
    <div className="spark-light-tabs">{[["compare","Compare sources"],["efficiency","Efficiency"],["shadow","Shadows"],["colour","Colour"],["cost","Lifetime cost"],["disposal","Disposal"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-light-stage">
      {view==="compare"&&<CompareView/>}
      {view==="efficiency"&&<EfficiencyView/>}
      {view==="shadow"&&<ShadowView/>}
      {view==="colour"&&<ColourView/>}
      {view==="cost"&&<CostView/>}
      {view==="disposal"&&<DisposalView/>}
    </div>
    <div className="spark-light-summary"><strong>{summary}</strong><span>The filament in an incandescent lamp is made of tungsten because tungsten withstands extremely high operating temperatures.</span></div>
  </section>;
}

export { SOURCES };
