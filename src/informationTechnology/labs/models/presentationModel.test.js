import { bulletItems, createSlide, moveSlide, presentationProof, removeSlide, updateSlide } from "./presentationModel.mjs";

describe("presentation model", () => {
  test("creates, edits, reorders and removes slides deterministically", () => {
    let slides = [createSlide(1), createSlide(2), createSlide(3)];
    slides = updateSlide(slides, 2, { title: "Activities" });
    expect(slides[1].title).toBe("Activities");
    expect(moveSlide(slides, 2, -1).map(slide => slide.id)).toEqual([2, 1, 3]);
    expect(removeSlide(slides, 2).map(slide => slide.id)).toEqual([1, 3]);
  });

  test("recognises concise bullet content and complete presentation outcomes", () => {
    const slides = [1, 2, 3].map(id => ({ ...createSlide(id), title: `Topic ${id}`, body: "Plan activities\nBuild projects\nShare results" }));
    slides[0] = { ...slides[0], bullets: true, graphic: true, transition: "Fade", notes: "Explain the club project clearly." };
    expect(bulletItems(slides[0].body)).toHaveLength(3);
    expect(presentationProof(slides, "Ocean", "Technology Club")).toEqual({
      threeEditedSlides: true, validLayout: true, consistentTheme: true, conciseBullets: true,
      graphic: true, transition: true, notes: true, footer: true,
    });
  });

  test("does not award proof for untouched or incomplete slides", () => {
    expect(presentationProof([createSlide(1)], "", "").threeEditedSlides).toBe(false);
  });
});
