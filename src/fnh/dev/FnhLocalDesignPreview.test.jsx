import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import {FnhLocalDesignPreview} from "./FnhLocalDesignPreview";

jest.mock("../../subjects/GenericSubjectStudyView",()=>({
  __esModule:true,
  default:({subject})=><div data-testid="preview-subject">{subject?.name}</div>
}));

describe("FNH standalone preview page stays draft-only and independent of login",()=>{
 afterEach(()=>{delete document.documentElement.dataset.theme;});
 test("renders the actual FNH subject metadata with a clear local-only notice",()=>{
  render(<FnhLocalDesignPreview/>);
  expect(screen.getByTestId("preview-subject")).toHaveTextContent("CSEC Food, Nutrition and Health");
  expect(screen.getByText(/No sign-in, Supabase writes, saved grades or published course changes/))
   .toBeInTheDocument();
  expect(screen.queryByText("Log in")).not.toBeInTheDocument();
 });
 test("light/dark controls change the preview page theme without changing course progress",()=>{
  render(<FnhLocalDesignPreview/>);
  const light=screen.getByRole("button",{name:"Light"});
  const dark=screen.getByRole("button",{name:"Dark"});
  expect(light).toHaveAttribute("aria-pressed","true");
  fireEvent.click(dark);
  expect(document.documentElement).toHaveAttribute("data-theme","dark");
  expect(dark).toHaveAttribute("aria-pressed","true");
  expect(light).toHaveAttribute("aria-pressed","false");
  fireEvent.click(light);
  expect(document.documentElement).toHaveAttribute("data-theme","light");
 });
});
