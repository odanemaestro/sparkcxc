import fs from "fs";
import path from "path";
const read=pathFromRoot=>fs.readFileSync(path.resolve(__dirname,"..","..",pathFromRoot),"utf8");

describe("Chemistry page reset and notification parity",()=>{
  test("practice hub resets the scroll position on route and Paper 2 set changes",()=>{
    const src=read("src/chemistry/practice/ChemistryPracticeHub.jsx");
    expect(src).toContain("window.scrollTo");
    expect(src).toContain("[mode,paper1Source,paperIndex,historicalPaper?.id]");
  });
  test("Paper 1 returns to the top on new papers, questions and review",()=>{
    const src=read("src/chemistry/practice/ChemistryPaper1Exam.jsx");
    expect(src).toContain("window.scrollTo");
    expect(src).toContain("[source,active,phase]");
  });
  test("Paper 2 retains page reset on answer navigation and submission",()=>{
    const src=read("src/chemistry/practice/ChemistryPaper2Exam.jsx");
    expect(src).toContain("const goTop=");
    expect(src).toContain("goTop()");
  });
  test("Chemistry notifications cover students, parents, exam scores, labs and lessons",()=>{
    const sql=read("supabase/migrations/20261013070000_chemistry_progress_notifications.sql");
    expect(sql).toContain("after insert on public.spark_subject_activity_events");
    expect(sql).toContain("spark_create_notification");
    expect(sql).toContain("spark_notify_linked_parents");
    expect(sql).toContain("paper1_completed");
    expect(sql).toContain("paper2_completed");
    expect(sql).toContain("child_lesson_completed");
    expect(sql).toContain("Chemistry lab completed");
    expect(sql).toContain("when (new.subject_id = 'chemistry' and new.completed = true)");
    expect(sql).toContain("end;\n$$;");
  });
  test("Chemistry database migration seeds 21 topics before publishing the generic subject",()=>{
    const sql=read("supabase/migrations/20261012010000_csec_chemistry_course_v1.sql");
    expect(sql).toContain("enabled=false");
    const insert=sql.indexOf("insert into public.spark_subject_topics(");
    const publish=sql.lastIndexOf("set enabled=true,status='live'");
    expect(insert).toBeGreaterThan(0);
    expect(publish).toBeGreaterThan(insert);
    const realTopics=(sql.match(/'chemistry','[abc][0-9]+-[^']+','section-[abc]-/g)||[]);
    expect(realTopics).toHaveLength(21);
  });
  test("Supabase catalog advertises the same Chemistry routes and capabilities",()=>{
    const sql=read("supabase/migrations/20261013071000_chemistry_subject_capabilities.sql");
    expect(sql).toContain('"/dashboard/flashcards/chemistry"');
    expect(sql).toContain('"paper1":true');
  });
});
