import {matchFnhCriterionEvidence} from "./fnhPaper2RubricCalibration";
import {gradeFnhWrittenPart} from "./fnhPaper2Marking";

describe("FNH source-bound polarity accuracy",()=>{
 const model="Diet means the usual foods and drinks consumed by a person.";
 test("genuine matching evidence is still recognised",()=>{
  expect(matchFnhCriterionEvidence(model,model).confirmed).toBe(true);
  expect(gradeFnhWrittenPart({id:"x",marks:1,modelPoints:[model]},model).confirmedMarks).toBe(1);
 });
 test.each([
  "It is false that diet means the usual foods and drinks consumed by a person.",
  "It is incorrect to say diet means the usual foods and drinks consumed by a person.",
  "Diet does not mean the usual foods and drinks consumed by a person.",
  "Diet doesn’t mean the usual foods and drinks consumed by a person.",
  "Diet is unable to mean the usual foods and drinks consumed by a person."
 ])("cannot grant FNH marks for a denial: %s",(response)=>{
  const checked=matchFnhCriterionEvidence(model,response);
  expect(checked.confirmed).toBe(false);
  const result=gradeFnhWrittenPart({id:"x",marks:1,modelPoints:[model]},response);
  expect(result.confirmedMarks).toBe(0);
  expect(result.unresolvedMarks).toBe(1);
 });
 test("matching affirmative plus denial remains unresolved",()=>{
  const response=model+" It is false that "+model.toLowerCase();
  expect(matchFnhCriterionEvidence(model,response).confirmed).toBe(false);
 });
 test("negative model facts keep their original polarity",()=>{
  const negative="Diet does not consist only of foods intended for weight loss.";
  expect(matchFnhCriterionEvidence(negative,negative).confirmed).toBe(true);
  expect(matchFnhCriterionEvidence(negative,"Diet consists only of foods intended for weight loss.").confirmed).toBe(false);
 });
});