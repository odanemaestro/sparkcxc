import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlotationExplorer from "./FlotationExplorer";
import HumanSkeletonExplorer from "./HumanSkeletonExplorer";
import IntegratedScienceLabelDiagram from "./IntegratedScienceLabelDiagram";
import ReviewedScienceDiagram from "./ReviewedScienceDiagram";

test("the fixed buoyancy reference stays separate from live calculations and rejects impossible readings", () => {
  render(<FlotationExplorer />);
  fireEvent.click(screen.getByRole("button", { name: "Archimedes" }));
  const image=screen.getByRole("img");
  expect(image.getAttribute("src")).toContain("0166.svg");
  fireEvent.change(screen.getByLabelText("Weight in air, N"), {target:{value:"8.7"}});
  fireEvent.change(screen.getByLabelText("Apparent weight in water, N"), {target:{value:"2.2"}});
  expect(screen.getByRole("status")).toHaveTextContent("6.5 N");
  expect(screen.getByRole("img")).toHaveAttribute("src",image.getAttribute("src"));
  fireEvent.change(screen.getByLabelText("Apparent weight in water, N"), {target:{value:"10"}});
  expect(screen.getByRole("status")).toHaveTextContent("no greater than");
  fireEvent.change(screen.getByLabelText("Weight in air, N"), {target:{value:"0"}});
  fireEvent.change(screen.getByLabelText("Apparent weight in water, N"), {target:{value:"0"}});
  expect(screen.getByRole("status")).toHaveTextContent("0.0 N");
});

test("bone details can still be selected using accessible controls beside the sourced image", () => {
  render(<HumanSkeletonExplorer />);
  fireEvent.click(screen.getByRole("button",{name:/^Femur:/}));
  expect(screen.getByRole("heading",{name:"Femur"})).toBeInTheDocument();
});

test("a replacement reference retains label placement, retry, scoring and completion", () => {
  const onComplete=jest.fn();
  const activity={id:"kidney-test",title:"Kidney practice",template:"kidney-longitudinal",labels:[
    {id:"artery",text:"Renal artery",hint:"Carries blood into the kidney"},
    {id:"ureter",text:"Ureter",hint:"Carries urine toward the bladder"},
  ],targets:[{id:"a",labelId:"artery"},{id:"b",labelId:"ureter"}]};
  render(<IntegratedScienceLabelDiagram activity={activity} onComplete={onComplete}/>);
  expect(screen.getByRole("img").getAttribute("src")).toContain("0268.svg");
  const bank=screen.getByRole("complementary",{name:"Labels"});
  const targets=screen.getByLabelText("Diagram targets");
  fireEvent.click(within(bank).getByRole("button",{name:"Ureter"}));
  fireEvent.click(within(targets).getByRole("button",{name:/Carries blood into/}));
  fireEvent.click(screen.getByRole("button",{name:"Check answers"}));
  expect(screen.getByRole("status")).toHaveTextContent("0/2");
  fireEvent.click(screen.getByRole("button",{name:"Reset"}));
  for(const [label,clue] of [["Renal artery",/Carries blood into/],["Ureter",/Carries urine toward/]]){
    fireEvent.click(within(bank).getByRole("button",{name:label}));
    fireEvent.click(within(targets).getByRole("button",{name:clue}));
  }
  fireEvent.click(screen.getByRole("button",{name:"Check answers"}));
  fireEvent.click(screen.getByRole("button",{name:"Check answers"}));
  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({score:2,total:2,percent:100}));
});

test("published raster images load through the same reference component", () => {
  render(<ReviewedScienceDiagram diagramId="0072" />);
  expect(screen.getByRole("img")).toHaveAttribute("src",expect.stringContaining("0072.jpg"));
  expect(screen.getByRole("button",{name:/Enlarge/})).toBeEnabled();
});


test("eye and endocrine label labs use the published anatomy assets instead of the old drawn templates", () => {
  const eyeActivity={
    id:"eye-test",
    title:"Label the mammalian eye",
    template:"mammalian-eye",
    labels:[
      {id:"cornea",text:"Cornea"},
      {id:"lens",text:"Lens"},
      {id:"retina",text:"Retina"},
    ],
    targets:[
      {id:"eye-cornea",labelId:"cornea",boxX:20,boxY:100,anchorX:1,anchorY:1,side:"left"},
      {id:"eye-lens",labelId:"lens",boxX:20,boxY:190,anchorX:1,anchorY:1,side:"left"},
      {id:"eye-retina",labelId:"retina",boxX:790,boxY:100,anchorX:1,anchorY:1,side:"right"},
    ],
  };
  const eye=render(<IntegratedScienceLabelDiagram activity={eyeActivity}/>);
  expect(eye.container.querySelector("image.spark-published-interactive-art"))
    .toHaveAttribute("href",expect.stringContaining("0152.svg"));
  eye.unmount();

  const endocrineActivity={
    id:"endocrine-test",
    title:"Label the major endocrine glands",
    template:"endocrine-system",
    labels:[
      {id:"pituitary",text:"Pituitary gland"},
      {id:"thyroid",text:"Thyroid gland"},
      {id:"adrenal",text:"Adrenal glands"},
    ],
    targets:[
      {id:"endo-pituitary",labelId:"pituitary",boxX:20,boxY:100,anchorX:1,anchorY:1,side:"left"},
      {id:"endo-thyroid",labelId:"thyroid",boxX:20,boxY:190,anchorX:1,anchorY:1,side:"left"},
      {id:"endo-adrenal",labelId:"adrenal",boxX:790,boxY:100,anchorX:1,anchorY:1,side:"right"},
    ],
  };
  const endocrine=render(<IntegratedScienceLabelDiagram activity={endocrineActivity}/>);
  expect(endocrine.container.querySelector("image.spark-published-interactive-art"))
    .toHaveAttribute("href",expect.stringContaining("endocrine-system-interactive.svg"));
  const endpointCircles=[...endocrine.container.querySelectorAll(".spark-label-target-group > circle")];
  expect(endpointCircles.map(node => [node.getAttribute("cx"),node.getAttribute("cy")]))
    .toEqual(expect.arrayContaining([["513","146"],["499","270"],["379","373"]]));
});


test("endocrine lab renders one visible drop box per label in the six-target layout", () => {
  const activity={
    id:"endocrine-layout-test",
    title:"Label the major endocrine glands",
    template:"endocrine-system",
    labels:[
      {id:"pituitary",text:"Pituitary gland"},
      {id:"thyroid",text:"Thyroid gland"},
      {id:"adrenal",text:"Adrenal glands"},
      {id:"pancreas",text:"Pancreas"},
      {id:"ovaries",text:"Ovaries"},
      {id:"testes",text:"Testes"},
    ],
    targets:[
      {id:"p",labelId:"pituitary",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"left"},
      {id:"t",labelId:"thyroid",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"left"},
      {id:"a",labelId:"adrenal",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"left"},
      {id:"pa",labelId:"pancreas",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"right"},
      {id:"o",labelId:"ovaries",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"right"},
      {id:"te",labelId:"testes",boxX:1,boxY:1,anchorX:1,anchorY:1,side:"right"},
    ],
  };
  const view=render(<IntegratedScienceLabelDiagram activity={activity}/>);
  expect(view.container.querySelectorAll(".spark-label-target")).toHaveLength(6);
  const boxes=[...view.container.querySelectorAll(".spark-label-target-fo")];
  expect(boxes.map(node => [node.getAttribute("x"),node.getAttribute("y")]))
    .toEqual(expect.arrayContaining([
      ["20","72"],["20","168"],["20","264"],
      ["790","168"],["790","264"],["790","360"],
    ]));
});
