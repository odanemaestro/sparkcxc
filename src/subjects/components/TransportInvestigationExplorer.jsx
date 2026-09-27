import React, { useMemo, useState } from "react";
import "./transportInvestigationExplorer.css";

const INVESTIGATIONS = {
  osmometer:{
    title:"Osmometer",
    purpose:"Show water moving through a selectively permeable membrane by osmosis.",
    changed:"Concentration difference between distilled water and the sugar solution.",
    measured:"Change in liquid level in the capillary tube.",
    kept:"Temperature, time and the membrane surface area.",
    observation:"The liquid level rises in the capillary tube.",
    conclusion:"Water moves through the selectively permeable membrane into the more concentrated sugar solution.",
  },
  potato:{
    title:"Potato strips",
    purpose:"Investigate how solution concentration affects water movement in plant tissue.",
    changed:"Concentration of the sugar solution.",
    measured:"Change in length or mass of each potato strip.",
    kept:"Initial strip size, volume of solution, time, temperature and source of potato.",
    observation:"Strips gain size in dilute solutions, show little or no change near the cell-sap concentration, and lose size in concentrated solutions.",
    conclusion:"Water enters or leaves potato cells by osmosis depending on the concentration difference.",
  },
  visking:{
    title:"Visking tubing",
    purpose:"Model selective permeability using a membrane that allows small molecules through more readily than large molecules.",
    changed:"Molecules placed inside and outside the tubing.",
    measured:"Colour changes after the molecules have had time to move.",
    kept:"Time, temperature, solution volumes and tubing size.",
    observation:"Iodine moves through the tubing and turns the starch mixture blue-black while starch remains inside.",
    conclusion:"The membrane allows smaller iodine molecules through but prevents the larger starch molecules from crossing easily.",
  },
};

function OsmometerScene({ ran }) {
  return (
    <svg viewBox="0 0 800 470" role="img" aria-label="Osmometer investigation">
      <rect className="lab-bench" x="70" y="120" width="420" height="260" rx="18" />
      <path className="lab-water" d="M85 205H475V365H85Z" />
      <path className="lab-membrane-bag" d="M215 210v105q65 60 130 0V210Z" />
      <rect className="lab-tube" x="272" y="55" width="18" height="170" rx="5" />
      <path className={ran ? "lab-level ran" : "lab-level"} d={ran ? "M273 95h16" : "M273 165h16"} />
      <text className="lab-label" x="570" y="120">capillary tube</text>
      <path className="lab-leader" d="M548 115L292 115" />
      <text className="lab-label" x="570" y="220">sugar solution</text>
      <path className="lab-leader" d="M548 215L335 260" />
      <text className="lab-label" x="570" y="300">selectively permeable membrane</text>
      <path className="lab-leader" d="M548 295L345 325" />
      <text className="lab-label" x="570" y="370">distilled water</text>
      <path className="lab-leader" d="M548 365L440 335" />
      <path className="lab-arrow" d="M170 300h85" />
      <path className="lab-arrow-head" d="M240 286l24 14-24 14" />
      {ran && <text className="lab-result" x="280" y="35" textAnchor="middle">liquid level rises</text>}
    </svg>
  );
}

function PotatoScene({ ran }) {
  const concentrations = ["0.0","0.2","0.4","0.6","0.8"];
  const changes = [6,3,0,-3,-5];
  return (
    <svg viewBox="0 0 800 470" role="img" aria-label="Potato osmosis investigation">
      {concentrations.map((value,index) => {
        const x = 70 + index * 140;
        const change = changes[index];
        const stripHeight = ran ? 125 + change * 5 : 125;
        return (
          <g key={value}>
            <path className="lab-beaker" d={`M${x} 150v210h95V150`} />
            <path className="lab-water" d={`M${x+3} 225h89v132h-89Z`} />
            <rect className="lab-potato" x={x+39} y={315-stripHeight} width="18" height={stripHeight} rx="4" />
            <text className="lab-small-label" x={x+47} y="392" textAnchor="middle">{value}</text>
            {ran && (
              <text className={change > 0 ? "lab-change positive" : change < 0 ? "lab-change negative" : "lab-change"} x={x+47} y="425" textAnchor="middle">
                {change > 0 ? `+${change}` : change} mm
              </text>
            )}
          </g>
        );
      })}
      <text className="lab-axis-label" x="400" y="458" textAnchor="middle">Sugar solution concentration / mol dm⁻³</text>
      <text className="lab-result" x="400" y="65" textAnchor="middle">{ran ? "Compare the change in strip length" : "Each strip starts at the same length"}</text>
    </svg>
  );
}

function ViskingScene({ ran }) {
  return (
    <svg viewBox="0 0 800 470" role="img" aria-label="Visking tubing selective permeability investigation">
      <path className="lab-beaker" d="M135 90v300h330V90" />
      <path className="lab-water iodine" d="M140 175h320v210H140Z" />
      <path className={ran ? "lab-membrane-bag stained" : "lab-membrane-bag"} d="M245 110v200q55 55 110 0V110Z" />
      <text className="lab-label" x="555" y="155">Visking tubing</text>
      <path className="lab-leader" d="M535 150L355 175" />
      <text className="lab-label" x="555" y="245">starch mixture</text>
      <path className="lab-leader" d="M535 240L340 250" />
      <text className="lab-label" x="555" y="335">iodine solution</text>
      <path className="lab-leader" d="M535 330L445 310" />
      <circle className="lab-iodine-dot" cx="185" cy="235" r="8" />
      <circle className="lab-iodine-dot" cx="205" cy="300" r="8" />
      <circle className="lab-iodine-dot" cx="410" cy="250" r="8" />
      {ran && (
        <>
          <circle className="lab-iodine-dot inside" cx="285" cy="225" r="8" />
          <circle className="lab-iodine-dot inside" cx="320" cy="285" r="8" />
          <text className="lab-result" x="300" y="62" textAnchor="middle">starch mixture turns blue-black</text>
        </>
      )}
    </svg>
  );
}

export default function TransportInvestigationExplorer() {
  const [mode,setMode] = useState("osmometer");
  const [ran,setRan] = useState(false);
  const config = INVESTIGATIONS[mode];

  const Scene = useMemo(() => {
    if (mode === "potato") return PotatoScene;
    if (mode === "visking") return ViskingScene;
    return OsmometerScene;
  },[mode]);

  const select = next => {
    setMode(next);
    setRan(false);
  };

  return (
    <section className="spark-transport-investigation">
      <div className="spark-transport-investigation-head">
        <span>PRACTICAL INVESTIGATION</span>
        <h3>Investigating movement across membranes</h3>
        <p>Use the models to connect apparatus, variables, observations and conclusions. These are the same types of practical reasoning expected in CSEC questions.</p>
      </div>

      <div className="spark-transport-investigation-tabs" role="tablist" aria-label="Transport investigation">
        {Object.entries(INVESTIGATIONS).map(([key,item]) => (
          <button
            type="button"
            role="tab"
            aria-selected={mode === key}
            className={mode === key ? "active" : ""}
            key={key}
            onClick={() => select(key)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-transport-investigation-grid">
        <div className="spark-transport-investigation-stage">
          <Scene ran={ran} />
        </div>

        <aside className="spark-transport-investigation-notes">
          <strong>{config.title}</strong>
          <p>{config.purpose}</p>
          <dl>
            <div><dt>Changed</dt><dd>{config.changed}</dd></div>
            <div><dt>Measured</dt><dd>{config.measured}</dd></div>
            <div><dt>Keep constant</dt><dd>{config.kept}</dd></div>
          </dl>
          <button type="button" onClick={() => setRan(value => !value)}>
            {ran ? "Reset investigation" : "Run investigation"}
          </button>
          {ran && (
            <div className="spark-transport-investigation-result" aria-live="polite">
              <b>Observation</b>
              <p>{config.observation}</p>
              <b>What the evidence shows</b>
              <p>{config.conclusion}</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
