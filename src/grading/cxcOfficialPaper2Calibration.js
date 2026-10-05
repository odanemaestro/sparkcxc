import { gradeEnglishAPaper2Response } from "../englishA/practice/englishAPaper2Grader";
import { physicsValueCheck } from "../physics/paper2/physicsPaper2Marking";
import { formulaMatches, pseudocodeBranchEvidence } from "../informationTechnology/practice/itPaper2Marking";
import { gradeSocialStudiesShortAnswer } from "../socialStudies/marking/socialStudiesShortAnswerGrader";
import { gradeIntegratedSciencePaper2 } from "../integratedScience/practice/integratedSciencePaper2Grader";
import { markPart, M, A, compileScheme } from "../practice/cxcMarking/markScheme";

export const CXC_OFFICIAL_CALIBRATION_VERSION="2.0.0";

export const CXC_CALIBRATION_SOURCES=Object.freeze([
  {
    id:"english-a-specimen-2025",
    subjectId:"english-a",
    kind:"official-specimen-mark-scheme",
    effective:"May-June 2027",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-English-Syllabus-Revised-2025.pdf",
    anchors:["Paper 02 mark scheme","50-word summaries","7/7/16 extended-response profiles","short-response caps"],
  },
  {
    id:"english-a-report-2026",
    subjectId:"english-a",
    kind:"official-examiner-report",
    session:"May-June 2026",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/RPT2026CSECMayJuneEnglishA.pdf",
    anchors:["main points versus examples","paraphrasing","organization","grammar and mechanics"],
  },
  {
    id:"mathematics-specimen-2025",
    subjectId:"mathematics",
    kind:"official-specimen-mark-scheme",
    effective:"May-June 2027",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Mathematics-Syllabus_EffectiveforExamsfrom2027.pdf",
    anchors:["CK/AK/R profiles","method/process marks","correct-answer-only marks"],
  },
  {
    id:"physics-specimen",
    subjectId:"physics",
    kind:"official-specimen-mark-scheme",
    url:"https://www.cxc.org/SiteAssets/syllabusses/CSEC/CSEC%20Physics%20Syllabus%20with%20Specimen%20Papers%20and%20Mark%20Scheme-Keys.pdf",
    anchors:["KC/UK/XS profiles","Paper 02 structured marking"],
  },
  {
    id:"physics-report-2026-jan",
    subjectId:"physics",
    kind:"official-examiner-report",
    session:"January 2026",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/RPT2026CSEC-JanuaryPhysicsSubjectReport.pdf",
    anchors:["graph axes/units/scale/plotting","gradient units","structured and extended responses"],
  },
  {
    id:"information-technology-specimen-2017",
    subjectId:"information-technology",
    kind:"official-specimen-mark-scheme",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Information-Technology-Syllabus.pdf",
    anchors:["spreadsheet formula marks","algorithm calculation","branch/output logic"],
  },
  {
    id:"social-studies-specimen-2023",
    subjectId:"social-studies",
    kind:"official-specimen-mark-scheme",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Social-Studies-Syllabus-July-2023.pdf",
    anchors:["definition elements","developed points","partial response marks"],
  },
  {
    id:"social-studies-report-2026-jan",
    subjectId:"social-studies",
    kind:"official-examiner-report",
    session:"January 2026",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/RPT2026CSECJanuarySocial-StudiesSubjectReport.pdf",
    anchors:["six-question Paper 02","structured short answers","essay responses"],
  },
  {
    id:"integrated-science-specimen-2025",
    subjectId:"integrated-science",
    kind:"official-specimen-mark-scheme",
    effective:"May-June 2027",
    url:"https://www.cxc.org/wp-content/uploads/2018/11/CSEC-Integrated-Science-Syllabus_EffectiveforExamsfrom2027.pdf",
    anchors:["KC/UK/XS profiles","full/partial/limited explanations","graph criteria"],
  },
]);

function result(id,subjectId,sourceId,expected,observed,pass,groundTruth="official-cxc-evidence"){
  return {
    id,
    caseId:id,
    subjectId,
    paper:"02",
    sourceId,
    cxcSources:[sourceId],
    adjudicatedBy:"spark-calibration-team",
    adjudicated:true,
    groundTruth,
    expected,
    observed,
    pass:Boolean(pass),
  };
}

function words(count){
  const base=["students","should","read","carefully","because","evidence","supports","clear","reasoning","and"];
  return Array.from({length:count},(_,i)=>base[i%base.length]).join(" ");
}

function englishCases(){
  const sourceId="english-a-specimen-2025";
  const summaryTask={
    id:"cal-summary",kind:"summary",module:1,wordLimit:50,
    stimulus:{paragraphs:[
      "Community libraries give young people quiet places to study and reliable access to books.",
      "Free internet service helps residents complete schoolwork and apply for jobs.",
      "Reading programmes bring children and volunteers together and build stronger reading habits.",
    ]},
  };
  const paraphrased="Libraries offer calm study spaces and useful books. Internet access supports homework and job applications. Reading programmes connect children with volunteers and strengthen regular reading.";
  const lifted=summaryTask.stimulus.paragraphs.join(" ");
  const good=gradeEnglishAPaper2Response(summaryTask,paraphrased,"The writer aims to explain how community libraries support residents.");
  const copied=gradeEnglishAPaper2Response(summaryTask,lifted,"The writer aims to explain how community libraries support residents.");

  const persuasiveTask={id:"cal-persuasive",kind:"persuasive",module:3,wordRange:[250,300],instructions:"Write a persuasive response."};
  const shortPersuasive=gradeEnglishAPaper2Response(persuasiveTask,words(149));
  const literaryTask={id:"cal-literary",kind:"literary",module:2,wordRange:[400,450],instructions:"Write a story based on the prompt."};
  const shortLiterary=gradeEnglishAPaper2Response(literaryTask,words(199));

  const understanding=good.dimensions?.find(row=>row.id==="understanding")?.score ?? 0;
  const copiedEval=copied.dimensions?.find(row=>row.id==="evaluating")?.score ?? 99;

  return [
    result("eng-summary-three-distinct-ideas","english-a",sourceId,"3 distinct summary ideas detected",understanding,understanding===3),
    result("eng-summary-heavy-lifting-cap","english-a",sourceId,"heavy lifting cannot receive unrestricted language credit",copiedEval,copiedEval<=2),
    result("eng-persuasive-under-150-cap","english-a",sourceId,"<150 words cannot exceed 10/30",shortPersuasive.score,shortPersuasive.score<=10),
    result("eng-literary-under-200-cap","english-a",sourceId,"<200 words cannot exceed 10/30",shortLiterary.score,shortLiterary.score<=10),
  ];
}

function mathematicsCases(){
  const sourceId="mathematics-specimen-2025";
  const simple=compileScheme({
    id:"mean",marks:2,requireWorking:true,
    criteria:[
      M(1,"computation/method",{type:"reachesValue",values:[900]},{code:"M"}),
      A(1,"correct answer",{type:"numeric",value:150},{code:"A"}),
    ],
  });
  const full=markPart({answer:"150",working:"sum = 900; 900 / 6 = 150"},simple,{});
  const answerOnly=markPart({answer:"150",working:""},simple,{});
  const range=markPart({answer:"235"},{id:"range",marks:1,check:{type:"numeric",value:235}},{});
  const wrong=markPart({answer:"236"},{id:"range",marks:1,check:{type:"numeric",value:235}},{});
  return [
    result("math-method-plus-cao","mathematics",sourceId,2,full.marks,full.marks===2),
    result("math-working-required","mathematics",sourceId,1,answerOnly.marks,answerOnly.marks===1),
    result("math-cao-exact","mathematics",sourceId,1,range.marks,range.marks===1),
    result("math-cao-reject-wrong","mathematics",sourceId,0,wrong.marks,wrong.marks===0),
  ];
}

function physicsCases(){
  const sourceId="physics-report-2026-jan";
  return [
    result("phy-correct-value-unit","physics",sourceId,true,physicsValueCheck("4000 J",{value:4000,unit:"J"}),physicsValueCheck("4000 J",{value:4000,unit:"J"})===true),
    result("phy-compatible-unit","physics",sourceId,true,physicsValueCheck("4 kJ",{value:4000,unit:"J"}),physicsValueCheck("4 kJ",{value:4000,unit:"J"})===true),
    result("phy-unit-required","physics",sourceId,false,physicsValueCheck("4000",{value:4000,unit:"J"}),physicsValueCheck("4000",{value:4000,unit:"J"})===false),
    result("phy-competing-alternatives","physics",sourceId,false,physicsValueCheck("4000 J or 5000 J",{value:4000,unit:"J"}),physicsValueCheck("4000 J or 5000 J",{value:4000,unit:"J"})===false),
  ];
}

function informationTechnologyCases(){
  const sourceId="information-technology-specimen-2017";
  const correctBranch=pseudocodeBranchEvidence("IF TOTAL >= 350 THEN\nDISPLAY ENOUGH\nELSE\nDISPLAY NOT ENOUGH");
  const reversed=pseudocodeBranchEvidence("IF TOTAL >= 350 THEN\nDISPLAY REVIEW\nELSE\nDISPLAY ACCEPT");
  return [
    result("it-formula-exact-equivalent","information-technology",sourceId,true,formulaMatches("=(B2-C2)*D2",["=(B2-C2)*D2"]),formulaMatches("=(B2-C2)*D2",["=(B2-C2)*D2"])===true),
    result("it-sum-range-equivalent","information-technology",sourceId,true,formulaMatches("=E2+E3+E4+E5+E6",["=SUM(E2:E6)"]),formulaMatches("=E2+E3+E4+E5+E6",["=SUM(E2:E6)"])===true),
    result("it-wrong-formula-rejected","information-technology",sourceId,false,formulaMatches("=(B2+C2)*D2",["=(B2-C2)*D2"]),formulaMatches("=(B2+C2)*D2",["=(B2-C2)*D2"])===false),
    result("it-branch-order-not-loose","information-technology",sourceId,false,reversed.trueAccept||reversed.falseReview,reversed.trueAccept===false&&reversed.falseReview===false),
    result("it-branch-parser-structure","information-technology",sourceId,true,Boolean(correctBranch.hasElse),Boolean(correctBranch.hasElse)),
  ];
}

function socialStudiesCases(){
  const sourceId="social-studies-specimen-2023";
  const definition={
    type:"definition",maxMarks:2,
    groups:[
      {id:"skilled",phrases:["highly skilled","trained persons"],marks:1},
      {id:"out",phrases:["out of a country","leave the country","emigrate"],marks:1},
    ],
  };
  const developed={
    type:"developed_points",maxPoints:1,maxMarks:2,
    points:[{
      id:"unemployment",phrases:["high unemployment"],developmentPhrases:["emigrate in search of work","leave to find work"],
      baseMarks:1,developmentMarks:1,
    }],
  };
  const fullDef=gradeSocialStudiesShortAnswer("The movement of highly skilled people out of a country.",definition);
  const partialDef=gradeSocialStudiesShortAnswer("The movement of highly skilled people.",definition);
  const fullDev=gradeSocialStudiesShortAnswer("High unemployment may cause skilled people to emigrate in search of work.",developed);
  const partialDev=gradeSocialStudiesShortAnswer("High unemployment.",developed);
  return [
    result("soc-definition-full","social-studies",sourceId,2,fullDef.marks,fullDef.marks===2),
    result("soc-definition-partial","social-studies",sourceId,1,partialDef.marks,partialDef.marks===1),
    result("soc-developed-point-full","social-studies",sourceId,2,fullDev.marks,fullDev.marks===2),
    result("soc-developed-point-partial","social-studies",sourceId,1,partialDev.marks,partialDev.marks===1),
  ];
}

function integratedScienceCases(){
  const sourceId="integrated-science-specimen-2025";
  const paper=[{
    id:"IS-CAL",totalMarks:5,parts:[{label:"(a)",items:[
      {label:"(i)",marks:2,prompt:"Distinguish two thermal ideas.",response:{type:"lines"},markScheme:{points:["Heat is a form of energy (1)","Temperature measures how hot an object is (1)"]}},
      {label:"(ii)",marks:3,prompt:"Name the heat-transfer processes.",response:{type:"lines"},markScheme:{points:["Convection (1)","Conduction (1)","Radiation (1)"]}},
    ]}],
  }];
  const full=gradeIntegratedSciencePaper2(paper,{
    "IS-CAL:0:0":"Heat is energy. Temperature measures how hot an object is.",
    "IS-CAL:0:1":"Convection, conduction and radiation.",
  });
  const partial=gradeIntegratedSciencePaper2(paper,{
    "IS-CAL:0:0":"Heat is energy.",
    "IS-CAL:0:1":"Convection and conduction.",
  });
  return [
    result("is-criterion-by-criterion-full","integrated-science",sourceId,5,full.score,full.score===5),
    result("is-partial-does-not-get-full","integrated-science",sourceId,"<5",partial.score,partial.score<5),
  ];
}

export function runCxcOfficialCalibration(){
  const cases=[
    ...englishCases(),
    ...mathematicsCases(),
    ...physicsCases(),
    ...informationTechnologyCases(),
    ...socialStudiesCases(),
    ...integratedScienceCases(),
  ];
  const bySubject={};
  for(const row of cases){
    if(!bySubject[row.subjectId]) bySubject[row.subjectId]={cases:0,passed:0,failed:0};
    bySubject[row.subjectId].cases+=1;
    if(row.pass) bySubject[row.subjectId].passed+=1;
    else bySubject[row.subjectId].failed+=1;
  }
  Object.values(bySubject).forEach(item=>{item.passRate=item.cases?item.passed/item.cases:0;});
  return {
    version:CXC_OFFICIAL_CALIBRATION_VERSION,
    groundTruth:"Official CXC evidence adjudicated by the SPARK calibration team into permanent gold-standard cases. Candidate-style responses are SPARK-authored and contain no candidate personal data.",
    adjudicatedBy:"spark-calibration-team",
    adjudicated:true,
    cases,
    total:cases.length,
    passed:cases.filter(row=>row.pass).length,
    failed:cases.filter(row=>!row.pass).length,
    passRate:cases.length?cases.filter(row=>row.pass).length/cases.length:0,
    bySubject,
    sources:CXC_CALIBRATION_SOURCES,
  };
}
