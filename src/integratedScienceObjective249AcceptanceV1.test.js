const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921061500_integrated_science_objective_249.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","FireExtinguishingExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","fireExtinguishingExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.4.9 acceptance audit", () => {
  test("maps directly to canonical objective 2.4.9", () => {
    expect(migration).toContain('"objective":"2.4.9"');
    expect(migration).toContain("2.4.9 Methods of Extinguishing Fires");
  });

  test("covers the fire triangle", () => {
    expect(migration).toContain("heat, fuel and oxygen");
    expect(explorer).toContain("Remove heat");
    expect(explorer).toContain("Remove oxygen");
    expect(explorer).toContain("Remove fuel");
  });

  test("covers water for ordinary combustibles but not energized electrical fires", () => {
    expect(migration).toContain("wood or paper");
    expect(migration).toContain("should not be used on energized electrical equipment");
    expect(explorer).toContain("Energized electrical equipment");
  });

  test("covers flammable liquids and foam", () => {
    expect(migration).toContain("foam for a gasoline or oil fire");
    expect(migration).toContain("Water can spread a burning flammable liquid");
    expect(explorer).toContain("Gasoline or other flammable liquid");
  });

  test("covers cooking-oil fires safely", () => {
    expect(migration).toContain("Never pour water onto burning cooking oil");
    expect(migration).toContain("sliding a lid over the pan");
    expect(migration).toContain("suitable fire blanket");
    expect(explorer).toContain("Pan fire");
  });

  test("covers CO2 dry chemical gas isolation and firebreaks", () => {
    expect(migration).toContain("Carbon dioxide extinguishers");
    expect(migration).toContain("dry chemical or dry powder");
    expect(migration).toContain("Turning off a gas supply");
    expect(migration).toContain("firebreak");
    expect(explorer).toContain("Firebreak");
  });

  test("corrects the older damp-cloth item without losing the exam principle", () => {
    expect(migration).toContain("Some older bank items describe a damp cloth");
    expect(migration).toContain("examination principle is oxygen removal");
    expect(explorer).toContain("OLDER DAMP-CLOTH ITEM");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"fire-extinguishing"');
    expect(view).toContain("FireExtinguishingExplorer");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:900px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to sixty-four audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":64');
    expect(migration).toContain('"objectivesBuilt":64');
  });
});
