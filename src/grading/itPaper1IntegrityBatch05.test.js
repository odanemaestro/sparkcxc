import {scorePaper1,auditPaper1OptionIntegrity} from "../practice/paper1Engine";
import {formulaMatches,queryMatches,pseudocodeSumIsEquivalent,pseudocodeBranchEvidence} from "../informationTechnology/practice/itPaper2Marking";

test("Paper 1 checks option letters without capitalization or whitespace false negatives",()=>{
 const questions=[
  {question_id:"one",topic:"Number",correct_option:"a"},
  {question_id:"two",topic:"Number",correct_option:"B"},
  {question_id:"three",topic:"Science",correct_option:"C"},
 ];
 const result=scorePaper1(questions,{one:" A ",two:"b",three:" "});
 expect(result.correct).toBe(2);
 expect(result.unanswered).toBe(1);
 expect(result.incorrect).toBe(0);
 expect(result.percent).toBe(67);
 expect(result.topics.find(t=>t.topic==="Number").percent).toBe(100);
});
test("Paper 1 invalid source answer keys cannot accidentally earn marks",()=>{
 const questions=[{question_id:"invalid",correct_option:"Z"}];
 const result=scorePaper1(questions,{invalid:"Z"});
 expect(result.correct).toBe(0);
 expect(result.rows[0].validKey).toBe(false);
});
test("Paper 1 source audit reports duplicate choices and IDs without rewriting correct mappings",()=>{
 const question=(question_id,option_b="Two")=>({
  question_id,correct_option:" b ",option_a:"One",option_b,
  option_c:"Three",option_d:"Four"
 });
 const report=auditPaper1OptionIntegrity([
  question("one"),question("two","One"),question("one")
 ]);
 expect(report.invalidKeys).toEqual([]);
 expect(report.duplicateOptions).toEqual(["two"]);
 expect(report.duplicateIds).toEqual(["one"]);
 expect(report.clean).toBe(false);
 expect(auditPaper1OptionIntegrity([question("good")]).clean).toBe(true);
});
test("IT spreadsheet formula matching accepts pure commutative multi-cell equivalents",()=>{
 expect(formulaMatches("=A3+A1+A2",["=SUM(A1:A3)"])).toBe(true);
 expect(formulaMatches("=A3*A1*A2",["=A1*A2*A3"])).toBe(true);
 expect(formulaMatches("=A1+A1+A2",["=SUM(A1:A3)"])).toBe(false);
 expect(formulaMatches("=A1*B2+C3",["=C3+A1*B2"])).toBe(false);
 expect(formulaMatches("=SUM(A1:A4)",["=SUM(A1:A3)"])).toBe(false);
});
test("IT SQL marking permits AND in quoted literal data, without missing a conjunct",()=>{
 const expected="Department = 'Research and Development' AND Salary >= 40000";
 expect(queryMatches("Salary >= 40000 AND Department = 'Research and Development'",expected)).toBe(true);
 expect(queryMatches("Department = 'Research and Development' AND Salary > 40000",expected)).toBe(false);
 expect(queryMatches("Department = 'Research' AND Development AND Salary >= 40000",expected)).toBe(false);
 expect(queryMatches("Department = 'Research and Development'",expected)).toBe(false);
});
test("IT pseudocode still rejects missing inputs and inverted conditional branches",()=>{
 expect(pseudocodeSumIsEquivalent("SCORE <- A+B+C",["A","B","C"])).toBe(true);
 expect(pseudocodeSumIsEquivalent("SCORE <- A+B+B",["A","B","C"])).toBe(false);
 const good="IF SCORE >= 50 THEN\nDISPLAY 'ACCEPT'\nELSE\nDISPLAY 'REVIEW'\nENDIF";
 const bad="IF SCORE >= 50 THEN\nDISPLAY 'REVIEW'\nELSE\nDISPLAY 'ACCEPT'\nENDIF";
 expect(pseudocodeBranchEvidence(good)).toMatchObject({hasElse:true,trueAccept:true,falseReview:true});
 expect(pseudocodeBranchEvidence(bad)).toMatchObject({hasElse:true,trueAccept:false,falseReview:false});
});
