import {
  saveTutorVerificationHandoff,
  loadTutorVerificationHandoff,
  clearTutorVerificationHandoff,
  tutorVerificationHandoffMatchesUser,
} from "../tutorVerificationHandoff";

describe("SPARK Tutor verification handoff", () => {
  beforeEach(() => localStorage.clear());

  test("stores only identity and verification-stage data", () => {
    expect(saveTutorVerificationHandoff({
      email: " Tutor@Example.com ",
      userId: "u1",
      stage: "pre_application",
    })).toBe(true);

    const value = loadTutorVerificationHandoff();
    expect(value.email).toBe("tutor@example.com");
    expect(value.userId).toBe("u1");
    expect(value.stage).toBe("pre_application");
    expect(JSON.stringify(value)).not.toMatch(/password/i);
    expect(JSON.stringify(value)).not.toMatch(/bio|quals|experience|availability/i);
  });

  test("legacy stage-less records remain resumable as submit_application", () => {
    localStorage.setItem("spark_tutor_verification_handoff_v1", JSON.stringify({
      email: "legacy@example.com",
      userId: "legacy-user",
      createdAt: Date.now(),
    }));

    expect(loadTutorVerificationHandoff()?.stage).toBe("submit_application");
  });

  test("invalid stages are normalized to the safe legacy stage", () => {
    saveTutorVerificationHandoff({
      email: "tutor@example.com",
      userId: "u1",
      stage: "anything-else",
    });

    expect(loadTutorVerificationHandoff()?.stage).toBe("submit_application");
  });

  test("matches both authenticated user id and email", () => {
    saveTutorVerificationHandoff({
      email: "tutor@example.com",
      userId: "u1",
      stage: "pre_application",
    });

    const value = loadTutorVerificationHandoff();
    expect(tutorVerificationHandoffMatchesUser(value, {
      id: "u1",
      email: "TUTOR@example.com",
    })).toBe(true);

    expect(tutorVerificationHandoffMatchesUser(value, {
      id: "u2",
      email: "tutor@example.com",
    })).toBe(false);

    expect(tutorVerificationHandoffMatchesUser(value, {
      id: "u1",
      email: "other@example.com",
    })).toBe(false);
  });

  test("clear removes the handoff", () => {
    saveTutorVerificationHandoff({
      email: "tutor@example.com",
      userId: "u1",
      stage: "pre_application",
    });
    clearTutorVerificationHandoff();
    expect(loadTutorVerificationHandoff()).toBeNull();
  });
});
