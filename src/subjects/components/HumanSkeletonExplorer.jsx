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
  const hotspots={
    skull:[50,7],clavicle:[50,18],scapula:[39,20],sternum:[50,24],ribs:[50,29],
    humerus:[34,31],radius:[29,43],ulna:[37,43],pelvis:[50,50],femur:[45,64],
    tibia:[45,80],fibula:[39,80],vertebrae:[50,37]
  };
  return <div className="spark-skeleton-reference">
    <figure className="spark-skeleton-reference-figure">
      <div className="spark-skeleton-image-stage">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_-_no_labels.svg"
          alt="Public-domain front-view human skeleton without labels"
          loading="lazy"
        />
        {Object.entries(hotspots).map(([key,[left,top]])=>(
          <button
            key={key}
            type="button"
            className={"spark-skeleton-hotspot "+(selected===key?"active":"")}
            style={{left:left+"%",top:top+"%"}}
            onClick={()=>onSelect(key)}
            aria-pressed={selected===key}
            aria-label={BONES[key][0]}
            title={BONES[key][0]}
          >
            <span aria-hidden="true"></span>
          </button>
        ))}
      </div>
      <figcaption>
        <span>Human skeleton, front view</span>
        <small>
          Reference: <a href="https://commons.wikimedia.org/wiki/File:Human_skeleton_front_-_no_labels.svg" target="_blank" rel="noreferrer">Mikael Häggström / LadyofHats</a>
          {" · "}Public domain
        </small>
      </figcaption>
    </figure>
    <div className="spark-skeleton-bone-buttons" aria-label="Explore major bones">
      {Object.keys(BONES).map(key=>(
        <button type="button" key={key} className={selected===key?"active":""} onClick={()=>onSelect(key)}>
          {BONES[key][0]}
        </button>
      ))}
    </div>
  </div>;
}

function RegionsView(){
  const [region,setRegion]=useState("cervical");
  const regions={
    cervical:["Cervical vertebrae","7 vertebrae in the neck support the head and protect the upper spinal cord."],
    thoracic:["Thoracic vertebrae","12 vertebrae articulate with the ribs and help form the thoracic cage."],
    lumbar:["Lumbar vertebrae","5 large vertebrae in the lower back bear substantial body weight."],
    sacral:["Sacrum and coccyx","The fused sacrum connects the vertebral column to the pelvis; the coccyx forms the lower end."]
  };
  const selected=regions[region];
  return <div className="spark-skeleton-regions-reference">
    <figure>
      <img
        src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Segments_of_Vertebrae.svg"
        alt="Vertebral column reference showing cervical, thoracic, lumbar, sacral and coccygeal regions"
        loading="lazy"
      />
      <figcaption>
        <span>Regions of the vertebral column</span>
        <small>
          Reference: <a href="https://commons.wikimedia.org/wiki/File:Segments_of_Vertebrae.svg" target="_blank" rel="noreferrer">DrJanaOfficial</a>
          {" · "}CC BY-SA 4.0
        </small>
      </figcaption>
    </figure>
    <div className="spark-skeleton-region-focus">
      <span>Explore a region</span>
      <div>
        {Object.entries(regions).map(([key,[title]])=>(
          <button type="button" key={key} className={region===key?"active":""} onClick={()=>setRegion(key)}>{title}</button>
        ))}
      </div>
      <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
    </div>
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
