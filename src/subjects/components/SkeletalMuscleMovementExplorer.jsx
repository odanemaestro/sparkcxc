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
    <svg viewBox="0 0 820 460" role="img" aria-label={bend?"Arm bending with biceps contracted and triceps relaxed":"Arm straightening with triceps contracted and biceps relaxed"}>
      <circle className="sm-shoulder" cx="230" cy="165" r="42"/>
      <line className="sm-bone humerus" x1="255" y1="185" x2="410" y2="275"/>
      <circle className="sm-elbow" cx="410" cy="275" r="22"/>
      {bend?<>
        <line className="sm-bone forearm" x1="425" y1="265" x2="520" y2="120"/>
        <path className="sm-muscle biceps active" d="M270 180Q345 170 395 250Q330 255 280 215Z"/>
        <path className="sm-muscle triceps" d="M275 215Q345 230 400 270Q335 285 285 255Z"/>
        <text className="sm-label" x="315" y="155">biceps contracts</text><text className="sm-label" x="300" y="305">triceps relaxes</text>
      </>:<>
        <line className="sm-bone forearm" x1="430" y1="280" x2="620" y2="300"/>
        <path className="sm-muscle biceps" d="M270 180Q345 190 395 250Q335 245 280 215Z"/>
        <path className="sm-muscle triceps active" d="M275 215Q345 220 405 270Q340 300 285 255Z"/>
        <text className="sm-label" x="310" y="155">biceps relaxes</text><text className="sm-label" x="300" y="315">triceps contracts</text>
      </>}
      <text className="sm-label" x="420" y="325">elbow hinge joint</text>
    </svg>
    <p>{bend?"The biceps shortens and pulls the forearm upward while the triceps relaxes.":"The triceps shortens and pulls to extend the forearm while the biceps relaxes."}</p>
  </div>;
}

function KneeView(){
  const [straight,setStraight]=useState(false);
  return <div className="spark-muscle-knee">
    <div className="spark-muscle-toggle"><button type="button" className={!straight?"active":""} onClick={()=>setStraight(false)}>Knee bent</button><button type="button" className={straight?"active":""} onClick={()=>setStraight(true)}>Straighten knee</button></div>
    <div className="spark-knee-model">
      <div className={"spark-thigh "+(straight?"straight":"")}>femur</div>
      <div className={"spark-lower-leg "+(straight?"straight":"")}>tibia</div>
      <div className={"spark-quadriceps "+(straight?"active":"")}>quadriceps</div>
      <div className={"spark-hamstring "+(!straight?"active":"")}>hamstring</div>
    </div>
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
