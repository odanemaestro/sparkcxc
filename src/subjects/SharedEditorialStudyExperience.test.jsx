import React from "react";
import {fireEvent,render,screen,within} from "@testing-library/react";
import GenericSubjectStudyView,{GenericLessonContent} from "./GenericSubjectStudyView";
import {loadGenericSubjectStructure} from "./genericSubjectCatalog";
import {readSparkHashRoute,subscribeSparkRoute} from "../routing/sparkRoutingV270";

jest.mock("./genericSubjectCatalog",()=>({
 loadGenericSubjectStructure:jest.fn()
}));
jest.mock("../routing/sparkRoutingV270",()=>({
 readSparkHashRoute:jest.fn(),
 subscribeSparkRoute:jest.fn(),
 writeSparkNestedRoute:jest.fn()
}));
jest.mock("../englishA/components/EnglishALessonExamples",()=>({
 __esModule:true,default:()=> <div data-testid="english-practice">English A practice still available</div>
}));

const lessonTopic={
 id:"sample-lesson",sectionId:"unit-1",title:"A Caribbean classroom lesson",description:"Learn these concepts.",
 metadata:{lesson:{
  introduction:"A lesson for Caribbean students with practical examples.",
  objectives:["Explain an important idea clearly."],
  objectiveGuide:[{code:"1.1",objective:"Explain the first idea.",explanation:"Start with a clear definition and a Caribbean example."}],
  sections:[{title:"Understand the idea",paragraphs:["Read the first explanation carefully and discuss a local example."]}],
  keyPoints:["Name the main point.","Apply it to a problem."],
  workedExample:{title:"An example from daily life",prompt:"Explain what happens in this scenario.",steps:["Read the situation","Choose the correct idea"],answer:"A supported explanation."},
  summary:"Review what you have learned."
 }}
};
const secondTopic={...lessonTopic,id:"next-lesson",title:"Another topic"};
const structure={
 sections:[{id:"unit-1",title:"Unit 1",sortOrder:1,topics:[lessonTopic,secondTopic]}],
 topics:[lessonTopic,secondTopic],activities:[],unassignedTopics:[],sectionCount:1,topicCount:2
};
const subject=id=>({
 id,name:"CSEC "+id,shortName:id,qualification:"CSEC",mark:"SS",
 description:"Study the syllabus through carefully explained lessons.",
 routes:{study:"/study/"+id}
});

describe("Shared editorial study design for established CSEC subjects",()=>{
 beforeEach(()=>{
  loadGenericSubjectStructure.mockResolvedValue({data:structure,error:null});
  readSparkHashRoute.mockReturnValue({path:"/study/none",params:new URLSearchParams()});
  subscribeSparkRoute.mockReturnValue(()=>{});
  Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
  Object.defineProperty(HTMLElement.prototype,"scrollIntoView",{configurable:true,value:jest.fn()});
 });
 test.each(["english-a","integrated-science","social-studies","chemistry"])(
  "%s uses the new editorial reader without replacing progress or its lesson",
  async id=>{
   render(<GenericSubjectStudyView subject={subject(id)}/>);
   const focus=await screen.findByRole("button",{name:"Focus on reading"});
   const main=screen.getByRole("main");
   expect(main).toHaveClass("spark-editorial-study");
   expect(main).not.toHaveClass("spark-fnh-study");
   expect(screen.getByText("Lesson 1 of 2")).toBeInTheDocument();
   expect(screen.getByText("0/2")).toBeInTheDocument();
   expect(screen.getByRole("button",{name:"Mark lesson complete"})).toBeInTheDocument();
   expect(screen.getByTitle("Back to top")).toBeInTheDocument();
   const nav=screen.getByRole("navigation",{name:"Jump to a part of this lesson"});
   expect(within(nav).getByRole("button",{name:"Read notes"})).toBeInTheDocument();
   expect(within(nav).getByRole("button",{name:"Key points"})).toBeInTheDocument();
   expect(within(nav).getByRole("button",{name:"Worked example"})).toBeInTheDocument();
   expect(within(nav).getByRole("button",{name:"Summary"})).toBeInTheDocument();
   expect(document.getElementById("spark-lesson-notes")).not.toBeNull();
   expect(document.getElementById("spark-lesson-key-points")).not.toBeNull();
   expect(document.getElementById("spark-lesson-worked-example")).not.toBeNull();
   expect(document.getElementById("spark-lesson-summary")).not.toBeNull();
   fireEvent.click(focus);
   expect(main).toHaveClass("spark-fnh-focus-reading");
   expect(screen.getByRole("heading",{level:2,name:"A Caribbean classroom lesson"})).toBeInTheDocument();
   fireEvent.click(screen.getByRole("button",{name:"Show course outline"}));
   expect(main).not.toHaveClass("spark-fnh-focus-reading");
  }
 );
 test("shared in-lesson links scroll without touching the subject route",()=>{
  render(<GenericLessonContent subjectId="social-studies" topic={lessonTopic} editorial/>);
  const nav=screen.getByRole("navigation",{name:"Jump to a part of this lesson"});
  fireEvent.click(within(nav).getByRole("button",{name:"Worked example"}));
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({behavior:"smooth",block:"start"});
  const summary=screen.getByText("Official syllabus guide").closest("details");
  expect(summary.open).toBe(false);
  expect(summary.querySelectorAll(".spark-generic-objective-guide-item")).toHaveLength(1);
  fireEvent.click(within(summary).getByText("Official syllabus guide"));
  expect(summary.open).toBe(true);
 });
 test("standalone lesson components remain backwards compatible unless editorial is enabled",()=>{
  render(<GenericLessonContent subjectId="chemistry" topic={lessonTopic}/>);
  expect(screen.queryByRole("navigation",{name:"Jump to a part of this lesson"})).not.toBeInTheDocument();
  expect(screen.getByRole("region",{name:"Syllabus objective guide"})).toBeInTheDocument();
  expect(screen.getByText("What you should be able to do")).toBeInTheDocument();
 });
});
