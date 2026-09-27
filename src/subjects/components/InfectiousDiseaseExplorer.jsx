import React, { useState } from "react";
import "./infectiousDiseaseExplorer.css";

const VIEWS = {
  routes:{
    label:"Transmission routes",
    title:"Communicable diseases spread when pathogens move between hosts",
    note:"Different pathogens use different routes. Prevention works best when it breaks the route used by the pathogen.",
  },
  stis:{
    label:"STI profiles",
    title:"STIs are caused by different types of pathogen",
    note:"Gonorrhoea, chlamydia and syphilis are bacterial. Genital herpes, HIV and hepatitis B are viral. Candidiasis is fungal and is discussed in the sexual-health section, although it is not usually classified medically as a classic STI.",
  },
  prevention:{
    label:"Prevention",
    title:"Reduce exposure and interrupt transmission",
    note:"Hand hygiene, safer sex, not sharing needles, safe food and water, vaccination where available, and vector control all reduce transmission when matched to the disease route.",
  },
  vector:{
    label:"Vector example",
    title:"A vector carries a pathogen from one host to another",
    note:"Aedes aegypti mosquitoes transmit dengue virus. Removing standing water targets immature mosquito stages, while screens, nets and appropriate adult mosquito control reduce contact with adult vectors.",
  },
};

function RoutesScene() {
  const routes = [
    ["Air and droplets","Influenza and other respiratory infections"],
    ["Food or water","Pathogens can spread through contaminated food or water"],
    ["Direct contact","Skin contact or contaminated surfaces can spread some infections"],
    ["Sexual contact or blood","HIV, hepatitis B and several STIs"],
    ["Vector","Mosquitoes can transmit dengue virus"],
  ];
  return (
    <div className="spark-infectious-route-grid">
      {routes.map(([title,text],index)=>(
        <article key={title}>
          <span>{index+1}</span>
          <div><b>{title}</b><p>{text}</p></div>
        </article>
      ))}
    </div>
  );
}

function STIProfiles() {
  const items = [
    {name:"Gonorrhoea",kind:"Bacterium",detail:"May cause discharge and painful urination. Often asymptomatic in women. Curable with appropriate antibiotics, although resistance is a major concern."},
    {name:"Chlamydia",kind:"Bacterium",detail:"Often has no symptoms. Untreated infection can cause reproductive complications. Curable with appropriate antibiotics."},
    {name:"Syphilis",kind:"Bacterium",detail:"Primary infection may produce a painless sore. It is curable with appropriate antibiotic treatment."},
    {name:"Genital herpes",kind:"Virus",detail:"May cause painful blisters or sores. Antiviral medicines help control outbreaks but do not remove the virus from the body."},
    {name:"HIV",kind:"Virus",detail:"HIV attacks immune cells. Effective antiretroviral treatment controls the virus and prevents progression to AIDS in many people."},
    {name:"Hepatitis B",kind:"Virus",detail:"Mainly affects the liver. Vaccination provides strong prevention, and antiviral treatment is available for chronic infection."},
    {name:"Candidiasis",kind:"Fungus",detail:"Candida is a yeast. Thrush may affect the genital area, but candidiasis is not usually classified as a classic sexually transmitted infection."},
  ];
  return (
    <div className="spark-sti-profile-grid">
      {items.map(item=>(
        <article key={item.name}>
          <span>{item.kind}</span>
          <b>{item.name}</b>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function PreventionScene() {
  return (
    <svg viewBox="0 0 980 520" role="img" aria-label="Ways to break infectious disease transmission">
      <g transform="translate(70 60)">
        <circle className="id-prevention-node hygiene" cx="110" cy="100" r="70" />
        <path className="id-hands" d="M65 100q35-35 45 10q10-45 42-10q20 25-10 55q-40 28-75-5q-22-25-2-50Z" />
        <text className="id-label" x="110" y="205" textAnchor="middle">hand hygiene</text>
      </g>

      <g transform="translate(315 60)">
        <circle className="id-prevention-node condom" cx="110" cy="100" r="70" />
        <path className="id-shield" d="M110 45Q160 52 160 95Q155 145 110 165Q65 145 60 95Q60 52 110 45Z" />
        <text className="id-label" x="110" y="205" textAnchor="middle">safer sex</text>
      </g>

      <g transform="translate(560 60)">
        <circle className="id-prevention-node vaccine" cx="110" cy="100" r="70" />
        <rect className="id-syringe" x="60" y="92" width="90" height="18" rx="6" />
        <line className="id-needle" x1="150" y1="101" x2="185" y2="101" />
        <text className="id-label" x="110" y="205" textAnchor="middle">vaccination</text>
      </g>

      <g transform="translate(805 60)">
        <circle className="id-prevention-node needle" cx="55" cy="100" r="70" />
        <path className="id-no-share" d="M15 60L95 140M95 60L15 140" />
        <text className="id-label" x="55" y="205" textAnchor="middle">do not share needles</text>
      </g>

      <path className="id-barrier-line" d="M90 340H890" />
      <text className="id-heading" x="490" y="315" textAnchor="middle">Break the chain of transmission</text>
      <text className="id-small" x="490" y="390" textAnchor="middle">Match prevention to the pathogen and route of spread</text>
      <text className="id-small" x="490" y="425" textAnchor="middle">Testing and early treatment also reduce complications and onward transmission</text>
    </svg>
  );
}

function VectorScene() {
  return (
    <div className="spark-dengue-vector-scene">
      <svg className="spark-dengue-transmission-svg" viewBox="0 0 1040 600" role="img" aria-label="Dengue transmission cycle showing an Aedes aegypti mosquito acquiring dengue virus from an infected person and transmitting it during a later bite to another person, plus aquatic mosquito stages targeted by standing-water control">
        <defs>
          <marker id="dengue-flow-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0L9 4.5L0 9Z" className="id-dengue-arrow-head"/>
          </marker>
        </defs>

        <g className="id-person infected" transform="translate(80 80)">
          <circle cx="95" cy="72" r="42"/>
          <path d="M95 116V240M40 160L95 140L150 160M95 240L55 318M95 240L135 318"/>
          <g className="id-virus-particles">
            <circle cx="68" cy="150" r="8"/><circle cx="105" cy="180" r="7"/><circle cx="128" cy="132" r="8"/>
          </g>
          <text className="id-label" x="95" y="350" textAnchor="middle">person with dengue virus</text>
        </g>

        <path className="id-dengue-flow" d="M255 220Q330 185 390 220" markerEnd="url(#dengue-flow-arrow)"/>
        <text className="id-small" x="325" y="170" textAnchor="middle">blood meal from infected person</text>

        <g className="id-aedes" transform="translate(415 125)">
          <ellipse className="id-aedes-body" cx="105" cy="108" rx="14" ry="52"/>
          <circle className="id-aedes-head" cx="105" cy="49" r="18"/>
          <path className="id-aedes-proboscis" d="M105 31L105 0"/>
          <ellipse className="id-aedes-wing" cx="65" cy="92" rx="48" ry="23" transform="rotate(-25 65 92)"/>
          <ellipse className="id-aedes-wing" cx="145" cy="92" rx="48" ry="23" transform="rotate(25 145 92)"/>
          <path className="id-aedes-leg" d="M93 95L42 60M117 95L168 60M93 120L35 142M117 120L175 142M94 142L52 190M116 142L160 190"/>
          <path className="id-aedes-stripe" d="M94 80H116M92 102H118M92 126H118M94 150H116"/>
          <g className="id-virus-particles mosquito">
            <circle cx="105" cy="94" r="7"/><circle cx="105" cy="122" r="7"/><circle cx="105" cy="150" r="7"/>
          </g>
          <text className="id-label" x="105" y="235" textAnchor="middle">Aedes aegypti vector</text>
          <text className="id-small" x="105" y="258" textAnchor="middle">mosquito carries dengue virus</text>
        </g>

        <path className="id-dengue-flow" d="M640 220Q710 185 775 220" markerEnd="url(#dengue-flow-arrow)"/>
        <text className="id-small" x="705" y="170" textAnchor="middle">later bite can transmit virus</text>

        <g className="id-person susceptible" transform="translate(775 80)">
          <circle cx="95" cy="72" r="42"/>
          <path d="M95 116V240M40 160L95 140L150 160M95 240L55 318M95 240L135 318"/>
          <text className="id-label" x="95" y="350" textAnchor="middle">another person</text>
        </g>

        <rect className="id-vector-divider" x="75" y="450" width="890" height="2"/>
        <text className="id-heading" x="520" y="430" textAnchor="middle">Vector control breaks the transmission route</text>

        <g className="id-aquatic-stages" transform="translate(115 470)">
          <g transform="translate(0 0)"><ellipse className="id-egg-stage" cx="45" cy="44" rx="8" ry="17"/><ellipse className="id-egg-stage" cx="65" cy="38" rx="8" ry="17"/><text className="id-small" x="55" y="92" textAnchor="middle">eggs</text></g>
          <path className="id-stage-arrow" d="M110 44H165" markerEnd="url(#dengue-flow-arrow)"/>
          <g transform="translate(175 0)"><path className="id-larva-stage" d="M20 28Q50 2 68 35T100 50Q112 76 82 78"/><text className="id-small" x="60" y="92" textAnchor="middle">larva, aquatic</text></g>
          <path className="id-stage-arrow" d="M300 44H355" markerEnd="url(#dengue-flow-arrow)"/>
          <g transform="translate(365 0)"><path className="id-pupa-stage" d="M28 20Q90 20 80 65Q71 88 42 73Q18 60 28 20Z"/><text className="id-small" x="58" y="92" textAnchor="middle">pupa, aquatic</text></g>
          <path className="id-stage-arrow" d="M480 44H535" markerEnd="url(#dengue-flow-arrow)"/>
          <g transform="translate(548 -3)"><ellipse className="id-mini-adult" cx="55" cy="42" rx="8" ry="28"/><path className="id-mini-adult-lines" d="M47 35L20 18M63 35L90 18M47 48L17 65M63 48L93 65"/><text className="id-small" x="55" y="95" textAnchor="middle">adult</text></g>
          <rect className="id-source-reduction-box" x="690" y="-8" width="195" height="100" rx="14"/>
          <text className="id-card-title" x="788" y="20" textAnchor="middle">Remove standing water</text>
          <text className="id-small" x="788" y="48" textAnchor="middle">prevents aquatic stages</text>
          <text className="id-small" x="788" y="70" textAnchor="middle">from developing into adults</text>
        </g>
      </svg>
    </div>
  );
}

export default function InfectiousDiseaseExplorer() {
  const [view,setView] = useState("routes");
  const info = VIEWS[view];

  return (
    <section className="spark-infectious-disease">
      <header>
        <span>COMMUNICABLE DISEASE</span>
        <h3>Pathogens spread through identifiable routes</h3>
        <p>Link each disease to its pathogen, route of transmission and prevention method.</p>
      </header>

      <div className="spark-infectious-tabs">
        {Object.entries(VIEWS).map(([key,item])=>(
          <button type="button" key={key} className={view===key?"active":""} onClick={()=>setView(key)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className={view==="routes"||view==="stis" ? "spark-infectious-stage cards" : "spark-infectious-stage"}>
        {view==="routes" && <RoutesScene />}
        {view==="stis" && <STIProfiles />}
        {view==="prevention" && <PreventionScene />}
        {view==="vector" && <VectorScene />}
      </div>

      <div className="spark-infectious-summary">
        <strong>{info.title}</strong>
        <span>{info.note}</span>
      </div>
    </section>
  );
}
