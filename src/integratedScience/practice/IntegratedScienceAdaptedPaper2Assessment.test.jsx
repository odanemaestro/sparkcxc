import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import IntegratedScienceAdaptedPaper2Assessment from "./IntegratedScienceAdaptedPaper2Assessment";

beforeEach(()=>localStorage.clear());

test("adapted assessment is separately identified and hides marking answers until submission",()=>{
 const onExit=jest.fn();
 render(<IntegratedScienceAdaptedPaper2Assessment onExit={onExit}/>);
 expect(screen.getByText(/not the historical 105-mark Paper 2/i)).toBeTruthy();
 expect(screen.getByText(/is-p2-adapted-biology-v1/i)).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Start adapted assessment"}));
 expect(screen.getByText("Label a stoma and guard cells")).toBeTruthy();
 expect(screen.queryByText(/Correct answer:/i)).toBeNull();
 fireEvent.change(screen.getByLabelText("Part A"),{target:{value:"guard cell"}});
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 expect(screen.getByText("Label a longitudinal flower section")).toBeTruthy();
 fireEvent.change(screen.getByLabelText("Part A"),{target:{value:"petal"}});
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 expect(screen.getByText("Calculate magnification")).toBeTruthy();
 fireEvent.change(screen.getByLabelText("Magnification working"),{target:{value:"120 ÷ 60"}});
 fireEvent.change(screen.getByLabelText("Magnification answer"),{target:{value:"×2"}});
 fireEvent.click(screen.getByRole("button",{name:"Submit adapted assessment"}));
 expect(screen.getByRole("status").textContent).toContain("4/12 marks");
 expect(screen.getByText(/does not replace a historical drawing mark/i)).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Back to Paper 2 selection"}));
 expect(onExit).toHaveBeenCalledTimes(1);
});
test("students can review earlier questions and start a fresh independent attempt",()=>{
 render(<IntegratedScienceAdaptedPaper2Assessment onExit={()=>{}}/>);
 fireEvent.click(screen.getByRole("button",{name:"Start adapted assessment"}));
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 fireEvent.click(screen.getByRole("button",{name:"Previous question"}));
 expect(screen.getByText("Label a stoma and guard cells")).toBeTruthy();
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 fireEvent.click(screen.getByRole("button",{name:"Next question"}));
 fireEvent.click(screen.getByRole("button",{name:"Submit adapted assessment"}));
 fireEvent.click(screen.getByRole("button",{name:"Try another attempt"}));
 expect(screen.getByRole("button",{name:"Start adapted assessment"})).toBeTruthy();
});
