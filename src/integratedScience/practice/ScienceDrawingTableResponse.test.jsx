import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceDrawingTableResponse,{scienceDrawingTableTemplate,readScienceDrawingTable} from "./ScienceDrawingTableResponse";

test("identifies four formerly freehand-only table questions",()=>{
 expect(scienceDrawingTableTemplate("IS-M3-P2-05",0,0)).toEqual({rows:4,columns:2});
 expect(scienceDrawingTableTemplate("IS-M2-P2-07",0,2)).toEqual({rows:6,columns:3});
 expect(scienceDrawingTableTemplate("IS-M2-P2-13",1,0)).toEqual({rows:3,columns:3});
 expect(scienceDrawingTableTemplate("IS-M3-P2-15",0,0)).toEqual({rows:4,columns:2});
 expect(scienceDrawingTableTemplate("IS-M2-P2-07",0,0)).toBeNull();
});

test("creates empty answer cells and safely recovers corrupted saved values",()=>{
 const spec=scienceDrawingTableTemplate("IS-M3-P2-05",0,0);
 const value=readScienceDrawingTable("{not-json",spec);
 expect(value.title).toBe("");
 expect(value.rows).toHaveLength(4);
 expect(value.rows.flat().every(x=>x==="")).toBe(true);
 expect(value.headings).toEqual(["",""]);
});

test("captures a student table title without inserting model answers",()=>{
 const onChange=jest.fn();
 render(<ScienceDrawingTableResponse base="IS-M3-P2-05:0:0" questionId="IS-M3-P2-05"
  partIndex={0} itemIndex={0} responses={{}} onChange={onChange} disabled={false}/>);
 fireEvent.change(screen.getByPlaceholderText("Write a suitable title"),{target:{value:"Nails and rust"}});
 expect(onChange).toHaveBeenCalledTimes(1);
 const [key,json]=onChange.mock.calls[0];
 expect(key).toBe("IS-M3-P2-05:0:0:drawingTable");
 const saved=JSON.parse(json);
 expect(saved.title).toBe("Nails and rust");
 expect(saved.rows.flat().every(x=>x==="")).toBe(true);
});
