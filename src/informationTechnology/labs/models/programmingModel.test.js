import {
  PROGRAMMING_TEMPLATES,
  assessSelectionProgram,
  assessTaxDebug,
  runLoopProgram,
  runSelectionProgram,
} from "./programmingModel.mjs";

describe("programming execution model", () => {
  test.each(["Visual Basic", "Pascal", "C"])("executes both selection branches in %s", language => {
    const code = PROGRAMMING_TEMPLATES[language].selection;
    expect(runSelectionProgram({ language, code, input: 49 }).output).toBe("FAIL");
    expect(runSelectionProgram({ language, code, input: 50 }).output).toBe("PASS");
    expect(assessSelectionProgram(language, code).passed).toBe(true);
  });

  test("reports incomplete source instead of producing guessed output", () => {
    const run = runSelectionProgram({ language: "C", code: "int mark;", input: 72 });
    expect(run.ok).toBe(false);
    expect(run.errors.length).toBeGreaterThan(0);
  });

  test.each(["Visual Basic", "Pascal", "C"])("traces a five-step FOR loop in %s", language => {
    const run = runLoopProgram({ language, code: PROGRAMMING_TEMPLATES[language].loop });
    expect(run.ok).toBe(true);
    expect(run.output).toBe("15");
    expect(run.trace.filter(step => step.statement.includes("total ←")).length).toBe(5);
  });

  test.each(["Visual Basic", "Pascal", "C"])("accepts the tax debug task only after the rate is corrected in %s", language => {
    const faulty = PROGRAMMING_TEMPLATES[language].debug;
    expect(assessTaxDebug(language, faulty).passed).toBe(false);
    expect(assessTaxDebug(language, faulty.replace("0.50", "0.15")).passed).toBe(true);
  });
});