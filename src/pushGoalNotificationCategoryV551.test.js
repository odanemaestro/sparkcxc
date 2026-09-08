const fs = require("fs");
const path = require("path");

describe("SPARK V5.5.1 goal push notification category", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "supabase", "functions", "send-push", "index.ts"),
    "utf8"
  );

  test("goal suggestion notifications respect Learning progress push preferences", () => {
    expect(source).toContain('"goal_suggested"');
    expect(source).toContain('"goal_suggestion_response"');
    expect(source).toContain('if (LEARNING_TYPES.has(type)) return "learning_progress"');
  });
});
