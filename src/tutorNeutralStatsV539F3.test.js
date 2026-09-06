const fs = require("fs");
const path = require("path");

describe("SPARK V5.3.9F3 tutor dashboard neutral stats", () => {
  const app = fs.readFileSync(path.join(__dirname, "App.js"), "utf8");

  test("tutor overview stat cards use the same neutral Card treatment", () => {
    const start = app.indexOf('[["Upcoming sessions",upcomingSessions.length]');
    expect(start).toBeGreaterThan(-1);

    const end = app.indexOf("))}", start);
    expect(end).toBeGreaterThan(start);

    const block = app.slice(start, end + 3);

    expect(block).toMatch(/\["Total students"\s*,\s*uniqueStudents\.length\]/);
    expect(block).toMatch(/\["Sessions booked"\s*,\s*bookings\.length\]/);
    expect(block).toMatch(/\["Status"\s*,\s*tutorRow\?\.verified\s*\?\s*"Verified\s*✓"\s*:\s*"Pending"\]/);

    // V5.3.9G1 added a semantic class hook to the already-neutral Card.
    // The old F3 test required an exact tag with no className, which became stale.
    expect(block).toMatch(/<Card\s+key=\{label\}[^>]*className="tutor-dashboard-stat-card"[^>]*>/);
    expect(block).toMatch(/fontSize\s*:\s*24\s*,\s*fontWeight\s*:\s*700\s*,\s*color\s*:\s*T\.ink/);

    expect(block).not.toMatch(/borderTop\s*:/);
    expect(block).not.toMatch(/T\.(teal|purple|amber|emerald)/);
  });
});
