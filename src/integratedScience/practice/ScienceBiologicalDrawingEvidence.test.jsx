import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceBiologicalDrawingEvidence,{biologicalDrawingSource,readBiologicalDrawingEvidence} from "./ScienceBiologicalDrawingEvidence";

test("flower and stoma only, with no prefilled marks, labels or measurements",()=>{
 const flower=biologicalDrawingSource("IS-M1-P2-27",0,0);
 const stoma=biologicalDrawingSource("IS-M1-P2-21",1,0);
 expect(flower.names).toContain("anther");
 expect(stoma.names).toContain("guard cell");
 expect(biologicalDrawingSource("IS-M3-P2-11",0,1)).toBeNull();
 expect(readBiologicalDrawingEvidence("broken-json",flower)).toEqual({title:"",labels:[],measurementMm:""});
});
test("records only student measurements under the correct answer key",()=>{
 const onChange=jest.fn();
 render(<ScienceBiologicalDrawingEvidence base="IS-M1-P2-27:0:0"
  questionId="IS-M1-P2-27" partIndex={0} itemIndex={0} responses={{}}
  onChange={onChange} disabled={false}/>);
 fireEvent.change(screen.getByPlaceholderText("Your measured value, in mm"),{target:{value:"115"}});
 expect(onChange).toHaveBeenCalledTimes(1);
 const [key,value]=onChange.mock.calls[0];
 expect(key).toBe("IS-M1-P2-27:0:0:biologicalEvidence");
 expect(JSON.parse(value)).toEqual({title:"",labels:[],measurementMm:"115"});
});
test("invalid or unapproved labels cannot be smuggled into saved annotations",()=>{
 const source=biologicalDrawingSource("IS-M1-P2-21",1,0);
 const result=readBiologicalDrawingEvidence({labels:[
  {name:"guard cell",from:[.2,.3],to:[.4,.5]},
  {name:"ovary",from:[.1,.2],to:[.4,.5]},
  {name:"stoma",from:[NaN,.2],to:[.3,.4]}]},source);
 expect(result.labels).toHaveLength(1);
 expect(result.labels[0].name).toBe("guard cell");
});
test("disabled display prevents student changes",()=>{
 const onChange=jest.fn();
 render(<ScienceBiologicalDrawingEvidence base="IS-M1-P2-21:1:0"
  questionId="IS-M1-P2-21" partIndex={1} itemIndex={0} responses={{}}
  onChange={onChange} disabled={true}/>);
 expect(screen.getByPlaceholderText("Your measured value, in mm").disabled).toBe(true);
 expect(screen.queryByRole("button",{name:"Undo label line"})).toBeNull();
});
