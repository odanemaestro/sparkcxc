import { auditWorkbook } from "./workbookAudit.mjs";

describe("auditWorkbook", () => {
  test("returns an empty audit for blank workbooks", () => {
    expect(auditWorkbook({ Sales: {} })).toEqual({ formulaCount: 0, issues: [] });
  });

  test("counts valid formulas without reporting false errors", () => {
    const result = auditWorkbook({ Sales: { A1: 3, B1: "=A1*2" } });
    expect(result).toEqual({ formulaCount: 1, issues: [] });
  });

  test("identifies circular references with their worksheet address", () => {
    const result = auditWorkbook({ Sales: { A1: "=B1", B1: "=A1" } });
    expect(result.formulaCount).toBe(2);
    expect(result.issues).toHaveLength(2);
    expect(result.issues.map(issue => issue.cell)).toEqual(["Sales!A1", "Sales!B1"]);
    expect(result.issues.every(issue => issue.code === "#CIRC!")).toBe(true);
  });

  test("isolates errors across worksheets", () => {
    const result = auditWorkbook({ Sales: { A1: "=1/0" }, Summary: { A1: "=SUM(2,3)" } });
    expect(result.formulaCount).toBe(2);
    expect(result.issues.map(issue => issue.cell)).toEqual(["Sales!A1"]);
  });
});
