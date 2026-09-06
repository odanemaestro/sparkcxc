const fs = require("fs");
const path = require("path");

test("notification centre visually identifies existing-type 2027 notifications", () => {
  const source = fs.readFileSync(path.join(__dirname, "components", "notifications", "NotificationCenter.jsx"), "utf8");
  expect(source).toContain("function notificationTypeMeta(notification)");
  expect(source).toContain('metadata?.format === "2027"');
  expect(source).toContain('icon: "27"');
  expect(source).toContain("const meta = notificationTypeMeta(notification);");
});
