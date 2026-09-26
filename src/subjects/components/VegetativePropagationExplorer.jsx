import React, { useState } from "react";
import "./vegetativePropagationExplorer.css";

const MEDIA = {
  bulb:{
    title:"Bulb",
    example:"Onion",
    group:"natural",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/202002_Model_plant_bulb.svg",
    source:"https://commons.wikimedia.org/wiki/File:202002_Model_plant_bulb.svg",
    credit:"DataBase Center for Life Science (DBCLS)",
    license:"CC BY 4.0",
    alt:"Botanical reference illustration of a plant bulb",
    features:[
      ["Storage leaves","A bulb stores food in thick, fleshy leaf bases surrounding a very short stem."],
      ["Short stem","The compressed stem lies at the base of the bulb."],
      ["New shoot","A bud can grow into a new shoot using stored food."],
    ],
  },
  corm:{
    title:"Corm",
    example:"Dasheen / eddoe",
    group:"natural",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Stem_morphology_type_corm.png",
    source:"https://commons.wikimedia.org/wiki/File:Stem_morphology_type_corm.png",
    credit:"RoRo",
    license:"CC0 1.0",
    alt:"Botanical diagram showing corm stem morphology",
    features:[
      ["Swollen stem","A corm is a short, solid, swollen underground stem rather than a mass of fleshy leaves."],
      ["Bud","A bud on the corm can produce a new shoot."],
      ["Roots","Roots arise from the lower part of the corm."],
    ],
  },
  rhizome:{
    title:"Rhizome",
    example:"Ginger",
    group:"natural",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Ginger_rhizome.jpg",
    source:"https://commons.wikimedia.org/wiki/File:Ginger_rhizome.jpg",
    credit:"Malcolm Koo",
    license:"CC BY 4.0",
    alt:"Photograph of a ginger rhizome",
    features:[
      ["Horizontal stem","A rhizome is a horizontal underground stem."],
      ["Nodes and buds","Buds at nodes can grow into new shoots."],
      ["Food storage","The swollen stem stores food for later growth."],
    ],
  },
  runner:{
    title:"Runner",
    example:"Strawberry / grass",
    group:"natural",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Runners_%28PSF%29.png",
    source:"https://commons.wikimedia.org/wiki/File:Runners_(PSF).png",
    credit:"Pearson Scott Foresman",
    license:"Public domain",
    alt:"Botanical line drawing of runners or stolons",
    features:[
      ["Surface stem","A runner grows horizontally across the soil surface."],
      ["Node","A node along the runner can form roots and a new shoot."],
      ["Daughter plant","The new plant may later survive independently of the parent."],
    ],
  },
  tuber:{
    title:"Tuber",
    example:"Irish potato",
    group:"natural",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Potato_tuber_morphology.svg",
    source:"https://commons.wikimedia.org/wiki/File:Potato_tuber_morphology.svg",
    credit:"Smartse",
    license:"CC BY-SA 4.0",
    alt:"Botanical diagram showing the morphology of a potato tuber",
    features:[
      ["Swollen stem","A potato tuber is a swollen underground stem used for food storage."],
      ["Eyes","The eyes are buds capable of producing new shoots."],
      ["Stolon connection","Tubers form at the ends of underground stems called stolons."],
    ],
  },
  cutting:{
    title:"Stem cutting",
    example:"Sugar cane",
    group:"artificial",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Taking-a-cutting.PNG",
    source:"https://commons.wikimedia.org/wiki/File:Taking-a-cutting.PNG",
    credit:"Hydrob",
    license:"CC BY-SA 3.0 / GFDL",
    alt:"Propagation diagram showing a plant stem cutting",
    features:[
      ["Parent stem","A piece of stem is removed from a healthy parent plant."],
      ["Bud or node","A cutting must include living tissue capable of producing new growth."],
      ["New roots","Roots develop after the cutting is placed in suitable conditions."],
    ],
  },
  grafting:{
    title:"Grafting",
    example:"Citrus / mango",
    group:"artificial",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Top_grafting_process.svg",
    source:"https://commons.wikimedia.org/wiki/File:Top_grafting_process.svg",
    credit:"Dorota Paczesniak",
    license:"CC BY-SA 4.0",
    alt:"Scientific illustration showing the process of top grafting",
    features:[
      ["Rootstock","The rooted plant provides the lower stem and root system."],
      ["Scion","A shoot from the desired variety is attached to the rootstock."],
      ["Cambium contact","The cut surfaces are aligned, tied and protected so the tissues can join."],
    ],
  },
  budding:{
    title:"Budding",
    example:"Citrus",
    group:"artificial",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Budgraft.png",
    source:"https://commons.wikimedia.org/wiki/File:Budgraft.png",
    credit:"Quercusrobur",
    license:"GFDL",
    alt:"Botanical diagram showing bud grafting",
    features:[
      ["Single bud","A bud from the desired variety is used rather than a longer scion."],
      ["Rootstock","The bud is inserted into a prepared cut on the rootstock."],
      ["Protected union","The graft area is tied or wrapped while the tissues unite."],
    ],
  },
  tissue:{
    title:"Tissue culture",
    example:"Banana",
    group:"artificial",
    image:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Banana_seedlings_by_tissue_culture.jpg",
    source:"https://commons.wikimedia.org/wiki/File:Banana_seedlings_by_tissue_culture.jpg",
    credit:"Vinayaraj",
    license:"CC BY-SA 4.0",
    alt:"Photograph of banana plantlets produced by tissue culture",
    features:[
      ["Small tissue sample","A small piece of plant tissue is selected from the parent plant."],
      ["Sterile culture","The tissue is grown on sterile nutrient medium under controlled conditions."],
      ["Many plantlets","Large numbers of genetically similar plantlets can be produced."],
    ],
  },
};

const NATURAL = ["bulb","corm","rhizome","runner","tuber"];
const ARTIFICIAL = ["cutting","grafting","budding","tissue"];

function ReferencePanel({ item }) {
  const [featureIndex,setFeatureIndex] = useState(0);
  const feature = item.features[featureIndex] || item.features[0];

  return (
    <div className="spark-vp-reference-wrap">
      <div className="spark-vp-stage">
        <img src={item.image} alt={item.alt} loading="lazy" />
      </div>

      <div className="spark-vp-feature-panel">
        <span>Tap a feature to explore the science</span>
        <div className="spark-vp-feature-tabs">
          {item.features.map(([title],index)=>(
            <button
              type="button"
              key={title}
              className={index===featureIndex ? "active" : ""}
              onClick={()=>setFeatureIndex(index)}
            >
              {title}
            </button>
          ))}
        </div>
        <div className="spark-vp-feature-copy" role="status">
          <strong>{feature?.[0]}</strong>
          <p>{feature?.[1]}</p>
        </div>
      </div>

      <small className="spark-vp-source">
        Reference: <a href={item.source} target="_blank" rel="noreferrer">{item.credit}</a>
        {" · "}{item.license}
      </small>
    </div>
  );
}

export default function VegetativePropagationExplorer() {
  const [group,setGroup] = useState("natural");
  const [naturalId,setNaturalId] = useState("bulb");
  const [artificialId,setArtificialId] = useState("cutting");

  const ids = group==="natural" ? NATURAL : ARTIFICIAL;
  const id = group==="natural" ? naturalId : artificialId;
  const selected = MEDIA[id];

  return (
    <section className="spark-vp-explorer">
      <header>
        <span>PROPAGATION REFERENCES</span>
        <h3>Vegetative propagation in plants</h3>
        <p>Study real botanical photographs and reusable scientific reference diagrams, then use the feature buttons to identify what makes each method work.</p>
      </header>

      <div className="spark-vp-group-tabs">
        <button type="button" className={group==="natural" ? "active" : ""} onClick={()=>setGroup("natural")}>Natural methods</button>
        <button type="button" className={group==="artificial" ? "active" : ""} onClick={()=>setGroup("artificial")}>Artificial methods</button>
      </div>

      <div className="spark-vp-method-tabs">
        {ids.map(key=>{
          const item=MEDIA[key];
          return (
            <button
              type="button"
              key={key}
              className={key===id ? "active" : ""}
              onClick={()=>{
                if(group==="natural") setNaturalId(key);
                else setArtificialId(key);
              }}
            >
              <strong>{item.title}</strong>
              <span>{item.example}</span>
            </button>
          );
        })}
      </div>

      <ReferencePanel key={id} item={selected}/>

      <div className="spark-vp-caption">
        <strong>{selected.title}</strong>
        <span>{selected.example}</span>
      </div>
    </section>
  );
}
