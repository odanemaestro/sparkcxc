import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./vegetativePropagationExplorer.css";

const NATURAL = [
  { id:"bulb", title:"Bulb", example:"Onion" },
  { id:"corm", title:"Corm", example:"Dasheen / eddoe" },
  { id:"rhizome", title:"Rhizome", example:"Ginger" },
  { id:"runner", title:"Runner", example:"Strawberry / grass" },
  { id:"tuber", title:"Tuber", example:"Irish potato" },
];

const ARTIFICIAL = [
  { id:"cutting", title:"Stem cutting", example:"Sugar cane" },
  { id:"grafting", title:"Grafting", example:"Citrus / mango" },
  { id:"budding", title:"Budding", example:"Citrus" },
  { id:"tissue", title:"Tissue culture", example:"Banana" },
];

function Soil() {
  return <path className="vp-soil" d="M55 310 Q210 290 365 310 T675 310 T845 310 V410 H55 Z" />;
}

function Bulb() {
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:25"><svg viewBox="0 0 900 450" role="img" aria-label="Onion bulb">
      <Soil />
      <g className="vp-plant">
        <path className="leaf" d="M450 310 C410 220 415 105 440 45 C470 150 478 235 460 310" />
        <path className="leaf" d="M458 310 C495 215 520 120 515 55 C475 145 455 230 450 310" />
        <path className="bulb-layer" d="M350 322 Q450 220 550 322 Q535 390 450 405 Q365 390 350 322Z" />
        <path className="bulb-layer inner" d="M385 322 Q450 255 515 322 Q500 367 450 378 Q400 367 385 322Z" />
        <rect className="stem-disc" x="405" y="315" width="90" height="18" rx="8" />
        <g className="roots">
          <path d="M420 335 Q380 375 360 425" /><path d="M445 335 Q430 390 425 435" />
          <path d="M470 335 Q490 390 500 435" /><path d="M490 335 Q535 380 555 420" />
        </g>
      </g>
      <text className="vp-label" x="115" y="105">fleshy storage leaves</text><path className="vp-leader" d="M300 105L395 285" />
      <text className="vp-label" x="650" y="250">short stem</text><path className="vp-leader" d="M635 248L495 323" />
      <text className="vp-example" x="450" y="430" textAnchor="middle">Bulb, onion</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Corm() {
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:47"><svg viewBox="0 0 900 450" role="img" aria-label="Dasheen corm">
      <Soil />
      <g className="vp-plant">
        <path className="leaf" d="M450 295 C405 205 375 125 400 55 C445 140 462 215 460 300" />
        <path className="leaf" d="M458 295 C500 205 555 135 535 60 C485 145 465 220 455 300" />
        <ellipse className="corm-body" cx="455" cy="340" rx="100" ry="70" />
        <path className="corm-ring" d="M370 320 Q455 350 540 320 M365 347 Q455 375 545 347" />
        <circle className="bud" cx="430" cy="286" r="13" />
        <g className="roots">
          <path d="M390 375Q350 405 330 435"/><path d="M430 395Q420 420 410 440"/>
          <path d="M485 395Q500 420 510 440"/><path d="M525 375Q565 405 585 435"/>
        </g>
      </g>
      <text className="vp-label" x="105" y="240">swollen solid stem</text><path className="vp-leader" d="M300 240L375 330" />
      <text className="vp-label" x="650" y="175">bud for new shoot</text><path className="vp-leader" d="M635 175L440 286" />
      <text className="vp-example" x="455" y="430" textAnchor="middle">Corm, dasheen / eddoe</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Rhizome() {
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:69"><svg viewBox="0 0 900 450" role="img" aria-label="Ginger rhizome">
      <Soil />
      <g className="vp-plant">
        <path className="rhizome" d="M205 335 C265 290 330 310 385 330 C440 285 520 300 555 335 C610 300 680 315 700 350 C650 385 585 375 535 355 C480 390 410 375 370 350 C305 382 245 372 205 335Z" />
        <circle className="bud" cx="330" cy="316" r="12" /><circle className="bud" cx="545" cy="320" r="12" />
        <path className="shoot" d="M330 315 C310 250 310 165 345 80 C360 175 355 250 340 315" />
        <path className="shoot" d="M545 320 C565 250 585 190 620 120 C610 220 585 275 555 325" />
        <g className="roots">
          <path d="M260 355Q245 400 235 435"/><path d="M395 355Q390 400 380 438"/>
          <path d="M575 355Q580 400 590 438"/><path d="M660 355Q685 400 700 432"/>
        </g>
      </g>
      <text className="vp-label" x="100" y="210">horizontal underground stem</text><path className="vp-leader" d="M325 210L350 335" />
      <text className="vp-label" x="640" y="90">new shoot from a bud</text><path className="vp-leader" d="M630 105L555 315" />
      <text className="vp-example" x="450" y="430" textAnchor="middle">Rhizome, ginger</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Runner() {
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:90"><svg viewBox="0 0 900 450" role="img" aria-label="Runner connecting parent and daughter plants">
      <Soil />
      <g className="vp-plant">
        <path className="stem" d="M210 315 C320 260 490 290 675 315" />
        <g transform="translate(175 0)">
          <path className="leaf" d="M50 310 C15 250 20 170 65 125 C75 200 75 260 60 315" />
          <path className="leaf" d="M60 310 C100 245 120 180 105 130 C75 205 60 260 55 315" />
          <g className="roots"><path d="M45 320Q20 380 10 430"/><path d="M70 320Q85 380 95 430"/></g>
        </g>
        <g transform="translate(600 0)">
          <path className="leaf" d="M50 310 C20 255 25 205 60 165 C70 220 70 265 60 315" />
          <path className="leaf" d="M60 310 C90 260 110 215 95 170 C70 225 60 270 55 315" />
          <g className="roots"><path d="M45 320Q20 380 10 430"/><path d="M70 320Q85 380 95 430"/></g>
        </g>
        <circle className="node" cx="655" cy="315" r="12" />
      </g>
      <text className="vp-label" x="360" y="175">runner grows across soil surface</text><path className="vp-leader" d="M495 185L450 285" />
      <text className="vp-label" x="665" y="110">new plant forms at a node</text><path className="vp-leader" d="M690 125L655 300" />
      <text className="vp-example" x="450" y="430" textAnchor="middle">Runner, strawberry / grass</text>
    </svg></ReviewedScienceDiagram>
  );
}

function Tuber() {
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:115"><svg viewBox="0 0 900 450" role="img" aria-label="Potato stem tuber">
      <Soil />
      <g className="vp-plant">
        <path className="shoot" d="M450 305 C430 215 420 125 455 55 C475 155 475 235 458 310" />
        <path className="underground-stem" d="M450 320 Q550 330 620 365" />
        <ellipse className="tuber" cx="665" cy="370" rx="90" ry="55" transform="rotate(-8 665 370)" />
        <circle className="bud" cx="620" cy="350" r="10" /><circle className="bud" cx="685" cy="350" r="10" /><circle className="bud" cx="710" cy="390" r="10" />
        <g className="roots"><path d="M425 325Q365 380 340 430"/><path d="M470 325Q490 390 500 435"/></g>
      </g>
      <text className="vp-label" x="650" y="165">eyes are buds</text><path className="vp-leader" d="M665 180L685 340" />
      <text className="vp-label" x="115" y="225">swollen food-storage stem</text><path className="vp-leader" d="M330 225L620 360" />
      <text className="vp-example" x="450" y="430" textAnchor="middle">Tuber, Irish potato</text>
    </svg></ReviewedScienceDiagram>
  );
}

function NaturalDiagram({ id }) {
  if (id === "bulb") return <Bulb />;
  if (id === "corm") return <Corm />;
  if (id === "rhizome") return <Rhizome />;
  if (id === "runner") return <Runner />;
  return <Tuber />;
}

function ArtificialDiagram({ id }) {
  if (id === "cutting") {
    return (
      <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:142"><svg viewBox="0 0 900 450" role="img" aria-label="Stem cutting propagation">
        <Soil />
        <path className="cutting-stem" d="M450 330L450 100" />
        <path className="leaf" d="M450 160Q360 120 330 180Q395 205 450 175" />
        <path className="leaf" d="M450 215Q540 165 575 225Q515 255 450 230" />
        <g className="roots"><path d="M445 330Q390 375 375 430"/><path d="M455 330Q510 375 525 430"/></g>
        <text className="vp-label" x="95" y="100">piece of parent stem</text><path className="vp-leader" d="M300 105L445 140" />
        <text className="vp-label" x="650" y="350">new roots form</text><path className="vp-leader" d="M635 350L520 390" />
        <text className="vp-example" x="450" y="430" textAnchor="middle">Stem cutting, sugar cane</text>
      </svg></ReviewedScienceDiagram>
    );
  }
  if (id === "grafting" || id === "budding") {
    const budding = id === "budding";
    return (
      <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:157"><svg viewBox="0 0 900 450" role="img" aria-label={budding ? "Budding propagation" : "Grafting propagation"}>
        <Soil />
        <path className="rootstock" d="M470 330L470 120" />
        <g className="roots"><path d="M455 330Q400 380 390 430"/><path d="M485 330Q540 380 550 430"/></g>
        {budding ? (
          <>
            <path className="bud-piece" d="M460 210Q420 185 390 215Q425 240 460 220Z" />
            <path className="join" d="M458 195L480 232" />
            <text className="vp-label" x="95" y="190">bud from desired variety</text><path className="vp-leader" d="M330 190L405 210" />
          </>
        ) : (
          <>
            <path className="scion" d="M470 150L570 65M525 105L590 125" />
            <path className="join" d="M450 150L490 170" />
            <text className="vp-label" x="650" y="80">scion from desired variety</text><path className="vp-leader" d="M640 85L555 80" />
          </>
        )}
        <text className="vp-label" x="110" y="315">rootstock</text><path className="vp-leader" d="M250 310L455 290" />
        <text className="vp-label" x="650" y="260">join is tied and sealed</text><path className="vp-leader" d="M635 260L485 170" />
        <text className="vp-example" x="450" y="430" textAnchor="middle">{budding ? "Budding, citrus" : "Grafting, citrus / mango"}</text>
      </svg></ReviewedScienceDiagram>
    );
  }
  return (
    <ReviewedScienceDiagram site="VegetativePropagationExplorer.jsx:181"><svg viewBox="0 0 900 450" role="img" aria-label="Tissue culture stages">
      <g className="culture-stage">
        <circle cx="130" cy="210" r="75" /><text x="130" y="195" textAnchor="middle">small piece</text><text x="130" y="225" textAnchor="middle">of tissue</text>
        <circle cx="355" cy="210" r="75" /><text x="355" y="195" textAnchor="middle">sterile nutrient</text><text x="355" y="225" textAnchor="middle">medium</text>
        <circle cx="580" cy="210" r="75" /><text x="580" y="195" textAnchor="middle">many small</text><text x="580" y="225" textAnchor="middle">plantlets</text>
        <circle cx="805" cy="210" r="75" /><text x="805" y="195" textAnchor="middle">identical</text><text x="805" y="225" textAnchor="middle">plants</text>
      </g>
      <path className="vp-arrow" d="M210 210H270M435 210H495M660 210H720" />
      <path className="vp-example-line" d="M760 330Q805 275 850 330" />
      <text className="vp-example" x="450" y="395" textAnchor="middle">Tissue culture, banana</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function VegetativePropagationExplorer() {
  const [group, setGroup] = useState("natural");
  const items = group === "natural" ? NATURAL : ARTIFICIAL;
  const [naturalId, setNaturalId] = useState("bulb");
  const [artificialId, setArtificialId] = useState("cutting");
  const id = group === "natural" ? naturalId : artificialId;
  const selected = items.find(item => item.id === id) || items[0];

  return (
    <section className="spark-vp-explorer">
      <header>
        <span>PROPAGATION VISUALS</span>
        <h3>Vegetative propagation in plants</h3>
        <p>Compare natural storage and spreading structures with methods carried out by farmers and growers.</p>
      </header>

      <div className="spark-vp-group-tabs">
        <button type="button" className={group === "natural" ? "active" : ""} onClick={() => setGroup("natural")}>Natural methods</button>
        <button type="button" className={group === "artificial" ? "active" : ""} onClick={() => setGroup("artificial")}>Artificial methods</button>
      </div>

      <div className="spark-vp-method-tabs">
        {items.map(item => (
          <button
            type="button"
            key={item.id}
            className={item.id === id ? "active" : ""}
            onClick={() => group === "natural" ? setNaturalId(item.id) : setArtificialId(item.id)}
          >
            <strong>{item.title}</strong>
            <span>{item.example}</span>
          </button>
        ))}
      </div>

      <div className="spark-vp-stage">
        {group === "natural" ? <NaturalDiagram id={id} /> : <ArtificialDiagram id={id} />}
      </div>

      <div className="spark-vp-caption">
        <strong>{selected.title}</strong>
        <span>{selected.example}</span>
      </div>
    </section>
  );
}
