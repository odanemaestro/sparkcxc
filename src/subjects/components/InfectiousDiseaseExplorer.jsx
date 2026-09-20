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
    <svg viewBox="0 0 980 520" role="img" aria-label="Dengue transmission by Aedes mosquito and control of mosquito life stages">
      <g transform="translate(55 65)">
        <circle className="id-life-stage" cx="80" cy="90" r="58" />
        <g className="id-eggs">
          <ellipse cx="60" cy="90" rx="7" ry="15" />
          <ellipse cx="80" cy="75" rx="7" ry="15" />
          <ellipse cx="100" cy="95" rx="7" ry="15" />
        </g>
        <text className="id-label" x="80" y="175" textAnchor="middle">eggs</text>
      </g>

      <path className="id-vector-arrow" d="M210 155H285" />

      <g transform="translate(290 65)">
        <circle className="id-life-stage" cx="80" cy="90" r="58" />
        <path className="id-larva" d="M45 80q25-35 40 0t35 10q20 25-12 45" />
        <text className="id-label" x="80" y="175" textAnchor="middle">larva</text>
      </g>

      <path className="id-vector-arrow" d="M445 155H520" />

      <g transform="translate(525 65)">
        <circle className="id-life-stage" cx="80" cy="90" r="58" />
        <path className="id-pupa" d="M60 70q55 5 40 55q-12 35-42 15q-20-18 2-70Z" />
        <text className="id-label" x="80" y="175" textAnchor="middle">pupa</text>
      </g>

      <path className="id-vector-arrow" d="M680 155H755" />

      <g transform="translate(760 65)">
        <circle className="id-life-stage adult" cx="80" cy="90" r="58" />
        <g className="id-mosquito">
          <ellipse cx="80" cy="90" rx="10" ry="35" />
          <path d="M70 80L35 55M90 80L125 55M72 100L35 130M88 100L125 130M80 60V35" />
          <ellipse cx="58" cy="72" rx="25" ry="14" transform="rotate(-25 58 72)" />
          <ellipse cx="102" cy="72" rx="25" ry="14" transform="rotate(25 102 72)" />
        </g>
        <text className="id-label" x="80" y="175" textAnchor="middle">adult vector</text>
      </g>

      <rect className="id-control-box" x="85" y="320" width="370" height="115" rx="16" />
      <text className="id-card-title" x="105" y="350">Target immature stages</text>
      <text className="id-small left" x="105" y="380">Drain or cover standing water.</text>
      <text className="id-small left" x="105" y="405">Remove containers that collect rainwater.</text>

      <rect className="id-control-box" x="525" y="320" width="370" height="115" rx="16" />
      <text className="id-card-title" x="545" y="350">Reduce adult bites</text>
      <text className="id-small left" x="545" y="380">Use screens, nets and approved control methods.</text>
      <text className="id-small left" x="545" y="405">Reduce contact between mosquitoes and people.</text>
    </svg>
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
