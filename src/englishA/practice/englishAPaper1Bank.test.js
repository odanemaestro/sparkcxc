import {
  englishAPaper1Questions,
  englishAStimuli,
  englishAPaper1PoolSummary,
  ENGLISH_A_ORIGINAL_PAPER1_POOL_SIZE,
} from "../data/englishAPaper1Pool";
import {
  englishAPastPaperSourceIndex,
} from "../data/englishAPaper1Bank";
import {
  englishAPastPaperArchiveSummary,
} from "../data/englishAPastPaperArchive";
import {
  buildEnglishAPaper1,
  gradeEnglishAPaper1,
  ENGLISH_A_PAPER1_DURATION_SECONDS,
} from "./englishAExamModel";

function seededRandom(seed=1){
  let value=seed>>>0;
  return ()=>{
    value=(value*1664525+1013904223)>>>0;
    return value/4294967296;
  };
}

describe("SPARK English A Paper 01 V2", () => {
  test("has a 1,500-question original pool before historical ingestion", () => {
    expect(ENGLISH_A_ORIGINAL_PAPER1_POOL_SIZE).toBe(1500);
    expect(englishAPaper1Questions).toHaveLength(1500);
    expect(englishAPaper1PoolSummary()).toEqual([
      {module:1,discrete:125,comprehension:375,total:500,stimuli:26},
      {module:2,discrete:125,comprehension:375,total:500,stimuli:26},
      {module:3,discrete:125,comprehension:375,total:500,stimuli:26},
    ]);
    expect(ENGLISH_A_PAPER1_DURATION_SECONDS).toBe(90 * 60);
  });

  test("keeps every question id unique with four choices and one valid answer", () => {
    const ids=englishAPaper1Questions.map(question=>question.id);
    expect(new Set(ids).size).toBe(ids.length);

    englishAPaper1Questions.forEach(question=>{
      expect(Object.keys(question.options)).toEqual(["A","B","C","D"]);
      expect(["A","B","C","D"]).toContain(question.answer);
      expect(question.options[question.answer]).toBeTruthy();
      expect(question.explanation).toBeTruthy();
      if(question.kind==="comprehension"){
        expect(question.stimulusId).toBeTruthy();
        expect(englishAStimuli[question.stimulusId]).toBeTruthy();
      }
    });
  });

  test("builds the correct 60-item blueprint from the large pool", () => {
    const paper=buildEnglishAPaper1({random:seededRandom(17)});
    expect(paper).toHaveLength(60);
    expect(paper[0].examPosition).toBe(1);
    expect(paper[59].examPosition).toBe(60);
    expect(new Set(paper.map(question=>question.id)).size).toBe(60);

    [1,2,3].forEach(module=>{
      const rows=paper.filter(question=>question.module===module);
      expect(rows).toHaveLength(20);
      expect(rows.filter(question=>question.kind==="discrete")).toHaveLength(5);
      expect(rows.filter(question=>question.kind==="comprehension")).toHaveLength(15);
      expect(new Set(rows.filter(question=>question.kind==="comprehension").map(question=>question.stimulusId)).size).toBeGreaterThanOrEqual(2);
    });
  });

  test("a fresh attempt avoids the previous paper and its passages when the pool allows it", () => {
    const first=buildEnglishAPaper1({random:seededRandom(41)});
    const avoidQuestionIds=first.map(question=>question.id);
    const avoidStimulusIds=[...new Set(first.map(question=>question.stimulusId).filter(Boolean))];

    const second=buildEnglishAPaper1({
      random:seededRandom(42),
      avoidQuestionIds,
      avoidStimulusIds,
    });

    const firstIds=new Set(first.map(question=>question.id));
    const firstStimuli=new Set(avoidStimulusIds);
    expect(second.filter(question=>firstIds.has(question.id))).toHaveLength(0);
    expect([...new Set(second.map(question=>question.stimulusId).filter(Boolean))]
      .filter(id=>firstStimuli.has(id))).toHaveLength(0);
  });

  test("multiple fresh attempts are not the same paper", () => {
    const signatures=new Set();
    let avoidQuestionIds=[];
    let avoidStimulusIds=[];

    for(let attempt=0;attempt<8;attempt+=1){
      const paper=buildEnglishAPaper1({
        random:seededRandom(100+attempt),
        avoidQuestionIds,
        avoidStimulusIds,
      });
      signatures.add(paper.map(question=>question.id).join("|"));
      avoidQuestionIds=[...new Set([...avoidQuestionIds,...paper.map(question=>question.id)])];
      avoidStimulusIds=[...new Set([
        ...avoidStimulusIds,
        ...paper.map(question=>question.stimulusId).filter(Boolean),
      ])];
    }

    expect(signatures.size).toBe(8);
  });

  test("resuming an attempt restores the exact paper order", () => {
    const original=buildEnglishAPaper1({random:seededRandom(77)});
    const restored=buildEnglishAPaper1({questionIds:original.map(question=>question.id)});
    expect(restored.map(question=>question.id)).toEqual(original.map(question=>question.id));
  });

  test("grades a generated paper by module", () => {
    const paper=buildEnglishAPaper1({random:seededRandom(88)});
    const answers=Object.fromEntries(paper.map(question=>[question.id,question.answer]));
    const result=gradeEnglishAPaper1(paper,answers);
    expect(result.score).toBe(60);
    expect(result.percent).toBe(100);
    expect(result.modules.map(row=>row.earned)).toEqual([20,20,20]);
  });

  test("keeps the complete supplied archive manifest and flags the bad 2012 source", () => {
    expect(englishAPastPaperSourceIndex).toHaveLength(24);
    expect(new Set(englishAPastPaperSourceIndex).size).toBe(24);
    expect(englishAPastPaperArchiveSummary.suppliedFiles).toBe(24);
    expect(englishAPastPaperArchiveSummary.confirmedPaper1Files).toBe(23);
    expect(englishAPastPaperArchiveSummary.mismatches).toBe(1);
  });
});
