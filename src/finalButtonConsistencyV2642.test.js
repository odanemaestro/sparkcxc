const fs = require("fs");
const path = require("path");

function read(rel) {
  return fs.readFileSync(path.join(__dirname, rel), "utf8");
}

describe("SPARK final semantic button consistency V2.6.4.2", () => {
  test("Btn forwards semantic action attributes to the DOM", () => {
    const source = read("components/ui/Btn.jsx");
    expect(source).toContain('action = null');
    expect(source).toContain('data-spark-action={action || undefined}');
  });

  test("Reveal model answer uses solid navy semantic action", () => {
    const source = read("App.js");

    // Verify the semantic role on the actual Reveal button without coupling
    // the regression to JSX whitespace/layout formatting.
    expect(source).toContain(
      '<Btn v="outline" action="exam" onClick={() => revealModelAnswer(qi)}>'
    );
    expect(source).toContain("Reveal model answer");
  });

  test("Previous topic uses soft navy navigation semantics", () => {
    const source = read("App.js");
    expect(source).toMatch(
      /<button\s+data-spark-action="nav"[^>]*>[\s\S]*?Previous topic/
    );
  });

  test("review modal uses soft navy Cancel and green Publish review", () => {
    const source = read("App.js");
    expect(source).toContain('className="cp-btn cp-btn-secondary" data-spark-action="nav" onClick={onClose}>Cancel</button>');
    expect(source).toContain('className="cp-btn cp-btn-primary" data-spark-action="forward" onClick={submit}');
  });

  test("keep actions use the same soft-green preservation family", () => {
    const source = read("App.js");
    expect(source).toContain('action="forward-secondary" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep booking</Btn>');
    expect(source).toContain('action="forward-secondary" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep pending</Btn>');
    expect(source).toContain('action="forward-secondary" onClick={onClose} style={{flex:1,justifyContent:"center"}}>Keep session</Btn>');
  });

  test("destructive booking actions remain red and are not reclassified", () => {
    const source = read("App.js");
    expect(source).toContain('background:T.red');
    expect(source).toContain('"Cancel session"');
    expect(source).toContain('"Decline booking"');
  });

  test("final semantic stylesheet is loaded after the theme styles", () => {
    const source = read("App.js");
    const theme = source.indexOf('import "./theme.css";');
    const finalButtons = source.indexOf('import "./sparkFinalButtonConsistencyV2642.css";');
    expect(theme).toBeGreaterThanOrEqual(0);
    expect(finalButtons).toBeGreaterThan(theme);
  });
});
