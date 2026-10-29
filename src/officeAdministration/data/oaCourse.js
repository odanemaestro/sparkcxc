import {oaLessonSupplementsFor} from "./oaLessonSupplements";
import objectives from './oaObjectives.json';
import {OA_LESSONS} from './oaLessons';
import {OA_FLASHCARD_ANSWERS} from './oaFlashcards';
export const OA_SUBJECT_ID='office-administration';
export const OA_SYLLABUS='CXC 27/O/SYLL 24';
export const OA_SYLLABUS_URL='https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Office-Administration-Syllabus-Revised-2024.pdf';
export const OA_EXAM=Object.freeze({paper1:{questions:60,marks:60,durationMinutes:75},paper2:{questions:6,marks:90,marksPerQuestion:15,durationMinutes:120,compulsory:true,sections:[{questions:[1,2,3],syllabusSections:[1,2,3,4,5,6]},{questions:[4,5,6],syllabusSections:[7,8,9,10,11]}]},sba:{marks:50,weightPercent:25},alternative:{marks:50,durationMinutes:90},effectiveFrom:'May–June 2026'});
const titles=['Office orientation','Reception and hospitality','Communication','Meetings','Travel arrangements','Records and information management','Human resources management','Accounts and financial services','Procurement and inventory management','Sales, marketing and customer service','Operations, dispatch and transport services'];
export const OA_OBJECTIVES=Object.freeze(objectives);
export const OA_TOPICS=Object.freeze(OA_LESSONS.map(([section,numbers,title,paragraphs,example,mistake,question,answer],i)=>{
 const mapped=objectives.filter(o=>o.section===section&&numbers.includes(o.number));
 return {id:`oa-s${section}-lesson-${String(i+1).padStart(2,'0')}`,subjectId:OA_SUBJECT_ID,sectionId:`oa-section-${section}`,title,description:paragraphs[0],sortOrder:i,enabled:true,metadata:{syllabus:{source:OA_SYLLABUS,sourcePage:mapped[0]?.sourcePage,section,objectiveCodes:mapped.map(o=>o.code)},lesson:{introduction:paragraphs[0],objectives:mapped.map(o=>o.title),sections:[{title:'How it works',paragraphs:paragraphs.slice(1)},...oaLessonSupplementsFor(mapped.map(o=>o.code)),{title:'A practical office example',paragraphs:[example]},{title:'Avoid this mistake',paragraphs:[mistake]}],keyPoints:paragraphs.map(p=>p.split(/(?<=[.!?])\s/)[0]),summary:answer,check:{question,answer},flashcards:[...mapped.map(o=>({id:o.code,front:o.title.charAt(0).toUpperCase()+o.title.slice(1)+'.',back:OA_FLASHCARD_ANSWERS[o.section]?.[o.number-1],objectiveCodes:[o.code]})),{id:`oa-check-${i+1}`,front:question,back:answer,objectiveCodes:mapped.map(o=>o.code)}]}}};
}));
export const OA_SECTIONS=Object.freeze(titles.map((title,i)=>({id:`oa-section-${i+1}`,subjectId:OA_SUBJECT_ID,title:`Section ${i+1}: ${title}`,description:`${objectives.filter(o=>o.section===i+1).length} syllabus objectives`,sortOrder:i,enabled:true,metadata:{syllabus:OA_SYLLABUS}})));
export const OA_COVERAGE=Object.freeze(objectives.map(o=>({...o,lessonIds:OA_TOPICS.filter(t=>t.metadata.syllabus.objectiveCodes.includes(o.code)).map(t=>t.id)})));
export const OA_COURSE_STATS=Object.freeze({sections:OA_SECTIONS.length,topics:OA_TOPICS.length,objectives:OA_OBJECTIVES.length,flashcards:OA_TOPICS.reduce((n,t)=>n+t.metadata.lesson.flashcards.length,0)});
export function oaLocalStructure(){return {sections:OA_SECTIONS.map(s=>({...s,topics:OA_TOPICS.filter(t=>t.sectionId===s.id)})),topics:OA_TOPICS,activities:[],unassignedTopics:[],sectionCount:OA_SECTIONS.length,topicCount:OA_TOPICS.length};}
