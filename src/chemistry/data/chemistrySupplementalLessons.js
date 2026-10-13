// Reconciliation layer for the independently authored Chemistry lesson branches.
// Preserve PR #48's 119-objective mapping and interactive model routes.
// Expand lesson explanations with non-identical worked notes from PR #49.
import { CHEMISTRY_SECTION_A_TOPICS } from "./chemistrySectionA";
import { CHEMISTRY_SECTION_B_TOPICS } from "./chemistrySectionB";
import { CHEMISTRY_SECTION_C_TOPICS } from "./chemistrySectionC";

const supplementalTopics=Object.freeze([
  ...CHEMISTRY_SECTION_A_TOPICS,...CHEMISTRY_SECTION_B_TOPICS,...CHEMISTRY_SECTION_C_TOPICS
]);
const byCode=new Map(supplementalTopics.map(row=>[row.id,row]));
const key=value=>String(value||"").replace(/\s+/g," ").trim().toLowerCase();
const uniqueRows=(rows=[])=>{
 const seen=new Set();
 return rows.filter(row=>{
   const k=typeof row==="string"?key(row):key(JSON.stringify(row));
   if(!k||seen.has(k))return false;
   seen.add(k);
   return true;
 });
};
function combineSection(primary,other){
 const result={...other,...primary};
 ["paragraphs","bullets"].forEach(field=>{
   const rows=[...(Array.isArray(primary?.[field])?primary[field]:[]),
               ...(Array.isArray(other?.[field])?other[field]:[])];
   if(rows.length)result[field]=uniqueRows(rows);
 });
 return result;
}
export function mergeChemistryTopicContent(topic){
 const syllabusCode=String(topic?.metadata?.syllabus?.objectives?.[0]||"").match(/^([ABC]\d+)\./)?.[1];
 const extra=syllabusCode?byCode.get(syllabusCode):null;
 if(!extra)return topic;
 const lesson=topic.metadata?.lesson||{}, other=extra.metadata?.lesson||{};
 const originalSections=Array.isArray(lesson.sections)?lesson.sections:[];
 const complementarySections=Array.isArray(other.sections)?other.sections:[];
 const used=new Set();
 const sections=originalSections.map(section=>{
   const index=complementarySections.findIndex((candidate,i)=>!used.has(i)&&key(candidate.title)===key(section.title));
   if(index<0)return section;
   used.add(index);
   return combineSection(section,complementarySections[index]);
 });
 complementarySections.forEach((section,i)=>{
   if(!used.has(i)&&section?.title)sections.push({...section,source:"supplementary-chemistry-lesson"});
 });
 const points=uniqueRows([...(lesson.keyPoints||[]),...(other.keyPoints||[])]);
 return {...topic,metadata:{...topic.metadata,lesson:{
   ...lesson,sections,keyPoints:points,
   workedExample:lesson.workedExample||other.workedExample||null,
   supplement:{origin:"PR 49 Chemistry study notes",syllabusCode,
      additionalSectionCount:Math.max(0,sections.length-originalSections.length),
      mergedSectionCount:used.size},
 }}};
}
export const CHEMISTRY_SUPPLEMENTARY_CONTENT_AUDIT=Object.freeze({
 sourceTopicCount:supplementalTopics.length,
 sourceCodes:Object.freeze(supplementalTopics.map(row=>row.id)),
 matchedSections:["A","B","C"],
 rule:"Keep original objective explanations, question bank and live lab models. Merge lesson sections by heading and retain unique paragraphs and bullets."
});
