import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {GenericLessonContent} from "./GenericSubjectStudyView";

const topicFor=templates=>({id:"topic",sectionId:"section",metadata:{lesson:{introduction:"Keep the lesson content.",interactiveDiagrams:templates.map(template=>({id:template,title:template,template,labels:[{id:"part",text:"Ovary"}],targets:[{id:"target",labelId:"part"}]}))}}});
const removed=["flower-longitudinal","mammalian-ear","human-digestive-system","human-tooth","human-respiratory-system","human-heart"];
const reference=["bean-seed","male-reproductive-system","three-pin-plug"];

test("removed Integrated Science activities stay absent without removing lesson text",()=>{
  const onActivityComplete=jest.fn();
  const view=render(<GenericLessonContent subjectId="integrated-science" topic={topicFor(removed)} onActivityComplete={onActivityComplete}/>);
  expect(screen.getByText("Keep the lesson content.")).toBeInTheDocument();
  expect(view.container.querySelector(".spark-label-diagram")).toBeNull();
  expect(screen.queryByRole("button",{name:"Check answers"})).not.toBeInTheDocument();
  expect(onActivityComplete).not.toHaveBeenCalled();
});

test("reference-only diagrams have no placement controls or completion scoring",()=>{
  const onActivityComplete=jest.fn();
  HTMLDialogElement.prototype.showModal=jest.fn();
  const view=render(<GenericLessonContent subjectId="integrated-science" topic={topicFor(reference)} onActivityComplete={onActivityComplete}/>);
  expect(view.container.querySelectorAll(".spark-integrated-science-reference-diagram")).toHaveLength(3);
  expect(view.container.querySelector(".spark-label-target")).toBeNull();
  expect(screen.queryByRole("button",{name:"Check answers"})).not.toBeInTheDocument();
  for(const button of screen.getAllByRole("button",{name:/Enlarge:/}))fireEvent.click(button);
  expect(onActivityComplete).not.toHaveBeenCalled();
  const sources=[...view.container.querySelectorAll("figure > button img")].map(img=>img.getAttribute("src"));
  expect(sources[0]).toContain("bean-seed-labelled.svg");
  expect(sources[2]).toContain("three-pin-plug-labelled.svg");
});

test.each(["plant-cell","animal-cell","light-microscope","mammalian-eye","endocrine-system","female-reproductive-system","pregnancy-uterus","human-brain","kidney-longitudinal","nephron","skin-section"])("%s keeps its interactive activity",template=>{
  render(<GenericLessonContent subjectId="integrated-science" topic={topicFor([template])}/>);
  expect(screen.getByRole("button",{name:"Check answers"})).toBeInTheDocument();
});
