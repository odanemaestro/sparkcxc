export const PRESENTATION_THEMES = Object.freeze(["Ocean", "Slate", "Light"]);
export const PRESENTATION_LAYOUTS = Object.freeze(["Title and Content", "Title Only", "Blank"]);
export const PRESENTATION_TRANSITIONS = Object.freeze(["Fade", "Wipe", "Push"]);

export function createSlide(id) {
  return { id, title: `Slide ${id}`, body: "", layout: "Title and Content", bullets: false, graphic: false, transition: "", notes: "" };
}

export function updateSlide(slides, id, patch) {
  return slides.map(slide => slide.id === id ? { ...slide, ...patch } : slide);
}

export function removeSlide(slides, id) {
  if (slides.length <= 1) return slides;
  return slides.filter(slide => slide.id !== id);
}

export function moveSlide(slides, id, direction) {
  const index = slides.findIndex(slide => slide.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= slides.length) return slides;
  const next = [...slides];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function bulletItems(text) {
  return String(text).split(/\n+/).map(item => item.replace(/^\s*[•*-]\s*/, "").trim()).filter(Boolean);
}

export function presentationProof(slides, theme, footer) {
  const editedSlides = slides.filter(slide => slide.title.trim() && slide.body.trim());
  return {
    threeEditedSlides: slides.length >= 3 && editedSlides.length >= 3,
    validLayout: slides.some(slide => slide.layout === "Title and Content" && slide.title.trim() && slide.body.trim()),
    consistentTheme: PRESENTATION_THEMES.includes(theme),
    conciseBullets: slides.some(slide => slide.bullets && bulletItems(slide.body).length >= 3 && bulletItems(slide.body).every(item => item.split(/\s+/).length <= 10)),
    graphic: slides.some(slide => slide.graphic),
    transition: slides.some(slide => PRESENTATION_TRANSITIONS.includes(slide.transition)),
    notes: slides.some(slide => slide.notes.trim().length >= 12),
    footer: footer.trim().length >= 4,
  };
}
