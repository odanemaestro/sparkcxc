const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Information Technology routing and responsive integration", () => {
  const routing = read("../routing/sparkRoutingV270.js");
  const subject = read("components/InformationTechnologySubjectView.jsx");
  const labs = read("labs/InformationTechnologyPracticalLabs.jsx");
  const practice = read("practice/InformationTechnologyPracticeHub.jsx");
  const labCss = read("labs/informationTechnologyLabs.css");
  const studyCss = read("components/informationTechnology.css");
  const practiceCss = read("practice/informationTechnologyPractice.css");
  const dashboard = read("../components/learning/SubjectDashboardOverview.jsx");

  test("IT Study has refresh-safe section, topic and labs routes", () => {
    expect(routing).toContain("useInformationTechnologyStudyRoute");
    expect(routing).toContain('const IT_STUDY_BASE = "/study/information-technology"');
    expect(routing).toContain('/^\\/study\\/information-technology\\/section\\/([^/]+)\\/topic\\/([^/]+)$/i');
    expect(routing).toContain('/^\\/study\\/information-technology\\/section\\/([^/]+)$/i');
    expect(routing).toContain('${IT_STUDY_BASE}/section/${encodeURIComponent(String(next.sectionId))}');
    expect(routing).toContain('${IT_STUDY_BASE}/section/${encodeURIComponent(String(safeSection))}/topic/${encodeURIComponent(String(next.topicId))}');
    expect(routing).toContain('${IT_STUDY_BASE}/labs');
    expect(subject).toContain("useInformationTechnologyStudyRoute(course.sections, course.topics)");
  });

  test("every IT practical lab has a direct route", () => {
    expect(routing).toContain("useInformationTechnologyLabRoute");
    expect(routing).toContain('/^\\/study\\/information-technology\\/labs\\/([^/]+)$/i');
    expect(routing).toContain('${IT_STUDY_BASE}/labs/${encodeURIComponent(safe)}');
    expect(labs).toContain("useInformationTechnologyLabRoute(labIds)");
  });

  test("IT Paper 01 and Paper 02 routes survive refresh and browser navigation", () => {
    expect(routing).toContain("useInformationTechnologyPracticeRoute");
    expect(routing).toContain('${IT_PRACTICE_BASE}/paper-1');
    expect(routing).toContain('${IT_PRACTICE_BASE}/paper-2');
    expect(practice).toContain("useInformationTechnologyPracticeRoute(true)");
  });

  test("dashboard uses the compact IT continue label", () => {
    expect(dashboard).toContain('subject.id === "information-technology" ? "Continue IT"');
  });

  test("IT labs include dedicated tablet, iPad and mobile hardening", () => {
    expect(labCss).toContain("SPARK IT PRACTICAL LABS RESPONSIVE V3");
    expect(labCss).toContain("@media(min-width:768px) and (max-width:1180px)");
    expect(labCss).toContain("@media(max-width:820px)");
    expect(labCss).toContain("font-size:16px!important");
    expect(labCss).toContain("safe-area-inset-bottom");
  });

  test("IT Study and Practice include tablet and phone input/touch protection", () => {
    expect(studyCss).toContain("SPARK IT STUDY TABLET IPAD V3");
    expect(practiceCss).toContain("SPARK IT PRACTICE TABLET IPAD V3");
    expect(studyCss).toContain("font-size:16px!important");
    expect(practiceCss).toContain("font-size:16px!important");
  });
});
