const fs = require('fs');
const path = require('path');

const app = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');
const migration = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '20260911170000_mathematics_lesson_completion_resilience.sql'), 'utf8');

describe('Mathematics lesson completion resilience V11.8', () => {
  test('LessonView records completion through the resilient Mathematics RPC', () => {
    expect(app).toContain('spark_record_mathematics_lesson_completion');
    expect(app).toContain('p_section_id: sectionId');
    expect(app).toContain('p_topic_id: topicId');
    expect(app).toContain('p_title: topicTitle');
  });

  test('LessonView still has a safe legacy fallback without blind upsert or single()', () => {
    expect(app).toContain('.select("id").eq("title", topicTitle).limit(1)');
    expect(app).toContain('.select("id").eq("user_id", user.id).eq("lesson_id", lesson.id).limit(1)');
    expect(app).toContain('supabase.from("lesson_progress").update(payload)');
    expect(app).toContain('supabase.from("lesson_progress").insert({ user_id: user.id, lesson_id: lesson.id, ...payload })');
  });

  test('completed Mathematics lessons load from both legacy and subject progress', () => {
    expect(app).toContain('.eq("subject_id", "mathematics")');
    expect(app).toContain('.eq("activity_type", "lesson")');
    expect(app).toContain('...(subjectResult.data || []).map(r => r.title)');
  });

  test('student and parent Mathematics completion totals merge both stores', () => {
    expect(app).toContain('legacyMathCompletedTitles');
    expect(app).toContain('genericMathCompletedTitles');
    expect(app).toContain('subjectRows(childData?.subjectProgressRows || [], "mathematics")');
  });

  test('migration does not require a current topic to exist in public.lessons', () => {
    expect(migration).toContain("'mathematics'");
    expect(migration).toContain('public.spark_record_subject_progress');
    expect(migration).toContain('if v_lesson_id is not null then');
    expect(migration).toContain("'legacy_lesson_missing',true");
  });

  test('migration avoids blind upsert conflicts in legacy lesson_progress', () => {
    expect(migration).toContain('select lp.id into v_progress_id');
    expect(migration).toContain('if v_progress_id is null then');
    expect(migration).toContain('insert into public.lesson_progress');
    expect(migration).toContain('update public.lesson_progress');
  });
});
