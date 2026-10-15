import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { RibbonTabs } from "./LabFrame";

describe("shared IT Studio ribbon keyboard access", () => {
  test("Arrow keys move through tabs and focus the selected control", () => {
    const onChange = jest.fn();
    const { rerender } = render(<RibbonTabs tabs={["Home","Insert","File"]} active="Home" onChange={onChange}/>);
    const first = screen.getByRole("tab", {name:"Home"});
    first.focus();
    fireEvent.keyDown(first, {key:"ArrowRight"});
    expect(onChange).toHaveBeenCalledWith("Insert");
    expect(screen.getByRole("tab", {name:"Insert"})).toHaveFocus();
    rerender(<RibbonTabs tabs={["Home","Insert","File"]} active="Insert" onChange={onChange}/>);
    fireEvent.keyDown(screen.getByRole("tab", {name:"Insert"}), {key:"End"});
    expect(onChange).toHaveBeenLastCalledWith("File");
  });
  test("uses roving tab index and prevents unintended navigation", () => {
    const onChange = jest.fn();
    render(<RibbonTabs tabs={["Home","Data","Insert"]} active="Data" onChange={onChange}/>);
    expect(screen.getByRole("tab", {name:"Home"}).tabIndex).toBe(-1);
    expect(screen.getByRole("tab", {name:"Data"}).tabIndex).toBe(0);
    fireEvent.keyDown(screen.getByRole("tab", {name:"Data"}), {key:"Escape"});
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole("tab", {name:"Data"}), {key:"Home"});
    expect(onChange).toHaveBeenCalledWith("Home");
  });
});
