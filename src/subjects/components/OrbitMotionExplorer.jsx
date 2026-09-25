import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React,{useMemo,useState} from "react";
import "./orbitMotionExplorer.css";

function OrbitView(){
 const [gravity,setGravity]=useState(true);
 return <div className="spark-orbit-motion">
  <div className="spark-orbit-toggle"><button type="button" className={gravity?"active":""} onClick={()=>setGravity(true)}>Gravity on</button><button type="button" className={!gravity?"active":""} onClick={()=>setGravity(false)}>Gravity removed</button></div>
  <ReviewedScienceDiagram site="OrbitMotionExplorer.jsx:8"><svg viewBox="0 0 820 430" role="img" aria-label={gravity?"Satellite kept in orbit by gravity":"Satellite moving tangent when gravity is removed"}>
   <circle className="om-earth" cx="390" cy="220" r="80"/>
   <ellipse className="om-orbit" cx="390" cy="220" rx="250" ry="145"/>
   <rect className="om-sat" x="595" y="100" width="34" height="24" rx="3"/>
   <path className="om-velocity" d="M612 112L700 165"/>
   {gravity?<path className="om-force" d="M600 120L470 190"/>:<path className="om-tangent" d="M612 112L745 190"/>}
   <text className="om-label" x="390" y="225" textAnchor="middle">Earth</text>
   <text className="om-label" x="695" y="155">velocity</text>
   <text className="om-label" x={gravity?515:700} y={gravity?165:225}>{gravity?"gravity":"straight-line tangent"}</text>
  </svg></ReviewedScienceDiagram>
  <p>{gravity?"Gravity continually changes the satellite's direction, providing the centripetal force needed for orbit.":"Without gravity, the satellite would continue in a straight line tangent to the orbit because no centre-seeking force remains."}</p>
 </div>;
}

function GeoView(){
 return <div className="spark-geostationary">
  <ReviewedScienceDiagram site="OrbitMotionExplorer.jsx:24"><svg viewBox="0 0 820 430" role="img" aria-label="Geostationary satellite above the equator">
   <circle className="gs-earth" cx="410" cy="225" r="90"/>
   <ellipse className="gs-equator" cx="410" cy="225" rx="90" ry="32"/>
   <circle className="gs-orbit" cx="410" cy="225" r="190"/>
   <rect className="gs-sat" x="398" y="23" width="24" height="18"/>
   <line className="gs-line" x1="410" y1="42" x2="410" y2="135"/>
   <text className="gs-label" x="440" y="70">same point above equator</text>
   <text className="gs-label" x="410" y="345" textAnchor="middle">orbital period = Earth's rotation period, about 24 h</text>
  </svg></ReviewedScienceDiagram>
  <p>A geostationary satellite orbits above the equator in the same direction as Earth's rotation and has an orbital period matching Earth's rotation, so it appears fixed above one point.</p>
 </div>;
}

function PlanetView(){
 const rows=[["Mercury","88 days","closest listed planet, shortest path and high orbital speed"],["Earth","365 days","1 year"],["Jupiter","about 12 years","farther away and much longer orbit"],["Neptune","about 165 years","very distant and long orbital period"]];
 return <div className="spark-orbit-periods">{rows.map((r,i)=><article key={r[0]}><span>{i+1}</span><div><b>{r[0]}</b><strong>{r[1]}</strong><p>{r[2]}</p></div></article>)}</div>;
}

function MoonView(){
 return <div className="spark-moon-sync">
  <div className="spark-moon-sync-row"><div className="spark-sync-earth">Earth</div><div className="spark-sync-arrow">↔</div><div className="spark-sync-moon">Moon<div className="spark-face">◉</div></div></div>
  <p>The Moon takes about the same time to rotate once on its axis as it takes to orbit Earth. This synchronous rotation is why the same lunar hemisphere generally faces Earth.</p>
 </div>;
}

function SatelliteView(){
 return <div className="spark-satellite-types">
  <article><span>NATURAL SATELLITE</span><h4>Moon</h4><p>A naturally occurring body that orbits a planet. Earth's Moon is a natural satellite.</p></article>
  <article><span>ARTIFICIAL SATELLITE</span><h4>Human-made spacecraft</h4><p>Placed in orbit for communication, weather observation, navigation, Earth observation and scientific research.</p></article>
  <article><span>ORBIT SHAPE</span><h4>Ellipse</h4><p>Planetary and satellite orbits are generally elliptical rather than perfectly circular.</p></article>
 </div>;
}

export default function OrbitMotionExplorer(){
 const [view,setView]=useState("orbit");
 const summary=useMemo(()=>({
  orbit:"Gravity provides the centripetal force that continuously bends a moving body's path into an orbit.",
  geo:"A geostationary satellite matches Earth's rotation and remains above the same equatorial location.",
  periods:"Planets farther from the Sun have longer orbital paths and longer orbital periods.",
  moon:"The Moon's rotation period matches its orbital period, producing synchronous rotation.",
  satellites:"Natural and artificial satellites both remain in orbit because gravity changes their direction of motion."
 })[view],[view]);
 return <section className="spark-orbit-explorer">
  <header><span>ORBITAL MOTION</span><h3>Connect gravity, forward motion and orbital period</h3><p>An orbit occurs when a moving body has forward velocity while gravity continuously pulls it toward the body being orbited.</p></header>
  <div className="spark-orbit-tabs">{[["orbit","Why orbit?"],["geo","Geostationary"],["periods","Planet years"],["moon","Moon rotation"],["satellites","Satellite types"]].map(([k,l])=><button type="button" key={k} className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
  <div className="spark-orbit-stage">{view==="orbit"&&<OrbitView/>}{view==="geo"&&<GeoView/>}{view==="periods"&&<PlanetView/>}{view==="moon"&&<MoonView/>}{view==="satellites"&&<SatelliteView/>}</div>
  <div className="spark-orbit-summary"><strong>{summary}</strong><span>Objects in orbit are still under gravity. They are continuously falling around the body they orbit.</span></div>
 </section>;
}
