import React, { useState } from "react";
import "./eyeFunctionExplorer.css";

function AccommodationScene({mode}) {
  const near = mode === "near";
  return (
    <svg viewBox="0 0 940 520" role="img" aria-label={near ? "Accommodation for a near object" : "Accommodation for a distant object"}>
      <text className="ef-heading" x="470" y="45" textAnchor="middle">{near ? "Near object" : "Distant object"}</text>
      <g transform="translate(120 90)">
        <circle className="ef-eye-outline" cx="360" cy="200" r="160" />
        <path className="ef-cornea" d="M205 150Q145 200 205 250" />
        <ellipse className={near ? "ef-lens near" : "ef-lens distant"} cx="285" cy="200" rx={near ? 58 : 40} ry={near ? 78 : 92} />
        <path className="ef-ciliary" d="M225 115Q285 80 345 115M225 285Q285 320 345 285" />
        <path className={near ? "ef-ligament slack" : "ef-ligament tight"} d="M245 130L270 150M245 270L270 250M330 135L305 155M330 265L305 245" />
        <path className="ef-retina" d="M455 92Q520 145 520 200Q520 255 455 308" />
        <path className="ef-light" d={near ? "M30 135L245 185M30 265L245 215M245 185L470 200M245 215L470 200" : "M15 165H250M15 235H250M250 165L470 200M250 235L470 200"} />
        <circle className="ef-focus" cx="470" cy="200" r="8" />
      </g>
      <text className="ef-label" x="200" y="455">{near ? "ciliary muscles contract" : "ciliary muscles relax"}</text>
      <text className="ef-label" x="470" y="455">{near ? "ligaments slacken" : "ligaments tighten"}</text>
      <text className="ef-label" x="720" y="455">{near ? "lens becomes more convex" : "lens becomes thinner"}</text>
      <text className="ef-small" x="470" y="495" textAnchor="middle">light is focused on the retina</text>
    </svg>
  );
}

function PupilScene({light}) {
  const bright = light === "bright";
  return (
    <svg viewBox="0 0 940 500" role="img" aria-label={bright ? "Pupil response in bright light" : "Pupil response in dim light"}>
      <circle className="ef-iris" cx="470" cy="245" r="155" />
      <circle className="ef-pupil" cx="470" cy="245" r={bright ? 42 : 92} />
      <g className="ef-light-rays">
        {[180,250,320,620,690,760].map(x => <line key={x} x1={x} y1="75" x2={x+(x<470?80:-80)} y2="165" />)}
      </g>
      <text className="ef-heading" x="470" y="45" textAnchor="middle">{bright ? "Bright light" : "Dim light"}</text>
      <text className="ef-label" x="470" y="445" textAnchor="middle">{bright ? "circular iris muscles contract, pupil becomes smaller" : "radial iris muscles contract, pupil becomes larger"}</text>
      <text className="ef-small" x="470" y="475" textAnchor="middle">{bright ? "less light reaches the retina" : "more light enters the eye"}</text>
    </svg>
  );
}

export default function EyeFunctionExplorer() {
  const [view,setView] = useState("accommodation");
  const [focus,setFocus] = useState("near");
  const [light,setLight] = useState("bright");

  return (
    <section className="spark-eye-function">
      <header>
        <span>EYE FUNCTION</span>
        <h3>Accommodation and pupil response</h3>
        <p>Explore how the eye changes lens shape to focus and pupil size to control the amount of light entering.</p>
      </header>

      <div className="spark-eye-function-tabs">
        <button type="button" className={view==="accommodation"?"active":""} onClick={()=>setView("accommodation")}>Accommodation</button>
        <button type="button" className={view==="pupil"?"active":""} onClick={()=>setView("pupil")}>Pupil response</button>
      </div>

      {view === "accommodation" ? (
        <>
          <div className="spark-eye-function-toggle">
            <button type="button" className={focus==="near"?"active":""} onClick={()=>setFocus("near")}>Near object</button>
            <button type="button" className={focus==="distant"?"active":""} onClick={()=>setFocus("distant")}>Distant object</button>
          </div>
          <div className="spark-eye-function-stage"><AccommodationScene mode={focus} /></div>
        </>
      ) : (
        <>
          <div className="spark-eye-function-toggle">
            <button type="button" className={light==="bright"?"active":""} onClick={()=>setLight("bright")}>Bright light</button>
            <button type="button" className={light==="dim"?"active":""} onClick={()=>setLight("dim")}>Dim light</button>
          </div>
          <div className="spark-eye-function-stage"><PupilScene light={light} /></div>
        </>
      )}

      <div className="spark-eye-function-note">
        <strong>Image on the retina</strong>
        <span>The cornea provides most of the eye's refraction. The lens fine-tunes focus. The image formed on the retina is real, inverted and smaller than the object.</span>
      </div>
    </section>
  );
}
