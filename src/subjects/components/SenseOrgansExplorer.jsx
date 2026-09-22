import React, { useState } from "react";
import "./senseOrgansExplorer.css";

const SENSES = {
  eye:{
    title:"Eye",
    stimulus:"Light",
    receptor:"Photoreceptors in the retina",
    message:"Light-sensitive receptor cells convert light energy into nerve impulses.",
  },
  ear:{
    title:"Ear",
    stimulus:"Sound vibrations and head movement",
    receptor:"Mechanoreceptors",
    message:"Receptors in the inner ear respond to sound and also contribute to balance.",
  },
  nose:{
    title:"Nose",
    stimulus:"Chemicals in the air",
    receptor:"Chemoreceptors",
    message:"Odour molecules dissolve in mucus and stimulate smell receptors.",
  },
  tongue:{
    title:"Tongue",
    stimulus:"Chemicals dissolved in saliva",
    receptor:"Taste receptors in taste buds",
    message:"Taste receptors detect dissolved chemicals. Smell contributes strongly to flavour.",
  },
  skin:{
    title:"Skin",
    stimulus:"Touch, pressure, pain and temperature",
    receptor:"Several receptor types in the skin",
    message:"Receptor density varies. Fingertips are especially sensitive because they contain many touch receptors.",
  },
};

const SENSE_MEDIA = {
  eye:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Diagram_of_human_eye_without_labels.svg",
    alt:"Unlabeled cross-section of the human eye",
    caption:"Human eye",
    credit:"Jmarchn",
    license:"CC BY-SA 3.0",
    source:"https://commons.wikimedia.org/wiki/File:Diagram_of_human_eye_without_labels.svg",
  },
  ear:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Anatomy_of_the_Human_Ear_blank.svg",
    alt:"Blank cross-sectional anatomy of the human ear",
    caption:"Human ear",
    credit:"Chittka L, Brockmann / M.Komorniczak",
    license:"CC BY 2.5",
    source:"https://commons.wikimedia.org/wiki/File:Anatomy_of_the_Human_Ear_blank.svg",
  },
  nose:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Early_Olfactory_System.svg",
    alt:"Scientific diagram of the olfactory epithelium and early olfactory system",
    caption:"Olfactory system",
    credit:"Benjamin Auffarth, Bernhard Kaplan and Anders Lansner",
    license:"CC BY 3.0",
    source:"https://commons.wikimedia.org/wiki/File:Early_Olfactory_System.svg",
  },
  tongue:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Taste_bud.svg",
    alt:"Scientific diagram of a taste bud containing taste receptor cells",
    caption:"Taste bud",
    credit:"NEUROtiker",
    license:"CC BY-SA 2.5",
    source:"https://commons.wikimedia.org/wiki/File:Taste_bud.svg",
  },
  skin:{
    src:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Skin_Cross-Section_%28NIH_BioArt_677%29.png",
    alt:"NIH cross-section of human skin showing epidermis, dermis, fat, sweat glands and hair follicles",
    caption:"Human skin cross-section",
    credit:"NIH NIAID, Ryan Kissinger",
    license:"Public domain",
    source:"https://commons.wikimedia.org/wiki/File:Skin_Cross-Section_(NIH_BioArt_677).png",
  },
};

function SenseReference({sense}) {
  const media=SENSE_MEDIA[sense];
  return (
    <figure className={"spark-sense-reference "+sense}>
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

export default function SenseOrgansExplorer() {
  const [sense,setSense] = useState("eye");
  const info = SENSES[sense];

  return (
    <section className="spark-sense-organs">
      <header>
        <span>SENSE ORGANS AND RECEPTORS</span>
        <h3>From stimulus to nerve impulse</h3>
        <p>Sense organs contain receptors that detect changes in the environment and convert those stimuli into nerve impulses.</p>
      </header>

      <div className="spark-sense-tabs">
        {Object.entries(SENSES).map(([key,item]) => (
          <button type="button" key={key} className={sense===key ? "active" : ""} onClick={()=>setSense(key)}>
            {item.title}
          </button>
        ))}
      </div>

      <div className="spark-sense-grid">
        <div className="spark-sense-icon"><SenseReference sense={sense} /></div>
        <div className="spark-sense-flow">
          <article><b>Stimulus</b><span>{info.stimulus}</span></article>
          <div className="spark-sense-arrow">→</div>
          <article><b>Receptor</b><span>{info.receptor}</span></article>
          <div className="spark-sense-arrow">→</div>
          <article><b>Signal</b><span>Nerve impulses travel towards the central nervous system.</span></article>
        </div>
      </div>

      <div className="spark-sense-summary">
        <strong>{info.title}</strong>
        <span>{info.message}</span>
      </div>

      {sense === "tongue" && (
        <div className="spark-sense-flavour">
          <b>Why food tastes bland with a blocked nose</b>
          <span>Taste receptors still work, but reduced smell means fewer odour signals reach the brain, so flavour seems weaker.</span>
        </div>
      )}
    </section>
  );
}
