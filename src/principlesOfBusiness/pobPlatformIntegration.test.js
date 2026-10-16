import fs from "fs";
import path from "path";
const ROOT=path.resolve(__dirname,"..");
const read=file=>fs.readFileSync(path.join(ROOT,file),"utf8");
describe("POB stays integrated without overriding the existing SPARK subjects",()=>{
  test("new course is registered in subject registry but remains safely unpublished",()=>{
    const registry=read("subjects/subjectRegistry.js");
    expect(registry).toContain('PRINCIPLES_OF_BUSINESS: "principles-of-business"');
    expect(registry).toContain('id:"principles-of-business"');
    expect(registry).toContain('status:"draft"');
    expect(registry).toContain('enabled:false');
  });
  test("generic study and exam routing are available when an authorised student enrolls",()=>{
    const loader=read("subjects/genericSubjectCatalog.js");
    const app=read("App.js");
    const hub=read("practice/PracticeHub.jsx");
    expect(loader).toContain('source:"local-pob"');
    expect(app).toContain('"/practice/principles-of-business":"practice-principles-of-business"');
    expect(app).toContain('appHasPrinciplesOfBusiness');
    expect(app).toContain('view === "practice-principles-of-business" && !appHasPrinciplesOfBusiness');
    expect(hub).toContain('selectedSubject === "principles-of-business"');
    expect(hub).toContain('<PobPracticeHub userId={userId}');
  });
  test("POB is a native shared study view, not a separate duplicate reader",()=>{
    const s=read("subjects/GenericSubjectStudyView.jsx");
    expect(s).toContain('subjectId === "principles-of-business"');
    expect(s).toContain('<PobLearningTools topic={topic} onActivityComplete={onActivityComplete}/>');
    expect(s).not.toContain("<PobBackToTop");
    expect(s).toContain("<ChemistryReferenceDiagrams");
    expect(s).toContain("<SocialStudiesReferenceMedia");
    expect(s).toContain("<FnhReferenceMedia");
  });
  test("POB data is separated from source historical papers and does not claim verification",()=>{
    const source=read("principlesOfBusiness/data/pobHistoricalInventory.js");
    const paper1=read("principlesOfBusiness/data/pobPaper1Original.js");
    const paper2=read("principlesOfBusiness/data/pobPaper2Original.js");
    expect(source).toContain('simulatorReady:false');
    expect(source).toContain('answerKeyStatus:"not-verified"');
    expect(paper1).toContain('origin:"spark-original"');
    expect(paper2).toContain('origin:"spark-original"');
    expect(paper2).not.toContain("teacher approval required");
  });
});
