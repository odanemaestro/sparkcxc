import science1 from "../../public/integrated-science/bank/is_module1.json";
import science2 from "../../public/integrated-science/bank/is_module2.json";
import science3 from "../../public/integrated-science/bank/is_module3.json";
import {englishAPaper2Sets,buildEnglishAPaper2} from "../englishA/data/englishAPaper2Bank";
import {gradeEnglishAPaper2} from "../englishA/practice/englishAPaper2Grader";
import {gradeIntegratedSciencePaper2} from "../integratedScience/practice/integratedSciencePaper2Grader";
export {requestSemanticPass,reconcileSemanticPasses,SEMANTIC_MARKING_REVISION} from "./semanticMarking";

export function buildTrustedAssessment(attempt){
  if(attempt?.status!=="submitted" || attempt.paper!=="02")throw new Error("submitted_paper_required");
  const responses=attempt.response_snapshot;
  if(!responses || typeof responses!=="object" || Array.isArray(responses))throw new Error("invalid_snapshot");
  const items=[];
  let baseline,replaceScore=0;
  if(attempt.subject_id==="integrated-science"){
    if(attempt.bank_version!=="integrated-science-v1.2.0")throw new Error("unsupported_bank_version");
    const ids=attempt.metadata?.question_ids;
    if(!Array.isArray(ids)||ids.length!==6||new Set(ids).size!==6)throw new Error("invalid_question_selection");
    const bank=[science1,science2,science3].flatMap(m=>m.paper02);
    const paper=ids.map(id=>bank.find(q=>q.id===id));
    if(paper.some(q=>!q))throw new Error("unknown_question");
    for(const module of [1,2,3]){
      const selected=paper.filter(q=>q.id.startsWith(`IS-M${module}-`));
      if(selected.length!==2 || selected.map(q=>Number(q.totalMarks)).sort((a,b)=>a-b).join(",")!=="15,20")throw new Error("invalid_module_selection");
    }
    baseline=gradeIntegratedSciencePaper2(paper,responses);
    for(const q of baseline.questions)for(const row of q.items){
      const part=q.question.parts[row.partIndex],item=part.items[row.itemIndex],id=`${q.question.id}:${row.partIndex}:${row.itemIndex}`;
      if((item.response?.type || "lines")!=="lines" || !String(responses[id] || "").trim())continue;
      items.push({id,maxMarks:row.maxMarks,responseKeys:[id],prompt:item.prompt,
        context:[q.question.context,part.context].filter(Boolean).join("\n"),rubric:item.markScheme});
      replaceScore+=row.score;
    }
  }else if(attempt.subject_id==="english-a"){
    if(attempt.bank_version!=="english-a-paper2-v1")throw new Error("unsupported_bank_version");
    const paperId=attempt.metadata?.paper_id,choice=attempt.metadata?.selected_creative_prompt || "";
    if(!englishAPaper2Sets.some(p=>p.id===paperId))throw new Error("unknown_paper");
    const paper=buildEnglishAPaper2(paperId);
    if(choice&&!paper.tasks.some(t=>t.choiceGroup&&t.id===choice))throw new Error("invalid_creative_selection");
    baseline=gradeEnglishAPaper2(paper,responses,choice);
    for(const row of baseline.rows){
      const task=row.task;
      if(task.choiceGroup && task.id!==choice)continue;
      const keys=task.kind==="summary"?[task.id,`${task.id}:analysis`]:[task.id];
      if(!keys.some(key=>String(responses[key] || "").trim()))continue;
      const words=String(responses[task.id] || "").trim().split(/\s+/).filter(Boolean).length;
      const short=(task.kind==="persuasive"&&words<150)||(task.kind==="literary"&&words<200);
      items.push({id:task.id,maxMarks:short?Math.min(10,row.maxMarks):row.maxMarks,responseKeys:keys,
        prompt:task.instructions,context:task.stimulus,rubric:task.rubric,
        constraints:{kind:task.kind,wordLimit:task.wordLimit,wordRange:task.wordRange,shortResponseCap:short?10:null}});
      replaceScore+=row.score;
    }
  }else throw new Error("unsupported_subject");
  const allowed=new Set(items.flatMap(item=>item.responseKeys));
  const semanticResponses=Object.fromEntries([...allowed].map(key=>[key,String(responses[key] || "")]));
  return {items,responses:semanticResponses,deterministicScore:Math.max(0,baseline.score-replaceScore),
    maxMarks:baseline.maxScore,unassessedMarks:baseline.unassessedMarks || 0,baselineScore:baseline.score};
}
