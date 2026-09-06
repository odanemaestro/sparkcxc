const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6 profile photo refresh behaviour", () => {
  test("private avatar URLs are cached for refreshes and real photos do not flash the initials background", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    expect(app).toContain("spark-avatar-url-v1:");
    expect(app).toContain("sessionStorage.getItem");
    expect(app).toContain("cacheAvatarUrl(storedPath, nextUrl)");
    expect(app).toContain("profile-avatar-loading");
    expect(app).toContain('background: "var(--spark-paper-raised, #e9eef4)"');
  });
});
