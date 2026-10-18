import {getPhysicsGraphWorkingSpec} from "../../../grading/physicsGraphWorkingSpecsV2";
/** @jest-environment jsdom */
import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import PhysicsGraphWorking from "./PhysicsGraphWorking";
import {validatePhysicsGradientTriangle,validatePhysicsPressureReading} from "../../../grading/physicsGraphWorkingEvidenceV2";

const graphResponse={graph:{line:[{x:0,y:0},{x:10,y:240}]}};
const q="phy-p2-1-q1";
test("only the calibrated Physics source question exposes graph-working controls",()=>{
 const {container,rerender}=render(<PhysicsGraphWorking questionId="other" partId="c" graphResponse={graphResponse}/>);
 expect(container.textContent).toBe("");
 rerender(<PhysicsGraphWorking questionId={q} partId="e" graphResponse={graphResponse}/>);
 expect(container.textContent).toBe("");
});
test("missing plotted line explains how to start rather than inventing evidence",()=>{
 render(<PhysicsGraphWorking questionId={q} partId="c"/>);
 expect(screen.getByText(/Draw your best-fit line in Question 1\(b\)/i)).toBeTruthy();
 expect(screen.queryByRole("button",{name:/record first point/i})).toBeNull();
});
test("student records two distinct gradient selections which persist in response",()=>{
 const save=jest.fn();
 const props={questionId:q,partId:"c",graphResponse,onChange:save};
 const {rerender}=render(<PhysicsGraphWorking {...props} response={{}}/>);
 fireEvent.click(screen.getByRole("button",{name:/record first point/i}));
 const first=save.mock.calls.at(-1)[0];
 expect(first.graphEvidence.points).toHaveLength(1);
 expect(first.graphEvidence.points[0]).toMatchObject({x:3,y:72});
 rerender(<PhysicsGraphWorking {...props} response={first}/>);
 fireEvent.change(screen.getByRole("slider"),{target:{value:"9.00"}});
 fireEvent.click(screen.getByRole("button",{name:/record second point/i}));
 const second=save.mock.calls.at(-1)[0];
 expect(second.graphEvidence.points).toHaveLength(2);
 expect(validatePhysicsGradientTriangle({graphResponse,response:second})).toBe(true);
 rerender(<PhysicsGraphWorking {...props} response={second}/>);
 expect(screen.getByText("Gradient triangle recorded.")).toBeTruthy();
});
test("undersized selection gives clear feedback and can be cleared",()=>{
 const save=jest.fn();
 const first={graphEvidence:{kind:"physics-gradient-triangle-v1",points:[{x:3,y:72},{x:4,y:96}]}};
 render(<PhysicsGraphWorking questionId={q} partId="c" graphResponse={graphResponse} response={first} onChange={save}/>);
 expect(screen.getByText(/Triangle is too short/i)).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Clear working"}));
 expect(save.mock.calls.at(-1)[0].graphEvidence).toBeNull();
});
test("pressure reading is selected from actual graph and saved independently",()=>{
 const save=jest.fn();
 const props={questionId:q,partId:"d",graphResponse,onChange:save};
 const {rerender}=render(<PhysicsGraphWorking {...props} response={{answer:"133 kPa"}}/>);
 fireEvent.click(screen.getByRole("button",{name:"Record graph reading"}));
 const result=save.mock.calls.at(-1)[0];
 expect(result.answer).toBe("133 kPa");
 expect(validatePhysicsPressureReading({graphResponse,response:result})).toBe(true);
 rerender(<PhysicsGraphWorking {...props} response={result}/>);
 expect(screen.getByText(/Graph-reading point recorded/i)).toBeTruthy();
});


describe("source-specific graph workspace axes and response persistence",()=>{
 const fixtures=[
  {bank:require("../data/spark-phy-p02-practice-2.json"),end:1,slope:4.01,first:0.1,second:0.75},
  {bank:require("../data/spark-phy-p02-practice-3.json"),end:0.6,slope:5.05,first:0.07,second:0.49},
  {bank:require("../data/spark-phy-p02-practice-4.json"),end:100,slope:0.01,first:10,second:75}
 ];
 test.each(fixtures)("captures its own paper's gradient triangle without using Paper 1 axes",fixture=>{
  const question=fixture.bank.questions[0];
  const graphPart=question.parts.find(p=>p.responseType==="graph");
  const gradientPart=question.parts.find(p=>p.id===getPhysicsGraphWorkingSpec(question.question_id)?.trianglePart);
  const graphResponse={graph:{line:[{x:0,y:0},{x:fixture.end,y:fixture.end*fixture.slope}]}};
  const save=jest.fn();
  const props={questionId:question.question_id,partId:gradientPart.id,graphPart,graphResponse,onChange:save};
  const {rerender}=render(<PhysicsGraphWorking {...props} response={{}}/>);
  expect(screen.getByText(graphPart.grid.xLabel)).toBeTruthy();
  expect(screen.getByText(graphPart.grid.yLabel)).toBeTruthy();
  expect(screen.queryByRole("button",{name:"Record graph reading"})).toBeNull();
  fireEvent.change(screen.getByRole("slider"),{target:{value:String(fixture.first)}});
  fireEvent.click(screen.getByRole("button",{name:"Record first point"}));
  const first=save.mock.calls.at(-1)[0];
  rerender(<PhysicsGraphWorking {...props} response={first}/>);
  fireEvent.change(screen.getByRole("slider"),{target:{value:String(fixture.second)}});
  fireEvent.click(screen.getByRole("button",{name:"Record second point"}));
  const second=save.mock.calls.at(-1)[0];
  expect(validatePhysicsGradientTriangle({questionId:question.question_id,
   graphResponse,response:second})).toBe(true);
  rerender(<PhysicsGraphWorking {...props} response={second}/>);
  expect(screen.getByText("Gradient triangle recorded.")).toBeTruthy();
 });
});
