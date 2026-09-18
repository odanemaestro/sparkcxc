const fs = require("fs");
const path = require("path");

describe("SPARK subject route code splitting", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const practice = fs.readFileSync(path.join(__dirname, "practice", "PracticeHub.jsx"), "utf8");

  test("App lazy-loads heavy subject route modules", () => {
    expect(app).toContain('lazy(() => import("./practice/PracticeHub"))');
    expect(app).toContain('lazy(() => import("./physics/course/components/PhysicsSubjectView"))');
    expect(app).toContain('lazy(() => import("./informationTechnology/components/InformationTechnologySubjectView"))');
    expect(app).not.toContain('import PracticeHub from "./practice/PracticeHub"');
    expect(app).not.toContain('import PhysicsSubjectView from "./physics/course/components/PhysicsSubjectView"');
    expect(app).not.toContain('import InformationTechnologySubjectView from "./informationTechnology/components/InformationTechnologySubjectView"');
  });

  test("PracticeHub lazy-loads subject and examination modules", () => {
    expect(practice).toContain('lazy(() => import("../adaptive/AdaptivePractice"))');
    expect(practice).toContain('lazy(() => import("./Paper1Exam"))');
    expect(practice).toContain('lazy(() => import("./Paper2Exam"))');
    expect(practice).toContain('lazy(() => import("./Syllabus2027Hub"))');
    expect(practice).toContain('lazy(() => import("../physics/course/components/PhysicsPracticeHub"))');
    expect(practice).toContain('import("../informationTechnology/practice/InformationTechnologyPracticeHub")');

    expect(practice).not.toContain('import AdaptivePractice from "../adaptive/AdaptivePractice"');
    expect(practice).not.toContain('import Paper1Exam from "./Paper1Exam"');
    expect(practice).not.toContain('import Paper2Exam from "./Paper2Exam"');
    expect(practice).not.toContain('import PhysicsPracticeHub from "../physics/course/components/PhysicsPracticeHub"');
    expect(practice).not.toContain('import InformationTechnologyPracticeHub from "../informationTechnology/practice/InformationTechnologyPracticeHub"');
  });

  test("lazy subject routes use Suspense fallbacks", () => {
    expect(app).toContain("<Suspense fallback=");
    expect(practice).toContain("PracticeLazyBoundary");
    expect(practice).toContain("<Suspense fallback=");
  });
});
