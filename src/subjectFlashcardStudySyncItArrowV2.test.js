const fs = require("fs");
const path = require("path");

function source(...parts) {
  return fs.readFileSync(path.join(__dirname, ...parts), "utf8");
}

describe("Subject flashcard wording sync and IT SVG arrows", () => {
  const physicsFiles = [
    "physics/mechanics/components/PhysicsMechanicsSection.jsx",
    "physics/thermal/components/PhysicsThermalSection.jsx",
    "physics/waves/components/PhysicsWavesSection.jsx",
    "physics/electricity/components/PhysicsElectricitySection.jsx",
    "physics/atomic/components/PhysicsAtomicSection.jsx",
  ];

  test.each(physicsFiles)("%s uses the canonical Physics wording helper", relative => {
    const code = source(relative);
    expect(code).toContain("physicsFlashcardQuestion");
    expect(code).not.toMatch(/\{(?:c|card)\.front\}/);
  });

  test("Physics dashboard and study views share physicsFlashcardQuestion", () => {
    const dashboard = source("physics/mechanics/components/PhysicsMechanicsSupportPanels.jsx");
    expect(dashboard).toContain("physicsFlashcardQuestion(current)");
  });

  test("Mathematics still uses its canonical updated flashcard bank", () => {
    const panel = source("components/learning/FlashcardsPanel.jsx");
    const bank = source("learning/flashcards.js");
    expect(panel).toContain('from "../../learning/flashcards"');
    expect(bank).toContain("How is a number written in standard form?");
    expect(bank).toContain("How do you identify the median of a data set?");
    expect(bank).toContain("How do you identify the mode of a data set?");
  });

  test("Information Technology still uses its canonical updated flashcard bank", () => {
    const panel = source("informationTechnology/components/InformationTechnologyFlashcardsPanel.jsx");
    expect(panel).toContain('from "./itFlashcardBank"');
  });

  test("IT study navigation contains no emoji-prone unicode arrow", () => {
    const view = source("informationTechnology/components/InformationTechnologySubjectView.jsx");
    const css = source("informationTechnology/components/informationTechnology.css");
    expect(view).not.toContain("↗");
    expect(view).toContain("function OpenArrowIcon()");
    expect(view).toContain("<OpenArrowIcon/>");
    expect(css).toContain("SPARK IT MOBILE SVG NAV ARROWS V1");
    expect(css).toContain(".it-open-arrow-icon");
  });
});
