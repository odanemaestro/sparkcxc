import fs from "fs";
import path from "path";
import {CHEMISTRY_OBJECTIVE_TEXT,CHEMISTRY_TOPICS} from "./data/chemistryCourse";
import {CHEMISTRY_OBJECTIVE_GUIDE} from "./data/chemistryObjectiveGuide";

const read=relative=>fs.readFileSync(path.join(__dirname,relative),"utf8");
describe("Chemistry lab visual controls and complete syllabus mapping",()=>{
  test("separation feedback actions have dedicated styles distinct from choices",()=>{
    const lab=read("components/ChemistryInteractiveLab.jsx");
    const css=read("components/chemistryInteractiveLab.css");
    expect(lab).toContain('className="chem-lab-check-action"');
    expect(lab).toContain('className="chem-lab-next-action"');
    expect(css).toContain(".chem-lab .chem-lab-actions .chem-lab-check-action");
    expect(css).toContain(".chem-lab .chem-lab-actions .chem-lab-next-action");
    expect(css).toContain('html[data-theme="dark"]');
  });
  test("ionic attraction annotation stays separated from the bond and ions",()=>{
    const lab=read("components/ChemistryInteractiveLab.jsx");
    expect(lab).toContain('className="chem-bond-annotation"');
    expect(lab).toContain('<tspan x="180">electrostatic</tspan>');
    expect(lab).toContain('<tspan x="180" dy="13">attraction</tspan>');
    expect(lab).not.toContain('y="47" textAnchor="middle">electrostatic attraction');
  });
  test("all declared objectives have a single lesson home and a teaching explanation",()=>{
    const keys=Object.keys(CHEMISTRY_OBJECTIVE_TEXT);
    const mapped=CHEMISTRY_TOPICS.flatMap(topic=>topic.metadata.syllabus.objectives);
    expect(keys).toHaveLength(119);
    expect(mapped).toHaveLength(keys.length);
    expect(new Set(mapped).size).toBe(keys.length);
    expect(keys.every(key=>mapped.includes(key))).toBe(true);
    expect(keys.every(key=>typeof CHEMISTRY_OBJECTIVE_GUIDE[key]==="string"&&CHEMISTRY_OBJECTIVE_GUIDE[key].length>40)).toBe(true);
  });
});