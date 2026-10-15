import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import SocialStudiesSbaToolkit from "./SocialStudiesSbaToolkit";

describe("Social Studies research toolkit unified study design",()=>{
 test("uses the scoped study toolkit shell, readable station navigation and accessible progress",()=>{
  render(<SocialStudiesSbaToolkit onBack={jest.fn()} onComplete={jest.fn()}/>);
  const main=screen.getByRole("main");
  expect(main).toHaveClass("ss-sba-toolkit");
  expect(screen.getByRole("heading",{name:"Investigate a social issue like a researcher."})).toBeInTheDocument();
  expect(screen.getByRole("progressbar",{name:"Toolkit completion"}))
    .toHaveAttribute("aria-valuenow","0");
  expect(screen.getByText("0/6")).toBeInTheDocument();
  const nav=screen.getByRole("navigation",{name:"Research toolkit stations"});
  expect(within(nav).getAllByRole("button")).toHaveLength(6);
  expect(within(nav).getByRole("button",{name:"Plan"})).toHaveAttribute("aria-current","step");
  expect(within(nav).getByRole("button",{name:"Questionnaire"})).not.toHaveAttribute("aria-current");
  fireEvent.click(within(nav).getByRole("button",{name:"Questionnaire"}));
  expect(within(nav).getByRole("button",{name:"Questionnaire"})).toHaveAttribute("aria-current","step");
  expect(screen.getByRole("heading",{name:"Spot weak questions before respondents see them"})).toBeInTheDocument();
 });
 test("questionnaire selection and answer feedback still work with new visual layout",()=>{
  render(<SocialStudiesSbaToolkit onBack={jest.fn()} onComplete={jest.fn()}/>);
  const nav=screen.getByRole("navigation",{name:"Research toolkit stations"});
  fireEvent.click(within(nav).getByRole("button",{name:"Questionnaire"}));
  const prompt="Don't you agree that social media causes poor study habits?";
  const item=screen.getByText(prompt).closest("article");
  expect(item).toBeInTheDocument();
  fireEvent.click(within(item).getByRole("button",{name:"Leading or biased"}));
  expect(within(item).getByRole("button",{name:"Leading or biased"})).toHaveClass("selected");
  const all=screen.getAllByText("Good question").map(el=>el.closest("button"));
  fireEvent.click(all[1]);
  const multi=screen.getByText("Do you exercise regularly and eat healthy meals and get enough sleep?").closest("article");
  fireEvent.click(within(multi).getByRole("button",{name:"Double- or multi-barrelled"}));
  const fourth=screen.getByText("Which ONE method do you use most often to travel to school?").closest("article");
  fireEvent.click(within(fourth).getByRole("button",{name:"Good question"}));
  fireEvent.click(screen.getByRole("button",{name:"Check questionnaire"}));
  expect(screen.getByText("4/4 correct")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Complete station"})).toBeEnabled();
 });
 test("completing planning advances the station and updates progress without marking the toolkit complete",()=>{
  const onComplete=jest.fn();
  const onBack=jest.fn();
  render(<SocialStudiesSbaToolkit onBack={onBack} onComplete={onComplete}/>);
  fireEvent.change(screen.getByPlaceholderText("for example, school attendance"),{target:{value:"student transport"}});
  fireEvent.change(screen.getByPlaceholderText("for example, Grade 10 students"),{target:{value:"Grade 10 students"}});
  fireEvent.change(screen.getByPlaceholderText("for example, a secondary school in St Catherine"),{target:{value:"Spanish Town"}});
  fireEvent.click(screen.getByRole("button",{name:"I can frame a research question"}));
  expect(screen.getByRole("progressbar",{name:"Toolkit completion"}))
    .toHaveAttribute("aria-valuenow","1");
  expect(screen.getByText("1/6")).toBeInTheDocument();
  const nav=screen.getByRole("navigation",{name:"Research toolkit stations"});
  expect(within(nav).getByRole("button",{name:"Plan, completed"})).toBeInTheDocument();
  expect(within(nav).getByRole("button",{name:"Questionnaire"})).toHaveAttribute("aria-current","step");
  expect(onComplete).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole("button",{name:"Back to Social Studies"}));
  expect(onBack).toHaveBeenCalledTimes(1);
 });
});
