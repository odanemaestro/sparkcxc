import React, { useMemo, useState } from "react";
import "./transportProcessExplorer.css";

const MODES = {
  diffusion:{
    title:"Diffusion",
    summary:"Particles move from a region of higher concentration to a region of lower concentration.",
    prompt:"Run the model and watch the concentration difference become smaller.",
    energy:false,
  },
  osmosis:{
    title:"Osmosis",
    summary:"Water molecules move through a selectively permeable membrane from higher water concentration to lower water concentration.",
    prompt:"The membrane allows water through but not the larger solute particles.",
    energy:false,
  },
  activeTransport:{
    title:"Active transport",
    summary:"Particles move from a region of lower concentration to a region of higher concentration using energy from the cell.",
    prompt:"The carrier moves particles against the concentration gradient.",
    energy:true,
  },
};

function Particle({ x, y, kind = "solute", index = 0 }) {
  return (
    <circle
      className={`spark-transport-particle ${kind}`}
      cx={x}
      cy={y}
      r={kind === "water" ? 7 : 9}
      style={{"--spark-particle-delay":`${index * 35}ms`}}
    />
  );
}

function MembraneBilayer() {
  const rows = [105,145,185,225,265,305,345,385,425];
  return (
    <g className="membrane-bilayer" aria-hidden="true">
      {rows.map(y => (
        <g key={y}>
          <circle className="membrane-head" cx="386" cy={y} r="7" />
          <line className="membrane-tail" x1="392" y1={y-4} x2="400" y2={y-12} />
          <line className="membrane-tail" x1="392" y1={y+4} x2="400" y2={y+12} />
          <circle className="membrane-head" cx="414" cy={y} r="7" />
          <line className="membrane-tail" x1="408" y1={y-4} x2="400" y2={y-12} />
          <line className="membrane-tail" x1="408" y1={y+4} x2="400" y2={y+12} />
        </g>
      ))}
    </g>
  );
}

function DiffusionScene({ running }) {
  const left = [
    [165,125],[205,150],[140,190],[225,215],[175,255],[245,285],
    [115,310],[210,345],[150,380],[255,405],[105,435],[195,460],
  ];
  const right = [[625,170],[690,280],[610,390]];

  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Diffusion particle model">
      <rect className="chamber" x="70" y="70" width="660" height="390" rx="26" />
      <text className="zone-label" x="190" y="105" textAnchor="middle">Higher concentration</text>
      <text className="zone-label" x="610" y="105" textAnchor="middle">Lower concentration</text>
      {left.map(([x,y],index) => (
        <g
          key={`l-${index}`}
          className={running ? `move-diffusion move-diffusion-${index % 4}` : ""}
        >
          <Particle x={x} y={y} index={index} />
        </g>
      ))}
      {right.map(([x,y],index) => <Particle key={`r-${index}`} x={x} y={y} index={index} />)}
      <path className="process-arrow reverse" d="M470 300H365" />
      <path className="process-arrow-head reverse" d="M380 287l-22 13 22 13" />
      <path className="process-arrow" d="M310 250h170" />
      <path className="process-arrow-head" d="M465 235l25 15-25 15" />
      <text className="net-movement-label" x="400" y="225" textAnchor="middle">net movement</text>
    </svg>
  );
}

function OsmosisScene({ running }) {
  const watersLeft = [[120,135],[175,170],[115,225],[205,255],[150,310],[230,355],[120,405],[195,435]];
  const watersRight = [[530,130],[590,180],[665,220],[545,275],[625,320],[690,365],[555,415]];
  const soluteRight = [[565,155],[650,165],[600,245],[690,290],[575,350],[650,410]];

  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Osmosis membrane model">
      <rect className="chamber" x="70" y="70" width="660" height="390" rx="26" />
      <MembraneBilayer />
      <text className="zone-label" x="190" y="105" textAnchor="middle">More water molecules</text>
      <text className="zone-label" x="610" y="105" textAnchor="middle">More solute</text>
      {watersLeft.map(([x,y],index) => (
        <g
          key={`wl-${index}`}
          className={running && index < 4 ? `move-water move-water-${index}` : ""}
        >
          <Particle x={x} y={y} kind="water" index={index} />
        </g>
      ))}
      {watersRight.map(([x,y],index) => <Particle key={`wr-${index}`} x={x} y={y} kind="water" index={index} />)}
      {soluteRight.map(([x,y],index) => <Particle key={`s-${index}`} x={x} y={y} kind="solute" index={index} />)}
      <path className="process-arrow water-arrow" d="M285 260h165" />
      <path className="process-arrow-head water-arrow" d="M435 245l25 15-25 15" />
      <text className="membrane-label" x="400" y="480" textAnchor="middle">Selectively permeable membrane</text>
    </svg>
  );
}

function ActiveTransportScene({ running }) {
  const left = [[135,145],[190,210],[145,300]];
  const right = [[565,130],[635,165],[685,220],[545,275],[625,320],[690,365],[560,410],[645,430]];

  return (
    <svg viewBox="0 0 800 520" role="img" aria-label="Active transport membrane model">
      <rect className="chamber" x="70" y="70" width="660" height="390" rx="26" />
      <MembraneBilayer />
      <path className={`carrier ${running ? "running" : ""}`} d="M365 215Q400 190 435 215V305Q400 330 365 305Z" />
      <circle className="carrier-site" cx="400" cy="260" r="13" />
      <text className="zone-label" x="190" y="105" textAnchor="middle">Lower concentration</text>
      <text className="zone-label" x="610" y="105" textAnchor="middle">Higher concentration</text>
      {left.map(([x,y],index) => (
        <g
          key={`al-${index}`}
          className={running && index === 1 ? "move-active" : ""}
        >
          <Particle x={x} y={y} index={index} />
        </g>
      ))}
      {right.map(([x,y],index) => <Particle key={`ar-${index}`} x={x} y={y} index={index} />)}
      <path className="process-arrow active-arrow" d="M260 260h190" />
      <path className="process-arrow-head active-arrow" d="M435 245l25 15-25 15" />
      <g className={`energy-badge ${running ? "on" : ""}`}>
        <rect x="300" y="385" width="200" height="48" rx="24" />
        <text x="400" y="408" textAnchor="middle">{running ? "ENERGY IN USE" : "ENERGY REQUIRED"}</text>
        <text className="energy-caption" x="400" y="426" textAnchor="middle">from respiration</text>
      </g>
    </svg>
  );
}

export default function TransportProcessExplorer() {
  const [mode,setMode] = useState("diffusion");
  const [running,setRunning] = useState(false);
  const config = MODES[mode];

  const Scene = useMemo(() => {
    if (mode === "osmosis") return OsmosisScene;
    if (mode === "activeTransport") return ActiveTransportScene;
    return DiffusionScene;
  },[mode]);

  const chooseMode = next => {
    setMode(next);
    setRunning(false);
  };

  return (
    <section className="spark-transport-explorer">
      <div className="spark-transport-head">
        <div>
          <span>INTERACTIVE MODEL</span>
          <h3>Movement of substances across cells</h3>
          <p>Compare diffusion, osmosis and active transport. Focus on the direction of movement, the concentration gradient, the membrane and whether energy is needed.</p>
        </div>
      </div>

      <div className="spark-transport-tabs" role="tablist" aria-label="Transport process">
        {Object.entries(MODES).map(([key,item]) => (
          <button
            type="button"
            role="tab"
            aria-selected={mode === key}
            className={mode === key ? "active" : ""}
            key={key}
            onClick={() => chooseMode(key)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-transport-grid">
        <div className="spark-transport-stage">
          <Scene running={running} />
        </div>

        <aside className="spark-transport-notes">
          <strong>{config.title}</strong>
          <p>{config.summary}</p>
          <p>{config.prompt}</p>
          <dl>
            <div>
              <dt>Energy</dt>
              <dd>{config.energy ? "Required" : "Not required from the cell"}</dd>
            </div>
            <div>
              <dt>Gradient</dt>
              <dd>{mode === "activeTransport" ? "Against" : "Down"}</dd>
            </div>
            <div>
              <dt>Membrane</dt>
              <dd>{mode === "osmosis" ? "Selectively permeable membrane is essential" : mode === "activeTransport" ? "Carrier proteins in a membrane are involved" : "Diffusion does not require a selectively permeable membrane, although substances may diffuse across the cell membrane"}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => setRunning(value => !value)}
          >
            {running ? "Reset model" : "Run model"}
          </button>
        </aside>
      </div>
    </section>
  );
}