import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHYSICS_WORKBOOK_SECTIONS, PHYSICS_WORKBOOK_TOPICS, physicsWorkbookStats } from '../../src/physics/resources/physicsWorkbookContent.mjs';
import { PHYSICS_FORMULA_LIST, physicsFormulaStats } from '../../src/physics/resources/physicsFormulaList.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const fail = message => { throw new Error(message); };
const sections = ['A','B','C','D','E'];

const workbookStats = physicsWorkbookStats();
const formulaStats = physicsFormulaStats();
if (Object.keys(PHYSICS_WORKBOOK_SECTIONS).join('') !== sections.join('')) fail('Workbook must expose Sections A to E.');
if (PHYSICS_WORKBOOK_TOPICS.length !== 25 || workbookStats.topics !== 25) fail(`Expected 25 Workbook topics, found ${PHYSICS_WORKBOOK_TOPICS.length}.`);
const objectiveRows = PHYSICS_WORKBOOK_TOPICS.flatMap(topic => topic.objectives || []);
const objectiveCodes = new Set(objectiveRows.map(row => row.code));
if (objectiveRows.length !== 189 || objectiveCodes.size !== 189 || workbookStats.objectives !== 189) fail(`Expected 189 unique Workbook objectives, found ${objectiveCodes.size}.`);
if (objectiveRows.some(row => Object.prototype.hasOwnProperty.call(row, 'profile'))) fail('Student Workbook must not expose inferred objective-level KC/UK/XS labels as official CXC metadata.');

const topicCounts = Object.fromEntries(sections.map(section => [section, PHYSICS_WORKBOOK_TOPICS.filter(topic => topic.section === section).length]));
const expectedTopicCounts = { A: 6, B: 4, C: 5, D: 7, E: 3 };
for (const section of sections) if (topicCounts[section] !== expectedTopicCounts[section]) fail(`Section ${section} topic count is ${topicCounts[section]}, expected ${expectedTopicCounts[section]}.`);

if (PHYSICS_FORMULA_LIST.length !== 64 || formulaStats.entries !== 64) fail(`Expected 64 formulae/relationships/rules, found ${PHYSICS_FORMULA_LIST.length}.`);
if (formulaStats.sections !== 5) fail('Formula list must cover all five sections.');
for (const row of PHYSICS_FORMULA_LIST) {
  if (!sections.includes(row.section) || !row.topic?.startsWith(row.section)) fail(`Invalid formula section/topic mapping for ${row.name}.`);
  if (!row.name || !row.equation || !row.unit) fail(`Incomplete formula entry for ${row.topic || 'unknown topic'}.`);
}

const filesToScan = [
  'src/physics/resources/physicsWorkbookContent.mjs',
  'src/physics/resources/physicsFormulaList.mjs',
  'src/physics/resources/PhysicsWorkbook.jsx',
  'src/physics/resources/PhysicsFormulaList.jsx',
  'src/physics/course/components/PhysicsSubjectView.jsx',
];
for (const relative of filesToScan) {
  const text = fs.readFileSync(path.join(root, relative), 'utf8');
  if (/[—–]/.test(text)) fail(`${relative} contains an em/en dash.`);
  if (/\d(?:\.\d+)?e[+-]?\d/i.test(text)) fail(`${relative} contains raw programmer-style scientific notation.`);
}
const formulaView = fs.readFileSync(path.join(root, 'src/physics/resources/PhysicsFormulaList.jsx'), 'utf8');
if (!/does not provide a formula sheet in the examination/i.test(formulaView)) fail('Formula List must clearly state that it is a revision aid, not an examination-provided sheet.');
const subjectView = fs.readFileSync(path.join(root, 'src/physics/course/components/PhysicsSubjectView.jsx'), 'utf8');
if (!/SPARK Physics Workbook/.test(subjectView) || !/Physics Formula List/.test(subjectView)) fail('Physics home must expose Workbook and Formula List entry points.');

console.log(JSON.stringify({
  status: 'PASS',
  sections: workbookStats.sections,
  topics: workbookStats.topics,
  objectives: workbookStats.objectives,
  formulaEntries: formulaStats.entries,
  formulaTopics: formulaStats.topics,
  topicCounts
}, null, 2));
