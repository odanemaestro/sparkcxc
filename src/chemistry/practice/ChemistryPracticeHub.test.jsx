import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import ChemistryPracticeHub from "./ChemistryPracticeHub";

jest.mock("./ChemistryPaper1Exam",()=>({
  __esModule:true,
  CHEMISTRY_PAPER1_SOURCES:["2009-MJ","2010-MJ"],
  default:({sourceId,onBack})=>{
    const React=require("react");
    return React.createElement("main",{"data-testid":"paper1-selected"},
      React.createElement("p",null,`Paper 1 selection: ${sourceId}`),
      React.createElement("button",{onClick:onBack},"Back to library"));
  },
}));
jest.mock("./ChemistryPaper2Exam",()=>({
  __esModule:true,
  default:({paperIndex,historicalPaper,onBack})=>{
    const React=require("react");
    return React.createElement("main",{"data-testid":"paper2-selected"},
      React.createElement("p",null,historicalPaper
        ?`Historical Paper 2: ${historicalPaper.id}`
        :`Practice Paper 2: ${paperIndex}`),
      React.createElement("button",{onClick:onBack},"Back to library"));
  },
}));
jest.mock("../data/chemistryPaper2Bank",()=>({
  CHEMISTRY_PAPER2_PRACTICE_SETS:Array.from({length:6},(_,i)=>({id:`practice-${i+1}`})),
  CHEMISTRY_HISTORICAL_PAPERS:[{
    id:"CHEM-P2-2008-MJ",year:2008,session:"May/June",questionCount:7,
    topics:["rates","periodicity"]
  }],
}));
jest.mock("../data/chemistryHistoricalCoverage",()=>({
  CHEMISTRY_HISTORICAL_COVERAGE:{papers:[{sourceId:"CHEM-P2-2008-MJ",draftedQuestions:7,draftMarks:120}]}
}));
jest.mock("../data/chemistryHistoricalExam",()=>({
  buildChemistryHistoricalExam:(sourceId,choice)=>({
    id:`${sourceId}-OPTION-${choice}`,sourceId,complete:true,
    questions:Array.from({length:6},(_,i)=>({id:`q${i+1}`})),
    totalMarks:100
  })
}));
jest.mock("../data/chemistryHistoricalPaperSelection",()=>({
  CHEMISTRY_HISTORICAL_OPTION_RULES:{
    "CHEM-P2-2008-MJ":{alternatives:[6,7]}
  }
}));

describe("Chemistry practice home and matching paper libraries",()=>{
  test("home shows one entry per paper, without duplicate Paper 2 set tiles",()=>{
    render(<ChemistryPracticeHub onBack={()=>{}}/>);
    expect(screen.getByRole("button",{name:/Chemistry Paper 1/})).toBeInTheDocument();
    expect(screen.getByRole("button",{name:/Chemistry Paper 2/})).toBeInTheDocument();
    expect(screen.queryByText("Six complete practice papers")).not.toBeInTheDocument();
  });

  test("Paper 1 practice sets are all available in one library",()=>{
    render(<ChemistryPracticeHub onBack={()=>{}}/>);
    fireEvent.click(screen.getByRole("button",{name:/Chemistry Paper 1/}));
    expect(screen.getByRole("button",{name:"Practice sets"})).toHaveAttribute("aria-pressed","true");
    expect(screen.getByRole("button",{name:"Past papers"})).toBeInTheDocument();
    const options=screen.getAllByRole("button",{name:/Select paper/});
    expect(options).toHaveLength(4);
    fireEvent.click(options[2]);
    expect(screen.getByText("Paper 1 selection: practice-03")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Back to library"}));
    expect(screen.getAllByRole("button",{name:/Select paper/})).toHaveLength(4);
  });

  test("Paper 2 uses the same tabs and six selectable practice sets",()=>{
    render(<ChemistryPracticeHub onBack={()=>{}}/>);
    fireEvent.click(screen.getByRole("button",{name:/Chemistry Paper 2/}));
    expect(screen.getByRole("button",{name:"Practice sets"})).toHaveAttribute("aria-pressed","true");
    const options=screen.getAllByRole("button",{name:/Select paper/});
    expect(options).toHaveLength(6);
    fireEvent.click(options[5]);
    expect(screen.getByText("Practice Paper 2: 5")).toBeInTheDocument();
  });

  test("Paper 1 past papers use the same paper selection as Paper 2",()=>{
    render(<ChemistryPracticeHub onBack={()=>{}}/>);
    fireEvent.click(screen.getByRole("button",{name:/Chemistry Paper 1/}));
    fireEvent.click(screen.getByRole("button",{name:"Past papers"}));
    expect(screen.getAllByRole("button",{name:/Select paper/})).toHaveLength(2);
    fireEvent.click(screen.getAllByRole("button",{name:/Select paper/})[1]);
    expect(screen.getByText("Paper 1 selection: 2010-MJ")).toBeInTheDocument();
  });

  test("Paper 2 past papers retain an explicit Section C choice",()=>{
    render(<ChemistryPracticeHub onBack={()=>{}}/>);
    fireEvent.click(screen.getByRole("button",{name:/Chemistry Paper 2/}));
    fireEvent.click(screen.getByRole("button",{name:"Past papers"}));
    expect(screen.queryByText("View paper details")).not.toBeInTheDocument();
    const option=screen.getByLabelText("Section C option");
    fireEvent.change(option,{target:{value:"7"}});
    fireEvent.click(screen.getByRole("button",{name:/Select paper/}));
    expect(screen.getByText("Historical Paper 2: CHEM-P2-2008-MJ-OPTION-7")).toBeInTheDocument();
  });
});
