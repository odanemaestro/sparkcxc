import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

test("rerendering a dialog preserves its focused control and Escape uses the latest close callback", () => {
  jest.useFakeTimers();
  const originalClose = jest.fn();
  const latestClose = jest.fn();
  const content = (close) => <>
    <button type="button">Open examination dialog</button>
    {close && <Modal onClose={close}><button type="button">Keep working</button><button type="button">Submit paper</button></Modal>}
  </>;
  const view = render(content(null));
  const opener = screen.getByRole("button", { name: "Open examination dialog" });
  opener.focus();
  view.rerender(content(originalClose));
  act(() => jest.advanceTimersByTime(20));
  expect(screen.getByRole("dialog")).toHaveFocus();
  const keepWorking = screen.getByRole("button", { name: "Keep working" });
  keepWorking.focus();

  // Exam clocks rerender their confirmation with a new callback every second.
  view.rerender(content(latestClose));
  expect(keepWorking).toHaveFocus();
  act(() => jest.advanceTimersByTime(1000));
  expect(keepWorking).toHaveFocus();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(originalClose).not.toHaveBeenCalled();
  expect(latestClose).toHaveBeenCalledTimes(1);

  view.rerender(content(null));
  expect(opener).toHaveFocus();
  view.unmount();
  jest.useRealTimers();
});
