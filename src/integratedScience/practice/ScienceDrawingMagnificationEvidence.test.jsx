import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceDrawingMagnificationEvidence,{magnificationEvidenceStatus,readMagnificationEvidence,magnificationArithmeticEvidence} from "./ScienceDrawingMagnificationEvidence";

test("measurement inputs start empty and never insert model answers",()=>{
 const base="IS-M1-P2-27:0:1",values=readMagnificationEvidence(base,{});
 expect(Object.values(values).every(x=>x==="")).toBe(true);
 expect(magnificationEvidenceStatus(values).complete).toBe(false);
 const onChange=jest.fn();
 render(<ScienceDrawingMagnificationEvidence base={base} responses={{}} onChange={onChange} disabled={false}/>);
 expect(screen.getAllByPlaceholderText("Measured value")).toHaveLength(2);
 expect(screen.queryByDisplayValue("120")).toBeNull();
 expect(screen.queryByDisplayValue("60")).toBeNull();
});
test("student measurements are stored under source-specific keys",()=>{
 const base="IS-M1-P2-27:0:1",onChange=jest.fn();
 render(<ScienceDrawingMagnificationEvidence base={base} responses={{}} onChange={onChange} disabled={false}/>);
 fireEvent.change(screen.getAllByPlaceholderText("Measured value")[0],{target:{value:"105"}});
 expect(onChange).toHaveBeenCalledWith(base+":drawingHeightMm","105");
});
test("status validates only presence of measurements, never awards a mark",()=>{
 expect(magnificationEvidenceStatus({drawingHeightMm:"120",actualHeightMm:"60",magnificationWorking:"120 ÷ 60",magnificationAnswer:"×2"}).complete).toBe(true);
 expect(magnificationEvidenceStatus({drawingHeightMm:"0",actualHeightMm:"60",magnificationWorking:"0",magnificationAnswer:"×0"}).complete).toBe(false);
 expect(magnificationEvidenceStatus({drawingHeightMm:"a",actualHeightMm:"60"}).complete).toBe(false);
});

test("magnification calculation uses the student's values, not the example",()=>{
 const evidence=magnificationArithmeticEvidence({drawingHeightMm:"105",actualHeightMm:"35",
  magnificationWorking:"105 ÷ 35",magnificationAnswer:"×3"});
 expect(evidence.consistent).toBe(true);
 expect(evidence.calculatedMagnification).toBe(3);
 expect(evidence.reviewRequired).toBe(true);
});
test("incorrect student magnification remains review-required, not awarded",()=>{
 const evidence=magnificationArithmeticEvidence({drawingHeightMm:"105",actualHeightMm:"35",
  magnificationWorking:"105 ÷ 35",magnificationAnswer:"×2"});
 expect(evidence.consistent).toBe(false);
 expect(evidence.reviewRequired).toBe(true);
});

test("magnification rejects unrelated, reversed or contradictory working",()=>{
 const base={drawingHeightMm:"105",actualHeightMm:"35",magnificationAnswer:"×3"};
 for(const magnificationWorking of ["1 ÷ 2", "35 ÷ 105", "105 / 35 or 1 / 2"]){
  const result=magnificationArithmeticEvidence({...base,magnificationWorking});
  expect(result.consistent).toBe(false);
  expect(result.reviewRequired).toBe(true);
 }
 expect(magnificationArithmeticEvidence({...base,magnificationWorking:"105 divided by 35"}).consistent).toBe(true);
});
