import React, { useState } from "react";
import "./animalAsexualReproductionExplorer.css";

const METHODS = {
  binary:{
    title:"Binary fission",
    example:"Amoeba or Paramecium",
    note:"One parent cell copies its genetic material and divides into two daughter cells.",
    outcome:"Two genetically similar daughter cells are produced.",
  },
  budding:{
    title:"Budding",
    example:"Hydra",
    note:"A small outgrowth forms on the parent, grows and later separates as a new individual.",
    outcome:"The new individual develops from the body of one parent.",
  },
  fragmentation:{
    title:"Fragmentation",
    example:"Planarian flatworm",
    note:"The parent body separates into pieces and each suitable fragment regenerates missing parts.",
    outcome:"Each viable fragment can grow into a complete organism.",
  },
  parthenogenesis:{
    title:"Parthenogenesis",
    example:"Aphids and male honeybees",
    note:"An egg develops into a new individual without fertilisation.",
    outcome:"No fusion of male and female gametes occurs.",
  },
};

const METHOD_MEDIA = {
  binary:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Binary_fission.svg",
    alt:"Scientific sequence showing binary fission and formation of two daughter cells",
    caption:"Binary fission",
    credit:"JWSchmidt / JTojnar",
    license:"CC BY-SA 3.0",
    source:"https://commons.wikimedia.org/wiki/File:Binary_fission.svg",
  },
  budding:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Hydra_Budding.svg",
    alt:"Scientific sequence showing a bud growing from a Hydra parent and separating as a daughter organism",
    caption:"Budding in Hydra",
    credit:"A.houghton19",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Hydra_Budding.svg",
  },
  fragmentation:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Regeneracion.jpg",
    alt:"Photograph showing regeneration in planarian flatworms",
    caption:"Planarian regeneration",
    credit:"Hhgutierrez49",
    license:"CC BY-SA 3.0",
    source:"https://commons.wikimedia.org/wiki/File:Regeneracion.jpg",
  },
  parthenogenesis:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Live_Birth_in_Aphids.jpg",
    alt:"Magnified photograph of an aphid giving birth to a genetically identical nymph by parthenogenesis",
    caption:"Parthenogenesis in aphids",
    credit:"MicrocosmicWorld",
    license:"CC BY-SA 4.0",
    source:"https://commons.wikimedia.org/wiki/File:Live_Birth_in_Aphids.jpg",
  },
};

function MethodReference({method}) {
  const media=METHOD_MEDIA[method];
  return (
    <figure className={"spark-animal-asexual-reference "+method}>
      <img src={media.src} alt={media.alt} loading="lazy" />
      <figcaption>
        <span>{media.caption}</span>
        <small>
          Reference: <a href={media.source} target="_blank" rel="noreferrer">{media.credit}</a>
          {" · "}{media.license}
        </small>
      </figcaption>
    </figure>
  );
}

export default function AnimalAsexualReproductionExplorer() {
  const [method,setMethod] = useState("binary");
  const info = METHODS[method];

  return (
    <section className="spark-animal-asexual">
      <header>
        <span>ASEXUAL REPRODUCTION</span>
        <h3>One parent, different methods</h3>
        <p>Compare how a new individual forms without the fusion of male and female gametes.</p>
      </header>
      <div className="spark-animal-asexual-tabs">
        {Object.entries(METHODS).map(([key,item])=>(
          <button type="button" key={key} className={method===key?"active":""} onClick={()=>setMethod(key)}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="spark-animal-asexual-stage">
        <MethodReference method={method}/>
      </div>
      <div className="spark-animal-asexual-notes">
        <article><b>Example</b><span>{info.example}</span></article>
        <article><b>What happens</b><span>{info.note}</span></article>
        <article><b>Outcome</b><span>{info.outcome}</span></article>
      </div>
      <div className="spark-animal-asexual-warning">
        <strong>Common feature</strong>
        <span>Asexual reproduction is rapid and needs only one parent, but offspring usually have little genetic variation. A disease or environmental change may therefore affect many individuals in the same way.</span>
      </div>
    </section>
  );
}
