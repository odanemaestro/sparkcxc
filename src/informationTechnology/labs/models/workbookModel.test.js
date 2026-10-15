import { evaluateCell, translateFormula } from "./workbookModel.mjs";

const workbook = { Sales: { A2: "Mouse", B2: 8, C2: 2200, D2: "=B2*C2", D3: 100, D4: 200, D5: 300, H1: 0.15 } };

describe("workbook model", () => {
  it("evaluates arithmetic and core aggregate functions", () => {
    expect(evaluateCell(workbook, "Sales", "D2").value).toBe(17600);
    expect(evaluateCell({ Sales: { ...workbook.Sales, D6: "=SUM(D2:D5)" } }, "Sales", "D6").value).toBe(18200);
  });

  it("recalculates dependent cells and accepts multiple function arguments", () => {
    const changed = { Sales: { A1: 5, A2: 7, B1: "=A1*A2", B2: "=SUM(A1,A2,B1)" } };
    expect(evaluateCell(changed, "Sales", "B1").value).toBe(35);
    expect(evaluateCell(changed, "Sales", "B2").value).toBe(47);
    changed.Sales.A1 = 6;
    expect(evaluateCell(changed, "Sales", "B1").value).toBe(42);
    expect(evaluateCell(changed, "Sales", "B2").value).toBe(55);
  });

  it("supports IF, COUNTIF, DATE, PMT and VLOOKUP", () => {
    const cells = { ...workbook.Sales, E2: '=IF(D2>=10000,"HIGH","LOW")', E3: '=COUNTIF(D2:D5,">=200")', E4: "=DATE(2026,6,30)", E5: '=VLOOKUP("Mouse",A2:D2,4,FALSE)', E6: "=PMT(0.01,12,120000)" };
    expect(evaluateCell({ Sales: cells }, "Sales", "E2").value).toBe("HIGH");
    expect(evaluateCell({ Sales: cells }, "Sales", "E3").value).toBe(3);
    expect(evaluateCell({ Sales: cells }, "Sales", "E4").value).toBe("2026-06-30");
    expect(evaluateCell({ Sales: cells }, "Sales", "E5").value).toBe(17600);
    expect(evaluateCell({ Sales: cells }, "Sales", "E6").value).toBeLessThan(0);
  });

  it("COUNTIF only counts cells in the requested range", () => {
    const book = { Sales: { A1: 1, A2: 3, A3: 5, B1: '=COUNTIF(A1:A3,">=3")', B2: '=COUNTIF(A1:A3,">=9")' } };
    expect(evaluateCell(book, "Sales", "B1").value).toBe(2);
    expect(evaluateCell(book, "Sales", "B2").value).toBe(0);
  });

  it("IF only evaluates the chosen branch", () => {
    const book = { Sales: { A1: '=IF(TRUE,42,1/0)', A2: '=IF(FALSE,1/0,7)' } };
    expect(evaluateCell(book, "Sales", "A1").value).toBe(42);
    expect(evaluateCell(book, "Sales", "A2").value).toBe(7);
  });

  it("exact VLOOKUP supports references on another worksheet", () => {
    const book = { Data: { A1: "Mouse", B1: 150, A2: "Keyboard", B2: 200 }, Summary: { A1: '=VLOOKUP("Keyboard",Data!A1:B2,2,FALSE)' } };
    expect(evaluateCell(book, "Summary", "A1").value).toBe(200);
  });

  it("respects arithmetic precedence and grouped absolute-reference expressions", () => {
    const book={Sales:{H1:0.15,B2:4,C2:500,D2:"=B2*C2",F2:"=D2*(1+$H$1)",A1:"=2+3*4",A2:"=(2+3)*4",A3:"=7-2-1"}};
    expect(evaluateCell(book,"Sales","F2").value).toBeCloseTo(2300);
    expect(evaluateCell(book,"Sales","A1").value).toBe(14);
    expect(evaluateCell(book,"Sales","A2").value).toBe(20);
    expect(evaluateCell(book,"Sales","A3").value).toBe(4);
  });

  it("preserves absolute and mixed references while filling", () => {
    expect(translateFormula("=D2*$H$1", 3, 0)).toBe("=D5*$H$1");
    expect(translateFormula("=$D2*H$1", 2, 1)).toBe("=$D4*I$1");
  });

  it("returns visible spreadsheet errors", () => {
    expect(evaluateCell({ Sales: { A1: "=UNKNOWN(A2)" } }, "Sales", "A1").value).toBe("#NAME?");
    expect(evaluateCell({ Sales: { A1: "=A1" } }, "Sales", "A1").value).toBe("#CIRC!");
    expect(evaluateCell({ Sales: { A1: 2, A2: 0, A3: "=A1/A2" } }, "Sales", "A3").value).toBe("#DIV/0!");
  });
});