const { runCxcOfficialCalibration, CXC_CALIBRATION_SOURCES }=require("./cxcOfficialPaper2Calibration");

describe("Official CXC Paper 2 calibration",()=>{
  const report=runCxcOfficialCalibration();

  test("covers every SPARK Paper 2 subject in the current audit",()=>{
    expect(Object.keys(report.bySubject).sort()).toEqual([
      "english-a","information-technology","integrated-science","mathematics","physics","social-studies"
    ]);
  });

  test("uses external CXC sources rather than self-generated answer keys only",()=>{
    expect(CXC_CALIBRATION_SOURCES.length).toBeGreaterThanOrEqual(8);
    CXC_CALIBRATION_SOURCES.forEach(source=>{
      expect(source.url).toMatch(/^https:\/\/www\.cxc\.org\//);
      expect(source.kind).toMatch(/^official-/);
    });
  });

  test("all official-rule calibration cases pass",()=>{
    const failed=report.cases.filter(row=>!row.pass);
    expect(failed).toEqual([]);
    expect(report.passRate).toBe(1);
  });

  test("each subject has multiple calibration cases",()=>{
    Object.values(report.bySubject).forEach(row=>{
      expect(row.cases).toBeGreaterThanOrEqual(2);
      expect(row.passRate).toBe(1);
    });
  });

  test("does not misrepresent synthetic calibration responses as real candidate scripts",()=>{
    expect(report.groundTruth).toMatch(/synthetic responses are SPARK-authored/i);
    expect(report.groundTruth).toMatch(/Official CXC specimen mark schemes/i);
  });
});
