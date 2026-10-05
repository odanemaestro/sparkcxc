const fs = require("fs");
const path = require("path");

const { buildEnglishAPaper2 } = require("../englishA/data/englishAPaper2Bank");
const { gradeEnglishAPaper2 } = require("../englishA/practice/englishAPaper2Grader");
const { markPart } = require("../practice/cxcMarking/markScheme");
const { gradeInformationTechnologyPart } = require("../informationTechnology/practice/itPaper2Marking");
const { physicsValueCheck, markPhysicsPaper2 } = require("../physics/paper2/physicsPaper2Marking");
const { gradeIntegratedSciencePaper2 } = require("../integratedScience/practice/integratedSciencePaper2Grader");
const { evaluateGradingBenchmark, benchmarkReady } = require("./calibrationBenchmark");
const { buildAttemptProvenance, attemptSnapshotHash } = require("./attemptProvenance");

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, "..", ...parts), "utf8");
}

describe("Paper 2 grading audit regressions", () => {
  test("English A keeps the full 120-mark denominator when no creative option is selected", () => {
    const paper = buildEnglishAPaper2("A");
    const result = gradeEnglishAPaper2(paper, {}, "");
    expect(result.maxScore).toBe(120);
    expect(result.modules.map(row => row.max)).toEqual([40, 40, 40]);
  });

  test("Mathematics ECF method credit needs a derived follow-through value", () => {
    const part = {
      id:"b",
      marks:1,
      criteria:[{
        code:"M1",
        kind:"M",
        marks:1,
        field:"working",
        check:{type:"reachesValue",values:[999]},
        followThroughUses:["a"],
        followThroughFormula:"a*2",
      }],
    };
    const earlier={a:{value:10,correct:false}};
    expect(markPart({working:"10"},part,earlier).marks).toBe(0);
    expect(markPart({working:"20"},part,earlier).marks).toBe(1);
  });

  test("IT pseudocode requires a true sum and correct output branches", () => {
    const question={prompt:"Write language-neutral pseudocode"};
    const part={
      id:"a",
      marks:8,
      prompt:"Write language-neutral pseudocode that reads A, B, C, calculates SCORE and accepts at least 50.",
      responseSpec:{variables:["A","B","C"],threshold:50},
    };
    const good=gradeInformationTechnologyPart(question,part,{
      pseudocode:"INPUT A, B, C\nSCORE = C + A + B\nIF SCORE >= 50 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF",
    });
    const subtraction=gradeInformationTechnologyPart(question,part,{
      pseudocode:"INPUT A, B, C\nSCORE = A + B - C\nIF SCORE >= 50 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF",
    });
    const reversed=gradeInformationTechnologyPart(question,part,{
      pseudocode:"INPUT A, B, C\nSCORE = A + B + C\nIF SCORE >= 50 THEN\nDISPLAY REVIEW\nELSE\nDISPLAY ACCEPT\nENDIF",
    });
    const wrongThreshold=gradeInformationTechnologyPart(question,part,{
      pseudocode:"INPUT A, B, C\nSCORE = A + B + C\nIF SCORE >= 500 THEN\nDISPLAY ACCEPT\nELSE\nDISPLAY REVIEW\nENDIF",
    });
    expect(good.earned).toBe(8);
    expect(subtraction.criteria.find(item=>item.code==="P2").earned).toBe(0);
    expect(reversed.criteria.find(item=>item.code==="P4").earned).toBe(0);
    expect(reversed.criteria.find(item=>item.code==="P6").earned).toBe(0);
    expect(wrongThreshold.criteria.find(item=>item.code==="P3").earned).toBe(0);
  });

  test("Physics rejects competing numeric alternatives", () => {
    expect(physicsValueCheck("10 or 12 W",{type:"value",value:10,unit:"W",tolerance:0.01})).toBe(false);
    expect(physicsValueCheck("10 W",{type:"value",value:10,unit:"W",tolerance:0.01})).toBe(true);
  });

  test("Physics ECF converts compatible source units before follow-through", () => {
    const paper={questions:[{
      question_id:"phy-p2-1-q3",
      parts:[
        {id:"bi",marks:1,criteria:[{code:"A1",marks:1,description:"energy",check:{type:"value",value:8000,unit:"J",tolerance:0.01}}]},
        {id:"bii",marks:1,criteria:[{code:"A1",marks:1,description:"power",check:{type:"value",value:200,unit:"W",tolerance:0.01}}]},
      ],
    }]};
    const responses={
      "phy-p2-1-q3::bi":{answer:"4 kJ"},
      "phy-p2-1-q3::bii":{answer:"100 W"},
    };
    const result=markPhysicsPaper2(paper,responses);
    const target=result.criteria.find(item=>item.id==="phy-p2-1-q3::bii::A1");
    expect(target.earned).toBe(1);
    expect(target.why).toMatch(/follow-through/i);
  });

  test("Integrated Science no longer asks students to self-mark Paper 2", () => {
    const exam = source("integratedScience","practice","IntegratedSciencePaper2Exam.jsx");
    expect(exam).toContain("gradeIntegratedSciencePaper2");
    expect(exam).toContain("SPARK has marked your paper");
    expect(exam).not.toContain("selfMarks");
    expect(exam).not.toContain("saveSelfMarkedScore");
  });

  test("Integrated Science label marking uses explicit authored label answers", () => {
    const paper=[{id:"Q1",totalMarks:2,parts:[{label:"(a)",items:[{
      label:"(i)",prompt:"Identify A and B",marks:2,response:{type:"labels",keys:["A","B"]},
      markScheme:{points:["A - nucleus","B - cell wall"],guidance:"1 mark each"}
    }]}]}];
    const result=gradeIntegratedSciencePaper2(paper,{
      "Q1:0:0:A":"nucleus",
      "Q1:0:0:B":"cell wall",
    });
    expect(result.score).toBe(2);
    expect(result.questions[0].items[0].confidence).toBe("high");
  });

  test("attempt provenance preserves an immutable versioned response snapshot", () => {
    const responses={q1:{answer:"42"}};
    const provenance=buildAttemptProvenance({
      subjectId:"mathematics",paper:"02",bankVersion:"bank-v1",rubricVersion:"rubric-v1",
      graderVersion:"grader-v1",submittedAt:"2026-10-05T00:00:00.000Z",responses,
    });
    responses.q1.answer="99";
    expect(provenance.response_snapshot.q1.answer).toBe("42");
    expect(provenance.response_snapshot_hash).toBe(attemptSnapshotHash({q1:{answer:"42"}}));
  });

  test("examiner calibration reports total and criterion disagreement without inventing benchmark data", () => {
    const rows=[
      {scriptId:"a",subjectId:"physics",examiner1:"m1",examiner2:"m2",adjudicated:true,examinerMark:8,sparkMark:9,
       criteria:[{examinerAwarded:true,sparkAwarded:true},{examinerAwarded:false,sparkAwarded:true}]},
      {scriptId:"b",subjectId:"physics",examiner1:"m1",examiner2:"m2",adjudicated:true,examinerMark:5,sparkMark:5,
       criteria:[{examinerAwarded:true,sparkAwarded:false}]},
    ];
    expect(benchmarkReady(rows)).toBe(true);
    const metrics=evaluateGradingBenchmark(rows);
    expect(metrics.scripts).toBe(2);
    expect(metrics.meanAbsoluteError).toBe(0.5);
    expect(metrics.falseAwards).toBe(1);
    expect(metrics.falseRejections).toBe(1);
  });

  test("Social Studies Paper 2 has timed and guided modes with deadline locking", () => {
    const hub = source("socialStudies","practice","SocialStudiesPracticeHub.jsx");
    expect(hub).toContain("SOCIAL_STUDIES_PAPER2_DURATION_SECONDS=160*60");
    expect(hub).toContain('sessionMode==="timed"');
    expect(hub).toContain('sessionMode==="guided"');
    expect(hub).toContain("Date.now()>=Number(endsAt)");
    expect(hub).toContain("saveSocialStudiesPaper2State");
    expect(hub).toContain("Marking guides stay hidden until submission");
  });

  test("English A answer handlers enforce the wall-clock deadline", () => {
    const exam = source("englishA","practice","EnglishAPaper2Exam.jsx");
    expect(exam).toContain("Date.now() >= Number(endsAt)");
    expect(exam).toContain("submitGuard.current=false");
  });
});
