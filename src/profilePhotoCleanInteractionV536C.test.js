const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6C clean profile photo interaction", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
  const theme = fs.readFileSync(path.join(__dirname, "theme.css"), "utf8");

  test("profile image is clean with no floating camera or browser title tooltip", () => {
    expect(app).not.toContain('className="profile-photo-camera"');
    expect(app).not.toContain('title={disabled ? "Profile photo is loading"');
    expect(app).toContain('data-tooltip={disabled ? "Profile photo is loading" : localPath ? "Change profile photo" : "Add profile photo"}');
    expect(app).toContain('aria-label={localPath ? "Change profile photo" : "Add profile photo"}');
  });

  test("custom tooltip is styled without changing avatar layout", () => {
    expect(theme).toContain("SPARK CLEAN PROFILE PHOTO INTERACTION V5.3.6C");
    expect(theme).toContain(".profile-photo-trigger::after");
    expect(theme).toContain("content:attr(data-tooltip)");
    expect(theme).toContain("@media (hover:hover) and (pointer:fine)");
    expect(theme).toContain("@media (hover:none), (pointer:coarse)");
  });
});
