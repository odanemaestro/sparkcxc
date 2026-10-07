const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("student recommendation wording", () => {
  test("uses direct student actions instead of internal model jargon", () => {
    const next = read("learning/nextBestActionV2.js");
    const intelligence = read("learning/learnerIntelligenceV2.js");

    expect(next).toContain("Try a short practice on");
    expect(next).toContain("Review ${skill} in the lesson");
    expect(next).toContain("Practise ${skill}");
    expect(next).not.toContain("Build a clearer baseline");
    expect(next).not.toContain("Rebuild ${skill} from the lesson");

    expect(intelligence).toContain('title: "Start with a lesson"');
    expect(intelligence).toContain("Try a short practice on");
    expect(intelligence).not.toContain("Give SPARK a better baseline");
    expect(intelligence).not.toContain("Rebuild ${skillLabel}");
  });
});
