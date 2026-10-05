const fs=require("fs");
const path=require("path");
const React=require("react");
const { renderToStaticMarkup }=require("react-dom/server");
const { IntegratedScienceText, normalizeIntegratedScienceText }=require("./integratedScience/components/IntegratedScienceText");

describe("Integrated Science rendering QA",()=>{
  test("repairs common encoding artifacts without changing scientific symbols",()=>{
    expect(normalizeIntegratedScienceText("Waterâ€™s temperature is 25Â°C â€“ not 30Â°C.")).toBe("Water’s temperature is 25°C – not 30°C.");
    expect(normalizeIntegratedScienceText("Force Ã— distance â†’ work")).toBe("Force × distance → work");
    expect(normalizeIntegratedScienceText("Resistance Î© and change Î”")).toBe("Resistance Ω and change Δ");
  });

  test("renders common chemical formula subscripts and powers semantically",()=>{
    const html=renderToStaticMarkup(
      React.createElement(IntegratedScienceText,null,"H2O + CO2; area cm2; volume m^3")
    );
    expect(html).toContain("H<sub>2</sub>O");
    expect(html).toContain("CO<sub>2</sub>");
    expect(html).toContain("cm<sup>2</sup>");
    expect(html).toContain("m<sup>3</sup>");
  });

  test("question and lesson surfaces use the Integrated Science renderer",()=>{
    const question=fs.readFileSync(path.join(__dirname,"integratedScience","practice","IntegratedScienceQuestionRenderer.jsx"),"utf8");
    const paper2=fs.readFileSync(path.join(__dirname,"integratedScience","practice","IntegratedSciencePaper2Exam.jsx"),"utf8");
    const study=fs.readFileSync(path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),"utf8");
    expect(question).toContain("IntegratedScienceText");
    expect(paper2).toContain("IntegratedScienceText");
    expect(study).toContain('subjectId === "integrated-science"');
    expect(study).toContain("<IntegratedScienceText>");
  });

  test("dark mode keeps scientific artwork readable on a neutral diagram canvas",()=>{
    const reviewed=fs.readFileSync(path.join(__dirname,"subjects","components","reviewedScienceDiagram.css"),"utf8");
    const practice=fs.readFileSync(path.join(__dirname,"integratedScience","practice","integratedSciencePractice.css"),"utf8");
    const exam=fs.readFileSync(path.join(__dirname,"integratedScience","practice","integratedScienceExam.css"),"utf8");
    expect(reviewed).toContain("INTEGRATED_SCIENCE_DARK_MEDIA_V1");
    expect(reviewed).toMatch(/spark-science-image-button[^}]*background:#fff/);
    expect(practice).toContain("INTEGRATED_SCIENCE_RENDERING_V1");
    expect(exam).toContain("INTEGRATED_SCIENCE_RENDERING_V1");
    expect(practice).toMatch(/\.is-bank-svg[^}]*background:#fff/);
    expect(exam).toMatch(/\.is-bank-svg[^}]*background:#fff/);
  });

  test("Integrated Science authored source files contain no replacement or mojibake markers",()=>{
    const roots=[
      path.join(__dirname,"integratedScience"),
      path.join(__dirname,"subjects","components","IntegratedScienceModel.jsx"),
      path.join(__dirname,"subjects","components","IntegratedScienceLabelDiagram.jsx"),
      path.join(__dirname,"..","public","integrated-science","bank"),
      path.join(__dirname,"..","supabase","migrations","20260920235900_integrated_science_phase1.sql"),
      path.join(__dirname,"..","supabase","migrations","20260921001500_integrated_science_phase1_1.sql"),
      path.join(__dirname,"..","supabase","migrations","20260921003000_integrated_science_question_bank_v2.sql"),
    ];
    const files=[];
    const walk=target=>{
      const stat=fs.statSync(target);
      if(stat.isDirectory()) fs.readdirSync(target).forEach(name=>walk(path.join(target,name)));
      else if(/\.(js|jsx|json|sql|css)$/.test(target)) files.push(target);
    };
    roots.forEach(target=>walk(target));
    const bad=[];
    const pattern=/\uFFFD|â€™|â€œ|â€|Â°|Ã—|Ã·|Î©|Î”|â†’/;
    files.forEach(file=>{
      if(file.endsWith("IntegratedScienceText.jsx")) return;
      const text=fs.readFileSync(file,"utf8");
      if(pattern.test(text)) bad.push(path.relative(path.join(__dirname,".."),file));
    });
    expect(bad).toEqual([]);
  });
});
