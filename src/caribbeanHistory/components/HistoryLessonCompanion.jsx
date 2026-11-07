import React from "react";
import { HISTORY_REVISED_THEMES, HISTORY_SYLLABUS_URL } from "../data/historyCourse";
import "./historyLearning.css";

const MEDIA = {
  "ch-indigenous-societies": {
    image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/313384/1914694/main-image",
    alt: "Carved Taíno sandstone figure with a hollowed top, prominent eyes and bent limbs.",
    caption: "Taíno zemí figure, c. 1200–1500 CE. Look at the eyes and the top of the sculpture. Which details can you observe directly, and which interpretations need more evidence?",
    source: "The Metropolitan Museum of Art · public domain",
    url: "https://www.metmuseum.org/art/collection/search/313384",
  },
  "ch-encounter-and-conquest": {
    image: `${process.env.PUBLIC_URL || ""}/caribbean-history/figures/ch-2022-p2-q2-mining.jpg`,
    alt: "A European engraving shows Africans working in mines under Spanish supervision.",
    caption: "Theodor de Bry’s 1595 engraving depicts forced labour in Hispaniola. Which details can you see directly? What could a worker’s account tell you that the engraving leaves out?",
    source: "British Library · public domain, via Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/File:Slaves_from_Guinea_digging_for_gold_and_silver_in_mines_in_Hispaniola_-_America_(1595),_A2_-_BL.jpg",
  },
  "ch-plantation-labour": {
    image: "https://cdn.loc.gov/service/pnp/cph/3b10000/3b19000/3b19400/3b19470r.jpg",
    alt: "Historic engraving showing several people around equipment for processing sugar cane.",
    caption: "An engraving of West Indian sugar manufacture. Compare the jobs visible in the image with the jobs described in the lesson. What is hard to tell from this view?",
    source: "Library of Congress · Prints and Photographs Division",
    url: "https://www.loc.gov/item/2003663735/",
  },
  "ch-us-expansion": {
    image: "https://www.archives.gov/exhibits/panoramic_photography/images/panama_canal.jpg",
    alt: "Wide photograph of the landscape and excavated channel during early Panama Canal construction.",
    caption: "Panama Canal excavation, viewed from ground level. The photograph shows the scale of the works. Wage records and workers’ accounts can tell you more about the people who built it.",
    source: "U.S. National Archives · Records of the Panama Canal, 185-P-12",
    url: "https://www.archives.gov/exhibits/panoramic_photography/images/panama_canal.html",
  },
};

const SEQUENCES = {
  "ch-sugar-transition": ["Credit and sugar demand", "Investment in mills and estates", "More land and coerced labour", "Population and power shift"],
  "ch-atlantic-trade": ["Capture and sale", "Coastal holding and embarkation", "Forced Atlantic crossing", "Sale and forced labour"],
  "ch-plantation-labour": ["Cut cane", "Crush the cane", "Boil and clarify juice", "Crystallise and cure sugar"],
  "ch-haitian-revolution": ["1791 · Uprising begins", "1794 · France abolishes slavery", "1802 · French expedition", "1804 · Haitian independence"],
  "ch-apprenticeship": ["1807 · British slave trade banned", "1833 · Abolition Act passed", "1834 · Emancipation and apprenticeship", "1838 · Remaining apprentices freed"],
  "ch-regional-integration": ["1958 · Federation begins", "1962 · Federation dissolves", "1960s · CARIFTA takes shape", "1973 · CARICOM established"],
};

const READINGS = {
  "ch-haitian-revolution": ["Haiti collections and research guide", "https://guides.loc.gov/francophone-caribbean-collections-library-of-congress/haiti"],
  "ch-apprenticeship": ["The Abolition Act and compensation records", "https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/"],
  "ch-labour-protest": ["Jamaica’s labour movement and other history notes", "https://nlj.gov.jm/history-notes-jamaica/"],
  "ch-regional-integration": ["Treaty establishing the Caribbean Community", "https://caricom.org/treaties/treaty-establishing-the-caribbean-community/"],
};

export default function HistoryLessonCompanion({ topic }) {
  const media = MEDIA[topic.id];
  const sequence = SEQUENCES[topic.id];
  const reading = READINGS[topic.id];
  const { revisedTheme } = topic.metadata.syllabus;
  const { check } = topic.metadata.lesson;
  return <div className="ch-lesson-companion">
    {sequence && <figure className="ch-sequence">
      <figcaption>Follow the sequence</figcaption>
      <ol>{sequence.map(step => <li key={step}>{step}</li>)}</ol>
    </figure>}
    {media && <figure className="ch-archive-figure">
      <img src={media.image} alt={media.alt} loading="lazy" decoding="async" onError={event => { event.currentTarget.hidden = true; }} />
      <figcaption><p>{media.caption}</p><a href={media.url} target="_blank" rel="noreferrer">{media.source}</a></figcaption>
    </figure>}
    <details><summary>Check your understanding</summary><p>{check.question}</p><details><summary>Show explanation</summary><p>{check.answer}</p></details></details>
    {reading && <p><a href={reading[1]} target="_blank" rel="noreferrer">{reading[0]}</a></p>}
    {revisedTheme && <p className="ch-syllabus-note">From 2028, this topic connects to Theme {revisedTheme} · {HISTORY_REVISED_THEMES[revisedTheme - 1]}. <a href={HISTORY_SYLLABUS_URL} target="_blank" rel="noreferrer">CXC syllabuses</a></p>}
  </div>;
}
