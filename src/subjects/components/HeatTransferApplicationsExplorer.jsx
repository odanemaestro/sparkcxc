import React,{useMemo,useState} from "react";
import "./heatTransferApplicationsExplorer.css";

function ConductionView(){
  return <div className="spark-heat-conduction">
    <svg viewBox="0 0 860 390" role="img" aria-label="Heat conduction along a metal rod from hot to cool end">
      <rect className="ht-rod" x="120" y="175" width="620" height="52" rx="26"/>
      <path className="ht-flame" d="M95 250Q50 205 90 150Q95 195 125 165Q160 210 130 250Z"/>
      {[170,230,290,350,410,470,530,590,650,710].map((x,i)=><circle key={x} className={"ht-particle "+(i<3?"hot":i<7?"warm":"cool")} cx={x} cy="201" r="14"/>)}
      {[205,325,445,565,685].map(x=><path key={x} className="ht-electron" d={"M"+x+" 150q20 -20 40 0t40 0"}/>)}
      <path className="ht-arrow" d="M165 105H685"/>
      <text className="ht-label" x="425" y="90" textAnchor="middle">thermal energy moves from hotter end to cooler end</text>
      <text className="ht-small" x="220" y="305" textAnchor="middle">hotter particles vibrate more</text>
      <text className="ht-small" x="640" y="305" textAnchor="middle">energy is passed through the solid</text>
    </svg>
    <div className="spark-heat-conduction-notes">
      <article><b>Solids</b><p>Particles are fixed in position but transfer energy through collisions and vibrations.</p></article>
      <article><b>Metals</b><p>Free electrons also transfer energy rapidly, making metals good thermal conductors.</p></article>
      <article><b>Applications</b><p>Copper and aluminium are used in cookware, while plastic handles reduce heat flow to the hand.</p></article>
    </div>
  </div>;
}

function ConvectionView(){
  const [medium,setMedium]=useState("water");
  return <div className="spark-heat-convection">
    <div className="spark-heat-convection-buttons"><button type="button" className={medium==="water"?"active":""} onClick={()=>setMedium("water")}>Water</button><button type="button" className={medium==="air"?"active":""} onClick={()=>setMedium("air")}>Air</button><button type="button" className={medium==="balloon"?"active":""} onClick={()=>setMedium("balloon")}>Hot-air balloon</button></div>
    {medium==="water"&&<div className="spark-heat-convection-panel"><svg viewBox="0 0 760 420" role="img" aria-label="Convection current in heated water"><rect className="hc-beaker" x="180" y="80" width="400" height="255" rx="12"/><path className="hc-water" d="M195 130H565V320H195Z"/><path className="hc-current hot" d="M300 300Q260 240 300 170Q330 120 380 120"/><path className="hc-current top" d="M380 120Q470 120 505 180"/><path className="hc-current cool" d="M505 180Q535 245 490 300Q450 340 370 325"/><path className="hc-current bottom" d="M370 325Q325 325 300 300"/><path className="hc-flame" d="M275 390Q240 350 275 315Q285 345 305 325Q340 360 310 390Z"/><text className="hc-label" x="375" y="55" textAnchor="middle">warm water rises, cooler water sinks</text></svg><p>Heating makes water expand slightly and become less dense. The warm water rises, while cooler denser water sinks, forming a convection current.</p></div>}
    {medium==="air"&&<div className="spark-heat-convection-panel"><svg viewBox="0 0 760 420" role="img" aria-label="Room convection with air conditioner high on wall"><rect className="hc-room" x="90" y="60" width="580" height="300" rx="8"/><rect className="hc-ac" x="465" y="80" width="150" height="55" rx="10"/><path className="hc-air cool" d="M520 145Q510 220 420 265Q330 315 220 300"/><path className="hc-air warm" d="M220 300Q160 240 205 160Q260 95 420 100"/><text className="hc-label" x="540" y="70" textAnchor="middle">air conditioner</text><text className="hc-small" x="320" y="335">cool dense air sinks</text><text className="hc-small" x="230" y="125">warm air rises</text></svg><p>Placing an air conditioner high on a wall supports circulation because cooled air becomes denser and sinks while warmer air rises to be cooled.</p></div>}
    {medium==="balloon"&&<div className="spark-heat-convection-panel"><svg viewBox="0 0 760 420" role="img" aria-label="Hot air balloon rising as heated air becomes less dense"><ellipse className="hc-balloon" cx="380" cy="165" rx="130" ry="115"/><path className="hc-basket" d="M335 280H425L410 340H350Z"/><path className="hc-burner" d="M360 280Q380 240 400 280"/><path className="hc-rise" d="M180 310V120M580 310V120"/><text className="hc-label" x="380" y="85" textAnchor="middle">heated air expands and becomes less dense</text></svg><p>When the air inside the balloon is heated, it expands and becomes less dense than the surrounding cooler air. The buoyant force can then lift the balloon.</p></div>}
  </div>;
}

function RadiationView(){
  const [surface,setSurface]=useState("black");
  return <div className="spark-heat-radiation">
    <div className="spark-radiation-top">
      <svg viewBox="0 0 820 300" role="img" aria-label="Radiation from the Sun reaching Earth through space"><circle className="hr-sun" cx="125" cy="150" r="65"/><circle className="hr-earth" cx="680" cy="150" r="70"/><path className="hr-wave" d="M210 120q35 -35 70 0t70 0t70 0t70 0t70 0"/><path className="hr-wave" d="M210 180q35 -35 70 0t70 0t70 0t70 0t70 0"/><text className="hr-label" x="400" y="65" textAnchor="middle">electromagnetic radiation crosses the vacuum of space</text></svg>
      <p>Radiation does not need particles, so energy from the Sun reaches Earth through the vacuum of space.</p>
    </div>
    <div className="spark-radiation-surfaces">
      <div className="spark-radiation-buttons"><button type="button" className={surface==="black"?"active":""} onClick={()=>setSurface("black")}>Dull black</button><button type="button" className={surface==="white"?"active":""} onClick={()=>setSurface("white")}>White</button><button type="button" className={surface==="silver"?"active":""} onClick={()=>setSurface("silver")}>Shiny silver</button></div>
      <article className={surface}><span>{surface==="black"?"BEST ABSORBER":surface==="white"?"GOOD REFLECTOR":"VERY GOOD REFLECTOR"}</span><h4>{surface==="black"?"Dull black surfaces absorb and emit thermal radiation well.":surface==="white"?"Light surfaces reflect more radiant energy and absorb less than dull black.":"Shiny silvered surfaces reflect thermal radiation strongly and reduce radiant heat transfer."}</h4></article>
    </div>
  </div>;
}

function CoastalBreezeView(){
  const [time,setTime]=useState("day");
  const day=time==="day";
  return <div className="spark-coastal-breeze">
    <div className="spark-coastal-buttons"><button type="button" className={day?"active":""} onClick={()=>setTime("day")}>Sea breeze, day</button><button type="button" className={!day?"active":""} onClick={()=>setTime("night")}>Land breeze, night</button></div>
    <svg viewBox="0 0 860 450" role="img" aria-label={day?"Sea breeze during daytime":"Land breeze during night"}>
      <rect className="cb-sea" x="40" y="285" width="370" height="100"/>
      <path className="cb-land" d="M410 285Q470 240 535 235H820V385H410Z"/>
      <text className="cb-label" x="220" y="350" textAnchor="middle">sea</text><text className="cb-label" x="650" y="330" textAnchor="middle">land</text>
      {day?<><circle className="cb-sun" cx="765" cy="70" r="40"/><path className="cb-arrow lower" d="M170 255H650"/><path className="cb-arrow up" d="M655 245V115"/><path className="cb-arrow upper" d="M635 100H220"/><path className="cb-arrow down" d="M205 115V240"/><text className="cb-small" x="655" y="210">warm air rises</text><text className="cb-small" x="380" y="275">cooler air moves from sea to land</text></>:<><path className="cb-moon" d="M750 40a42 42 0 1 0 30 72a32 32 0 1 1 -30 -72"/><path className="cb-arrow lower" d="M655 255H175"/><path className="cb-arrow up" d="M205 245V115"/><path className="cb-arrow upper" d="M225 100H650"/><path className="cb-arrow down" d="M655 115V235"/><text className="cb-small" x="205" y="205">warmer air rises</text><text className="cb-small" x="380" y="275">cooler air moves from land to sea</text></>}
    </svg>
    <p>{day?"During the day, land warms faster than the sea. Air above the land warms, expands and rises. Cooler air from the sea moves inland to replace it.":"At night, land cools faster than the sea. The sea remains warmer, so air rises above the water and cooler air from the land moves seaward."}</p>
  </div>;
}

function ApplicationsView(){
  return <div className="spark-heat-applications">
    <article><span>COOKWARE</span><h4>Copper or aluminium conducts heat well</h4><p>The metal base transfers energy quickly to food, while plastic or other insulating handle materials reduce heat flow to the hand.</p></article>
    <article><span>CARIBBEAN HOUSES</span><h4>Light colours reflect radiation</h4><p>White or light exterior surfaces absorb less solar radiation than dull dark surfaces and can reduce heat gain.</p></article>
    <article><span>AIR CONDITIONING</span><h4>High placement supports convection</h4><p>Cool air sinks while warmer room air rises, setting up circulation.</p></article>
    <article><span>HOT-AIR BALLOON</span><h4>Warm air becomes less dense</h4><p>Heating the air lowers its density relative to the surrounding air, allowing buoyancy to lift the balloon.</p></article>
  </div>;
}

function VacuumFlaskView(){
  return <div className="spark-vacuum-flask">
    <svg viewBox="0 0 820 470" role="img" aria-label="Vacuum flask showing stopper, silvered surfaces and vacuum gap"><rect className="vf-outer" x="245" y="65" width="330" height="335" rx="70"/><rect className="vf-inner" x="325" y="95" width="170" height="275" rx="45"/><rect className="vf-stop" x="340" y="35" width="140" height="80" rx="18"/><path className="vf-vacuum" d="M285 105V360M535 105V360"/><path className="vf-silver" d="M315 100V365M505 100V365"/><line className="vf-call" x1="285" y1="180" x2="110" y2="135"/><text className="vf-label" x="100" y="128" textAnchor="end">vacuum reduces conduction and convection</text><line className="vf-call" x1="315" y1="250" x2="100" y2="285"/><text className="vf-label" x="90" y="290" textAnchor="end">silvered surfaces reduce radiation</text><line className="vf-call" x1="410" y1="70" x2="650" y2="85"/><text className="vf-label" x="660" y="90">insulating stopper limits conduction and convection</text></svg>
    <div className="spark-vacuum-flask-notes"><p>A vacuum contains essentially no particles, so there is very little conduction and no convection through the gap.</p><p>Silvered shiny surfaces reflect infrared radiation and reduce radiant heat transfer.</p><p>The stopper is made from a poor thermal conductor and restricts air movement at the opening.</p></div>
  </div>;
}

export default function HeatTransferApplicationsExplorer(){
  const [view,setView]=useState("conduction");
  const summary=useMemo(()=>({
    conduction:"Conduction transfers thermal energy through matter without bulk movement of the material.",
    convection:"Convection transfers heat by the bulk movement of liquids and gases caused by density differences.",
    radiation:"Thermal radiation is electromagnetic energy and does not require a medium.",
    coast:"Sea and land breezes are natural convection currents driven by unequal heating and cooling.",
    applications:"Materials and appliance placement are chosen to control how fast heat is conducted, convected or radiated.",
    flask:"A vacuum flask reduces all three major heat-transfer pathways using different design features.",
  })[view],[view]);

  return <section className="spark-heat-transfer">
    <header><span>HEAT TRANSFER</span><h3>Apply conduction, convection and radiation to everyday systems</h3><p>Thermal energy moves from hotter regions to cooler regions by conduction, convection or radiation. The dominant method depends on the material and the situation.</p></header>
    <div className="spark-heat-tabs">{[["conduction","Conduction"],["convection","Convection"],["radiation","Radiation"],["coast","Sea and land breezes"],["applications","Applications"],["flask","Vacuum flask"]].map(([key,label])=><button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>{label}</button>)}</div>
    <div className="spark-heat-stage">
      {view==="conduction"&&<ConductionView/>}
      {view==="convection"&&<ConvectionView/>}
      {view==="radiation"&&<RadiationView/>}
      {view==="coast"&&<CoastalBreezeView/>}
      {view==="applications"&&<ApplicationsView/>}
      {view==="flask"&&<VacuumFlaskView/>}
    </div>
    <div className="spark-heat-summary"><strong>{summary}</strong><span>Dull black surfaces absorb and emit thermal radiation well. Light or shiny surfaces reflect more radiation.</span></div>
  </section>;
}
