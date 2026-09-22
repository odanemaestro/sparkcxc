import React, { useState } from "react";
import "./eyeFunctionExplorer.css";

function AccommodationScene({mode}) {
  const near = mode === "near";
  return (
    <div className="spark-eye-reference-view">
      <figure className="spark-eye-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Accommodation-far-point-near-point.svg"
          alt="Scientific diagram comparing accommodation of the human eye for a far point and a near point"
          loading="lazy"
        />
        <figcaption>
          <span>Accommodation: far point and near point</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Accommodation-far-point-near-point.svg" target="_blank" rel="noreferrer">MikeRun</a>
            {" · "}CC BY-SA 4.0
          </small>
        </figcaption>
      </figure>
      <article className="spark-eye-reference-note" role="status">
        <strong>{near ? "Near object" : "Distant object"}</strong>
        <p>{near
          ? "For a near object, the ciliary muscles contract, the suspensory ligaments slacken and the lens becomes thicker or more convex so light is focused on the retina."
          : "For a distant object, the ciliary muscles relax, the suspensory ligaments tighten and the lens becomes thinner so light is focused on the retina."}</p>
      </article>
    </div>
  );
}

function PupilScene({light}) {
  const bright = light === "bright";
  return (
    <div className="spark-pupil-reference-view">
      <figure className="spark-pupil-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Pupillary_light_reflex.jpg"
          alt="Photographs of a human eye in bright and dim lighting showing pupil constriction and dilation"
          loading="lazy"
        />
        <figcaption>
          <span>Pupillary response in bright and dim light</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Pupillary_light_reflex.jpg" target="_blank" rel="noreferrer">Rapidreflex</a>
            {" · "}CC BY-SA 4.0
          </small>
        </figcaption>
      </figure>
      <article className="spark-eye-reference-note" role="status">
        <strong>{bright ? "Bright light" : "Dim light"}</strong>
        <p>{bright
          ? "In bright light, circular muscles of the iris contract and the pupil becomes smaller, reducing the amount of light reaching the retina."
          : "In dim light, radial muscles of the iris contract and the pupil becomes larger, allowing more light to enter the eye."}</p>
      </article>
    </div>
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
