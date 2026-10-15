import React from "react";
import {fireEvent,render,screen,within,waitFor} from "@testing-library/react";
import SocialStudiesSubjectView from "./SocialStudiesSubjectView";
import {SOCIAL_STUDIES_COURSE,SOCIAL_STUDIES_LESSONS} from "../data/socialStudiesCourse";
import {socialStudiesLocalStructure} from "../../subjects/genericSubjectCatalog";
import {readSparkHashRoute,subscribeSparkRoute,writeSparkNestedRoute} from "../../routing/sparkRoutingV270";

jest.mock("../../routing/sparkRoutingV270",()=>({
 readSparkHashRoute:jest.fn(),subscribeSparkRoute:jest.fn(),writeSparkNestedRoute:jest.fn()
}));
const first=SOCIAL_STUDIES_LESSONS[0];
const launch=()=>render(<SocialStudiesSubjectView supabase={null} userId={null}
 onBack={jest.fn()} showToast={jest.fn()}/>);
beforeEach(()=>{
 readSparkHashRoute.mockReturnValue({path:"/study/social-studies",params:new URLSearchParams()});
 subscribeSparkRoute.mockReturnValue(()=>{});
 window.scrollTo=jest.fn();
 HTMLElement.prototype.scrollIntoView=jest.fn();
});
afterEach(()=>jest.clearAllMocks());

describe("Social Studies uses the same study interface as the other subjects",()=>{
 test("exact shared study shell, course outline, progress and first learner-safe lesson",async()=>{
  launch();
  expect(await screen.findByRole("heading",{level:1,name:"CSEC Social Studies"})).toBeInTheDocument();
  const page=screen.getByRole("main");
  expect(page).toHaveClass("spark-generic-study");
  expect(page).toHaveClass("spark-editorial-study");
  expect(page.querySelector(".spark-generic-learning-layout")).toBeInTheDocument();
  expect(page.querySelector(".spark-generic-outline")).toBeInTheDocument();
  expect(page.querySelector(".spark-generic-lesson")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Focus on reading"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Mark lesson complete"})).toBeInTheDocument();
  expect(screen.getByText("Lesson 1 of 39")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Open Research & SBA toolkit"})).toBeInTheDocument();
  expect(screen.getByTitle("Back to top")).toBeInTheDocument();
  expect(page.querySelector(".ss-unit-card")).not.toBeInTheDocument();
  expect(page.querySelector(".ss-lesson-steps")).not.toBeInTheDocument();
 });
 test("local syllabus adapter preserves all section and lesson IDs and order",()=>{
  const actual=socialStudiesLocalStructure();
  expect(actual.topicCount).toBe(SOCIAL_STUDIES_LESSONS.length);
  expect(actual.sectionCount).toBe(SOCIAL_STUDIES_COURSE.sections.length);
  expect(actual.topics.map(topic=>topic.id)).toEqual(SOCIAL_STUDIES_LESSONS.map(lesson=>lesson.id));
  expect(actual.topics[0].metadata.objectiveCodes).toEqual(first.objectiveCodes);
  expect(actual.topics[0].metadata.lesson.sections).toEqual(first.noteSections);
 });
 test("Caribbean activities, practice, candidate answer and marking guide remain available",async()=>{
  launch();
  await screen.findByRole("heading",{level:1,name:"CSEC Social Studies"});
  const extras=document.querySelector(".ss-shared-extras");
  expect(extras).toBeInTheDocument();
  expect(within(extras).getByRole("heading",{name:"Caribbean examples and activities"})).toBeInTheDocument();
  expect(extras.querySelector(".ss-interactive")).toBeInTheDocument();
  expect(extras.querySelector(".ss-practice-options")).toBeInTheDocument();
  const answer=within(extras).getByLabelText("Your response");
  fireEvent.change(answer,{target:{value:"An example from my community based on evidence."}});
  fireEvent.click(within(extras).getByRole("button",{name:"Show marking guide"}));
  expect(within(extras).getByText("A strong answer should:")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Focus on reading"}));
  expect(screen.getByRole("main")).toHaveClass("spark-fnh-focus-reading");
  expect(answer).toHaveValue("An example from my community based on evidence.");
  fireEvent.click(screen.getByRole("button",{name:"Show course outline"}));
  expect(screen.getByRole("main")).not.toHaveClass("spark-fnh-focus-reading");
 });
 test("SBA toolkit opens from the shared header and safely returns to the reader",async()=>{
  launch();
  await screen.findByRole("heading",{level:1,name:"CSEC Social Studies"});
  fireEvent.click(screen.getByRole("button",{name:"Open Research & SBA toolkit"}));
  expect(screen.getByRole("heading",{level:1,name:"Investigate a social issue like a researcher."})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Back to Social Studies"}));
  expect(await screen.findByRole("heading",{level:1,name:"CSEC Social Studies"})).toBeInTheDocument();
 });
 test("existing locked lesson behaviour remains enforced in the shared outline",async()=>{
  launch();
  await screen.findByRole("heading",{level:1,name:"CSEC Social Studies"});
  const outline=document.querySelector(".spark-generic-outline");
  expect(outline).toBeInTheDocument();
  expect(outline.querySelectorAll("button.locked").length).toBeGreaterThan(0);
  expect(screen.getByRole("button",{name:"Next Lesson"})).toBeDisabled();
 });
});
