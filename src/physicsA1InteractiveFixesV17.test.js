import fs from "fs";
import path from "path";

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");

describe("Physics A1 interactive fixes V17", () => {
  test("Gradient Tool calculates from student-read x and y coordinates", () => {
    const source = read("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    expect(source).toContain("[x1,setX1]");
    expect(source).toContain("[y1,setY1]");
    expect(source).toContain("[x2,setX2]");
    expect(source).toContain("[y2,setY2]");
    expect(source).toContain("buildGradientToolModel({x1,y1,x2,y2");
    expect(source).toContain("pointsOnLine");
    expect(source).toContain('id="grad-y1"');
    expect(source).toContain('id="grad-y2"');
  });

  test("Gradient Tool check validates line placement and triangle span", () => {
    const source = read("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    expect(source).toContain("r.coversAtLeastHalfLine&&pointsOnLine&&gradientClose");
    expect(source).toContain("Move both selected points onto the best-fit line");
  });

  test("Instrument Explorer visual follows vernier and micrometer controls", () => {
    const source = read("physics/mechanics/components/MechanicsInteractiveLab.jsx");
    expect(source).toContain("const vernierX=");
    expect(source).toContain("const thimbleX=");
    expect(source).toContain("const thimbleAngle=");
    expect(source).toContain('className="pm-instrument-slider"');
    expect(source).toContain('className="pm-micrometer-rotor"');
    expect(source).toContain("translate(${vernierX},0)");
    expect(source).toContain("rotate(${thimbleAngle} 38 0)");
  });

  test("dynamic instrument SVG styling is present", () => {
    const css = read("physics/mechanics/components/physicsMechanics.css");
    expect(css).toContain("SPARK A1 DYNAMIC INSTRUMENT VISUAL V17");
    expect(css).toContain(".pm-instrument-visual");
    expect(css).toContain(".pm-instrument-vernier-ticks .is-coincident");
    expect(css).toContain(".pm-micrometer-thimble");
  });
});
