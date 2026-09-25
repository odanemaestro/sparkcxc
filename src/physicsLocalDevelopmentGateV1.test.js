const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK Physics local development gate V1", () => {
  test("App passes NODE_ENV into the Physics feature gate", () => {
    const app = read("App.js");
    expect(app).toContain("REACT_APP_ENABLE_PHYSICS: process.env.REACT_APP_ENABLE_PHYSICS");
    expect(app).toContain("NODE_ENV: process.env.NODE_ENV");
  });

  test("explicit Physics flag still wins over the development default", () => {
    const gate = read("physics/mechanics/physicsFeatureGate.mjs");
    expect(gate).toContain('if (explicit === "true") return true');
    expect(gate).toContain('if (explicit === "false") return false');
    expect(gate).toContain('=== "development"');
  });

  test("the example environment documents Physics explicitly", () => {
    const env = fs.readFileSync(path.join(__dirname, "../.env.example"), "utf8");
    expect(env).toContain("REACT_APP_ENABLE_PHYSICS=true");
  });
});
