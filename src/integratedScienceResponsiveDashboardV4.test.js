const fs = require("fs");
const path = require("path");
const { displaySkillLabel } = require("./learning/learnerIntelligenceV2");

describe("SPARK growing-subject dashboard and Integrated Science portrait QA", () => {
  test("generic topic routing IDs become learner-friendly labels", () => {
    expect(displaySkillLabel("m1-t1-2-animal-and-plant-cells")).toBe("Animal and Plant Cells");
    expect(displaySkillLabel("m1-t1-1-diffusion-osmosis-active-transport")).toBe("Diffusion Osmosis Active Transport");
    expect(displaySkillLabel("information-technology")).toBe("Information Technology");
  });

  test("next best action keeps raw routing skill but uses friendly display wording", () => {
    const source = fs.readFileSync(
      path.join(__dirname,"learning","nextBestActionV2.js"),
      "utf8"
    );
    expect(source).toContain("displaySkillLabel");
    expect(source).toContain("state.displaySkill || displaySkillLabel(state.skill)");
    expect(source).toContain('`${displaySkillLabel(id)} study`');
  });

  test("subject overview uses a readable responsive grid", () => {
    const css = fs.readFileSync(
      path.join(__dirname,"components","learning","subjectDashboardOverview.css"),
      "utf8"
    );
    expect(css).toContain("SPARK_SUBJECT_GRID_SCALE_V1");
    expect(css).toContain("grid-template-columns:repeat(2,minmax(0,1fr))");
    expect(css).toContain("@media(min-width:1800px)");
    expect(css).toContain("@media(max-width:840px)");
  });

  test("portrait diagrams use numbered structures with a readable label key", () => {
    const component = fs.readFileSync(
      path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
      "utf8"
    );
    const css = fs.readFileSync(
      path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
      "utf8"
    );

    expect(component).toContain("spark-label-target-index");
    expect(component).toContain("Diagram label key");
    expect(component).toContain('completed ? "is-completed" : ""');
    expect(css).toContain("SPARK_PORTRAIT_DIAGRAM_LABELS_V1");
    expect(css).toContain("(max-width:900px) and (orientation:portrait)");
    expect(css).toContain(".spark-label-diagram.is-completed .spark-label-bank");
  });
});