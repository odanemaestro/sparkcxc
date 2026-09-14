import fs from 'node:fs';
import path from 'node:path';
import { PHYSICS_COURSE_LESSONS } from '../../src/physics/course/fullCourseIndex.mjs';
import { PHYSICS_STUDY_UPGRADES, physicsStudyUpgradeStats } from '../../src/physics/course/physicsStudyUpgrade.mjs';
import { PHYSICS_PRACTICAL_BLUEPRINTS, physicsPracticalStats } from '../../src/physics/labs/physicsPracticalBlueprints.mjs';
import { MECHANICS_INTERACTIVES } from '../../src/physics/mechanics/interactives/mechanicsInteractiveRegistry.mjs';
import { THERMAL_INTERACTIVES } from '../../src/physics/thermal/interactives/bThermalInteractiveRegistry.mjs';
import { WAVES_INTERACTIVES } from '../../src/physics/waves/interactives/cWavesInteractiveRegistry.mjs';
import { ELECTRICITY_INTERACTIVES } from '../../src/physics/electricity/interactives/dElectricityInteractiveRegistry.mjs';
import { ATOMIC_INTERACTIVES } from '../../src/physics/atomic/interactives/eAtomicInteractiveRegistry.mjs';

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const lessonIds = PHYSICS_COURSE_LESSONS.map(item => item.id).sort();
const studyIds = Object.keys(PHYSICS_STUDY_UPGRADES).sort();
const groups = [
  ['Mechanics', MECHANICS_INTERACTIVES, 'src/physics/mechanics/components/MechanicsInteractiveLab.jsx'],
  ['Thermal', THERMAL_INTERACTIVES, 'src/physics/thermal/components/ThermalInteractiveLab.jsx'],
  ['Waves', WAVES_INTERACTIVES, 'src/physics/waves/components/WavesInteractiveLab.jsx'],
  ['Electricity', ELECTRICITY_INTERACTIVES, 'src/physics/electricity/components/ElectricityInteractiveLab.jsx'],
  ['Atomic', ATOMIC_INTERACTIVES, 'src/physics/atomic/components/AtomicInteractiveLab.jsx'],
];
const allInteractives = groups.flatMap(([,items]) => items);
const interactiveIds = new Set(allInteractives.map(item => item.id));
const studyStats = physicsStudyUpgradeStats();
const practicalStats = physicsPracticalStats();
const root = process.cwd();

check(PHYSICS_COURSE_LESSONS.length === 25, `Expected 25 Physics topics, found ${PHYSICS_COURSE_LESSONS.length}`);
check(JSON.stringify(lessonIds) === JSON.stringify(studyIds), 'Study upgrade topic IDs do not exactly match the 25 course topic IDs.');
check(studyStats.workedExamples >= 25, 'Expected at least one worked example for every topic.');
check(studyStats.quickChecks >= 50, 'Expected at least two quick checks per topic on average.');
check(studyStats.dataSkills === 25, 'Expected a data/graph skill for every Physics topic.');

for (const [topicId, entry] of Object.entries(PHYSICS_STUDY_UPGRADES)) {
  check(entry.examFocus.length >= 3, `${topicId} needs at least three exam-focus points.`);
  check(entry.workedExamples.length >= 1, `${topicId} needs a worked example.`);
  check(entry.quickChecks.length >= 2, `${topicId} needs at least two quick checks.`);
  check(Boolean(entry.dataSkill?.prompt), `${topicId} needs a data skill prompt.`);
  check(Boolean(entry.examLanguage), `${topicId} needs an exam technique note.`);
  const serialized = JSON.stringify(entry);
  check(!serialized.includes('—'), `${topicId} contains an em dash.`);
}

check(practicalStats.practicals >= 26, `Expected at least 26 full practical companions, found ${practicalStats.practicals}`);
check(practicalStats.topics >= 17, `Expected practical companions across at least 17 topics, found ${practicalStats.topics}`);
check(practicalStats.sections === 5, 'Practical companions must cover all five Physics sections.');
check(practicalStats.withGraphs >= 17, 'Expected at least 17 practicals with graph workflows.');

for (const [interactiveId, practical] of Object.entries(PHYSICS_PRACTICAL_BLUEPRINTS)) {
  check(interactiveIds.has(interactiveId), `Practical ${interactiveId} does not map to an interactive.`);
  check(Boolean(practical.aim), `${interactiveId} has no aim.`);
  check(practical.apparatus.length > 0, `${interactiveId} has no apparatus list.`);
  check(practical.method.length >= 3, `${interactiveId} needs at least three method steps.`);
  check(Boolean(practical.table?.columns?.length), `${interactiveId} needs a results table.`);
  check(practical.errors.length > 0, `${interactiveId} needs explicit sources of error.`);
  check(practical.accuracy.length > 0, `${interactiveId} needs precautions or accuracy guidance.`);
  check(practical.followUp.length > 0, `${interactiveId} needs CSEC follow-up questions.`);
  if (practical.graph) {
    const keys = new Set(practical.table.columns.map(column => column.key));
    check(keys.has(practical.graph.xKey), `${interactiveId} graph x key is missing from its table.`);
    check(keys.has(practical.graph.yKey), `${interactiveId} graph y key is missing from its table.`);
    check(['linear','none'].includes(practical.graph.fitMode), `${interactiveId} has an unsupported graph fit mode.`);
  }
}

const requiredBlueprints = ['a3-spring','a3-lever','a6-buoyancy','b3-specific-heat','b3-latent-heat','c2-echo-ranging','c4-double-slit','d4-ohms-law','d7-transformer'];
for (const required of requiredBlueprints) check(Boolean(PHYSICS_PRACTICAL_BLUEPRINTS[required]), `Required audit practical ${required} is missing.`);

for (const nonlinear of ['b4-radiation-surfaces','c5-focal-length','e3-random-decay','e3-half-life']) {
  check(PHYSICS_PRACTICAL_BLUEPRINTS[nonlinear]?.graph?.fitMode === 'none', `${nonlinear} must not receive an automatic straight-line fit.`);
  check(Boolean(PHYSICS_PRACTICAL_BLUEPRINTS[nonlinear]?.graph?.fitGuidance), `${nonlinear} needs graph guidance for its non-linear relationship.`);
}
check(PHYSICS_PRACTICAL_BLUEPRINTS['d6-magnetic-fields']?.table?.columns?.some(column => column.type === 'text'), 'Magnetic-field observations need text-entry columns.');
check(PHYSICS_PRACTICAL_BLUEPRINTS['d7-motor-effect']?.table?.columns?.every(column => column.type === 'text'), 'Motor-effect qualitative observations need text-entry columns.');

const practicalTopics = new Set(Object.values(PHYSICS_PRACTICAL_BLUEPRINTS).map(item => item.topic));
const priorityTopics = ['A1','A3','A6','B2','B3','C2','C4','C5','D4','D7','E3'];
for (const topicId of priorityTopics) check(practicalTopics.has(topicId), `High-priority audit topic ${topicId} has no full practical companion.`);
check(interactiveIds.has('b3-latent-heat'), 'The latent-heat practical has no registered interactive model.');
check(interactiveIds.has('c4-double-slit'), "Young's double-slit experiment has no registered interactive model.");

let mapped = 0;
const implementationBySection = {};
for (const [section, registry, relativePath] of groups) {
  const source = fs.readFileSync(path.resolve(root, relativePath), 'utf8');
  let sectionMapped = 0;
  for (const item of registry) {
    const implemented = source.includes(`'${item.id}'`) || source.includes(`\"${item.id}\"`);
    check(implemented, `${section} interactive ${item.id} is registered but not mapped to an implementation.`);
    if (implemented) { mapped += 1; sectionMapped += 1; }
  }
  check(!/\|\|\s*Generic\b/.test(source), `${section} still contains a Generic fallback for registered interactives.`);
  implementationBySection[section] = { registered: registry.length, mapped: sectionMapped };
}
check(mapped === allInteractives.length, `Only ${mapped} of ${allInteractives.length} registered interactives are mapped.`);

const wavesSource = fs.readFileSync(path.resolve(root, 'src/physics/waves/components/WavesInteractiveLab.jsx'), 'utf8');
check(!/toExponential\(/.test(wavesSource), 'Waves student-facing content still uses raw JavaScript exponential notation.');
check(wavesSource.includes('data-testid="wave-curve"'), 'Wave graph explorer needs a dynamic wave curve.');
check(wavesSource.includes('position / m') && wavesSource.includes('time / s') && wavesSource.includes('displacement / m'), 'Wave graph explorer needs labelled axes.');
check(wavesSource.includes('fringeSpacingM') && wavesSource.includes('waves-fringe-screen'), "Young's double-slit visual must respond to fringe spacing.");

const electricitySource = fs.readFileSync(path.resolve(root, 'src/physics/electricity/components/ElectricityInteractiveLab.jsx'), 'utf8');
for (const id of ['d1-charge-transfer','d1-induction-field','d4-cell-recharge','d5-diode-rectifier','d5-technology-impact','d7-current-field']) {
  check(electricitySource.includes(`'${id}'`), `${id} must have a real electricity interactive implementation.`);
}
const atomicSource = fs.readFileSync(path.resolve(root, 'src/physics/atomic/components/AtomicInteractiveLab.jsx'), 'utf8');
check(!/toExponential\(/.test(atomicSource), 'Atomic student-facing content still uses raw JavaScript exponential notation.');
check(atomicSource.includes('min={Z}'), 'Atom builder must prevent mass number from falling below atomic number.');

const report = {
  status: failures.length ? 'FAIL' : 'PASS',
  topics: PHYSICS_COURSE_LESSONS.length,
  studyUpgrade: studyStats,
  interactiveModels: allInteractives.length,
  interactiveImplementationAudit: { registered: allInteractives.length, mapped, sections: implementationBySection },
  practicalUpgrade: practicalStats,
  requiredAuditBlueprints: requiredBlueprints,
  priorityPracticalTopics: priorityTopics,
  failures,
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
