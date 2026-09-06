const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data", "csec2027");
const targetFragments = [
  "AB is a diameter of the circle and angle CAB = 34",
  "line TA is a tangent to the circle at A",
  "angle POQ = 116",
];

function n(tag, name) {
  const m = tag.match(new RegExp(`${name}="(-?\\d+(?:\\.\\d+)?)"`));
  return m ? Number(m[1]) : null;
}

function circles(svg) {
  const found = [];
  const stack = [{ x: 0, y: 0 }];
  const re = /<g\b[^>]*>|<\/g>|<circle\b[^>]*\/?\s*>/g;
  let match;
  while ((match = re.exec(svg))) {
    const tag = match[0];
    if (tag.startsWith("</g")) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (tag.startsWith("<g")) {
      const parent = stack[stack.length - 1];
      const tr = tag.match(/transform="translate\(\s*(-?\d+(?:\.\d+)?)\s*(?:,|\s)\s*(-?\d+(?:\.\d+)?)\s*\)"/);
      stack.push({ x: parent.x + (tr ? Number(tr[1]) : 0), y: parent.y + (tr ? Number(tr[2]) : 0) });
      continue;
    }
    const offset = stack[stack.length - 1];
    const cx = n(tag, "cx"); const cy = n(tag, "cy"); const r = n(tag, "r");
    if ([cx, cy, r].every(Number.isFinite)) found.push({ cx: cx + offset.x, cy: cy + offset.y, r });
  }
  return found;
}

function viewBox(svg) {
  const m = svg.match(/viewBox="(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)"/);
  return m ? m.slice(1).map(Number) : null;
}

function allParts(value, out = []) {
  if (Array.isArray(value)) value.forEach(item => allParts(item, out));
  else if (value && typeof value === "object") {
    if (typeof value.prompt === "string" && value.diagram?.svg) out.push(value);
    Object.values(value).forEach(item => allParts(item, out));
  }
  return out;
}

test("2027 circle diagrams contain the full circumference inside their viewBox", () => {
  const parts = [];
  for (const letter of ["A", "B", "C", "D"]) {
    const file = path.join(dataDir, `csec-p2027-practice-${letter}.json`);
    parts.push(...allParts(JSON.parse(fs.readFileSync(file, "utf8"))));
  }
  const targets = targetFragments.map(fragment => parts.find(part => part.prompt.includes(fragment)));
  expect(targets.every(Boolean)).toBe(true);
  targets.forEach(part => {
    const box = viewBox(part.diagram.svg);
    expect(box).not.toBeNull();
    const [x, y, w, h] = box;
    const cs = circles(part.diagram.svg);
    expect(cs.length).toBeGreaterThan(0);
    cs.forEach(c => {
      expect(c.cx - c.r).toBeGreaterThanOrEqual(x - 0.01);
      expect(c.cy - c.r).toBeGreaterThanOrEqual(y - 0.01);
      expect(c.cx + c.r).toBeLessThanOrEqual(x + w + 0.01);
      expect(c.cy + c.r).toBeLessThanOrEqual(y + h + 0.01);
    });
  });
});

test("2027 SVG wrappers do not clip diagram overflow", () => {
  const css = fs.readFileSync(path.join(__dirname, "practiceExam.css"), "utf8");
  expect(css).toContain("SPARK V5.3.9F 2027 diagram safety");
  expect(css).toMatch(/\.paper2027-diagram\s+svg[\s\S]*overflow:\s*visible\s*!important/);
});
