const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921034000_integrated_science_objective_174.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","NonCommunicableDiseaseExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","nonCommunicableDiseaseExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.4 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.4", () => {
    expect(migration).toContain('"objective":"1.7.4"');
    expect(migration).toContain("1.7.4 Non-communicable Diseases");
  });

  test("uses the exact SPARK CSEC glucose dataset", () => {
    expect(explorer).toContain("personA:[5,7.5,6.5,5.5,5,5,5]");
    expect(explorer).toContain("personB:[8,11,12.5,12.5,12,11,10]");
    expect(migration).toContain("Person A begins at about 5 mmol per litre");
    expect(migration).toContain("Person B begins at about 8 mmol per litre");
  });

  test("distinguishes Type 1 and Type 2 diabetes accurately", () => {
    expect(migration).toContain("Type 1 diabetes is an autoimmune disease");
    expect(migration).toContain("require insulin replacement");
    expect(migration).toContain("In Type 2 diabetes, body cells become less responsive to insulin");
    expect(migration).toContain("The condition is not caused by eating sugar alone");
  });

  test("covers long-term effects of uncontrolled diabetes", () => {
    expect(migration).toContain("damage the eyes, kidneys, nerves, heart and blood vessels");
    expect(migration).toContain("slow wound healing");
  });

  test("covers hypertension risk, salt mechanism and complications", () => {
    expect(migration).toContain("Hypertension is persistently raised blood pressure");
    expect(migration).toContain("often causes no obvious symptoms");
    expect(migration).toContain("high sodium intake");
    expect(migration).toContain("increase blood volume");
    expect(migration).toContain("stroke, heart disease, heart failure, kidney damage");
  });

  test("distinguishes allergy autoimmune disease and asthma", () => {
    expect(migration).toContain("An allergy is an excessive immune response");
    expect(migration).toContain("In an autoimmune disease, the immune system mistakenly attacks");
    expect(migration).toContain("Lupus and rheumatoid arthritis");
    expect(migration).toContain("Asthma is a chronic inflammatory condition of the airways");
    expect(migration).toContain("air pollution");
  });

  test("renders asthma airway narrowing as a tissue cross-section", () => {
    for (const term of [
      "spark-asthma-airway-svg",
      "Healthy airway",
      "Asthma airway",
      "tightened smooth muscle",
      "swollen inflamed lining",
      "excess mucus",
      "narrowed opening makes airflow more difficult",
      "Smoke, air pollution, allergens or infections"
    ]) expect(explorer).toContain(term);
    expect(css).toContain(".spark-asthma-airway-svg");
    expect(css).toContain(".asthma-muscle.tightened");
    expect(css).toContain(".asthma-lining.swollen");
    expect(css).toContain(".asthma-lumen.narrowed");
  });

  test("uses the non-communicable disease explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"non-communicable-disease"');
    expect(view).toContain("NonCommunicableDiseaseExplorer");
    expect(explorer).toContain("Diabetes");
    expect(explorer).toContain("Hypertension");
    expect(explorer).toContain("Immune conditions");
    expect(explorer).toContain("Risk reduction");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Interpreting a glucose-response graph");
    expect(migration).toContain("Explain how high sodium intake can contribute to hypertension.");
    expect(migration).toContain("How does an allergy differ from an autoimmune disease?");
  });
});
