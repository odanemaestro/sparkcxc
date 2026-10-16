import fs from "fs";
import path from "path";
const app=fs.readFileSync(path.resolve(__dirname,"../App.js"),"utf8");
describe("draft POB preview remains local-development-only",()=>{
  test("preview is explicitly opt-in and never activates for a production build",()=>{
    expect(app).toContain('process.env.NODE_ENV === "development" && process.env.REACT_APP_POB_PREVIEW === "true"');
    expect(app).toContain('POB_DEV_PREVIEW && appGenericStudySubjectId==="principles-of-business"');
    expect(app).toContain('POB_DEV_PREVIEW && view === "practice-principles-of-business"');
  });
  test("production still checks POB enrolment and leaves draft unpublished",()=>{
    expect(app).toContain('view === "practice-principles-of-business" && !appHasPrinciplesOfBusiness');
    expect(app).toContain('appStudentEnrolledSubjectIds.has("principles-of-business") || POB_DEV_PREVIEW');
  });
});
