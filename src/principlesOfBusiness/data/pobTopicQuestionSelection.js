import {POB_PAPER1_ORIGINAL_ITEMS} from "./pobPaper1Original";

// Prioritise exact objectives. Distribute scarce section questions across lessons
// so neighbouring lessons do not always begin with the same three questions.
export function selectPobTopicQuestions(topic,items=POB_PAPER1_ORIGINAL_ITEMS,count=3){
 const section=Number(topic?.metadata?.syllabus?.section);
 const codes=topic?.metadata?.syllabus?.objectiveCodes||[];
 const sectionItems=items.filter(q=>q.section===section);
 const mapped=sectionItems.filter(q=>codes.includes(q.objectiveCode));
 const remaining=sectionItems.filter(q=>!codes.includes(q.objectiveCode));
 const lessonsInSection=Number(String(topic?.id||"").match(/lesson-(\d+)/)?.[1]||1);
 const rotation=remaining.length?(lessonsInSection-1)%remaining.length:0;
 const rotated=[...remaining.slice(rotation),...remaining.slice(0,rotation)];
 const seen=new Set();
 return [...mapped,...rotated].filter(q=>{
   if(seen.has(q.id))return false;
   seen.add(q.id);return true;
 }).slice(0,count);
}
