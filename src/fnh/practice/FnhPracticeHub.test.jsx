import React from "react";
import {render,screen,fireEvent,within} from "@testing-library/react";
import FnhPracticeHub from "./FnhPracticeHub";

describe("FNH student examination navigation",()=>{
  beforeEach(()=>{
    localStorage.clear();
    Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
  });
  test("the Paper 1 flow selects the second of two different 60-question examinations",()=>{
    render(<FnhPracticeHub userId="fnh-test-student" onBack={jest.fn()}/>);
    fireEvent.click(screen.getByRole("button",{name:/Paper 1/i}));
    expect(screen.getByText("Paper 1: Multiple choice")).toBeInTheDocument();
    expect(screen.getByText("Practice set 1")).toBeInTheDocument();
    expect(screen.getByText("Practice set 2")).toBeInTheDocument();
    const second=screen.getByText("Practice set 2").closest("section");
    fireEvent.click(within(second).getByRole("button",{name:/Select practice paper/i}));
    expect(screen.getByText("Paper 1 examination instructions")).toBeInTheDocument();
    expect(screen.getByText("ORIGINAL PRACTICE SET 2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
    expect(screen.getByText("Question 1 of 60",{exact:true})).toBeInTheDocument();
    expect(screen.getByText(/A person says, 'My diet consists only/)).toBeInTheDocument();
  });
  test("the Paper 2 flow selects the second 96-mark exam and presents the instructions",()=>{
    render(<FnhPracticeHub userId="fnh-test-student" onBack={jest.fn()}/>);
    fireEvent.click(screen.getByRole("button",{name:/Paper 2/i}));
    expect(screen.getByText("Paper 2: Structured questions")).toBeInTheDocument();
    const second=screen.getByText("Practice set 2").closest("section");
    fireEvent.click(within(second).getByRole("button",{name:/Select practice paper/i}));
    expect(screen.getByText("Paper 2 examination instructions")).toBeInTheDocument();
    expect(screen.getByText("ORIGINAL PRACTICE SET 2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Start examination"}));
    expect(screen.getByText(/Question 1: Nutrition through the life cycle/)).toBeInTheDocument();
    expect(screen.getByText(/A health centre in St Elizabeth/)).toBeInTheDocument();
  });
  test("historical archive enables the source-checked 2005, 2006 and 2008 Paper 2 sources",()=>{
    render(<FnhPracticeHub userId="fnh-test-student" onBack={jest.fn()}/>);
    fireEvent.click(screen.getByRole("button",{name:/Paper 2/i}));
    fireEvent.click(screen.getByRole("button",{name:"Past papers"}));
    expect(screen.getByText("Historical Paper 2 sources")).toBeInTheDocument();
    expect(screen.getAllByText("Question and marking checks pending").length).toBeGreaterThan(10);
    expect(screen.getAllByRole("button",{name:/Start examination/i})).toHaveLength(3);
    expect(screen.getAllByText("Original questions transcribed and checked")).toBeInTheDocument();
  });
});
