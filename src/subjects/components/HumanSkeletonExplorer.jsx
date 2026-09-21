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
  const activateLabel=(event,key)=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      onSelect(key);
    }
  };
  const label=(key,x,y,tx,ty)=><g
    key={key}
    onClick={()=>onSelect(key)}
    onKeyDown={event=>activateLabel(event,key)}
    className={"hs-label-group "+(selected===key?"active":"")}
    role="button"
    tabIndex="0"
    aria-pressed={selected===key}
    aria-label={`${BONES[key][0]}: ${BONES[key][1]}`}
  >
    <line x1={x} y1={y} x2={tx} y2={ty}/><circle cx={x} cy={y} r="6"/><text x={tx+(tx<x?-8:8)} y={ty+4} textAnchor={tx<x?"end":"start"}>{key==="vertebrae"?"vertebral column":key}</text>
  </g>;

  return <svg viewBox="0 0 760 940" role="img" aria-label="Front view of the human skeleton with major bones labelled">
    <g className="hs-bones hs-anatomical">
      <path className="hs-skull" d="M326 75Q330 25 380 18Q430 25 434 75Q436 110 415 128Q402 140 397 154H363Q358 140 345 128Q324 110 326 75Z"/>
      <path className="hs-frontal" d="M343 49Q380 28 417 49Q412 72 404 88H356Q348 72 343 49Z"/>
      <path className="hs-temporal left" d="M329 78Q339 66 350 73Q356 91 348 109Q337 108 330 97Z"/>
      <path className="hs-temporal right" d="M431 78Q421 66 410 73Q404 91 412 109Q423 108 430 97Z"/>
      <circle className="hs-eye-socket" cx="359" cy="82" r="13"/>
      <circle className="hs-eye-socket" cx="401" cy="82" r="13"/>
      <path className="hs-nasal" d="M376 83L368 108Q380 116 392 108L384 83Z"/>
      <path className="hs-zygoma left" d="M347 94Q334 99 339 111Q349 118 359 108"/>
      <path className="hs-zygoma right" d="M413 94Q426 99 421 111Q411 118 401 108"/>
      <path className="hs-maxilla" d="M352 111Q380 122 408 111L404 128Q380 137 356 128Z"/>
      <path className="hs-jaw" d="M348 121Q380 138 412 121Q410 151 395 164Q380 175 365 164Q350 151 348 121Z"/>
      <g className="hs-teeth">
        {[360,370,380,390,400].map(x=><rect key={x} x={x-3} y="123" width="6" height="9" rx="2"/>)}
      </g>

      <g className="hs-spine">
        {[158,177,196,215,234,253,272,291,310,329,348,367,386,405].map((y,index)=>(
          <rect key={y} x={index<5?371:369} y={y} width={index<5?18:22} height="12" rx="4"/>
        ))}
        <path d="M380 417Q368 440 380 462Q392 440 380 417Z"/>
      </g>

      <path className="hs-clavicle" d="M375 175Q337 162 301 181M385 175Q423 162 459 181"/>
      <path className="hs-scapula left" d="M317 184Q286 199 293 240Q309 264 333 238Q337 210 317 184Z"/>
      <path className="hs-scapula right" d="M443 184Q474 199 467 240Q451 264 427 238Q423 210 443 184Z"/>

      <path className="hs-sternum" d="M380 182V308"/>
      <g className="hs-ribs">
        {[0,1,2,3,4,5].map(i=>{
          const y=198+i*24;
          const spread=58+i*7;
          return <path key={i} d={`M376 ${y}Q${380-spread} ${y-10} ${316-i*3} ${y+16}M384 ${y}Q${380+spread} ${y-10} ${444+i*3} ${y+16}`}/>;
        })}
      </g>

      <g className="hs-arm left">
        <path className="hs-humerus" d="M300 225Q282 300 272 377"/>
        <circle className="hs-joint" cx="299" cy="224" r="10"/>
        <circle className="hs-joint" cx="272" cy="381" r="9"/>
        <path className="hs-radius" d="M264 388Q252 457 248 532"/>
        <path className="hs-ulna" d="M281 388Q293 457 300 532"/>
        <g className="hs-hand" transform="translate(273 545)">
          <path d="M-25-8L-33 36M-12-10L-14 40M0-10V43M12-8L15 39M24-5L31 33"/>
          <path d="M-28-8Q0-22 28-7"/>
        </g>
      </g>

      <g className="hs-arm right">
        <path className="hs-humerus" d="M460 225Q478 300 488 377"/>
        <circle className="hs-joint" cx="461" cy="224" r="10"/>
        <circle className="hs-joint" cx="488" cy="381" r="9"/>
        <path className="hs-radius" d="M496 388Q508 457 512 532"/>
        <path className="hs-ulna" d="M479 388Q467 457 460 532"/>
        <g className="hs-hand" transform="translate(487 545)">
          <path d="M-25-5L-31 33M-12-8L-15 39M0-10V43M12-10L14 40M25-8L33 36"/>
          <path d="M-28-7Q0-22 28-8"/>
        </g>
      </g>

      <path className="hs-pelvis" d="M319 408Q347 382 380 398Q413 382 441 408Q456 442 431 484Q405 506 380 498Q355 506 329 484Q304 442 319 408Z"/>
      <path className="hs-sacrum" d="M365 414Q380 402 395 414L390 472Q380 486 370 472Z"/>

      <g className="hs-leg left">
        <path className="hs-femur" d="M345 493Q330 594 320 700"/>
        <circle className="hs-hip" cx="345" cy="494" r="11"/>
        <circle className="hs-knee" cx="320" cy="705" r="12"/>
        <path className="hs-tibia" d="M315 718Q306 799 304 878"/>
        <path className="hs-fibula" d="M333 718Q342 798 342 875"/>
        <path className="hs-foot" d="M302 878Q317 895 354 890Q361 900 350 910Q316 915 292 900Z"/>
      </g>

      <g className="hs-leg right">
        <path className="hs-femur" d="M415 493Q430 594 440 700"/>
        <circle className="hs-hip" cx="415" cy="494" r="11"/>
        <circle className="hs-knee" cx="440" cy="705" r="12"/>
        <path className="hs-tibia" d="M445 718Q454 799 456 878"/>
        <path className="hs-fibula" d="M427 718Q418 798 418 875"/>
        <path className="hs-foot" d="M458 878Q443 895 406 890Q399 900 410 910Q444 915 468 900Z"/>
      </g>
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
