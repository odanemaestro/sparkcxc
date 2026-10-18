// Owner-supplied question transcriptions and worked answers. These are not official CXC marking keys.
// Keep historical archive marking provisional until paper-specific examiner calibration.
import batch3 from "./pobPaper2OwnerBatch3Drafts";
import batch4 from "./pobPaper2OwnerBatch4Drafts";
const papers=[...batch3.papers,...batch4.papers];
const idOf=paper=>`POB-P2-${paper.year}-${paper.session==="January"?"JAN":"MJ"}`;
const source=Object.freeze(Object.fromEntries(papers.map(p=>[idOf(p),p])));
const cleanLabel=value=>String(value||"").replace(/[()]/g,"");

// Source-specific reconciliation: uploaded booklets combine subparts that earlier
// SPARK rubrics represented separately. These groupings were compared against
// the complete questions and accepted mark allocations, not inferred from ID alone.
// Never change the individual criterion marks or credit unrecognised groupings.
export const POB_OWNER_P2_GROUPED_RUBRICS=Object.freeze({
 "POB-P2-2005-MJ":Object.freeze(["1:c","4:b","5:c"]),
 "POB-P2-2006-MJ":Object.freeze(["6:a"]),
 "POB-P2-2007-MJ":Object.freeze(["3:b","4:a","5:b"]),
 "POB-P2-2009-MJ":Object.freeze(["4:a","4:c","5:c","6:c","7:a"]),
 "POB-P2-2010-MJ":Object.freeze(["1:b"]),
 "POB-P2-2011-MJ":Object.freeze(["4:d","6:c","7:a","7:b"]),
 "POB-P2-2012-MJ":Object.freeze(["1:b","2:a","4:c","5:b","6:a","7:c","7:d"]),
 "POB-P2-2013-MJ":Object.freeze(["3:b"]),
 "POB-P2-2017-MJ":Object.freeze(["1:a"]),
 "POB-P2-2018-MJ":Object.freeze(["4:c","5:a","5:b"]),
 "POB-P2-2019-JAN":Object.freeze(["3:e"]),
 "POB-P2-2019-MJ":Object.freeze(["1:c","2:b","3:c","4:c"]),
 "POB-P2-2021-MJ":Object.freeze(["1:c","2:c","4:a"]),
 "POB-P2-2023-JAN":Object.freeze(["3:b"]),
});
const groupedCriteria=(paperId,question,partId,marks)=>{
 if(!POB_OWNER_P2_GROUPED_RUBRICS[paperId]?.includes(question.number+":"+partId))return [];
 const prior=(question.parts||question.items||[]).filter(p=>p.id.startsWith(partId+"."));
 if(prior.length<2||prior.some(p=>!Array.isArray(p.criteria)||!p.criteria.length))return [];
 const merged=prior.flatMap(p=>p.criteria);
 return merged.reduce((sum,c)=>sum+Number(c.marks||0),0)===marks?merged:[];
};
export const POB_OWNER_P2_SOURCE=source;
export function buildPobOwnerPaper2Bank(id,existingBank=null){
 const p=source[id];
 if(!p)return null;
 return {
  id,
  ownerTranscribed:true,
  questions:p.questions.map(q=>({
   number:q.number,
   marks:q.total_marks,
   section:q.section,
   sectionInstructions:q.section_instructions,
   context:q.stem||null,
   parts:q.parts.flatMap(part=>{
    const list=part.subparts||[part];
    return list.map(child=>{
      const subId=cleanLabel(part.label)+(part.subparts?"."+cleanLabel(child.label):"");
      const authored=(existingBank?.questions||[]).find(item=>item.number===q.number);
      const prior=(authored?.parts||authored?.items||[]).find(item=>item.id===subId);
      const exact=Array.isArray(prior?.criteria)&&prior.criteria.reduce((n,item)=>n+Number(item.marks||0),0)===child.marks?prior.criteria:[];
      const criteria=exact.length?exact:groupedCriteria(id,authored||{},subId,child.marks);
      return {id:subId,prompt:[part.subparts?part.question:null,child.question].filter(Boolean).join("\n"),marks:child.marks,modelAnswer:child.answer,criteria};
    });
   })
  })),
  examInstructions:p.instructions,
  duration:p.duration,
 };
}
export function auditPobOwnerPaper2Source(){
 return papers.map(p=>{
  const bank=buildPobOwnerPaper2Bank(idOf(p));
  const actual=p.questions.map(q=>q.total_marks);
  const computed=p.questions.map(q=>bank.questions.find(a=>a.number===q.number).parts.reduce((sum,part)=>sum+Number(part.marks||0),0));
  return {id:bank.id,questions:bank.questions.length,numbered:bank.questions.every((q,i)=>q.number===i+1),marksMatch:actual.every((v,i)=>v===computed[i]),missingAnswer:bank.questions.flatMap(q=>q.parts).filter(part=>!part.modelAnswer).length,offeredMarks:actual.reduce((a,b)=>a+b,0),ownerTranscribed:true};
 });
}
