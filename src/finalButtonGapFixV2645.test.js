const fs = require("fs");
const path = require("path");

function read(rel) {
  return fs.readFileSync(path.join(__dirname, rel), "utf8");
}

describe("SPARK final button gap fix V2.6.4.5", () => {
  test("booking modal Cancel carries nav semantics", () => {
    const source = read("App.js");
    const send = source.indexOf("Send booking request");
    expect(send).toBeGreaterThanOrEqual(0);

    const handler = source.lastIndexOf("setBookingTutor(null)", send);
    expect(handler).toBeGreaterThanOrEqual(0);

    const start = source.lastIndexOf("<Btn", handler);
    const end = source.indexOf("</Btn>", handler);
    const block = source.slice(start, end + 6);

    expect(block).toContain('action="nav"');
    expect(block).toContain("Cancel");
  });

  test("Submit report carries forward semantics", () => {
    const source = read("components/ui/ReportQuestionButton.jsx");
    const handler = source.indexOf("onClick={handleSubmit}");
    expect(handler).toBeGreaterThanOrEqual(0);

    const start = source.lastIndexOf("<button", handler);
    const end = source.indexOf("</button>", handler);
    const block = source.slice(start, end + 9);

    expect(block).toContain('data-spark-action="forward"');
    expect(block).toContain("Submit report");
  });

  test("question-report Cancel carries nav semantics", () => {
    const source = read("components/ui/ReportQuestionButton.jsx");
    const matches = [];
    let cursor = 0;

    while (true) {
      const handler = source.indexOf("onClick={reset}", cursor);
      if (handler < 0) break;
      const start = source.lastIndexOf("<button", handler);
      const end = source.indexOf("</button>", handler);
      matches.push(source.slice(start, end + 9));
      cursor = handler + 1;
    }

    const cancel = matches.find(block => />\s*Cancel\s*<\/button>/.test(block));
    expect(cancel).toBeTruthy();
    expect(cancel).toContain('data-spark-action="nav"');
  });

  test("solid-green semantic actions force white text", () => {
    const candidates = [
      "sparkFinalButtonConsistencyV2642.css",
      "sparkStudyPracticeConsistencyV261.css",
    ];
    const css = candidates
      .filter(rel => fs.existsSync(path.join(__dirname, rel)))
      .map(read)
      .join("\n");

    expect(css).toMatch(
      /\[data-spark-action="forward"\][\s\S]*color:\s*#fff\s*!important/
    );
  });
});
