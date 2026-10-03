import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./flowerReproductionProcess.css";

const STEPS = [
  {
    title:"1. Pollination",
    text:"Pollen is transferred from an anther to a stigma. Self-pollination occurs within the same plant. Cross-pollination occurs between different plants of the same species.",
  },
  {
    title:"2. Pollen tube growth",
    text:"A compatible pollen grain germinates on the stigma and grows a pollen tube down through the style towards an ovule.",
  },
  {
    title:"3. Fertilisation",
    text:"The male nucleus travels down the pollen tube and fuses with the female nucleus in the ovule. The fertilised cell is a zygote.",
  },
  {
    title:"4. Seed and fruit formation",
    text:"After fertilisation, the ovule develops into a seed and the ovary develops into a fruit.",
  },
];

function ProcessDiagram({ step }) {
  return (
    <ReviewedScienceDiagram site="FlowerReproductionProcess.jsx:25"><svg viewBox="0 0 900 520" role="img" aria-label={"Flower reproduction step " + (step + 1)}>
      <path className="frp-petal left" d="M470 320 C350 310 270 235 295 120 C390 140 455 205 490 295Z" />
      <path className="frp-petal right" d="M530 320 C650 310 730 235 705 120 C610 140 545 205 510 295Z" />
      <path className="frp-sepal left" d="M460 345 C380 355 335 335 310 295 C380 290 430 310 470 330Z" />
      <path className="frp-sepal right" d="M540 345 C620 355 665 335 690 295 C620 290 570 310 530 330Z" />
      <ellipse className="frp-ovary" cx="500" cy="385" rx="95" ry="75" />
      <ellipse className="frp-ovule" cx="475" cy="385" rx="24" ry="31" />
      <ellipse className="frp-ovule" cx="530" cy="385" rx="24" ry="31" />
      <path className="frp-style" d="M487 325V145Q500 120 513 145V325Z" />
      <path className="frp-stigma" d="M460 128Q500 92 540 128Q520 151 500 147Q480 151 460 128Z" />
      <g className="frp-stamens">
        <path d="M430 320Q390 245 390 185M570 320Q610 245 610 185" />
        <ellipse cx="390" cy="172" rx="33" ry="14" />
        <ellipse cx="610" cy="172" rx="33" ry="14" />
      </g>

      {step >= 0 && (
        <g className="frp-pollen">
          <circle cx="445" cy="108" r="10" /><circle cx="470" cy="100" r="10" />
          <circle cx="495" cy="107" r="10" />
          <path className="frp-pollen-arrow" d="M390 155Q415 115 455 110" />
        </g>
      )}

      {step >= 1 && <path className="frp-pollen-tube" d="M492 120Q505 200 500 295Q500 335 485 362" />}
      {step >= 2 && (
        <>
          <circle className="frp-male-nucleus" cx="485" cy="362" r="10" />
          <circle className="frp-female-nucleus" cx="475" cy="385" r="10" />
          <circle className="frp-zygote" cx="475" cy="385" r="18" />
        </>
      )}
      {step >= 3 && (
        <>
          <path className="frp-fruit-outline" d="M395 385Q400 300 500 290Q600 300 605 385Q595 485 500 500Q405 485 395 385Z" />
          <ellipse className="frp-seed" cx="465" cy="395" rx="28" ry="38" />
          <ellipse className="frp-seed" cx="535" cy="395" rx="28" ry="38" />
        </>
      )}

      <text className="frp-label" x="90" y="95">{STEPS[step].title}</text>
      <text className="frp-small" x="90" y="125">
        {step === 0 ? "pollen reaches stigma" : step === 1 ? "tube grows down style" : step === 2 ? "nuclei fuse in ovule" : "ovule to seed, ovary to fruit"}
      </text>
    </svg></ReviewedScienceDiagram>
  );
}

const POLLINATION = {
  insect:[
    "Large or brightly coloured petals attract insects.",
    "Scent and nectar attract and reward pollinators.",
    "Pollen is often sticky or spiky and produced in smaller amounts.",
    "The stigma is usually sticky and held inside the flower.",
  ],
  wind:[
    "Petals are usually small and dull.",
    "There is usually no scent or nectar.",
    "Large quantities of light, smooth pollen are produced.",
    "Anthers and feathery stigmas are exposed to the air.",
  ],
};

function PollinationComparisonDiagram({agent}) {
  const insect=agent==="insect";
  return (
    <ReviewedScienceDiagram site="FlowerReproductionProcess.jsx:91"><svg className={"spark-pollination-structure-svg "+agent} viewBox="0 0 900 420" role="img" aria-label={insect?"Insect-pollinated flower showing large petals, enclosed anthers, sticky stigma and relatively few larger pollen grains":"Wind-pollinated flower showing small petals, exposed dangling anthers, feathery stigma and many small light pollen grains"}>
      <g className="pc-flower" transform="translate(450 225)">
        {insect ? <>
          <path className="pc-petal large left" d="M-20 15Q-170 5-205-115Q-70-105-8-35Z"/>
          <path className="pc-petal large right" d="M20 15Q170 5 205-115Q70-105 8-35Z"/>
          <path className="pc-petal large upper" d="M-55-30Q0-180 55-30Q24 15 0 22Q-24 15-55-30Z"/>
        </> : <>
          <path className="pc-petal small left" d="M-18 15Q-80 5-92-42Q-40-40-6-20Z"/>
          <path className="pc-petal small right" d="M18 15Q80 5 92-42Q40-40 6-20Z"/>
        </>}

        <path className="pc-sepal" d="M-70 35Q0 5 70 35Q55 80 0 88Q-55 80-70 35Z"/>
        <ellipse className="pc-ovary" cx="0" cy="92" rx="58" ry="43"/>
        <path className="pc-style" d="M-8 70V-72H8V70Z"/>

        {insect ? (
          <>
            <path className="pc-stigma sticky" d="M-34-82Q0-116 34-82Q18-62 0-65Q-18-62-34-82Z"/>
            <g className="pc-stamens enclosed">
              <path d="M-75 50Q-55-15-52-58M75 50Q55-15 52-58"/>
              <ellipse cx="-52" cy="-66" rx="25" ry="10"/><ellipse cx="52" cy="-66" rx="25" ry="10"/>
            </g>
          </>
        ) : (
          <>
            <g className="pc-stigma feathery">
              <path d="M0-75V-132M0-112L-35-142M0-112L35-142M0-95L-42-112M0-95L42-112"/>
            </g>
            <g className="pc-stamens exposed">
              <path d="M-70 35Q-105-10-120-78M70 35Q105-10 120-78"/>
              <ellipse cx="-120" cy="-87" rx="30" ry="12" transform="rotate(-12 -120 -87)"/>
              <ellipse cx="120" cy="-87" rx="30" ry="12" transform="rotate(12 120 -87)"/>
            </g>
          </>
        )}
      </g>

      <g className="pc-pollen-cloud">
        {Array.from({length:insect?8:30},(_,i)=>{
          const x=90+(i*73)%720;
          const y=80+((i*47)%190);
          return <circle key={i} className={insect?"pc-pollen large":"pc-pollen small"} cx={x} cy={y} r={insect?7:3.5}/>;
        })}
      </g>

      <g className="pc-callouts">
        {insect ? <>
          <text x="70" y="55">large, conspicuous petals</text>
          <text x="650" y="70">sticky stigma</text>
          <text x="650" y="110">anthers usually held inside flower</text>
          <text x="70" y="355">fewer, larger sticky or spiky pollen grains</text>
        </> : <>
          <text x="70" y="55">small, inconspicuous petals</text>
          <text x="650" y="70">large feathery stigma exposed to air</text>
          <text x="650" y="110">anthers hang outside flower</text>
          <text x="70" y="355">many small, light, smooth pollen grains</text>
        </>}
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

export default function FlowerReproductionProcess() {
  const [step,setStep] = useState(0);
  const [agent,setAgent] = useState("insect");

  return (
    <section className="spark-flower-process">
      <header>
        <span>PROCESS MODEL</span>
        <h3>From pollination to seed and fruit</h3>
        <p>Move through the sequence, then compare flower features associated with insect and wind pollination.</p>
      </header>

      <div className="spark-flower-process-grid">
        <div>
          <div className="spark-flower-stage">
            <ProcessDiagram step={step} />
          </div>
          <div className="spark-flower-step-controls">
            {STEPS.map((item,index) => (
              <button type="button" key={item.title} className={step === index ? "active" : ""} onClick={() => setStep(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <aside className="spark-flower-step-note">
          <strong>{STEPS[step].title}</strong>
          <p>{STEPS[step].text}</p>
          <div className="spark-flower-sequence">
            <span>pollination</span><b>→</b><span>fertilisation</span><b>→</b><span>seed formation</span><b>→</b><span>germination</span>
          </div>
        </aside>
      </div>

      <div className="spark-pollination-compare">
        <div className="spark-pollination-tabs">
          <button type="button" className={agent === "insect" ? "active" : ""} onClick={() => setAgent("insect")}>Insect-pollinated</button>
          <button type="button" className={agent === "wind" ? "active" : ""} onClick={() => setAgent("wind")}>Wind-pollinated</button>
        </div>
        <PollinationComparisonDiagram agent={agent}/>
        <ul>{POLLINATION[agent].map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  );
}
