import { A1_LESSON } from '../mechanics/a1ScientificMeasurementLesson.mjs';
import { A2_LESSON } from '../mechanics/a2VectorsLesson.mjs';
import { A3_STATICS_LESSON } from '../mechanics/a3StaticsLesson.mjs';
import { A4_KINEMATICS_DYNAMICS_LESSON } from '../mechanics/a4KinematicsDynamicsLesson.mjs';
import { A5_ENERGY_LESSON, A5_OBJECTIVES } from '../mechanics/a5EnergyLesson.mjs';
import { A6_HYDROSTATICS_LESSON, A6_OBJECTIVES } from '../mechanics/a6HydrostaticsLesson.mjs';
import { PHYSICS_LESSONS_B_TO_E, PHYSICS_SECTIONS_B_TO_E } from './index.mjs';

export const SECTION_A_MECHANICS_LESSONS = Object.freeze([
  A1_LESSON, A2_LESSON, A3_STATICS_LESSON, A4_KINEMATICS_DYNAMICS_LESSON, A5_ENERGY_LESSON, A6_HYDROSTATICS_LESSON,
]);
export const PHYSICS_COURSE_SECTIONS = Object.freeze({
  A: SECTION_A_MECHANICS_LESSONS,
  ...PHYSICS_SECTIONS_B_TO_E,
});
export const PHYSICS_COURSE_LESSONS = Object.freeze([
  ...SECTION_A_MECHANICS_LESSONS,
  ...PHYSICS_LESSONS_B_TO_E,
]);
export function physicsCourseLessonForTopic(topicId){ return PHYSICS_COURSE_LESSONS.find(x => x.id === topicId) || null; }
const EXTERNAL_OBJECTIVE_MAP = Object.freeze({ A5:A5_OBJECTIVES, A6:A6_OBJECTIVES });
export function normalizeLessonObjectives(lesson){
  if (!lesson) return [];
  if (EXTERNAL_OBJECTIVE_MAP[lesson.id]) return Object.entries(EXTERNAL_OBJECTIVE_MAP[lesson.id]).map(([id,text]) => ({id,text}));
  if (Array.isArray(lesson.objectives)) {
    return lesson.objectives.map(o => Array.isArray(o) ? { id:o[0], text:o[1] } : { id:o.id, text:o.text || o.objective || '' });
  }
  if (lesson.objectives && typeof lesson.objectives === 'object') return Object.entries(lesson.objectives).map(([id,text]) => ({id,text}));
  return [];
}
export function physicsFullCourseStats(){
  const bySection = {};
  for (const [section, lessons] of Object.entries(PHYSICS_COURSE_SECTIONS)) {
    bySection[section] = { topics:lessons.length, objectives:lessons.reduce((n,l)=>n+normalizeLessonObjectives(l).length,0) };
  }
  return { sections:5, topics:PHYSICS_COURSE_LESSONS.length, objectives:PHYSICS_COURSE_LESSONS.reduce((n,l)=>n+normalizeLessonObjectives(l).length,0), bySection };
}
