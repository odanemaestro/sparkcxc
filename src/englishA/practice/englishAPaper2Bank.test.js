import {
  ENGLISH_A_PAPER2_DURATION_SECONDS,
  buildEnglishAPaper2,
  englishAPaper2BankSummary,
  englishAPaper2Sets,
} from "../data/englishAPaper2Bank";
import {
  englishAPaper2Archive,
  englishAPaper2ArchiveSummary,
} from "../data/englishAPaper2Archive";

describe("SPARK English A Paper 02 V1", () => {
  test("matches the revised 2027 Paper 02 structure", () => {
    expect(ENGLISH_A_PAPER2_DURATION_SECONDS).toBe(165 * 60);
    expect(englishAPaper2BankSummary()).toEqual({
      sets:6,
      tasksPerSet:6,
      totalBankTasks:42,
      marksPerSet:120,
      minutes:165,
      moduleMarks:{1:40,2:40,3:40},
    });
  });

  test("each paper contains two module 1 tasks, literary summary plus two creative choices, and two module 3 tasks", () => {
    englishAPaper2Sets.forEach(set => {
      expect(set.tasks.filter(task => task.module === 1)).toHaveLength(2);
      expect(set.tasks.filter(task => task.module === 2 && task.kind === "summary")).toHaveLength(1);
      expect(set.tasks.filter(task => task.choiceGroup === "M2-creative")).toHaveLength(2);
      expect(set.tasks.filter(task => task.module === 3)).toHaveLength(2);

      const paper=buildEnglishAPaper2(set.id);
      expect(paper.requiredTaskIds).toHaveLength(6);
      expect(new Set(set.tasks.map(task => task.id)).size).toBe(set.tasks.length);
      set.tasks.forEach(task => {
        expect(task.instructions).toBeTruthy();
        expect(task.rubric?.marks).toBeGreaterThan(0);
        expect(task.rubric?.criteria?.length).toBeGreaterThanOrEqual(4);
        if (task.kind === "summary") {
          expect(task.analysisPrompt).toBeTruthy();
          expect(task.summaryPrompt).toContain("THREE points");
          expect(task.wordLimit).toBe(50);
          expect(task.rubric.marks).toBe(10);
        }
        if (task.kind === "persuasive") {
          expect(task.wordRange).toEqual([250,300]);
        }
        if (task.kind === "literary") {
          expect(task.wordRange).toEqual([400,450]);
        }
        if (task.kind === "exposition") {
          expect(task.wordRange).toBeNull();
        }
      });
    });
  });

  test("keeps an audit manifest of the supplied historical Paper 2 archive", () => {
    expect(englishAPaper2Archive).toHaveLength(30);
    expect(englishAPaper2ArchiveSummary.suppliedFiles).toBe(30);
    expect(englishAPaper2ArchiveSummary.verifiedFiles).toBe(30);
    expect(englishAPaper2ArchiveSummary.textFiles).toBe(19);
    expect(englishAPaper2ArchiveSummary.visualFiles).toBe(11);
    expect(englishAPaper2ArchiveSummary.mismatches).toBe(0);
    expect(englishAPaper2ArchiveSummary.structureFailures).toBe(0);
    expect(englishAPaper2Archive[0].year).toBe(2002);
    expect(englishAPaper2Archive.at(-1).year).toBe(2026);
    englishAPaper2Archive.forEach(item => {
      expect(item.qaStatus).toBe("verified");
      expect(item.identityVerified).toBe(true);
      expect(item.structureVerified).toBe(true);
      expect(item.usableForPatternReview).toBe(true);
    });
  });
});
