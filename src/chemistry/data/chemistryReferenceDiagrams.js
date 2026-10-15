/*
 * Curated, opt-in Chemistry visual references.
 *
 * Only diagrams with a traceable Wikimedia Commons file page and reusable
 * licence are listed. Keep the attribution and licence URL visible.
 * Never use these as examiner originals or markable interactive activities.
 */
const CC0="https://creativecommons.org/publicdomain/zero/1.0/";
const BY3="https://creativecommons.org/licenses/by/3.0/";
const BYSA3="https://creativecommons.org/licenses/by-sa/3.0/";
const BYSA4="https://creativecommons.org/licenses/by-sa/4.0/";
const COMMONS="https://commons.wikimedia.org/wiki/";
function image(file, title, alt, focus, author, license, licenseUrl) {
  const underscored=file.replace(/ /g,"_");
  return Object.freeze({
    file, title, alt, focus, author, license, licenseUrl,
    sourceUrl:COMMONS+"File:"+encodeURIComponent(underscored),
    imageUrl:COMMONS+"Special:FilePath/"+encodeURIComponent(underscored),
  });
}
export const CHEMISTRY_REFERENCE_DIAGRAMS = Object.freeze({
  "a1-states-of-matter": [
    image("Heating-of-water-with-phase-transitions.svg",
      "Heating curve for water",
      "A graph showing water warming, then temperature plateaus during melting and boiling.",
      "Notice that the temperature stays steady during a change of state even though energy is still being supplied.",
      "MikeRun","CC BY-SA 4.0",BYSA4),
  ],
  "a2-mixtures-separations": [
    image("Paper chromatography.png",
      "Paper chromatography",
      "A paper chromatography arrangement showing how a solvent separates substances carried up the paper.",
      "Identify the solvent level, the starting spot and the separated spots. The start line should be above the solvent.",
      "Theresa Knott; adapted by Shakiestone","CC BY-SA 3.0",BYSA3),
    image("Simple distillation apparatus labelled.svg",
      "Simple distillation apparatus",
      "A labelled distillation setup showing the heated flask, thermometer, condenser and collecting vessel.",
      "Follow the vapour from the heated flask into the condenser. Cooling water flows through the jacket, not through the sample.",
      "Fadingblitz","CC0 1.0",CC0),
  ],
  "a3-atomic-structure": [
    image("Sodium shells.svg",
      "Sodium electron-shell model",
      "A shell diagram of a sodium atom with eleven electrons arranged in three shells.",
      "Count the electrons in each shell: 2, 8, 1. The single outer electron is important when sodium forms Na+.",
      "granpa","Public domain",CC0),
  ],
  "a4-periodic-table": [
    image("Periodic table simple no bw.svg",
      "Periodic table of the elements",
      "A periodic table arranged in rows and columns showing element positions.",
      "Trace the horizontal periods and vertical groups. Compare Groups II and VII and the elements across Period 3.",
      "László Németh","CC0 1.0",CC0),
  ],
  "a7-acids-bases-salts": [
    image("PH scale.svg",
      "pH scale and everyday substances",
      "A pH scale showing acidic, neutral and alkaline examples.",
      "Values below 7 are acidic, 7 is neutral at 25 °C and values above 7 are alkaline.",
      "Tristanevanslee","CC0 1.0",CC0),
    image("Titration-setup-eng.png",
      "Acid–base titration apparatus",
      "An English-labelled laboratory setup with a burette, flask, pH probe and stirring apparatus.",
      "Notice the burette over the reaction vessel. Read the meniscus carefully and record the titre in cm³.",
      "Muskid, adapted from Titration-NaOH-HCl.svg","CC BY-SA 3.0",BYSA3),
  ],
  "a9-electrochemistry": [
    image("Galvanic Cell Diagram.svg",
      "Galvanic cell",
      "A labelled diagram of a galvanic cell with separate electrodes and an external circuit.",
      "Compare electron movement through the external circuit with the movement of ions through the electrolyte or salt bridge. This is a galvanic cell, not an externally powered electrolytic cell.",
      "Rehua","CC BY 3.0",BY3),
  ],
  "b1-hydrocarbon-sources": [
    image("Crude Oil Distillation-en.svg",
      "Fractional distillation of crude oil",
      "A fractionating column with different petroleum fractions leaving at different heights.",
      "Lower-boiling fractions leave higher up where the column is cooler; heavier fractions leave lower down.",
      "Psarianos, Theresa Knott, Rogilbert and Utain","CC BY-SA 3.0",BYSA3),
  ],
  "c2-reactivity-extraction": [
    image("Blast furnace 2.svg",
      "Iron extraction in a blast furnace",
      "A schematic of a blast furnace showing the descending charge and its main working zones.",
      "Trace the raw materials entering from the top, hot air entering lower down, and the collection of molten iron and slag.",
      "Tim1965","CC0 1.0",CC0),
  ],
});
const LEGACY_IDS=Object.freeze({
  A1:"a1-states-of-matter",A2:"a2-mixtures-separations",
  A3:"a3-atomic-structure",A4:"a4-periodic-table",
  A7:"a7-acids-bases-salts",A9:"a9-electrochemistry",
  B1:"b1-hydrocarbon-sources",C2:"c2-reactivity-extraction",
});
export function chemistryReferencesFor(topicId) {
  const id=String(topicId??"");
  return CHEMISTRY_REFERENCE_DIAGRAMS[LEGACY_IDS[id]||id]||[];
}
