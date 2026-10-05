const fs=require("fs");
const path=require("path");

describe("Study Circles V10 all-course expansion",()=>{
  const srcRoot=path.join(__dirname);
  const app=fs.readFileSync(path.join(srcRoot,"App.js"),"utf8");
  const panel=fs.readFileSync(path.join(srcRoot,"components","studyCircles","StudyCirclesPanel.jsx"),"utf8");
  const migration=fs.readFileSync(path.join(srcRoot,"..","supabase","migrations","20261005061000_study_circles_all_courses_v10.sql"),"utf8");

  test("student navigation exposes Study Circles for any enrolled course",()=>{
    expect(app).toContain("studentHasStudyCircles = studentEnrolledSubjects.length > 0");
    expect(app).toContain('subjects={studentEnrolledSubjects}');
    expect(app).not.toContain("studentHasMathematics ? [{k:\"circles\"");
  });

  test("Study Circles panel is subject-aware",()=>{
    expect(panel).toContain("spark_get_study_circle_home_v10");
    expect(panel).toContain("spark_match_study_circle_v10");
    expect(panel).toContain("spark_create_study_circle_post_v10");
    expect(panel).toContain("spark_create_study_circle_reply_v10");
    expect(panel).toContain("spark_leave_study_circle_v10");
    expect(panel).toContain("study-circle-subject-switcher");
    expect(panel).toContain("subjects = []");
  });

  test("database scopes preferences and memberships by subject",()=>{
    expect(migration).toContain("primary key (user_id, subject_id)");
    expect(migration).toContain("study_circle_one_active_membership_subject_uidx");
    expect(migration).toContain("on public.study_circle_members(user_id, subject_id)");
    expect(migration).toContain("spark_student_subject_enrollments");
  });

  test("matching uses subject-specific evidence for Mathematics and all other courses",()=>{
    expect(migration).toContain("spark_study_circle_strengths_v10");
    expect(migration).toContain("spark_study_circle_focuses_v10");
    expect(migration).toContain("public.csec_skill_progress");
    expect(migration).toContain("public.spark_subject_progress");
    expect(migration).toContain("hashtext('spark-study-circle-match-v10:'||v_subject)");
  });

  test("parent status returns privacy-safe circles across subjects",()=>{
    expect(migration).toContain("spark_parent_study_circle_status_v10");
    expect(migration).toContain("'circles',v_rows");
    expect(app).toContain("spark_parent_study_circle_status_v10");
    expect(app).toContain("item.subject_id === parentProgressSubject");
  });

  test("existing Study Circle safety boundaries remain",()=>{
    expect(migration).toMatch(/whatsapp\|instagram\|snapchat\|telegram\|discord/i);
    expect(migration).toContain("Exact scores, member identities and group messages remain private");
    expect(migration).toContain("Study Circle posts must be between 1 and 700 characters");
  });
});
