import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import ScienceParticleDiagramResponse,{readParticleLayout} from "./ScienceParticleDiagramResponse";

test("starts from truly blank independent student diagrams",()=>{
 expect(readParticleLayout("{bad json")).toEqual({solid:[],liquid:[]});
 const onChange=jest.fn();
 render(<ScienceParticleDiagramResponse base="IS-M3-P2-25:1:0" responses={{}} onChange={onChange} disabled={false}/>);
 expect(screen.getByText("Solid")).toBeTruthy();
 expect(screen.getByText("Liquid")).toBeTruthy();
 expect(screen.getAllByText("0 particles")).toHaveLength(2);
});
test("records user placed geometry instead of providing an answer template",()=>{
 const onChange=jest.fn();
 render(<ScienceParticleDiagramResponse base="IS-M3-P2-25:1:0" responses={{}} onChange={onChange} disabled={false}/>);
 const solid=screen.getByLabelText("Solid particle arrangement drawing");
 solid.getBoundingClientRect=()=>({left:10,top:10,width:200,height:100});
 fireEvent.pointerDown(solid,{clientX:110,clientY:60});
 expect(onChange).toHaveBeenCalledTimes(1);
 const [key,json]=onChange.mock.calls[0];
 expect(key).toBe("IS-M3-P2-25:1:0:particleLayout");
 expect(JSON.parse(json)).toEqual({solid:[[.5,.5]],liquid:[]});
});
test("disabled student review does not alter previously saved diagram",()=>{
 const onChange=jest.fn();
 const value=JSON.stringify({solid:[[.2,.3]],liquid:[]});
 render(<ScienceParticleDiagramResponse base="q:0:0" responses={{"q:0:0:particleLayout":value}} onChange={onChange} disabled={true}/>);
 fireEvent.pointerDown(screen.getByLabelText("Solid particle arrangement drawing"),{clientX:20,clientY:20});
 expect(onChange).not.toHaveBeenCalled();
});
