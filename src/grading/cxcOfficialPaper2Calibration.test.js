const fs=require("fs");
const path=require("path");
const { runCxcOfficialCalibration, CXC_CALIBRATION_SOURCES }=require("./cxcOfficialPaper2Calibration");

describe("Official CXC Paper 2 calibration",()=>{
  const report=runCxcOfficialCalibration();

  test("covers every SPARK Paper 2 subject in the current audit",()=>{
    expect(Object.keys(report.bySubject).sort()).toEqual([
      "english-a","information-technology","integrated-science","mathematics","physics","social-studies"
    ]);
    test("uses the adjudicated CXC schema and removes the obsolete outside-examiner schema",()=>{
    expect(fs.existsSync(path.join(__dirname,"adjudicatedCxcBenchmark.schema.json"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname,"examinerBenchmark.schema.json"))).toBe(false);
    const schema=JSON.parse(fs.readFileSync(path.join(__dirname,"adjudicatedCxcBenchmark.schema.json"),"utf8"));
    expect(schema.title).toBe("SPARK Adjudicated CXC Paper 2 Benchmark");
  });
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

  test("uses the SPARK calibration team as the adjudicator of CXC gold cases",()=>{
    expect(report.adjudicatedBy).toBe("spark-calibration-team");
    expect(report.adjudicated).toBe(true);
    expect(report.groundTruth).toMatch(/Official CXC evidence adjudicated by the SPARK calibration team/i);
    report.cases.forEach(row=>{
      expect(row.adjudicatedBy).toBe("spark-calibration-team");
      expect(row.adjudicated).toBe(true);
      expect(row.cxcSources.length).toBeGreaterThan(0);
    });
  });
});
