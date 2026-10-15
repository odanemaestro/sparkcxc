import fs from "fs";
import path from "path";

const ROOT=path.resolve(__dirname,"../..");
const source=file=>fs.readFileSync(path.join(ROOT,file),"utf8");

describe("Physics and IT reference integration keeps existing practical tools",()=>{
  const physics=[
    "physics/mechanics/components/PhysicsMechanicsSection.jsx",
    "physics/thermal/components/PhysicsThermalSection.jsx",
    "physics/waves/components/PhysicsWavesSection.jsx",
    "physics/electricity/components/PhysicsElectricitySection.jsx",
    "physics/atomic/components/PhysicsAtomicSection.jsx"
  ];
  test.each(physics)("%s uses optional references in the original study panel",file=>{
    const content=source(file);
    expect(content).toContain('import CuratedStudyMedia from');
    expect(content).toContain('<CuratedStudyMedia subject="physics" topicId={topic.id}/>');
    expect(content).toContain('<PhysicsStudyToolkit topicId={topic.id}/>');
    expect(content.indexOf('<CuratedStudyMedia subject="physics" topicId={topic.id}/>'))
      .toBeLessThan(content.indexOf('<PhysicsStudyToolkit topicId={topic.id}/>'));
  });
  test("the IT lesson keeps its interactive visual simulator and adds reference media in See it",()=>{
    const content=source("informationTechnology/components/InformationTechnologySubjectView.jsx");
    expect(content).toContain('<InformationTechnologyVisuals topicId={topic.id}/>');
    expect(content).toContain('<CuratedStudyMedia subject="information-technology" topicId={topic.id}/>');
    expect(content.indexOf('<InformationTechnologyVisuals topicId={topic.id}/>'))
      .toBeLessThan(content.indexOf('<CuratedStudyMedia subject="information-technology" topicId={topic.id}/>'));
    expect(content).toContain("<InformationTechnologyTools topicId={topic.id}/>");
  });
  test("media is separate from assessment and source data is not embedded in question banks",()=>{
    const registry=source("components/study/curatedStudyMedia.js");
    expect(registry).not.toMatch(/score|markCorrect|assessmentGrade/);
    expect(registry).toContain("commons.wikimedia.org");
    const css=source("components/study/curatedStudyMedia.css");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain("background:#fff");
    expect(css).toContain("focus-visible");
  });
});
