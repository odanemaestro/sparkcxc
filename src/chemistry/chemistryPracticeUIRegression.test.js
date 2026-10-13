import fs from "fs";
import path from "path";
const read=p=>fs.readFileSync(path.resolve(__dirname,"..","..",p),"utf8");

describe("Chemistry practice archive readability and paper selection",()=>{
  test("Paper 1 has separate practice set and past paper modes",()=>{
    const jsx=read("src/chemistry/practice/ChemistryPaper1Exam.jsx");
    expect(jsx).toContain("chem-p1-picker-card");
    expect(jsx).toContain("Practice sets</button>");
    expect(jsx).toContain("Past papers</button>");
    expect(jsx).toContain("55 questions only");
  });
  test("archive expands transcribed question text and answers without requiring PDF files",()=>{
    const jsx=read("src/chemistry/practice/ChemistryPracticeHub.jsx");
    expect(jsx).toContain("CHEMISTRY_HISTORICAL_DRAFT_ITEMS");
    expect(jsx).toContain("View paper details");
    expect(jsx).toContain("chem-archive-question-list");
    expect(jsx).toContain("q.context");
    expect(jsx).toContain("part.context");
    expect(jsx).toContain("item.prompt");
    expect(jsx).toContain("BankTable");
    expect(jsx).toContain("TrustedBankSvg");
    expect(jsx).toContain("Show provisional answers and explanations");
    expect(jsx).toContain("Original PDF scans are optional");
    expect(jsx).not.toContain('method:"HEAD"');
  });
  test("theme and text contrast explicitly override inherited faded styles",()=>{
    const css=read("src/chemistry/practice/chemistryPractice.css");
    for(const name of [".chem-archive-hero p",".chem-archive-tags span",".chem-archive-card p",".chem-p1-picker-card",".chem-archive-pdf-link"]){
      expect(css).toContain(name);
    }
    expect(css).toContain("opacity:1!important");
    expect(css).toContain('html[data-theme="dark"]');
  });
});
