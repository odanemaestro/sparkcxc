const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921040000_integrated_science_objective_178.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PestVectorExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","pestVectorExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 1.7.8 acceptance audit", () => {
  test("maps directly to canonical objective 1.7.8", () => {
    expect(migration).toContain('"objective":"1.7.8"');
    expect(migration).toContain("1.7.8 Pests, Parasites and Vectors");
  });

  test("distinguishes pathogen vector parasite and pest", () => {
    expect(migration).toContain("A pathogen is an agent that causes disease");
    expect(migration).toContain("A vector is an organism that carries and transmits a pathogen");
    expect(migration).toContain("Tapeworms and head lice are syllabus examples");
    expect(migration).toContain("Rats and cockroaches are common household examples");
    expect(explorer).toContain("PATHOGEN");
    expect(explorer).toContain("VECTOR");
    expect(explorer).toContain("PARASITE");
    expect(explorer).toContain("PEST");
  });

  test("covers the exact mosquito breeding-site bank example", () => {
    expect(migration).toContain("old tyres holding rainwater");
    expect(migration).toContain("fast-flowing drain");
    expect(explorer).toContain("old tyre holding rainwater");
    expect(explorer).toContain("uncovered water container");
  });

  test("covers selected disease routes accurately", () => {
    expect(migration).toContain("gastroenteritis");
    expect(migration).toContain("dengue, Zika and chikungunya");
    expect(migration).toContain("Leptospirosis is caused by Leptospira bacteria");
    expect(migration).toContain("shed the bacteria in urine");
    expect(migration).toContain("Cockroaches move through waste");
  });

  test("relates household waste food and standing water to risk", () => {
    expect(migration).toContain("Improperly stored domestic waste");
    expect(migration).toContain("Pet food left outdoors can attract rodents");
    expect(migration).toContain("standing water can support mosquito development");
    expect(explorer).toContain("Uncovered food");
    expect(explorer).toContain("Garbage left for long periods");
  });

  test("uses the pest and vector explorer in the shared lesson shell", () => {
    expect(migration).toContain('"type":"pest-vectors"');
    expect(view).toContain("PestVectorExplorer");
    expect(explorer).toContain("Key terms");
    expect(explorer).toContain("Mosquito risk");
    expect(explorer).toContain("Disease routes");
    expect(explorer).toContain("Home risk check");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("lesson includes CSEC-style worked example and checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(migration).toContain("Separating the vector from the pathogen");
    expect(migration).toContain("Why can old tyres increase mosquito numbers?");
    expect(migration).toContain("How can infected rodents contribute to leptospirosis risk?");
  });
});
