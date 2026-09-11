import fs from "fs";
import path from "path";
import {
  comparePhysicsQuantity,
  inferPhysicsQuantity,
  parseNumber,
} from "./mechanics/physicsQuantity.mjs";
import {
  checkContainsQuantity,
  checkFormulaUse,
} from "./mechanics/physicsCheckerExtension.mjs";
import { physicsValueCheck } from "./paper2/physicsPaper2Marking";
import { PHYSICS_PAPER2_PAPERS, physicsPaper2Criteria } from "./paper2/physicsPaper2Bank";
import { SECTION_A_TOPICS, buildMechanicsObjectiveAudit, buildMechanicsSectionTest } from "./mechanics/sectionAMechanics.mjs";
import { SECTION_B_TOPICS, buildSectionBObjectiveAudit, buildSectionBCheckpoint } from "./thermal/sectionBThermal.mjs";
import { SECTION_C_TOPICS, buildSectionCObjectiveAudit, buildSectionCCheckpoint } from "./waves/sectionCWaves.mjs";
import { SECTION_D_TOPICS, buildSectionDObjectiveAudit, buildSectionDCheckpoint } from "./electricity/sectionDElectricity.mjs";
import { SECTION_E_TOPICS, buildSectionEObjectiveAudit, buildSectionECheckpoint } from "./atomic/sectionEAtomic.mjs";
import {
  buildSubjectDashboardSummaries,
  summarizeAllSubjects,
} from "../subjects/subjectProgress";

const root = __dirname;
const app = fs.readFileSync(path.join(root, "..", "App.js"), "utf8");

const sectionFiles = [
  path.join(root, "mechanics", "components", "PhysicsMechanicsSection.jsx"),
  path.join(root, "thermal", "components", "PhysicsThermalSection.jsx"),
  path.join(root, "waves", "components", "PhysicsWavesSection.jsx"),
  path.join(root, "electricity", "components", "PhysicsElectricitySection.jsx"),
  path.join(root, "atomic", "components", "PhysicsAtomicSection.jsx"),
];

describe("Physics grading and mobile rendering audit v5.7.3", () => {
  test("SI prefixes stay case-sensitive across high-risk Physics units", () => {
    const cases = [
      ["1 MW", { value: 1, unit: "MW" }, "power", true],
      ["1 mW", { value: 1, unit: "MW" }, "power", false],
      ["1000000 W", { value: 1, unit: "MW" }, "power", true],
      ["1 MV", { value: 1, unit: "MV" }, "voltage", true],
      ["1 mV", { value: 1, unit: "MV" }, "voltage", false],
      ["1 MΩ", { value: 1, unit: "MΩ" }, "resistance", true],
      ["1 mΩ", { value: 1, unit: "MΩ" }, "resistance", false],
      ["1 MJ", { value: 1, unit: "MJ" }, "energy", true],
      ["1 mJ", { value: 1, unit: "MJ" }, "energy", false],
      ["1 MPa", { value: 1, unit: "MPa" }, "pressure", true],
      ["1 mPa", { value: 1, unit: "MPa" }, "pressure", false],
      ["1 MHz", { value: 1, unit: "MHz" }, "frequency", true],
      ["1 mHz", { value: 1, unit: "MHz" }, "frequency", false],
    ];
    for (const [response, expected, quantity, correct] of cases) {
      expect(comparePhysicsQuantity(response, expected, { quantity }).correct).toBe(correct);
    }
  });

  test("quantity inference distinguishes charge from Celsius and supports radioactivity", () => {
    expect(inferPhysicsQuantity("C")).toBe("charge");
    expect(inferPhysicsQuantity("°C")).toBe("temperature");
    expect(inferPhysicsQuantity("K")).toBe("temperature");
    expect(inferPhysicsQuantity("Bq")).toBe("activity");
    expect(inferPhysicsQuantity("MBq")).toBe("activity");
  });

  test("Physics Paper 2 accepts equivalent units and rejects incompatible units", () => {
    const accepted = [
      ["133000 Pa", { type:"value", value:133, unit:"kPa" }],
      ["60 N cm", { type:"value", value:0.6, unit:"N m" }],
      ["170 kJ", { type:"value", value:170000, unit:"J" }],
      ["3 kN", { type:"value", value:3000, unit:"N" }],
      ["2.7 g/cm³", { type:"value", value:2700, unit:"kg m⁻³" }],
      ["1 MHz", { type:"value", value:1000000, unit:"Hz" }],
      ["100 cm", { type:"value", value:1, unit:"m" }],
    ];
    for (const [response, check] of accepted) expect(physicsValueCheck(response, check)).toBe(true);

    expect(physicsValueCheck("1 cm", { type:"value", value:1, unit:"m" })).toBe(false);
    expect(physicsValueCheck("133 kJ", { type:"value", value:133, unit:"kPa" })).toBe(false);
    expect(physicsValueCheck("1 mW", { type:"value", value:1, unit:"MW" })).toBe(false);
  });

  test("free-response quantity checks read the unit before explanatory prose", () => {
    expect(checkContainsQuantity("The half-life is 6 min because the activity halves at equal intervals.", { value:6, unit:"min" }).ok).toBe(true);
    expect(checkContainsQuantity("The activity is 200 Bq, which is one sixteenth of the original.", { value:200, unit:"Bq" }).ok).toBe(true);
    expect(checkContainsQuantity("The force is 550 N using W = mg.", { quantity:"force", value:550, unit:"N" }).ok).toBe(true);
  });

  test("acceleration formula recognition does not accept missing brackets", () => {
    expect(checkFormulaUse("a = (v - u) / t", { formula:"a=(v-u)/t" }).ok).toBe(true);
    expect(checkFormulaUse("acceleration = change in velocity / time", { formula:"a=(v-u)/t" }).ok).toBe(true);
    expect(checkFormulaUse("a = v - u/t", { formula:"a=(v-u)/t" }).ok).toBe(false);
  });

  test("leading decimals and scientific notation remain readable", () => {
    expect(parseNumber(".5 m")).toBe(0.5);
    expect(parseNumber("1.0 × 10⁻³ m³")).toBeCloseTo(0.001, 12);
  });

  test("every automatic Physics Paper 2 unit has a supported semantic path", () => {
    for (const paper of PHYSICS_PAPER2_PAPERS) {
      for (const row of physicsPaper2Criteria(paper)) {
        const check = row.criterion?.check;
        if (check?.type !== "value" || !check.unit || /neutrons?/i.test(check.unit)) continue;
        expect(inferPhysicsQuantity(check.unit)).not.toBeNull();
      }
    }
  });

  test("all five Physics section banks have valid MCQs, flashcards and cumulative checkpoints", () => {
    const sections = [SECTION_A_TOPICS, SECTION_B_TOPICS, SECTION_C_TOPICS, SECTION_D_TOPICS, SECTION_E_TOPICS];
    const objectiveAudits = [buildMechanicsObjectiveAudit, buildSectionBObjectiveAudit, buildSectionCObjectiveAudit, buildSectionDObjectiveAudit, buildSectionEObjectiveAudit];
    const checkpoints = [buildMechanicsSectionTest, buildSectionBCheckpoint, buildSectionCCheckpoint, buildSectionDCheckpoint, buildSectionECheckpoint];
    const seenQuestionIds = new Set();
    const seenCardIds = new Set();

    sections.forEach((topics, sectionIndex) => {
      for (const topic of topics) {
        expect(Object.keys(topic.objectives || {}).length).toBeGreaterThan(0);
        expect(topic.mcq.length).toBeGreaterThan(0);
        expect(topic.flashcards.length).toBeGreaterThan(0);
        for (const objective of Object.keys(topic.objectives || {})) {
          expect(topic.flashcards.some(card => card.objective === objective)).toBe(true);
        }
        for (const question of topic.mcq) {
          expect(seenQuestionIds.has(question.id)).toBe(false);
          seenQuestionIds.add(question.id);
          expect(question.topic).toBe(topic.id);
          expect(question.options).toHaveLength(4);
          expect(Number.isInteger(question.answer)).toBe(true);
          expect(question.answer).toBeGreaterThanOrEqual(0);
          expect(question.answer).toBeLessThan(4);
          expect(String(question.explanation || "").trim().length).toBeGreaterThan(0);
          expect(Object.prototype.hasOwnProperty.call(topic.objectives, question.objective)).toBe(true);
        }
        for (const card of topic.flashcards) {
          expect(seenCardIds.has(card.id)).toBe(false);
          seenCardIds.add(card.id);
          expect(card.topic).toBe(topic.id);
          expect(String(card.front || "").trim().length).toBeGreaterThan(0);
          expect(String(card.back || "").trim().length).toBeGreaterThan(0);
          expect(Object.prototype.hasOwnProperty.call(topic.objectives, card.objective)).toBe(true);
        }
      }
      const objectiveAudit = objectiveAudits[sectionIndex]({ seed:573 });
      expect(objectiveAudit.every(Boolean)).toBe(true);
      expect(new Set(objectiveAudit.map(question => question.objective)).size).toBe(objectiveAudit.length);
      const checkpoint = checkpoints[sectionIndex]({ seed:573 });
      expect(checkpoint).toHaveLength(30);
      expect(new Set(checkpoint.map(question => question.id)).size).toBe(30);
    });
  });

  test("all five Physics flashcard sections render both sides through MathText", () => {
    for (const file of sectionFiles) {
      const source = fs.readFileSync(file, "utf8");
      expect(source).toContain("import MathText");
      expect(source).toMatch(/<MathText[^>]*>\{(?:c|card)\.front\}<\/MathText>/);
      expect(source).toMatch(/<MathText[^>]*>\{(?:c|card)\.back\}<\/MathText>/);
    }
  });

  test("student and parent lesson totals use combined subject progress", () => {
    const subjects = [
      { id:"mathematics", name:"CSEC Mathematics", enabled:true, stats:{ topics:124 } },
      { id:"physics", name:"CSEC Physics", enabled:true, stats:{ topics:25 } },
    ];
    const rows = [
      { subject_id:"physics", activity_key:"lesson:A1", activity_type:"lesson", completed:true },
      { subject_id:"physics", activity_key:"lesson:A2", activity_type:"lesson", completed:true },
      { subject_id:"physics", activity_key:"lesson:A3", activity_type:"lesson", completed:false },
      { subject_id:"physics", activity_key:"lab:a1", activity_type:"lab", completed:true },
    ];
    const summaries = buildSubjectDashboardSummaries({
      subjects,
      mathematics:{ done:3, totalTopics:124, learningSummary:{} },
      subjectProgressRows:rows,
      discoverFromProgress:false,
    });
    const overall = summarizeAllSubjects(summaries);
    expect(summaries.find(item => item.id === "physics").progress.lessonsCompleted).toBe(2);
    expect(overall.lessonsCompleted).toBe(5);

    expect(app).toContain('["Lessons completed", allSubjectsSummary.lessonsCompleted]');
    expect(app).toContain("{parentAllSubjectsSummary.lessonsCompleted}</strong><span>Lessons completed</span>");
    expect(app).toContain('supabase.from("lesson_progress")');
    expect(app).toContain('supabase.from("spark_subject_progress")');
    expect(app).toContain('const profileRows = profiles || []');
    expect(app).toContain('setSelectedChild(current => profileRows.find(child => String(child.id) === String(current?.id || "")) || profileRows[0] || null)');
    expect(app).toContain('setChildData(null);');
  });
});
