const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.6A profile photo chrome", () => {
  test("normal profile photos never render the floating remove X", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    expect(app).not.toContain('className="profile-photo-remove"');
    expect(app).toContain('className="profile-photo-trigger"');
    expect(app).not.toContain('className="profile-photo-camera"');
    expect(app).toContain('data-tooltip={disabled ? "Profile photo is loading" : localPath ? "Change profile photo" : "Add profile photo"}');
  });

  test("photo removal remains available in the explicit profile editing controls", () => {
    const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");
    expect(app).toContain("onClick={removePhoto}");
    expect(app).toMatch(/onClick=\{removePhoto\}[\s\S]*?>\s*Remove\s*<\/button>/);
  });
});