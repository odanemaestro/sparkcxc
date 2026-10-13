import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import ChemistryPaper1Exam from "./ChemistryPaper1Exam";

describe("CSEC Chemistry Paper 1 exam runner",()=>{
  beforeEach(()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:true,headers:{get:()=> "application/json"},json:async()=>({
      questions:[{id:"TEST-01",n:1,stem:"Which ion has a charge of +2?",
        options:{A:"Na⁺",B:"Mg²⁺",C:"Cl⁻",D:"O²⁻"},
        answer:"B",explanation:"Magnesium loses two electrons."}]
    })});
  });
  afterEach(()=>jest.restoreAllMocks());
  test("loads imported bank and scores selected multiple-choice answer",async()=>{
    window.confirm=jest.fn(()=>true);
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    expect(await screen.findByText("Which ion has a charge of +2?")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/B\. Mg²⁺/));
    fireEvent.click(screen.getByText("Submit paper"));
    expect(await screen.findByText(/Practice review: 1\/1/)).toBeInTheDocument();
  });
  test("saves signed-in Chemistry Paper 1 scores for parent reports and recommendations",async()=>{
    window.confirm=jest.fn(()=>true);
    const supabase={rpc:jest.fn().mockResolvedValue({data:{},error:null})};
    render(<ChemistryPaper1Exam supabase={supabase} userId="chemistry-student" onBack={()=>{}}/>);
    await screen.findByText("Which ion has a charge of +2?");
    fireEvent.click(screen.getByLabelText(/B\. Mg²⁺/));
    fireEvent.click(screen.getByText("Submit paper"));
    await waitFor(()=>expect(supabase.rpc).toHaveBeenCalledWith(
      "spark_record_subject_progress",
      expect.objectContaining({
        p_subject_id:"chemistry",
        p_activity_type:"practice",
        p_score:1,p_max_score:1,p_percent:100,
        p_metadata:expect.objectContaining({
          paper:"01",complete_historical_paper:false,provisional_key:true
        })
      })
    ));
    expect(supabase.rpc.mock.calls.filter(([name])=>name==="spark_record_subject_progress")).toHaveLength(1);
  });

  test("reports a missing bank rather than silently inventing questions",async()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:false});
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await waitFor(()=>expect(screen.getByRole("alert")).toHaveTextContent(/not yet been imported/));
  });
});
