/** Deterministic summary of source-verification gaps; never treats tests as approval. */
import fs from "node:fs";
const dir=process.argv[2];
if(!dir)throw new Error("Supply evidence directory");
const data=JSON.parse(fs.readFileSync(dir+"/evidence.json","utf8"));
const counts=new Map(),candidates=[];
for(const record of data){
 const subject=record.subjectId;
 const row=counts.get(subject)||{total:0,verified:0,failed:0,blocked:0,reasons:{}};
 row.total++;
 row[record.outcome]=(row[record.outcome]||0)+1;
 if(record.outcome!=="verified"){
  const reasons=[
   ...(record.blocker?["blocked:"+record.blocker]:[]),
   ...(record.missingClasses||[]).map(s=>"missing:"+s),
   ...(record.uncommittedClasses||[]).map(s=>"uncommitted:"+s),
   ...(record.failures||[]).flatMap(f=>(f.failures||[]).map(e=>f.cls+":"+e))
  ];
  for(const reason of reasons)row.reasons[reason]=(row.reasons[reason]||0)+1;
  candidates.push({subject,paper:record.paperId,id:record.criterionId,kind:record.kind,
   marks:record.maxMarks,blocker:record.blocker||null,
   missing:record.missingClasses||[],
   uncommitted:record.uncommittedClasses||[],
   failures:(record.failures||[]).map(f=>({cls:f.cls,expect:f.expect,marks:f.marks,resolved:f.resolved,reasons:f.failures}))});
 }
 counts.set(subject,row);
}
const detailIds=new Set([
 "p2-q2-v1::a","p2-q2-v1::b1","p2-q3-v1::d",
 "p2-q4-v1::d","p2-q9-v1::b1","p2-q10-v1::b2",
 "IS-M2-P2-05::(a)::(iii)"
]);
for(const r of data.filter(r=>detailIds.has(r.criterionId))){
 console.log("CASE_DETAIL",r.criterionId,JSON.stringify({
  outcome:r.outcome,blocker:r.blocker,
  required:r.missingClasses,uncommitted:r.uncommittedClasses,
  cases:(r.cases||[]).map(c=>({cls:c.cls,expect:c.expect,marks:c.marks,
   resolved:c.resolved,passed:c.passed,method:c.method,note:c.note}))
 }));
}
for(const [subject,row] of counts){
 const sorted=Object.entries(row.reasons).sort((a,b)=>b[1]-a[1]);
 console.log("SUBJECT",subject,JSON.stringify({total:row.total,verified:row.verified,failed:row.failed,blocked:row.blocked,
  topReasons:sorted.slice(0,35)}));
 const sample=candidates.filter(x=>x.subject===subject);
 console.log("FIRST_GAPS",subject,JSON.stringify(sample.slice(0,55)));
}
