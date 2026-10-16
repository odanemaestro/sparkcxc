import {pobPaper2Completion,nextIncompletePobQuestion} from "./pobPaper2Progress";
const questions=[{id:"q1",items:[{id:"a"},{id:"b"}]},{id:"q2",items:[{id:"a"},{id:"b"}]},{id:"q3",items:[{id:"a"}]}];
test("counts only nonblank responses",()=>{
 expect(pobPaper2Completion(questions,{"q1:a":" yes ","q1:b":"   ","q3:a":"ok"}).map(x=>x.answered)).toEqual([1,0,1]);
});
test("next incomplete question wraps and skips completed questions",()=>{
 const answers={"q1:a":"a","q1:b":"b","q2:a":"a"};
 expect(nextIncompletePobQuestion(questions,answers,0)).toBe(1);
 expect(nextIncompletePobQuestion(questions,answers,2)).toBe(1);
});
test("returns null for a fully answered or empty examination",()=>{
 const answers={"q1:a":"a","q1:b":"b","q2:a":"a","q2:b":"b","q3:a":"a"};
 expect(nextIncompletePobQuestion(questions,answers,0)).toBeNull();
 expect(nextIncompletePobQuestion([],{},0)).toBeNull();
});
