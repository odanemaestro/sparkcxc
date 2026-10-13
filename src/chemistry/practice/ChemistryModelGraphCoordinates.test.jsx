import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import {ChemistryModelGraph} from "./ChemistryPaper2Exam";

const response={
  type:"graph",x:"Time (s)",y:"Temperature (°C)",
  points:[{x:172,y:31.8},{x:140,y:33.9},{x:119,y:37.7},{x:90,y:42.5},{x:70,y:46.9},{x:47,y:55.2},{x:40,y:59.3}]
};

describe("Chemistry Paper 2 model-answer graph coordinates",()=>{
  test("hover reveals the exact coordinate of a plotted model point",()=>{
    render(<ChemistryModelGraph response={response}/>);
    fireEvent.pointerEnter(screen.getByRole("button",{name:"Inspect point (70, 46.9)"}));
    expect(screen.getByText(/Selected: \(70, 46\.9\)/)).toBeInTheDocument();
  });
  test("tapping and keyboard focus expose the same coordinate",()=>{
    render(<ChemistryModelGraph response={response}/>);
    const point=screen.getByRole("button",{name:"Inspect point (47, 55.2)"});
    fireEvent.click(point);
    expect(screen.getByText(/Selected: \(47, 55\.2\)/)).toBeInTheDocument();
    fireEvent.focus(screen.getByRole("button",{name:"Inspect point (40, 59.3)"}));
    expect(screen.getByText(/Selected: \(40, 59\.3\)/)).toBeInTheDocument();
  });
});
