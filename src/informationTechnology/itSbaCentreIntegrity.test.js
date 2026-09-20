const fs = require("fs");
const path = require("path");

const root = __dirname;
const practiceRoot = path.join(root, "practice");
const projects = fs.readFileSync(path.join(practiceRoot, "itSbaProjects.js"), "utf8");
const tasks = fs.readFileSync(path.join(practiceRoot, "itSbaProjectTasks.js"), "utf8");
const centre = fs.readFileSync(path.join(practiceRoot, "InformationTechnologySbaCentre.jsx"), "utf8");
const hub = fs.readFileSync(path.join(practiceRoot, "InformationTechnologyPracticeHub.jsx"), "utf8");
const css = fs.readFileSync(path.join(practiceRoot, "informationTechnologySba.css"), "utf8");
const routing = fs.readFileSync(path.join(root, "..", "routing", "sparkRoutingV270.js"), "utf8");

describe("Information Technology SBA Centre V3 integrity", () => {
  test("includes five original SPARK practice projects", () => {
    expect((projects.match(/makeProject\(\{/g) || []).length).toBe(5);
    for (const title of ["SPARK Sports Academy","IslandCare Medical Centre","YardFresh Community Market","HarbourView Community Library","BlueWave Island Tours"]) expect(projects).toContain(title);
    expect(projects).not.toContain("Brookstone");
  });

  test("provides specific question-by-question guidance for every project section", () => {
    expect(tasks).toContain("IT_SBA_PROJECT_TASKS");
    for (const id of ["sports-academy","medical-centre","community-market","community-library","island-tours"]) expect(tasks).toContain(`"${id}"`);
    for (const section of ["database","spreadsheet","word","web","programming"]) expect(tasks).toContain(`"${section}"`);
    expect(centre).toContain("How to complete this question");
    expect(centre).toContain("What the completed SPARK answer shows");
  });

  test("shows the full SBA PDF and completed PDFs for every section", () => {
    expect(centre).toContain("full-sba.pdf");
    expect(centre).toContain("database-completed.pdf");
    expect(centre).toContain("spreadsheet-completed.pdf");
    expect(centre).toContain("word-completed.pdf");
    expect(centre).toContain("web-completed.pdf");
    expect(centre).toContain("programming-completed.pdf");
    expect(centre).toContain("it-sba-pdf-viewer");
    expect(centre).toContain("View full SBA");
    expect(centre).toContain("Completed SBA downloads");
  });


  test("provides real native-format SBA working files", () => {
    expect(centre).toContain("IT_SBA_NATIVE_FILES");
    expect(centre).toContain(".accdb");
    expect(centre).toContain(".xlsx");
    expect(centre).toContain(".docx");
    expect(centre).toContain(".html");
    expect(centre).toContain(".pas");
    expect(centre).toContain("Actual working files");
    expect(centre).toContain("SPARK reference protection");
    expect(css).toContain("it-sba-native-file");
  });

  test("ships the native non-Access files and the Access database generator", () => {
    const publicRoot = path.join(root, "..", "..", "public", "it-sba");
    const expected = {
      "sports-academy": ["SportsAcademy_Financials.xlsx","Registration_Form.docx","Generic_Mail_Merge.docx","Merged_Output.docx","Web_Page.html","AcademyFees.pas","Program_Documentation.docx","Database_Schema.sql"],
      "medical-centre": ["MedicalAccounts.xlsx","Registration_Form.docx","Generic_Mail_Merge.docx","Merged_Output.docx","Web_Page.html","MedicalBalances.pas","Program_Documentation.docx","Database_Schema.sql"],
      "community-market": ["SalesAnalysis.xlsx","Registration_Form.docx","Generic_Mail_Merge.docx","Merged_Output.docx","Web_Page.html","MarketCheckout.pas","Program_Documentation.docx","Database_Schema.sql"],
      "community-library": ["LoansAnalysis.xlsx","Registration_Form.docx","Generic_Mail_Merge.docx","Merged_Output.docx","Web_Page.html","LibraryFines.pas","Program_Documentation.docx","Database_Schema.sql"],
      "island-tours": ["TourBookings.xlsx","Registration_Form.docx","Generic_Mail_Merge.docx","Merged_Output.docx","Web_Page.html","TourBookings.pas","Program_Documentation.docx","Database_Schema.sql"],
    };

    for (const [projectId, files] of Object.entries(expected)) {
      for (const file of files) {
        expect(fs.existsSync(path.join(publicRoot, projectId, "native", file))).toBe(true);
      }
    }

    expect(fs.existsSync(path.join(root, "..", "..", "tools", "it-sba", "generate-it-sba-access-files.ps1"))).toBe(true);
  });

  test("SBA navigation remains refresh safe and resets new pages to the top", () => {
    expect(routing).toContain("useInformationTechnologySbaRoute");
    expect(routing).toContain('const IT_PRACTICE_BASE = "/practice/information-technology";');
    expect(routing).toContain('`${IT_PRACTICE_BASE}/sba`');
    expect(centre).toContain("useLayoutEffect");
    expect(centre).toContain('window.scrollTo({top:0,left:0,behavior:"auto"})');
    expect(hub).toContain('setMode("sba")');
  });

  test("buttons and responsive styling follow SPARK conventions", () => {
    expect(centre).toContain('data-spark-action="nav"');
    expect(centre).toContain("<BackArrowIcon/>");
    expect(css).toContain("@media(max-width:560px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("watermarked references are described as study material, not submissions", () => {
    expect(centre).toContain("watermark");
    expect(centre).toContain("Do not submit");
    expect(centre).toContain("teacher's current assignment");
  });
});