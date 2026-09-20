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
    <svg viewBox="0 0 960 500" role="img" aria-label="Fertilisation, cell division and implantation during early pregnancy">
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
    </svg>
  );
}

function PlacentaScene() {
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="Placental exchange between mother and foetus without direct mixing of blood">
      <rect className="ps-maternal-side" x="55" y="95" width="300" height="335" rx="24" />
      <rect className="ps-foetal-side" x="605" y="95" width="300" height="335" rx="24" />
      <rect className="ps-placenta-barrier" x="425" y="75" width="110" height="375" rx="35" />

      <path className="ps-maternal-vessel" d="M105 155Q200 115 305 175T300 330Q205 385 105 325" />
      <path className="ps-foetal-vessel" d="M655 160Q750 115 855 175T850 330Q755 385 655 325" />
      <path className="ps-umbilical-cord" d="M655 245Q600 225 535 250" />

      <path className="ps-exchange to-foetus" d="M330 175H620M330 225H620" />
      <path className="ps-exchange to-mother" d="M620 315H330M620 360H330" />

      <text className="ps-heading" x="205" y="65" textAnchor="middle">Mother</text>
      <text className="ps-heading" x="755" y="65" textAnchor="middle">Foetus</text>
      <text className="ps-label" x="475" y="165" textAnchor="middle">placenta</text>
      <text className="ps-small" x="475" y="190" textAnchor="middle">thin exchange surface</text>

      <text className="ps-exchange-label" x="475" y="152" textAnchor="middle">oxygen</text>
      <text className="ps-exchange-label" x="475" y="214" textAnchor="middle">glucose + amino acids</text>
      <text className="ps-exchange-label waste" x="475" y="305" textAnchor="middle">carbon dioxide</text>
      <text className="ps-exchange-label waste" x="475" y="350" textAnchor="middle">urea</text>

      <text className="ps-warning" x="480" y="490" textAnchor="middle">maternal and foetal blood do not normally mix directly</text>
    </svg>
  );
}

function LabourScene() {
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="Three stages of labour from cervical dilation to delivery and afterbirth">
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
    </svg>
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
