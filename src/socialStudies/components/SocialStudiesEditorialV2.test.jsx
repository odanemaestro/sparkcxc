import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import SocialStudiesSubjectView from "./SocialStudiesSubjectView";
import {SOCIAL_STUDIES_COURSE,SOCIAL_STUDIES_LESSONS} from "../data/socialStudiesCourse";
import {readSparkHashRoute,subscribeSparkRoute,writeSparkNestedRoute} from "../../routing/sparkRoutingV270";

jest.mock("../../routing/sparkRoutingV270",()=>({
 readSparkHashRoute:jest.fn(),subscribeSparkRoute:jest.fn(),writeSparkNestedRoute:jest.fn()
}));
const first=SOCIAL_STUDIES_LESSONS[0];
const start=()=>{
 const result=render(<SocialStudiesSubjectView supabase={null} userId={null}
  onBack={jest.fn()} showToast={jest.fn()}/>);
 return result;
};
beforeEach(()=>{
 readSparkHashRoute.mockReturnValue({path:"/study/social-studies",params:new URLSearchParams()});
 subscribeSparkRoute.mockReturnValue(()=>{});
 window.scrollTo=jest.fn();
 if(!HTMLElement.prototype.scrollIntoView)HTMLElement.prototype.scrollIntoView=jest.fn();
});
afterEach(()=>jest.clearAllMocks());

describe("Social Studies simpler course and learning journey",()=>{
 test("course opens with a clear continue action and only one expanded unit",()=>{
  start();
  expect(screen.getByRole("heading",{level:1,name:"Understand your world."})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:/Continue learning/})).toBeInTheDocument();
  const units=document.querySelectorAll(".ss-unit-card");
  expect(units).toHaveLength(SOCIAL_STUDIES_COURSE.sections.length);
  expect([...units].filter(unit=>!unit.querySelector(".ss-unit-lesson-panel").hidden)).toHaveLength(1);
  expect(screen.getByRole("button",{name:/Open Research & SBA toolkit/})).toBeInTheDocument();
  expect(screen.getByRole("heading",{level:2,name:"Your course"})).toBeInTheDocument();
 });
 test("unit accordion reveals one lesson list at a time and retains lock states",()=>{
  start();
  const units=[...document.querySelectorAll(".ss-unit-card")];
  const second=within(units[1]).getByRole("button",{name:/complete/});
  fireEvent.click(second);
  expect(second).toHaveAttribute("aria-expanded","true");
  expect(units[0].querySelector(".ss-unit-lesson-panel")).toHaveAttribute("hidden");
  expect(units[1].querySelector(".ss-unit-lesson-panel")).not.toHaveAttribute("hidden");
  expect(units[1].querySelectorAll("button.locked").length).toBeGreaterThan(0);
  fireEvent.click(second);
  expect(units[1].querySelector(".ss-unit-lesson-panel")).toHaveAttribute("hidden");
 });
 test("continuing lesson gives three clean stages with all teaching tools retained",()=>{
  start();
  fireEvent.click(screen.getByRole("button",{name:/Continue learning/}));
  expect(writeSparkNestedRoute).toHaveBeenCalledWith("/study/social-studies",{section:first.sectionId,topic:first.id});
  const nav=screen.getByRole("navigation",{name:"Lesson learning steps"});
  expect(within(nav).getAllByRole("button")).toHaveLength(3);
  expect(screen.getByText("Teacher notes")).toBeInTheDocument();
  expect(document.getElementById("ss-step-learn")).not.toHaveAttribute("hidden");
  expect(document.getElementById("ss-step-explore")).toHaveAttribute("hidden");
  expect(document.getElementById("ss-step-practice")).toHaveAttribute("hidden");
  const goals=screen.getByText("Lesson goals");
  expect(goals.closest("details")).toBeInTheDocument();
  fireEvent.click(within(nav).getByRole("button",{name:/Explore/}));
  expect(document.getElementById("ss-step-learn")).toHaveAttribute("hidden");
  expect(document.getElementById("ss-step-explore")).not.toHaveAttribute("hidden");
  expect(screen.getByText("Caribbean examples")).toBeInTheDocument();
  expect(document.querySelector(".ss-interactive")).toBeInTheDocument();
  fireEvent.click(within(nav).getByRole("button",{name:/Practise/}));
  expect(document.getElementById("ss-step-practice")).not.toHaveAttribute("hidden");
  expect(screen.getByText("Quick questions")).toBeInTheDocument();
  expect(screen.getByLabelText("Your response")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Mark lesson complete"})).toBeInTheDocument();
 });
 test("typed CSEC response survives changing lesson stages and marking guide stays available",()=>{
  start();
  fireEvent.click(screen.getByRole("button",{name:/Continue learning/}));
  const nav=screen.getByRole("navigation",{name:"Lesson learning steps"});
  fireEvent.click(within(nav).getByRole("button",{name:/Practise/}));
  fireEvent.change(screen.getByLabelText("Your response"),{target:{value:"My Caribbean community can use survey evidence."}});
  fireEvent.click(screen.getByRole("button",{name:"Show marking guide"}));
  expect(screen.getByRole("button",{name:"Hide marking guide"})).toHaveAttribute("aria-expanded","true");
  fireEvent.click(within(nav).getByRole("button",{name:/Learn/}));
  fireEvent.click(within(nav).getByRole("button",{name:/Practise/}));
  expect(screen.getByLabelText("Your response")).toHaveValue("My Caribbean community can use survey evidence.");
  expect(screen.getByText("A strong answer should:")).toBeInTheDocument();
  expect(document.querySelector(".ss-key-points")).toBeInTheDocument();
 });
});
