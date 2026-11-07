import { HISTORY_LESSONS } from "./historyLessons";

export const HISTORY_ID = "caribbean-history";
export const HISTORY_SYLLABUS_URL = "https://www.cxc.org/syllabus-downloads/";
export const HISTORY_THEMES = [
  "Indigenous Peoples and European contact",
  "Caribbean economy and slavery",
  "Resistance and revolt",
  "Movements towards emancipation",
  "Adjustments after emancipation",
  "Caribbean economies to 1985",
  "The United States in the Caribbean",
  "Political development and integration",
  "Caribbean society to 1985",
];
export const HISTORY_REVISED_THEMES = [
  "Indigenous and African enslavement and plantation systems",
  "Indigenous and African resistance, resilience and freedom movements",
  "Emancipation and apprenticeship in the British and French Caribbean",
  "Economic and social conditions after emancipation",
  "United States influence in the Caribbean",
  "Caribbean political development",
];

const SKILLS = [
  ["source-analysis", "Read a historical source",
    "Start by asking who made the source, when, for whom and why. Use those answers to work out which claims the source can support.",
    ["Describe what is actually present before drawing an inference. A payroll can record rates and job categories. It may leave out unpaid work, threats or people whose names were never recorded.",
      "To assess usefulness, name the question you are investigating. A planter’s letter can be useful evidence of what planters told officials and weak evidence of how workers felt. Compare it with a worker’s testimony or a record created for a different purpose.",
      "For a photograph or engraving, look at framing, caption and date. A picture can show equipment, clothing and where people stood. It can also stage a scene or omit conflict."],
    "A newspaper reports that a strike ended after workers accepted a wage offer. Look for the date, which workers the reporter interviewed and whether union or payroll records support that account.",
    "How do you explain a limitation without dismissing the whole source?", "Name the detail the source supports and a specific question it cannot answer. Then identify another source that could help."],
  ["essay-writing", "Plan an answer that earns marks",
    "Read the command word, circle the place and dates, then check how many points the question requests.",
    ["State or identify asks for the fact. Describe asks what happened or what something was like. Explain asks how or why. Compare uses the same basis for each example. Discuss develops and weighs relevant arguments.",
      "Make one point per paragraph. Give evidence by naming a place, group, policy or event. Follow it with a sentence linking the evidence to the question. If the question asks for the most important cause, explain what makes it more important than another cause.",
      "For a three-question, two-hour paper, about forty minutes per answer is a starting point. Read the instructions before budgeting time. A short answer needs direct, labelled parts. An extended response needs a clear position, supported paragraphs and a conclusion that answers the question."],
    "Turn ‘low wages caused protests’ into an explanation: low wages made basic goods difficult to afford, so a wage demand could mobilise workers across several workplaces.",
    "What should follow a specific example in an explanation?", "A sentence explaining how or why the example supports the point you are making."],
  ["sba", "Build a manageable SBA investigation",
    "Choose a historical question narrow enough to investigate with evidence you can actually find.",
    ["Specify the place, period and event or change. ‘Why did workers protest in Jamaica in 1938?’ gives a clearer route into archives than ‘What is labour history?’",
      "Keep a source log with creator, title, date, page or stable link, notes, and how each source helps. Distinguish quotations, paraphrases and your own interpretations. Compare at least two perspectives where the material permits it.",
      "Draft your own argument. Check the assessment guidance for your sitting, especially if taking the alternative Paper 032. Use feedback to improve how you cite evidence and explain the limits of your conclusions."],
    "For a question on post-emancipation land ownership, compare a purchase record with evidence of settlement, work or community institutions.",
    "How can you tell if your investigation is too broad?", "If you cannot identify a specific place, period and question, or your sources cover many unrelated issues, narrow the scope before collecting more material."],
];

const sections = [
  ...HISTORY_THEMES.map((title, index) => ({
    id: `ch-theme-${index + 1}`,
    subjectId: HISTORY_ID,
    title: `Theme ${index + 1} · ${title}`,
    sortOrder: index,
  })),
  { id: "ch-skills", subjectId: HISTORY_ID, title: "Source skills, essays and SBA", sortOrder: 9 },
];

function makeTopic(row, index) {
  const [theme, revisedTheme, slug, title, intro, notes, example, question, answer] = row;
  return {
    id: `ch-${slug}`, subjectId: HISTORY_ID, sectionId: theme ? `ch-theme-${theme}` : "ch-skills",
    title, description: intro, sortOrder: index,
    metadata: {
      syllabus: { theme, revisedTheme, sourceUrl: HISTORY_SYLLABUS_URL },
      lesson: {
        introduction: intro,
        objectives: [question],
        sections: [
          { title: "What happened and why it matters", paragraphs: notes },
          { title: "Work through an example", paragraphs: [example] },
        ],
        summary: answer,
        check: { question, answer },
        flashcards: [{ id: `ch-${slug}-check`, front: question, back: answer }],
      },
    },
  };
}

export const HISTORY_TOPICS = [...HISTORY_LESSONS, ...SKILLS.map(row => [null, null, ...row])].map(makeTopic);

export function historyLocalStructure() {
  return {
    sections: sections.map(section => ({ ...section, topics: HISTORY_TOPICS.filter(topic => topic.sectionId === section.id) })),
    topics: HISTORY_TOPICS,
    activities: [],
    unassignedTopics: [],
    sectionCount: sections.length,
    topicCount: HISTORY_TOPICS.length,
  };
}
