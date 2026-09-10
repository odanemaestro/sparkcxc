import { A1_OBJECTIVES,A1_MCQ_BANK,A1_FLASHCARDS } from './a1ScientificMeasurementBank.mjs';
import { A2_OBJECTIVES,A2_MCQ_BANK,A2_FLASHCARDS } from './a2VectorsBank.mjs';
import { A3_OBJECTIVES,A3_MCQ_BANK,A3_FLASHCARDS } from './a3StaticsBank.mjs';
import { A4_OBJECTIVES,A4_MCQ_BANK,A4_FLASHCARDS } from './a4KinematicsDynamicsBank.mjs';
import { A5_OBJECTIVES,A5_MCQ_BANK,A5_FLASHCARDS } from './a5EnergyBank.mjs';
import { A6_OBJECTIVES,A6_MCQ_BANK,A6_FLASHCARDS } from './a6HydrostaticsBank.mjs';
import { A1_LESSON } from './a1ScientificMeasurementLesson.mjs';
import { A2_LESSON } from './a2VectorsLesson.mjs';
import { A3_STATICS_LESSON } from './a3StaticsLesson.mjs';
import { A4_KINEMATICS_DYNAMICS_LESSON } from './a4KinematicsDynamicsLesson.mjs';
import { A5_ENERGY_LESSON } from './a5EnergyLesson.mjs';
import { A6_HYDROSTATICS_LESSON } from './a6HydrostaticsLesson.mjs';

export const SECTION_A_TOPICS=Object.freeze([
  {id:'A1',title:'Scientific Method and Measurement',objectives:A1_OBJECTIVES,lesson:A1_LESSON,mcq:A1_MCQ_BANK,flashcards:A1_FLASHCARDS},
  {id:'A2',title:'Vectors',objectives:A2_OBJECTIVES,lesson:A2_LESSON,mcq:A2_MCQ_BANK,flashcards:A2_FLASHCARDS},
  {id:'A3',title:'Statics',objectives:A3_OBJECTIVES,lesson:A3_STATICS_LESSON,mcq:A3_MCQ_BANK,flashcards:A3_FLASHCARDS},
  {id:'A4',title:'Kinematics and Dynamics',objectives:A4_OBJECTIVES,lesson:A4_KINEMATICS_DYNAMICS_LESSON,mcq:A4_MCQ_BANK,flashcards:A4_FLASHCARDS},
  {id:'A5',title:'Energy',objectives:A5_OBJECTIVES,lesson:A5_ENERGY_LESSON,mcq:A5_MCQ_BANK,flashcards:A5_FLASHCARDS},
  {id:'A6',title:'Hydrostatics',objectives:A6_OBJECTIVES,lesson:A6_HYDROSTATICS_LESSON,mcq:A6_MCQ_BANK,flashcards:A6_FLASHCARDS},
]);

export const SECTION_A_OBJECTIVES=Object.freeze(Object.assign({},...SECTION_A_TOPICS.map(t=>t.objectives)));
export const SECTION_A_MCQ_BANK=Object.freeze(SECTION_A_TOPICS.flatMap(t=>t.mcq));
export const SECTION_A_FLASHCARDS=Object.freeze(SECTION_A_TOPICS.flatMap(t=>t.flashcards));

function rng(seed){let s=(Number(seed)>>>0)||1;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296);}

export function buildMechanicsObjectiveAudit({seed=1}={}){
  const random=rng(seed); const selected=[];
  for(const objective of Object.keys(SECTION_A_OBJECTIVES)){
    const pool=SECTION_A_MCQ_BANK.filter(q=>q.objective===objective);
    if(!pool.length) throw new Error(`No Section A MCQ for ${objective}`);
    selected.push(pool[Math.floor(random()*pool.length)]);
  }
  for(let i=selected.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[selected[i],selected[j]]=[selected[j],selected[i]];}
  return selected;
}

// Internal Section A assessment, not a claim about exact CXC Paper 01 section
// weighting. Topic quotas are proportional to the number of Section A syllabus
// objectives and are used only to keep a Mechanics test broad.
const DEFAULT_SECTION_TEST_QUOTAS=Object.freeze({A1:6,A2:2,A3:8,A4:5,A5:7,A6:2});
export function buildMechanicsSectionTest({seed=1,quotas=DEFAULT_SECTION_TEST_QUOTAS}={}){
  const random=rng(seed); const selected=[];
  for(const topic of SECTION_A_TOPICS){
    const count=Number(quotas[topic.id]||0); const pool=[...topic.mcq];
    for(let n=0;n<count;n++){
      if(!pool.length) throw new Error(`Quota ${count} exceeds available ${topic.id} questions`);
      const idx=Math.floor(random()*pool.length); selected.push(pool.splice(idx,1)[0]);
    }
  }
  for(let i=selected.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[selected[i],selected[j]]=[selected[j],selected[i]];}
  return selected;
}

export function sectionAStats(){
  return {
    topics:SECTION_A_TOPICS.length,
    objectives:Object.keys(SECTION_A_OBJECTIVES).length,
    mcq:SECTION_A_MCQ_BANK.length,
    flashcards:SECTION_A_FLASHCARDS.length,
    byTopic:Object.fromEntries(SECTION_A_TOPICS.map(t=>[t.id,{objectives:Object.keys(t.objectives).length,mcq:t.mcq.length,flashcards:t.flashcards.length}])),
  };
}
