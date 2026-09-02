import { friendlyErrorMessage } from "./errorMessages";

describe("friendlyErrorMessage", () => {
  test("hides Postgres NOT NULL details", () => {
    const message = friendlyErrorMessage({
      code: "23502",
      message: 'null value in column "tutor_id" of relation "notifications" violates not-null constraint',
    });
    expect(message).toBe("We couldn't save your changes. Please try again. If the problem continues, contact support.");
    expect(message).not.toMatch(/tutor_id|notifications|not-null/i);
  });

  test("uses an action-specific fallback for an internal booking error", () => {
    const message = friendlyErrorMessage(
      { code: "23502", message: 'null value in column "tutor_id" violates not-null constraint' },
      "We couldn't confirm this booking. Please try again."
    );
    expect(message).toBe("We couldn't confirm this booking. Please try again.");
  });

  test("keeps useful business-rule messages", () => {
    expect(friendlyErrorMessage({ message: "Only a pending booking can be confirmed" }))
      .toBe("This booking has already been updated. Refresh your sessions and try again.");
  });
});
