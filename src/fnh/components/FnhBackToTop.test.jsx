import React from "react";
import {fireEvent,render,screen} from "@testing-library/react";
import FnhBackToTop from "./FnhBackToTop";

describe("FNH floating back-to-top navigation",()=>{
 beforeEach(()=>{
  Object.defineProperty(window,"scrollY",{configurable:true,value:0,writable:true});
  Object.defineProperty(window,"pageYOffset",{configurable:true,value:0,writable:true});
  Object.defineProperty(window,"scrollTo",{configurable:true,value:jest.fn()});
  Object.defineProperty(window,"matchMedia",{configurable:true,value:jest.fn().mockReturnValue({matches:false})});
 });
 test("stays visually and keyboard hidden near the top of the lesson",()=>{
  render(<FnhBackToTop/>);
  const button=screen.getByRole("button",{name:"Back to top",hidden:true});
  expect(button).toHaveAttribute("aria-hidden","true");
  expect(button).toHaveAttribute("tabindex","-1");
  expect(button).not.toHaveClass("is-visible");
 });
 test("after scrolling, exposes an accessible arrow and returns to page top",()=>{
  render(<FnhBackToTop/>);
  window.scrollY=620;
  fireEvent.scroll(window);
  const button=screen.getByRole("button",{name:"Back to top"});
  expect(button).toHaveClass("is-visible");
  expect(button).toHaveAttribute("aria-hidden","false");
  expect(button).toHaveAttribute("tabindex","0");
  fireEvent.click(button);
  expect(window.scrollTo).toHaveBeenCalledWith({top:0,left:0,behavior:"smooth"});
  window.scrollY=0;
  fireEvent.scroll(window);
  expect(button).toHaveAttribute("aria-hidden","true");
 });
 test("respects reduced motion and avoids leaving a document scroll listener",()=>{
  window.matchMedia.mockReturnValue({matches:true});
  window.scrollY=900;
  const remove=jest.spyOn(window,"removeEventListener");
  const {unmount}=render(<FnhBackToTop/>);
  fireEvent.click(screen.getByRole("button",{name:"Back to top"}));
  expect(window.scrollTo).toHaveBeenCalledWith({top:0,left:0,behavior:"auto"});
  unmount();
  expect(remove).toHaveBeenCalledWith("scroll",expect.any(Function));
  remove.mockRestore();
 });
});
