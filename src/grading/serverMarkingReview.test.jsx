import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import ServerMarkingReview from "./ServerMarkingReview";
const previous=process.env.REACT_APP_SERVER_MARKING;
afterEach(()=>{if(previous===undefined)delete process.env.REACT_APP_SERVER_MARKING;else process.env.REACT_APP_SERVER_MARKING=previous;});
function database(result=null){
  const query={select:jest.fn(),eq:jest.fn(),order:jest.fn(),limit:jest.fn(),maybeSingle:jest.fn().mockResolvedValue({data:result,error:null})};
  for(const method of ["select","eq","order","limit"])query[method].mockReturnValue(query);
  return {from:jest.fn().mockReturnValue(query),rpc:jest.fn().mockResolvedValue({data:null,error:new Error("Unavailable")})};
}
test("disabled deployment makes no server marking requests",()=>{
  process.env.REACT_APP_SERVER_MARKING="false";const db=database();
  render(<ServerMarkingReview supabase={db} attemptId="a"/>);
  expect(db.from).not.toHaveBeenCalled();expect(db.rpc).not.toHaveBeenCalled();
});
test("an enqueue failure remains visible after the request finishes",async()=>{
  process.env.REACT_APP_SERVER_MARKING="true";const db=database();
  render(<ServerMarkingReview supabase={db} attemptId="a"/>);
  await waitFor(()=>expect(db.from).toHaveBeenCalled());
  fireEvent.click(screen.getByRole("button",{name:"Check written answers"}));
  expect(await screen.findByText(/A deeper check is not available right now/)).toBeInTheDocument();
  expect(db.rpc).toHaveBeenCalledTimes(1);
});
test("an uncertain result shows a range and never renders feedback as HTML",async()=>{
  process.env.REACT_APP_SERVER_MARKING="true";
  const db=database({status:"completed",result:{score:null,minScore:7,maxScore:9,maxMarks:10,uncertain:true,criteria:[{id:"q",marks:null,maxMarks:3,feedback:"<script>unsafe()</script>",evidence:[]}]}});
  render(<ServerMarkingReview supabase={db} attemptId="a"/>);
  expect(await screen.findByText("7–9 / 10")).toBeInTheDocument();
  expect(document.querySelector("script")).toBeNull();
});
