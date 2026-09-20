import React, { useState } from "react";
import "./endocrineSystemExplorer.css";

const VIEWS = {
  transport:{
    label:"Hormone transport",
    title:"Endocrine glands release hormones into the blood",
    note:"Endocrine glands are ductless. Hormones enter the bloodstream and circulate throughout the body, but only target cells with the correct receptors respond strongly.",
  },
  insulin:{
    label:"Insulin",
    title:"Insulin lowers raised blood glucose",
    note:"After blood glucose rises, the pancreas releases insulin. Insulin increases glucose uptake by cells and promotes storage of glucose as glycogen, helping blood glucose return towards normal.",
  },
  adrenaline:{
    label:"Adrenaline",
    title:"Adrenaline prepares the body for action",
    note:"Adrenaline from the adrenal glands increases heart rate and breathing rate and helps make more glucose available during a fight-or-flight response.",
  },
  compare:{
    label:"Nerves vs hormones",
    title:"Two coordination systems work at different speeds",
    note:"Nerve impulses travel rapidly along neurones and their effects are often brief and specific. Hormones travel in blood, act more slowly and often produce longer-lasting effects.",
  },
};

function TransportScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Hormone released from an endocrine gland into blood and reaching target organs">
      <circle className="es-gland" cx="145" cy="260" r="75" />
      <text className="es-label" x="145" y="255" textAnchor="middle">endocrine</text>
      <text className="es-label" x="145" y="280" textAnchor="middle">gland</text>

      <path className="es-vessel" d="M270 260Q490 170 705 260Q820 310 920 245" />
      {[320,400,480,560,640,720].map((x,index)=><circle key={x} className="es-hormone" cx={x} cy={230+(index%2)*40} r="10" />)}
      <path className="es-release-arrow" d="M220 260H280" />

      <g transform="translate(735 55)">
        <rect className="es-target-card active" x="0" y="0" width="190" height="120" rx="16" />
        <circle className="es-receptor" cx="50" cy="60" r="22" />
        <circle className="es-hormone" cx="50" cy="60" r="9" />
        <text className="es-card-title" x="90" y="50">Target cell</text>
        <text className="es-card-text" x="90" y="76">matching receptor</text>

        <rect className="es-target-card" x="0" y="145" width="190" height="120" rx="16" />
        <path className="es-wrong-receptor" d="M30 205L70 165M30 165L70 205" />
        <text className="es-card-title" x="90" y="195">Other cell</text>
        <text className="es-card-text" x="90" y="221">no matching receptor</text>
      </g>
      <text className="es-small" x="480" y="455" textAnchor="middle">blood carries the hormone widely, receptor matching determines the response</text>
    </svg>
  );
}

function InsulinScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Insulin response to raised blood glucose">
      <g transform="translate(70 75)">
        <rect className="es-step" x="0" y="80" width="190" height="140" rx="20" />
        <text className="es-step-title" x="95" y="120" textAnchor="middle">Blood glucose rises</text>
        {[35,75,115,155].map(x=><circle key={x} className="es-glucose" cx={x+15} cy="170" r="10" />)}
      </g>
      <path className="es-process-arrow" d="M290 225H355" />
      <g transform="translate(365 75)">
        <path className="es-pancreas" d="M20 145Q95 95 180 135Q150 195 65 195Q30 190 20 145Z" />
        <text className="es-step-title" x="100" y="235" textAnchor="middle">pancreas releases insulin</text>
      </g>
      <path className="es-process-arrow" d="M570 225H630" />
      <g transform="translate(645 55)">
        <rect className="es-step wide" x="0" y="35" width="260" height="280" rx="20" />
        <text className="es-step-title" x="130" y="80" textAnchor="middle">Cells respond</text>
        <text className="es-card-text" x="130" y="120" textAnchor="middle">more glucose enters cells</text>
        <text className="es-card-text" x="130" y="155" textAnchor="middle">liver stores glucose as glycogen</text>
        <path className="es-down-arrow" d="M130 190V240" />
        <text className="es-result" x="130" y="280" textAnchor="middle">blood glucose falls</text>
      </g>
      <text className="es-small" x="480" y="455" textAnchor="middle">too little effective insulin allows blood glucose to remain abnormally high</text>
    </svg>
  );
}

function AdrenalineScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Adrenaline fight or flight effects on heart breathing and blood glucose">
      <path className="es-body" d="M430 95Q490 65 550 95Q595 165 580 270Q565 350 535 435H445Q415 350 400 270Q385 165 430 95Z" />
      <path className="es-kidney" d="M430 260Q405 250 400 280Q400 315 425 323Q445 310 440 280Z" />
      <path className="es-kidney" d="M550 260Q575 250 580 280Q580 315 555 323Q535 310 540 280Z" />
      <path className="es-adrenal" d="M400 255Q420 225 442 253ZM538 253Q560 225 580 255Z" />
      <path className="es-hormone-rays" d="M405 245Q305 180 225 155M575 245Q675 180 755 155M430 300Q300 330 210 365M550 300Q680 330 770 365" />

      <g transform="translate(85 90)">
        <path className="es-heart" d="M90 50Q55 15 25 55Q15 95 90 150Q165 95 155 55Q125 15 90 50Z" />
        <text className="es-label" x="90" y="190" textAnchor="middle">heart rate rises</text>
      </g>
      <g transform="translate(720 85)">
        <path className="es-lungs" d="M80 50Q30 65 25 145Q60 180 95 155V65ZM105 65V155Q140 180 175 145Q170 65 120 50Z" />
        <text className="es-label" x="100" y="205" textAnchor="middle">breathing rate rises</text>
      </g>
      <g transform="translate(70 330)">
        <circle className="es-glucose" cx="55" cy="30" r="12" />
        <circle className="es-glucose" cx="100" cy="30" r="12" />
        <circle className="es-glucose" cx="145" cy="30" r="12" />
        <text className="es-label" x="100" y="80" textAnchor="middle">more glucose available</text>
      </g>
      <text className="es-small" x="490" y="480" textAnchor="middle">adrenal glands sit on top of the kidneys</text>
    </svg>
  );
}

function CompareScene() {
  return (
    <div className="spark-endocrine-compare">
      <article>
        <span>NERVOUS SYSTEM</span>
        <h4>Electrical impulses</h4>
        <p>Signals travel along neurones.</p>
        <p>Response is usually rapid.</p>
        <p>Effects are often short-lived and directed to specific effectors.</p>
      </article>
      <article>
        <span>ENDOCRINE SYSTEM</span>
        <h4>Hormones in blood</h4>
        <p>Chemical messengers circulate in the bloodstream.</p>
        <p>Response is usually slower.</p>
        <p>Effects often last longer and may involve several target organs.</p>
      </article>
    </div>
  );
}

export default function EndocrineSystemExplorer() {
  const [view,setView] = useState("transport");
  const info = VIEWS[view];

  return (
    <section className="spark-endocrine-system">
      <header>
        <span>ENDOCRINE COORDINATION</span>
        <h3>Hormones travel through the blood</h3>
        <p>Connect each gland with its hormone, target tissues and effect on the body.</p>
      </header>

      <div className="spark-endocrine-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="compare" ? "spark-endocrine-stage compare" : "spark-endocrine-stage"}>
        {view==="transport" && <TransportScene />}
        {view==="insulin" && <InsulinScene />}
        {view==="adrenaline" && <AdrenalineScene />}
        {view==="compare" && <CompareScene />}
      </div>

      <div className="spark-endocrine-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
