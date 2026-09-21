import React, { useState } from "react";
import "./eyeFunctionExplorer.css";

function AccommodationScene({mode}) {
  const near = mode === "near";
  return (
    <svg viewBox="0 0 940 520" role="img" aria-label={near ? "Accommodation for a near object" : "Accommodation for a distant object"}>
      <text className="ef-heading" x="470" y="45" textAnchor="middle">{near ? "Near object" : "Distant object"}</text>

      <g className="ef-anatomical-eye" transform="translate(45 72)">
        <path className="ef-sclera" d="M278 91Q385 28 523 60Q651 91 707 195Q752 278 710 352Q653 451 520 466Q383 481 278 404Q211 355 205 282Q199 176 278 91Z" />
        <path className="ef-vitreous" d="M350 116Q440 75 541 94Q634 112 682 194Q718 257 687 321Q645 407 538 424Q430 442 345 386Q292 351 286 286Q280 188 350 116Z" />
        <path className="ef-choroid" d="M365 119Q462 76 560 107Q642 132 679 205Q699 246 690 290Q674 361 605 397" />
        <path className="ef-retina" d="M382 133Q466 98 551 121Q619 141 651 200Q670 235 662 277Q649 334 594 367" />

        <path className="ef-cornea" d="M280 120Q210 165 210 250Q210 333 280 382Q252 337 252 251Q252 164 280 120Z" />
        <path className="ef-aqueous" d="M282 139Q247 184 246 251Q247 318 282 362Q270 316 270 251Q270 186 282 139Z" />

        <path className="ef-ciliary" d="M294 132Q334 111 378 123M294 370Q334 391 378 379" />
        <path className={near ? "ef-ligament slack" : "ef-ligament tight"} d="M322 146L355 184M340 135L365 181M322 356L355 318M340 367L365 321" />

        <path className={near ? "ef-lens near" : "ef-lens distant"} d={near
          ? "M355 251Q375 175 405 174Q437 176 458 251Q437 326 405 328Q375 326 355 251Z"
          : "M365 251Q381 183 405 182Q430 184 445 251Q430 318 405 320Q381 318 365 251Z"} />

        <path className="ef-iris" d="M309 164Q337 194 338 251Q337 308 309 338" />
        <ellipse className="ef-pupil-small" cx="320" cy="251" rx="10" ry="27" />

        <path className="ef-optic-nerve" d="M659 239Q737 235 814 273L806 326Q735 293 656 290Z" />
        <circle className="ef-focus" cx="640" cy="251" r="8" />

        {near ? (
          <path className="ef-light" d="M20 145L322 214M20 357L322 288M322 214L640 251M322 288L640 251" />
        ) : (
          <path className="ef-light" d="M10 202H322M10 300H322M322 202L640 251M322 300L640 251" />
        )}
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
