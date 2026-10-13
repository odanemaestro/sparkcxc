import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import ChemistryPaper2Exam from "./ChemistryPaper2Exam";
import {buildChemistryHistoricalExam} from "../data/chemistryHistoricalExam";

const mockQuestion=(n)=>({
  id:`CHEM-P2-2005-MJ-Q${n}`,
  sourceId:"CHEM-P2-2005-MJ",
  originalQuestionNumber:n,
  kind:"structured",
  title:`Historical question ${n}`,
  totalMarks:1,
  parts:[{label:"(a)",items:[{
    label:"(i)",prompt:`Explain reaction ${n}.`,marks:1,
    response:{type:"lines",lines:3},
    markScheme:{points:[`Correct reaction ${n}.`],guidance:"Raw authoring note only."},
    explanation:`Chemical explanation ${n}.`
  }]}]
});

describe("Chemistry historical Paper 2 simulation",()=>{
  beforeEach(()=>window.localStorage.clear());

  test("builds original five-question historical paper without adding a sixth",()=>{
    const questions=Array.from({length:5},(_,i)=>mockQuestion(i+1));
    const paper=buildChemistryHistoricalExam("CHEM-P2-2005-MJ",null,questions);
    expect(paper).toMatchObject({isHistorical:true,complete:true,expectedCount:5,totalMarks:5});
    expect(paper.questions.map(q=>q.originalQuestionNumber)).toEqual([1,2,3,4,5]);
  });

  test("enforces the single Section C choice for 2008 and keeps question numbers",()=>{
    const questions=Array.from({length:7},(_,i)=>({
      ...mockQuestion(i+1),id:`CHEM-P2-2008-MJ-Q${i+1}`,sourceId:"CHEM-P2-2008-MJ"
    }));
    const paper=buildChemistryHistoricalExam("CHEM-P2-2008-MJ",7,questions);
    expect(paper.complete).toBe(true);
    expect(paper.originalQuestionNumbers).toEqual([1,2,3,4,5,7]);
    expect(paper.questions).toHaveLength(6);
    expect(buildChemistryHistoricalExam("CHEM-P2-2008-MJ",8,questions)).toBeNull();
  });

  test("labels incomplete historical papers as partial rather than full examinations",()=>{
    const paper=buildChemistryHistoricalExam("CHEM-P2-2005-MJ",null,[mockQuestion(1)]);
    expect(paper).toMatchObject({complete:false,totalMarks:1});
    expect(paper.questions).toHaveLength(1);
  });

  test("runs a timed attempt and shows the student's answer beside correct answers",()=>{
    const historicalPaper={
      id:"TEST-CHEM-HISTORICAL",isHistorical:true,verified:false,
      complete:true,title:"Historical Paper 02",totalMarks:2,durationMinutes:150,
      questions:[mockQuestion(1),mockQuestion(3)]
    };
    render(<ChemistryPaper2Exam historicalPaper={historicalPaper} onBack={()=>{}}/>);
    expect(screen.getByText(/This reconstruction and its answer keys are awaiting independent source checks/)).toBeInTheDocument();
    expect(screen.getByText(/2 selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
    expect(screen.getByRole("button",{name:/Q3/})).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox",{name:"(i) response"}),{target:{value:"My reaction answer"}});
    fireEvent.click(screen.getByRole("button",{name:/Submit Paper 02/i}));
    fireEvent.click(screen.getByRole("button",{name:"Submit now"}));
    const review=screen.getByRole("region",{name:"Answer review"});
    expect(within(review).getByText("Your answer")).toBeInTheDocument();
    expect(within(review).getByText("My reaction answer")).toBeInTheDocument();
    expect(within(review).getByText("Correct answer")).toBeInTheDocument();
    expect(within(review).getAllByText("Correct reaction 1.").length).toBeGreaterThan(0);
    expect(within(review).getByText("Chemical explanation 1.")).toBeInTheDocument();
    expect(screen.queryByText(/Guidance:/i)).not.toBeInTheDocument();
  });
});
