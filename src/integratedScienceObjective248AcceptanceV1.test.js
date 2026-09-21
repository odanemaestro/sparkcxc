const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921061000_integrated_science_objective_248.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","ElectricalHazardsExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","electricalHazardsExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.8 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.8", () => {
    expect(migration).toContain('"objective":"2.4.8"');
    expect(migration).toContain("2.4.8 Electrical Hazards");
  });

  test("covers overhead lines and illegal connections", () => {
    expect(migration).toContain("Kites should never be flown near overhead power lines");
    expect(migration).toContain("Long metal poles");
    expect(migration).toContain("Illegal or improvised connections");
    expect(explorer).toContain("Overhead power lines");
    expect(explorer).toContain("Illegal connections");
  });

  test("renders visual scenes for common electrical hazards", () => {
    [
      "spark-hazard-scene-svg",
      "ehz-kite",
      "ehz-ladder",
      "ehz-hand",
      "ehz-cable-outer",
      "ehz-outlet",
      "ehz-illegal-tap",
      "keep people and equipment well away from live lines",
      "wet skin and dissolved ions make unintended current paths more dangerous",
      "overloading can overheat cables, plugs and insulation",
    ].forEach(term => expect(explorer).toContain(term));
    expect(css).toContain(".spark-hazard-scene-svg");
    expect(css).toContain(".ehz-illegal-tap");
  });

  test("covers stored charge", () => {
    expect(migration).toContain("capacitors that can retain electric charge");
    expect(migration).toContain("untrained persons should not remove the backs of televisions");
    expect(explorer).toContain("Stored charge");
  });

  test("covers water frayed cords and overloads", () => {
    expect(migration).toContain("Wet skin has lower resistance");
    expect(migration).toContain("frayed cord");
    expect(migration).toContain("Overloaded outlets");
    expect(explorer).toContain("Water and electricity");
    expect(explorer).toContain("Damaged cords");
    expect(explorer).toContain("Overloaded outlets");
  });

  test("covers microwave metal with manufacturer nuance", () => {
    expect(migration).toContain("Ordinary metal pans and aluminium foil generally should not");
    expect(migration).toContain("manufacturer''s instructions");
    expect(explorer).toContain("Ordinary metal container");
  });

  test("covers surge protectors without overstating them", () => {
    expect(migration).toContain("reduce the effect of some short voltage spikes");
    expect(migration).toContain("does not guarantee protection from a direct lightning strike");
    expect(explorer).toContain("Surge protection");
  });

  test("covers current thunderstorm safety", () => {
    expect(migration).toContain("substantial enclosed building");
    expect(migration).toContain("avoid corded phones, plugged-in electrical equipment and plumbing");
    expect(explorer).toContain("Thunderstorms");
  });

  test("covers safe bulb changing", () => {
    expect(migration).toContain("Switch off the lamp circuit");
    expect(migration).toContain("stable ladder");
    expect(migration).toContain("Allow a hot bulb to cool");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"electrical-hazards"');
    expect(view).toContain("ElectricalHazardsExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-three audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":63');
    expect(migration).toContain('"objectivesBuilt":63');
  });
});
