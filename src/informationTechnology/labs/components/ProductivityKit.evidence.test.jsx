/** @jest-environment jsdom */
import { act, renderHook } from "@testing-library/react";
import { useTaskEvidence } from "./ProductivityKit";
import { labEvidenceKey } from "../models/labEvidence.mjs";

test("restores demonstrated IT lab skills after workspace remount", () => {
  const userId = "regression-evidence-user";
  const key = labEvidenceKey(userId, "programming");
  window.localStorage.removeItem(key);
  const first = renderHook(() => useTaskEvidence(userId, "programming"));
  act(() => first.result.current.record("selection-run"));
  expect(first.result.current.evidence.has("selection-run")).toBe(true);
  first.unmount();
  const recovered = renderHook(() => useTaskEvidence(userId, "programming"));
  expect(recovered.result.current.evidence.has("selection-run")).toBe(true);
  recovered.unmount();
  window.localStorage.removeItem(key);
});
