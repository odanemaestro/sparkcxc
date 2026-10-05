import React,{useState} from "react";
import fs from "fs";
import path from "path";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceGraphEditor from "../integratedScience/practice/ScienceGraphEditor";
import rubrics from "../integratedScience/practice/scienceGraphRubrics.json";
import {gradeIntegratedSciencePaper2Item} from "../integratedScience/practice/integratedSciencePaper2Grader";
import {graphAxis,graphPath} from "../integratedScience/practice/scienceGraphModel";
const questions=[1,2,3].flatMap(m=>JSON.parse(fs.readFileSync(path.join(process.cwd(),`public/integrated-science/bank/is_module${m}.json`))).paper02);
function fixture(key){
  const [id,p,i]=key.split(":"),q=questions.find(q=>q.id===id),item=q.parts[p].items[i],r=rubrics[key];
  const all=r.series.flatMap(s=>s.points),ys=all.map(p=>p.y),xs=all.map(p=>p.x);
  const bounds=values=>{const min=Math.min(...values),max=Math.max(...values);return {min,max,step:(max-min)/10};};
  const graph={version:1,kind:r.kind,connection:r.connection,barWidth:.6,
    x:r.kind==="bar"?{}:bounds(xs),y:bounds(r.kind==="bar"?[0,...ys]:ys),
    series:r.series.map(s=>({name:s.name,points:s.points.map(p=>`${p.x},${p.y}`).join("\n")}))};
  const responses={[`${key}:graph`]:JSON.stringify(graph),[`${key}:xLabel`]:item.response.x,[`${key}:yLabel`]:item.response.y};
  return {graph,responses,item,grade:(change={})=>gradeIntegratedSciencePaper2Item(q,+p,+i,item,{...responses,...change})};
}
test.each(Object.keys(rubrics))("all authored graph criteria are reachable online: %s",key=>{
  const {grade,item}=fixture(key),result=grade();
  expect(result.score).toBe(item.marks);
  expect(result.unassessedMarks).toBe(0);
  expect(result.criteria.reduce((s,c)=>s+c.maxMarks,0)).toBe(item.marks);
});
test("series names bind values to the right experiment",()=>{
  const key="IS-M1-P2-11:0:0",f=fixture(key);
  const [a,b]=f.graph.series;f.graph.series=[{...a,points:b.points},{...b,points:a.points}];
  expect(f.grade({[`${key}:graph`]:JSON.stringify(f.graph)}).criteria.filter(c=>c.id.includes(":plot-")).reduce((s,c)=>s+c.marks,0)).toBeLessThan(3);
});
test("poor scale and wrong construction do not earn construction marks",()=>{
  const key="IS-M1-P2-01:1:0",f=fixture(key);
  f.graph.y={min:0,max:1000,step:100};f.graph.connection="none";
  const result=f.grade({[`${key}:graph`]:JSON.stringify(f.graph)});
  expect(result.score).toBe(3);
});
test("axis validation bounds rendering work and rejects empty/invalid values",()=>{
  for(const axis of [{min:"",max:10,step:1},{min:0,max:10,step:0},{min:0,max:10,step:.000001},{min:10,max:0,step:1}])expect(graphAxis(axis)).toBeNull();
});
test("editor persists deliberate scale and series choices",()=>{
  const changed=jest.fn();render(<ScienceGraphEditor base="q" responses={{}} onChange={changed}/>);
  fireEvent.change(screen.getByLabelText("Graph type"),{target:{value:"bar"}});
  expect(JSON.parse(changed.mock.calls[0][1]).kind).toBe("bar");
  expect(screen.getByRole("img",{name:"Student graph plot"})).toBeInTheDocument();
});
test("best-fit line and smooth curve are distinct constructions",()=>{
  const points=[{x:0,y:0},{x:1,y:2},{x:2,y:3}];
  expect(graphPath(points,"smooth")).toContain("C");
  expect(graphPath(points,"best-fit")).toContain("L");
  expect(graphPath(points,"none")).toBe("");
});
test("direct plotting changes the submitted points and undo removes that point",()=>{
  const initial={version:1,kind:"line",connection:"none",barWidth:.6,x:{min:0,max:10,step:1},y:{min:0,max:10,step:1},series:[{name:"Trial",points:""}]};
  let stored;
  function Harness(){const [responses,setResponses]=useState({"q:graph":JSON.stringify(initial)});stored=responses;return <ScienceGraphEditor base="q" responses={responses} onChange={(key,value)=>setResponses(current=>({...current,[key]:value}))}/>;}
  render(<Harness/>);
  const grid=screen.getByRole("img",{name:"Student graph plot"});
  grid.getBoundingClientRect=()=>({left:0,top:0,width:600,height:335});
  fireEvent.click(grid,{clientX:150,clientY:218});
  expect(JSON.parse(stored["q:graph"]).series[0].points).toBe("2,2");
  fireEvent.click(screen.getByRole("button",{name:"Undo point"}));
  expect(JSON.parse(stored["q:graph"]).series[0].points).toBe("");
});
