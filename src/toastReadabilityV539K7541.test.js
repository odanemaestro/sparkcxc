const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9K7.5.4.1 toast readability", () => {
  test("normal informational toasts stay for six seconds", () => {
    expect(app).toContain("SPARK_K7541_READABLE_TOAST_DURATION");
    expect(app).toContain(": 6000;");
  });

  test("warnings stay seven seconds and errors stay eight seconds", () => {
    expect(app).toContain("? 8000");
    expect(app).toContain("? 7000");
  });

  test("custom duration is supported and safely clamped", () => {
    expect(app).toContain("const requestedDuration =");
    expect(app).toContain("Math.min(15000, Math.max(2500, requestedDuration))");
  });

  test("Tutor email-verification message stays eight seconds", () => {
    expect(app).toContain("SPARK_K7541_TUTOR_VERIFICATION_TOAST");
    expect(app).toContain('message: "Account created. Verify your email to finish submitting your tutor application."');
    expect(app).toContain("duration: 8000");
  });

  test("manual dismissal remains available", () => {
    expect(app).toContain("const dismissToast = useCallback(() => {");
    expect(app).toContain("<Toast msg={toast} onDismiss={dismissToast}/>");
  });

  test("current Tutor lifecycle protections remain installed", () => {
    expect(app).toContain("SPARK_K755_VERIFY_BEFORE_APPLICATION");
    expect(app).toContain("SPARK V5.3.9K7.5 tutor verification route handoff");
  });
});
