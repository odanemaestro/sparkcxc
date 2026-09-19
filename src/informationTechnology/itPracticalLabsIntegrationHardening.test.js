const fs = require("fs");
const path = require("path");

const read = (...parts) => fs.readFileSync(path.join(__dirname, ...parts), "utf8");

describe("IT practical labs integration hardening", () => {
  const hub = read("labs", "InformationTechnologyPracticalLabs.jsx");
  const frame = read("labs", "components", "LabFrame.jsx");
  const css = read("labs", "informationTechnologyLabs.css");
  const database = read("labs", "labs", "DatabaseLab.jsx");
  const presentation = read("labs", "labs", "PresentationLab.jsx");
  const programming = read("labs", "labs", "ProgrammingLab.jsx");

  test("lab navigation uses SVG icons instead of emoji-prone arrow glyphs", () => {
    expect(hub).toContain("ArrowUpRightIcon");
    expect(hub).toContain("ArrowLeftIcon");
    expect(hub).not.toContain(">↗<");
    expect(frame).toContain("ArrowLeftIcon");
    expect(frame).not.toContain("← Practical Labs");
  });

  test("database relationship connector is SVG-based", () => {
    expect(database).toContain("RelationshipConnector");
    expect(database).toContain('className="itv2-relationship-link"');
    expect(database).not.toContain("─────────");
  });

  test("presentation and programming action arrows use SVG icons", () => {
    expect(presentation).toContain("ChevronUpIcon");
    expect(presentation).toContain("ChevronDownIcon");
    expect(presentation).toContain("PlayIcon");
    expect(presentation).toContain("ArrowLeftIcon");
    expect(presentation).toContain("ArrowRightIcon");
    expect(programming).toContain("PlayIcon");
    expect(programming).not.toContain("▶ Run");
  });

  test("mobile workspaces contain page overflow and keep complex canvases internally scrollable", () => {
    expect(css).toContain(".itv2-labs-home,.itv2-lab-page{overflow-x:clip}");
    expect(css).toContain(".itv2-word-page.columns-2{width:620px;min-width:620px}");
    expect(css).toContain(".itv2-db-design-table,.itv2-db-result{min-width:620px}");
    expect(css).toContain(".itv2-code-editor{min-width:640px}");
    expect(css).toContain("-webkit-overflow-scrolling:touch");
  });

  test("code editor preserves code layout with horizontal scrolling on narrow screens", () => {
    expect(programming).toContain('wrap="off"');
    expect(css).toContain(".itv2-code-editor{overflow:auto;white-space:pre;tab-size:2}");
  });
});
