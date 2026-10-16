import {restorePobAttempt,pobRemainingSeconds} from "./pobAttemptRecovery";
const base={paperId:"pob-original-paper1-v1",attemptId:"test-1",phase:"exam",index:3,answers:{a:"B"},flags:{a:true},deadline:2000};
test("restores an active attempt without extending its deadline",()=>{
 expect(restorePobAttempt(base,base.paperId,60,1000)).toMatchObject({phase:"exam",deadline:2000,index:3});
});
test("automatically closes an expired attempt on reload",()=>{
 expect(restorePobAttempt(base,base.paperId,60,2500)).toMatchObject({phase:"review",reason:"timer",submittedAt:2500});
});
test("rejects broken and mismatched attempts",()=>{
 expect(restorePobAttempt({...base,answers:null},base.paperId,60,1000)).toBeNull();
 expect(restorePobAttempt({...base,deadline:null},base.paperId,60,1000)).toBeNull();
 expect(restorePobAttempt(base,"different-paper",60,1000)).toBeNull();
});
test("clamps the navigator index and replaces malformed flags",()=>{
 const result=restorePobAttempt({...base,index:999,flags:null},base.paperId,5,1000);
 expect(result.index).toBe(4);
 expect(result.flags).toEqual({});
});
test("preserves review answers without restarting a finished examination",()=>{
 const result=restorePobAttempt({...base,phase:"review",deadline:2000},base.paperId,60,5000);
 expect(result.phase).toBe("review");
 expect(result.answers.a).toBe("B");
});

test("resumed countdown uses saved deadline before the first timer tick",()=>{
 expect(pobRemainingSeconds(base,75*60,1500)).toBe(1);
 expect(pobRemainingSeconds(base,75*60,2000)).toBe(0);
 expect(pobRemainingSeconds({...base,phase:"review"},75*60,1500)).toBe(4500);
});
