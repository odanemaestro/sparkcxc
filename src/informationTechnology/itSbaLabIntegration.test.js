import fs from "fs";
import path from "path";
describe("IT SBA workspace launch",()=>{
  test("each IT SBA component links to a real SPARK practical lab",()=>{
    const source=fs.readFileSync(path.join(__dirname,"practice/InformationTechnologySbaCentre.jsx"),"utf8");
    for (const [component,lab] of Object.entries({
      database:"database",spreadsheet:"spreadsheet",word:"word-processing",
      web:"web-design",programming:"programming"
    })) expect(source).toContain(component+':"'+lab+'"');
    expect(source).toContain("#/study/information-technology/labs/");
    expect(source).toContain("Open {meta.title} lab");
    expect(source).toContain("ForwardArrowIcon");
  });
});
