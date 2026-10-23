import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceCircuitConstructionResponse,{readScienceCircuitDiagram} from "./ScienceCircuitConstructionResponse";

test("circuit opens as a truly empty answer, including corrupted previous state",()=>{
 expect(readScienceCircuitDiagram("{bad")).toEqual({components:[],wires:[]});
 const onChange=jest.fn();
 render(<ScienceCircuitConstructionResponse base="s:0:0" responses={{}} onChange={onChange} disabled={false}/>);
 expect(screen.getByText(/0 components/)).toBeTruthy();
 expect(screen.getByLabelText("Blank circuit construction canvas")).toBeTruthy();
 expect(screen.getByText("Connect terminals").closest("button").disabled).toBe(true);
});
test("candidate selects a component and places it by tapping the blank surface",()=>{
 const onChange=jest.fn();
 render(<ScienceCircuitConstructionResponse base="s:0:0" responses={{}} onChange={onChange} disabled={false}/>);
 const svg=screen.getByLabelText("Blank circuit construction canvas");
 svg.getBoundingClientRect=()=>({left:10,top:20,width:640,height:330});
 const surface=svg.querySelector('[data-place-surface="true"]');
 fireEvent(surface,new MouseEvent("pointerdown",{bubbles:true,clientX:138,clientY:119}));
 expect(onChange).toHaveBeenCalledTimes(1);
 const [key,json]=onChange.mock.calls[0],data=JSON.parse(json);
 expect(key).toBe("s:0:0:circuitNetlist");
 expect(data.components).toHaveLength(1);
 expect(data.components[0].kind).toBe("cell");
 expect(data.components[0].x).toBeCloseTo(.2,4);
 expect(data.components[0].y).toBeCloseTo(.3,4);
 expect(data.wires).toEqual([]);
});
test("readonly mode cannot create components",()=>{
 const onChange=jest.fn();
 render(<ScienceCircuitConstructionResponse base="s:0:0" responses={{}} onChange={onChange} disabled={true}/>);
 const svg=screen.getByLabelText("Blank circuit construction canvas");
 svg.getBoundingClientRect=()=>({left:0,top:0,width:640,height:330});
 fireEvent(svg.querySelector('[data-place-surface="true"]'),new MouseEvent("pointerdown",{bubbles:true,clientX:200,clientY:100}));
 expect(onChange).not.toHaveBeenCalled();
});
