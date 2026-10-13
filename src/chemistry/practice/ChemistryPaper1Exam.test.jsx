import React from "react";
import {render,screen,fireEvent,waitFor,within} from "@testing-library/react";
import ChemistryPaper1Exam from "./ChemistryPaper1Exam";

const question={id:"TEST-01",n:1,stem:"Which ion has a charge of +2?",
  options:{A:"Na⁺",B:"Mg²⁺",C:"Cl⁻",D:"O²⁻"},
  answer:"B",explanation:"Magnesium loses two electrons."};

describe("CSEC Chemistry Paper 1 simulated examination",()=>{
  beforeEach(()=>{
    window.localStorage.clear();
    global.fetch=jest.fn().mockResolvedValue({ok:true,headers:{get:()=> "application/json"},
      json:async()=>({questions:[question]})});
  });
  afterEach(()=>jest.restoreAllMocks());

  async function startExam(){
    expect(await screen.findByRole("button",{name:"Start examination"})).toBeInTheDocument();
    expect(screen.queryByText(question.stem)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
    expect(await screen.findByText(question.stem)).toBeInTheDocument();
  }

  test("shows a full instruction sheet before opening the questions",async()=>{
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    const heading=await screen.findByText(/READ THE FOLLOWING INSTRUCTIONS CAREFULLY/);
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/four options labelled A, B, C and D/)).toBeInTheDocument();
    expect(screen.queryByText(question.stem)).not.toBeInTheDocument();
    await startExam();
    expect(screen.queryByText("Choose a paper")).not.toBeInTheDocument();
    expect(screen.getByText(/Time remaining/)).toBeInTheDocument();
  });

  test("starts timer only after Start examination",async()=>{
    const interval=jest.spyOn(global,"setInterval");
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await screen.findByRole("button",{name:"Start examination"});
    interval.mockClear();
    expect(interval).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
    expect(interval).toHaveBeenCalled();
    interval.mockRestore();
  });

  test("marks a complete selected multiple-choice answer after submit",async()=>{
    window.confirm=jest.fn(()=>true);
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await startExam();
    fireEvent.click(screen.getByLabelText(/B\. Mg²⁺/));
    fireEvent.click(screen.getByText("Submit paper"));
    expect(await screen.findByText(/Practice review: 1\/1/)).toBeInTheDocument();
    expect(screen.getAllByText("B. Mg²⁺")).toHaveLength(2);
    expect(screen.getByText("Magnesium loses two electrons.")).toBeInTheDocument();
  });

  test("restores an in-progress exam without restarting the timer",async()=>{
    const first=render(<ChemistryPaper1Exam userId="returning-student" onBack={()=>{}}/>);
    await startExam();
    fireEvent.click(screen.getByLabelText(/B\. Mg²⁺/));
    await waitFor(()=>expect(JSON.parse(window.localStorage.getItem("spark:chemistry:paper1:returning-student:practice-01")).answers["TEST-01"]).toBe("B"));
    const stored=JSON.parse(window.localStorage.getItem("spark:chemistry:paper1:returning-student:practice-01"));
    first.unmount();
    render(<ChemistryPaper1Exam userId="returning-student" onBack={()=>{}}/>);
    expect(await screen.findByText(question.stem)).toBeInTheDocument();
    expect(screen.getByLabelText(/B\. Mg²⁺/)).toBeChecked();
    expect(JSON.parse(window.localStorage.getItem("spark:chemistry:paper1:returning-student:practice-01")).endsAt).toBe(stored.endsAt);
  });

  test("saves Chemistry Paper 1 scores for reports after submission",async()=>{
    window.confirm=jest.fn(()=>true);
    const supabase={rpc:jest.fn().mockResolvedValue({data:{},error:null})};
    render(<ChemistryPaper1Exam supabase={supabase} userId="chemistry-student" onBack={()=>{}}/>);
    await startExam();
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

  test("keeps historical partial papers labelled as revision on the instructions screen",async()=>{
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await screen.findByRole("button",{name:"Start examination"});
    fireEvent.click(screen.getByRole("button",{name:"Past papers"}));
    await screen.findByRole("button",{name:"Start examination"});
    fireEvent.change(screen.getByRole("combobox",{name:"Choose Chemistry Paper 1 set"}),{target:{value:"2010-MJ"}});
    expect(await screen.findByText(/timed revision session, not a complete 60-question examination/)).toBeInTheDocument();
  });

  test("reports an actionable install message when Vite serves HTML instead of JSON",async()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:true,headers:{get:()=> "text/html"},
      json:async()=>{throw new Error("Unexpected token <")}});
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await waitFor(()=>expect(screen.getByRole("alert")).toHaveTextContent(/import the reviewed question-bank ZIP/i));
    expect(screen.queryByRole("button",{name:"Start examination"})).not.toBeInTheDocument();
  });

  test("reports a missing bank rather than silently inventing questions",async()=>{
    global.fetch=jest.fn().mockResolvedValue({ok:false});
    render(<ChemistryPaper1Exam onBack={()=>{}}/>);
    await waitFor(()=>expect(screen.getByRole("alert")).toHaveTextContent(/not installed yet/));
  });
});
