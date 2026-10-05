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
