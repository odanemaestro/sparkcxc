import { countTextMatches, replaceTextMatches } from "./documentModel.mjs";

describe("word-processing document helpers", () => {
  test("counts matches without treating case as different text", () => {
    expect(countTextMatches("Club members join the club. CLUB!", "club")).toBe(3);
  });

  test("does not count an empty search", () => {
    expect(countTextMatches("Technology Club", "  ")).toBe(0);
  });

  test("replaces all matches and reports the exact count", () => {
    expect(replaceTextMatches("Club and club", "club", "society")).toEqual({ text: "society and society", replaced: 2 });
  });

  test("can replace only the first match", () => {
    expect(replaceTextMatches("club club", "club", "group", false)).toEqual({ text: "group club", replaced: 1 });
  });
});