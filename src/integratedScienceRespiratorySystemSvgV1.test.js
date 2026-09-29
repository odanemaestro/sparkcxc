const fs=require("fs");const path=require("path");
const explorer=fs.readFileSync(path.join(__dirname,"subjects","components","GaseousExchangeExplorer.jsx"),"utf8");
const css=fs.readFileSync(path.join(__dirname,"subjects","components","gaseousExchangeExplorer.css"),"utf8");

describe("Integrated Science respiratory-system SVG acceptance V1",()=>{
  test("renders full human respiratory anatomy",()=>{
    [
      "spark-respiratory-system-svg",
      "nasal cavity",
      "pharynx",
      "larynx",
      "trachea",
      "left bronchus",
      "right bronchus",
      "bronchioles",
      "alveoli",
      "diaphragm",
    ].forEach(term=>expect(explorer).toContain(term));
  });

  test("shows branching airway geometry and alveolar region",()=>{
    expect(explorer).toContain("gx-trachea-main");
    expect(explorer).toContain("gx-bronchus");
    expect(explorer).toContain("gx-bronchiole-tree");
    expect(explorer).toContain("gx-alveoli-cluster");
    expect(explorer).toContain("air pathway: nasal cavity → pharynx → larynx → trachea → bronchi → bronchioles → alveoli");
  });

  test("keeps respiratory anatomy separate from alveolar gas exchange",()=>{
    expect(explorer).toContain('["respiratory","Respiratory system"]');
    expect(explorer).toContain("RespiratorySystemView");
    expect(explorer).toContain("AlveolusView");
    expect(explorer).toContain("O₂ diffuses into blood");
    expect(explorer).toContain("CO₂ diffuses into alveolar air");
  });

  test("is responsive and dark-mode ready",()=>{
    expect(css).toContain(".spark-respiratory-system-svg");
    expect(css).toContain(".spark-respiratory-system-notes");
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"] .spark-respiratory-system-svg');
  });
});
