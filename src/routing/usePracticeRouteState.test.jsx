/** @jest-environment jsdom */
import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { usePracticeRouteState } from "./usePracticeRouteState";
import { useMathPracticeRoute } from "./sparkRoutingV270";

function Library({ subject = "principles-of-accounts", path }) {
  const [mode, setMode] = usePracticeRouteState(subject, "view", "home", {
    path, decode: raw => ["home", "library", "exam"].includes(raw) ? raw : "home",
  });
  const [source, setSource] = usePracticeRouteState(subject, "source", null, {
    path, decode: raw => ["paper-a", "paper-b"].includes(raw) ? raw : null, replace: true,
  });
  return <><output>{mode}:{source || "none"}</output>
    <button onClick={() => setMode("library")}>Library</button>
    <button onClick={() => { setSource("paper-b"); setMode("exam"); }}>Open paper</button>
    <button onClick={() => setMode("home")}>Home</button></>;
}
const navigate = hash => act(() => {
  window.history.replaceState(null, "", hash);
  window.dispatchEvent(new PopStateEvent("popstate"));
});
beforeEach(() => window.history.replaceState(null, "", "/#/practice/principles-of-accounts"));

test("a selected exam survives a cold remount without exposing attempt data in its URL", () => {
  const first = render(<Library/>);
  fireEvent.click(screen.getByText("Library"));
  fireEvent.click(screen.getByText("Open paper"));
  expect(screen.getByRole("status")).toHaveTextContent("exam:paper-b");
  expect(window.location.hash).toContain("source=paper-b");
  expect(window.location.hash).toContain("view=exam");
  const hash = window.location.hash;
  first.unmount();
  render(<Library/>);
  expect(screen.getByRole("status")).toHaveTextContent("exam:paper-b");
  expect(window.location.hash).toBe(hash);
});

test("Back and Forward route events update all selections and Home clears its mode", () => {
  render(<Library/>);
  fireEvent.click(screen.getByText("Open paper"));
  const examHash = window.location.hash;
  navigate("#/practice/principles-of-accounts?view=library&source=paper-a");
  expect(screen.getByRole("status")).toHaveTextContent("library:paper-a");
  navigate(examHash);
  expect(screen.getByRole("status")).toHaveTextContent("exam:paper-b");
  fireEvent.click(screen.getByText("Home"));
  expect(window.location.hash).not.toContain("view=");
  expect(screen.getByRole("status")).toHaveTextContent("home:paper-b");
});

test("unrecognized navigation IDs safely fall back without opening a different paper", () => {
  navigate("#/practice/principles-of-accounts?view=unknown&source=not-a-paper");
  render(<Library/>);
  expect(screen.getByRole("status")).toHaveTextContent("home:none");
});

test("nested exam libraries preserve existing route parameters across refresh", () => {
  navigate("#/practice/physics/paper-1?view=library&topic=A5");
  const first = render(<Library subject="physics" path="/practice/physics/paper-1"/>);
  fireEvent.click(screen.getByText("Open paper"));
  expect(window.location.hash).toContain("topic=A5");
  first.unmount();
  render(<Library subject="physics" path="/practice/physics/paper-1"/>);
  expect(screen.getByRole("status")).toHaveTextContent("exam:paper-b");
});

function MathLocation() {
  const { mode, examIntent, setExamIntent, setMode } = useMathPracticeRoute(true);
  return <><output>{mode}:{examIntent}</output><button onClick={() => {
    setExamIntent("new"); setMode("paper1");
  }}>New Math paper</button></>;
}
test("new-paper intent is one shot while a refresh resumes the saved attempt", () => {
  navigate("#/practice/mathematics");
  const first = render(<MathLocation/>);
  fireEvent.click(screen.getByText("New Math paper"));
  expect(screen.getByRole("status")).toHaveTextContent("paper1:new");
  expect(window.location.hash).toContain("intent=resume");
  first.unmount();
  render(<MathLocation/>);
  expect(screen.getByRole("status")).toHaveTextContent("paper1:resume");
});

test.each([["paper-1", "paper1"], ["paper-2", "paper2"], ["adaptive", "adaptive"], ["2027", "2027"]])(
  "Math nested %s URLs restore their intended page", (suffix, mode) => {
    navigate(`#/practice/mathematics/${suffix}?intent=new&paper=sample`);
    render(<MathLocation/>);
    expect(screen.getByRole("status")).toHaveTextContent(`${mode}:resume`);
    expect(window.location.hash).toContain(`mode=${mode}`);
    expect(window.location.hash).toContain("paper=sample");
  }
);
