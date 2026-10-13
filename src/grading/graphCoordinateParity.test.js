import fs from "fs";
import path from "path";
const source=filename=>fs.readFileSync(path.join(__dirname,"..",filename),"utf8");

describe("CSEC graph coordinate feedback parity",()=>{
  test("Mathematics shows the snapped coordinate crosshair in exam and review mode",()=>{
    const math=source("practice/Paper2ResponseInput.jsx");
    expect(math).toContain("paper2-graph-crosshair");
    expect(math).toContain("Coordinate: (");
    expect(math).toContain("onPointerDown={readOnly ? event => setHover(pointFromEvent(event))");
    expect(math).toContain("onPointerLeave={() => setHover(null)}");
  });

  test("legacy Integrated Science graph keeps its coordinate reader after submitting",()=>{
    const science=source("integratedScience/practice/IntegratedSciencePaper2Exam.jsx");
    expect(science).toContain("function GraphPlotter");
    expect(science).toContain("onPointerMove={event=>setHover(pointFromEvent(event))}");
    expect(science).toContain('aria-label="Plotted coordinates"');
    expect(science).toContain("if(disabled||next.existing)return");
    expect(science).toContain("is-p2-graph-crosshair");
  });

  test("Chemistry and Integrated Science use the same exact-coordinate graph editor",()=>{
    const shared=source("integratedScience/practice/ScienceGraphEditor.jsx");
    const chemistry=source("chemistry/practice/ChemistryPaper2Exam.jsx");
    expect(shared).toContain("onPointerMove={preview}");
    expect(shared).toContain('aria-label="Plotted coordinates"');
    expect(shared).toContain('disabled||next.existing');
    expect(chemistry).toContain("ScienceGraphEditor");
    expect(chemistry).toContain("ChemistryModelGraph");
    expect(chemistry).toContain("onPointerEnter={()=>setHoverIndex(i)}");
  });
});
