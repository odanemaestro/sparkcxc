import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import ChemistryInteractiveLab from "./ChemistryInteractiveLab";

const lab=(type,onComplete=jest.fn())=>render(<ChemistryInteractiveLab model={{type:`chemistry-${type}`}} onComplete={onComplete}/>);
const button=name=>screen.getByRole("button",{name});

test("untouched exploration cannot complete; reset and activity changes clear completion",()=>{
  const complete=jest.fn();
  const view=lab("particle-states",complete);
  expect(button("Record activity")).toBeDisabled();
  fireEvent.change(screen.getByRole("slider"),{target:{value:"80"}});
  fireEvent.click(button("Record activity"));
  fireEvent.click(button("Activity recorded"));
  expect(complete).toHaveBeenCalledTimes(1);
  fireEvent.click(button("Reset lab"));
  expect(screen.getByRole("slider")).toHaveValue("35");
  expect(button("Record activity")).toBeDisabled();
  view.rerender(<ChemistryInteractiveLab model={{id:"other",type:"chemistry-particle-states"}} onComplete={complete}/>);
  expect(button("Record activity")).toBeDisabled();
});

test("mole calculator rejects zero, negative and empty values without fabricated results",()=>{
  lab("mole-calculator");
  const input=screen.getByRole("spinbutton",{name:/Molar mass/});
  for(const value of ["0","-5",""]){
    fireEvent.change(input,{target:{value}});
    expect(screen.getByRole("alert")).toHaveTextContent("greater than zero");
    expect(button("Record activity")).toBeDisabled();
  }
  fireEvent.change(input,{target:{value:"40"}});
  expect(screen.getByText("0.500 mol")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("spinbutton",{name:"Mass / g"}),{target:{value:"-1"}});
  expect(button("Record activity")).toBeDisabled();
});

test("titration stays colourless after overshoot and requires repeat endpoint titres",()=>{
  lab("titration");
  const slider=screen.getByRole("slider");
  fireEvent.change(slider,{target:{value:"24.55"}});
  expect(screen.getByRole("img")).toHaveAccessibleName("Pink alkali in flask");
  expect(screen.getByText(/Pink indicator: alkali remains/)).toBeInTheDocument();
  fireEvent.change(slider,{target:{value:"25.2"}});
  expect(screen.getByRole("img")).toHaveAccessibleName("Colourless solution in flask");
  fireEvent.click(button("Record titre and refill"));
  expect(screen.getByText("Rough run")).toBeInTheDocument();
  expect(button("Record activity")).toBeDisabled();
  for(let i=0;i<2;i++){
    fireEvent.change(slider,{target:{value:"24.55"}});
    fireEvent.click(button("Add one drop"));
    expect(slider).toHaveValue("24.6");
    fireEvent.click(button("Record titre and refill"));
  }
  expect(screen.getByText(/Concordant mean titre: 24.60/)).toBeInTheDocument();
  expect(button("Record activity")).toBeEnabled();
});

test("electrolysis requires power and clears observations when changing setup",()=>{
  lab("electrolysis");
  expect(button("Run for 30 seconds")).toBeDisabled();
  fireEvent.click(button("Switch power on"));
  fireEvent.click(button("Run for 30 seconds"));
  expect(screen.getByText(/30 s elapsed/)).toHaveTextContent("oxygen bubbles");
  fireEvent.change(screen.getByRole("combobox",{name:"Electrodes"}),{target:{value:"copper"}});
  expect(button("Run for 30 seconds")).toBeDisabled();
  fireEvent.click(button("Switch power on"));
  fireEvent.click(button("Run for 30 seconds"));
  expect(screen.getByText(/30 s elapsed/)).toHaveTextContent("copper anode dissolves");
  fireEvent.change(screen.getByRole("combobox",{name:"Electrolyte"}),{target:{value:"molten-PbBr2"}});
  expect(screen.getByRole("combobox",{name:"Electrodes"})).toHaveValue("inert");
  expect(button("Record activity")).toBeDisabled();
});

test("rate experiments snapshot conditions and do not change previous curves",()=>{
  lab("rate");
  fireEvent.click(button("Run experiment"));
  const curve=document.querySelector(".chem-run-0").getAttribute("points");
  fireEvent.change(screen.getByRole("slider",{name:/Temperature/}),{target:{value:"35"}});
  fireEvent.click(button("Run experiment"));
  expect(document.querySelector(".chem-run-0").getAttribute("points")).toBe(curve);
  expect(document.querySelector(".chem-run-1").getAttribute("points")).not.toBe(curve);
  expect(button("Record activity")).toBeEnabled();
  fireEvent.click(button("Clear comparisons"));
  expect(button("Record activity")).toBeDisabled();
});

test("calorimetry updates endothermic, exothermic and zero-change explanations",()=>{
  lab("calorimetry");
  fireEvent.change(screen.getByRole("spinbutton",{name:/Temperature change/}),{target:{value:"-8.4"}});
  expect(screen.getByText(/reaction absorbs heat/)).toHaveTextContent("endothermic");
  expect(screen.getByText("-1756 J")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("spinbutton",{name:/Temperature change/}),{target:{value:"0"}});
  expect(screen.getByText(/No temperature change is measured/)).toBeInTheDocument();
  fireEvent.change(screen.getByRole("spinbutton",{name:/Solution mass/}),{target:{value:"0"}});
  expect(screen.getByRole("alert")).toBeInTheDocument();
});

test("ion tests reveal the initial precipitate before the excess-reagent observation",()=>{
  lab("qualitative-analysis");
  fireEvent.change(screen.getByRole("combobox",{name:"Reagent"}),{target:{value:"nh3"}});
  expect(button("Add reagent in excess")).toBeDisabled();
  fireEvent.click(button("Add a few drops"));
  expect(screen.getByText("light blue precipitate")).toBeInTheDocument();
  fireEvent.click(button("Add reagent in excess"));
  expect(screen.getByText(/deep blue solution/)).toBeInTheDocument();
  expect(button("Record activity")).toBeEnabled();
  fireEvent.click(button("Fresh sample"));
  expect(button("Record activity")).toBeDisabled();
});

test("separation completion requires all five correct methods",()=>{
  lab("separation");
  for(const method of ["filtration","crystallisation","fractional distillation","separating funnel","paper chromatography"]){
    fireEvent.click(button(method));
    fireEvent.click(button("Check"));
    fireEvent.click(button("Next mixture"));
  }
  expect(button("Record activity")).toBeEnabled();
});

test("reactivity and redox require an experiment and electron transfer",()=>{
  const view=lab("reactivity");
  fireEvent.click(button("Place strip in solution"));
  expect(screen.getByText(/Zn\(s\) \+ Cu²⁺/)).toBeInTheDocument();
  fireEvent.change(screen.getByRole("combobox",{name:"Metal strip"}),{target:{value:"Cu"}});
  expect(button("Record activity")).toBeDisabled();
  view.unmount();
  lab("redox");
  fireEvent.click(button("Reduction"));
  fireEvent.click(button("Receive 2 electrons"));
  expect(screen.getByText("2 electrons received")).toBeInTheDocument();
});
