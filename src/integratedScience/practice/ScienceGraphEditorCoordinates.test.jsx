import React,{useState} from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import ScienceGraphEditor from "./ScienceGraphEditor";

const initialGraph=(points="",kind="line")=>({
  version:1,kind,connection:"none",barWidth:.6,
  x:{min:0,max:10,step:1},y:{min:0,max:10,step:1},
  categories:kind==="bar"?["Monday","Tuesday"]:[],
  series:[{name:"Experiment A",points}],
});
function Harness({initial,disabled=false,notify=()=>{}}){
  const [responses,setResponses]=useState({"q:graph":JSON.stringify(initial)});
  return <ScienceGraphEditor base="q" disabled={disabled} responses={responses} onChange={(key,value)=>{
    notify(key,value);
    setResponses(before=>({...before,[key]:value}));
  }}/>;
}
function graphBox(svg,width=600,height=335,left=0,top=0){
  svg.getBoundingClientRect=()=>({left,top,width,height,right:left+width,bottom:top+height});
}

describe("Exact graph coordinate feedback in Chemistry and Integrated Science",()=>{
  test("shows the snapped coordinate before plotting without modifying the answer",()=>{
    const notify=jest.fn();
    render(<Harness initial={initialGraph()} notify={notify}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    fireEvent.pointerMove(plot,{clientX:150,clientY:218});
    expect(screen.getByText("Plot at: (2, 2)")).toBeInTheDocument();
    expect(notify).not.toHaveBeenCalled();
    fireEvent.click(plot,{clientX:150,clientY:218});
    expect(JSON.parse(notify.mock.calls[0][1]).series[0].points).toBe("2,2");
    expect(screen.getByRole("button",{name:/Inspect Experiment A point \(2, 2\)/})).toBeInTheDocument();
  });

  test("hovering an existing unsnapped point displays its exact stored decimals",()=>{
    const notify=jest.fn();
    render(<Harness initial={initialGraph("3.125,4.375")} notify={notify}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    fireEvent.pointerMove(plot,{clientX:206.25,clientY:168.125});
    expect(screen.getByText("Plotted point: (3.125, 4.375)")).toBeInTheDocument();
    fireEvent.click(plot,{clientX:206.25,clientY:168.125});
    expect(notify).not.toHaveBeenCalled();
  });

  test("coordinates remain accurate when the SVG has letterboxing on a narrow viewport",()=>{
    render(<Harness initial={initialGraph("3.125,4.375")}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    // 600x335 viewBox fits a 300x335 element at scale 0.5,
    // leaving 83.75 px of letterboxing above and below.
    graphBox(plot,300,335,10,20);
    fireEvent.pointerMove(plot,{clientX:113.125,clientY:187.8125});
    expect(screen.getByText("Plotted point: (3.125, 4.375)")).toBeInTheDocument();
  });

  test("tapping a saved point still shows its coordinates when submitted/disabled",()=>{
    const notify=jest.fn();
    render(<Harness initial={initialGraph("3.125,4.375")} disabled notify={notify}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    fireEvent.click(plot,{clientX:206.25,clientY:168.125});
    expect(screen.getByText("Plotted point: (3.125, 4.375)")).toBeInTheDocument();
    expect(notify).not.toHaveBeenCalled();
    fireEvent.focus(screen.getByRole("button",{name:/Inspect Experiment A point \(3.125, 4.375\)/}));
    expect(screen.getByText("Plotted point: (3.125, 4.375)")).toBeInTheDocument();
  });

  test("categorical bar graphs expose exact category and height",()=>{
    render(<Harness initial={initialGraph("Monday,7", "bar")}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    fireEvent.pointerMove(plot,{clientX:175,clientY:150});
    expect(screen.getByText("Plotted point: (Monday, 7)")).toBeInTheDocument();
  });

  test("Mathematics graph workspace already has snapped pointer coordinates and a crosshair",()=>{
    // The Mathematics response workspace implements these independently.
    const source=require("fs").readFileSync(require("path").join(process.cwd(),"src/practice/Paper2ResponseInput.jsx"),"utf8");
    expect(source).toContain("setHover(pointFromEvent(event))");
    expect(source).toContain("paper2-graph-crosshair");
    expect(source).toContain("Coordinate: (");
  });
});
