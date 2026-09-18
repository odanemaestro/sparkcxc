const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "labs");
const catalog = fs.readFileSync(path.join(root, "labCatalog.js"), "utf8");
const hub = fs.readFileSync(path.join(root, "InformationTechnologyPracticalLabs.jsx"), "utf8");
const word = fs.readFileSync(path.join(root, "labs", "WordLab.jsx"), "utf8");
const sheet = fs.readFileSync(path.join(root, "labs", "SpreadsheetLab.jsx"), "utf8");
const db = fs.readFileSync(path.join(root, "labs", "DatabaseLab.jsx"), "utf8");
const code = fs.readFileSync(path.join(root, "labs", "ProgrammingLab.jsx"), "utf8");
const progress = fs.readFileSync(path.join(__dirname, "..", "subjects", "subjectProgress.js"), "utf8");

describe("Information Technology practical labs core integrity", () => {
  test("provides the six tracked IT practical lab areas through the V2 catalog", () => {
    for (const name of [
      "Word Processing Studio",
      "Spreadsheet Studio",
      "Database Studio",
      "Presentation Studio",
      "Web Design Studio",
      "Programming Studio",
    ]) {
      expect(catalog).toContain(name);
    }

    for (const id of [
      "word-processing",
      "spreadsheet",
      "database",
      "presentation",
      "web-design",
      "programming",
    ]) {
      expect(catalog).toContain(`id: "${id}"`);
    }

    expect(hub).toContain("INFORMATION_TECHNOLOGY_PRACTICAL_LABS");
  });

  test("spreadsheet lab covers syllabus functions, references and data tools", () => {
    expect(sheet).toContain("=SUM(D2:D5)");
    expect(sheet).toContain("=AVERAGE(D2:D5)");
    expect(sheet).toContain("COUNTIF");
    expect(sheet).toContain("VLOOKUP");
    expect(sheet).toContain("PMT");
    expect(sheet).toContain("=D5*$H$1");
    expect(sheet).toContain("Filter");
    expect(sheet).toContain("Pivot Table");
    expect(sheet).toContain("Column");
  });

  test("database lab covers fields, keys, relationships, queries, forms and reports", () => {
    expect(db).toContain("CustomerID");
    expect(db).toContain("Primary Key");
    expect(db).toContain("One-to-many");
    expect(db).toContain("AmountOwed");
    expect(db).toContain("Forms");
    expect(db).toContain("Reports");
    expect(db).toContain("SUM");
  });

  test("word-processing lab covers document creation and advanced review features", () => {
    for (const feature of [
      "Heading 1",
      "Replace All",
      "Track Changes",
      "Mailings",
      "Insert «ParentName»",
      "Check box",
    ]) {
      expect(word).toContain(feature);
    }
  });

  test("programming lab supports the CXC high-level language examples used by SPARK", () => {
    expect(code).toContain("Visual Basic");
    expect(code).toContain("Pascal");
    expect(code).toContain("C");
    expect(code).toContain("IF-ELSE");
    expect(code).toContain("Execution trace");
    expect(code).toContain("FOR");
  });

  test("lab completion remains wired into canonical IT subject progress", () => {
    expect(progress).toContain('type === "it_lab_completion"');
    expect(progress).toContain('activityType: "lab"');
    expect(progress).toContain('source: "information_technology_practical_labs"');
    expect(hub).toContain('type: "it_lab_completion"');
  });
});
