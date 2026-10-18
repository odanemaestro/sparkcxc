/**
 * Batch 13: cross-subject Paper 2 adversarial regression gates.
 * All judgements use SPARK's built-in non-AI graders. Test cases are
 * authored practice benchmarks, not official examiner scripts.
 */
import {gradeChemistryPaper2Item,chemistryFinalNumericEvidence} from "../chemistry/practice/chemistryPaper2Grader";
import {physicsValueCheck} from "../physics/paper2/physicsPaper2Marking";
import {checkNumeric} from "../practice/cxcMarking/checkers";
import {formulaMatches,queryMatches,pseudocodeSumIsEquivalent} from "../informationTechnology/practice/itPaper2Marking";
import {gradeEnglishAPaper2} from "../englishA/practice/englishAPaper2Grader";
import {buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeIntegratedSciencePaper2Item} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {gradeSocialStudiesShortAnswer} from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import {SOCIAL_STUDIES_PAPER2} from "../socialStudies/data/socialStudiesExamBank";
import {runCxcOfficialCalibration} from "./cxcOfficialPaper2Calibration";

const chemQuestion={id:"CHEM13"};
const chemistry=value=>gradeChemistryPaper2Item(chemQuestion,0,0,
 {marks:1,markScheme:{points:["25.0"]}},{"CHEM13:0:0":value});
const sciQuestion={id:"SCI13"};
const science=value=>gradeIntegratedSciencePaper2Item(sciQuestion,0,0,
 {marks:2,markScheme:{points:["heat increases evaporation","water vapour condenses"]}},
 {"SCI13:0:0":value});

test("Chemistry numeric results reject a correct intermediate result if the stated final is incorrect",()=>{
 expect(chemistry("Working: 25.0; final answer: 80.0").score).toBe(0);
 expect(chemistry("Working: 80.0; final answer: 25.0").score).toBe(1);
 expect(chemistry("25.0 or 80.0").score).toBe(0);
 expect(chemistry("answer: 25.0; answer: 80.0").score).toBe(0);
 expect(chemistry("final answer: 25.0").score).toBe(1);
 expect(chemistryFinalNumericEvidence("answer: 25.0; answer: 80.0").ambiguous).toBe(true);
});
test("Chemistry marks a genuine numeric equivalent, but not arbitrary nearby values",()=>{
 expect(chemistry("25.0").score).toBe(1);
 expect(chemistry("26.0").score).toBe(0);
 expect(chemistry("50.0; working; final answer: 25.0").score).toBe(1);
});
test("Physics correct intermediate calculations cannot override wrong final quantity or unit",()=>{
 const check={type:"value",value:4000,unit:"J"};
 expect(physicsValueCheck("Working: 4000 J; final answer: 5 kJ",check)).toBe(false);
 expect(physicsValueCheck("Working: 5000 J; final answer: 4 kJ",check)).toBe(true);
 expect(physicsValueCheck("4000 J or 5000 J",check)).toBe(false);
});
test("Mathematics preserves independent answer, precision, and units checks",()=>{
 const number={type:"numeric",value:5};
 expect(checkNumeric("4 or 5",number).ok).toBe(false);
 expect(checkNumeric("x=3; final answer is 5",number).ok).toBe(true);
 expect(checkNumeric("3.14",{type:"numeric",value:3.14,dp:2}).ok).toBe(true);
 expect(checkNumeric("3.1",{type:"numeric",value:3.14,dp:2}).ok).toBe(false);
 expect(checkNumeric("25 cm",{type:"numeric",value:25,requireUnit:"cm"}).ok).toBe(true);
 expect(checkNumeric("25 m",{type:"numeric",value:25,requireUnit:"cm"}).ok).toBe(false);
});
test("Information Technology spreadsheet rules recognise mathematical equivalence but reject altered range",()=>{
 expect(formulaMatches("=SUM(A1:A3)",["=A1+A2+A3"])).toBe(true);
 expect(formulaMatches("=A3+A1+A2",["=SUM(A1:A3)"])).toBe(true);
 expect(formulaMatches("=SUM(A1:A4)",["=SUM(A1:A3)"])).toBe(false);
 expect(formulaMatches("=A1+A2+A3 or =A1",["=A1+A2+A3"])).toBe(false);
});
test("IT query and pseudocode criteria do not equate changed constraints or extra operands",()=>{
 expect(queryMatches("age >= 18 AND status = 'active'","status = 'active' AND age >= 18")).toBe(true);
 expect(queryMatches("age >= 16 AND status = 'active'","age >= 18 AND status = 'active'")).toBe(false);
 expect(pseudocodeSumIsEquivalent("SCORE <- ENG + MATH + SCI",["ENG","MATH","SCI"])).toBe(true);
 expect(pseudocodeSumIsEquivalent("SCORE <- ENG + MATH + SCI + 1",["ENG","MATH","SCI"])).toBe(false);
});
test("Integrated Science accepts distinct facts and refuses ungrounded duplicates",()=>{
 expect(science("Heat increases evaporation. Water vapour condenses.").score).toBe(2);
 expect(science("Heat increases evaporation. Heat increases evaporation.").score).toBe(1);
 expect(science("Heat increases evaporation. Heat does not increase evaporation.").score).toBe(0);
 const unresolved=gradeIntegratedSciencePaper2Item(sciQuestion,0,0,
  {marks:3,markScheme:{points:["heat increases evaporation"]}},
  {"SCI13:0:0":"Heat increases evaporation."});
 expect(unresolved.score).toBe(1);
 expect(unresolved.unassessedMarks).toBe(2);
});
test("Social Studies distinguishes stated points from supported developments",()=>{
 const scheme=SOCIAL_STUDIES_PAPER2[0].parts[1].marking;
 const partial=gradeSocialStudiesShortAnswer("More women work outside the home.",scheme);
 const developed=gradeSocialStudiesShortAnswer(
  "More women work outside the home, so fathers share childcare and household duties.",scheme);
 expect(partial.marks).toBe(1);
 expect(developed.marks).toBe(2);
 expect(gradeSocialStudiesShortAnswer("",scheme).marks).toBe(0);
 expect(developed.marks).toBeLessThanOrEqual(developed.maxMarks);
});
test("English A restores the single answered creative option when saved metadata is missing",()=>{
 const paper=buildEnglishAPaper2("EA-P2-A");
 const options=paper.tasks.filter(t=>t.choiceGroup==="M2-creative");
 expect(options.length).toBeGreaterThanOrEqual(2);
 const selected=options[1],other=options[0];
 const answer=("A long and developed account describes characters, choices, dialogue, setting, and consequences. "+
 "The narrator explains what happened, why it mattered, and how the characters responded. ").repeat(14);
 const restored=gradeEnglishAPaper2(paper,{[selected.id]:answer});
 const explicit=gradeEnglishAPaper2(paper,{[selected.id]:answer},selected.id);
 expect(restored.rows.find(r=>r.task.id===selected.id)?.score).toBe(
   explicit.rows.find(r=>r.task.id===selected.id)?.score);
 expect(restored.rows.some(r=>r.task.id===other.id)).toBe(false);
 expect(restored.unresolvedChoices).toEqual([]);
});
test("English A refuses competing unselected creative responses without a choice identifier",()=>{
 const paper=buildEnglishAPaper2("EA-P2-A");
 const options=paper.tasks.filter(t=>t.choiceGroup==="M2-creative");
 const responses={[options[0].id]:"First candidate answer.".repeat(50),
  [options[1].id]:"Second candidate answer.".repeat(50)};
 const ambiguous=gradeEnglishAPaper2(paper,responses);
 expect(ambiguous.unresolvedChoices).toContain("M2-creative");
 const choice=ambiguous.rows.filter(r=>r.task.choiceGroup==="M2-creative");
 expect(choice).toHaveLength(1);
 expect(choice[0].score).toBe(0);
 const explicit=gradeEnglishAPaper2(paper,responses,options[1].id);
 expect(explicit.rows.find(r=>r.task.id===options[1].id)?.score).toBeGreaterThan(0);
});
test("Official-rule calibration remains green across all six supported referenced CXC subjects",()=>{
 const result=runCxcOfficialCalibration();
 expect(result.passRate).toBe(1);
 expect(Object.keys(result.bySubject).sort()).toEqual([
 "english-a","information-technology","integrated-science","mathematics","physics","social-studies"
 ]);
});
