const fs=require("fs");
const path=require("path");

function read(...parts){
  return fs.readFileSync(path.join(__dirname,"..",...parts),"utf8");
}

describe("English A notification parity",()=>{
  const migration=read("supabase","migrations","20261005050000_english_a_progress_notifications.sql");
  const paper1=read("src","englishA","practice","EnglishAPaper1Exam.jsx");
  const paper2=read("src","englishA","practice","EnglishAPaper2Exam.jsx");
  const study=read("src","subjects","GenericSubjectStudyView.jsx");

  test("installs an English A subject activity notification trigger",()=>{
    expect(migration).toContain("spark_english_a_subject_activity_notifications");
    expect(migration).toContain("when (new.subject_id = 'english-a' and new.completed = true)");
    expect(migration).toContain("spark_create_notification");
    expect(migration).toContain("spark_notify_linked_parents");
  });

  test("distinguishes Paper 01 and Paper 02 notification categories",()=>{
    expect(migration).toContain("paper1_completed");
    expect(migration).toContain("child_paper1_completed");
    expect(migration).toContain("paper2_completed");
    expect(migration).toContain("child_paper2_completed");
    expect(migration).toContain("'paper_type', 'paper1'");
    expect(migration).toContain("'paper_type', 'paper2'");
  });

  test("English A Paper 01 records a canonical completed exam event",()=>{
    expect(paper1).toContain('subjectId:"english-a"');
    expect(paper1).toContain('activityType:"exam"');
    expect(paper1).toContain('paper:"01"');
    expect(paper1).toContain('title:"English A Paper 01"');
  });

  test("English A Paper 02 records a canonical completed exam event",()=>{
    expect(paper2).toContain('subjectId:"english-a"');
    expect(paper2).toContain('activityType:"exam"');
    expect(paper2).toContain('paper:"02"');
  });

  test("generic English A lessons already record lesson completion events",()=>{
    expect(study).toContain('activityKey:`lesson:${activeTopic.id}`');
    expect(study).toContain('activityType:"lesson"');
    expect(study).toContain("subjectId,");
    expect(migration).toContain("English A lesson completed");
    expect(migration).toContain("child_lesson_completed");
  });

  test("future English A topic and module assessments have parent notification parity",()=>{
    expect(migration).toContain("English A topic practice completed");
    expect(migration).toContain("child_topic_quiz_completed");
    expect(migration).toContain("English A module checkpoint completed");
    expect(migration).toContain("child_section_test_completed");
  });

  test("notifications carry English A subject and performance metadata",()=>{
    expect(migration).toContain("'subject_id', 'english-a'");
    expect(migration).toContain("'subject_name', 'CSEC English A'");
    expect(migration).toContain("'performance_status', v_status");
    expect(migration).toContain("'student_id', new.user_id");
  });
});
