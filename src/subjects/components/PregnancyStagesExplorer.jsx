import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import React, { useState } from "react";
import "./pregnancyStagesExplorer.css";

const STAGES = {
  early:{
    label:"Early development",
    title:"From fertilisation to implantation",
    note:"Fertilisation normally occurs in an oviduct. The zygote divides as it travels to the uterus, and the embryo implants in the endometrium about a week later.",
  },
  placenta:{
    label:"Placenta and protection",
    title:"Exchange without direct blood mixing",
    note:"The placenta provides a thin exchange surface. Oxygen and nutrients move towards the foetus, while carbon dioxide and urea move towards the mother. Maternal and foetal blood remain in separate vessels.",
  },
  labour:{
    label:"Labour and birth",
    title:"Three stages of labour",
    note:"Labour progresses from dilation of the cervix, to birth of the baby, to separation and expulsion of the placenta as the afterbirth.",
  },
};

function EarlyDevelopmentScene() {
  return (
    <ReviewedScienceDiagram site="PregnancyStagesExplorer.jsx:24"><svg viewBox="0 0 960 500" role="img" aria-label="Fertilisation, cell division and implantation during early pregnancy">
      <ellipse className="ps-ovary" cx="125" cy="175" rx="55" ry="38" />
      <path className="ps-oviduct" d="M175 175Q300 80 435 165Q500 210 560 220" />
      <path className="ps-uterus" d="M555 135Q700 80 830 155Q880 250 835 405Q755 455 650 410Q565 355 555 220Z" />
      <path className="ps-endometrium" d="M595 175Q700 135 790 185Q820 255 790 360Q730 395 665 365Q610 325 600 235Z" />

      <circle className="ps-ovum" cx="220" cy="145" r="27" />
      <g className="ps-sperm">
        <path d="M180 95q25 15 35 42" /><circle cx="180" cy="95" r="8" />
        <path d="M202 83q20 18 26 43" /><circle cx="202" cy="83" r="8" />
      </g>
      <circle className="ps-zygote" cx="330" cy="125" r="30" />
      <g className="ps-cleavage" transform="translate(445 170)">
        <circle cx="-17" cy="-13" r="17" /><circle cx="17" cy="-13" r="17" />
        <circle cx="-17" cy="19" r="17" /><circle cx="17" cy="19" r="17" />
      </g>
      <circle className="ps-embryo" cx="660" cy="260" r="35" />
      <path className="ps-implant-line" d="M660 295Q680 325 705 340" />

      <path className="ps-arrow" d="M255 145H292M362 132L407 158M485 187L615 245" />
      <text className="ps-label" x="200" y="245">fertilisation</text>
      <text className="ps-small" x="200" y="269">sperm nucleus + ovum nucleus</text>
      <text className="ps-label" x="375" y="90">zygote divides</text>
      <text className="ps-label" x="690" y="455">implantation in uterine lining</text>
    </svg></ReviewedScienceDiagram>
  );
}

function PlacentaScene() {
  return (
    <ReviewedScienceDiagram site="PregnancyStagesExplorer.jsx:54"><svg viewBox="0 0 980 560" role="img" aria-label="Pregnant uterus showing foetus, amniotic sac, placenta, umbilical cord and placental exchange without direct mixing of maternal and foetal blood">
      <g className="ps-pregnant-uterus" transform="translate(18 20)">
        <path className="ps-uterus-outer" d="M165 65Q300 8 438 80Q500 150 492 268Q484 382 407 472Q325 534 233 490Q150 445 111 353Q76 270 95 185Q111 111 165 65Z" />
        <path className="ps-uterus-muscle" d="M183 88Q300 42 417 100Q468 157 461 261Q453 358 388 439Q321 490 245 455Q174 419 141 341Q111 271 127 197Q141 133 183 88Z" />
        <path className="ps-amniotic-sac" d="M216 114Q310 75 396 121Q430 173 424 251Q418 337 361 400Q306 445 248 414Q192 383 168 318Q148 257 160 194Q172 145 216 114Z" />
        <path className="ps-amniotic-fluid" d="M224 128Q310 94 385 135Q411 181 405 248Q399 323 350 382Q305 417 257 391Q210 363 190 307Q173 254 184 203Q194 159 224 128Z" />

        <g className="ps-foetus" transform="translate(275 235) rotate(-16)">
          <ellipse className="ps-foetus-head" cx="60" cy="-70" rx="48" ry="55" />
          <path className="ps-foetus-torso" d="M38-22Q80-20 98 18Q105 64 70 98Q33 120 7 89Q-10 64 2 32Q12 8 38-22Z" />
          <path className="ps-foetus-arm" d="M55 4Q28 20 16 48M72 10Q94 28 91 53" />
          <path className="ps-foetus-leg" d="M35 88Q8 111-4 132M70 94Q89 116 78 139" />
        </g>

        <path className="ps-placenta" d="M128 153Q93 216 112 305Q125 360 167 390Q196 345 198 292Q198 220 167 166Q150 145 128 153Z" />
        <g className="ps-placental-villi">
          {[185,220,255,290,325,360].map((y,i)=>(
            <path key={y} d={"M153 "+y+"q28 8 41 28"} />
          ))}
        </g>

        <path className="ps-umbilical-cord" d="M187 302Q233 304 269 280Q305 258 328 233" />
        <path className="ps-umbilical-inner artery" d="M191 292Q238 294 273 271Q307 248 326 229" />
        <path className="ps-umbilical-inner vein" d="M191 312Q235 314 271 290Q306 269 331 238" />

        <path className="ps-cervix" d="M270 449Q303 463 336 449L332 500Q301 516 274 500Z" />
        <path className="ps-cervical-canal" d="M303 463V503" />
        <path className="ps-vagina" d="M277 500L262 545H342L329 500Z" />

        <text className="ps-label" x="302" y="36" textAnchor="middle">uterus</text>
        <text className="ps-small" x="308" y="122">amniotic sac + fluid</text>
        <text className="ps-small" x="74" y="264">placenta</text>
        <text className="ps-small" x="226" y="282">umbilical cord</text>
        <text className="ps-small" x="312" y="536">cervix</text>
      </g>

      <g className="ps-placenta-inset" transform="translate(555 58)">
        <rect className="ps-inset-card" x="0" y="0" width="390" height="420" rx="22" />
        <text className="ps-heading" x="195" y="42" textAnchor="middle">Placental exchange</text>

        <path className="ps-maternal-vessel" d="M45 115Q115 80 185 118T335 118" />
        <path className="ps-maternal-vessel return" d="M45 315Q115 350 185 312T335 312" />

        <path className="ps-villus-main" d="M185 100Q152 155 170 214Q186 267 222 314" />
        <path className="ps-villus-branch" d="M173 150Q133 170 116 205M180 190Q218 176 245 205M190 235Q147 250 130 280M202 270Q238 255 270 280" />
        <path className="ps-foetal-vessel" d="M182 120Q178 183 194 244Q203 281 219 309" />

        <path className="ps-exchange to-foetus" d="M70 165H285M70 205H285" />
        <path className="ps-exchange to-mother" d="M285 255H70M285 295H70" />

        <text className="ps-exchange-label" x="177" y="153" textAnchor="middle">oxygen</text>
        <text className="ps-exchange-label" x="177" y="194" textAnchor="middle">glucose + amino acids</text>
        <text className="ps-exchange-label waste" x="177" y="246" textAnchor="middle">carbon dioxide</text>
        <text className="ps-exchange-label waste" x="177" y="286" textAnchor="middle">urea</text>

        <text className="ps-small" x="28" y="98">maternal blood space</text>
        <text className="ps-small" x="226" y="342">foetal capillaries in villi</text>
        <text className="ps-warning" x="195" y="390" textAnchor="middle">maternal and foetal blood do not normally mix directly</text>
      </g>
    </svg></ReviewedScienceDiagram>
  );
}

function LabourScene() {
  return (
    <ReviewedScienceDiagram site="PregnancyStagesExplorer.jsx:119"><svg viewBox="0 0 960 520" role="img" aria-label="Three stages of labour from cervical dilation to delivery and afterbirth">
      {[160,480,800].map((x,index) => (
        <g key={x}>
          <circle className="ps-stage-number" cx={x} cy="70" r="30" />
          <text className="ps-stage-number-text" x={x} y="80" textAnchor="middle">{index+1}</text>
        </g>
      ))}

      <g transform="translate(160 250)">
        <path className="ps-labour-uterus" d="M-92-95Q0-145 92-95Q125 0 88 105Q0 145-88 105Q-125 0-92-95Z" />
        <circle className="ps-baby-head" cx="0" cy="38" r="43" />
        <path className="ps-cervix-open" d="M-35 112Q0 135 35 112" />
        <path className="ps-contraction" d="M-120-45Q-150 0-120 45M120-45Q150 0 120 45" />
      </g>
      <text className="ps-label centre" x="160" y="445">Cervix dilates</text>
      <text className="ps-small centre" x="160" y="468">uterine contractions increase</text>

      <g transform="translate(480 230)">
        <path className="ps-birth-canal" d="M-80-100Q0-130 80-100L55 65Q20 110 0 155Q-20 110-55 65Z" />
        <circle className="ps-baby-head" cx="0" cy="55" r="45" />
        <path className="ps-baby-body" d="M-32 90Q0 135 32 90Q65 150 30 190H-30Q-65 150-32 90Z" />
      </g>
      <text className="ps-label centre" x="480" y="445">Baby is delivered</text>
      <text className="ps-small centre" x="480" y="468">crowning then expulsion</text>

      <g transform="translate(800 245)">
        <path className="ps-labour-uterus" d="M-92-95Q0-145 92-95Q125 0 88 105Q0 145-88 105Q-125 0-92-95Z" />
        <path className="ps-placenta-piece" d="M-65-75Q-95 0-55 65Q-25 45-18-10Q-15-55-65-75Z" />
        <path className="ps-afterbirth-arrow" d="M0 125V190" />
      </g>
      <text className="ps-label centre" x="800" y="445">Placenta is expelled</text>
      <text className="ps-small centre" x="800" y="468">afterbirth</text>
    </svg></ReviewedScienceDiagram>
  );
}

export default function PregnancyStagesExplorer() {
  const [stage,setStage] = useState("early");
  const info = STAGES[stage];

  return (
    <section className="spark-pregnancy-stages">
      <header>
        <span>PREGNANCY AND BIRTH</span>
        <h3>From fertilisation to labour</h3>
        <p>Follow the major events of pregnancy and the structures that protect and support the developing baby.</p>
      </header>

      <div className="spark-pregnancy-tabs">
        {Object.entries(STAGES).map(([key,item]) => (
          <button type="button" key={key} className={stage === key ? "active" : ""} onClick={() => setStage(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="spark-pregnancy-stage">
        {stage === "early" && <EarlyDevelopmentScene />}
        {stage === "placenta" && <PlacentaScene />}
        {stage === "labour" && <LabourScene />}
      </div>

      <div className="spark-pregnancy-explanation">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>

      <div className="spark-pregnancy-facts">
        <article><b>Embryo</b><span>The developing human is described as an embryo during the early weeks after fertilisation.</span></article>
        <article><b>Foetus</b><span>From about eight weeks after fertilisation, when the main body plan and organs are established, the developing human is called a foetus.</span></article>
        <article><b>Gestation</b><span>Human pregnancy lasts about 40 weeks, roughly nine months, counted clinically from the last menstrual period.</span></article>
        <article><b>Amniotic fluid</b><span>Cushions the foetus against mechanical shocks and allows movement within the amniotic sac.</span></article>
      </div>
    </section>
  );
}
