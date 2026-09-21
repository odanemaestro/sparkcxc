const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921043500_integrated_science_objective_213.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","PhotosynthesisEnergyExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","photosynthesisEnergyExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.1.3 acceptance audit", () => {
  test("maps directly to canonical objective 2.1.3", () => {
    expect(migration).toContain('"objective":"2.1.3"');
    expect(migration).toContain("2.1.3 Photosynthesis and Energy Conversion");
  });

  test("contains the word and balanced equations", () => {
    expect(migration).toContain("carbon dioxide + water → glucose + oxygen");
    expect(migration).toContain("6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂");
    expect(explorer).toContain("6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂");
  });

  test("explains the energy conversion and chlorophyll role", () => {
    expect(migration).toContain("light energy is converted to chemical energy");
    expect(migration).toContain("chlorophyll");
    expect(explorer).toContain("Light energy is converted to chemical energy stored in glucose");
  });

  test("renders leaf tissue and chloroplast structure for light capture", () => {
    expect(explorer).toContain("Leaf + chloroplast");
    expect(explorer).toContain("spark-photo-chloroplast-svg");
    expect(explorer).toContain("pcl-palisade");
    expect(explorer).toContain("pcl-chloroplast-dot");
    expect(explorer).toContain("pcl-stoma");
    expect(explorer).toContain("pcl-xylem");
    expect(explorer).toContain("pcl-phloem");
    expect(explorer).toContain("pcl-grana");
    expect(explorer).toContain("pcl-starch-grain");
    expect(explorer).toContain("chlorophyll in chloroplast membranes absorbs light energy");
    expect(css).toContain(".spark-photo-chloroplast-svg");
  });

  test("covers the full starch-test method and safety", () => {
    expect(migration).toContain("destarched");
    expect(migration).toContain("heated in ethanol using a water bath");
    expect(migration).toContain("Ethanol is flammable");
    expect(migration).toContain("blue-black");
    expect(explorer).toContain("Destarch the plant");
  });

  test("covers variegated leaf, light and pondweed evidence", () => {
    expect(migration).toContain("variegated leaf");
    expect(migration).toContain("covered from light");
    expect(migration).toContain("relights a glowing splint");
    expect(explorer).toContain("VARIEGATED LEAF");
    expect(explorer).toContain("PONDWEED");
  });

  test("explains starch storage and limiting factors", () => {
    expect(migration).toContain("Starch is insoluble");
    expect(migration).toContain("another factor such as carbon dioxide concentration or temperature is limiting");
    expect(explorer).toContain("another factor limits rate");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"photosynthesis-energy"');
    expect(view).toContain("PhotosynthesisEnergyExplorer");
    expect(explorer).toContain("Starch test");
    expect(explorer).toContain("Limiting factors");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-four audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":44');
    expect(migration).toContain('"objectivesBuilt":44');
  });
});
