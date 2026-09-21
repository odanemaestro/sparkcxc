import React,{useMemo,useState} from "react";
import "./skeletalMuscleMovementExplorer.css";

function ArmView(){
  const [motion,setMotion]=useState("bend");
  const bend=motion==="bend";
  return <div className="spark-muscle-arm">
    <div className="spark-muscle-toggle">
      <button type="button" className={bend?"active":""} onClick={()=>setMotion("bend")}>Bend elbow</button>
      <button type="button" className={!bend?"active":""} onClick={()=>setMotion("straighten")}>Straighten elbow</button>
    </div>
    <svg viewBox="0 0 820 470" role="img" aria-label={bend?"Arm bending with biceps contracted and triceps relaxed":"Arm straightening with triceps contracted and biceps relaxed"}>
      <path className="sm-scapula" d="M180 105Q225 80 265 105Q280 140 255 180Q220 200 185 170Q165 140 180 105Z"/>
      <circle className="sm-shoulder" cx="245" cy="155" r="31"/>

      <path className="sm-bone humerus" d="M258 172Q320 205 397 264"/>
      <circle className="sm-elbow" cx="410" cy="275" r="20"/>

      {bend?<>
        <path className="sm-bone radius" d="M424 267Q461 211 513 132"/>
        <path className="sm-bone ulna" d="M438 278Q474 225 528 145"/>
        <circle className="sm-wrist" cx="523" cy="137" r="16"/>

        <path className="sm-muscle biceps active" d="M265 166Q322 143 383 226Q394 244 382 256Q348 268 310 236Q282 211 265 166Z"/>
        <path className="sm-tendon biceps active" d="M382 249Q401 260 421 260"/>
        <path className="sm-muscle triceps" d="M270 190Q323 205 393 268Q365 292 328 270Q292 244 270 190Z"/>
        <path className="sm-tendon triceps" d="M392 269Q405 281 418 292"/>

        <text className="sm-label" x="315" y="128">biceps contracts</text>
        <text className="sm-label" x="285" y="320">triceps relaxes</text>
      </>:<>
        <path className="sm-bone radius" d="M428 282Q518 293 624 306"/>
        <path className="sm-bone ulna" d="M428 268Q520 276 626 289"/>
        <circle className="sm-wrist" cx="625" cy="298" r="16"/>

        <path className="sm-muscle biceps" d="M266 165Q323 157 390 237Q395 249 386 260Q349 262 310 236Q282 211 266 165Z"/>
        <path className="sm-tendon biceps" d="M386 253Q402 265 421 267"/>
        <path className="sm-muscle triceps active" d="M269 191Q323 200 397 268Q371 300 329 279Q291 251 269 191Z"/>
        <path className="sm-tendon triceps active" d="M396 270Q409 282 423 293"/>

        <text className="sm-label" x="310" y="132">biceps relaxes</text>
        <text className="sm-label" x="285" y="325">triceps contracts</text>
      </>}

      <text className="sm-label" x="421" y="345">elbow hinge joint</text>
      <text className="sm-small" x="540" y="405" textAnchor="middle">muscles pull through tendons; they do not actively push</text>
    </svg>
    <p>{bend?"The biceps shortens and pulls the forearm upward while the triceps relaxes.":"The triceps shortens and pulls to extend the forearm while the biceps relaxes."}</p>
  </div>;
}

function KneeView(){
  const [straight,setStraight]=useState(false);
  return <div className="spark-muscle-knee">
    <div className="spark-muscle-toggle">
      <button type="button" className={!straight?"active":""} onClick={()=>setStraight(false)}>Knee bent</button>
      <button type="button" className={straight?"active":""} onClick={()=>setStraight(true)}>Straighten knee</button>
    </div>
    <svg className="spark-knee-svg" viewBox="0 0 820 470" role="img" aria-label={straight?"Knee straightened by quadriceps contraction":"Knee flexed by hamstring contraction"}>
      <path className="sm-pelvis-fragment" d="M250 70Q320 40 390 82Q377 121 335 137Q284 130 250 70Z"/>
      <path className="sm-bone femur" d="M335 128Q365 215 392 285"/>
      <circle className="sm-knee-joint" cx="397" cy="294" r="24"/>
      <ellipse className="sm-patella" cx="382" cy="286" rx="13" ry="18"/>

      {straight?<>
        <path className="sm-bone tibia" d="M402 314Q407 382 412 441"/>
        <path className="sm-bone fibula" d="M426 315Q437 382 441 436"/>
        <path className="sm-muscle quadriceps active" d="M300 122Q338 104 370 145Q392 201 391 267Q358 281 329 248Q304 198 300 122Z"/>
        <path className="sm-tendon quadriceps active" d="M385 259Q389 280 397 294"/>
        <path className="sm-muscle hamstring" d="M352 133Q381 151 398 216Q406 257 402 278Q376 277 361 247Q346 196 352 133Z"/>
        <path className="sm-tendon hamstring" d="M401 276Q416 287 424 300"/>
      </>:<>
        <g transform="rotate(28 397 294)">
          <path className="sm-bone tibia" d="M402 314Q407 382 412 441"/>
          <path className="sm-bone fibula" d="M426 315Q437 382 441 436"/>
        </g>
        <path className="sm-muscle quadriceps" d="M300 122Q338 104 370 145Q392 201 391 267Q358 281 329 248Q304 198 300 122Z"/>
        <path className="sm-tendon quadriceps" d="M385 259Q389 280 397 294"/>
        <path className="sm-muscle hamstring active" d="M352 133Q381 151 398 216Q407 252 417 285Q389 294 367 257Q346 198 352 133Z"/>
        <path className="sm-tendon hamstring active" d="M414 281Q428 300 441 313"/>
      </>}

      <text className="sm-label" x="230" y="188">{straight?"quadriceps contracts":"quadriceps relaxes"}</text>
      <text className="sm-label" x="500" y="205">{straight?"hamstrings relax":"hamstrings contract"}</text>
      <text className="sm-label" x="505" y="310">knee hinge joint</text>
      <text className="sm-small" x="410" y="455" textAnchor="middle">{straight?"quadriceps extends the lower leg":"hamstrings flex the lower leg"}</text>
    </svg>
    <p>{straight?"The quadriceps contracts while the hamstrings relax to straighten the knee.":"Flexing the knee involves contraction of the hamstrings while the quadriceps relaxes."}</p>
  </div>;
}

function JointView(){
  const [joint,setJoint]=useState("hinge");
  const data={
    hinge:{title:"Hinge joint",places:"Elbow and knee",movement:"Mainly movement in one plane, like opening and closing a door."},
    ball:{title:"Ball-and-socket joint",places:"Shoulder and hip",movement:"Movement in many directions, including rotation."},
    fixed:{title:"Fixed joint",places:"Sutures between bones of the cranium",movement:"Little or no movement."},
    gliding:{title:"Gliding joint",places:"Between some vertebrae; also wrist and ankle regions",movement:"Small sliding movements between surfaces."}
  }[joint];
  return <div className="spark-joint-types">
    <div className="spark-muscle-toggle">{Object.keys(data).map(k=><button key={k} type="button" className={joint===k?"active":""} onClick={()=>setJoint(k)}>{data[k].title}</button>)}</div>
    <article><span>{data.title.toUpperCase()}</span><h4>{data.places}</h4><p>{data.movement}</p></article>
  </div>;
}

function AttachmentsView(){
  return <div className="spark-muscle-attachments">
    <article><span>TENDON</span><h4>Muscle to bone</h4><p>Tendons transmit the pull of a contracting muscle to a bone.</p></article>
    <article><span>LIGAMENT</span><h4>Bone to bone</h4><p>Ligaments connect bones across joints and help stabilise the joint.</p></article>
    <article><span>MUSCLES PULL</span><h4>They do not actively push</h4><p>Because skeletal muscles shorten when they contract, opposing movements usually require antagonistic muscle pairs.</p></article>
  </div>;
}

export default function SkeletalMuscleMovementExplorer(){
  const [view,setView]=useState("arm");
  const summary=useMemo(()=>({
    arm:"Biceps and triceps form an antagonistic pair controlling elbow flexion and extension.",
    knee:"Quadriceps and hamstrings act as an antagonistic pair at the knee.",
    joints:"Joint structure determines the directions of movement available.",
    attachments:"Tendons attach muscle to bone, while ligaments connect bone to bone."
  })[view],[view]);
  return <section className="spark-skeletal-muscle">
    <header><span>SKELETAL MUSCLES AND JOINTS</span><h3>Explain how muscles pull on bones to move limbs</h3><p>Skeletal muscles work across joints. Because muscles can pull but cannot actively push, opposite movements usually depend on antagonistic pairs.</p></header>
    <div className="spark-muscle-tabs">{[["arm","Biceps and triceps"],["knee","Knee movement"],["joints","Joint types"],["attachments","Tendons and ligaments"]].map(([k,l])=><button key={k} type="button" className={view===k?"active":""} onClick={()=>setView(k)}>{l}</button>)}</div>
    <div className="spark-muscle-stage">{view==="arm"&&<ArmView/>}{view==="knee"&&<KneeView/>}{view==="joints"&&<JointView/>}{view==="attachments"&&<AttachmentsView/>}</div>
    <div className="spark-muscle-summary"><strong>{summary}</strong><span>To bend the elbow: biceps contracts, triceps relaxes. To straighten it: triceps contracts, biceps relaxes.</span></div>
  </section>;
}
