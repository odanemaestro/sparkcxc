const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921033000_integrated_science_objective_172.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","InfectiousDiseaseExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","infectiousDiseaseExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.2", () => {
    expect(migration).toContain('"objective":"1.7.2"');
    expect(migration).toContain("1.7.2 Communicable and Infectious Disease");
  });

  test("defines communicable disease and transmission routes", () => {
    expect(migration).toContain("A communicable disease is caused by a pathogen");
    expect(migration).toContain("respiratory droplets or aerosols");
    expect(migration).toContain("contaminated food or water");
    expect(migration).toContain("sexual contact");
    expect(migration).toContain("infected blood");
    expect(migration).toContain("vectors");
  });

  test("classifies the banked STIs correctly", () => {
    expect(migration).toContain("Gonorrhoea, chlamydia and syphilis are bacterial");
    expect(migration).toContain("Genital herpes is caused by herpes simplex virus");
    expect(migration).toContain("Hepatitis B is caused by a virus");
    expect(migration).toContain("Candida is a yeast, which is a fungus");
  });

  test("uses current medically accurate STI nuance", () => {
    expect(migration).toContain("many infected people, especially women, may have no symptoms");
    expect(migration).toContain("Antibiotic resistance is a serious concern for gonorrhoea");
    expect(migration).toContain("Antiviral medicines can reduce symptoms and outbreaks but do not remove the virus completely");
    expect(migration).toContain("candidiasis is not usually classified as a classic sexually transmitted infection");
  });

  test("distinguishes HIV from AIDS and includes modern treatment principle", () => {
    expect(migration).toContain("HIV is a virus that attacks important immune cells");
    expect(migration).toContain("AIDS is not a separate pathogen");
    expect(migration).toContain("Modern antiretroviral therapy can suppress HIV");
    expect(migration).toContain("undetectable viral load");
  });

  test("covers dengue vectors and mosquito control", () => {
    expect(migration).toContain("A vector is an organism that carries a pathogen");
    expect(migration).toContain("Dengue is caused by a virus");
    expect(migration).toContain("Removing or covering water-holding containers");
    expect(explorer).toContain("Aedes aegypti mosquitoes transmit dengue virus");
  });

  test("covers prevention and antibiotic limits", () => {
    expect(migration).toContain("Correct and consistent condom use");
    expect(migration).toContain("not sharing needles");
    expect(migration).toContain("hepatitis B vaccine");
    expect(migration).toContain("Antibiotics act against bacteria and do not treat viral infections");
  });

  test("uses the infectious-disease explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"infectious-disease"');
    expect(view).toContain("InfectiousDiseaseExplorer");
    expect(explorer).toContain("Transmission routes");
    expect(explorer).toContain("STI profiles");
    expect(explorer).toContain("Prevention");
    expect(explorer).toContain("Vector example");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:800px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Choosing prevention for dengue");
    expect(migration).toContain("Why do antibiotics not treat dengue fever?");
    expect(migration).toContain("State two ways to reduce HIV transmission.");
  });
});
