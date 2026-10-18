/**
 * Cross-course grading release gate.
 *
 * Separates official CXC-derived rule tests from SPARK-authored subject
 * calibrations. A passing build must not be described as examiner agreement:
 * that requires independently adjudicated reference answers and criteria.
 */
export const CROSS_COURSE_GRADING_AUDIT_VERSION="1.0.0";

export const PAPER2_GRADING_SUBJECTS=Object.freeze([
  "chemistry","english-a","food-nutrition-and-health",
  "information-technology","integrated-science","mathematics",
  "physics","principles-of-business","social-studies"
]);
export const OFFICIAL_CXC_RULE_SUBJECTS=Object.freeze([
  "english-a","information-technology","integrated-science",
  "mathematics","physics","social-studies"
]);

const num=value=>typeof value==="number"&&Number.isFinite(value);
const nonnegative=value=>num(value)&&value>=0;
const approx=(a,b)=>Math.abs(a-b)<=0.000001;

export function auditPaper2MarkBounds({subjectId="",score,maxMarks,unresolvedMarks=0,
  provisional=false,final=false,criteria=[],parts=[]}={}){
  const issues=[];
  if(!subjectId||!PAPER2_GRADING_SUBJECTS.includes(subjectId))issues.push("unknown-subject");
  if(!nonnegative(maxMarks)||maxMarks===0)issues.push("invalid-maximum");
  if(!nonnegative(score))issues.push("invalid-score");
  if(!nonnegative(unresolvedMarks))issues.push("invalid-unresolved");
  if(nonnegative(score)&&nonnegative(maxMarks)&&score>maxMarks)issues.push("score-exceeds-maximum");
  if(nonnegative(unresolvedMarks)&&nonnegative(maxMarks)&&unresolvedMarks>maxMarks)issues.push("unresolved-exceeds-maximum");
  if(nonnegative(score)&&nonnegative(maxMarks)&&nonnegative(unresolvedMarks)
      &&score+unresolvedMarks>maxMarks+0.000001)issues.push("potential-exceeds-maximum");
  if(final&&(provisional||unresolvedMarks>0))issues.push("premature-final-score");
  const allParts=Array.isArray(parts)?parts:[];
  if(allParts.length){
    const eligible=allParts.every(part=>nonnegative(part.maxMarks)&&nonnegative(part.score));
    if(!eligible)issues.push("invalid-part-marks");
    else{
      if(allParts.some(part=>part.score>part.maxMarks))issues.push("part-exceeds-maximum");
      if(num(score)&&!approx(allParts.reduce((sum,part)=>sum+part.score,0),score))
        issues.push("part-score-reconciliation");
      if(num(maxMarks)&&!approx(allParts.reduce((sum,part)=>sum+part.maxMarks,0),maxMarks))
        issues.push("part-maximum-reconciliation");
    }
  }
  const allCriteria=Array.isArray(criteria)?criteria:[];
  if(allCriteria.some(c=>!nonnegative(c.maxMarks)||!nonnegative(c.score)||c.score>c.maxMarks))
    issues.push("invalid-criterion-marks");
  return {
    subjectId,pass:issues.length===0,issues,
    confirmed:score,maximum:maxMarks,unresolved:unresolvedMarks,
    releaseState:final?"final":provisional||unresolvedMarks>0?"provisional":"verified"
  };
}

export function auditCrossCourseCalibration({officialReport,subjectCases=[],
  sourceRegistry=[],requiredSubjects=PAPER2_GRADING_SUBJECTS,
  minCasesPerSubject=2}={}){
  const issues=[];
  const official=officialReport?.cases||[];
  const registry=new Map((sourceRegistry||[]).map(row=>[row.id,row]));
  if(!Array.isArray(official)||!official.length)issues.push("missing-official-evidence");
  const seen=new Set();
  const perSubject={};
  const accept=(row,kind)=>{
    const subjectId=String(row?.subjectId||"");
    if(!perSubject[subjectId])perSubject[subjectId]={
      subjectId,total:0,passed:0,failed:0,positive:0,negative:0,official:0,authored:0
    };
    const item=perSubject[subjectId];item.total++;
    const key=String(row?.caseId||row?.id||"");
    if(!key||seen.has(key))issues.push("missing-or-duplicate-case-id");
    seen.add(key);
    const max=Number(row?.maxMarks??row?.maxMark);
    const actual=Number(row?.observedMark??row?.sparkMark);
    const expected=Number(row?.expectedMark??row?.goldMark);
    // Official cases may use descriptive expected values and the boolean
    // adjudicated pass flag; this cannot stand in for a numeric gold case.
    const numeric=nonnegative(max)&&max>0&&nonnegative(actual)&&nonnegative(expected)
      &&actual<=max&&expected<=max;
    const passed=kind==="official"?row?.pass===true:numeric&&approx(actual,expected);
    if(passed)item.passed++;else{item.failed++;issues.push("calibration-disagreement");}
    if(kind==="official"){
      item.official++;
      const source=registry.get(row?.sourceId);
      if(!source||source.subjectId!==subjectId||
          !/^official-/.test(source.kind||"")||
          !/^https:\/\/www\.cxc\.org\//.test(source.url||""))
        issues.push("unverified-official-source");
      if(row?.adjudicated!==true||row?.adjudicatedBy!=="spark-calibration-team")
        issues.push("missing-internal-adjudication");
    }else{
      item.authored++;
      if(!numeric)issues.push("invalid-gold-mark");
      if(!row?.rubricVersion||!row?.gradingEvidenceId)
        issues.push("missing-calibration-provenance");
      if(numeric){
        if(expected===0)item.negative++;
        if(expected>0)item.positive++;
      }
    }
  };
  (Array.isArray(official)?official:[]).forEach(row=>accept(row,"official"));
  (Array.isArray(subjectCases)?subjectCases:[]).forEach(row=>accept(row,"authored"));
  // Authored subject tests cannot substitute for a missing CXC-anchored
  // case in courses that claim an official-rule calibration suite.
  for(const subjectId of OFFICIAL_CXC_RULE_SUBJECTS){
    if(!perSubject[subjectId]||perSubject[subjectId].official<minCasesPerSubject)
      issues.push("missing-official-rule-coverage:"+subjectId);
  }
  for(const subjectId of requiredSubjects){
    const row=perSubject[subjectId];
    if(!row||row.total<minCasesPerSubject)issues.push("missing-subject-coverage:"+subjectId);
    // Subject-authored test cases must demonstrate both awarded and withheld
    // marks; all-positive tests cannot detect excessive credit.
    if(!row||row.authored<2||!row.positive||!row.negative)
      issues.push("missing-positive-negative-pair:"+subjectId);
  }
  return {version:CROSS_COURSE_GRADING_AUDIT_VERSION,pass:issues.length===0,
    issues:[...new Set(issues)],bySubject:perSubject,
    officialCases:official.length,authoredCases:subjectCases.length,
    note:"Passing this deterministic gate validates the authored fixtures, not universal examiner equivalence."};
}
