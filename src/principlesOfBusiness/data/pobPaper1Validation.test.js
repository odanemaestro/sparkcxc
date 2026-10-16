import {POB_PAPER1_ORIGINAL_ITEMS,buildPobPaper1,validatePobPaper1Items} from "./pobPaper1Original";
test("the original 60-question bank satisfies structural checks",()=>{
 expect(validatePobPaper1Items()).toEqual({valid:true,issues:[]});
 expect(buildPobPaper1().questions).toHaveLength(60);
});
test("a missing section prevents a silently shortened exam",()=>{
 const incomplete=POB_PAPER1_ORIGINAL_ITEMS.filter(q=>q.section!==10);
 expect(validatePobPaper1Items(incomplete).valid).toBe(false);
 expect(()=>buildPobPaper1({items:incomplete})).toThrow(/Section 10/);
});
test("duplicate stems, IDs and malformed answers are rejected",()=>{
 const corrupt=POB_PAPER1_ORIGINAL_ITEMS.map(q=>({...q,options:[...q.options]}));
 corrupt[1]={...corrupt[1],id:corrupt[0].id,stem:corrupt[0].stem,answer:"E",options:["same","same","","other"]};
 const result=validatePobPaper1Items(corrupt);
 expect(result.valid).toBe(false);
 expect(result.issues.join(" ")).toMatch(/duplicate ID/);
 expect(result.issues.join(" ")).toMatch(/duplicate question stem/);
 expect(result.issues.join(" ")).toMatch(/invalid answer key/);
});
test("unmapped objective codes are rejected",()=>{
 const corrupt=POB_PAPER1_ORIGINAL_ITEMS.map(q=>({...q}));
 corrupt[0]={...corrupt[0],objectiveCode:"S2.1"};
 expect(validatePobPaper1Items(corrupt).issues.join(" ")).toMatch(/objective code outside/);
});
