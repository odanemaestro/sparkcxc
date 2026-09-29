import fs from "fs";
import path from "path";

const root = path.join(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");

const files = {
  foundation: "supabase/migrations/20260929130000_social_studies_foundation.sql",
  a1: "supabase/migrations/20260929131000_social_studies_a1_lessons.sql",
  a2: "supabase/migrations/20260929132000_social_studies_a2_lessons.sql",
  b1: "supabase/migrations/20260929133000_social_studies_b1_lessons.sql",
  b2: "supabase/migrations/20260929134000_social_studies_b2_lessons.sql",
  toolkit: "supabase/migrations/20260929135000_social_studies_sba_exam_toolkit.sql",
};

function objectiveCodes(sql) {
  const codes = new Set();
  const matcher = /"objectives":\[(.*?)\]/g;
  let match;
  while ((match = matcher.exec(sql))) {
    const values = match[1].match(/"([^"]+)"/g)?.map(value => value.slice(1, -1)) || [];
    if (values.length && values.every(value => /^\d+(?:[a-z])?$/.test(value))) {
      values.forEach(value => codes.add(value));
    }
  }
  return codes;
}

function expectObjectiveCoverage(sql, expected) {
  const codes = objectiveCodes(sql);
  expected.forEach(code => expect(codes.has(code)).toBe(true));
}

describe("CSEC Social Studies V1 course integrity", () => {
  test("uses the current CXC Social Studies syllabus and stays draft until QA approval", () => {
    const sql = read(files.foundation);
    expect(sql).toContain("'social-studies'");
    expect(sql).toContain("CXC 14/G/SYLL 22");
    expect(sql).toContain('"examFrom":"May/June 2025"');
    expect(sql).toContain("'draft'");
    expect(sql).toContain('"flashcards":true');
    expect(sql).toContain('"sba":true');
  });

  test("preserves all four current official syllabus parts", () => {
    const sql = read(files.foundation);
    [
      "a1-individual-family",
      "a2-society-governance",
      "b1-development-resources",
      "b2-regional-development",
    ].forEach(sectionId => expect(sql).toContain(sectionId));

    expect(sql).not.toContain("C1 - Communication");
    expect(sql).not.toContain("C2 - Consumer Affairs");
    expect(sql).not.toContain("C3 - Tourism");
  });

  test("covers every coded objective in A(i) Individual and the Family", () => {
    expectObjectiveCoverage(read(files.a1), [
      "1","2","3a","3b","4","5a","5b","6","7","8",
      "9a","9b","9c","9d","10","11","12","13",
    ]);
  });

  test("covers every coded objective in A(ii) Society and Governance", () => {
    expectObjectiveCoverage(read(files.a2), [
      "14","15","16","17a","17b","17c","18","19","20a","20b",
      "21","22","23","24","25a","25b","25c","25d","25e",
      "26","27","28","29","30",
    ]);
  });

  test("covers every coded objective in B(i) Development and Use of Resources", () => {
    expectObjectiveCoverage(read(files.b1), [
      "1","2a","2b","3a","3b","4a","4b","4c","4d","5","6a","6b",
      "7","8","9","10","11","12a","12b","13","14","15","16","17","18","19",
    ]);
  });

  test("covers every coded objective in B(ii) Regional Development", () => {
    expectObjectiveCoverage(read(files.b2), [
      "20","21","22","23","24a","24b","24c","25","26","27","28","29","30","31","32",
    ]);
  });

  test("publishes a substantial explicit flashcard bank rather than relying on generated filler", () => {
    const lessonSql = [files.a1,files.a2,files.b1,files.b2,files.toolkit]
      .map(file => read(file))
      .join("\n");
    const cardCount = (lessonSql.match(/"front":/g) || []).length;
    expect(cardCount).toBe(201);
    expect(read(files.toolkit)).toContain('"flashcards":201');
  });

  test("provides an interactive activity across every lesson/toolkit topic", () => {
    const lessonSql = [files.a1,files.a2,files.b1,files.b2,files.toolkit]
      .map(file => read(file))
      .join("\n");
    const interactiveCount = (lessonSql.match(/"type":"social-studies"/g) || []).length;
    expect(interactiveCount).toBe(36);
    expect(read(files.toolkit)).toContain('"interactiveActivities":36');
  });

  test("includes the current CXC SBA workflow and exam support", () => {
    const sql = read(files.toolkit);
    [
      "1,000 words",
      "no more than two variables",
      "Questionnaire",
      "interview schedule",
      "observation checklist",
      "documentary search",
      "at least three different appropriate forms",
      "three findings",
      "two recommendations",
      "implementation strategy",
    ].forEach(term => expect(sql.toLowerCase()).toContain(term.toLowerCase()));
  });

  test("renders online visuals with visible source and licence context", () => {
    const study = read("src/subjects/GenericSubjectStudyView.jsx");
    const css = read("src/subjects/genericSubjectStudy.css");
    const b1 = read(files.b1);
    const b2 = read(files.b2);

    expect(study).toContain("spark-generic-sourced-visual");
    expect(study).toContain("visual.license");
    expect(study).toContain("View source");
    expect(css).toContain(".spark-generic-sourced-visual");
    expect(b1).toContain("https://upload.wikimedia.org/wikipedia/commons/7/71/BlankMap-Caribbean.svg");
    expect(b2).toContain('"license":"Public domain"');
    expect(b2).toContain('"creator":"NuclearVacuum"');
  });

  test("Social Studies interactive engine supports multiple activity types and responsive styling", () => {
    const explorer = read("src/subjects/components/SocialStudiesExplorer.jsx");
    const css = read("src/subjects/components/socialStudiesExplorer.css");

    ["choice","classify","calculator","evidence"].forEach(mode => expect(explorer).toContain(mode));
    expect(explorer).toContain("SocialStudiesExplorer");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("political practice uses fictional or neutral framing rather than party endorsements", () => {
    const a2 = read(files.a2);
    expect(a2).toContain("fictional");
    expect(a2).not.toMatch(/vote for\s+[A-Z][A-Za-z]/i);
    expect(a2).not.toMatch(/best political party/i);
  });
});


test("Social Studies interactive progress uses SPARK's supported practice activity type", () => {
  const study = read("src/subjects/GenericSubjectStudyView.jsx");
  const backend = read("supabase/migrations/20260921000500_subject_progress_diagram_activity.sql");
  const lessonSql = [files.a1,files.a2,files.b1,files.b2,files.toolkit]
    .map(file => read(file))
    .join("\n");

  expect(backend).toContain("'practice'");
  expect(study).toContain('activityType:"practice"');
  expect(study).toContain('activityType:"diagram"');
  expect(study).toContain('isInteractivePractice ? "interactive" : "diagram"');
  expect(lessonSql).not.toContain("'interactive','");
  expect(lessonSql).toContain("'practice','");
});
