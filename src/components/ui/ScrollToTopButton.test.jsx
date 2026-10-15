import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import ScrollToTopButton from "./ScrollToTopButton";

describe("one shared back-to-top action across SPARK", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {configurable:true,value:0,writable:true});
    Object.defineProperty(window, "innerHeight", {configurable:true,value:800,writable:true});
    Object.defineProperty(window, "scrollTo", {configurable:true,value:jest.fn()});
    Object.defineProperty(window, "matchMedia", {configurable:true,value:jest.fn().mockReturnValue({matches:false})});
    document.querySelectorAll(".app-scroll-panel,[data-avoid-scrolltop]").forEach(node => node.remove());
  });

  test("is hidden and not keyboard focusable until the viewport scrolls", () => {
    render(<ScrollToTopButton/>);
    const button=screen.getByTitle("Back to top");
    expect(button).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
    expect(button).not.toHaveClass("is-visible");
    window.scrollY=400;
    fireEvent.scroll(window);
    expect(button).toHaveClass("is-visible");
    expect(button).toHaveAttribute("aria-hidden", "false");
    expect(button).toHaveAttribute("tabindex", "0");
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({top:0,behavior:"smooth"});
  });

  test("detects nested lesson scrolling and returns both panel and window to top", () => {
    const panel=document.createElement("div");
    panel.className="app-scroll-panel";
    panel.scrollTop=0;
    panel.scrollTo=jest.fn();
    document.body.appendChild(panel);
    render(<ScrollToTopButton/>);
    panel.scrollTop=480;
    fireEvent.scroll(panel);
    const button=screen.getByRole("button",{name:"Back to top"});
    fireEvent.click(button);
    expect(panel.scrollTo).toHaveBeenCalledWith({top:0,behavior:"smooth"});
    expect(window.scrollTo).toHaveBeenCalledWith({top:0,behavior:"smooth"});
  });

  test("moves above marked bottom actions and raised toasts", () => {
    const obstruction=document.createElement("div");
    obstruction.setAttribute("data-avoid-scrolltop","");
    obstruction.getBoundingClientRect=jest.fn().mockReturnValue({top:710,bottom:780,width:280,height:70});
    document.body.appendChild(obstruction);
    window.scrollY=520;
    render(<ScrollToTopButton raised/>);
    const button=screen.getByRole("button",{name:"Back to top"});
    const bottom=parseInt(button.style.bottom.match(/calc\((\d+)px/)[1],10);
    expect(bottom).toBeGreaterThan(92);
  });

  test("honours reduced motion for both viewport and nested panel", () => {
    window.matchMedia.mockReturnValue({matches:true});
    window.scrollY=520;
    const panel=document.createElement("div");
    panel.className="app-scroll-panel";
    panel.scrollTo=jest.fn();
    document.body.appendChild(panel);
    render(<ScrollToTopButton/>);
    fireEvent.click(screen.getByRole("button",{name:"Back to top"}));
    expect(window.scrollTo).toHaveBeenCalledWith({top:0,behavior:"auto"});
    expect(panel.scrollTo).toHaveBeenCalledWith({top:0,behavior:"auto"});
  });

  test("cleans up scroll and resize handlers on unmount", () => {
    const remove=jest.spyOn(window,"removeEventListener");
    const {unmount}=render(<ScrollToTopButton/>);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll",expect.any(Function),{capture:true});
    expect(remove).toHaveBeenCalledWith("resize",expect.any(Function));
    remove.mockRestore();
  });
});
