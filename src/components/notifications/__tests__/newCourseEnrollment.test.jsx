import React from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import NotificationCenter from "../NotificationCenter";
import StudentSubjectEnrollment from "../../learning/StudentSubjectEnrollment";

const mockFrom = jest.fn();
const mockChannel = jest.fn();

jest.mock("../../../lib/supabaseClient", () => ({
  supabase: {
    from: (...args) => mockFrom(...args),
    channel: (...args) => mockChannel(...args),
    removeChannel: jest.fn(),
  },
}));
jest.mock("../../../lib/pushNotifications", () => ({ setSparkAppBadge: jest.fn() }));
jest.mock("../PushNotificationSettings", () => () => null);

const geography = { id: "geography", name: "CSEC Geography", description: "Explore the Caribbean and the wider world." };
const announcement = {
  id: "course-notice",
  recipient_user_id: "student-1",
  type: "new_course_added",
  title: "New SPARK course: CSEC Geography",
  action_view: "dashboard",
  action_label: "Explore course",
  metadata: { subject_id: "geography" },
};

let query;

beforeEach(() => {
  window.history.replaceState({}, "", "/sparkcxc/#/dashboard");
  window.matchMedia = jest.fn(() => ({ matches: true }));
  Element.prototype.scrollIntoView = jest.fn();
  query = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue({ data: [announcement], error: null }),
    maybeSingle: jest.fn().mockResolvedValue({ data: announcement, error: null }),
    then: resolve => Promise.resolve({ error: null }).then(resolve),
  };
  mockFrom.mockReturnValue(query);
  const channel = { on: jest.fn().mockReturnThis(), subscribe: jest.fn().mockReturnThis() };
  mockChannel.mockReturnValue(channel);
});

function renderEnrollment() {
  const onToggle = jest.fn();
  const view = render(<>
    <NotificationCenter user={{ id: "student-1" }} profile={{ role: "student" }} setView={jest.fn()} />
    <StudentSubjectEnrollment subjects={[geography]} onToggle={onToggle} />
  </>);
  return { ...view, onToggle };
}

test("Explore course opens My Subjects, brings the announced course into view and lets the student enroll", async () => {
  const { container, onToggle } = renderEnrollment();
  fireEvent.click(await screen.findByRole("button", { name: "Notifications, 1 unread" }));
  fireEvent.click(await screen.findByText("Explore course →"));

  await waitFor(() => expect(window.location.hash).toBe("#/dashboard/subjects?subject=geography"));
  const card = container.querySelector('[data-subject-id="geography"]');
  await waitFor(() => expect(card).toHaveClass("is-announced"));
  expect(card.scrollIntoView).toHaveBeenCalled();
  fireEvent.click(within(card).getByRole("button", { name: "Enroll" }));
  expect(onToggle).toHaveBeenCalledWith(geography, true);
  expect(query.update).toHaveBeenCalledWith({ read_at: expect.any(String) });
});

test("a push open resolves an older notification and opens the same enrollment route", async () => {
  window.history.replaceState({}, "", "/sparkcxc/?spark_notification=course-notice#/dashboard");
  query.limit.mockResolvedValue({ data: [], error: null });
  const { container } = renderEnrollment();

  await waitFor(() => expect(window.location.hash).toBe("#/dashboard/subjects?subject=geography"));
  expect(window.location.search).toBe("");
  expect(query.maybeSingle).toHaveBeenCalled();
  await waitFor(() => expect(container.querySelector('[data-subject-id="geography"]')).toHaveClass("is-announced"));
});

test("refreshing My Subjects restores the announced card after the catalogue finishes loading", () => {
  window.history.replaceState({}, "", "/sparkcxc/#/dashboard/subjects?subject=geography");
  const { container, rerender } = render(<StudentSubjectEnrollment subjects={[]} />);
  rerender(<StudentSubjectEnrollment subjects={[geography]} />);
  const card = container.querySelector('[data-subject-id="geography"]');
  expect(card).toHaveClass("is-announced");
  expect(card).toHaveFocus();
  expect(card.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "center" });
});
