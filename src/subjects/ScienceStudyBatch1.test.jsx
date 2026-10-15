import React from "react";
import fs from "fs";
import path from "path";
import {fireEvent,render,screen,within} from "@testing-library/react";
import ChemistryInteractiveLab from "../chemistry/components/ChemistryInteractiveLab";
import TransportProcessExplorer from "./components/TransportProcessExplorer";
import PlantGrowthExplorer from "./components/PlantGrowthExplorer";

describe("Small batch 1: Chemistry and Integrated Science study polish",()=>{
 test("Chemistry lab keeps original experiment controls and completion gate",()=>{
  const onComplete=jest.fn();
  render(<ChemistryInteractiveLab model={{id:"states",type:"chemistry-particle-states"}} onComplete={onComplete}/>);
  expect(document.querySelector(".chem-lab")).toBeInTheDocument();
  const save=screen.getByRole("button",{name:"Record activity"});
  expect(save).toBeDisabled();
  fireEvent.change(screen.getByRole("slider"),{target:{value:"85"}});
  expect(screen.getByRole("img",{name:"gas particle model"})).toBeInTheDocument();
  fireEvent.click(save);
  expect(onComplete).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("button",{name:"Reset lab"}));
  expect(screen.getByRole("slider")).toHaveValue("35");
  expect(screen.getByRole("button",{name:"Record activity"})).toBeDisabled();
 });
 test("Integrated Science transport tabs preserve experiment and readable comparisons",()=>{
  render(<TransportProcessExplorer/>);
  const diffusion=screen.getByRole("tab",{name:"Diffusion"});
  const osmosis=screen.getByRole("tab",{name:"Osmosis"});
  const active=screen.getByRole("tab",{name:"Active transport"});
  expect(diffusion).toHaveAttribute("aria-selected","true");
  fireEvent.click(osmosis);
  expect(osmosis).toHaveAttribute("aria-selected","true");
  expect(screen.getByText(/Selectively permeable membrane is essential/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Run model"}));
  expect(screen.getByRole("button",{name:"Reset model"})).toBeInTheDocument();
  fireEvent.click(active);
  expect(active).toHaveAttribute("aria-selected","true");
  expect(screen.getByText("Required")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Run model"})).toBeInTheDocument();
 });
 test("Plant growth selects a labelled graph without changing scientific data",()=>{
  render(<PlantGrowthExplorer/>);
  const conditions=screen.getByRole("button",{name:"Germination conditions"});
  const mass=screen.getByRole("button",{name:"Dry mass"});
  const height=screen.getByRole("button",{name:"Height against time"});
  expect(conditions).toHaveAttribute("aria-pressed","true");
  fireEvent.click(height);
  expect(height).toHaveAttribute("aria-pressed","true");
  expect(screen.getByText("Growth curve")).toBeInTheDocument();
  fireEvent.click(mass);
  expect(mass).toHaveAttribute("aria-pressed","true");
  expect(conditions).toHaveAttribute("aria-pressed","false");
  expect(within(document.querySelector(".spark-plant-growth-grid aside")).getByText("Dry mass during germination")).toBeInTheDocument();
 });
 test("Theme design stays inside the reader and preserves scientific image colours",()=>{
  const css=fs.readFileSync(path.resolve(__dirname,"scienceStudyPolishBatch1.css"),"utf8");
  expect(css).toContain(".spark-editorial-study .chem-lab");
  expect(css).toContain(".spark-editorial-study .spark-transport-stage");
  expect(css).toContain(".spark-editorial-study .spark-plant-growth-stage");
  expect(css).toContain("--fnh-ui-paper");
  expect(css).toContain('prefers-reduced-motion:reduce');
  expect(css).toContain("background:#edf4f5");
  expect(css).not.toContain("filter:invert");
  expect(css).toContain("transition:none!important");
 });
});
