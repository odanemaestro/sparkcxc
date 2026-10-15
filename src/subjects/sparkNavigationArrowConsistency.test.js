import fs from "fs";
import path from "path";
const read=file=>fs.readFileSync(path.join(__dirname,"..",file),"utf8");
describe("SPARK shared thin-line navigation arrows",()=>{
  test("subject chooser uses a real back SVG, not a Unicode arrow",()=>{
    const source=fs.readFileSync(path.join(__dirname,"SubjectSelectionView.jsx"),"utf8");
    expect(source).toContain('import BackArrowIcon from "../components/ui/BackArrowIcon"');
    expect(source).toContain("<BackArrowIcon size={18}/>");
    expect(source).not.toContain("← {children}");
  });
  test("FNH uses shared back and forward icons",()=>{
    const source=read("fnh/practice/FnhNavArrow.jsx");
    expect(source).toMatch(/BackArrowIcon/);
    expect(source).toMatch(/ForwardArrowIcon/);
  });
  test("Chemistry practice routes do not use text arrow glyphs",()=>{
    const source=read("chemistry/practice/ChemistryPracticeHub.jsx");
    expect(source).toContain("<BackArrowIcon/>");
    expect(source).toContain("<ForwardArrowIcon/>");
    expect(source).not.toMatch(/[←→➜➔]/);
  });
  test("major paper and lesson navigation components use SVG icons",()=>{
    for(const filepath of [
      "chemistry/practice/ChemistryPaper1Exam.jsx",
      "chemistry/practice/ChemistryPaper2Exam.jsx",
      "chemistry/practice/ChemistryPracticeHub.jsx",
      "fnh/practice/FnhHistoricalPaper2Exam.jsx",
      "physics/course/components/PhysicsCourseLessons.jsx",
      "practice/Paper2027ModuleExam.jsx",
      "subjects/GenericSubjectStudyView.jsx",
    ]){
      const source=read(filepath);
      expect(source).not.toMatch(/[←→➜➔]/);
      expect(source).toMatch(/<(?:BackArrowIcon|ForwardArrowIcon)\b/);
    }
  });

  test("flashcard panels and FNH reader no longer use Unicode navigation arrows",()=>{
    for(const filepath of [
      "components/learning/FlashcardsPanel.jsx",
      "components/learning/SubjectDashboardOverview.jsx",
      "fnh/practice/FnhHistoricalPaper1Reader.jsx",
      "informationTechnology/components/InformationTechnologyFlashcardsPanel.jsx",
      "practice/Syllabus2027Hub.jsx",
      "socialStudies/components/SocialStudiesFlashcardsPanel.jsx",
      "subjects/GenericSubjectFlashcardsPanel.jsx",
    ]){
      const source=read(filepath);
      expect(source).not.toMatch(/[←→➜➔]/);
      expect(source).toMatch(/<(?:BackArrowIcon|ForwardArrowIcon)\b/);
    }
  });
});
