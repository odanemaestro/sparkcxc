const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.9D UTF-8 source integrity", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

  test("common mojibake sequences are absent from App.js", () => {
    ["Â·", "Â°", "â†’", "âœ", "ðŸ"].forEach(token => {
      expect(app).not.toContain(token);
    });
  });

  test("dashboard and subject actions use the intended Unicode characters", () => {
    expect(app).toContain("Continue studying →");
    expect(app).toContain("Open subject →");
    expect(app).toContain(" · ");
  });
});
