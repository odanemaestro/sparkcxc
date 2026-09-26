const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921045000_integrated_science_objective_222.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","HumanDigestionExplorer.jsx"),
  "utf8"
);
const explorerCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","humanDigestionExplorer.css"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const diagramCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.2 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.2", () => {
    expect(migration).toContain('"objective":"2.2.2"');
    expect(migration).toContain("2.2.2 Digestion in Humans");
  });

  test("covers the digestive pathway and required organs", () => {
    expect(migration).toContain("Mouth and oesophagus");
    expect(migration).toContain("Stomach");
    expect(migration).toContain("Liver, gall bladder and bile");
    expect(migration).toContain("Pancreas and small intestine");
    expect(migration).toContain("Large intestine");
  });

  test("adds the required tracked digestive-system anatomy diagram", () => {
    expect(migration).toContain('"template":"human-digestive-system"');
    expect(migration).toContain('"text":"Mouth"');
    expect(migration).toContain('"text":"Oesophagus"');
    expect(migration).toContain('"text":"Stomach"');
    expect(migration).toContain('"text":"Liver"');
    expect(migration).toContain('"text":"Gall bladder"');
    expect(migration).toContain('"text":"Pancreas"');
    expect(migration).toContain('"text":"Small intestine"');
    expect(migration).toContain('"text":"Large intestine"');
    expect(diagram).toContain("HumanDigestiveTemplate");
    expect(diagram).toContain('template === "human-digestive-system"');
    expect(diagramCss).toContain("SPARK_HUMAN_DIGESTIVE_TEMPLATE_V1");
  });

  test("covers the full banked enzyme set", () => {
    expect(migration).toContain("Salivary amylase");
    expect(migration).toContain("Pepsin");
    expect(migration).toContain("Rennin");
    expect(migration).toContain("Trypsin");
    expect(migration).toContain("Maltase");
    expect(migration).toContain("Lactase");
    expect(migration).toContain("Lipase");
    expect(explorer).toContain("Rennin (chymosin)");
  });

  test("explains bile correctly", () => {
    expect(migration).toContain("produced by the liver and stored in the gall bladder");
    expect(migration).toContain("emulsifies fat into smaller droplets");
    expect(migration).toContain("neutralise acidic chyme");
    expect(explorer).toContain("Bile is not an enzyme");
  });

  test("covers villus adaptations and lacteal absorption", () => {
    expect(migration).toContain("one cell thick");
    expect(migration).toContain("Glucose and amino acids enter blood capillaries");
    expect(migration).toContain("central lacteal");
    expect(explorer).toContain("one-cell-thick epithelium");
    expect(explorer).toContain("lacteal");
  });

  test("distinguishes absorption assimilation and egestion", () => {
    expect(migration).toContain("Absorption is the movement");
    expect(migration).toContain("Assimilation is the use");
    expect(migration).toContain("Egestion is the removal");
  });

  test("covers temperature and pH effects on enzymes", () => {
    expect(migration).toContain("about 37 °C");
    expect(migration).toContain("60 °C");
    expect(migration).toContain("close to pH 2");
    expect(migration).toContain("denatured");
    expect(explorer).toContain("37 °C approximately");
  });

  test("wires the digestion explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"human-digestion"');
    expect(view).toContain("HumanDigestionExplorer");
    expect(explorer).toContain("Villus absorption");
    expect(explorer).toContain("Enzyme conditions");
  });

  test("uses the public-domain digestive anatomy reference in the pathway explorer", () => {
    expect(explorer).toContain("Digestive_system_without_labels.svg");
    expect(explorer).toContain("LadyofHats / Mariana Ruiz");
    expect(explorer).toContain("Public domain");
    expect(explorer).toContain("spark-digestion-hotspot");
    expect(explorer).toContain("spark-digestion-reference-stage");
    expect(explorerCss).toContain(".spark-digestion-reference-stage");
  });

  test("visuals remain responsive and dark-mode ready", () => {
    expect(explorerCss).toContain("@media(max-width:850px)");
    expect(explorerCss).toContain("@media(max-width:620px)");
    expect(explorerCss).toContain('html[data-theme="dark"]');
  });

  test("advances the course to forty-seven audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":47');
    expect(migration).toContain('"objectivesBuilt":47');
  });
  test("uses a real unlabeled digestive-system reference beneath SPARK targets", () => {
    expect(diagram).toContain("Digestive_system_without_labels.svg");
    expect(diagram).toContain("Public domain");
    expect(diagram).toContain("digestive-mouth-target");
    expect(diagram).toContain("digestive-small-target");
  });

});
