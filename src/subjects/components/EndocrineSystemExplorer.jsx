import React, { useState } from "react";
import "./endocrineSystemExplorer.css";

const VIEWS = {
  anatomy:{
    label:"Gland map",
    title:"Endocrine glands occupy specific positions throughout the body",
    note:"The pituitary lies at the base of the brain. The thyroid and parathyroids are in the neck. The adrenal glands sit above the kidneys, the pancreas lies across the upper abdomen, and the gonads are the ovaries or testes.",
  },
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

function AnatomyScene() {
  return (
    <div className="spark-endocrine-anatomy">
      <svg className="spark-endocrine-anatomy-svg" viewBox="0 0 980 700" role="img" aria-label="Female and male endocrine gland map showing pituitary, thyroid, parathyroid, adrenal glands, pancreas, ovaries and testes">
        <g className="ea-person female">
          <circle className="ea-head" cx="300" cy="95" r="62"/>
          <path className="ea-body" d="M255 155Q300 130 345 155Q392 220 380 340L360 555H240L220 340Q208 220 255 155Z"/>
          <path className="ea-arm" d="M245 190Q185 260 175 420M355 190Q415 260 425 420"/>
          <path className="ea-leg" d="M265 550L245 650M335 550L355 650"/>
          <circle className="ea-pituitary" cx="307" cy="102" r="8"/>
          <path className="ea-thyroid" d="M278 178Q290 165 300 178Q310 165 322 178Q318 202 300 205Q282 202 278 178Z"/>
          <circle className="ea-parathyroid" cx="288" cy="184" r="4"/><circle className="ea-parathyroid" cx="312" cy="184" r="4"/>
          <path className="ea-kidney" d="M260 337Q235 326 232 354Q234 384 258 390Q276 377 272 351Z"/>
          <path className="ea-kidney" d="M340 337Q365 326 368 354Q366 384 342 390Q324 377 328 351Z"/>
          <path className="ea-adrenal" d="M235 334Q252 309 272 337ZM328 337Q348 309 365 334Z"/>
          <path className="ea-pancreas" d="M250 385Q300 360 352 384Q332 412 282 417Q260 412 250 385Z"/>
          <ellipse className="ea-ovary" cx="270" cy="505" rx="12" ry="9"/><ellipse className="ea-ovary" cx="330" cy="505" rx="12" ry="9"/>
          <path className="ea-uterus" d="M284 505Q300 524 316 505L311 548H289Z"/>
        </g>

        <g className="ea-person male">
          <circle className="ea-head" cx="680" cy="95" r="62"/>
          <path className="ea-body" d="M635 155Q680 130 725 155Q772 220 760 340L740 555H620L600 340Q588 220 635 155Z"/>
          <path className="ea-arm" d="M625 190Q565 260 555 420M735 190Q795 260 805 420"/>
          <path className="ea-leg" d="M645 550L625 650M715 550L735 650"/>
          <circle className="ea-pituitary" cx="687" cy="102" r="8"/>
          <path className="ea-thyroid" d="M658 178Q670 165 680 178Q690 165 702 178Q698 202 680 205Q662 202 658 178Z"/>
          <circle className="ea-parathyroid" cx="668" cy="184" r="4"/><circle className="ea-parathyroid" cx="692" cy="184" r="4"/>
          <path className="ea-kidney" d="M640 337Q615 326 612 354Q614 384 638 390Q656 377 652 351Z"/>
          <path className="ea-kidney" d="M720 337Q745 326 748 354Q746 384 722 390Q704 377 708 351Z"/>
          <path className="ea-adrenal" d="M615 334Q632 309 652 337ZM708 337Q728 309 745 334Z"/>
          <path className="ea-pancreas" d="M630 385Q680 360 732 384Q712 412 662 417Q640 412 630 385Z"/>
          <ellipse className="ea-testis" cx="664" cy="575" rx="13" ry="19"/><ellipse className="ea-testis" cx="696" cy="575" rx="13" ry="19"/>
        </g>

        <g className="ea-labels">
          <path d="M307 102L145 70"/><text x="132" y="73" textAnchor="end">pituitary gland</text>
          <path d="M300 188L145 165"/><text x="132" y="170" textAnchor="end">thyroid gland</text>
          <path d="M288 184L145 215"/><text x="132" y="220" textAnchor="end">parathyroid glands</text>
          <path d="M245 326L145 305"/><text x="132" y="310" textAnchor="end">adrenal glands</text>
          <path d="M255 397L145 385"/><text x="132" y="390" textAnchor="end">pancreas</text>
          <path d="M270 505L145 495"/><text x="132" y="500" textAnchor="end">ovaries</text>

          <path d="M687 102L835 70"/><text x="848" y="73">pituitary gland</text>
          <path d="M680 188L835 165"/><text x="848" y="170">thyroid gland</text>
          <path d="M692 184L835 215"/><text x="848" y="220">parathyroid glands</text>
          <path d="M735 326L835 305"/><text x="848" y="310">adrenal glands</text>
          <path d="M725 397L835 385"/><text x="848" y="390">pancreas</text>
          <path d="M696 575L835 555"/><text x="848" y="560">testes</text>
        </g>
        <text className="ea-sex-label" x="300" y="682" textAnchor="middle">female</text>
        <text className="ea-sex-label" x="680" y="682" textAnchor="middle">male</text>
      </svg>
      <div className="spark-endocrine-anatomy-notes">
        <article><b>Pituitary</b><p>Often called a master gland because several of its hormones regulate other endocrine glands.</p></article>
        <article><b>Thyroid and parathyroids</b><p>The thyroid lies in the neck. Small parathyroid glands lie on its posterior surface and help regulate blood calcium.</p></article>
        <article><b>Adrenals and pancreas</b><p>Adrenal glands sit above the kidneys. The pancreas has endocrine cells that release hormones such as insulin.</p></article>
        <article><b>Gonads</b><p>Ovaries and testes produce sex hormones as well as reproductive cells.</p></article>
      </div>
    </div>
  );
}

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
  const [view,setView] = useState("anatomy");
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
        {view==="anatomy" && <AnatomyScene />}
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
