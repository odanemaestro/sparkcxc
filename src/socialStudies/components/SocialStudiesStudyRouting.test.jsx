import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import SocialStudiesSubjectView from "./SocialStudiesSubjectView";

jest.mock("../../subjects/GenericSubjectStudyView",()=>({
  __esModule:true,
  default:({courseActions})=><main><h1>Study lesson</h1>{courseActions}</main>,
}));

beforeEach(()=>{
  window.scrollTo=jest.fn();
  window.history.replaceState(null,"","#/study/social-studies?section=A1&topic=family");
});

test("the toolkit and selected station survive refresh without replacing lesson parameters or exposing drafts",()=>{
  const content=<SocialStudiesSubjectView userId="study-routing-student"/>;
  let first=render(content);
  fireEvent.click(screen.getByRole("button",{name:"Open Research & SBA toolkit"}));
  fireEvent.click(screen.getByRole("button",{name:"Write-up",exact:true}));
  fireEvent.change(screen.getByLabelText("Finding · What did the data show?"),{target:{value:"A private student draft"}});
  const hash=window.location.hash;
  expect(hash).toContain("section=A1");
  expect(hash).toContain("topic=family");
  expect(hash).toContain("toolkit=true");
  expect(hash).toContain("toolkitTab=write");
  expect(decodeURIComponent(hash)).not.toContain("private student draft");
  first.unmount();
  first=render(content);
  expect(screen.getByRole("heading",{name:"Separate findings, conclusions and recommendations"})).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"Write-up",exact:true})).toHaveAttribute("aria-current","step");
  fireEvent.click(screen.getByRole("button",{name:"Back to Social Studies",exact:true}));
  expect(screen.getByRole("heading",{name:"Study lesson"})).toBeInTheDocument();
  expect(window.location.hash).toContain("section=A1&topic=family");
  expect(window.location.hash).not.toContain("toolkit=true");
  first.unmount();
});

test("Back and Forward route events restore open state and selected toolkit station",()=>{
  render(<SocialStudiesSubjectView/>);
  const navigate=hash=>act(()=>{
    window.history.replaceState(null,"",hash);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  navigate("#/study/social-studies?section=A1&topic=family&toolkit=true&toolkitTab=sample");
  expect(screen.getByRole("heading",{name:"Choose people in a way you can defend"})).toBeInTheDocument();
  navigate("#/study/social-studies?section=A1&topic=family&toolkit=true&toolkitTab=evidence");
  expect(screen.getByRole("heading",{name:"Do not use a source just because it looks official"})).toBeInTheDocument();
  navigate("#/study/social-studies?section=A1&topic=family");
  expect(screen.getByRole("heading",{name:"Study lesson"})).toBeInTheDocument();
  navigate("#/study/social-studies?section=A1&topic=family&toolkit=true&toolkitTab=sample");
  expect(screen.getByRole("heading",{name:"Choose people in a way you can defend"})).toBeInTheDocument();
});

test("invalid toolkit state and unknown station IDs fall back safely",()=>{
  window.history.replaceState(null,"","#/study/social-studies?toolkit=invalid&toolkitTab=unknown");
  const first=render(<SocialStudiesSubjectView/>);
  expect(screen.getByRole("heading",{name:"Study lesson"})).toBeInTheDocument();
  first.unmount();
  window.history.replaceState(null,"","#/study/social-studies?toolkit=true&toolkitTab=unknown");
  render(<SocialStudiesSubjectView/>);
  expect(screen.getByRole("heading",{name:"Turn a broad topic into a researchable problem"})).toBeInTheDocument();
});
