import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const read = file => fs.readFileSync(path.join(ROOT, file), "utf8");
const PAGES = [
  "physics/mechanics/components/PhysicsMechanicsSection.jsx",
  "physics/thermal/components/PhysicsThermalSection.jsx",
  "physics/waves/components/PhysicsWavesSection.jsx",
  "physics/electricity/components/PhysicsElectricitySection.jsx",
  "physics/atomic/components/PhysicsAtomicSection.jsx",
  "physics/course/components/PhysicsCourseLessons.jsx",
  "informationTechnology/components/InformationTechnologySubjectView.jsx"
];

describe("Windows-compatible Physics and IT visual imports", () => {
  test("no case-insensitive renderer/data module name collision", () => {
    const dir = path.join(ROOT, "components/study");
    const names = fs.readdirSync(dir).filter(name => /\.(js|jsx|mjs)$/.test(name));
    const stems = names.map(name => name.replace(/\.(js|jsx|mjs)$/, "").toLowerCase());
    expect(new Set(stems).size).toBe(stems.length);
    expect(names).toContain("CuratedStudyMedia.jsx");
    expect(names).toContain("courseVisualReferenceCatalog.js");
    expect(names).not.toContain("curatedStudyMedia.js");
  });

  test("all screens import the JSX component explicitly, never its data catalogue", () => {
    for (const file of PAGES) {
      const s = read(file);
      expect(s).toContain("CuratedStudyMedia.jsx");
      expect(s).not.toMatch(/from ['"][^'"]*\/CuratedStudyMedia['"]/);
    }
  });

  test("the named jump export comes from the renderer and the catalogue is separate", () => {
    const component = read("components/study/CuratedStudyMedia.jsx");
    const catalogue = read("components/study/courseVisualReferenceCatalog.js");
    expect(component).toContain("export function CuratedStudyJump(");
    expect(component).toContain('from "./courseVisualReferenceCatalog.js"');
    expect(catalogue).toContain("export const PHYSICS_REFERENCE_MEDIA");
    expect(catalogue).toContain("export const IT_REFERENCE_MEDIA");
    expect(catalogue).not.toContain("CuratedStudyJump");
  });
});
