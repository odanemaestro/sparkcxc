const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921012000_integrated_science_objective_123.sql"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const process = fs.readFileSync(
  path.join(__dirname,"subjects","components","FlowerReproductionProcess.jsx"),
  "utf8"
);
const processCss = fs.readFileSync(
  path.join(__dirname,"subjects","components","flowerReproductionProcess.css"),
  "utf8"
);

describe("Integrated Science Objective 1.2.3 acceptance audit", () => {
  test("maps directly to canonical objective 1.2.3", () => {
    expect(migration).toContain('"objective":"1.2.3"');
    expect(migration).toContain("1.2.3 Sexual Reproduction in Plants");
  });

  test("flower anatomy is taught through an interactive biological diagram", () => {
    expect(diagram).toContain("FlowerLongitudinalTemplate");
    expect(migration).toContain('"template":"flower-longitudinal"');
    [
      '"text":"Petal"',
      '"text":"Sepal"',
      '"text":"Anther"',
      '"text":"Filament"',
      '"text":"Stigma"',
      '"text":"Style"',
      '"text":"Ovary"',
      '"text":"Ovule"',
      '"text":"Receptacle"',
    ].forEach(term => expect(migration).toContain(term));
  });

  test("bean seed anatomy is interactive and linked to function", () => {
    expect(diagram).toContain("BeanSeedTemplate");
    expect(migration).toContain('"template":"bean-seed"');
    ["Testa","Cotyledon","Plumule","Radicle"].forEach(term => expect(migration).toContain(term));
  });

  test("process model covers pollination through fruit and seed formation", () => {
    expect(migration).toContain('"type":"flower-reproduction-process"');
    expect(process).toContain("1. Pollination");
    expect(process).toContain("2. Pollen tube growth");
    expect(process).toContain("3. Fertilisation");
    expect(process).toContain("4. Seed and fruit formation");
    expect(process).toContain("Insect-pollinated");
    expect(process).toContain("Wind-pollinated");
  });

  test("renders insect and wind pollination structures visually", () => {
    for (const term of [
      "spark-pollination-structure-svg",
      "pc-petal large",
      "pc-petal small",
      "pc-stigma sticky",
      "pc-stigma feathery",
      "pc-stamens enclosed",
      "pc-stamens exposed",
      "fewer, larger sticky or spiky pollen grains",
      "many small, light, smooth pollen grains"
    ]) expect(process).toContain(term);
    expect(processCss).toContain(".spark-pollination-structure-svg");
    expect(processCss).toContain(".pc-stigma.feathery");
    expect(processCss).toContain(".pc-pollen.small");
  });

  test("lesson covers germination and biological drawing expectations", () => {
    expect(migration).toContain("Water, oxygen and a suitable temperature");
    expect(migration).toContain("clear single lines");
    expect(migration).toContain("no shading");
    expect(migration).toContain("Magnification is calculated");
  });

  test("new process model is responsive and dark-mode ready", () => {
    expect(processCss).toContain("@media(max-width:850px)");
    expect(processCss).toContain("@media(max-width:560px)");
    expect(processCss).toContain('html[data-theme="dark"]');
  });
});
