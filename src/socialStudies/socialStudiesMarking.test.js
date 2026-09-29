import { SOCIAL_STUDIES_PAPER2 } from "./data/socialStudiesExamBank";
import {
  gradeSocialStudiesShortAnswer,
  gradeSocialStudiesStructuredPaper,
} from "./marking/socialStudiesShortAnswerGrader";
import {
  mentionsSocialStudiesConcept,
  socialStudiesLexiconStats,
} from "./marking/socialStudiesAnswerLexicon";
import {
  SOCIAL_STUDIES_PAST_PAPER_ARCHIVE,
  SOCIAL_STUDIES_PAST_PAPER_AUDIT,
  SOCIAL_STUDIES_COMMAND_WORDS,
} from "./data/socialStudiesPastPaperAudit";

function part(questionIndex,partIndex){
  return SOCIAL_STUDIES_PAPER2[questionIndex].parts[partIndex];
}

describe("Social Studies short-answer marking", () => {
  test("ships a large reusable vocabulary bank", () => {
    const stats=socialStudiesLexiconStats();
    expect(stats.concepts).toBeGreaterThanOrEqual(150);
    expect(stats.aliases).toBeGreaterThanOrEqual(700);
  });

  test("accepts Caribbean Social Studies wording and common variants", () => {
    expect(mentionsSocialStudiesConcept("Parents teach children values and acceptable behavior.","family_socialisation")).toBe(true);
    expect(mentionsSocialStudiesConcept("Government should harmonize customs procedures.","harmonise_customs")).toBe(true);
    expect(mentionsSocialStudiesConcept("Professionals move overseas because salaries are poor.","emigration")).toBe(true);
  });

  test("awards one mark for a valid point and the second mark for development", () => {
    const scheme=part(0,1).marking;
    const partial=gradeSocialStudiesShortAnswer("More women are working outside the home.",scheme);
    expect(partial.marks).toBe(1);

    const full=gradeSocialStudiesShortAnswer(
      "More women are working outside the home, so fathers share childcare and household duties.",
      scheme
    );
    expect(full.marks).toBe(2);
    expect(full.criteria[0].developed).toBe(true);
  });

  test("awards four marks for two distinct developed factors", () => {
    const result=gradeSocialStudiesShortAnswer(
      "More women have jobs, so fathers share childcare and chores. Technology also allows parents to work from home, which makes it easier to share household responsibilities.",
      part(0,1).marking
    );
    expect(result.marks).toBe(4);
  });

  test("marks brain drain definitions by essential ideas rather than one sentence", () => {
    const result=gradeSocialStudiesShortAnswer(
      "It is the loss of trained professionals when they leave the country and move overseas.",
      part(2,0).marking
    );
    expect(result.marks).toBe(2);
  });

  test("marks two explained push factors separately", () => {
    const result=gradeSocialStudiesShortAnswer(
      "Low salaries push skilled people to migrate abroad for better pay. Poor working conditions also encourage professionals to leave the country.",
      part(2,1).marking
    );
    expect(result.marks).toBe(4);
  });

  test("marks election-table answers by constituency and party pair", () => {
    const result=gradeSocialStudiesShortAnswer(
      "North Bay - Party S; Central - Party S; South Point - Party R; River Town - Party S.",
      part(1,0).marking
    );
    expect(result.marks).toBe(4);
  });

  test("requires the winning party and seat-based justification", () => {
    const partial=gradeSocialStudiesShortAnswer("Party S.",part(1,1).marking);
    expect(partial.marks).toBe(1);

    const full=gradeSocialStudiesShortAnswer(
      "Party S would form the government because it won three seats.",
      part(1,1).marking
    );
    expect(full.marks).toBe(2);
  });

  test("marks regional trade strategies with partial and development credit", () => {
    const result=gradeSocialStudiesShortAnswer(
      "Governments should improve regional shipping so transport costs fall and firms trade more within the Caribbean. They should also harmonize customs procedures so goods clear borders faster.",
      part(3,2).marking
    );
    expect(result.marks).toBe(4);
  });

  test("grades all four structured questions out of 56 marks", () => {
    const grade=gradeSocialStudiesStructuredPaper({},SOCIAL_STUDIES_PAPER2);
    expect(grade.score).toBe(0);
    expect(grade.maxScore).toBe(56);
  });
});

describe("Social Studies past-paper audit", () => {
  test("indexes every year from 2012 through 2026", () => {
    expect(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE).toHaveLength(15);
    expect(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE.map(item=>item.year)).toEqual(
      Array.from({length:15},(_,index)=>2012+index)
    );
    expect(SOCIAL_STUDIES_PAST_PAPER_AUDIT.archiveFiles).toBe(26);
  });

  test("keeps historical papers separate from the current examination structure", () => {
    expect(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE.find(item=>item.year===2024).format).toBe("legacy");
    expect(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE.find(item=>item.year===2025).format).toBe("current");
    expect(SOCIAL_STUDIES_PAST_PAPER_ARCHIVE.find(item=>item.year===2026).format).toBe("current");
  });

  test("stores CXC command-word marking guidance", () => {
    const words=new Set(SOCIAL_STUDIES_COMMAND_WORDS.map(item=>item.word));
    ["state","identify","define","outline","describe","explain","suggest","justify","compare","evaluate"]
      .forEach(word=>expect(words.has(word)).toBe(true));
  });
});
