const fs = require("fs");
const path = require("path");
const { formatMathHtml } = require("./practice/MathText");
const { SECTION_A_TOPICS } = require("./physics/mechanics/sectionAMechanics.mjs");
const { SECTION_B_TOPICS } = require("./physics/thermal/sectionBThermal.mjs");
const { SECTION_C_TOPICS } = require("./physics/waves/sectionCWaves.mjs");
const { SECTION_D_TOPICS } = require("./physics/electricity/sectionDElectricity.mjs");
const { SECTION_E_TOPICS } = require("./physics/atomic/sectionEAtomic.mjs");

const read = relative => fs.readFileSync(path.join(__dirname, relative), "utf8");
const flashcardSource = read("physics/mechanics/components/PhysicsMechanicsSupportPanels.jsx");
const flashcardCss = read("physics/mechanics/components/physicsMechanics.css");
const paper2Source = read("physics/paper2/components/PhysicsPaper2Exam.jsx");
const subjectSource = read("subjects/SubjectSelectionView.jsx");

describe("Physics presentation and final review V5", () => {
  test("subject selection uses clean Physics practice copy", () => {
    expect(subjectSource).toContain("Topic tests, structured practice and section checkpoints");
    expect(subjectSource).not.toContain("Sections A-E");
    expect(subjectSource).not.toContain("Sections A- E");
  });

  test("flashcard topic picker separates sections from their topics", () => {
    expect(flashcardSource).toContain('className="pm-flashcard-sections"');
    expect(flashcardSource).toContain("visibleTopics.map");
    expect(flashcardSource).toContain("selectSection(section.id)");
    expect(flashcardCss).toContain("grid-template-columns:repeat(5,minmax(0,1fr))");
    expect(flashcardCss).toContain(".pm-flashcards-dashboard .pm-flashcard-topics .pm-topic-btn");
    expect(flashcardCss).toContain("flex:0 0 auto");
  });

  test("dashboard flashcards render both sides through MathText with dedicated typography", () => {
    expect(flashcardSource).toMatch(/MathText as="h2" prose className="pm-flashcard-question-text">\{current\.front\}<\/MathText>/);
    expect(flashcardSource).toMatch(/MathText as="div" prose className="pm-flashcard-answer-text">\{current\.back\}<\/MathText>/);
    expect(flashcardCss).toContain(".pm-flashcards-dashboard .pm-flashcard-question-text");
    expect(flashcardCss).toContain("font-family:inherit !important");
  });

  test("every authored Physics flashcard passes through the universal math formatter without parser artifacts", () => {
    const topics = [SECTION_A_TOPICS, SECTION_B_TOPICS, SECTION_C_TOPICS, SECTION_D_TOPICS, SECTION_E_TOPICS].flat();
    const cards = topics.flatMap(topic => topic.flashcards || []);
    expect(cards.length).toBe(565);
    for (const card of cards) {
      for (const side of [card.front, card.back]) {
        const html = formatMathHtml(side);
        expect(html).not.toContain("\uE000");
        expect(html).not.toContain("\uE001");
        expect(html).not.toMatch(/\^\([^)]{1,20}\)/);
        expect(html).not.toMatch(/_\{[^}]{1,20}\}/);
      }
    }
  });

  test("Physics Paper 2 review exposes answer comparison before long source material", () => {
    const reviewIndex = paper2Source.indexOf("<ReviewPanel result={result} question={question} responses={responses} modelResponses={modelResponses}/>");
    const reviewReferenceIndex = paper2Source.indexOf('className="phy-p2-review-reference"', reviewIndex);
    expect(reviewIndex).toBeGreaterThan(-1);
    expect(reviewReferenceIndex).toBeGreaterThan(reviewIndex);
    expect(paper2Source).toContain("Your final answer");
    expect(paper2Source).toContain("Mark-scheme answer");
    expect(paper2Source).toContain("Worked solution");
    expect(paper2Source).toContain("Mark breakdown");
    expect(paper2Source).toContain("View original question data and diagram");
  });

  test("Paper 2 review does not reuse disabled exam response controls", () => {
    expect(paper2Source).toContain('phase === "exam" ? <>');
    expect(paper2Source).not.toContain('disabled={phase === "review"}');
    expect(paper2Source).toContain("PhysicsResponseWorkspace");
    expect(paper2Source).toContain("readOnly/>");
  });
});
