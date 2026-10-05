const fs=require("fs");
const path=require("path");

const { formulaMatches, pseudocodeBranchEvidence }=require("../informationTechnology/practice/itPaper2Marking");
const { compileScheme }=require("../practice/cxcMarking/markScheme");
const { gradeIntegratedSciencePaper2 }=require("../integratedScience/practice/integratedSciencePaper2Grader");

function read(...parts){return fs.readFileSync(path.join(__dirname,"..",...parts),"utf8");}

describe("Paper 2 accuracy V2",()=>{
  test("Integrated Science Paper 2 is automatically marked and contains no self-mark UI",()=>{
    const exam=read("integratedScience","practice","IntegratedSciencePaper2Exam.jsx");
    expect(exam).toContain("SPARK has marked your paper");
    expect(exam).toContain("Score saved automatically");
    expect(exam).not.toContain("saveSelfMarkedScore");
    expect(exam).not.toContain("setSelfMarks");
  });

  test("Integrated Science graph and drawing evidence is persistent",()=>{
    const exam=read("integratedScience","practice","IntegratedSciencePaper2Exam.jsx");
    expect(exam).toContain("\`\${base}:points\`");
    expect(exam).toContain("\`\${base}:xLabel\`");
    expect(exam).toContain("\`\${base}:yLabel\`");
    expect(exam).toContain("\`\${base}:scale\`");
    expect(exam).toContain("\`\${base}:strokes\`");
    expect(exam).toContain("onPointerMove");
  });

  test("Integrated Science labels receive high-confidence deterministic marks",()=>{
    const paper=[{id:"Q",totalMarks:2,parts:[{label:"(a)",items:[{
      label:"(i)",marks:2,prompt:"Label",response:{type:"labels",keys:["P","Q"]},
      markScheme:{points:["P - anther","Q - stigma"]}
    }]}]}];
    const result=gradeIntegratedSciencePaper2(paper,{"Q:0:0:P":"anther","Q:0:0:Q":"stigma"});
    expect(result.score).toBe(2);
    expect(result.questions[0].items[0].provisional).toBe(false);
  });

  test("IT accepts curated equivalent spreadsheet formulas without becoming substring-based",()=>{
    expect(formulaMatches("=C2*B2",["=B2*C2"])).toBe(true);
    expect(formulaMatches("=D2+D3",["=SUM(D2:D3)"])).toBe(true);
    expect(formulaMatches("=D2+D30",["=SUM(D2:D3)"])).toBe(false);
  });

  test("IT pseudocode branch parser rejects reversed branches",()=>{
    const correct=pseudocodeBranchEvidence("IF SCORE >= 50 THEN\\nDISPLAY ACCEPT\\nELSE\\nDISPLAY REVIEW");
    const reversed=pseudocodeBranchEvidence("IF SCORE >= 50 THEN\\nDISPLAY REVIEW\\nELSE\\nDISPLAY ACCEPT");
    expect(correct.trueAccept).toBe(true);
    expect(correct.falseReview).toBe(true);
    expect(reversed.trueAccept).toBe(false);
    expect(reversed.falseReview).toBe(false);
  });

  test("Mathematics compiled parts expose explicit method policy",()=>{
    const part=compileScheme({id:"a",marks:2,criteria:[
      {code:"M",kind:"M",marks:1,description:"method",check:{type:"reachesValue",values:[2]}},
      {code:"A",kind:"A",marks:1,description:"answer",check:{type:"numeric",value:2}},
    ]});
    expect(part.markingPolicy).toEqual(expect.objectContaining({
      correctAnswerImpliesMethod:true,
      requiresWorking:false,
      strictDependencies:false,
      allowsFollowThrough:false,
    }));
  });

  test("server attempt migration provides authoritative start clock and idempotent submission",()=>{
    const sql=read("..","supabase","migrations","20261005043000_exam_attempt_integrity.sql");
    expect(sql).toContain("spark_start_exam_attempt");
    expect(sql).toContain("clock_timestamp()");
    expect(sql).toContain("spark_exam_attempt_clock");
    expect(sql).toContain("spark_submit_exam_attempt");
    expect(sql).toContain("if v_row.status='submitted'");
  });

  test("Paper 2 provenance is wired across major subjects",()=>{
    const sources=[
      read("englishA","practice","EnglishAPaper2Exam.jsx"),
      read("physics","paper2","components","PhysicsPaper2Exam.jsx"),
      read("informationTechnology","practice","InformationTechnologyPaper2Exam.jsx"),
      read("practice","Paper2Exam.jsx"),
      read("practice","Paper2027ModuleExam.jsx"),
      read("socialStudies","practice","SocialStudiesPracticeHub.jsx"),
      read("integratedScience","practice","IntegratedSciencePaper2Exam.jsx"),
    ];
    sources.forEach(source=>expect(source).toMatch(/buildAttemptProvenance|attemptProvenance|attempt_provenance/));
  });

  test("responsive Integrated Science response tools remain mobile-safe and accessible",()=>{
    const exam=read("integratedScience","practice","IntegratedSciencePaper2Exam.jsx");
    const css=read("integratedScience","practice","integratedScienceExam.css");
    expect(exam).toContain('aria-label="Student graph plot"');
    expect(exam).toContain('aria-label="Student drawing canvas"');
    expect(css).toContain("@media(max-width:520px)");
    expect(css).toContain(".is-p2-graph-fields{grid-template-columns:1fr}");
    expect(css).toContain("touch-action:none");
  });
});
