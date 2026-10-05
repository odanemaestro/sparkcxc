// Independent examiner calibration metrics.
// The repository intentionally contains no fabricated examiner benchmark.
// Import consented/anonymised independently marked scripts when available.

export const CALIBRATION_SCHEMA_VERSION="1.0.0";

function mean(values){
  return values.length ? values.reduce((sum,value)=>sum+value,0)/values.length : 0;
}

export function evaluateGradingBenchmark(rows=[]){
  const usable=(rows || []).filter(row=>
    Number.isFinite(Number(row.examinerMark)) &&
    Number.isFinite(Number(row.sparkMark))
  );
  const errors=usable.map(row=>Number(row.sparkMark)-Number(row.examinerMark));
  const absolute=errors.map(Math.abs);
  const exact=errors.filter(value=>value===0).length;
  const withinOne=errors.filter(value=>Math.abs(value)<=1).length;
  const falseAwards=usable.reduce((sum,row)=>{
    if(!Array.isArray(row.criteria)) return sum;
    return sum+row.criteria.filter(c=>c.examinerAwarded===false && c.sparkAwarded===true).length;
  },0);
  const falseRejections=usable.reduce((sum,row)=>{
    if(!Array.isArray(row.criteria)) return sum;
    return sum+row.criteria.filter(c=>c.examinerAwarded===true && c.sparkAwarded===false).length;
  },0);
  const criterionCount=usable.reduce((sum,row)=>sum+(Array.isArray(row.criteria)?row.criteria.length:0),0);
  return {
    schemaVersion:CALIBRATION_SCHEMA_VERSION,
    scripts:usable.length,
    meanError:mean(errors),
    meanAbsoluteError:mean(absolute),
    maxAbsoluteError:absolute.length?Math.max(...absolute):0,
    exactAgreement:usable.length?exact/usable.length:0,
    withinOneMark:usable.length?withinOne/usable.length:0,
    criterionFalseAwardRate:criterionCount?falseAwards/criterionCount:0,
    criterionFalseRejectionRate:criterionCount?falseRejections/criterionCount:0,
    falseAwards,
    falseRejections,
    criterionCount,
  };
}

export function benchmarkReady(rows=[]){
  return Array.isArray(rows) && rows.length>0 && rows.every(row=>
    row.scriptId &&
    row.subjectId &&
    row.examiner1 &&
    row.examiner2 &&
    row.adjudicated===true &&
    Number.isFinite(Number(row.examinerMark)) &&
    Number.isFinite(Number(row.sparkMark))
  );
}


export function evaluateOfficialRuleBenchmark(cases=[]){
  const rows=(cases || []).filter(row=>row && typeof row.pass==="boolean");
  const passed=rows.filter(row=>row.pass).length;
  const bySubject={};
  rows.forEach(row=>{
    const subjectId=String(row.subjectId || "unknown");
    if(!bySubject[subjectId]) bySubject[subjectId]={cases:0,passed:0,failed:0};
    bySubject[subjectId].cases+=1;
    if(row.pass) bySubject[subjectId].passed+=1;
    else bySubject[subjectId].failed+=1;
  });
  Object.values(bySubject).forEach(row=>{
    row.passRate=row.cases ? row.passed/row.cases : 0;
  });
  return {
    cases:rows.length,
    passed,
    failed:rows.length-passed,
    passRate:rows.length ? passed/rows.length : 0,
    bySubject,
  };
}

export function officialCxcBenchmarkReady(report={},options={}){
  const requiredSubjects=options.requiredSubjects || [
    "english-a","mathematics","physics","information-technology","social-studies","integrated-science"
  ];
  const minCasesPerSubject=Number(options.minCasesPerSubject || 2);
  const minimumPassRate=Number(options.minimumPassRate ?? 1);
  if(!Array.isArray(report.cases) || !report.cases.length) return false;
  const metrics=evaluateOfficialRuleBenchmark(report.cases);
  if(metrics.passRate<minimumPassRate) return false;
  return requiredSubjects.every(subjectId=>
    metrics.bySubject[subjectId]
    && metrics.bySubject[subjectId].cases>=minCasesPerSubject
    && metrics.bySubject[subjectId].passRate>=minimumPassRate
  );
}

/**
 * Calibration is intentionally two-layered:
 * 1. official CXC rules/specimen mark schemes: deterministic regression gate;
 * 2. independent double-marked candidate scripts: human-judgement agreement gate.
 *
 * Passing layer 1 must never be presented as examiner-equivalent validation.
 */
export function calibrationStatus({officialReport,independentRows=[]}={}){
  return {
    officialCxcReady:officialCxcBenchmarkReady(officialReport),
    independentExaminerReady:benchmarkReady(independentRows),
    examinerEquivalent:false,
    note:"Official CXC rule calibration validates marking rules. Examiner-equivalent claims still require independently double-marked candidate scripts with adjudication.",
  };
}
