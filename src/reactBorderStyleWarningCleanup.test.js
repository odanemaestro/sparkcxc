const fs = require("fs");
const path = require("path");

describe("SPARK React border style warning cleanup", () => {
  const app = fs.readFileSync(path.join(__dirname,"App.js"),"utf8");

  test("custom Btn and Card overrides do not mix border shorthand with borderColor", () => {
    expect(app).not.toContain('borderColor:"rgba(255,255,255,.25)"');
    expect(app).not.toContain("background:T.red,borderColor:T.red");
    expect(app).not.toContain("color:T.red,borderColor:T.red");
    expect(app).not.toContain("background: T.tealLight, borderColor: T.teal");
    expect(app).not.toContain("background: T.amberLight, borderColor: T.amber");
  });

  test("focus handlers update border shorthand instead of borderColor", () => {
    expect(app).not.toContain("style.borderColor");
    expect(app).toContain('style.border=`1.5px solid ${T.teal}`');
    expect(app).toContain('style.border = `1.5px solid ${error ? T.red : T.teal}`');
  });

  test("destructive primary actions stay visually red", () => {
    expect(app).toContain("background:T.red");
    expect(app).toContain('border:`1.5px solid ${T.red}`');
  });

  test("logout outline preserves its light border", () => {
    expect(app).toContain('border:"1.5px solid rgba(255,255,255,.25)"');
  });
});