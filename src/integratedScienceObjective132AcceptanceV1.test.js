const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921015000_integrated_science_objective_132.sql"),
  "utf8"
);
const diagram = fs.readFileSync(
  path.join(__dirname,"subjects","components","InteractiveLabelDiagram.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","interactiveLabelDiagram.css"),
  "utf8"
);

describe("Integrated Science Objective 1.3.2 acceptance audit", () => {
  test("maps directly to canonical objective 1.3.2", () => {
    expect(migration).toContain('"objective":"1.3.2"');
    expect(migration).toContain("1.3.2 Human Reproductive Organs");
  });

  test("covers the male structures tested by the question bank", () => {
    [
      "Testis",
      "Scrotum",
      "Epididymis",
      "Sperm duct",
      "Seminal vesicle",
      "Prostate gland",
      "Cowper''s gland",
      "Urethra",
      "Penis",
    ].forEach(term => expect(migration).toContain(term));
  });

  test("covers the female structures and reproductive pathway", () => {
    [
      "Ovary",
      "Oviduct",
      "Uterus",
      "Endometrium",
      "Cervix",
      "Vagina",
    ].forEach(term => expect(migration).toContain(term));
    expect(migration).toContain("usual site of fertilisation");
    expect(migration).toContain("embryo implants");
  });

  test("teaches sperm production, storage, transport and gland functions", () => {
    expect(migration).toContain("The testes produce sperm");
    expect(migration).toContain("Sperm mature and are stored in the epididymis");
    expect(migration).toContain("vas deferens");
    expect(migration).toContain("nutrient-containing fluid");
    expect(migration).toContain("lubricating and alkaline fluid");
  });

  test("includes separate recognisable male and female anatomy templates", () => {
    expect(diagram).toContain("FemaleReproductiveTemplate");
    expect(diagram).toContain("MaleReproductiveTemplate");
    expect(diagram).toContain('"female-reproductive-system"');
    expect(diagram).toContain('"male-reproductive-system"');
    expect(diagram).toContain("female-uterus");
    expect(diagram).toContain("female-ovary");
    expect(diagram).toContain("male-testis");
    expect(diagram).toContain("male-epididymis");
  });

  test("both anatomy diagrams use the established interactive label engine", () => {
    expect(migration).toContain('"id":"m1-t3-2-female-reproductive-system"');
    expect(migration).toContain('"id":"m1-t3-2-male-reproductive-system"');
    expect(migration).toContain("'diagram:m1-t3-2-female-reproductive-system'");
    expect(migration).toContain("'diagram:m1-t3-2-male-reproductive-system'");
    expect(migration).toContain('"mode":"drag-drop-label"');
  });

  test("phone tablet and dark-mode label interaction remains available", () => {
    expect(diagram).toContain("tap a label");
    expect(diagram).toContain("spark-label-target-index");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain("(max-width:900px) and (orientation:portrait)");
    expect(css).toContain('html[data-theme="dark"] .spark-label-diagram');
    expect(css).toContain("SPARK_HUMAN_REPRODUCTIVE_TEMPLATES_V1");
  });

  test("lesson includes the high-value application checks", () => {
    expect(migration).toContain("blocked oviducts");
    expect(migration).toContain("slightly lower than core body temperature");
    expect(migration).toContain("Which structure dilates during childbirth?");
    expect(migration).toContain("Testis to epididymis to sperm duct to urethra to penis");
  });
});
