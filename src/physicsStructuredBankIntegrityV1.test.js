const { A1_STRUCTURED_BANK } = require("./physics/mechanics/a1ScientificMeasurementStructuredBank.mjs");
const { A2_STRUCTURED_BANK } = require("./physics/mechanics/a2VectorsStructuredBank.mjs");
const { A3_STRUCTURED_BANK } = require("./physics/mechanics/a3StaticsStructuredBank.mjs");
const { A4_STRUCTURED_BANK } = require("./physics/mechanics/a4KinematicsDynamicsStructuredBank.mjs");
const { A5_STRUCTURED_BANK } = require("./physics/mechanics/a5EnergyStructuredBank.mjs");
const { A6_STRUCTURED_BANK } = require("./physics/mechanics/a6HydrostaticsStructuredBank.mjs");
const { SECTION_B_STRUCTURED_BANK } = require("./physics/thermal/sectionBStructuredBank.mjs");
const { SECTION_C_STRUCTURED_BANK } = require("./physics/waves/sectionCStructuredBank.mjs");
const { SECTION_D_STRUCTURED_BANK } = require("./physics/electricity/sectionDStructuredBank.mjs");
const { SECTION_E_STRUCTURED_BANK } = require("./physics/atomic/sectionEStructuredBank.mjs");
const { PHYSICS_CHECKERS } = require("./physics/mechanics/physicsCheckerExtension.mjs");
const { inferPhysicsQuantity } = require("./physics/mechanics/physicsQuantity.mjs");

const BANKS = [
  ["A1", A1_STRUCTURED_BANK], ["A2", A2_STRUCTURED_BANK], ["A3", A3_STRUCTURED_BANK],
  ["A4", A4_STRUCTURED_BANK], ["A5", A5_STRUCTURED_BANK], ["A6", A6_STRUCTURED_BANK],
  ["B", SECTION_B_STRUCTURED_BANK], ["C", SECTION_C_STRUCTURED_BANK],
  ["D", SECTION_D_STRUCTURED_BANK], ["E", SECTION_E_STRUCTURED_BANK],
];

describe("Physics structured-bank grading integrity", () => {
  test.each(BANKS)("%s bank has internally consistent marks and registered machine checks", (name, bank) => {
    expect(bank.length).toBeGreaterThan(0);
    for (const question of bank) {
      const partMarks = (question.parts || []).reduce((sum, part) => sum + Number(part.marks || 0), 0);
      expect(partMarks).toBe(Number(question.marks));
      for (const part of question.parts || []) {
        const criterionMarks = (part.criteria || []).reduce((sum, criterion) => sum + Number(criterion.marks || 0), 0);
        expect(criterionMarks).toBe(Number(part.marks));
        for (const criterion of part.criteria || []) {
          if (criterion.manual) continue;
          expect(criterion.check).toBeTruthy();
          expect(typeof PHYSICS_CHECKERS[criterion.check.type]).toBe("function");
          if (["physicsQuantity", "containsQuantity", "directedQuantity", "containsSignedQuantity"].includes(criterion.check.type)) {
            expect(criterion.check.quantity || inferPhysicsQuantity(criterion.check.unit)).toBeTruthy();
          }
        }
      }
    }
  });
});
