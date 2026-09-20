import {
  genericSubjectLearningAdapter,
  validateSubjectLearningCompatibility,
} from "./subjectLearningAdapter";

describe("SPARK Generic Subject Learning Adapter", () => {
  test("derives supported actions from subject capabilities", () => {
    const adapter = genericSubjectLearningAdapter({
      id:"chemistry",
      capabilities:{study:true,practice:true,flashcards:true,labs:true,paper1:true},
      routes:{study:"/study/chemistry",practice:"/practice/chemistry",flashcards:"/dashboard/flashcards/chemistry"},
    });
    expect(adapter.supportedActions).toEqual(expect.arrayContaining([
      "lesson","targeted_practice","flashcards","lab","assessment",
    ]));
  });

  test("uses configured evidence weights while keeping safe defaults", () => {
    const adapter = genericSubjectLearningAdapter({
      id:"chemistry",
      capabilities:{study:true,progress:true},
      learningConfig:{evidenceWeights:{lesson:0.2}},
    });
    expect(adapter.evidencePolicy.lesson).toBe(0.2);
    expect(adapter.evidencePolicy.practice).toBe(0.68);
  });

  test("validates the minimum contract for a publishable generic subject", () => {
    const result = validateSubjectLearningCompatibility({
      id:"chemistry",
      name:"CSEC Chemistry",
      capabilities:{study:true,practice:true,progress:true},
      routes:{study:"/study/chemistry",practice:"/practice/chemistry"},
    });
    expect(result.valid).toBe(true);
  });

  test("rejects enabled capabilities without routes", () => {
    const result = validateSubjectLearningCompatibility({
      id:"chemistry",
      name:"CSEC Chemistry",
      capabilities:{study:true,practice:true,progress:true},
      routes:{},
    });
    expect(result.valid).toBe(false);
    expect(result.issues.join(" ")).toMatch(/Study route/i);
    expect(result.issues.join(" ")).toMatch(/Practice route/i);
  });
});