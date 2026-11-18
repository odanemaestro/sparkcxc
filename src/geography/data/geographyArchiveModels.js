import archiveFigures from "./geographyArchiveFigures.json";

export const figures = (id, ...names) => names.map(name => archiveFigures[id][name]);
export const touristContourProfiles = [
  "A small rise followed by a long, nearly level stretch and a higher rise, then a steep descent.",
  "A steady rise to a nearly level summit, followed by a steep descent.",
  "A gentle rise leading to a steeper rise and a broad summit, then a descent.",
  "Two peaks of similar height separated by a dip, then a descent.",
];
export const touristContourProfileImages = ["profile-a", "profile-b", "profile-c", "profile-d"];

export function archivedMultipleChoice(id, year, items, { sources = {}, tables = {}, optionImages = {}, reviewNotes = {} } = {}) {
  return {
    id: `geo-${id}`,
    paper: 1,
    year,
    duration: 75,
    totalMarks: 60,
    title: `May/June ${year} · Paper 1`,
    questions: items.map(([prompt, ...options], index) => {
      const number = index + 1;
      const source = sources[number];
      const images = optionImages[number];
      return {
        id: `geo-${id}-q${number}`,
        number,
        prompt,
        options,
        ...(source ? { figures: figures(id, source) } : {}),
        ...(tables[number] ? { table: tables[number] } : {}),
        ...(images ? { optionFigures: figures(id, ...images).map((figure, position) => ({ ...figure, alt: options[position] })) } : {}),
        ...(reviewNotes[number] ? { reviewNote: reviewNotes[number] } : {}),
      };
    }),
  };
}

export function archivedWritten(id, paper, year, duration, totalMarks, questions, examFormat = {}) {
  return {
    id:`geo-${id}`, paper, year, duration, totalMarks, allQuestions:true, title:`May/June ${year} · Paper ${paper === 3 ? "032" : paper}`,
    ...examFormat,
    questions:questions.map(({parts,...question}, index) => ({
      ...question, id:`geo-${id}-q${index+1}`, number:index+1,
      parts:parts.map(([label,prompt,marks,stimulus], i) => ({ id:`geo-${id}-q${index+1}-p${i+1}`, label,prompt,marks,...stimulus })),
    })),
  };
}

export function archivedSectionedPaper(id, year, totalMarks, questions) {
  const threeSections = year === 2005 || year === 2006;
  return archivedWritten(id, 2, year, 150, totalMarks, questions.map((question, index) => ({
    ...question,
    group: index === 0 ? 1 : threeSections ? (index < 6 ? 2 : 3) : Math.floor((index - 1) / 3) + 2,
    compulsory: index === 0,
  })), {
    allQuestions: false,
    sectionNames: threeSections
      ? ["", "Mapwork", "Natural Systems", "Man-made Systems"]
      : ["", "Mapwork", "Natural Systems", "Human Systems", "Human–Environment Systems"],
    ...(threeSections && {
      questionCount: 4,
      selectionInstructions: "Question 1 is compulsory. Choose three more questions, with at least one from Section B and one from Section C.",
    }),
  });
}
