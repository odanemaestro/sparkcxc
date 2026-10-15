import { ruleDescription, validateCellInput } from "./spreadsheetValidation.mjs";

describe("spreadsheet cell input validation", () => {
  test("accepts ordinary cells without a rule", () => {
    expect(validateCellInput("Anything", null).valid).toBe(true);
  });
  test("checks whole numbers and bounds", () => {
    const rule = { type: "whole", min: 0, max: 100 };
    expect(validateCellInput("25", rule).valid).toBe(true);
    expect(validateCellInput("1.5", rule).valid).toBe(false);
    expect(validateCellInput("-2", rule).valid).toBe(false);
    expect(validateCellInput("101", rule).valid).toBe(false);
  });
  test("handles numeric and required cells", () => {
    expect(validateCellInput("3.5", { type: "decimal", min: 0 }).valid).toBe(true);
    expect(validateCellInput("abc", { type: "decimal" }).valid).toBe(false);
    expect(validateCellInput("", { type: "whole", required: true }).valid).toBe(false);
  });
  test("supports a permitted values list", () => {
    const rule = { type: "list", values: ["Kingston", "Clarendon"] };
    expect(validateCellInput("Kingston", rule).valid).toBe(true);
    expect(validateCellInput("Unknown", rule).valid).toBe(false);
    expect(ruleDescription(rule)).toContain("Clarendon");
  });
  test("formulas remain editable for existing workbook exercises", () => {
    expect(validateCellInput("=SUM(B2:B5)", { type: "whole", min: 0 }).valid).toBe(true);
  });
});
