import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./sightDefectsExplorer.css";

const CONDITIONS = {
  myopia:{
    label:"Short sight",
    title:"Myopia",
    type:"refractive",
    note:"Distant objects are focused in front of the retina. A concave lens diverges incoming rays so the eye focuses them farther back, on the retina.",
  },
  hypermetropia:{
    label:"Long sight",
    title:"Hypermetropia",
    type:"refractive",
    note:"Near objects would be focused behind the retina. A convex lens converges incoming rays before they enter the eye so they focus on the retina.",
  },
  astigmatism:{
    label:"Astigmatism",
    title:"Astigmatism",
    type:"refractive",
    note:"Uneven curvature of the cornea or lens means light does not focus to one point. Corrective cylindrical or toric lenses compensate for the uneven focusing.",
  },
  cataract:{
    label:"Cataract",
    title:"Cataract",
    type:"condition",
    note:"The lens becomes cloudy, reducing the amount and quality of light reaching the retina. Treatment may involve surgical removal of the cloudy lens and replacement with an artificial lens.",
  },
  glaucoma:{
    label:"Glaucoma",
    title:"Glaucoma",
    type:"condition",
    note:"Glaucoma damages the optic nerve. Raised pressure inside the eye is an important risk factor in many forms, so early detection and treatment help reduce the risk of permanent vision loss.",
  },
  colour:{
    label:"Colour blindness",
    title:"Colour vision deficiency",
    type:"condition",
    note:"Inherited colour vision deficiencies result from altered cone function. Ordinary spectacle lenses do not restore normal colour discrimination.",
  },
};

function RayDiagram({condition}) {
  const myopia = condition === "myopia";
  return (
    <ReviewedScienceDiagram site="SightDefectsExplorer.jsx:46"><svg viewBox="0 0 980 500" role="img" aria-label={myopia ? "Short sight and concave lens correction" : "Long sight and convex lens correction"}>
      <text className="sd-heading" x="250" y="45" textAnchor="middle">Without correction</text>
      <text className="sd-heading" x="735" y="45" textAnchor="middle">With correction</text>

      <g transform="translate(40 70)">
        <circle className="sd-eye" cx="260" cy="185" r="130" />
        <ellipse className="sd-eye-lens" cx="190" cy="185" rx="36" ry="65" />
        <path className="sd-retina" d="M355 105Q395 145 395 185Q395 225 355 265" />
        {myopia ? (
          <>
            <path className="sd-ray" d="M0 135H155L320 185M0 235H155L320 185" />
            <circle className="sd-focus bad" cx="320" cy="185" r="8" />
            <text className="sd-small" x="260" y="350" textAnchor="middle">focus falls in front of retina</text>
          </>
        ) : (
          <>
            <path className="sd-ray" d="M0 135L155 165L450 185M0 235L155 205L450 185" />
            <circle className="sd-focus bad" cx="450" cy="185" r="8" />
            <text className="sd-small" x="260" y="350" textAnchor="middle">focus would fall behind retina</text>
          </>
        )}
      </g>

      <g transform="translate(525 70)">
        <path className={myopia ? "sd-corrective concave" : "sd-corrective convex"} d={myopia ? "M35 75Q70 185 35 295M95 75Q60 185 95 295" : "M35 75Q5 185 35 295M95 75Q125 185 95 295"} />
        <circle className="sd-eye" cx="260" cy="185" r="130" />
        <ellipse className="sd-eye-lens" cx="190" cy="185" rx="36" ry="65" />
        <path className="sd-retina" d="M355 105Q395 145 395 185Q395 225 355 265" />
        {myopia ? (
          <path className="sd-ray corrected" d="M0 135L95 125L155 145L375 185M0 235L95 245L155 225L375 185" />
        ) : (
          <path className="sd-ray corrected" d="M0 135L95 155L155 165L375 185M0 235L95 215L155 205L375 185" />
        )}
        <circle className="sd-focus good" cx="375" cy="185" r="8" />
        <text className="sd-small" x="260" y="350" textAnchor="middle">{myopia ? "concave lens moves focus onto retina" : "convex lens moves focus onto retina"}</text>
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

function ConditionScene({condition}) {
  if (condition === "cataract") {
    return (
      <ReviewedScienceDiagram site="SightDefectsExplorer.jsx:89"><svg viewBox="0 0 900 420" role="img" aria-label="Cataract showing a cloudy eye lens">
        <circle className="sd-eye large" cx="450" cy="210" r="155" />
        <ellipse className="sd-cloudy-lens" cx="390" cy="210" rx="70" ry="105" />
        <path className="sd-retina" d="M565 115Q610 165 610 210Q610 255 565 305" />
        <path className="sd-ray faint" d="M80 150H320M80 270H320" />
        <text className="sd-label" x="450" y="390" textAnchor="middle">cloudy lens reduces clear transmission of light</text>
      </svg></ReviewedScienceDiagram>
    );
  }
  if (condition === "glaucoma") {
    return (
      <ReviewedScienceDiagram site="SightDefectsExplorer.jsx:100"><svg viewBox="0 0 900 420" role="img" aria-label="Glaucoma showing pressure-related optic nerve damage">
        <circle className="sd-eye large" cx="400" cy="210" r="155" />
        <path className="sd-optic-nerve" d="M545 190Q665 185 790 225L775 285Q660 240 540 235Z" />
        <path className="sd-pressure" d="M260 145Q205 210 260 275M540 145Q595 210 540 275" />
        <path className="sd-damage" d="M625 205l45 50m0-50l-45 50" />
        <text className="sd-label" x="450" y="390" textAnchor="middle">optic nerve damage can cause permanent vision loss</text>
      </svg></ReviewedScienceDiagram>
    );
  }
  if (condition === "astigmatism") {
    return (
      <ReviewedScienceDiagram site="SightDefectsExplorer.jsx:111"><svg viewBox="0 0 900 420" role="img" aria-label="Astigmatism showing uneven corneal curvature and multiple focal planes">
        <path className="sd-cornea-uneven" d="M300 75Q195 210 300 345Q350 300 335 210Q355 120 300 75Z" />
        <ellipse className="sd-eye-lens" cx="405" cy="210" rx="50" ry="85" />
        <path className="sd-retina" d="M605 115Q655 165 655 210Q655 255 605 305" />
        <path className="sd-ray" d="M50 130L300 145L515 190M50 290L300 275L545 230M50 180L300 175L505 210M50 240L300 245L565 210" />
        <circle className="sd-focus bad" cx="515" cy="190" r="7" />
        <circle className="sd-focus bad" cx="545" cy="230" r="7" />
        <text className="sd-label" x="450" y="390" textAnchor="middle">uneven curvature prevents one sharp focus</text>
      </svg></ReviewedScienceDiagram>
    );
  }
  return (
    <ReviewedScienceDiagram site="SightDefectsExplorer.jsx:123"><svg viewBox="0 0 900 420" role="img" aria-label="Colour vision deficiency involving cone cells">
      <circle className="sd-retina-disc" cx="450" cy="200" r="145" />
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{
        const angle=(i/12)*Math.PI*2;
        const x=450+Math.cos(angle)*90;
        const y=200+Math.sin(angle)*90;
        return <circle key={i} className={i%3===0 ? "sd-cone altered" : "sd-cone"} cx={x} cy={y} r="18" />;
      })}
      <text className="sd-label" x="450" y="390" textAnchor="middle">altered cone function changes colour discrimination</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function SightDefectsExplorer() {
  const [condition,setCondition] = useState("myopia");
  const info = CONDITIONS[condition];

  return (
    <section className="spark-sight-defects">
      <header>
        <span>SIGHT DEFECTS AND EYE CONDITIONS</span>
        <h3>Focus problems are not all the same</h3>
        <p>Compare refractive defects with conditions that affect the lens, optic nerve or cone cells.</p>
      </header>

      <div className="spark-sight-tabs">
        {Object.entries(CONDITIONS).map(([key,item])=>(
          <button type="button" key={key} className={condition===key?"active":""} onClick={()=>setCondition(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-sight-stage">
        {info.type === "refractive" && condition !== "astigmatism" ? <RayDiagram condition={condition} /> : <ConditionScene condition={condition} />}
      </div>

      <div className="spark-sight-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>

      <div className="spark-sight-safety">
        <b>Eye safety</b>
        <span>Do not look directly at the Sun. Intense focused sunlight can permanently damage the retina.</span>
      </div>
    </section>
  );
}
