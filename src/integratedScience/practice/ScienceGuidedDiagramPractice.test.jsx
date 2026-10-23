import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceGuidedDiagramPractice,{GuidedStomaFigure,GuidedFlowerFigure,ScienceGuidedMagnificationPractice} from "./ScienceGuidedDiagramPractice";

test("original diagrams have unlabelled A-D and A-F callouts",()=>{
 const {rerender}=render(<GuidedStomaFigure/>);
 expect(screen.getByRole("img",{name:/unlabelled stoma/i})).toBeTruthy();
 expect(screen.getAllByText(/^[A-D]$/)).toHaveLength(4);
 rerender(<GuidedFlowerFigure/>);
 expect(screen.getByRole("img",{name:/unlabelled longitudinal section/i})).toBeTruthy();
 expect(screen.getAllByText(/^[A-F]$/)).toHaveLength(6);
});
test("guided labels are empty and remain separate from authoritative answers",()=>{
 const onChange=jest.fn();
 render(<ScienceGuidedDiagramPractice base="IS-M1-P2-21:1:0" questionId="IS-M1-P2-21"
   partIndex={1} itemIndex={0} onChange={onChange} responses={{}} disabled={false}/>);
 expect(screen.getByLabelText("Part A").value).toBe("");
 fireEvent.change(screen.getByLabelText("Part A"),{target:{value:"guard cell"}});
 expect(onChange).toHaveBeenCalledWith("IS-M1-P2-21:1:0:guidedLabels",JSON.stringify({A:"guard cell"}));
 fireEvent.click(screen.getByText("Check practice labels"));
 expect(screen.getByRole("status").textContent).toContain("0/4");
 expect(screen.getByText(/not submitted as verified drawing marks/i)).toBeTruthy();
});
test("guided magnification accepts written arithmetic but does not certify drawing",()=>{
 const onChange=jest.fn();
 render(<ScienceGuidedMagnificationPractice base="IS-M1-P2-27:0:1" responses={{}}
  disabled={false} onChange={onChange}/>);
 fireEvent.change(screen.getByPlaceholderText("Show the division"),{target:{value:"120 ÷ 60"}});
 expect(onChange).toHaveBeenCalledWith("IS-M1-P2-27:0:1:guidedMagnification",JSON.stringify({working:"120 ÷ 60"}));
 expect(screen.getByText(/does not validate the dimensions/i)).toBeTruthy();
});