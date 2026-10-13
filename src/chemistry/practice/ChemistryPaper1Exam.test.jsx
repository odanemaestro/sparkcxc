import React from "react";
import {render,screen,fireEvent,waitFor} from "@testing-library/react";
import ChemistryPaper1Exam from "./ChemistryPaper1Exam";

describe("CSEC Chemistry Paper 1 exam runner",()=>{
  beforeEach(()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:true,json:async()=>({
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
  test("reports a missing bank rather than silently inventing questions",async()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:false});
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await waitFor(()=>expect(screen.getByRole("alert")).toHaveTextContent(/not yet been imported/));
  });
});
