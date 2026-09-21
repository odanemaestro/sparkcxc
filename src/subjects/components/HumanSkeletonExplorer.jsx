import React,{useMemo,useState} from "react";
import "./humanSkeletonExplorer.css";

const BONES={
  skull:["Skull / cranium","Protects the brain."],
  clavicle:["Clavicle","Collar bone connecting the shoulder region to the sternum."],
  scapula:["Scapula","Shoulder blade forming part of the shoulder joint."],
  sternum:["Sternum","Breastbone forming the front of the rib cage."],
  ribs:["Ribs","Protect the heart and lungs and move during breathing."],
  humerus:["Humerus","Upper-arm bone."],
  radius:["Radius","Forearm bone on the thumb side."],
  ulna:["Ulna","Forearm bone forming a major part of the elbow hinge."],
  pelvis:["Pelvic girdle","Supports the upper body, protects lower-abdominal organs and joins the legs to the backbone."],
  femur:["Femur","Thigh bone and the longest bone in the human body."],
  tibia:["Tibia","Large weight-bearing bone of the lower leg."],
  fibula:["Fibula","Slender bone on the outer side of the lower leg."],
  vertebrae:["Vertebral column","Protects the spinal cord and includes cervical, thoracic and lumbar regions, followed by sacrum and coccyx."]
};

function SkeletonDiagram({selected,onSelect}){
  const label=(key,x,y,tx,ty)=><g key={key} onClick={()=>onSelect(key)} className={"hs-label-group "+(selected===key?"active":"")} role="button" tabIndex="0">
    <line x1={x} y1={y} x2={tx} y2={ty}/><circle cx={x} cy={y} r="6"/><text x={tx+(tx<x?-8:8)} y={ty+4} textAnchor={tx<x?"end":"start"}>{key==="vertebrae"?"vertebral column":key}</text>
  </g>;
  return <svg viewBox="0 0 760 940" role="img" aria-label="Human skeleton with major bones labelled">
    <g className="hs-bones">
      <ellipse cx="380" cy="85" rx="58" ry="68"/><path d="M350 125Q380 145 410 125"/>
      <line x1="380" y1="150" x2="380" y2="430"/>
      <path d="M335 180Q380 155 425 180"/><line x1="338" y1="180" x2="290" y2="225"/><line x1="422" y1="180" x2="470" y2="225"/>
      <path d="M325 205Q380 175 435 205M315 225Q380 195 445 225M310 245Q380 215 450 245M315 265Q380 235 445 265M325 285Q380 255 435 285"/>
      <line x1="295" y1="225" x2="270" y2="380"/><line x1="465" y1="225" x2="490" y2="380"/>
      <line x1="270" y1="380" x2="250" y2="535"/><line x1="270" y1="380" x2="300" y2="535"/>
      <line x1="490" y1="380" x2="460" y2="535"/><line x1="490" y1="380" x2="510" y2="535"/>
      <path d="M320 415Q380 380 440 415L425 495Q380 525 335 495Z"/>
      <line x1="345" y1="495" x2="320" y2="705"/><line x1="415" y1="495" x2="440" y2="705"/>
      <line x1="320" y1="705" x2="305" y2="885"/><line x1="320" y1="705" x2="342" y2="885"/>
      <line x1="440" y1="705" x2="418" y2="885"/><line x1="440" y1="705" x2="455" y2="885"/>
    </g>
    {label("skull",380,70,145,75)}
    {label("clavicle",350,175,120,155)}
    {label("scapula",325,205,110,220)}
    {label("sternum",380,215,635,190)}
    {label("ribs",430,245,650,255)}
    {label("vertebrae",380,320,650,335)}
    {label("humerus",285,300,90,315)}
    {label("radius",250,470,80,465)}
    {label("ulna",300,470,85,505)}
    {label("pelvis",380,450,650,465)}
    {label("femur",330,600,105,610)}
    {label("tibia",305,800,105,800)}
    {label("fibula",342,800,110,845)}
  </svg>;
}

function RegionsView(){
  return <div className="spark-skeleton-regions">
    <article><span>CERVICAL</span><h4>Neck</h4><p>Seven cervical vertebrae support the head and protect the upper spinal cord.</p></article>
    <article><span>THORACIC</span><h4>Chest</h4><p>Thoracic vertebrae articulate with ribs and help form the thoracic cage.</p></article>
    <article><span>LUMBAR</span><h4>Lower back</h4><p>Large lumbar vertebrae bear substantial body weight.</p></article>
    <article><span>SACRUM + COCCYX</span><h4>Base of the spine</h4><p>These fused or small terminal bones connect the vertebral column with the pelvis and form its lower end.</p></article>
  </div>;
}

function FunctionsView(){
  return <div className="spark-skeleton-functions">
    <article><span>SUPPORT</span><h4>Framework for the body</h4><p>Bones support soft tissues and help maintain body shape.</p></article>
    <article><span>PROTECTION</span><h4>Shield vital organs</h4><p>The skull protects the brain, vertebrae protect the spinal cord, and ribs plus sternum protect the heart and lungs.</p></article>
    <article><span>MOVEMENT</span><h4>Levers for muscles</h4><p>Muscles pull on bones across joints to produce movement.</p></article>
    <article><span>BREATHING</span><h4>Rib-cage movement</h4><p>Ribs move during ventilation while continuing to protect thoracic organs.</p></article>
  </div>;
}

export default function HumanSkeletonExplorer(){
  const [view,setView]=useState("diagram");
  const [selected,setSelected]=useState("femur");
  const summary=useMemo(()=>({
    diagram:"Major bones can be identified by both position and function.",
    regions:"The vertebral column is divided into cervical, thoracic and lumbar regions, followed by the sacrum and coccyx.",
    functions:"The skeleton supports, protects and works with muscles and joints to produce movement."
  })[view],[view]);

  return <section className="spark-human-skeleton">
    <header><span>THE HUMAN SKELETON</span><h3>Relate major bones to support, protection and movement</h3><p>The skeleton is a framework of bones and joints that supports the body, protects organs and provides attachment points for muscles.</p></header>
    <div className="spark-skeleton-tabs">{[["diagram","Major bones"],["regions","Spinal regions"],["functions","Functions"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-skeleton-stage">
      {view==="diagram"&&<div className="spark-skeleton-diagram-wrap"><SkeletonDiagram selected={selected} onSelect={setSelected}/><article><span>{BONES[selected][0].toUpperCase()}</span><h4>{BONES[selected][0]}</h4><p>{BONES[selected][1]}</p></article></div>}
      {view==="regions"&&<RegionsView/>}
      {view==="functions"&&<FunctionsView/>}
    </div>
    <div className="spark-skeleton-summary"><strong>{summary}</strong><span>The femur is the longest bone; the lower leg contains the tibia and fibula.</span></div>
  </section>;
}
