const fs = require("fs");
const path = require("path");

const files = ["A", "B", "C", "D"]
  .map(letter => path.join(__dirname, "data", "csec2027", `csec-p2027-practice-${letter}.json`))
  .filter(fs.existsSync);

const targets = [
  "AB is a diameter of the circle and angle CAB = 34",
  "line TA is a tangent to the circle at A",
  "angle POQ = 116",
];

function walk(node, callback) {
  if (Array.isArray(node)) return node.forEach(x => walk(x, callback));
  if (!node || typeof node !== "object") return;
  callback(node);
  Object.values(node).forEach(x => walk(x, callback));
}

describe("SPARK V5.3.9E 2027 circle diagram viewport repair", () => {
  test("the three affected circle diagrams use padded SVG viewBoxes", () => {
    const found = [];

    files.forEach(file => {
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      walk(data, obj => {
        const prompt = String(obj.prompt || obj.text || "");
        if (!obj.diagram?.svg) return;
        targets.forEach(target => {
          if (prompt.includes(target)) found.push(obj.diagram.svg);
        });
      });
    });

    expect(found).toHaveLength(3);
    found.forEach(svg => {
      expect(svg).toContain('data-spark-viewbox-fix="v5.3.9E"');
      const m = svg.match(/viewBox="(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/);
      expect(m).not.toBeNull();
      expect(Number(m[1])).toBeLessThan(0);
      expect(Number(m[2])).toBeLessThan(0);
    });
  });
});
