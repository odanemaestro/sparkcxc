import data from "./itPaper2Data.json";
import {
 executablePseudocode,
 pseudocodeSumIsEquivalent,
 pseudocodeBranchEvidence,
 gradeInformationTechnologyPart,
 informationTechnologyPaper2RuleFor,
 modelResponsesForInformationTechnologyPaper2
} from "./itPaper2Marking";

const parts=data.papers.flatMap(p=>p.questions.flatMap(q=>
 q.parts.map(part=>({paper:p,question:q,part,id:q.number+"-"+part.id}))
));

test("all 252 Information Technology source parts have bounded, explicit grading results",()=>{
 expect(data.papers).toHaveLength(9);
 expect(parts).toHaveLength(252);
 let positive=0,zero=0,noModel=0;
 for(const paper of data.papers){
  const models=modelResponsesForInformationTechnologyPaper2(paper);
  for(const question of paper.questions){
   for(const part of question.parts){
    const id=question.number+"-"+part.id;
    const model=models[id];
    if(!model)noModel++;
    const samples=[
     {answer:""},
     {answer:"ZXQJ VMPQ UNRELATED RESPONSE TEST ONLY"},
     model??{answer:""}
    ];
    const results=samples.map(answer=>gradeInformationTechnologyPart(question,part,answer));
    for(const r of results){
     expect(r.earned).toBeGreaterThanOrEqual(0);
     expect(r.earned).toBeLessThanOrEqual(part.marks);
     expect(r.criteria.reduce((sum,c)=>sum+c.earned,0)).toBe(r.earned);
    }
    expect(results[0].earned).toBe(0);
    expect(results[1].earned).toBe(0);
    if(results[2].earned>0)positive++;
    else zero++;
  }
 }
 }
 console.log("Nine IT papers; model-answer recognition diagnostics",{
  sourceParts:parts.length,modelWithMarks:positive,modelWithoutMarks:zero,missingModels:noModel
 });
 // Source exemplars are QA probes. A zero here needs investigation rather
 // than an invented approval or a final zero for a student's equivalent answer.
 expect(positive).toBeGreaterThan(0);
});

test.each(parts.filter(x=>informationTechnologyPaper2RuleFor(x.question,x.part)==="pseudocode").map(x=>
 [x.paper.id,x.question.number,x.part]))(
 "IT %s question %i pseudocode: valid work, comments and overwrite attacks",(_paper,number,part)=>{
 const [a,b,c]=part.responseSpec.variables;
 const threshold=part.responseSpec.threshold;
 const good="INPUT "+[a,b,c].join(", ")+"\n"+
  "SCORE = "+[a,b,c].join(" + ")+"\n"+
  "IF SCORE >= "+threshold+" THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF";
 expect(gradeInformationTechnologyPart({number},part,{pseudocode:good}).earned).toBe(part.marks);
 expect(gradeInformationTechnologyPart({number},part,{pseudocode:"// "+good.replaceAll("\n","\n// ")}).earned).toBe(0);
 expect(gradeInformationTechnologyPart({number},part,{pseudocode:"/*\n"+good+"\n*/"}).earned).toBe(0);
 expect(gradeInformationTechnologyPart({number},part,{pseudocode:"# "+good.replaceAll("\n","\n# ")}).earned).toBe(0);
 const bad=good.replace("SCORE = ","SCORE = 0\nSCORE = ");
 const graded=gradeInformationTechnologyPart({number},part,{pseudocode:bad});
 expect(graded.criteria.find(x=>x.code==="P2")?.earned).toBe(0);
 expect(pseudocodeSumIsEquivalent(bad,[a,b,c])).toBe(false);
 const reversed=good.replace("DISPLAY ACCEPT\nELSE\nDISPLAY REVIEW","DISPLAY REVIEW\nELSE\nDISPLAY ACCEPT");
 const wrong=gradeInformationTechnologyPart({number},part,{pseudocode:reversed});
 expect(wrong.criteria.find(x=>x.code==="P4")?.earned).toBe(0);
 expect(wrong.criteria.find(x=>x.code==="P6")?.earned).toBe(0);
 expect(wrong.earned).toBeLessThan(part.marks);
});

test("pseudocode parser does not accept assignment strings inside narration",()=>{
 expect(pseudocodeSumIsEquivalent("The answer is SCORE = a + b + c",["a","b","c"])).toBe(false);
 expect(pseudocodeSumIsEquivalent("// SCORE = a + b + c",["a","b","c"])).toBe(false);
 expect(pseudocodeSumIsEquivalent("SCORE = a + b + c\nSCORE = 0",["a","b","c"])).toBe(false);
 expect(pseudocodeSumIsEquivalent("SCORE = c + b + a",["a","b","c"])).toBe(true);
 expect(pseudocodeBranchEvidence("// IF SCORE >= 80 THEN\n// DISPLAY ACCEPT\n// ELSE\n// DISPLAY REVIEW").hasElse).toBe(false);
 expect(executablePseudocode("/* SCORE = a + b + c */").trim()).toBe("");
});
