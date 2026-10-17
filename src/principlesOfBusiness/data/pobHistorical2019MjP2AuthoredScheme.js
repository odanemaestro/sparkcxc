// Original May/June 2019 POB Paper 02 duplicate of the already-authored
// alternative scan in owner's ZIP, wrongly labelled Paper 01 there.
// Both 15-page source images show the same test 01240020 paper and Q1–Q5;
// page 2 Q1 stakeholder and page 10 Q4 consumer-organisation prompts
// directly compared. Two distinct archival PDF SHA-256 fingerprints remain
// independently pinned. All criteria are authored by SPARK, NOT CXC.
// This reuses only the question/mark content, NOT its source certification.
import {POB_SUPPLIED_ARCHIVE} from "./pobHistoricalInventory";
import {POB_2019_MJ_ALT_P2_AUTHORED_SCHEME} from "./pobHistorical2019MjAltP2AuthoredScheme";
export const POB_2019_MJ_P2_AUTHORED_SCHEME=Object.freeze({
 ...POB_2019_MJ_ALT_P2_AUTHORED_SCHEME,
 id:"POB-P2-2019-MJ",
 sourceFilename:"CSEC_Principles_of_Business_P2_2019_MJ.pdf",
 sourceSha256:"ce3455f587b74d669f3b446e21c96b98f51e28f891160d570d16896a0f27ae16",
 originalDuplicateArchiveId:"POB-P2-2019-MJ-ALT",
 originalDuplicateArchiveSha256:"5b95df8eaf522bad7684b01bad41b367f8652967715b3983f8c836c5ec93b4bc",
 equivalenceEvidence:"source cover/test code, page2/Q1 and page10/Q4 printed questions matched across independent scans",
 scannedPages:15,officialCxcMarkingSchemeAvailable:false,
 endToEndRubricCalibrationPassed:false,liveScoringApproved:false
});
export function verifyPob2019MjP2AuthoredScheme(paper=POB_2019_MJ_P2_AUTHORED_SCHEME){
 const issues=[],seen=new Set();let parts=0,marks=0;
 const src=POB_SUPPLIED_ARCHIVE.find(x=>x.id==="POB-P2-2019-MJ");
 const alt=POB_SUPPLIED_ARCHIVE.find(x=>x.id==="POB-P2-2019-MJ-ALT");
 if(!src||src.paper!==2||src.sourceSha256!==paper?.sourceSha256||
    src.filename!==paper.sourceFilename)
  issues.push("Official archive PDF name/fingerprint does not match.");
 if(!alt||paper?.originalDuplicateArchiveSha256!==alt.sourceSha256||
    paper?.originalDuplicateArchiveId!==alt.id)
  issues.push("Alternative source provenance invalid.");
 if(!Array.isArray(paper?.questions)||paper.questions.length!==5)
  issues.push("Five source questions required.");
 for(const q of paper.questions||[]){
  if(!Number.isInteger(q.number)||q.number<1||q.number>5||seen.has(q.number))
   issues.push("Wrong or duplicated number.");
  seen.add(q.number);
  let sum=0;const ids=new Set();
  for(const item of q.parts||[]){
   parts++;sum+=item.marks;
   if(!item.id||ids.has(item.id))issues.push("Repeated subpart.");
   ids.add(item.id);
   if(!item.modelAnswer||item.modelAnswer.length<30)issues.push("Missing model explanation.");
   if(!item.criteria?.length||item.criteria.reduce((a,c)=>a+c.marks,0)!==item.marks)
    issues.push("Rubric maximum mismatch.");
  }
  if(sum!==20)issues.push("Question is not 20 marks.");
  marks+=sum;
 }
 if(marks!==100||paper?.candidateMaxMarks!==100)
  issues.push("Wrong 100-mark candidate maximum.");
 if(paper?.liveScoringApproved!==false||paper?.endToEndRubricCalibrationPassed!==false)
  issues.push("No live grade until calibrated and verified.");
 return {valid:issues.length===0,issues,parts,marks};
}
