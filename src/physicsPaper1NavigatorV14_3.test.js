const fs = require("fs");
const path = require("path");

describe("Physics Paper 1 navigator and button system", () => {
const root = path.resolve(__dirname);
const exam = fs.readFileSync(
path.join(root, "physics/paper1/components/PhysicsPaper1Exam.jsx"),
"utf8"
);
const css = fs.readFileSync(
path.join(root, "physics/paper1/components/physicsPaper1.css"),
"utf8"
);

test("desktop navigator is on the right and mobile uses a drawer", () => {
expect(exam).toContain("phy-p1-exam-layout");
expect(exam).toContain("phy-p1-navigator-desktop");
expect(exam).toContain("Question navigator");
expect(exam).toContain("phy-p1-nav-drawer-backdrop");
expect(css).toContain("grid-template-columns:minmax(0,1fr) 292px");
expect(css).toContain(".phy-p1-navigator{position:sticky");
});

test("Physics Paper 1 navigation uses the shared primary button styling", () => {
  expect(exam).toContain("Back to Physics practice");
  expect(exam).toContain("phy-p1-primary");
  expect(exam).toContain("phy-p1-back-practice");
});

test("Paper 1 keeps responsive navigator behavior", () => {
expect(css).toContain("@media(max-width:1024px)");
expect(css).toContain(".phy-p1-navigator-desktop{display:none}");
expect(css).toContain(".phy-p1-nav-toggle{display:inline-flex");
expect(css).toContain(".phy-p1-nav-drawer");
});
});