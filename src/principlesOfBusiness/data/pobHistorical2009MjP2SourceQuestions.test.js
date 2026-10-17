import {POB_2009_MJ_P2_SOURCE,verifyPob2009SourcePrompts} from "./pobHistorical2009MjP2SourceQuestions";
import {POB_2009_MJ_P2_AUTHORED_SCHEME} from "./pobHistorical2009MjP2AuthoredScheme";
import {buildPobArchiveExaminerPack} from "../../grading/pobArchiveExaminer";
test("2009 source page 2–4 provides all 7 original questions and 36 authored criterion mappings",()=>{
 expect(verifyPob2009SourcePrompts(POB_2009_MJ_P2_AUTHORED_SCHEME)).toEqual({valid:true,parts:36});
 expect(Object.keys(POB_2009_MJ_P2_SOURCE.prompts)).toHaveLength(36);
 expect(POB_2009_MJ_P2_SOURCE.contexts[2]).toContain("Mrs Greenwood");
 expect(POB_2009_MJ_P2_SOURCE.contexts[5]).toContain("Mary-Jo");
 const pack=buildPobArchiveExaminerPack({paperId:"POB-P2-2009-MJ",selectedQuestions:[1,2,3,4,6]});
 expect(pack.items.reduce((n,i)=>n+i.maxMarks,0)).toBe(100);
 expect(pack.sourceQuestionsDigitised).toBe(true);
 expect(pack.items.every(i=>i.constraints.sourceStemFullyVerified===true)).toBe(true);
 expect(pack.items.some(i=>i.prompt.includes("Outline THREE reasons why businesses should conduct market research"))).toBe(true);
});
