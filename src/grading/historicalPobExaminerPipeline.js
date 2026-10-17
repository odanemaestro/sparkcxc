// Score each 20-mark question as one complete marking unit. All individual
// criteria within the question are visible to BOTH independent passes, so a
// repeated listed example cannot earn credit twice. Unanswered questions are 0.
import {requestSemanticPass,reconcileSemanticPasses} from "./semanticMarking";
import {summarizePobJan2026Marks} from "../principlesOfBusiness/data/pobJan2026ExaminerMarking";

export async function gradePobJan2026ExaminerPaper({
 pack,model,apiKey,requestPass=requestSemanticPass
}={}){
 if(!pack?.criterionLevel||!pack?.historicalPaperId||!pack?.parts)
  throw new Error("historical_examiner_pack_required");
 const chunks=[1,2,3,4,5].map(number=>pack.items.filter(
  item=>item.constraints.questionNumber===number));
 if(chunks.flat().length!==pack.items.length)throw new Error("question_mapping_incomplete");
 const analyses=await Promise.all(chunks.map(async items=>{
  if(!items.length)return {criteria:[],uncertain:false,score:0,minScore:0,maxScore:0};
  const [first,second]=await Promise.all([1,2].map(pass=>
   requestPass({model,apiKey,items,responses:pack.responses,pass})));
  return reconcileSemanticPasses(first,second,items,pack.responses);
 }));
 const criteria=analyses.flatMap(result=>result.criteria);
 const semantic={criteria,
  uncertain:analyses.some(result=>result.uncertain),
  score:analyses.some(result=>result.score===null)?null:
    analyses.reduce((sum,result)=>sum+result.score,0),
  minScore:analyses.reduce((sum,result)=>sum+result.minScore,0),
  maxScore:analyses.reduce((sum,result)=>sum+result.maxScore,0)};
 const breakdown=summarizePobJan2026Marks(semantic,pack);
 if(semantic.score!==breakdown.score||semantic.minScore!==breakdown.minScore||
    semantic.maxScore!==breakdown.maxScore)throw new Error("examiner_score_mismatch");
 return {...semantic,parts:breakdown.parts,questions:breakdown.questions};
}
