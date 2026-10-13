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

const pointerMove=(element,{clientX,clientY})=>fireEvent(element,new MouseEvent("pointermove",{bubbles:true,clientX,clientY}));

describe("Exact graph coordinate feedback in Chemistry and Integrated Science",()=>{
  test("shows the snapped coordinate before plotting without modifying the answer",()=>{
    const notify=jest.fn();
    render(<Harness initial={initialGraph()} notify={notify}/>);
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    pointerMove(plot,{clientX:150,clientY:218});
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
    pointerMove(plot,{clientX:206.25,clientY:168.125});
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
    pointerMove(plot,{clientX:113.125,clientY:187.8125});
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
    pointerMove(plot,{clientX:175,clientY:150});
    expect(screen.getByText("Plotted point: (Monday, 7)")).toBeInTheDocument();
  });

  test("a second bar series can plot in the same category without replacing the first series",()=>{
    const initial=initialGraph("Monday,7","bar");
    initial.series.push({name:"Experiment B",points:""});
    const notify=jest.fn();
    render(<Harness initial={initial} notify={notify}/>);
    fireEvent.change(screen.getByLabelText("Plotting series"),{target:{value:"1"}});
    const plot=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(plot);
    // Blank portion on the right of Monday's bar in the same category.
    fireEvent.click(plot,{clientX:190,clientY:200});
    expect(notify).toHaveBeenCalled();
    const updated=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(updated.series[0].points).toBe("Monday,7");
    expect(updated.series[1].points).toMatch(/^Monday,/);
  });

  test("reproduces screenshot: zero y interval does not hide existing plotted points",()=>{
    const notify=jest.fn();
    const initial=initialGraph("20,0.08\n40,0.16");
    initial.x={min:"0",max:"50",step:"5"};
    initial.y={min:"0",max:"0.2",step:"0"};
    render(<Harness initial={initial} notify={notify}/>);
    const grid=screen.getByRole("img",{name:"Student graph plot"});
    expect(grid.querySelectorAll("circle").length).toBe(2);
    expect(screen.getByRole("button",{name:/Inspect Experiment A point \(20, 0\.08\)/})).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Use y interval 0.02"})).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button",{name:"Use y interval 0.02"}));
    const graph=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(graph.y.step).toBe("0.02");
    expect(graph.series[0].points).toBe("20,0.08\n40,0.16");
    expect(screen.queryByRole("button",{name:"Use y interval 0.02"})).not.toBeInTheDocument();
  });

  test("shows line-specific errors but preserves and draws other valid coordinates",()=>{
    const notify=jest.fn();
    const initial=initialGraph("0,0.02,20\n2,4");
    render(<Harness initial={initial} notify={notify}/>);
    expect(screen.getByRole("alert")).toHaveTextContent(/Line 1: enter one x, y pair/);
    expect(screen.getByRole("alert")).toHaveTextContent(/0,0\.02,20/);
    expect(screen.getByRole("button",{name:/Inspect Experiment A point \(2, 4\)/})).toBeInTheDocument();
    const grid=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(grid);
    fireEvent.click(grid,{clientX:250,clientY:155});
    const graph=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(graph.series[0].points).toContain("0,0.02,20");
    expect(graph.series[0].points).toContain("4,5");
  });

  test("reports valid points outside the chosen graph bounds instead of hiding them silently",()=>{
    render(<Harness initial={initialGraph("3,4\n15,6")}/>);
    expect(screen.getByRole("alert")).toHaveTextContent(/outside the current axis bounds/);
    expect(screen.getByRole("alert")).toHaveTextContent(/15, 6/);
    expect(screen.getByRole("button",{name:/Inspect Experiment A point \(3, 4\)/})).toBeInTheDocument();
  });

  test("two line-series can share the same real coordinate without blocking each other",()=>{
    const initial=initialGraph("2,2","line");
    initial.series.push({name:"Experiment B",points:""});
    const notify=jest.fn();
    render(<Harness initial={initial} notify={notify}/>);
    fireEvent.change(screen.getByLabelText("Plotting series"),{target:{value:"1"}});
    const grid=screen.getByRole("img",{name:"Student graph plot"});
    graphBox(grid);
    fireEvent.click(grid,{clientX:150,clientY:218});
    const updated=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(updated.series[0].points).toBe("2,2");
    expect(updated.series[1].points).toBe("2,2");
  });

  test("remove X deletes only the chosen point in its series",()=>{
    const initial=initialGraph("5,0.012\n10,0.012\n15,0.018");
    initial.x={min:0,max:20,step:2};
    initial.y={min:0,max:0.02,step:0.002};
    const notify=jest.fn();
    render(<Harness initial={initial} notify={notify}/>);
    fireEvent.click(screen.getByRole("button",{name:"Remove Experiment A point (10, 0.012)"}));
    const updated=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(updated.series[0].points).toBe("5,0.012\n15,0.018");
    expect(screen.getByRole("button",{name:"Inspect Experiment A point (5, 0.012)"})).toBeInTheDocument();
    expect(screen.queryByRole("button",{name:"Remove Experiment A point (10, 0.012)"})).not.toBeInTheDocument();
  });

  test("remove X uses original input row when an invalid row or duplicate coordinates exist",()=>{
    const initial=initialGraph("2,4\nnot valid\n2,4\n6,7");
    const notify=jest.fn();
    render(<Harness initial={initial} notify={notify}/>);
    fireEvent.click(screen.getAllByRole("button",{name:"Remove Experiment A point (2, 4)"})[1]);
    const updated=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(updated.series[0].points).toBe("2,4\nnot valid\n6,7");
    expect(screen.getAllByRole("button",{name:"Remove Experiment A point (2, 4)"})).toHaveLength(1);
  });

  test("remove X leaves other graph series untouched even for identical coordinates",()=>{
    const initial=initialGraph("5,0.012\n10,0.012");
    initial.x={min:0,max:20,step:2};
    initial.y={min:0,max:0.02,step:0.002};
    initial.series.push({name:"Experiment B",points:"5,0.012\n15,0.016"});
    const notify=jest.fn();
    render(<Harness initial={initial} notify={notify}/>);
    fireEvent.click(screen.getByRole("button",{name:"Remove Experiment B point (5, 0.012)"}));
    const updated=JSON.parse(notify.mock.calls[notify.mock.calls.length-1][1]);
    expect(updated.series[0].points).toBe("5,0.012\n10,0.012");
    expect(updated.series[1].points).toBe("15,0.016");
  });

  test("review mode exposes coordinate inspection but no delete X buttons",()=>{
    const initial=initialGraph("5,0.012\n10,0.012");
    initial.x={min:0,max:20,step:2};
    initial.y={min:0,max:0.02,step:0.002};
    render(<Harness initial={initial} disabled/>);
    expect(screen.getByRole("button",{name:"Inspect Experiment A point (5, 0.012)"})).toBeInTheDocument();
    expect(screen.queryByRole("button",{name:/Remove Experiment A point/})).not.toBeInTheDocument();
  });

  test("hovering the coordinate chip continues inspecting the exact point",()=>{
    const initial=initialGraph("5,0.012\n10,0.012");
    initial.x={min:0,max:20,step:2};
    initial.y={min:0,max:0.02,step:0.002};
    render(<Harness initial={initial}/>);
    fireEvent.pointerEnter(screen.getByRole("button",{name:"Inspect Experiment A point (5, 0.012)"}));
    expect(screen.getByText("Plotted point: (5, 0.012)")).toBeInTheDocument();
  });

  test("Mathematics graph workspace already has snapped pointer coordinates and a crosshair",()=>{
    // The Mathematics response workspace implements these independently.
    const source=require("fs").readFileSync(require("path").join(process.cwd(),"src/practice/Paper2ResponseInput.jsx"),"utf8");
    expect(source).toContain("setHover(pointFromEvent(event))");
    expect(source).toContain("paper2-graph-crosshair");
    expect(source).toContain("Coordinate: (");
  });
});
