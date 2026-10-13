import fs from "fs";
import path from "path";
const read=p=>fs.readFileSync(path.resolve(__dirname,"..","..",p),"utf8");

describe("Chemistry Paper 1 exam and Paper 2 archive UI",()=>{
  test("Paper 1 has separate modes and a timed instruction gate",()=>{
    const jsx=read("src/chemistry/practice/ChemistryPaper1Exam.jsx");
    expect(jsx).toContain("chem-p1-picker-card");
    expect(jsx).toContain("Practice sets</button>");
    expect(jsx).toContain("Past papers</button>");
    expect(jsx).toContain("55 questions only");
    expect(jsx).toContain("READ THE FOLLOWING INSTRUCTIONS CAREFULLY.");
    expect(jsx).toContain("Start examination");
    expect(jsx).toContain('phase!=="exam"');
    expect(jsx).toContain("paperSessionKey");
    expect(jsx).toContain("Question type");
  });
  test("Paper 2 archive links directly to the historical exam runner without the accordion",()=>{
    const jsx=read("src/chemistry/practice/ChemistryPracticeHub.jsx");
    expect(jsx).toContain("buildChemistryHistoricalExam");
    expect(jsx).toContain("Start simulated exam");
    expect(jsx).toContain('mode==="historical-exam"');
    expect(jsx).toContain("Choose one Section C question");
    expect(jsx).not.toContain("View paper details");
    expect(jsx).not.toContain("chem-archive-question-list");
    expect(jsx).not.toContain("Show provisional answers and explanations");
  });
  test("Chemistry styles support instruction sheets and light/dark contrast",()=>{
    const css=read("src/chemistry/practice/chemistryPractice.css");
    for(const name of [".chem-archive-hero p",".chem-archive-tags span",".chem-archive-card p",".chem-p1-picker-card",".chem-p1-instructions",".chem-p1-exam-header"]){
      expect(css).toContain(name);
    }
    expect(css).toContain("opacity:1!important");
    expect(css).toContain('html[data-theme="dark"]');
  });
});
