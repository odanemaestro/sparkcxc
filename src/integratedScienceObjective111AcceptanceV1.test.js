const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname,relative),"utf8");

describe("Integrated Science Objective 1.1.1 acceptance audit V1", () => {
  const migration = read("../supabase/migrations/20260921010000_integrated_science_acceptance_gate_v1.sql");
  const studyView = read("subjects/GenericSubjectStudyView.jsx");
  const investigation = read("subjects/components/TransportInvestigationExplorer.jsx");
  const investigationCss = read("subjects/components/transportInvestigationExplorer.css");
  const transportCss = read("subjects/components/transportProcessExplorer.css");

  test("canonical objective codes are used for the first two lessons", () => {
    expect(migration).toContain("1.1.1 Diffusion, Osmosis and Active Transport");
    expect(migration).toContain("'"1.1.1"'::jsonb");
    expect(migration).toContain("1.1.2 Animal and Plant Cells");
    expect(migration).toContain("'"1.1.2"'::jsonb");
  });

  test("Integrated Science enables sequential lesson progression and direct-route protection", () => {
    expect(migration).toContain('"progression":"sequential"');
    expect(migration).toContain('"directRouteProtection":true');
    expect(studyView).toContain("resolveSequentialTopic");
    expect(studyView).toContain("Complete the current lesson before opening this lesson.");
    expect(studyView).toContain("Next lesson");
    expect(studyView).toContain("Previous");
  });

  test("Objective 1.1.1 covers required CSEC transport concepts", () => {
    [
      "steeper concentration gradient",
      "red blood cell",
      "plant cell in pure water",
      "root hair cells",
      "small intestine",
      "volcanic ash",
      "selectively permeable",
    ].forEach(term => expect(migration.toLowerCase()).toContain(term.toLowerCase()));
  });

  test("Objective 1.1.1 includes practical investigation visuals and experimental reasoning", () => {
    expect(migration).toContain('"type":"transport-investigations"');
    expect(studyView).toContain("TransportInvestigationExplorer");
    expect(investigation).toContain("Osmometer");
    expect(investigation).toContain("Potato strips");
    expect(investigation).toContain("Visking tubing");
    expect(investigation).toContain("Changed");
    expect(investigation).toContain("Measured");
    expect(investigation).toContain("Keep constant");
  });

  test("lesson includes worked CSEC application and learner checks", () => {
    expect(migration).toContain('"workedExample"');
    expect(migration).toContain('"checks"');
    expect(studyView).toContain("Check your understanding");
    expect(studyView).toContain("Show answer");
  });

  test("new investigation and existing transport model are responsive and dark-mode ready", () => {
    expect(investigationCss).toContain("@media(max-width:850px)");
    expect(investigationCss).toContain("@media(max-width:560px)");
    expect(investigationCss).toContain('html[data-theme="dark"]');
    expect(transportCss).toContain("SPARK_TRANSPORT_DARK_STAGE_V2");
  });
});
