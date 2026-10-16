import { POB_OBJECTIVES_ONE_TO_FIVE } from "./pobObjectivesOneToFive";
import { POB_OBJECTIVES_SIX_TO_TEN } from "./pobObjectivesSixToTen";
import { POB_BUSINESS_CASES } from "./pobWorkedCases";

export const POB_SYLLABUS_CODE = "CXC 08/G/SYLL 17";
export const POB_SYLLABUS_URL = "https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Principles-of-Business-Syllabus-.pdf";
export const POB_SUBJECT_ID = "principles-of-business";
const profiles = [
  "Organisational Principles","Organisational Principles","Organisational Principles","Organisational Principles",
  "Promotion and Logistics","Promotion and Logistics","Promotion and Logistics",
  "Finance, Government and Technology","Finance, Government and Technology","Finance, Government and Technology"
];
export const POB_OFFICIAL_PAPER1_ALLOCATION = Object.freeze([5,6,5,4,7,7,6,7,7,6]);
export const POB_EXAM = Object.freeze({
  paper1:{questions:60,durationMinutes:75,marks:60,distribution:POB_OFFICIAL_PAPER1_ALLOCATION},
  paper2:{questions:5,compulsory:true,minutes:120,durationMinutes:120,marksPerQuestion:20,marks:100,profileAllocation:[2,2,1]},
  sba:{paper:"031",marks:40,type:"single guided business research project"},
  alternative:{paper:"032",marks:40,durationMinutes:75,type:"case study for eligible private candidates"}
});

// 119 numbered objectives are explicitly connected to lessons, notes and revision cards.
// An objective's source code is stable, allowing targeted recommendations and progress reporting.
const syllabusSections = [...POB_OBJECTIVES_ONE_TO_FIVE,...POB_OBJECTIVES_SIX_TO_TEN];
export const POB_SYLLABUS_SECTIONS=Object.freeze(syllabusSections.map(section=>Object.freeze({
  ...section,profile:profiles[section.n-1],
  objectives:Object.freeze(section.rows.map(([number,title,explanation,example])=>Object.freeze({
    code:"S"+section.n+"."+number,number,section:section.n,title,explanation,example,
    source:POB_SYLLABUS_CODE,sourcePage:section.page
  })))
})));
export const POB_OBJECTIVES = Object.freeze(POB_SYLLABUS_SECTIONS.flatMap(s=>s.objectives));
const lessonId=(n,i)=>"pob-s"+n+"-lesson-"+String(i+1).padStart(2,"0");
const pageIntro={
  1:"A business starts by recognising people's needs and organising exchanges fairly.",
  2:"A successful organisation needs capable people, good communication and clear responsibilities.",
  3:"A business idea becomes workable when careful research and planning guide decisions.",
  4:"Business relationships work better when everyone understands their rights, responsibilities and documents.",
  5:"Production is more than making things. It means combining resources and using them well.",
  6:"Good marketing begins by understanding customers rather than simply trying to sell to them.",
  7:"A business must move the right goods to the right people, at the right time and cost.",
  8:"Sound financial decisions help people and businesses use resources wisely.",
  9:"Government policies and services shape the environment in which businesses operate.",
  10:"Technology connects Caribbean businesses to a wider world, creating opportunities and responsibilities."
};
const topics=POB_SYLLABUS_SECTIONS.flatMap(section=>{
  // No objective split, no objective duplicated. Each short lesson stays readable on mobile.
  const groups=[];
  for(let i=0;i<section.objectives.length;i+=3)groups.push(section.objectives.slice(i,i+3));
  return groups.map((rows,i)=>{
    const id=lessonId(section.n,i);
    const title=i===0?section.title+": Foundations":rows.map(row=>row.title).join(", ");
    const sentences=rows.map(row=>({
      title:row.code+": "+row.title,
      paragraphs:[row.explanation,"Caribbean example: "+row.example],
      bullets:["Think about it: How would you apply this idea to a real business, household or community?"]
    }));
    const caseStudy=POB_BUSINESS_CASES[section.n];
    return Object.freeze({
      id,subjectId:POB_SUBJECT_ID,sectionId:"pob-section-"+section.n,
      title,description:rows.map(row=>row.title).join("; "),sortOrder:section.n*100+i+1,enabled:true,
      metadata:{
        syllabus:{source:POB_SYLLABUS_CODE,page:section.page,section:section.n,profile:section.profile,objectiveCodes:rows.map(row=>row.code)},
        lesson:{
          introduction:pageIntro[section.n]+" Study the examples, consider the questions and practise using the ideas.",
          objectives:rows.map(row=>row.title),objectiveGuide:rows.map(row=>({code:row.code,objective:row.title,explanation:row.explanation})),
          sections:sentences,
          keyPoints:rows.map(row=>row.explanation),
          workedExample:caseStudy,
          summary:"You have studied "+rows.map(row=>row.title.toLowerCase()).join(", ")+". Explain how these ideas affect a Caribbean business and use evidence when making decisions.",
          flashcards:rows.map(row=>({front:"Explain: "+row.title,back:row.explanation}))
        }
      }
    });
  });
});
export const POB_SECTIONS = Object.freeze(POB_SYLLABUS_SECTIONS.map(section=>Object.freeze({
  id:"pob-section-"+section.n,subjectId:POB_SUBJECT_ID,
  title:"Section "+section.n+": "+section.title,description:section.profile+". "+section.objectives.length+" syllabus objectives.",
  sortOrder:section.n*100,enabled:true,metadata:{syllabus:POB_SYLLABUS_CODE,sourcePage:section.page}
})));
export const POB_TOPICS=Object.freeze(topics);
export const POB_FLASHCARDS=Object.freeze(POB_TOPICS.flatMap(topic=>(topic.metadata.lesson.flashcards||[]).map((card,i)=>({
  ...card,id:topic.id+":flashcard:"+i,topicId:topic.id,sectionId:topic.sectionId
}))));
export const POB_COVERAGE=Object.freeze({
  syllabus:POB_SYLLABUS_CODE,sections:POB_SECTIONS.length,objectives:POB_OBJECTIVES.length,
  topics:POB_TOPICS.length,flashcards:POB_FLASHCARDS.length,
  bySection:POB_SYLLABUS_SECTIONS.map(section=>({
    section:section.n,title:section.title,expected:section.objectives.length,
    linked:POB_TOPICS.filter(topic=>topic.metadata.syllabus.section===section.n)
      .flatMap(topic=>topic.metadata.syllabus.objectiveCodes).length
  }))
});
export function pobLocalStructure(){
  return {
    sections:POB_SECTIONS.map(s=>({...s,topics:POB_TOPICS.filter(t=>t.sectionId===s.id)})),
    topics:POB_TOPICS,activities:[],unassignedTopics:[],sectionCount:POB_SECTIONS.length,topicCount:POB_TOPICS.length
  };
}
