/**
 * Additional source-shape adapters. These produce unresolved criteria only.
 * Student answers and rubric descriptions never become grading authority.
 */
const marks=n=>typeof n==="number"&&Number.isFinite(n)&&n>0;
const unique=rows=>{const ids=new Set();for(const row of rows){if(ids.has(row.id))throw new TypeError("Duplicate criterion");ids.add(row.id);}return rows;};
export function mapEnglishAPaper2({tasks=[],answers={},choiceId=""}={}){
 if(!Array.isArray(tasks)||!answers||typeof answers!=="object"||Array.isArray(answers))throw new TypeError("Invalid English A data");
 const selected=tasks.filter(task=>!task.choiceGroup||task.id===choiceId);
 if(tasks.some(task=>task.choiceGroup)&&!selected.some(task=>task.choiceGroup))
   throw new TypeError("Required creative writing choice missing");
 const criteria=[],responses={};
 for(const task of selected){
  if(typeof task?.id!=="string"||!task.id.trim()||!marks(task.rubric?.marks))
    throw new TypeError("Invalid English A task");
  criteria.push({id:task.id,maxMarks:task.rubric.marks,kind:"essay",
    acceptedPhrases:[],sourcePartId:task.id,sourceFormat:"english-a-paper2",
    rubricDescriptors:Array.isArray(task.rubric.criteria)?task.rubric.criteria:[]});
  responses[task.id]=typeof answers[task.id]==="string"?answers[task.id]:"";
 }
 return {criteria:unique(criteria),responses};
}
export function mapIntegratedSciencePaper2({questions=[],responses:submitted={}}={}){
 if(!Array.isArray(questions)||!submitted||typeof submitted!=="object"||Array.isArray(submitted))
   throw new TypeError("Invalid Integrated Science data");
 const criteria=[],responses={};
 for(const question of questions){
  if(typeof question?.id!=="string"||!question.id.trim()||!Array.isArray(question.parts))
   throw new TypeError("Invalid Integrated Science question");
  question.parts.forEach((part,partIndex)=>{
   if(!Array.isArray(part?.items))throw new TypeError("Invalid Integrated Science part");
   part.items.forEach((item,itemIndex)=>{
    if(!marks(item?.marks))throw new TypeError("Invalid Integrated Science item");
    const id=question.id+":"+partIndex+":"+itemIndex;
    criteria.push({id,maxMarks:item.marks,kind:"written",acceptedPhrases:[],
      sourcePartId:id,sourceFormat:"integrated-science-paper2"});
    responses[id]=typeof submitted[id]==="string"?submitted[id]:"";
   });
  });
 }
 return {criteria:unique(criteria),responses};
}
