const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
const icons = fs.readFileSync(path.join(__dirname, "components", "ui", "Icon.jsx"), "utf8");

describe("SPARK V5.3.9L4 home feature SVG icons", () => {
  test("all six feature cards use shared SVG icon names", () => {
    for (const name of ["featureBook", "featurePencil", "featureVerifiedTutor", "featureAnalytics", "featureExam", "featureLesson"]) {
      expect(app).toContain('["' + name + '",');
    }
  });

  test("feature cards render through the shared Icon component", () => {
    expect(app).toContain('data-spark-feature-icon="svg"');
    expect(app).toContain('<Icon name={icon} size={23} color={accent} strokeWidth={1.8} />');
  });

  test("old emoji artwork is gone from the home feature card block", () => {
    const start = app.indexOf("Built around the actual CXC syllabus");
    const end = app.indexOf("<Footer", start);
    const block = app.slice(start, end);
    for (const emoji of ["📖", "✏️", "🎓", "📊", "📝", "🧠"]) expect(block).not.toContain(emoji);
  });

  test("all six purpose-built icons are registered in Icon.jsx", () => {
    for (const name of ["featureBook", "featurePencil", "featureVerifiedTutor", "featureAnalytics", "featureExam", "featureLesson"]) {
      expect(icons).toContain(name + ":");
    }
  });

  test("feature artwork uses the shared 24x24 stroke SVG system", () => {
    expect(icons).toContain('viewBox="0 0 24 24"');
    expect(icons).toContain('fill="none"');
    expect(icons).toContain('strokeLinecap="round"');
    expect(icons).toContain('strokeLinejoin="round"');
    expect(icons).toContain('color = "currentColor"');
  });

  test("existing navigation icons remain registered", () => {
    for (const name of ["overview", "circles", "tutor", "profile"]) expect(icons).toContain(name + ":");
  });
});
