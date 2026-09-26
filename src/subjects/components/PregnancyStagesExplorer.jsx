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
  const [focus,setFocus]=useState("fertilisation");
  const details={
    fertilisation:["Fertilisation","A sperm nucleus fuses with the ovum nucleus, normally in an oviduct, forming a zygote."],
    zygote:["Zygote","The fertilised egg is a single diploid cell called a zygote."],
    cleavage:["Cell division","The zygote undergoes repeated mitotic divisions as it travels towards the uterus."],
    implantation:["Implantation","About a week after fertilisation, the developing blastocyst attaches to and begins embedding in the endometrium."]
  };
  const selected=details[focus];
  return (
    <div className="spark-pregnancy-reference-view">
      <figure className="spark-pregnancy-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_Fertilization.png"
          alt="Human fertilisation diagram showing sperm and ovum, zygote formation, cleavage and implantation in the uterine wall"
          loading="lazy"
        />
        <figcaption>
          <span>Fertilisation to implantation</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Human_Fertilization.png" target="_blank" rel="noreferrer">Ttrue12</a>
            {" · "}CC BY-SA 3.0
          </small>
        </figcaption>
      </figure>
      <div className="spark-pregnancy-reference-focus">
        <span>Follow early development</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
      </div>
    </div>
  );
}

function PlacentaScene() {
  const [focus,setFocus]=useState("placenta");
  const details={
    placenta:["Placenta","The placenta forms an exchange surface between maternal and foetal circulations."],
    cord:["Umbilical cord","The umbilical cord connects the foetus to the placenta and contains foetal blood vessels."],
    oxygen:["Oxygen and nutrients","Oxygen, glucose, amino acids and other useful substances can move from the mother's blood supply towards the foetus."],
    waste:["Carbon dioxide and urea","Carbon dioxide, urea and other waste products move from the foetal circulation towards the mother's blood for removal."],
    separate:["Blood remains separate","Maternal and foetal blood normally remain in separate vessels. Exchange occurs across the placental barrier rather than by direct mixing."],
    fluid:["Amniotic sac and fluid","Amniotic fluid cushions the foetus against mechanical shocks and allows movement."]
  };
  const selected=details[focus];
  return (
    <div className="spark-pregnancy-reference-view">
      <figure className="spark-pregnancy-reference-figure">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Fetal_circulation.jpg"
          alt="Medical illustration of a fetus with umbilical cord, amniotic sac and placenta showing the interface between foetal and maternal circulation"
          loading="lazy"
        />
        <figcaption>
          <span>Foetus, umbilical cord, amniotic sac and placenta</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:Fetal_circulation.jpg" target="_blank" rel="noreferrer">Bonnie Urquhart Gruenberg</a>
            {" · "}CC BY-SA 4.0
          </small>
        </figcaption>
      </figure>
      <div className="spark-pregnancy-reference-focus">
        <span>Explore placental support</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
      </div>
    </div>
  );
}

function LabourScene() {
  const [focus,setFocus]=useState("dilation");
  const details={
    dilation:["1. Cervical dilation","Uterine contractions become stronger and more regular while the cervix widens."],
    birth:["2. Delivery of the baby","Continued uterine contractions help move the baby through the birth canal."],
    placenta:["3. Afterbirth","After the baby is born, the placenta separates from the uterine wall and is expelled as the afterbirth."]
  };
  const selected=details[focus];
  return (
    <div className="spark-pregnancy-reference-view">
      <figure className="spark-pregnancy-reference-figure childbirth">
        <img
          src="https://commons.wikimedia.org/wiki/Special:Redirect/file/2920_Stages_of_Childbirth-en.svg"
          alt="Medical diagram showing the stages of childbirth from cervical dilation through delivery of the baby and placenta"
          loading="lazy"
        />
        <figcaption>
          <span>Stages of childbirth</span>
          <small>
            Reference: <a href="https://commons.wikimedia.org/wiki/File:2920_Stages_of_Childbirth-en.svg" target="_blank" rel="noreferrer">Jmarchn / OpenStax-derived anatomy</a>
            {" · "}CC BY-SA 3.0
          </small>
        </figcaption>
      </figure>
      <div className="spark-pregnancy-reference-focus">
        <span>Follow labour</span>
        <div>
          {Object.entries(details).map(([key,[title]])=>(
            <button type="button" key={key} className={focus===key?"active":""} onClick={()=>setFocus(key)}>{title}</button>
          ))}
        </div>
        <article role="status"><strong>{selected[0]}</strong><p>{selected[1]}</p></article>
      </div>
    </div>
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
