// SPARK adjudicated CXC calibration metrics.
//
// SPARK's grading team builds and adjudicates gold-standard cases from official
// CXC syllabuses, specimen mark schemes, examiner/subject reports and historical
// marking patterns. These cases are the permanent calibration authority for
// SPARK's automated Paper 2 graders.

export const CALIBRATION_SCHEMA_VERSION="2.0.0";

function mean(values){
  return values.length ? values.reduce((sum,value)=>sum+value,0)/values.length : 0;
}

function validMarks(row){
  return row && typeof row.goldMark==="number" && typeof row.sparkMark==="number"
    && Number.isFinite(row.goldMark) && Number.isFinite(row.sparkMark)
    && row.goldMark>=0 && row.sparkMark>=0
    && (row.maxMark===undefined || (Number.isFinite(row.maxMark) && row.maxMark>0
      && row.goldMark<=row.maxMark && row.sparkMark<=row.maxMark));
}

export function evaluateGradingBenchmark(rows=[]){
  const usable=(rows || []).filter(validMarks);
  const errors=usable.map(row=>Number(row.sparkMark)-Number(row.goldMark));
  const absolute=errors.map(Math.abs);
  const exact=errors.filter(value=>value===0).length;
  const withinOne=errors.filter(value=>Math.abs(value)<=1).length;
  const falseAwards=usable.reduce((sum,row)=>{
    if(!Array.isArray(row.criteria)) return sum;
    return sum+row.criteria.filter(c=>c.goldAwarded===false && c.sparkAwarded===true).length;
  },0);
  const falseRejections=usable.reduce((sum,row)=>{
    if(!Array.isArray(row.criteria)) return sum;
    return sum+row.criteria.filter(c=>c.goldAwarded===true && c.sparkAwarded===false).length;
  },0);
  const criterionCount=usable.reduce((sum,row)=>sum+(Array.isArray(row.criteria)?row.criteria.length:0),0);
  const criteria=usable.flatMap(row=>Array.isArray(row.criteria)?row.criteria:[])
    .filter(c=>typeof c.goldAwarded==="boolean" && typeof c.sparkAwarded==="boolean");
  const negatives=criteria.filter(c=>!c.goldAwarded).length;
  const positives=criteria.filter(c=>c.goldAwarded).length;
  return {
    schemaVersion:CALIBRATION_SCHEMA_VERSION,
    cases:usable.length,
    invalidCases:rows.length-usable.length,
    meanError:mean(errors),
    meanAbsoluteError:mean(absolute),
    maxAbsoluteError:absolute.length?Math.max(...absolute):0,
    exactAgreement:usable.length?exact/usable.length:0,
    withinOneMark:usable.length?withinOne/usable.length:0,
    criterionFalseAwardRate:negatives?falseAwards/negatives:0,
    criterionFalseRejectionRate:positives?falseRejections/positives:0,
    falseAwards,
    falseRejections,
    criterionCount,
  };
}

export function benchmarkReady(rows=[]){
  return Array.isArray(rows) && rows.length>0 && new Set(rows.map(row=>row?.caseId)).size===rows.length && rows.every(row=>
    validMarks(row) &&
    row.caseId &&
    row.subjectId &&
    row.adjudicatedBy==="spark-calibration-team" &&
    row.adjudicated===true &&
    Array.isArray(row.cxcSources) &&
    row.cxcSources.length>0 &&
    Number.isFinite(Number(row.goldMark)) &&
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
  if(metrics.cases!==report.cases.length) return false;
  if(metrics.passRate<minimumPassRate) return false;
  return requiredSubjects.every(subjectId=>
    metrics.bySubject[subjectId]
    && metrics.bySubject[subjectId].cases>=minCasesPerSubject
    && metrics.bySubject[subjectId].passRate>=minimumPassRate
  );
}

/**
 * SPARK uses one CXC-grounded validation model:
 * 1. deterministic official-rule cases from CXC material;
 * 2. adjudicated candidate-style gold cases authored and reviewed by the
 *    SPARK calibration team from that same CXC evidence.
 *
 * The benchmark is an ongoing quality system. New difficult cases are added as
 * graders evolve, and every release must keep the gold-standard cases passing.
 */
export function calibrationStatus({officialReport,adjudicatedRows=[]}={}){
  const officialReady=officialCxcBenchmarkReady(officialReport);
  const metrics=evaluateGradingBenchmark(adjudicatedRows);
  const adjudicatedReady=adjudicatedRows.length===0 ? officialReady
    : benchmarkReady(adjudicatedRows) && metrics.exactAgreement===1 && metrics.falseAwards===0 && metrics.falseRejections===0;
  return {
    officialCxcReady:officialReady,
    adjudicatedCxcReady:adjudicatedReady,
    validationReady:officialReady && adjudicatedReady,
    authority:"official-cxc-evidence",
    adjudicator:"spark-calibration-team",
    note:"SPARK validates Paper 2 grading against official CXC evidence translated into permanent adjudicated gold-standard cases.",
  };
}
