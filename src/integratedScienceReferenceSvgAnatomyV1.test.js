const fs=require("fs");
const path=require("path");

const read=name=>fs.readFileSync(path.join(__dirname,"subjects","components",name),"utf8");

const microbe=read("MicrobeExplorer.jsx");
const microbeCss=read("microbeExplorer.css");
const teeth=read("TeethFunctionExplorer.jsx");
const teethCss=read("teethFunctionExplorer.css");
const endocrine=read("EndocrineSystemExplorer.jsx");
const endocrineCss=read("endocrineSystemExplorer.css");
const breathing=read("BreathingMechanismExplorer.jsx");
const breathingCss=read("breathingMechanismExplorer.css");
const digestion=read("HumanDigestionExplorer.jsx");
const digestionCss=read("humanDigestionExplorer.css");

describe("Integrated Science reference-driven SVG anatomy V1",()=>{
  test("bacterial cell has full prokaryotic structure",()=>{
    for(const term of [
      "spark-bacterial-cell-svg",
      "capsule / slime layer",
      "cell wall",
      "cell membrane",
      "cytoplasm",
      "ribosomes",
      "nucleoid, chromosome region",
      "plasmid",
      "storage granule",
      "pilus",
      "flagellum"
    ]) expect(microbe).toContain(term);
    expect(microbeCss).toContain(".bac-capsule");
    expect(microbeCss).toContain(".bac-nucleoid");
    expect(microbeCss).toContain(".bac-chromosome");
  });

  test("tooth cross-section contains protective, living and supporting tissues",()=>{
    for(const term of [
      "spark-tooth-structure-svg",
      "enamel",
      "dentine",
      "pulp cavity",
      "nerves and blood vessels",
      "gum",
      "jaw bone",
      "crown",
      "neck",
      "root"
    ]) expect(teeth).toContain(term);
    expect(teethCss).toContain(".ts-enamel");
    expect(teethCss).toContain(".ts-pulp");
  });

  test("endocrine gland map locates major glands in female and male bodies",()=>{
    for(const term of [
      "spark-endocrine-anatomy-svg",
      "pituitary gland",
      "thyroid gland",
      "parathyroid glands",
      "adrenal glands",
      "pancreas",
      "ovaries",
      "testes"
    ]) expect(endocrine).toContain(term);
    expect(endocrineCss).toContain(".ea-pituitary");
    expect(endocrineCss).toContain(".ea-adrenal");
  });

  test("respiratory anatomy traces the airway and distinguishes lung lobes",()=>{
    for(const term of [
      "spark-respiratory-anatomy-svg",
      "nasal cavity",
      "oral cavity",
      "pharynx",
      "epiglottis",
      "larynx",
      "trachea",
      "primary bronchi",
      "bronchioles",
      "right lung, 3 lobes",
      "left lung, 2 lobes",
      "alveoli",
      "diaphragm"
    ]) expect(breathing).toContain(term);
    expect(breathing).toContain("ra-fissure");
    expect(breathingCss).toContain(".ra-fissure");
  });

  test("digestive anatomy includes accessory organs and named bowel regions",()=>{
    for(const term of [
      "salivary glands",
      "pharynx",
      "oesophagus",
      "liver",
      "gall bladder",
      "common bile duct",
      "stomach",
      "pancreas",
      "pancreatic duct",
      "duodenum",
      "small intestine",
      "ascending colon",
      "transverse colon",
      "descending colon",
      "cecum",
      "appendix",
      "sigmoid colon",
      "rectum",
      "anus"
    ]) expect(digestion).toContain(term);
    expect(digestionCss).toContain(".dg-bile-duct");
    expect(digestionCss).toContain(".dg-colon");
  });

  test("new anatomy diagrams retain responsive and dark-mode coverage",()=>{
    for(const css of [microbeCss,teethCss,endocrineCss,breathingCss,digestionCss]){
      expect(css).toContain("@media(max-width:");
      expect(css).toContain('html[data-theme="dark"]');
    }
  });
});
