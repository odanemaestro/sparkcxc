// Source-owned examiner-grade marking structure for January 2026 POB P2.
// Unlike whole-subpart holistic scores, each printed one-mark criterion is
// independently evaluated, with exact script evidence and a mark cap.
// This makes it possible to explain each awarded and withheld mark.
import {buildPob2026JanHistoricalCalibrationPack} from "./pobHistorical2026JanP2CalibrationPack";
import {buildPob2026JanHistoricalPaper} from "./pobHistorical2026JanP2RealPaper";

const distinctListParts=new Set([
 "1:a","1:b","1:e.i","2:a.ii","2:b","2:c.ii",
 "3:a.i","3:a.ii","3:a.iii","4:a.ii","4:b.ii","5:b"
]);

export function buildPobJan2026ExaminerPack({responses={}}={}){
 const paper=buildPob2026JanHistoricalPaper();
 const base=buildPob2026JanHistoricalCalibrationPack({responses});
 const sourceParts=paper.questions.flatMap(q=>q.items.map(part=>({
  id:q.id+":"+part.id,question:q.number,part:part.id,
  maxMarks:part.marks,prompt:part.prompt,modelAnswer:part.modelAnswer,
  criteria:part.criteria.map((c,index)=>({id:q.id+":"+part.id+":C"+(index+1),
   marks:c.marks,rule:c.rule}))
 })));
 const details=new Map(sourceParts.map(part=>[part.id,part]));
 const items=[];
 for(const original of base.items){
  const part=details.get(original.id);
  if(!part)throw new Error("unknown_historical_part");
  for(const [i,criterion] of part.criteria.entries()){
   items.push({
    id:criterion.id,maxMarks:criterion.marks,
    responseKeys:[...original.responseKeys],prompt:original.prompt,
    context:original.context,
    exemplar:part.modelAnswer,
    rubric:[{marks:criterion.marks,rule:criterion.rule,alternatives:[]}],
    constraints:{
     ...original.constraints,historicalExaminerMarking:true,
     primaryResponseKey:part.id,partId:part.id,
     questionNumber:part.question,criterionNumber:i+1,
     criterionCount:part.criteria.length,
     requiresDistinctEvidence:distinctListParts.has(part.question+":"+part.part),
     distinctEvidenceGroup:distinctListParts.has(part.question+":"+part.part)?part.id:null
    }
   });
  }
 }
 if(items.some(i=>i.rubric.reduce((n,c)=>n+c.marks,0)!==i.maxMarks))
  throw new Error("unbalanced_criterion");
 if(items.reduce((n,i)=>n+i.maxMarks,0)>100)throw new Error("historical_criterion_overflow");
 return {
  ...base,items,parts:sourceParts,
  criterionLevel:true,productionEligible:false
 };
}

export function summarizePobJan2026Marks(marking,pack){
 if(!pack?.criterionLevel||!Array.isArray(pack.parts))throw new Error("examiner_pack_required");
 if(!marking||!Array.isArray(marking.criteria))throw new Error("examiner_marks_required");
 const graded=new Map(marking.criteria.map(c=>[c.id,c]));
 if(graded.size!==marking.criteria.length)throw new Error("duplicate_marked_criterion");
 const parts=pack.parts.map(part=>{
  const criteria=part.criteria.map(c=>graded.get(c.id)||null);
  const hasResponse=criteria.some(Boolean);
  const incomplete=criteria.some(c=>c===null);
  const score=incomplete||criteria.some(c=>c.marks===null)?null:
   criteria.reduce((n,c)=>n+c.marks,0);
  const minMarks=criteria.reduce((n,c)=>n+(c?.minMarks||0),0);
  const maxPossibleMarks=criteria.reduce((n,c,i)=>n+(c?c.maxPossibleMarks:part.criteria[i].marks),0);
  return {id:part.id,question:part.question,prompt:part.prompt,modelAnswer:part.modelAnswer,
   maxMarks:part.maxMarks,marks:score,minMarks,maxPossibleMarks,
   status:score!==null?"agreed":incomplete&&!hasResponse?"blank":incomplete?"incomplete":"uncertain",
   criteria:part.criteria.map((source,index)=>{
    const awarded=criteria[index];
    return {id:source.id,rule:source.rule,maxMarks:source.marks,
     marks:awarded?.marks??(awarded?null:0),
     minMarks:awarded?.minMarks??0,maxPossibleMarks:awarded?.maxPossibleMarks??source.marks,
     status:awarded?.status||(awarded?"uncertain":"blank"),
     feedback:awarded?.feedback||"No response was supplied for this marking criterion.",
     evidence:awarded?.evidence||[]};
   })}
 });
 const expected=new Map(pack.items.map(i=>[i.id,i]));
 for(const row of marking.criteria)if(!expected.has(row.id))throw new Error("unexpected_marked_criterion");
 const questions=[1,2,3,4,5].map(number=>{
  const rows=parts.filter(p=>p.question===number);
  return {number,maxMarks:20,score:rows.some(p=>p.marks===null)?null:rows.reduce((n,p)=>n+p.marks,0),
   minMarks:rows.reduce((n,p)=>n+p.minMarks,0),
   maxPossibleMarks:rows.reduce((n,p)=>n+p.maxPossibleMarks,0)};
 });
 return {parts,questions,score:questions.some(q=>q.score===null)?null:
  questions.reduce((n,q)=>n+q.score,0),
  minScore:questions.reduce((n,q)=>n+q.minMarks,0),
  maxScore:questions.reduce((n,q)=>n+q.maxPossibleMarks,0)};
}
