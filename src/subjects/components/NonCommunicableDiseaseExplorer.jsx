import React, { useState } from "react";
import "./nonCommunicableDiseaseExplorer.css";

const GLUCOSE = {
  time:[0,30,60,90,120,150,180],
  personA:[5,7.5,6.5,5.5,5,5,5],
  personB:[8,11,12.5,12.5,12,11,10],
};

const VIEWS = {
  diabetes:{
    label:"Diabetes",
    title:"Blood glucose control differs between healthy regulation and diabetes",
    note:"In the CSEC practice graph, Person A returns to about 5 mmol/L after the glucose drink. Person B starts higher, rises higher and remains elevated after 3 hours.",
  },
  hypertension:{
    label:"Hypertension",
    title:"High blood pressure can damage blood vessels and organs",
    note:"Excess sodium, physical inactivity, tobacco use, harmful alcohol use and overweight or obesity can increase risk. Hypertension often has no obvious symptoms, so measurement matters.",
  },
  immune:{
    label:"Immune conditions",
    title:"Allergy and autoimmune disease involve different immune errors",
    note:"An allergy is an excessive immune response to a usually harmless substance. In autoimmune disease, the immune system attacks the body's own tissues. Asthma is a chronic inflammatory airway condition that can be worsened by pollutants and allergens.",
  },
  prevention:{
    label:"Risk reduction",
    title:"Some non-communicable disease risks are modifiable",
    note:"Balanced eating, regular physical activity, avoiding tobacco, limiting harmful alcohol use and appropriate health checks reduce several preventable risks, although genetics and other non-modifiable factors also matter.",
  },
};

function GlucoseGraph() {
  const px=t=>90+(t/180)*790;
  const py=v=>420-(v/14)*350;
  const path=values=>values.map((v,i)=>(i?"L":"M")+px(GLUCOSE.time[i]).toFixed(1)+" "+py(v).toFixed(1)).join(" ");
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="CSEC blood glucose curves for Person A and Person B after a glucose drink">
      <line className="ncd-axis" x1="90" y1="70" x2="90" y2="420" />
      <line className="ncd-axis" x1="90" y1="420" x2="880" y2="420" />
      {[0,2,4,6,8,10,12,14].map(v=>(
        <g key={v}>
          <line className="ncd-grid" x1="90" y1={py(v)} x2="880" y2={py(v)} />
          <text className="ncd-tick" x="75" y={py(v)+5} textAnchor="end">{v}</text>
        </g>
      ))}
      {GLUCOSE.time.map(t=>(
        <g key={t}>
          <line className="ncd-grid" x1={px(t)} y1="70" x2={px(t)} y2="420" />
          <text className="ncd-tick" x={px(t)} y="448" textAnchor="middle">{t}</text>
        </g>
      ))}
      <path className="ncd-line a" d={path(GLUCOSE.personA)} />
      <path className="ncd-line b" d={path(GLUCOSE.personB)} />
      {GLUCOSE.personA.map((v,i)=><circle key={"a"+i} className="ncd-point a" cx={px(GLUCOSE.time[i])} cy={py(v)} r="6"/>)}
      {GLUCOSE.personB.map((v,i)=><path key={"b"+i} className="ncd-cross b" d={"M"+(px(GLUCOSE.time[i])-6)+" "+(py(v)-6)+"l12 12m0-12l-12 12"} />)}
      <text className="ncd-axis-label" x="485" y="490" textAnchor="middle">Time after glucose drink / minutes</text>
      <text className="ncd-axis-label" x="25" y="245" textAnchor="middle" transform="rotate(-90 25 245)">Blood glucose / mmol per litre</text>
      <text className="ncd-label" x="725" y="300">Person A</text>
      <text className="ncd-label" x="725" y="130">Person B</text>
    </svg>
  );
}

function DiabetesScene() {
  return (
    <>
      <div className="spark-ncd-graph"><GlucoseGraph /></div>
      <div className="spark-ncd-diabetes-notes">
        <article><b>Type 1 diabetes</b><span>An autoimmune condition in which the body produces little or no insulin. Insulin replacement is required.</span></article>
        <article><b>Type 2 diabetes</b><span>The body does not use insulin effectively and may later produce too little. Genetics, age and modifiable risk factors contribute.</span></article>
        <article><b>Long-term high glucose</b><span>Can damage eyes, kidneys, nerves, blood vessels and the cardiovascular system and can impair wound healing.</span></article>
      </div>
    </>
  );
}

function HypertensionScene() {
  return (
    <svg viewBox="0 0 960 520" role="img" aria-label="How high sodium intake can contribute to raised blood pressure and organ damage">
      <g transform="translate(60 75)">
        <rect className="ncd-step-card" x="0" y="80" width="190" height="150" rx="18" />
        <text className="ncd-card-title" x="95" y="120" textAnchor="middle">High sodium intake</text>
        {[55,95,135].map(x=><circle className="ncd-salt" key={x} cx={x} cy="175" r="9"/>)}
      </g>
      <path className="ncd-arrow" d="M285 230H350" />
      <g transform="translate(360 75)">
        <rect className="ncd-step-card" x="0" y="80" width="190" height="150" rx="18" />
        <text className="ncd-card-title" x="95" y="120" textAnchor="middle">More water retained</text>
        <path className="ncd-water-drop" d="M95 145q-35 45 0 80q35-35 0-80Z" />
      </g>
      <path className="ncd-arrow" d="M585 230H650" />
      <g transform="translate(660 75)">
        <rect className="ncd-step-card" x="0" y="80" width="230" height="150" rx="18" />
        <text className="ncd-card-title" x="115" y="120" textAnchor="middle">Blood volume and pressure rise</text>
        <path className="ncd-artery" d="M35 180H195" />
        <path className="ncd-pressure-arrows" d="M70 155V125M115 155V118M160 155V125" />
      </g>

      <text className="ncd-heading" x="480" y="360" textAnchor="middle">Uncontrolled hypertension increases risk of damage</text>
      <div />
      <g transform="translate(140 395)">
        <circle className="ncd-organ" cx="0" cy="0" r="38" /><text className="ncd-small" x="0" y="65" textAnchor="middle">heart</text>
      </g>
      <g transform="translate(380 395)">
        <circle className="ncd-organ" cx="0" cy="0" r="38" /><text className="ncd-small" x="0" y="65" textAnchor="middle">brain / stroke</text>
      </g>
      <g transform="translate(620 395)">
        <circle className="ncd-organ" cx="0" cy="0" r="38" /><text className="ncd-small" x="0" y="65" textAnchor="middle">kidneys</text>
      </g>
      <g transform="translate(820 395)">
        <circle className="ncd-organ" cx="0" cy="0" r="38" /><text className="ncd-small" x="0" y="65" textAnchor="middle">eyes / vessels</text>
      </g>
    </svg>
  );
}

function ImmuneScene() {
  return (
    <div className="spark-ncd-immune-wrap">
      <div className="spark-ncd-immune-grid">
        <article>
          <span>ALLERGY</span>
          <h4>Response to a usually harmless trigger</h4>
          <p>Examples include reactions to dust, pollen or some foods. Symptoms may include sneezing, itchy eyes or skin reactions.</p>
        </article>
        <article>
          <span>AUTOIMMUNE DISEASE</span>
          <h4>Immune attack on the body's own tissues</h4>
          <p>Lupus and rheumatoid arthritis are syllabus examples. The immune response is directed against self tissues.</p>
        </article>
      </div>

      <svg className="spark-asthma-airway-svg" viewBox="0 0 920 430" role="img" aria-label="Cross-sections comparing a healthy airway with an asthma airway showing narrowed lumen, swollen lining, tightened smooth muscle and excess mucus">
        <g className="asthma-panel healthy" transform="translate(70 60)">
          <text className="asthma-title" x="180" y="0" textAnchor="middle">Healthy airway</text>
          <circle className="asthma-outer" cx="180" cy="165" r="120"/>
          <circle className="asthma-muscle" cx="180" cy="165" r="96"/>
          <circle className="asthma-lining" cx="180" cy="165" r="78"/>
          <circle className="asthma-lumen" cx="180" cy="165" r="62"/>
          <path className="asthma-airflow" d="M125 165H235"/>
          <text className="asthma-label" x="180" y="315" textAnchor="middle">wide airway opening, easier airflow</text>
        </g>

        <g className="asthma-panel affected" transform="translate(490 60)">
          <text className="asthma-title" x="180" y="0" textAnchor="middle">Asthma airway</text>
          <circle className="asthma-outer" cx="180" cy="165" r="120"/>
          <circle className="asthma-muscle tightened" cx="180" cy="165" r="98"/>
          <circle className="asthma-lining swollen" cx="180" cy="165" r="82"/>
          <circle className="asthma-lumen narrowed" cx="180" cy="165" r="38"/>
          <path className="asthma-mucus" d="M154 142Q180 125 206 142Q193 162 174 155Q158 162 154 142Z"/>
          <path className="asthma-airflow restricted" d="M150 190H210"/>
          <text className="asthma-label" x="180" y="315" textAnchor="middle">narrowed opening makes airflow more difficult</text>

          <path className="asthma-callout" d="M80 73L118 107"/><text className="asthma-small" x="5" y="68">tightened smooth muscle</text>
          <path className="asthma-callout" d="M302 108L260 130"/><text className="asthma-small" x="305" y="104">swollen inflamed lining</text>
          <path className="asthma-callout" d="M307 210L215 176"/><text className="asthma-small" x="310" y="216">excess mucus</text>
        </g>

        <text className="asthma-caption" x="460" y="410" textAnchor="middle">Smoke, air pollution, allergens or infections can trigger or worsen symptoms in susceptible people.</text>
      </svg>
    </div>
  );
}

function PreventionScene() {
  const items=[
    ["Physical activity","Regular activity lowers the risk of Type 2 diabetes, hypertension and cardiovascular disease."],
    ["Balanced diet","Limit excess salt, added sugars and unhealthy fats while including suitable fruits, vegetables and whole foods."],
    ["Avoid tobacco","Tobacco increases cardiovascular and respiratory risks."],
    ["Health checks","Blood pressure and blood glucose checks help identify problems that may have few early symptoms."],
    ["Follow treatment plans","People already diagnosed with chronic disease should follow personalised medical guidance and prescribed treatment."],
  ];
  return (
    <div className="spark-ncd-prevention-grid">
      {items.map(([title,text],index)=>(
        <article key={title}><span>{index+1}</span><div><b>{title}</b><p>{text}</p></div></article>
      ))}
    </div>
  );
}

export default function NonCommunicableDiseaseExplorer() {
  const [view,setView] = useState("diabetes");
  const info=VIEWS[view];

  return (
    <section className="spark-ncd-explorer">
      <header>
        <span>NON-COMMUNICABLE DISEASE</span>
        <h3>Chronic conditions have different causes and risk factors</h3>
        <p>Compare metabolic, cardiovascular, allergic, autoimmune and respiratory conditions without treating them as infectious diseases.</p>
      </header>

      <div className="spark-ncd-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="immune"||view==="prevention" ? "spark-ncd-stage cards" : "spark-ncd-stage"}>
        {view==="diabetes" && <DiabetesScene />}
        {view==="hypertension" && <HypertensionScene />}
        {view==="immune" && <ImmuneScene />}
        {view==="prevention" && <PreventionScene />}
      </div>

      <div className="spark-ncd-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
