import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceFiltrationDrawingResponse,{readFiltrationDrawing} from "./ScienceFiltrationDrawingResponse";
test("the question begins blank and does not include model apparatus",()=>{
 expect(readFiltrationDrawing("{corrupt")).toEqual({title:"",lines:[],labels:[]});
 const onChange=jest.fn();
 render(<ScienceFiltrationDrawingResponse base="IS-M3-P2-11:0:1" responses={{}} onChange={onChange} disabled={false}/>);
 expect(screen.getByLabelText("Blank filtration apparatus drawing canvas")).toBeTruthy();
 expect(screen.getByText("0 lines, 0 labels")).toBeTruthy();
});
test("line evidence is drawn entirely by the student",()=>{
 const onChange=jest.fn();
 render(<ScienceFiltrationDrawingResponse base="s:0:1" responses={{}} onChange={onChange} disabled={false}/>);
 const svg=screen.getByLabelText("Blank filtration apparatus drawing canvas");
 svg.getBoundingClientRect=()=>({left:10,top:20,width:640,height:360});
 fireEvent(svg,new MouseEvent("pointerdown",{bubbles:true,clientX:74,clientY:92}));
 fireEvent(svg,new MouseEvent("pointerup",{bubbles:true,clientX:202,clientY:200}));
 expect(onChange).toHaveBeenCalledTimes(1);
 const [key,json]=onChange.mock.calls[0];
 expect(key).toBe("s:0:1:filtrationDrawing");
 const saved=JSON.parse(json);
 expect(saved.lines).toEqual([[[.1,.2],[.3,.5]]]);
 expect(saved.labels).toEqual([]);
});
test("disabled review cannot modify diagram",()=>{
 const onChange=jest.fn();
 render(<ScienceFiltrationDrawingResponse base="s:0:1" responses={{}} onChange={onChange} disabled={true}/>);
 const svg=screen.getByLabelText("Blank filtration apparatus drawing canvas");
 fireEvent(svg,new MouseEvent("pointerdown",{bubbles:true,clientX:100,clientY:100}));
 expect(onChange).not.toHaveBeenCalled();
});
