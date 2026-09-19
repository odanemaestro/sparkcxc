const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "labs");
const hub = fs.readFileSync(path.join(root, "InformationTechnologyPracticalLabs.jsx"), "utf8");
const css = fs.readFileSync(path.join(root, "informationTechnologyLabs.css"), "utf8");
const word = fs.readFileSync(path.join(root, "labs", "WordLab.jsx"), "utf8");
const sheet = fs.readFileSync(path.join(root, "labs", "SpreadsheetLab.jsx"), "utf8");
const db = fs.readFileSync(path.join(root, "labs", "DatabaseLab.jsx"), "utf8");
const ppt = fs.readFileSync(path.join(root, "labs", "PresentationLab.jsx"), "utf8");
const web = fs.readFileSync(path.join(root, "labs", "WebDesignLab.jsx"), "utf8");
const code = fs.readFileSync(path.join(root, "labs", "ProgrammingLab.jsx"), "utf8");

describe("Information Technology Practical Labs V2", () => {
  test("heavy lab workspaces are lazy-loaded", () => {
    expect(hub).toContain('lazy(() => import("./labs/WordLab"))');
    expect(hub).toContain('lazy(() => import("./labs/SpreadsheetLab"))');
    expect(hub).toContain('lazy(() => import("./labs/DatabaseLab"))');
    expect(hub).toContain('lazy(() => import("./labs/PresentationLab"))');
    expect(hub).toContain('lazy(() => import("./labs/WebDesignLab"))');
    expect(hub).toContain('lazy(() => import("./labs/ProgrammingLab"))');
  });

  test("Word studio recreates core document workflows", () => {
    for (const feature of ["Home","Insert","Layout","Review","Mailings","Track Changes","Replace All","Heading 1","Check box"]) {
      expect(word).toContain(feature);
    }
  });

  test("Spreadsheet studio includes formula bar, functions, data tools, chart, summary and linked sheets", () => {
    for (const feature of ["formulaBar","SUM","AVERAGE","IF","COUNTIF","VLOOKUP","PMT","Pivot summary","Column","Summary"]) {
      expect(sheet).toContain(feature);
    }

    expect(sheet).toContain("translateFormula");
    expect(sheet).toContain("\\$H\\$1");
    expect(sheet).toContain('evidence.has("absolute-fill")');
    expect(sheet).toContain('B2: "=Sales!D6"');
  });

  test("Database studio includes tables, relationships, queries, forms and reports", () => {
    for (const feature of ["Tables","Relationships","Queries","Forms","Reports","One-to-many","Primary Key","AmountOwed"]) {
      expect(db).toContain(feature);
    }
  });

  test("Presentation studio includes slides, themes, transitions, notes and slide show", () => {
    for (const feature of ["New Slide","Title and Content","Transitions","Slide Show","Notes","PRESENTATION_THEMES"]) {
      expect(ppt).toContain(feature);
    }

    expect(ppt).toContain('theme-${theme.toLowerCase() || "default"}');
    expect(css).toContain(".itv2-slide.theme-ocean");
    expect(css).toContain(".itv2-slide.theme-slate");
  });

  test("Web studio includes site tree, responsive preview, hyperlinks and publishing check", () => {
    for (const feature of ["Site pages","Desktop","Mobile","Email link","External link","Run link checker","Publish site"]) {
      expect(web).toContain(feature);
    }
  });

  test("Programming studio supports CXC languages plus run, test, trace, debug and documentation workflows", () => {
    for (const feature of [
      "Visual Basic",
      "Pascal",
      "C",
      "Code",
      "Test & Output",
      "Variable Trace",
      "Debug",
      "Execution trace",
      "FOR",
      "Add useful comment",
      "PROGRAMMING_TEMPLATES",
      "assessSelectionProgram",
      "assessTaxDebug",
    ]) {
      expect(code).toContain(feature);
    }

    expect(code).toMatch(/IF[-\u2013]ELSE/);
  });

  test("responsive and dark mode lab styling remains present", () => {
    expect(css).toContain("@media(max-width:920px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });
});
