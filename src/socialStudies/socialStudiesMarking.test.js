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
  SOCIAL_STUDIES_SHORT_ANSWER_BANK,
  socialStudiesShortAnswerStats,
} from "./data/socialStudiesShortAnswerBank";
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
    expect(stats.concepts).toBeGreaterThanOrEqual(280);
    expect(stats.aliases).toBeGreaterThanOrEqual(1200);
  });

  test("accepts Caribbean Social Studies wording and common variants", () => {
    expect(mentionsSocialStudiesConcept("Parents teach children values and acceptable behavior.","family_socialisation")).toBe(true);
    expect(mentionsSocialStudiesConcept("Government should harmonize customs procedures.","harmonise_customs")).toBe(true);
    expect(mentionsSocialStudiesConcept("Professionals move overseas because salaries are poor.","emigration")).toBe(true);
    expect(mentionsSocialStudiesConcept("The family provides econmic suport for children.","family_economic_support")).toBe(true);
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

  test("follow-through explanations depend on the strategies given in the previous part", () => {
    const explanationScheme=part(2,3).marking;

    const linked=gradeSocialStudiesShortAnswer(
      "Competitive pay reduces the financial reason to migrate, so skilled workers are more likely to remain.",
      explanationScheme,
      {previousResponse:"Government should improve salaries and compensation for skilled workers."}
    );
    expect(linked.marks).toBe(2);

    const unrelated=gradeSocialStudiesShortAnswer(
      "Regional shipping would become cheaper and goods would move faster.",
      explanationScheme,
      {previousResponse:"Government should improve salaries and compensation for skilled workers."}
    );
    expect(unrelated.marks).toBe(0);
  });

  test("one explanation is not reused to mark two earlier strategies", () => {
    const explanationScheme=part(2,3).marking;
    const result=gradeSocialStudiesShortAnswer(
      "This would encourage skilled workers to remain in the country.",
      explanationScheme,
      {previousResponse:"Government should improve salaries and also create suitable skilled jobs."}
    );
    expect(result.marks).toBeLessThanOrEqual(2);
  });

  test("provides 40 marked short-answer questions with balanced syllabus coverage", () => {
    const stats=socialStudiesShortAnswerStats();
    expect(stats.questions).toBe(48);
    expect(stats.bySection).toEqual({A1:12,A2:12,B1:12,B2:12});
    expect(stats.marks).toBeGreaterThanOrEqual(100);
    SOCIAL_STUDIES_SHORT_ANSWER_BANK.forEach(item=>{
      expect(item.marking).toBeTruthy();
      expect(item.modelPoints.length).toBeGreaterThan(0);
      expect(["A1","A2","B1","B2"]).toContain(item.sectionId);
    });
  });

  test("does not award definition or distinction marks for repeating the term only", () => {
    const density=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-02");
    const unions=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a1-03");
    const warming=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-11");
    const gdp=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-11");

    expect(gradeSocialStudiesShortAnswer("population density",density.marking).marks).toBe(0);
    expect(gradeSocialStudiesShortAnswer("visiting union and common-law union",unions.marking).marks).toBe(0);
    expect(gradeSocialStudiesShortAnswer("global warming",warming.marking).marks).toBe(0);
    expect(gradeSocialStudiesShortAnswer("gross domestic product",gdp.marking).marks).toBe(0);
  });

  test("marks 2026-aligned short-answer language", () => {
    const warming=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-11");
    const unions=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a1-11");
    const gdp=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-11");

    expect(gradeSocialStudiesShortAnswer(
      "Global warming is the rise in the Earth's average temperature.",
      warming.marking
    ).marks).toBe(2);

    expect(gradeSocialStudiesShortAnswer(
      "In a visiting union the partners maintain separate homes. In a common-law union the partners live together without being legally married.",
      unions.marking
    ).marks).toBe(4);

    expect(gradeSocialStudiesShortAnswer(
      "GDP is the total value of goods and services produced within a country during a year.",
      gdp.marking
    ).marks).toBe(2);
  });

  test("marks course-wide short-answer wording outside the first Paper 02 set", () => {
    const primary=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-01");
    const population=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-04");
    const integration=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-05");

    expect(gradeSocialStudiesShortAnswer(
      "A primary group has close personal relationships, while a secondary group is more formal and goal oriented.",
      primary.marking
    ).marks).toBe(2);

    expect(gradeSocialStudiesShortAnswer(
      "Immigration is movement into a country to live. Emigration is movement out of a country to live elsewhere.",
      population.marking
    ).marks).toBe(2);

    expect(gradeSocialStudiesShortAnswer(
      "Regional integration gives producers a larger market, so firms can sell to more Caribbean customers and produce on a larger scale. Countries can also pool resources, which helps them respond to shared problems.",
      integration.marking
    ).marks).toBe(4);
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


test("Practice hub exposes the Social Studies short-answer examiner", () => {
  const fs=require("fs");
  const path=require("path");
  const hub=fs.readFileSync(path.join(__dirname,"practice","SocialStudiesPracticeHub.jsx"),"utf8");
  const examiner=fs.readFileSync(path.join(__dirname,"practice","SocialStudiesShortAnswerPractice.jsx"),"utf8");
  expect(hub).toContain("Short-answer examiner");
  expect(hub).toContain('setMode("shortAnswer")');
  expect(examiner).toContain("Mark my response");
  expect(examiner).toContain("gradeSocialStudiesShortAnswer");
});
