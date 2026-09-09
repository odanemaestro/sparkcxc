import { adaptiveOptionDisplayText } from "./adaptiveOptionPresentation";

describe("SPARK V5.6.1.1 Adaptive option presentation", () => {
  test("removes a legacy option prefix when Adaptive renders the key separately", () => {
    expect(adaptiveOptionDisplayText("A) $4,080", 0)).toBe("$4,080");
    expect(adaptiveOptionDisplayText("(B) 13", 1)).toBe("13");
  });

  test("removes repeated copies of the same authored key", () => {
    expect(adaptiveOptionDisplayText("(A) A) $4,080", 0)).toBe("$4,080");
  });

  test("supports modern object options", () => {
    expect(adaptiveOptionDisplayText({ key: "C", text: "C) x = (y - 7)/4" }, 2)).toBe("x = (y - 7)/4");
  });

  test("does not strip ordinary answer text beginning with the same letter", () => {
    expect(adaptiveOptionDisplayText("A matrix has determinant 4", 0)).toBe("A matrix has determinant 4");
  });

  test("does not strip a different option key", () => {
    expect(adaptiveOptionDisplayText("B) intentionally authored text", 0)).toBe("B) intentionally authored text");
  });
});
