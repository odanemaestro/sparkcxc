import { getNotificationRoute } from "../notificationRouting";

describe("notification routing", () => {
  test.each([
    "booking_created",
    "booking_cancelled",
    "booking_rescheduled",
  ])("tutor booking notification %s opens My sessions", (type) => {
    const route = getNotificationRoute({ type, booking_id: "b1", tutor_id: "t1", action_label: "View booking" }, "tutor");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { section: "sessions", bookingId: "b1" } });
  });

  test.each([
    "booking_confirmed",
    "booking_declined",
    "booking_cancelled_by_tutor",
    "booking_rescheduled",
    "session_completed",
  ])("student booking notification %s opens My bookings", (type) => {
    const route = getNotificationRoute({ type, booking_id: "b2", student_id: "s1", action_label: "View booking" }, "student");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { section: "bookings", bookingId: "b2" } });
  });

  test.each(["paper1_completed", "paper2_completed"])("%s opens student progress", (type) => {
    const route = getNotificationRoute({ type, action_view: "dashboard", action_label: "View progress" }, "student");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { section: "progress", anchor: "student-progress" } });
  });

  test.each(["child_paper1_completed", "child_paper2_completed"])("%s opens the child's exam results", (type) => {
    const route = getNotificationRoute({ type, metadata: { student_id: "s2", attempt_key: "a1" } }, "parent");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { scope: "parent", studentId: "s2", attemptKey: "a1", anchor: "parent-exam-results" } });
  });

  test("parent booking update opens the correct child's booking area", () => {
    const route = getNotificationRoute({ type: "booking_confirmed", booking_id: "b3", action_label: "View progress", metadata: { student_id: "s3" } }, "parent");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { scope: "parent", studentId: "s3", bookingId: "b3", anchor: "parent-booking" } });
  });

  test("family request opens the student request card", () => {
    const route = getNotificationRoute({ type: "family_link_request", metadata: { link_id: "l1" } }, "student");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { section: "overview", linkId: "l1", anchor: "family-request" } });
  });

  test("family update selects the linked child on the parent dashboard", () => {
    const route = getNotificationRoute({ type: "family_link_update", metadata: { student_id: "s4" } }, "parent");
    expect(route).toMatchObject({ view: "dashboard", dashboardTarget: { scope: "parent", studentId: "s4", anchor: "parent-family" } });
  });

  test("tutor application notification always opens the application page", () => {
    const route = getNotificationRoute({ type: "tutor_application_update", action_view: "dashboard" }, "tutor");
    expect(route).toEqual({ view: "become-tutor", dashboardTarget: null });
  });

  test("unknown notification honors an explicit action view", () => {
    expect(getNotificationRoute({ type: "other", action_view: "tutors" }, "student")).toEqual({ view: "tutors", dashboardTarget: null });
  });
});
