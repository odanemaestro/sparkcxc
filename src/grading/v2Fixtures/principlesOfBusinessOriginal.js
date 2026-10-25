import {POB_ORIGINAL_FULL_EVIDENCE,POB_ORIGINAL_PARTIAL_EVIDENCE}
 from "../../principlesOfBusiness/data/pobOriginalVerifiedResponses";
import {POB_PAPER2_ORIGINAL_01} from "../../principlesOfBusiness/data/pobPaper2Original";

const F=(cls,response,expect,note,extra={})=>({cls,response,expect,note,...extra});
const sourceParts=new Map(POB_PAPER2_ORIGINAL_01.questions.flatMap(q=>
 q.items.map(p=>["Q"+q.number+":"+p.id,p])));

export function pobOriginalSourceFixtures({paperId,criterion}){
 if(paperId!==POB_PAPER2_ORIGINAL_01.id ||
    criterion.sourceFormat!=="pob-paper2")
  return {blocked:"not-the-calibrated-SPARK-original-POB-paper"};
 const match=/-Q(\d+)::(.+)$/.exec(criterion.id);
 const id=match?"Q"+match[1]+":"+match[2]:null;
 const part=sourceParts.get(id);
 const complete=POB_ORIGINAL_FULL_EVIDENCE[id];
 const partial=POB_ORIGINAL_PARTIAL_EVIDENCE[id];
 if(!part||!complete||!partial||part.marks!==criterion.maxMarks||
    part.criteria.length!==criterion.sourceMarking?.criteria?.length||
    !part.criteria.every((c,i)=>c.marks===criterion.sourceMarking.criteria[i].marks&&
      c.rule===criterion.sourceMarking.criteria[i].rule))
  return {blocked:"source-POB-part-allocation-or-model-mismatch"};
 const expectedPartial=partial.credit.reduce((a,b)=>a+b,0);
 return {kind:"structured",ruleId:"pob-original-source-25-20261024",
  sourceAnswer:{answer:complete},alternatives:[{answer:complete.toUpperCase()}],
  fixtures:[
   F("full",complete,part.marks,"Complete source-authored answer for every printed criterion"),
   F("equivalent",complete.toUpperCase(),part.marks,"Equivalent casing/punctuation only",{mustResolve:true}),
   F("partial",partial.answer,expectedPartial,"Explicitly sourced, separate partial-credit components",{mustResolve:true}),
   F("incorrect","I do not know",0,"Unambiguous admission of no substantive answer",{mustResolve:true}),
   F("blank","",0,"No response to source question",{mustResolve:true}),
   F("irrelevant","There is rain in the mountains today.",0,"Off-topic content stays provisional",{mustAbstain:true}),
   F("ceiling",complete+" "+complete,{min:0,max:part.marks},"Repetition does not create extra marks",{mustAbstain:true}),
   F("competing",complete+" Or the opposite is true.",{min:0,max:part.marks},
     "Conflicting candidate answer stays provisional",{mustAbstain:true}),
   F("contradiction",complete+" This explanation is false.",{min:0,max:part.marks},
     "Contradictory claim cannot certify a final score",{mustAbstain:true}),
   F("keyword-list","business manager production money customer service profit",0,
     "Generic keywords are not authenticated evidence",{mustAbstain:true}),
  ]};
}
