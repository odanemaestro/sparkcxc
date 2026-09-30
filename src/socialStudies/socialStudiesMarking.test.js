import { SOCIAL_STUDIES_PAPER2 } from "./data/socialStudiesExamBank";
import {
  SOCIAL_STUDIES_PAPER2_VARIANTS,
  socialStudiesPaper2VariantStats,
} from "./data/socialStudiesPaper2Variants";
import {
  gradeSocialStudiesShortAnswer,
  gradeSocialStudiesStructuredPaper,
} from "./marking/socialStudiesShortAnswerGrader";
import {
  mentionsSocialStudiesConcept,
  socialStudiesLexiconStats,
} from "./marking/socialStudiesAnswerLexicon";
import {
  gradeSocialStudiesEssay,
  gradeSocialStudiesEssays,
} from "./marking/socialStudiesEssayGrader";
import {
  SOCIAL_STUDIES_SHORT_ANSWER_BANK,
  socialStudiesShortAnswerStats,
} from "./data/socialStudiesShortAnswerBank";
import { gradeSocialStudiesSba, socialStudiesSbaRubricStats } from "./marking/socialStudiesSbaGrader";
import { SOCIAL_STUDIES_SBA_TRANSITION } from "./data/socialStudiesSbaRubric";
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
    expect(stats.concepts).toBeGreaterThanOrEqual(490);
    expect(stats.aliases).toBeGreaterThanOrEqual(2100);
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

  test("one broad concept is not reused as two different developed points", () => {
    const media=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-22");
    const result=gradeSocialStudiesShortAnswer(
      "Investigative journalism exposes wrongdoing because the media acts as a watchdog.",
      media.marking
    );
    expect(result.marks).toBeLessThanOrEqual(2);
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

  test("provides 152 marked short-answer questions with balanced syllabus coverage", () => {
    const stats=socialStudiesShortAnswerStats();
    expect(stats.questions).toBe(152);
    expect(stats.bySection).toEqual({A1:38,A2:38,B1:38,B2:38});
    expect(stats.marks).toBeGreaterThanOrEqual(380);
    SOCIAL_STUDIES_SHORT_ANSWER_BANK.forEach(item=>{
      expect(item.marking).toBeTruthy();
      expect(item.modelPoints.length).toBeGreaterThan(0);
      expect(["A1","A2","B1","B2"]).toContain(item.sectionId);
    });
  });

  test("does not award developed-point marks for bare topic labels", () => {
    const checks=[
      ["ss-sa-a2-31","separation of powers"],
      ["ss-sa-b2-24","sustainable tourism"],
      ["ss-sa-b1-38","climate change adaptation"],
      ["ss-sa-b2-29","foreign direct investment"],
      ["ss-sa-b2-32","CSME"],
      ["ss-sa-b2-34","CARICOM"],
      ["ss-sa-b2-37","tourism leakage"],
    ];
    checks.forEach(([id,response])=>{
      const item=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(question=>question.id===id);
      expect(gradeSocialStudiesShortAnswer(response,item.marking).marks).toBe(0);
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

  test("marks newly expanded syllabus areas", () => {
    const familyLaw=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a1-13");
    const parties=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-16");
    const planning=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-14");
    const ict=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-17");

    expect(gradeSocialStudiesShortAnswer(
      "Parents must support children financially and ensure they attend school.",
      familyLaw.marking
    ).marks).toBe(2);

    expect(gradeSocialStudiesShortAnswer(
      "Political parties select candidates, prepare a manifesto and campaign for votes.",
      parties.marking
    ).marks).toBe(3);

    expect(gradeSocialStudiesShortAnswer(
      "Population statistics help government plan schools and hospitals because it knows where services are needed. They also help allocate resources to communities with the greatest needs.",
      planning.marking
    ).marks).toBe(4);

    expect(gradeSocialStudiesShortAnswer(
      "ICT supports e-commerce, so Caribbean firms can sell to a larger market. It also supports online learning, which helps people gain skills and develop the workforce.",
      ict.marking
    ).marks).toBe(4);
  });


  test("marks the expanded research, civic, migration and tourism applications", () => {
    const pilot=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a1-24");
    const media=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-22");
    const returnMigration=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-23");
    const tourism=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-24");

    expect(gradeSocialStudiesShortAnswer(
      "A pilot study helps find confusing questions before the full questionnaire is used, so the researcher can improve the questions.",
      pilot.marking
    ).marks).toBe(2);

    expect(gradeSocialStudiesShortAnswer(
      "Investigative journalism can expose misuse of public money, which helps hold officials accountable. Media reports also give citizens information about government spending, so the public can scrutinise decisions.",
      media.marking
    ).marks).toBe(4);

    expect(gradeSocialStudiesShortAnswer(
      "Returning migrants bring professional skills and experience, which can improve the workforce. They may also invest savings in businesses, creating jobs.",
      returnMigration.marking
    ).marks).toBe(4);

    expect(gradeSocialStudiesShortAnswer(
      "Tourism businesses should buy from local farmers and suppliers so more visitor spending stays in the community. They should also protect beaches and heritage sites so tourism does not destroy the resources visitors come to enjoy.",
      tourism.marking
    ).marks).toBe(4);
  });

  test("grades all four structured questions out of 56 marks", () => {
    const grade=gradeSocialStudiesStructuredPaper({},SOCIAL_STUDIES_PAPER2);
    expect(grade.score).toBe(0);
    expect(grade.maxScore).toBe(56);
  });
});

describe("Social Studies adversarial short-answer marking", () => {
  test("accepts minor spelling errors in multi-word answers", () => {
    const electoral=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-38");
    const result=gradeSocialStudiesShortAnswer(
      "Under first past the post the person with the most votes wins the seat. Under propotional representation, seats are proportional to the votes received.",
      electoral.marking
    );
    expect(result.marks).toBe(2);
  });

  test("accepts natural Caribbean classroom wording without requiring the model sentence", () => {
    const water=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-37");
    const result=gradeSocialStudiesShortAnswer(
      "Households can catch rain water in tanks so there is less pressure on the public supply. They can fix leaking pipes so water is not wasted.",
      water.marking
    );
    expect(result.marks).toBe(4);
  });

  test("does not award marks when a student only repeats the command topic", () => {
    const separation=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-a2-31");
    const sustainable=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b2-24");
    const adaptation=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-38");

    expect(gradeSocialStudiesShortAnswer("separation of powers",separation.marking).marks).toBe(0);
    expect(gradeSocialStudiesShortAnswer("sustainable tourism",sustainable.marking).marks).toBe(0);
    expect(gradeSocialStudiesShortAnswer("climate change adaptation",adaptation.marking).marks).toBe(0);
  });

  test("does not treat an unrelated developed sentence as a relevant answer", () => {
    const ageing=SOCIAL_STUDIES_SHORT_ANSWER_BANK.find(item=>item.id==="ss-sa-b1-30");
    const result=gradeSocialStudiesShortAnswer(
      "Tourism creates jobs because visitors spend money in hotels and restaurants.",
      ageing.marking
    );
    expect(result.marks).toBe(0);
  });
});

describe("Social Studies SBA practice marking", () => {
  test("uses the official 40-mark research-project structure", () => {
    const stats=socialStudiesSbaRubricStats();
    expect(stats.criteria).toBe(10);
    expect(stats.marks).toBe(40);
  });

  test("marks a well-developed practice SBA across all ten criteria", () => {
    const project={
      problem:"To what extent does social media use affect study habits among Grade 10 students at Cedar Secondary School?",
      reason:"This issue was selected because social media is widely used by students and teachers are concerned about its effect on study time and school performance.",
      method:"questionnaire",
      methodJustification:"A questionnaire is suitable because it allows the same questions to be collected from many students efficiently.",
      samplingMethod:"simple random sampling",
      samplingDescription:"Thirty Grade 10 students were selected randomly from the class lists so each student had a chance of selection.",
      instrument:[
        "What is your age group?","How many hours do you use social media daily?","Which platform do you use most?",
        "How many hours do you study each day?","Do you use social media while studying?","How often do notifications interrupt study?",
        "Has social media reduced your study time?","What is your average homework completion rate?","What change would help you study more effectively?"
      ].join("\n"),
      presentations:[
        {type:"table",title:"Daily social media use",labeled:true,accurate:true},
        {type:"bar graph",title:"Hours spent studying",labeled:true,accurate:true},
        {type:"pie chart",title:"Main social media platform",labeled:true,accurate:true},
      ],
      analysis:"The data show that 63% of respondents used social media for more than three hours each day. Students in this group reported lower study time compared with students who used social media for less than two hours. For example, 18 students in the high-use group studied for one hour or less. This suggests a relationship between heavier social media use and reduced study time. In contrast, the smaller low-use group reported longer study periods. These results support the research question because the pattern indicates that frequent use may interrupt homework and revision.",
      sources:["School Guidance Department report","Caribbean youth media-use article"],
      findings:[
        "Most respondents used social media for more than three hours daily.",
        "Students with heavier social media use reported less study time.",
        "Notifications were a common reason students gave for interrupted study."
      ],
      recommendations:[
        "The school should teach students to use scheduled focus periods during homework.",
        "Parents and students should agree on limits for non-school social media during study time."
      ],
      implementation:"The guidance department could run a four-week focus-time programme and compare student study logs before and after the programme.",
      reportText:[
        "This study examined social media use and study habits among Grade 10 students at Cedar Secondary School. The issue was selected because students use social media frequently and teachers have raised concerns about interrupted study.",
        "A questionnaire was used because it allowed the researcher to collect comparable information from several students. Thirty students were selected using a random method from the Grade 10 class lists.",
        "The data were presented using a table, bar graph and pie chart. Sixty-three percent of respondents reported more than three hours of social media use daily. Students with heavier use reported less study time compared with students who used social media less often.",
        "The findings suggest that frequent social media use is associated with reduced study time for this sample. Notifications and checking messages were common explanations for interrupted homework.",
        "The school should teach scheduled focus periods and families should agree on study-time limits. A four-week guidance programme could be introduced and student study logs reviewed afterwards."
      ].join("\n\n"),
      presentationElements:["Cover page","Table of contents","Acknowledgements","Bibliography","Appendices"],
    };
    const result=gradeSocialStudiesSba(project);
    expect(result.maxScore).toBe(40);
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.penalty).toBe(0);
  });

  test("applies the syllabus word-limit penalty only after 1,150 words", () => {
    const base={
      problem:"How does unemployment affect households in the community?",
      reason:"This issue is important because unemployment affects household income and well-being.",
      method:"questionnaire",
      methodJustification:"A questionnaire helps collect comparable information from several households.",
      samplingMethod:"random sample",
      samplingDescription:"Twenty households were selected randomly from the community list.",
      instrument:"Question 1?\nQuestion 2?\nQuestion 3?\nQuestion 4?\nQuestion 5?\nQuestion 6?\nQuestion 7?\nQuestion 8?",
      presentations:[
        {type:"table",title:"Table",labeled:true,accurate:true},
        {type:"bar graph",title:"Graph",labeled:true,accurate:true},
        {type:"pie chart",title:"Chart",labeled:true,accurate:true},
      ],
      analysis:"50% of households reported lower income. This was higher than the 25% reporting no change. Therefore the data suggest unemployment affects spending. 10 households reported cutting expenses and 5 reported borrowing. This comparison supports the research question by showing a relationship between unemployment and household financial pressure.",
      sources:["Source one","Source two"],
      findings:["Income fell in many households.","Many households reduced spending.","Some households borrowed money."],
      recommendations:["Provide job training.","Expand employment services."],
      implementation:"The community centre could offer monthly job-training workshops.",
      presentationElements:["Cover page","Table of contents","Bibliography","Appendices"],
    };

    const noPenalty=gradeSocialStudiesSba({...base,reportText:Array(1100).fill("word").join(" ")});
    const penalty=gradeSocialStudiesSba({...base,reportText:Array(1151).fill("word").join(" ")});
    expect(noPenalty.penalty).toBe(0);
    expect(penalty.penalty).toBeGreaterThan(0);
  });

  test("records the announced CSEC assessment transition", () => {
    expect(SOCIAL_STUDIES_SBA_TRANSITION.schoolCandidates2027).toContain("SBA");
    expect(SOCIAL_STUDIES_SBA_TRANSITION.schoolCandidates2027).toContain("Paper 032");
    expect(SOCIAL_STUDIES_SBA_TRANSITION.from2028).toContain("Paper 032");
  });
});

describe("Social Studies essay marking", () => {
  test("grades the two Paper 02 essays out of 44 marks", () => {
    const grade=gradeSocialStudiesEssays({},SOCIAL_STUDIES_PAPER2);
    expect(grade.score).toBe(0);
    expect(grade.maxScore).toBe(44);
  });

  test("uses the CXC four-mark organisation and development band", () => {
    const essay=[
      "Caribbean culture and identity are strengthened when traditions are passed from one generation to another. Family members and the media are important agents of cultural transmission. For example, reggae music and Caribbean cuisine have reached international audiences.",
      "Cultural transmission builds a shared sense of Caribbean identity because young people learn the values and traditions of the region. In addition, preserving these traditions keeps cultural heritage alive and helps communities maintain a sense of belonging.",
      "Schools should teach Caribbean heritage so that students pass culture to another generation. Cultural organisations should also use social media to promote culture to a global audience. Another strategy is to stage festivals and exhibitions because these activities showcase culture to visitors and international audiences.",
      "These strategies are likely to work because social media reaches wider and younger audiences. Therefore, school programmes help cultural transmission continue across generations. As a result, cultural identity is strengthened while Caribbean culture gains wider international exposure."
    ].join("\n\n");

    const result=gradeSocialStudiesEssay(essay,"ss-p2-q5");
    expect(result.maxMarks).toBe(22);
    expect(result.contentMarks).toBeGreaterThanOrEqual(16);
    expect(result.organizationMarks).toBe(4);
    expect(result.marks).toBeGreaterThanOrEqual(20);
  });

  test("does not award the top organisation band for a long unstructured block", () => {
    const response=[
      "Caribbean culture is important and culture is passed from one generation to another because families teach values and traditions and the media also shares cultural forms.",
      "Reggae music and Caribbean food are known outside the region because the diaspora and tourism spread them to other countries.",
      "Schools should teach Caribbean heritage because this helps young people learn the culture and festivals should be promoted because visitors and communities take part."
    ].join(" ");

    const result=gradeSocialStudiesEssay(response,"ss-p2-q5");
    expect(result.organizationMarks).toBeLessThanOrEqual(2);
    expect(result.organization.developedParagraphCount).toBeLessThan(3);
    expect(result.organization.weaknesses.length).toBeGreaterThan(0);
  });

  test("does not award essay organisation marks to a blank response", () => {
    const result=gradeSocialStudiesEssay("","ss-p2-q6");
    expect(result.contentMarks).toBe(0);
    expect(result.organizationMarks).toBe(0);
    expect(result.marks).toBe(0);
  });

  test("marks every alternate Paper 02 essay out of 22", () => {
    const essayIds=SOCIAL_STUDIES_PAPER2_VARIANTS
      .flatMap(set=>set.questions)
      .filter(question=>question.type==="essay")
      .map(question=>question.id);

    expect(essayIds).toHaveLength(4);
    essayIds.forEach(id=>{
      const result=gradeSocialStudiesEssay("",id);
      expect(result.maxMarks).toBe(22);
      expect(result.marks).toBe(0);
    });
  });
});

describe("Social Studies alternate Paper 02 sets", () => {
  test("provides two additional complete current-format papers", () => {
    const stats=socialStudiesPaper2VariantStats();
    expect(stats.sets).toBe(2);
    expect(stats.questions).toBe(12);
    expect(stats.structured).toBe(8);
    expect(stats.essays).toBe(4);

    SOCIAL_STUDIES_PAPER2_VARIANTS.forEach(set=>{
      expect(set.questions).toHaveLength(6);
      expect(set.questions.filter(question=>question.type==="structured")).toHaveLength(4);
      expect(set.questions.filter(question=>question.type==="essay")).toHaveLength(2);
      expect(set.questions.reduce((sum,question)=>sum+question.totalMarks,0)).toBe(100);

      const structured=gradeSocialStudiesStructuredPaper({},set.questions);
      const essays=gradeSocialStudiesEssays({},set.questions);
      expect(structured.maxScore).toBe(56);
      expect(essays.maxScore).toBe(44);
    });
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
  expect(hub).toContain("PAPER2_SETS");
  expect(hub).toContain("Choose one of three original current-format simulations");
  expect(examiner).toContain("Mark my response");
  expect(examiner).toContain("gradeSocialStudiesShortAnswer");
});
