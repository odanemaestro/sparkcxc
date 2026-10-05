import fs from "fs";
import path from "path";
import {
  compareIntegratedScienceGraphResponse,
  deriveIntegratedScienceGraphData,
  integratedScienceGraphBounds,
} from "./integratedScience/practice/integratedScienceGraphModel";
import { gradeIntegratedSciencePaper2 } from "./integratedScience/practice/integratedSciencePaper2Grader";

const readModule=number=>JSON.parse(fs.readFileSync(path.join(__dirname,"..","public","integrated-science","bank",`is_module${number}.json`),"utf8"));
const modules=[readModule(1),readModule(2),readModule(3)];
const question=id=>modules.flatMap(module=>module.paper02 || []).find(item=>item.id===id);
const graphItem=(id,partIndex=0,itemIndex=0)=>{
  const q=question(id);
  return {question:q,part:q.parts[partIndex],item:q.parts[partIndex].items[itemIndex],partIndex,itemIndex};
};

describe("Integrated Science functional graph audit V2",()=>{
  test("supports graph values above the old 0 to 10 range",()=>{
    const {part,item}=graphItem("IS-M1-P2-07");
    const model=deriveIntegratedScienceGraphData(item,part.table);
    const bounds=integratedScienceGraphBounds(model);
    expect(bounds.yMax).toBeGreaterThan(140);
    expect(model.series[0].points).toHaveLength(7);
  });

  test("supports negative graph values",()=>{
    const {part,item}=graphItem("IS-M3-P2-09");
    const model=deriveIntegratedScienceGraphData(item,part.table);
    const bounds=integratedScienceGraphBounds(model);
    expect(bounds.yMin).toBeLessThan(0);
    expect(model.series[0].points.some(point=>point.y===-10)).toBe(true);
  });

  test("builds categorical bar-chart data from the source table",()=>{
    const {part,item}=graphItem("IS-M1-P2-09");
    const model=deriveIntegratedScienceGraphData(item,part.table);
    expect(model.kind).toBe("bar");
    expect(model.categories).toEqual(["A","B","C","D"]);
    expect(model.series).toHaveLength(1);
    expect(model.series[0].points.map(point=>point.y)).toEqual([0,65,5,10]);
  });

  test("builds both series for a two-line graph",()=>{
    const {part,item}=graphItem("IS-M1-P2-11");
    const model=deriveIntegratedScienceGraphData(item,part.table);
    expect(model.series).toHaveLength(2);
    expect(model.series[0].points).toHaveLength(7);
    expect(model.series[1].points).toHaveLength(7);
  });

  test("orients mass against volume correctly when the source table is reversed",()=>{
    const {part,item}=graphItem("IS-M3-P2-07");
    const model=deriveIntegratedScienceGraphData(item,part.table);
    expect(model.series).toHaveLength(1);
    expect(model.series[0].points[0]).toEqual(expect.objectContaining({x:20,y:12}));
    expect(model.series[0].points.at(-1)).toEqual(expect.objectContaining({x:100,y:60}));
  });

  test("derives temperature-rise bar values",()=>{
    const {part,item}=graphItem("IS-M2-P2-09",0,1);
    const model=deriveIntegratedScienceGraphData(item,part.table);
    expect(model.series[0].points.map(point=>point.y)).toEqual([18,11,4,2]);
  });

  test("derives average-distance bar values from trials",()=>{
    const {part,item}=graphItem("IS-M3-P2-21",0,1);
    const model=deriveIntegratedScienceGraphData(item,part.table);
    expect(model.series[0].points.map(point=>point.y)).toEqual([40,26,122,150]);
  });

  test("grades a fully plotted line graph from actual graph response data",()=>{
    const {question:q,part,item,partIndex,itemIndex}=graphItem("IS-M1-P2-01",1,0);
    const model=deriveIntegratedScienceGraphData(item,part.table);
    const base=`${q.id}:${partIndex}:${itemIndex}`;
    const responses={
      [`${base}:xLabel`]:"Time/weeks",
      [`${base}:yLabel`]:"Height/cm",
      [`${base}:scale`]:"x: 1 square = 1 week; y: 1 square = 5 cm",
      [`${base}:points`]:model.series[0].points.map(point=>`${point.x}, ${point.y}`).join("\n"),
    };
    const comparison=compareIntegratedScienceGraphResponse(model,{
      xLabel:responses[`${base}:xLabel`],yLabel:responses[`${base}:yLabel`],
      scale:responses[`${base}:scale`],points:responses[`${base}:points`],
    });
    expect(comparison.matched).toBe(comparison.totalExpected);
    const result=gradeIntegratedSciencePaper2([q],responses);
    expect(result.questions[0].items.find(row=>row.partIndex===partIndex&&row.itemIndex===itemIndex).score).toBe(5);
  });

  test("topic Paper 2 uses automatic marking rather than a self-mark reveal",()=>{
    const renderer=fs.readFileSync(path.join(__dirname,"integratedScience","practice","IntegratedScienceQuestionRenderer.jsx"),"utf8");
    const hub=fs.readFileSync(path.join(__dirname,"integratedScience","practice","IntegratedSciencePracticeHub.jsx"),"utf8");
    expect(renderer).toContain("SPARK automatic marking");
    expect(renderer).not.toContain("Show mark scheme");
    expect(hub).toContain("gradeIntegratedSciencePaper2");
    expect(hub).toContain("Check answer");
  });
});
