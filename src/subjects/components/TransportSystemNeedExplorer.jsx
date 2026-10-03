import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useMemo, useState } from "react";
import "./transportSystemNeedExplorer.css";

const CUBES = {
  1:{side:1,surfaceArea:6,volume:1,ratio:6},
  2:{side:2,surfaceArea:24,volume:8,ratio:3},
  3:{side:3,surfaceArea:54,volume:27,ratio:2},
};

const CONDITIONS = {
  baseline:{
    label:"Moderate conditions",
    note:"Moderate light, temperature, humidity and air movement give an intermediate water-uptake rate.",
    speed:"medium",
  },
  wind:{
    label:"Fan + bright light",
    note:"Moving air removes humid air from around the leaf and bright light usually keeps stomata open. Water loss and water uptake increase.",
    speed:"fast",
  },
  humidity:{
    label:"High humidity",
    note:"Humid air reduces the water-vapour concentration gradient between the leaf and the surrounding air. Transpiration slows.",
    speed:"slow",
  },
  dark:{
    label:"Dark cupboard",
    note:"In darkness, stomata usually close more, so less water vapour escapes and water uptake slows.",
    speed:"slow",
  },
  heat:{
    label:"Higher temperature",
    note:"Higher temperature increases evaporation from moist leaf surfaces and usually increases transpiration if water is available.",
    speed:"fast",
  },
};

function CubeScene({size,time}) {
  const selected = CUBES[size];
  const penetration = Number(time) * 12;

  return (
    <div className="spark-transport-need-cube-layout">
      <ReviewedScienceDiagram site="TransportSystemNeedExplorer.jsx:44"><svg viewBox="0 0 760 410" role="img" aria-label={"Agar cube diffusion model for a " + selected.side + " centimetre cube"}>
        <g className="tn-diffusion-legend" transform="translate(80 48)">
          <rect className="tn-penetrated-swatch" x="0" y="0" width="22" height="22" rx="4" />
          <text x="32" y="17">acid penetrated</text>
          <rect className="tn-core-swatch" x="190" y="0" width="22" height="22" rx="4" />
          <text x="222" y="17">undiffused core</text>
        </g>

        {[1,2,3].map((cube,index) => {
          const x = 80 + index*225;
          const side = 50 + cube*28;
          const y = 245-side/2;
          const active = Number(size) === cube;
          const inset = Math.min(side/2,penetration);
          const coreSide = Math.max(0,side-(inset*2));

          return (
            <g key={cube} className={active ? "tn-cube-group active" : "tn-cube-group"}>
              <rect className="tn-cube-front" x={x} y={y} width={side} height={side} />
              <path className="tn-cube-top" d={"M"+x+" "+y+"l28-24h"+side+"l-28 24Z"} />
              <path className="tn-cube-side" d={"M"+(x+side)+" "+y+"l28-24v"+side+"l-28 24Z"} />

              {coreSide > 2 && (
                <rect
                  className="tn-undiffused-core"
                  x={x+inset}
                  y={y+inset}
                  width={coreSide}
                  height={coreSide}
                  rx={Math.min(8,coreSide/5)}
                />
              )}

              {coreSide <= 2 && Number(time) > 0 && (
                <text className="tn-centre-reached" x={x+side/2} y={y+side/2+5} textAnchor="middle">
                  centre reached
                </text>
              )}

              <text className="tn-cube-label" x={x+side/2+12} y="350" textAnchor="middle">{cube} cm cube</text>
              <text className="tn-cube-ratio" x={x+side/2+12} y="372" textAnchor="middle">SA:V {CUBES[cube].ratio}:1</text>
            </g>
          );
        })}

        <text className="tn-time-label" x="380" y="402" textAnchor="middle">
          Same diffusion time for all three cubes
        </text>
      </svg></ReviewedScienceDiagram>

      <aside>
        <span>Selected cube</span>
        <strong>{selected.side} cm</strong>
        <dl>
          <div><dt>Surface area</dt><dd>{selected.surfaceArea} cm²</dd></div>
          <div><dt>Volume</dt><dd>{selected.volume} cm³</dd></div>
          <div><dt>SA:V</dt><dd>{selected.ratio}:1</dd></div>
        </dl>
        <p>{selected.side === 1
          ? "The smallest cube has the largest surface area relative to its volume and the shortest path to the centre, so the undiffused core disappears first."
          : selected.side === 2
            ? "The 2 cm cube has a smaller surface-area-to-volume ratio than the 1 cm cube, so a larger undiffused core remains at the same time."
            : "The 3 cm cube has the smallest surface area relative to its volume and the longest path to the centre, so its undiffused core remains largest."}</p>
      </aside>
    </div>
  );
}

function OrganismScene() {
  return (
    <ReviewedScienceDiagram site="TransportSystemNeedExplorer.jsx:114"><svg viewBox="0 0 900 500" role="img" aria-label="Comparison of diffusion in a single-celled organism and transport in a large multicellular organism">
      <g transform="translate(170 235)">
        <ellipse className="tn-amoeba" cx="0" cy="0" rx="110" ry="90" />
        <circle className="tn-nucleus" cx="-12" cy="-8" r="28" />
        {[[-150,-50],[-155,10],[-130,70],[140,-60],[155,10],[130,70]].map(([x,y],index)=>(
          <path key={index} className="tn-short-arrow" d={"M"+x+" "+y+"L"+(x>0?90:-90)+" "+(y*.4)} />
        ))}
        <text className="tn-heading" x="0" y="-135" textAnchor="middle">Single cell</text>
        <text className="tn-note" x="0" y="135" textAnchor="middle">short diffusion distance</text>
        <text className="tn-note" x="0" y="160" textAnchor="middle">large surface area relative to volume</text>
      </g>

      <g transform="translate(610 235)">
        <circle className="tn-body-outline" cx="0" cy="-75" r="42" />
        <path className="tn-body-outline" d="M-65-20Q0-55 65-20L90 145H-90Z" />
        <path className="tn-vessel" d="M0-20V120M0 15L-50 70M0 30L55 85" />
        <circle className="tn-heart" cx="0" cy="20" r="22" />
        <path className="tn-flow-arrow oxygen" d="M-20 15Q-90-5-130-55" />
        <path className="tn-flow-arrow nutrients" d="M20 30Q100 40 140 90" />
        <path className="tn-flow-arrow waste" d="M10 70Q90 120 140 135" />
        <text className="tn-heading" x="0" y="-155" textAnchor="middle">Large multicellular organism</text>
        <text className="tn-note" x="0" y="190" textAnchor="middle">many cells are far from the body surface</text>
      </g>
      <text className="tn-process-label oxygen" x="500" y="125">oxygen</text>
      <text className="tn-process-label nutrients" x="755" y="285">digested nutrients</text>
      <text className="tn-process-label waste" x="755" y="355">urea and other wastes</text>
    </svg></ReviewedScienceDiagram>
  );
}

function PlantScene() {
  return (
    <ReviewedScienceDiagram site="TransportSystemNeedExplorer.jsx:146"><svg viewBox="0 0 900 520" role="img" aria-label="Water uptake, xylem transport and transpiration in a flowering plant">
      <path className="tn-soil" d="M55 390H845V505H55Z" />
      <path className="tn-stem" d="M450 390V135" />
      <path className="tn-xylem" d="M435 390V145M465 390V145" />
      <path className="tn-root" d="M450 390Q350 430 280 475M450 390Q530 430 625 475M450 410Q425 455 430 495" />
      <ellipse className="tn-leaf" cx="340" cy="215" rx="110" ry="45" transform="rotate(-20 340 215)" />
      <ellipse className="tn-leaf" cx="565" cy="230" rx="110" ry="45" transform="rotate(18 565 230)" />
      <ellipse className="tn-leaf" cx="410" cy="125" rx="92" ry="38" transform="rotate(-5 410 125)" />

      <path className="tn-water-flow" d="M300 455Q380 420 440 365V165" />
      <path className="tn-water-flow" d="M610 455Q525 420 460 365V165" />
      <path className="tn-water-flow leaf" d="M450 215Q395 205 350 210" />
      <path className="tn-water-flow leaf" d="M455 220Q515 220 560 225" />

      {[300,345,390,545,590,635].map((x,index)=>(
        <path key={index} className="tn-vapour" d={"M"+x+" "+(155+(index%3)*18)+"q-20-40 0-70"} />
      ))}

      <text className="tn-heading" x="450" y="45" textAnchor="middle">Transpiration stream</text>
      <text className="tn-label" x="120" y="460">roots absorb water</text>
      <text className="tn-label" x="500" y="345">xylem carries water upward</text>
      <text className="tn-label" x="610" y="120">water vapour leaves mainly through stomata</text>
      <text className="tn-label" x="520" y="490">mineral ions travel with water from the roots</text>
    </svg></ReviewedScienceDiagram>
  );
}

function PotometerScene({condition}) {
  const config = CONDITIONS[condition];
  const bubbleX = config.speed === "fast" ? 330 : config.speed === "slow" ? 545 : 440;
  return (
    <div className="spark-transport-need-potometer">
      <div className="spark-transport-need-potometer-stage">
        <ReviewedScienceDiagram site="TransportSystemNeedExplorer.jsx:179"><svg viewBox="0 0 900 440" role="img" aria-label={"Potometer model under " + config.label.toLowerCase()}>
          <line className="tn-capillary" x1="170" y1="280" x2="780" y2="280" />
          <line className="tn-capillary" x1="170" y1="295" x2="780" y2="295" />
          <circle className="tn-bubble" cx={bubbleX} cy="287.5" r="10" />
          {[260,320,380,440,500,560,620,680,740].map(x=><line key={x} className="tn-scale" x1={x} y1="296" x2={x} y2="316" />)}
          <text className="tn-small" x="500" y="345" textAnchor="middle">capillary scale</text>

          <rect className="tn-bung" x="145" y="245" width="60" height="50" rx="7" />
          <path className="tn-shoot" d="M175 245V120" />
          <ellipse className="tn-leaf" cx="125" cy="155" rx="62" ry="24" transform="rotate(-18 125 155)" />
          <ellipse className="tn-leaf" cx="225" cy="175" rx="62" ry="24" transform="rotate(18 225 175)" />
          <ellipse className="tn-leaf" cx="205" cy="110" rx="55" ry="22" transform="rotate(10 205 110)" />

          {condition === "wind" && <>
            <path className="tn-wind" d="M20 105H95M15 145H90M20 185H100" />
            <circle className="tn-sun" cx="790" cy="80" r="42" />
          </>}
          {condition === "humidity" && <path className="tn-bag" d="M65 70Q175 35 285 70V230Q175 265 65 230Z" />}
          {condition === "dark" && <rect className="tn-dark-overlay" x="20" y="45" width="280" height="210" rx="20" />}
          {condition === "heat" && <g transform="translate(770 100)"><circle className="tn-sun" cx="0" cy="0" r="48" /></g>}

          <path className={"tn-bubble-arrow " + config.speed} d={"M"+(bubbleX+25)+" 250H"+(bubbleX-55)} />
          <text className="tn-label" x="480" y="395" textAnchor="middle">{config.label}</text>
        </svg></ReviewedScienceDiagram>
      </div>
      <aside>
        <span>Prediction</span>
        <strong>{config.speed === "fast" ? "Faster bubble movement" : config.speed === "slow" ? "Slower bubble movement" : "Intermediate bubble movement"}</strong>
        <p>{config.note}</p>
        <small>A potometer measures water uptake by the shoot. Water uptake is used as an estimate of transpiration rate, but the two are not exactly identical.</small>
      </aside>
    </div>
  );
}

export default function TransportSystemNeedExplorer() {
  const [view,setView] = useState("surface");
  const [cube,setCube] = useState("2");
  const [condition,setCondition] = useState("baseline");
  const [diffusionTime,setDiffusionTime] = useState("2");

  const cubeConfig = useMemo(() => CUBES[cube],[cube]);

  return (
    <section className="spark-transport-need">
      <header>
        <span>TRANSPORT SYSTEMS</span>
        <h3>Why organisms need internal transport</h3>
        <p>Connect surface-area-to-volume ratio, diffusion distance and water loss to the need for specialised transport systems.</p>
      </header>

      <div className="spark-transport-need-tabs">
        <button type="button" className={view==="surface"?"active":""} onClick={()=>setView("surface")}>Surface area : volume</button>
        <button type="button" className={view==="organism"?"active":""} onClick={()=>setView("organism")}>Why large organisms need transport</button>
        <button type="button" className={view==="plant"?"active":""} onClick={()=>setView("plant")}>Plant water transport</button>
        <button type="button" className={view==="potometer"?"active":""} onClick={()=>setView("potometer")}>Potometer conditions</button>
      </div>

      {view === "surface" && (
        <>
          <div className="spark-transport-need-choice">
            {[1,2,3].map(value => (
              <button type="button" key={value} className={Number(cube)===value?"active":""} onClick={()=>setCube(String(value))}>{value} cm cube</button>
            ))}
          </div>
          <div className="spark-transport-need-time" aria-label="Diffusion time">
            <span>Diffusion time</span>
            {[
              ["0","Start"],
              ["1","Short"],
              ["2","Medium"],
              ["3","Longer"],
            ].map(([value,label]) => (
              <button
                type="button"
                key={value}
                className={diffusionTime===value?"active":""}
                onClick={()=>setDiffusionTime(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <CubeScene size={cube} time={diffusionTime} />
          <div className="spark-transport-need-formula">
            <strong>Cube formula</strong>
            <span>Surface area = 6 × side². Volume = side³. For the selected {cubeConfig.side} cm cube, {cubeConfig.surfaceArea} ÷ {cubeConfig.volume} = {cubeConfig.ratio}:1.</span>
          </div>
        </>
      )}

      {view === "organism" && <div className="spark-transport-need-stage"><OrganismScene /></div>}
      {view === "plant" && <div className="spark-transport-need-stage"><PlantScene /></div>}

      {view === "potometer" && (
        <>
          <div className="spark-transport-need-choice">
            {Object.entries(CONDITIONS).map(([key,item]) => (
              <button type="button" key={key} className={condition===key?"active":""} onClick={()=>setCondition(key)}>{item.label}</button>
            ))}
          </div>
          <PotometerScene condition={condition} />
        </>
      )}

      {view === "organism" && (
        <div className="spark-transport-need-note-grid">
          <article><b>Small organisms</b><span>A single cell has a large surface area relative to its volume and every part of the cytoplasm is close to the surface, so diffusion can meet its needs.</span></article>
          <article><b>Large organisms</b><span>As size increases, surface-area-to-volume ratio decreases and many cells lie far from the body surface. Diffusion alone becomes too slow.</span></article>
          <article><b>Bulk transport</b><span>Circulatory systems move oxygen and digested nutrients rapidly to cells and carry wastes such as carbon dioxide and urea away.</span></article>
        </div>
      )}

      {view === "plant" && (
        <div className="spark-transport-need-note-grid">
          <article><b>Transpiration</b><span>Water evaporates from leaf cell surfaces and water vapour diffuses out, mainly through stomata.</span></article>
          <article><b>Transpiration pull</b><span>Water loss from leaves helps pull a continuous column of water upward through xylem from the roots.</span></article>
          <article><b>Why useful</b><span>The stream carries dissolved mineral ions upward and evaporation can help cool leaves.</span></article>
        </div>
      )}
    </section>
  );
}
