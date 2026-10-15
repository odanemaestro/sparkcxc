import React from "react";
import {fireEvent,render,screen,waitFor,within} from "@testing-library/react";
import GenericSubjectStudyView,{GenericLessonContent} from "../subjects/GenericSubjectStudyView";
import {loadGenericSubjectStructure} from "../subjects/genericSubjectCatalog";
import {FNH_TOPICS,fnhLocalStructure} from "./data/fnhCourse";
import {readSparkHashRoute,subscribeSparkRoute} from "../routing/sparkRoutingV270";

jest.mock("../subjects/genericSubjectCatalog",()=>({
  loadGenericSubjectStructure:jest.fn()
}));
jest.mock("../routing/sparkRoutingV270",()=>({
  readSparkHashRoute:jest.fn(),
  subscribeSparkRoute:jest.fn(),
  writeSparkNestedRoute:jest.fn()
}));

const fnhSubject={
  id:"food-nutrition-and-health",
  shortName:"Food, Nutrition and Health",
  name:"CSEC Food, Nutrition and Health",
  qualification:"CSEC",mark:"FH",
  description:"Learn the Food, Nutrition and Health syllabus.",
  routes:{study:"/study/food-nutrition-and-health"}
};

describe("FNH calm study reader, syllabus guide and navigation",()=>{
 beforeEach(()=>{
  loadGenericSubjectStructure.mockResolvedValue({
    data:fnhLocalStructure(),error:null
  });
  readSparkHashRoute.mockReturnValue({
    path:"/study/food-nutrition-and-health",
    params:new URLSearchParams()
  });
  subscribeSparkRoute.mockReturnValue(()=>{});
  Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
  Object.defineProperty(HTMLElement.prototype,"scrollIntoView",{
    configurable:true,value:jest.fn()
  });
 });

 test("FNH has a clear in-lesson path without changing the URL hash or quiz state",()=>{
  const topic=FNH_TOPICS.find(row=>row.id==="meal-planning-multimix");
  render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={topic}/>);
  const nav=screen.getByRole("navigation",{name:"Jump to a part of this lesson"});
  expect(within(nav).getByRole("button",{name:"Read notes"})).toBeInTheDocument();
  expect(within(nav).getByRole("button",{name:"Explore"})).toBeInTheDocument();
  expect(within(nav).getByRole("button",{name:"Quick practice"})).toBeInTheDocument();
  expect(within(nav).getByRole("button",{name:"Written response"})).toBeInTheDocument();
  expect(document.getElementById("fnh-lesson-notes")).not.toBeNull();
  expect(document.getElementById("fnh-lesson-explore")).not.toBeNull();
  fireEvent.click(within(nav).getByRole("button",{name:"Quick practice"}));
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  expect(screen.getByText("Try it like a CSEC candidate")).toBeInTheDocument();
 });

 test("full objective explanations remain accessible in a native disclosure",()=>{
  const topic=FNH_TOPICS.find(row=>row.id==="vitamins-minerals");
  render(<GenericLessonContent subjectId="food-nutrition-and-health" topic={topic}/>);
  expect(screen.getByText("What you should be able to do")).toBeInTheDocument();
  const summary=screen.getByText("Official syllabus guide").closest("summary");
  expect(summary).toBeInTheDocument();
  const detail=summary.closest("details");
  expect(detail.open).toBe(false);
  expect(detail.querySelectorAll(".spark-generic-objective-guide-item")).toHaveLength(5);
  fireEvent.click(summary);
  expect(detail.open).toBe(true);
  fireEvent.click(summary);
  expect(detail.open).toBe(false);
 });

 test("focus reading is FNH-only, preserves the lesson and toggles the outline visibility class",async()=>{
  render(<GenericSubjectStudyView subject={fnhSubject}/>);
  const focus=await screen.findByRole("button",{name:"Focus on reading"});
  const main=screen.getByRole("main");
  expect(main).toHaveClass("spark-fnh-study");
  expect(screen.getByTitle("Back to top")).toHaveAttribute("aria-hidden","true");
  expect(main).not.toHaveClass("spark-fnh-focus-reading");
  expect(screen.getByText("Lesson 1 of 25 · 4 syllabus objectives")).toBeInTheDocument();
  expect(screen.getByRole("complementary",{name:/course outline/})).toBeInTheDocument();
  fireEvent.click(focus);
  expect(main).toHaveClass("spark-fnh-focus-reading");
  expect(screen.getByRole("button",{name:"Show course outline"})).toHaveAttribute("aria-pressed","true");
  expect(screen.getByText("Try it like a CSEC candidate")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Show course outline"}));
  expect(main).not.toHaveClass("spark-fnh-focus-reading");
  expect(screen.getByRole("button",{name:"Focus on reading"})).toHaveAttribute("aria-pressed","false");
 });

 test("other generic subjects do not receive FNH focus controls or syllabus disclosure",()=>{
  const topic={
    id:"ordinary",description:"Other subject",
    metadata:{lesson:{introduction:"Regular lesson",objectives:["One objective"],
      objectiveGuide:[{code:"1",objective:"One objective",explanation:"Use what you learned."}],
      sections:[{title:"Topic",paragraphs:["Explanation."]}]}}
  };
  render(<GenericLessonContent subjectId="chemistry" topic={topic}/>);
  expect(screen.queryByRole("navigation",{name:"Jump to a part of this lesson"})).not.toBeInTheDocument();
  expect(screen.queryByText("Official syllabus guide")).not.toBeInTheDocument();
  expect(screen.getByRole("region",{name:"Syllabus objective guide"})).toBeInTheDocument();
  expect(screen.getByText("What you should be able to do")).toBeInTheDocument();
 });
});
