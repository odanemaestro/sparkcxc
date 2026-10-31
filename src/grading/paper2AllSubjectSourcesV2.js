/**
 * Verified file-level source inventory for all configured SPARK Paper 2 subjects.
 * Authored banks/graders exist; file presence is NOT server rubric approval.
 *
 * Do not use this manifest to seed active database rubrics or to award marks.
 * Activation needs a server-verified criterion manifest for the exact paper.
 */
import {PAPER2_GRADING_SUBJECTS} from "./crossCourseGradingRelease";

export const PAPER2_V2_SOURCE_INVENTORY_VERSION="paper2-all-subjects-source-inventory-v1";

export const PAPER2_V2_SOURCE_INVENTORY=Object.freeze([
 {subjectId:"office-administration",
  source:"src/officeAdministration/data/oaPaper2.js",
  marker:"src/officeAdministration/oaMarkingV2.js",
  adapter:"oaPaper2Criteria",
  scheme:"part.criteria / sourceMarking.criteria"},
 {subjectId:"principles-of-accounts",
  source:"src/principlesOfAccounts/data/poaPaper2.js",
  marker:"src/principlesOfAccounts/poaMarkingV2.js",
  adapter:"mapPoaPaper2V2",
  scheme:"question.checkpoints / sourceMarking.criteria"},
 {subjectId:"chemistry",
  source:"src/chemistry/data/chemistryPaper2Bank.js",
  marker:"src/chemistry/practice/chemistryPaper2Grader.js",
  adapter:"mapChemistryPaper2",
  scheme:"markScheme.points"},
 {subjectId:"english-a",
  source:"src/englishA/data/englishAPaper2Bank.js",
  marker:"src/englishA/practice/englishAPaper2Grader.js",
  adapter:"mapEnglishAPaper2",
  scheme:"task.rubric.criteria"},
 {subjectId:"food-nutrition-and-health",
  source:"src/fnh/data/fnhPaper2Bank.js",
  marker:"src/fnh/practice/fnhPaper2Marking.js",
  adapter:"mapFnhHistoricalPaper2",
  scheme:"item.modelPoints"},
 {subjectId:"information-technology",
  source:"src/informationTechnology/practice/itPaper2Data.json",
  marker:"src/informationTechnology/practice/itPaper2Marking.js",
  adapter:"mapInformationTechnologyPaper2",
  scheme:"part.markScheme"},
 {subjectId:"integrated-science",
  source:"public/integrated-science/bank/index.json",
  marker:"src/integratedScience/practice/integratedSciencePaper2Grader.js",
  adapter:"mapIntegratedSciencePaper2",
  scheme:"module.paper02.parts.items"},
 {subjectId:"mathematics",
  source:"src/practice/paper2QuestionBankV2.js",
  marker:"src/practice/cxcMarking/markScheme.js",
  adapter:"mapMathematicsPaper2",
  scheme:"part.marks + source-specific M/A/B"},
 {subjectId:"physics",
  source:"src/physics/paper2/physicsPaper2Bank.js",
  marker:"src/physics/paper2/physicsPaper2Marking.js",
  adapter:"mapPhysicsPaper2",
  scheme:"part.criteria"},
 {subjectId:"principles-of-business",
  source:"src/principlesOfBusiness/data/pobPaper2Original.js",
  marker:"src/principlesOfBusiness/data/pobHistoricalPaper2RubricReview.js",
  adapter:"mapPobPaper2Manifest",
  scheme:"item.criteria / historical source rubrics"},
 {subjectId:"social-studies",
  source:"src/socialStudies/data/socialStudiesExamBank.js",
  marker:"src/socialStudies/marking/socialStudiesEssayGrader.js",
  adapter:"mapSocialStudiesPaper2",
  scheme:"part.marking / essay components"}
].map(item=>Object.freeze({
 ...item,sourceCodePresent:true,
 // None of these values can substitute for server-side verified rubric IDs,
 // complete paper-specific criteria or an authoritative marking approval.
 verifiedServerRubric:false,canPublishV2FinalScore:false
})));

export function auditPaper2SubjectSourceInventory(items=PAPER2_V2_SOURCE_INVENTORY){
 const issues=[];
 if(!Array.isArray(items))return {pass:false,issues:["invalid-inventory"]};
 const subjectIds=new Set(),sources=new Set();
 for(const item of items){
  if(!PAPER2_GRADING_SUBJECTS.includes(item?.subjectId)||
    subjectIds.has(item?.subjectId))issues.push("duplicate-or-unknown-subject");
  subjectIds.add(item?.subjectId);
  if(typeof item?.source!=="string"||!item.source.startsWith("src/")&&
      !item.source.startsWith("public/")||sources.has(item.source))
   issues.push("missing-or-duplicate-source");
  sources.add(item?.source);
  if(!item?.marker||!item?.adapter||!item?.scheme)
   issues.push("missing-marker-or-mapping");
  if(item?.verifiedServerRubric!==false||item?.canPublishV2FinalScore!==false)
   issues.push("unverified-source-claimed-publishable");
 }
 for(const subjectId of PAPER2_GRADING_SUBJECTS)
  if(!subjectIds.has(subjectId))issues.push("missing-subject:"+subjectId);
 return {
  version:PAPER2_V2_SOURCE_INVENTORY_VERSION,
  pass:issues.length===0,issues,
  sourceSubjects:subjectIds.size,
  // A source-bank inventory never reads or attests DB approval.
  serverRubricsVerified:0,canPublishFinalScore:false
 };
}
