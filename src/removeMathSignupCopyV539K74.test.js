const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.9K7.4 auth copy", () => {
  test("signup no longer says Start with Mathematics", () => {
    expect(app).not.toContain("Start with Mathematics.");
    expect(app).not.toContain("Start with Mathematics — free.");
  });

  test("login keeps its useful subtitle", () => {
    expect(app).toContain("Log in to continue studying.");
  });

  test("signup heading remains", () => {
    expect(app).toContain("Create your account");
  });
});
