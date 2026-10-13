import fs from "fs";
import path from "path";
const read=p=>fs.readFileSync(path.resolve(__dirname,"..","..",p),"utf8");

describe("Chemistry exam library and readable student UI",()=>{
  test("Paper 1 and Paper 2 share the same practice and historical paper library",()=>{
    const hub=read("src/chemistry/practice/ChemistryPracticeHub.jsx");
    expect(hub).toContain("function ChemistryPaperLibrary");
    expect(hub).toContain("role=\"group\" aria-label=\"Choose paper type\"");
    expect(hub).toContain("Practice sets</button>");
    expect(hub).toContain("Past papers</button>");
    expect(hub).toContain('mode==="library-paper1"');
    expect(hub).toContain('mode==="library-paper2"');
    expect(hub).toContain("onStartPaper1");
    expect(hub).toContain("onStartPaper2");
    expect(hub).toContain("onStartHistorical");
    expect(hub).not.toContain("chem-practice-paper-picker");
    expect(hub).not.toContain("chem-practice-set-grid");
    expect(hub).not.toContain("View paper details");
  });
  test("Paper 1 opens instructions for the selected set and waits for Start examination",()=>{
    const jsx=read("src/chemistry/practice/ChemistryPaper1Exam.jsx");
    expect(jsx).toContain("sourceId=null");
    expect(jsx).toContain("controlled=Boolean(sourceId)");
    expect(jsx).toContain("READ THE FOLLOWING INSTRUCTIONS CAREFULLY.");
    expect(jsx).toContain("Start examination");
    expect(jsx).toContain('phase!=="exam"');
    expect(jsx).toContain("paperSessionKey");
    expect(jsx).toContain("55 questions only");
    expect(jsx).toContain("Save and exit");
    expect(jsx).not.toContain("window.confirm");
  });
  test("historical Paper 2 keeps its Section C choice and skips the old archive accordion",()=>{
    const hub=read("src/chemistry/practice/ChemistryPracticeHub.jsx");
    expect(hub).toContain("buildChemistryHistoricalExam");
    expect(hub).toContain("Section C option");
    expect(hub).not.toContain("chem-archive-question-list");
    expect(hub).not.toContain("Show provisional answers and explanations");
    expect(hub).not.toContain("SPARK-authored answers awaiting independent review");
  });
  test("Chemistry libraries use explicit legible text tokens in light and dark themes",()=>{
    const css=read("src/chemistry/practice/chemistryPractice.css");
    for(const name of [".chem-library-hero p",".chem-library-paper p",".chem-library-entry-copy>span",".chem-library-grid",".chem-exam-modal",".chem-p1-instructions"]){
      expect(css).toContain(name);
    }
    expect(css).toContain("--chem-muted:#4a607a");
    expect(css).toContain("--chem-muted:#bfcede");
    expect(css).toContain('html[data-theme="dark"]');
  });
});
