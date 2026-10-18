// Owner-supplied question transcriptions and worked answers. These are not official CXC marking keys.
// Keep historical archive marking provisional until paper-specific examiner calibration.
import batch3 from "./pobPaper2OwnerBatch3Drafts";
import batch4 from "./pobPaper2OwnerBatch4Drafts";
const papers=[...batch3.papers,...batch4.papers];
const idOf=paper=>`POB-P2-${paper.year}-${paper.session==="January"?"JAN":"MJ"}`;
const source=Object.freeze(Object.fromEntries(papers.map(p=>[idOf(p),p])));
const cleanLabel=value=>String(value||"").replace(/[()]/g,"");
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
      const criteria=Array.isArray(prior?.criteria)&&prior.criteria.reduce((n,item)=>n+Number(item.marks||0),0)===child.marks?prior.criteria:[];
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
