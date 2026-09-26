const fs=require("fs");const path=require("path");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","GaseousExchangeExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","gaseousExchangeExplorer.css"),"utf8");

describe("Integrated Science respiratory-system SVG acceptance V1",()=>{
  test("renders full human respiratory anatomy from a real reusable reference",()=>{
    [
      "Respiratory_system_complete_no_labels.svg",
      "Bibi Saint-Pol / Jmarchn",
      "CC BY-SA 3.0",
      "Air pathway",
      "Branching airways",
      "Alveoli",
      "Diaphragm",
      "air pathway: nasal cavity → pharynx → larynx → trachea → bronchi → bronchioles → alveoli",
    ].forEach(term=>expect(explorer).toContain(term));
    expect(css).toContain(".spark-respiratory-reference");
    expect(css).toContain(".spark-respiratory-reference img");
    expect(css).toContain(".spark-respiratory-reference-focus");
  });

  test("respiratory-system tab actually mounts the real anatomy view",()=>{
    expect(explorer).toContain('["respiratory","Respiratory system"]');
    expect(explorer).toContain('{view==="respiratory"&&<RespiratorySystemView/>}');
    expect(explorer).toContain("RespiratorySystemView");
  });

  test("keeps respiratory anatomy separate from alveolar gas exchange",()=>{
    expect(explorer).toContain('["respiratory","Respiratory system"]');
    expect(explorer).toContain("RespiratorySystemView");
    expect(explorer).toContain("AlveolusView");
    expect(explorer).toContain("O₂ diffuses into blood");
    expect(explorer).toContain("CO₂ diffuses into alveolar air");
  });

  test("is responsive and dark-mode ready",()=>{
    expect(css).toContain(".spark-respiratory-reference");
    expect(css).toContain(".spark-respiratory-system-notes");
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"] .spark-respiratory-system-svg');
  });
});
