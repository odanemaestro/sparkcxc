import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import ScienceCircuitSymbolResponse,{readCircuitSymbolDrawing} from "./ScienceCircuitSymbolResponse";

test("starts with independent blank symbol canvases",()=>{
 expect(readCircuitSymbolDrawing("{not json")).toEqual({fuse:[],voltmeter:[],switch:[]});
 const onChange=jest.fn();
 render(<ScienceCircuitSymbolResponse base="source:1:0" responses={{}} onChange={onChange} disabled={false}/>);
 expect(screen.getByLabelText("Fuse student symbol canvas")).toBeTruthy();
 expect(screen.getByLabelText("Voltmeter student symbol canvas")).toBeTruthy();
 expect(screen.getByLabelText("Switch student symbol canvas")).toBeTruthy();
});
test("draws a rectangle from the student's actual drag",()=>{
 const onChange=jest.fn();
 render(<ScienceCircuitSymbolResponse base="q:1:0" responses={{}} onChange={onChange} disabled={false}/>);
 fireEvent.click(within(screen.getByRole("group",{name:"Fuse drawing tool"})).getByText("Rectangle"));
 const canvas=screen.getByLabelText("Fuse student symbol canvas");
 canvas.getBoundingClientRect=()=>({left:10,top:10,width:250,height:150});
 fireEvent(canvas,new MouseEvent("pointerdown",{bubbles:true,clientX:60,clientY:40}));
 fireEvent(canvas,new MouseEvent("pointerup",{bubbles:true,clientX:160,clientY:100}));
 const [key,encoded]=onChange.mock.calls.at(-1);
 expect(key).toBe("q:1:0:symbolDrawing");
 expect(JSON.parse(encoded).fuse[0]).toEqual({kind:"rect",x:.2,y:.2,w:.4,h:.4});
 expect(JSON.parse(encoded).voltmeter).toEqual([]);
});
test("disabled review blocks primitive changes",()=>{
 const onChange=jest.fn();
 render(<ScienceCircuitSymbolResponse base="q:1:0" responses={{}} onChange={onChange} disabled={true}/>);
 const canvas=screen.getByLabelText("Fuse student symbol canvas");
 fireEvent(canvas,new MouseEvent("pointerdown",{bubbles:true,clientX:20,clientY:20}));
 expect(onChange).not.toHaveBeenCalled();
});
