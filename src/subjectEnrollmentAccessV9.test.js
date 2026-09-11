const fs = require("fs");
const path = require("path");

const root = __dirname;
const app = fs.readFileSync(path.join(root, "App.js"), "utf8");
const practiceHub = fs.readFileSync(path.join(root, "practice", "PracticeHub.jsx"), "utf8");

describe("SPARK V9 enrollment-gated study and practice access", () => {
  test("Study chooser is built only from the student's enrolled subjects", () => {
    expect(app).toContain('function StudySubjectHub({ setView, subjects = [], onManageSubjects })');
    expect(app).toContain('const studySubjects = subjectsForCapability(subjects, "study")');
    expect(app).toContain('subjects={appStudentEnrolledSubjects}');
    expect(app).not.toContain('const subjects = subjectsForCapability(SPARK_SUBJECTS, "study")');
  });

  test("Practice chooser filters supported subjects by enrollment", () => {
    expect(practiceHub).toContain('enrolledSubjectIds = null');
    expect(practiceHub).toContain('const enrolled = new Set(enrolledSubjectIds.map');
    expect(practiceHub).toContain('return supported.filter(item => enrolled.has');
    expect(app).toContain('enrolledSubjectIds={appSubjectEnrollmentIds}');
  });

  test("Direct Mathematics and Physics study routes are enrollment-gated", () => {
    expect(app).toContain('view === "lesson" && session && profile?.role === "student"');
    expect(app).toContain('appHasMathematics');
    expect(app).toContain('<SubjectEnrollmentRequiredView subjectName="Mathematics"');
    expect(app).toContain('view === "physics" && session && profile?.role === "student"');
    expect(app).toContain('appHasPhysics');
    expect(app).toContain('<SubjectEnrollmentRequiredView subjectName="Physics"');
  });

  test("Direct subject practice routes cannot bypass enrollment", () => {
    expect(app).toContain('(view === "practice-math" && !appHasMathematics)');
    expect(app).toContain('(view === "practice-physics" && !appHasPhysics)');
    expect(app).toContain('appStudentEnrolledSubjects.length === 0');
  });

  test("App-shell enrollment follows database changes in realtime", () => {
    expect(app).toContain('table:"spark_student_subject_enrollments"');
    expect(app).toContain('filter:`student_id=eq.${studentId}`');
    expect(app).toContain('loadAppSubjectEnrollments(studentId)');
    expect(app).toContain('spark:subject-enrollments-changed');
  });

  test("Enrollment gate sends the student to My Subjects", () => {
    expect(app).toContain('const openMySubjects = useCallback(() => {');
    expect(app).toContain('writeDashboardSectionToBrowserHash("subjects")');
    expect(app).toContain('Manage my subjects');
  });

  test("Legacy deployments keep safe fallback access until enrollment migration exists", () => {
    expect(app).toContain('const fallbackIds = new Set(["mathematics"])');
    expect(app).toContain('supabase.from("spark_subject_progress")');
    expect(app).toContain('setAppSubjectEnrollmentAvailable(false)');
  });
});
