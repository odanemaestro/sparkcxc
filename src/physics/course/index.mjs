import { SECTION_B_THERMAL_LESSONS } from './sectionBThermalLessons.mjs';
import { SECTION_C_WAVES_OPTICS_LESSONS } from './sectionCWavesOpticsLessons.mjs';
import { SECTION_D_ELECTRICITY_MAGNETISM_LESSONS } from './sectionDElectricityMagnetismLessons.mjs';
import { SECTION_E_ATOMIC_PHYSICS_LESSONS } from './sectionEAtomicPhysicsLessons.mjs';

export const PHYSICS_SECTIONS_B_TO_E = Object.freeze({
  B: SECTION_B_THERMAL_LESSONS,
  C: SECTION_C_WAVES_OPTICS_LESSONS,
  D: SECTION_D_ELECTRICITY_MAGNETISM_LESSONS,
  E: SECTION_E_ATOMIC_PHYSICS_LESSONS,
});
export const PHYSICS_LESSONS_B_TO_E = Object.freeze([
  ...SECTION_B_THERMAL_LESSONS, ...SECTION_C_WAVES_OPTICS_LESSONS,
  ...SECTION_D_ELECTRICITY_MAGNETISM_LESSONS, ...SECTION_E_ATOMIC_PHYSICS_LESSONS,
]);
export function physicsLessonForTopic(topicId){return PHYSICS_LESSONS_B_TO_E.find(x=>x.id===topicId)||null;}
export function physicsLessonsForSection(section){return PHYSICS_SECTIONS_B_TO_E[String(section||'').toUpperCase()]||[];}
export function physicsLessonsBToEStats(){const objectives=PHYSICS_LESSONS_B_TO_E.flatMap(l=>l.objectives);return {sections:4,topics:PHYSICS_LESSONS_B_TO_E.length,objectives:objectives.length,bySection:Object.fromEntries(Object.entries(PHYSICS_SECTIONS_B_TO_E).map(([s,ls])=>[s,{topics:ls.length,objectives:ls.reduce((n,l)=>n+l.objectives.length,0)}]))};}
