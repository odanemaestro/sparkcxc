import {
  saveTutorVerificationHandoff,
  loadTutorVerificationHandoff,
  clearTutorVerificationHandoff,
  tutorVerificationHandoffMatchesUser,
} from "../tutorVerificationHandoff";

describe("SPARK tutor verification handoff", () => {
  beforeEach(() => localStorage.clear());

  test("stores only identity handoff data", () => {
    expect(saveTutorVerificationHandoff({ email: " Tutor@Example.com ", userId: "u1" })).toBe(true);
    const value = loadTutorVerificationHandoff();
    expect(value.email).toBe("tutor@example.com");
    expect(value.userId).toBe("u1");
    expect(JSON.stringify(value)).not.toMatch(/password/i);
  });

  test("matches both authenticated user id and email", () => {
    saveTutorVerificationHandoff({ email: "tutor@example.com", userId: "u1" });
    const value = loadTutorVerificationHandoff();
    expect(tutorVerificationHandoffMatchesUser(value, { id: "u1", email: "TUTOR@example.com" })).toBe(true);
    expect(tutorVerificationHandoffMatchesUser(value, { id: "u2", email: "tutor@example.com" })).toBe(false);
    expect(tutorVerificationHandoffMatchesUser(value, { id: "u1", email: "other@example.com" })).toBe(false);
  });

  test("clear removes the handoff", () => {
    saveTutorVerificationHandoff({ email: "tutor@example.com", userId: "u1" });
    clearTutorVerificationHandoff();
    expect(loadTutorVerificationHandoff()).toBeNull();
  });
});
