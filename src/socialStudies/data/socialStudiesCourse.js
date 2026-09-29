import { SOCIAL_STUDIES_SECTIONS, SOCIAL_STUDIES_SECTION_BY_ID } from "./socialStudiesSections";
import { UNIT_A1_LESSONS } from "./unitA1";
import { UNIT_A2_LESSONS } from "./unitA2";
import { UNIT_B1_LESSONS } from "./unitB1";
import { UNIT_B2_LESSONS } from "./unitB2";
import { CXC_SOCIAL_STUDIES_SOURCE, VISUAL_SOURCES } from "./courseHelpers";
import { expandedPracticeForLesson } from "./socialStudiesPracticeExpansion";

export const SOCIAL_STUDIES_LESSONS = Object.freeze([
  ...UNIT_A1_LESSONS,
  ...UNIT_A2_LESSONS,
  ...UNIT_B1_LESSONS,
  ...UNIT_B2_LESSONS,
]);

export const SOCIAL_STUDIES_EXAM = Object.freeze({
  paper1:{
    title:"Paper 01",
    duration:"1 hour 15 minutes",
    description:"60 multiple-choice items: 30 from Section A and 30 from Section B.",
  },
  paper2:{
    title:"Paper 02",
    duration:"2 hours 40 minutes",
    description:"Six compulsory questions. Short-answer and essay responses draw from both major sections.",
  },
  sba:{
    title:"Paper 031 / 032",
    description:"Research and enquiry skills, communication, critical thinking and problem solving.",
  },
});

export const SOCIAL_STUDIES_COURSE = Object.freeze({
  id:"social-studies",
  title:"CSEC Social Studies",
  shortName:"Social Studies",
  syllabus:"CXC 14/G/SYLL 22",
  effective:"May–June 2025 examinations",
  description:"Understand Caribbean family life, society, government, development, resources and regional integration while building the research and data skills CXC expects.",
  sections:SOCIAL_STUDIES_SECTIONS,
  lessons:SOCIAL_STUDIES_LESSONS,
  exam:SOCIAL_STUDIES_EXAM,
  source:CXC_SOCIAL_STUDIES_SOURCE,
  visualSources:VISUAL_SOURCES,
});

export const SOCIAL_STUDIES_LESSON_BY_ID = Object.freeze(
  Object.fromEntries(SOCIAL_STUDIES_LESSONS.map(lesson => [lesson.id,lesson]))
);

export function socialStudiesLessonsForSection(sectionId){
  return SOCIAL_STUDIES_LESSONS.filter(lesson => lesson.sectionId === sectionId);
}

export function socialStudiesSection(sectionId){
  return SOCIAL_STUDIES_SECTION_BY_ID[sectionId] || null;
}

export function socialStudiesFlashcards(){
  return SOCIAL_STUDIES_LESSONS.flatMap(lesson =>
    (lesson.flashcards || []).map((card,index) => ({
      ...card,
      id:`${lesson.id}:card:${index}`,
      lessonId:lesson.id,
      lessonTitle:lesson.title,
      sectionId:lesson.sectionId,
    }))
  );
}

export function socialStudiesPracticeQuestions(){
  return SOCIAL_STUDIES_LESSONS.flatMap(lesson =>
    (lesson.practice || []).map((item,index) => ({
      ...item,
      id:`${lesson.id}:q:${index}`,
      lessonId:lesson.id,
      lessonTitle:lesson.title,
      sectionId:lesson.sectionId,
    }))
  );
}

export function socialStudiesStats(){
  const flashcards=socialStudiesFlashcards();
  const questions=socialStudiesPracticeQuestions();
  const objectives=new Set(SOCIAL_STUDIES_LESSONS.flatMap(lesson => (lesson.objectiveCodes || []).map(code => `${lesson.sectionId}:${code}`)));
  return Object.freeze({
    sections:SOCIAL_STUDIES_SECTIONS.length,
    lessons:SOCIAL_STUDIES_LESSONS.length,
    objectives:objectives.size,
    flashcards:flashcards.length,
    practiceQuestions:questions.length,
  });
}
