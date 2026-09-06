const fs = require("fs");
const path = require("path");

const selectorSource = fs.readFileSync(path.join(__dirname, "components", "ui", "ThemeSelector.jsx"), "utf8");
const hookSource = fs.readFileSync(path.join(__dirname, "hooks", "useThemeMode.js"), "utf8");
const appSource = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

describe("SPARK V5.3.6I two-state appearance toggle", () => {
  test("appearance control switches directly between light and dark", () => {
    expect(selectorSource).toContain('const nextTheme = currentTheme === "dark" ? "light" : "dark"');
    expect(selectorSource).toContain("onClick={() => onChange(nextTheme)}");
    expect(selectorSource).not.toContain("spark-theme-popover");
    expect(selectorSource).not.toContain("System");
  });

  test("theme storage exposes only explicit light and dark modes", () => {
    expect(hookSource).toContain('Object.freeze(["light", "dark"])');
    expect(hookSource).not.toContain('["system", "light", "dark"]');
  });

  test("mobile menu no longer duplicates the old appearance selector", () => {
    expect(appSource).not.toContain('className="spark-mobile-theme-block"');
  });
});
