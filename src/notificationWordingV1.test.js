const fs = require("fs");
const path = require("path");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("SPARK notification wording V1", () => {
  test("notification settings use Notifications wording consistently", () => {
    const settings = read("components/notifications/PushNotificationSettings.jsx");
    expect(settings).toContain("<h3>Notifications</h3>");
    expect(settings).toContain("Notifications are being prepared");
    expect(settings).toContain('label="Allow notifications"');
    expect(settings.toLowerCase()).not.toContain("phone notifications");
  });

  test("app privacy copy no longer calls the feature phone notifications", () => {
    const app = read("App.js");
    expect(app.toLowerCase()).not.toContain("phone notifications");
  });
});
