import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import fs from "fs";
import path from "path";
import ReviewedScienceDiagram from "./ReviewedScienceDiagram";
import VegetativePropagationExplorer from "./VegetativePropagationExplorer";

const original="/integrated-science/diagrams/0517.svg";
const night="/integrated-science/diagrams/0517-dark.svg";

describe("Approved science diagram nighttime presentation",()=>{
 test("uses both faithful onion SVG references, including in the enlargement dialog",()=>{
  render(<ReviewedScienceDiagram diagramId="0517" darkImagePath={night}>
   <svg role="img" aria-label="Original onion bulb vector"><text>Onion bulb</text></svg>
  </ReviewedScienceDiagram>);
  const open=screen.getByRole("button",{name:/Enlarge: Onion bulb/});
  const images=within(open).getAllByRole("img");
  expect(images).toHaveLength(2);
  expect(images[0]).toHaveAttribute("src",expect.stringContaining(original));
  expect(images[1]).toHaveAttribute("src",expect.stringContaining(night));
  expect(images[0]).toHaveClass("spark-science-art-default");
  expect(images[1]).toHaveClass("spark-science-art-dark");
  expect(open).toHaveClass("spark-science-image-themed");
  const dialog=screen.getByRole("dialog",{hidden:true});
  expect(dialog).toHaveClass("spark-science-image-themed");
  expect(dialog.querySelectorAll("img")).toHaveLength(2);
 });
 test("preserves source SVG geometry and all original plant colours in the night reference",()=>{
  const svg=p=>fs.readFileSync(path.resolve(__dirname,"../../../public",p.replace(/^\//,"")),"utf8");
  const orig=svg(original),dark=svg(night);
  const prefix='<rect width="1080" height="600" fill="#11273c"/><rect x="24" y="82" width="498" height="342" rx="15" fill="#e7efed"/><rect x="558" y="82" width="498" height="342" rx="15" fill="#e7efed"/>';
  expect(dark).toContain(prefix);
  expect((orig.match(/fill="#183b48"/g)||[])).toHaveLength(7);
  expect(dark.replace(prefix,"").replaceAll('fill="#edf8f7"','fill="#183b48"')).toBe(orig);
 });
 test("propagation methods remain accessible selectable controls",()=>{
  render(<VegetativePropagationExplorer/>);
  const natural=screen.getByRole("button",{name:"Natural methods"});
  const artificial=screen.getByRole("button",{name:"Artificial methods"});
  expect(natural).toHaveAttribute("aria-pressed","true");
  expect(artificial).toHaveAttribute("aria-pressed","false");
  fireEvent.click(artificial);
  expect(artificial).toHaveAttribute("aria-pressed","true");
  expect(natural).toHaveAttribute("aria-pressed","false");
  const cutting=screen.getByRole("button",{name:/Stem cutting/});
  expect(cutting).toHaveAttribute("aria-pressed","true");
  fireEvent.click(screen.getByRole("button",{name:/Grafting/}));
  expect(screen.getByRole("button",{name:/Grafting/})).toHaveAttribute("aria-pressed","true");
 });
});
