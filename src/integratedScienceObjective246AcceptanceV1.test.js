const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921060000_integrated_science_objective_246.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ArtificialLightingExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","artificialLightingExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.6 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.6", () => {
    expect(migration).toContain('"objective":"2.4.6"');
    expect(migration).toContain("2.4.6 Artificial Sources of Light");
  });

  test("compares filament fluorescent CFL and LED sources", () => {
    expect(migration).toContain("Filament lamps");
    expect(migration).toContain("Fluorescent tubes and CFLs");
    expect(migration).toContain("LED lamps");
    expect(explorer).toContain("Compare sources");
  });

  test("covers filament inefficiency and tungsten", () => {
    expect(migration).toContain("about 10% becomes useful light");
    expect(migration).toContain("tungsten filament");
    expect(explorer).toContain("Tungsten filament");
  });

  test("covers point and extended source shadows", () => {
    expect(migration).toContain("extended source");
    expect(migration).toContain("penumbra");
    expect(migration).toContain("point source produces a sharp shadow");
    expect(explorer).toContain("Point source");
    expect(explorer).toContain("Extended source");
  });

  test("covers daylight colour and dimming", () => {
    expect(migration).toContain("daylight fluorescent tube");
    expect(migration).toContain("simple compatible dimmer");
    expect(explorer).toContain("DAYLIGHT FLUORESCENT");
    expect(explorer).toContain("Dimming");
  });

  test("covers mercury disposal", () => {
    expect(migration).toContain("small amount of mercury");
    expect(migration).toContain("lamp-recycling or hazardous-waste");
    expect(explorer).toContain("Contain a small amount of mercury");
  });

  test("covers LED lifetime-cost advantage", () => {
    expect(migration).toContain("cheaper over time");
    expect(migration).toContain("51 kWh");
    expect(explorer).toContain("Lifetime cost");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"artificial-lighting"');
    expect(view).toContain("ArtificialLightingExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-one audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":61');
    expect(migration).toContain('"objectivesBuilt":61');
  });
});
