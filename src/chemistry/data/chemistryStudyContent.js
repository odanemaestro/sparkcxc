import { CHEMISTRY_SECTION_A_TOPICS } from "./chemistrySectionA";
import { CHEMISTRY_SECTION_B_TOPICS } from "./chemistrySectionB";
import { CHEMISTRY_SECTION_C_TOPICS } from "./chemistrySectionC";

export const CHEMISTRY_SECTIONS = Object.freeze([
  {id:"section-a",subjectId:"chemistry",title:"Section A: Principles of Chemistry",description:"Matter, atomic structure, bonding, quantitative chemistry, acids and bases, redox, electrochemistry, rates and energetics.",sortOrder:10,enabled:true,metadata:{syllabus:"CXC 21/G/SYLL 13"}},
  {id:"section-b",subjectId:"chemistry",title:"Section B: Organic Chemistry",description:"Hydrocarbon sources, organic structures, reactions and polymers.",sortOrder:20,enabled:true,metadata:{syllabus:"CXC 21/G/SYLL 13"}},
  {id:"section-c",subjectId:"chemistry",title:"Section C: Inorganic Chemistry",description:"Metals, extraction, environmental chemistry, non-metals, water and qualitative analysis.",sortOrder:30,enabled:true,metadata:{syllabus:"CXC 21/G/SYLL 13"}},
]);

export const CHEMISTRY_TOPICS = Object.freeze([
  ...CHEMISTRY_SECTION_A_TOPICS,
  ...CHEMISTRY_SECTION_B_TOPICS,
  ...CHEMISTRY_SECTION_C_TOPICS,
]);

export const CHEMISTRY_ACTIVITIES = Object.freeze(
  CHEMISTRY_TOPICS.flatMap(topic => {
    const models = topic?.metadata?.lesson?.interactiveModels || [];
    return [
      {
        key:`lesson:${topic.id}`,
        subjectId:"chemistry",
        type:"lesson",
        sectionId:topic.sectionId,
        topicId:topic.id,
        title:topic.title,
        route:`/study/chemistry?section=${encodeURIComponent(topic.sectionId)}&topic=${encodeURIComponent(topic.id)}`,
        evidenceWeight:1,
        enabled:true,
        metadata:{objectiveCount:(topic?.metadata?.lesson?.objectives || []).length},
      },
      ...models.map(model => ({
        key:`lab:${model.id}`,
        subjectId:"chemistry",
        type:"lab",
        sectionId:topic.sectionId,
        topicId:topic.id,
        title:model.title || topic.title + " interactive",
        route:`/study/chemistry?section=${encodeURIComponent(topic.sectionId)}&topic=${encodeURIComponent(topic.id)}`,
        evidenceWeight:0.7,
        enabled:true,
        metadata:{modelType:model.type,modelId:model.id},
      })),
    ];
  })
);

export const CHEMISTRY_STUDY_STRUCTURE = Object.freeze({
  sections:CHEMISTRY_SECTIONS.map(section => ({
    ...section,
    topics:CHEMISTRY_TOPICS.filter(topic => topic.sectionId === section.id),
  })),
  topics:CHEMISTRY_TOPICS,
  activities:CHEMISTRY_ACTIVITIES,
  unassignedTopics:[],
  sectionCount:CHEMISTRY_SECTIONS.length,
  topicCount:CHEMISTRY_TOPICS.length,
});

export const CHEMISTRY_OBJECTIVE_COUNT = CHEMISTRY_TOPICS.reduce(
  (sum,topic) => sum + Number(topic?.metadata?.lesson?.objectives?.length || 0),
  0
);

export default CHEMISTRY_STUDY_STRUCTURE;
