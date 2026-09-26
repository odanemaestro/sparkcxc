const fs = require("fs");
const path = require("path");

const migration = fs.readFileSync(
  path.join(__dirname,"..","supabase","migrations","20260921052000_integrated_science_objective_228.sql"),
  "utf8"
);
const explorer = fs.readFileSync(
  path.join(__dirname,"subjects","components","SmokingGasExchangeExplorer.jsx"),
  "utf8"
);
const css = fs.readFileSync(
  path.join(__dirname,"subjects","components","smokingGasExchangeExplorer.css"),
  "utf8"
);
const view = fs.readFileSync(
  path.join(__dirname,"subjects","GenericSubjectStudyView.jsx"),
  "utf8"
);

describe("Integrated Science Objective 2.2.8 acceptance audit", () => {
  test("maps directly to canonical objective 2.2.8", () => {
    expect(migration).toContain('"objective":"2.2.8"');
    expect(migration).toContain("2.2.8 Smoking and Gaseous Exchange");
  });

  test("covers nicotine dependence and carbon monoxide", () => {
    expect(migration).toContain("Nicotine is a highly addictive drug");
    expect(migration).toContain("Carbon monoxide binds strongly to haemoglobin");
    expect(migration).toContain("reduces oxygen delivery");
    expect(explorer).toContain("Carbon monoxide");
    expect(explorer).toContain("O₂");
  });

  test("covers cilia mucus and persistent cough", () => {
    expect(migration).toContain("impairs ciliary clearance");
    expect(migration).toContain("mucus production");
    expect(migration).toContain("coughing");
    expect(explorer).toContain("Working cilia move mucus");
    expect(explorer).toContain("Impaired clearance");
  });

  test("covers emphysema and surface-area loss", () => {
    expect(migration).toContain("walls between many alveoli are destroyed");
    expect(migration).toContain("reduces the total surface area");
    expect(migration).toContain("COPD");
    expect(explorer).toContain("alveolar walls destroyed");
    expect(explorer).toContain("less surface area");
  });

  test("covers lung cancer and second-hand smoke", () => {
    expect(migration).toContain("leading risk factor for lung cancer");
    expect(migration).toContain("no safe level of second-hand tobacco-smoke exposure");
    expect(migration).toContain("respiratory harm in children");
    expect(explorer).toContain("SECOND-HAND TOBACCO SMOKE");
  });

  test("corrects outdated vape wording", () => {
    expect(migration).toContain("aerosol, not harmless water vapour");
    expect(migration).toContain("fine particles");
    expect(migration).toContain("heavy metals");
    expect(explorer).toContain("Not harmless water vapour");
  });

  test("covers smoked cannabis without overstating evidence", () => {
    expect(migration).toContain("Cannabis smoke contains many of the same toxins");
    expect(migration).toContain("cough, mucus production and bronchitis symptoms");
    expect(migration).toContain("need more research");
    expect(explorer).toContain("Some longer-term disease relationships need more research");
  });

  test("wires the explorer into the shared lesson shell", () => {
    expect(migration).toContain('"type":"smoking-gaseous-exchange"');
    expect(view).toContain("SmokingGasExchangeExplorer");
    expect(explorer).toContain("Cilia and mucus");
    expect(explorer).toContain("Emphysema");
    expect(explorer).toContain("Other exposure");
  });

  test("visual remains responsive and dark-mode ready", () => {
    expect(css).toContain("@media(max-width:850px)");
    expect(css).toContain("@media(max-width:620px)");
    expect(css).toContain('html[data-theme="dark"]');
  });

  test("advances the course to fifty-three audited objectives", () => {
    expect(migration).toContain('"topicsBuilt":53');
    expect(migration).toContain('"objectivesBuilt":53');
  });
});
