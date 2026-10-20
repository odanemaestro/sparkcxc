import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";
import ScrollToTopButton, {findScrollTopPosition} from "./ScrollToTopButton";

const rect = (left, top, width, height) => ({left, top, width, height, right:left + width, bottom:top + height});
const geometry = {
  bounds:{left:14, top:14, right:986, bottom:786}, width:48, height:48,
  preferred:{left:930, top:730}, obstacles:[],
};

describe("back-to-top collision geometry", () => {
  test("ignores controls in another column and reserves a 14px gap above a collision", () => {
    expect(findScrollTopPosition({...geometry, obstacles:[rect(20, 730, 200, 48)]})).toEqual(geometry.preferred);
    expect(findScrollTopPosition({...geometry, obstacles:[rect(500, 730, 480, 48)]})).toEqual({left:930, top:668});
  });

  test("clears a chain of controls instead of lifting into the next one", () => {
    const obstacles = [rect(500, 730, 480, 48), rect(500, 650, 480, 50)];
    expect(findScrollTopPosition({...geometry, obstacles})).toEqual({left:930, top:588});
    expect(findScrollTopPosition({...geometry, obstacles:obstacles.reverse()})).toEqual({left:930, top:588});
  });

  test("moves sideways when the usual column has no usable vertical slot", () => {
    expect(findScrollTopPosition({...geometry, obstacles:[rect(900, 0, 100, 800)]})).toEqual({left:838, top:730});
  });

  test("keeps the whole 52px mobile control in the visible viewport", () => {
    const mobile = {...geometry, width:52, height:52, bounds:{left:14, top:14, right:376, bottom:486}, preferred:{left:324, top:726}};
    expect(findScrollTopPosition(mobile)).toEqual({left:324, top:434});
    expect(findScrollTopPosition({...mobile, obstacles:[rect(0, 0, 390, 500)]})).toBeNull();
  });

  test("retains a nearby clear slot while blocked, then restores the preferred corner", () => {
    const previous = {left:930, top:650};
    expect(findScrollTopPosition({...geometry, previous, obstacles:[rect(500, 730, 480, 48)]})).toEqual(previous);
    expect(findScrollTopPosition({...geometry, previous})).toEqual(geometry.preferred);
  });
});

describe("one shared back-to-top action across SPARK", () => {
  let frames;
  let nextFrame;
  let resizeCallback;
  let resizeObserver;
  let mutationCallback;
  let mutationObserver;
  const flushFrame = () => act(() => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(callback => callback());
  });
  const addTarget = (tag = "button", bounds = rect(700, 580, 280, 200)) => {
    const target = document.createElement(tag);
    if (tag === "a") target.href = "#practice";
    target.getBoundingClientRect = jest.fn(() => bounds);
    document.body.appendChild(target);
    return target;
  };
  const bottom = button => parseInt(button.style.bottom.match(/calc\((\d+)px/)[1], 10);

  beforeEach(() => {
    frames = new Map();
    nextFrame = 0;
    Object.defineProperties(window, {
      scrollY:{configurable:true, value:0, writable:true},
      innerHeight:{configurable:true, value:800, writable:true},
      innerWidth:{configurable:true, value:1000, writable:true},
      scrollTo:{configurable:true, value:jest.fn()},
      matchMedia:{configurable:true, value:jest.fn().mockReturnValue({matches:false})},
      requestAnimationFrame:{configurable:true, value:jest.fn(callback => {frames.set(++nextFrame, callback); return nextFrame;})},
      cancelAnimationFrame:{configurable:true, value:jest.fn(id => frames.delete(id))},
      visualViewport:{configurable:true, value:undefined, writable:true},
      ResizeObserver:{configurable:true, value:jest.fn(callback => {
        resizeCallback = callback;
        resizeObserver = {observe:jest.fn(), disconnect:jest.fn()};
        return resizeObserver;
      })},
      MutationObserver:{configurable:true, value:jest.fn(callback => {
        mutationCallback = callback;
        mutationObserver = {observe:jest.fn(), disconnect:jest.fn()};
        return mutationObserver;
      })},
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.querySelectorAll("[data-test-obstruction],.app-scroll-panel").forEach(node => node.remove());
    [...document.body.children].filter(node => !node.querySelector(".spark-scroll-top")).forEach(node => node.remove());
  });

  test("is hidden and not keyboard focusable until the viewport scrolls", () => {
    render(<ScrollToTopButton/>);
    const button = screen.getByTitle("Back to top");
    expect(button).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveAttribute("tabindex", "-1");
    window.scrollY = 400;
    fireEvent.scroll(window);
    flushFrame();
    expect(button).toHaveClass("is-visible");
    expect(button).toHaveAttribute("aria-hidden", "false");
    expect(button).toHaveAttribute("tabindex", "0");
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({top:0, behavior:"smooth"});
  });

  test("detects nested lesson scrolling and returns panel and window to top", () => {
    const panel = document.createElement("div");
    panel.className = "app-scroll-panel";
    panel.scrollTo = jest.fn();
    document.body.appendChild(panel);
    render(<ScrollToTopButton/>);
    panel.scrollTop = 480;
    fireEvent.scroll(panel);
    flushFrame();
    fireEvent.click(screen.getByRole("button", {name:"Back to top"}));
    expect(panel.scrollTo).toHaveBeenCalledWith({top:0, behavior:"smooth"});
    expect(window.scrollTo).toHaveBeenCalledWith({top:0, behavior:"smooth"});
  });

  test.each(["button", "a", "input", "select", "textarea"])("automatically clears an unmarked %s and restores its corner afterward", tag => {
    const target = addTarget(tag);
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    const button = screen.getByRole("button", {name:"Back to top"});
    expect(bottom(button)).toBe(234); // button bottom 566, target top 580: 14px clear
    target.getBoundingClientRect.mockReturnValue(rect(30, 580, 280, 200));
    fireEvent.scroll(window);
    flushFrame();
    expect(bottom(button)).toBe(22);
  });

  test("keeps the raised toast offset and honors explicit avoidance containers", () => {
    const target = addTarget("div");
    target.setAttribute("data-avoid-scrolltop", "");
    window.scrollY = 520;
    const {rerender} = render(<ScrollToTopButton raised/>);
    const button = screen.getByRole("button", {name:"Back to top"});
    expect(bottom(button)).toBe(234);
    target.getBoundingClientRect.mockReturnValue(rect(0, 0, 0, 0));
    fireEvent.scroll(window);
    flushFrame();
    expect(bottom(button)).toBe(92);
    rerender(<ScrollToTopButton/>);
    expect(bottom(button)).toBe(22);
  });

  test("measures the glass control and includes computed safe-area insets", () => {
    addTarget();
    const nativeStyle = window.getComputedStyle;
    const computed = jest.spyOn(window, "getComputedStyle").mockImplementation(element => {
      if (!element.classList.contains("spark-scroll-top")) return nativeStyle(element);
      const style = nativeStyle(element);
      style.width = "52px";
      style.height = "52px";
      style.right = "40px";
      style.bottom = `${bottom(element) + 34}px`;
      return style;
    });
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    const button = screen.getByRole("button", {name:"Back to top"});
    expect(bottom(button)).toBe(200);
    expect(800 - (bottom(button) + 34) - 52).toBe(514);
    fireEvent.scroll(window);
    flushFrame();
    expect(bottom(button)).toBe(200); // no cumulative lift from the previous measurement
    computed.mockRestore();
  });

  test("ignores hidden controls and controls clipped out of a nested panel", () => {
    const hidden = addTarget();
    hidden.style.visibility = "hidden";
    const panel = document.createElement("div");
    panel.className = "app-scroll-panel";
    panel.style.overflow = "auto";
    panel.getBoundingClientRect = () => rect(700, 100, 280, 200);
    document.body.appendChild(panel);
    panel.appendChild(addTarget());
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    expect(bottom(screen.getByRole("button", {name:"Back to top"}))).toBe(22);
  });

  test.each([
    ["left", 200, 44, 0, rect(116, 0, 84, 800)],
    ["top", 1000, 0, 40, rect(0, 100, 1000, 700)],
  ])("keeps fallback positions clear of the %s safe area", (_edge, viewportWidth, leftInset, topInset, obstruction) => {
    window.innerWidth = viewportWidth;
    addTarget("button", obstruction);
    const nativeStyle = window.getComputedStyle;
    jest.spyOn(window, "getComputedStyle").mockImplementation(element => {
      const style = nativeStyle(element);
      if (element.classList.contains("spark-scroll-top")) {
        style.setProperty("--scroll-top-safe-left", `${leftInset}px`);
        style.setProperty("--scroll-top-safe-top", `${topInset}px`);
      }
      return style;
    });
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    // The only remaining slot would put the control inside the reserved inset.
    expect(screen.getByTitle("Back to top")).toHaveAttribute("aria-hidden", "true");
  });

  test("rechecks dynamic controls, size changes, and visual viewport changes", () => {
    const viewport = {offsetLeft:0, offsetTop:0, width:390, height:500, addEventListener:jest.fn(), removeEventListener:jest.fn()};
    window.visualViewport = viewport;
    window.innerWidth = 390;
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    const button = screen.getByRole("button", {name:"Back to top"});
    expect(bottom(button)).toBe(314); // completely above the keyboard/visible viewport edge
    const target = addTarget("button", rect(200, 420, 180, 60));
    act(() => mutationCallback([{target, type:"childList"}]));
    flushFrame();
    expect(bottom(button)).toBe(394);
    target.getBoundingClientRect.mockReturnValue(rect(200, 300, 180, 180));
    act(() => resizeCallback());
    flushFrame();
    expect(bottom(button)).toBe(514);
    expect(viewport.addEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(viewport.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  test("coalesces repeated scrolls into one geometry pass and ignores its own style mutations", () => {
    const target = addTarget();
    window.scrollY = 520;
    render(<ScrollToTopButton/>);
    target.getBoundingClientRect.mockClear();
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    fireEvent.resize(window);
    expect(frames.size).toBe(1);
    flushFrame();
    expect(target.getBoundingClientRect).toHaveBeenCalledTimes(1);
    act(() => mutationCallback([{target:screen.getByTitle("Back to top"), type:"attributes"}]));
    expect(frames.size).toBe(0);
  });

  test("honours reduced motion for viewport and nested panels", () => {
    window.matchMedia.mockReturnValue({matches:true});
    window.scrollY = 520;
    const panel = document.createElement("div");
    panel.className = "app-scroll-panel";
    panel.scrollTo = jest.fn();
    document.body.appendChild(panel);
    render(<ScrollToTopButton/>);
    fireEvent.click(screen.getByRole("button", {name:"Back to top"}));
    expect(window.scrollTo).toHaveBeenCalledWith({top:0, behavior:"auto"});
    expect(panel.scrollTo).toHaveBeenCalledWith({top:0, behavior:"auto"});
  });

  test("disconnects observers, event handlers and queued frames on unmount", () => {
    const remove = jest.spyOn(window, "removeEventListener");
    const {unmount} = render(<ScrollToTopButton/>);
    fireEvent.scroll(window);
    const queuedFrame = nextFrame;
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function), {capture:true});
    expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(mutationObserver.disconnect).toHaveBeenCalled();
    expect(resizeObserver.disconnect).toHaveBeenCalled();
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(queuedFrame);
    remove.mockRestore();
  });
});
